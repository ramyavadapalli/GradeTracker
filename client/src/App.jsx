import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Dashboard from "./components/Dashboard";
import GpaGoals from "./components/GpaGoals";
import CurrentSemester from "./components/CurrentSemester";
import EditSemesters from "./components/EditSemesters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/setup" element={<Setup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/gpa-goals" element={<GpaGoals />}></Route>
        <Route path="/current-semester" element={<CurrentSemester />}></Route>
        <Route path="/edit-semesters" element={<EditSemesters />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
