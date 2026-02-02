const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}, //Eg: "Mobile Computing"
    code: {type: String, required: true, unique: true}, //Eg: "MCWN"
    semester: {type: Number, required: true}, //Eg: 7

    lactureLoad: {type: Number, required: true}, // Eg: 4 lectures/week
    labLoad: {type: Number, default: 0}, // Eg: 2 labs/week, default to 0 if no lab component

    qualifiedTeachers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'  // MUST match the model name of your Teacher schema
    }]
});


module.exports = mongoose.model('Subject', SubjectSchema);