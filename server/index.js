const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middlewares
app.use(cors()); // Allow Frontend to access
app.use(express.json()); // Parse JSON bodies

// 2. Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/atmiya_timetable")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// 3. Import Models
const Teacher = require("./models/Teacher");
const Subject = require("./models/Subject");
const Room = require("./models/Room");

// 4. Create Basic Routes (APIs)

// GET - All Teachers
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - All Rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - All Subjects
app.get("/api/subjects", async (req, res) => {
  try {
    // Populate function use kar rahe hain taaki 'qualifiedTeachers' ki details bhi aa jayein
    const subjects = await Subject.find().populate("qualifiedTeachers", "name shortCode");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});