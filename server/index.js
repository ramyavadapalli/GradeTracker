const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudentModel = require("./models/Student");

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
        res.json("Success");
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
app.listen(3001, () => {
  console.log("server is running");
});
