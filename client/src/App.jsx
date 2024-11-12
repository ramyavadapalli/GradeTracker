import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Dashboard from "./components/Dashboard";
import GpaGoals from "./components/GpaGoals";
import CurrentSemester from "./components/CurrentSemester/CurrentSemester";
import EditSemesters from "./components/EditSemesters";
import FAQ from "./components/FAQs";
import Feedback from "./components/Feedbacktt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/setup" element={<Setup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/gpa-goals" element={<GpaGoals />}></Route>
        <Route path="/current-semester" element={<CurrentSemester />}></Route>
        <Route path="/edit-semesters" element={<EditSemesters />}></Route>
        <Route path="/FAQ" element={<FAQ />} /> {/* New FAQ Route */}
        <Route path="/feedback" element={<Feedback />} /> {/* Feedback route */}
        <Route path="/goals" element={<GpaGoals />} /> {/* GPA Goals Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;