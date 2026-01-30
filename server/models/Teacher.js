const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    // Full legal name of the teacher used for display purposes
    name:{
        type: String,
        required: [true, 'Teacher name is required']
    },

    // Unique abbreviation (e.g., "HAH" for Harsh Ajaybhai Hadiyal) used in timetables or compact views
    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes whitespace from both ends
    },

    // Official email address, likely used for authentication and notifications
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Array of references to the 'Subject' model
    // Represents the subjects this teacher is qualified to teach (One-to-Many relationship)
    expertise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'  // MUST match the model name of your Subject schema
    }],

    // Boolean flag to differentiate between pure theory faculty and lab assistants/faculty
    // Useful for filtering logic during timetable generation
    isLabFaculty: {
        type: Boolean,
        default: false
    },
    
    // The maximum workload (hours/credits) this teacher can be assigned per week
    // Critical for validation logic to prevent over-scheduling
    maxLoad:{
        type: Number,
        default: 12
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Teacher', TeacherSchema);