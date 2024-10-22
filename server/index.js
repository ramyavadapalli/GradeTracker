const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudentModel = require("./models/StudentModel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ramyavadapalli:35Gx4p8n@gradetrackr.ew27r.mongodb.net/gradeTrackr"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "Success", userId: user._id });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record found");
    }
  });
});

app.post("/signup", (req, res) => {
  StudentModel.create(req.body)
    .then((students) => res.json(students))
    .catch((error) => res.json(error));
});

app.post("/setup", async (req, res) => {
  const { userId, semesters, overallGPA } = req.body;

  try {
    const student = await StudentModel.findById(userId);
    if (student) {
      student.semesters = semesters;
      student.overallGPA = overallGPA;
      await student.save();
      res.status(200).json("Setup data saved successfully.");
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    res.status(500).json("Error saving setup data.");
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const user = await StudentModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
