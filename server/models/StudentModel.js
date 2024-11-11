const mongoose = require("mongoose");

const SemesterSchema = new mongoose.Schema({
  hours: Number,
  gpa: Number,
});

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  semesters: [SemesterSchema],
  overallGPA: Number,
  hasCompletedSetup: { type: Boolean, default: false },
  semesterGoal: { type: Number, default: null },
  cumulativeGoal: { type: Number, default: null },
});

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
