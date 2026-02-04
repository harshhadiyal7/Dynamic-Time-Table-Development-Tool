const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');
const Subject = require('./models/Subject');
const Room = require('./models/Room');
const Timetable = require('./models/Timetable'); // Optional, to clear old schedules

// Database Connection (Ensure URL is correct)
mongoose.connect('mongodb://127.0.0.1:27017/atmiya_timetable')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedDB = async () => {
  try {
    // 1. Clear existing data
    await Teacher.deleteMany({});
    await Subject.deleteMany({});
    await Room.deleteMany({});
    await Timetable.deleteMany({});
    console.log("🧹 Old Data Cleared!");

    // 2. Create Rooms (7 Labs + 7 Classrooms)
    const rooms = [];
    // Adding Classrooms
    rooms.push(new Room({ roomNumber: "144", type: "CLASSROOM", capacity: 60 }));
    rooms.push(new Room({ roomNumber: "201", type: "CLASSROOM", capacity: 60 }));
    // Adding Labs
    for (let i = 1; i <= 7; i++) {
      rooms.push(new Room({ roomNumber: `LAB-${i}`, type: "LAB", capacity: 30 }));
    }
    await Room.insertMany(rooms);
    console.log("✅ Rooms Added");

    // 3. Create Teachers (From your PDF)
   const teachersData = [
      { 
        name: "Tosal Bhalodia", 
        shortCode: "TMB", 
        isLabFaculty: true,
        email: "tmb@atmiya.edu.in" 
      },
      { 
        name: "Rupal Shilu", 
        shortCode: "RJS", 
        isLabFaculty: true,
        email: "rjs@atmiya.edu.in"
      },
      { 
        name: "Devangi Paneri", 
        shortCode: "DRP", 
        isLabFaculty: true,
        email: "drp@atmiya.edu.in"
      },
      { 
        name: "Bipasa Das", 
        shortCode: "BD", 
        isLabFaculty: true,
        email: "bd@atmiya.edu.in"
      },
      { 
        name: "Nirali Borad", 
        shortCode: "NPB", 
        isLabFaculty: true,
        email: "npb@atmiya.edu.in"
      },
      { 
        name: "Hiren Makwana", 
        shortCode: "HHM", 
        isLabFaculty: false,
        email: "hhm@atmiya.edu.in"
      }
    ];
    const createdTeachers = await Teacher.insertMany(teachersData);
    console.log("✅ Teachers Added");

    // Helper function to find teacher ID by code
    const getTeacherId = (code) => createdTeachers.find(t => t.shortCode === code)._id;

    

    // 4. Create Subjects (Linking with Teachers)
    const subjectsData = [
      { 
        name: "Mobile Computing (MCWC)", 
        code: "MCWC", 
        semester: 7, 
        lectureLoad: 3, 
        labLoad: 2, 
        qualifiedTeachers: [getTeacherId('DRP'), getTeacherId('TMB')] 
      },
      { 
        name: "Compiler Design", 
        code: "CD", 
        semester: 7, 
        lectureLoad: 4, 
        labLoad: 0, 
        qualifiedTeachers: [getTeacherId('RJS')] 
      },
      { 
        name: "Info & Network Security", 
        code: "INS", 
        semester: 7, 
        lectureLoad: 4, 
        labLoad: 0, 
        qualifiedTeachers: [getTeacherId('TMB')] 
      },
      { 
        name: "Block Chain", 
        code: "BLC", 
        semester: 7, 
        lectureLoad: 3, 
        labLoad: 2, 
        qualifiedTeachers: [getTeacherId('BD')] 
      },
       { 
        name: "Career Acceleration Program", 
        code: "CAP", 
        semester: 7, 
        lectureLoad: 2, 
        labLoad: 0, 
        qualifiedTeachers: [getTeacherId('HHM')] 
      }
    ];
    await Subject.insertMany(subjectsData);
    console.log("✅ Subjects Added");

    console.log("🚀 Database Seeded Successfully!");
    process.exit();

  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();