const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  semester: { type: Number, required: true }, // 7
  section: { type: String, default: "BX" }, // e.g., BX or BY
  
  day: { 
    type: String, 
    enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], 
    required: true 
  },
  
  // Slot ka timing (e.g., "07:30-08:25")
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },
  
  // Kya ye slot Lecture hai, Lab hai, ya Recess?
  slotType: { 
    type: String, 
    enum: ['LECTURE', 'LAB', 'RECESS'], 
    required: true 
  },

  // Allocations Array: Kyunki Lab mein 3 teachers + 3 batches ho sakte hain [cite: 240]
  allocations: [
    {
      batch: { type: String, default: "ALL" }, // "ALL" for lecture, "BY1" for labs
      subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
      room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
    }
  ]
}, { timestamps: true });

// --- INDEXING STRATEGY (Optimization) ---

// 1. Teacher Conflict Check:
// "Kya ye Teacher, is Day aur is Time pe busy hai?"
// Ye query milliseconds mein honi chahiye.
TimetableSchema.index({ "allocations.teacher": 1, day: 1, startTime: 1 });

// 2. Room Conflict Check:
// "Kya ye Room, is Day aur is Time pe busy hai?"
TimetableSchema.index({ "allocations.room": 1, day: 1, startTime: 1 });

// 3. Student Batch Conflict Check:
// "Kya Sem 7 ka slot already booked hai?"
TimetableSchema.index({ semester: 1, day: 1, startTime: 1 });

module.exports = mongoose.model('Timetable', TimetableSchema);