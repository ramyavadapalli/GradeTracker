const mongoose = require("mongoose");

const SemesterSchema = new mongoose.Schema({
  hours: { type: Number, required: true },
  gpa: { type: Number, required: true },
});

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: Number, required: true },
  sections: [SectionSchema],
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
  courses: [CourseSchema],
});

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
