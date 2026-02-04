const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true }, // "144" or "Lab-1" [cite: 229]
  type: { 
    type: String, 
    enum: ['CLASSROOM', 'LAB'], 
    required: true 
  },
  capacity: { type: Number, default: 60 }
});

module.exports = mongoose.model('Room', RoomSchema);    