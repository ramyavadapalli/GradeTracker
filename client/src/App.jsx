import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const isLoggedIn = localStorage.getItem("userId") !== null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect logged-in users from the homepage to the Dashboard */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/setup" element={<Setup />}></Route>
        {/* Protect routes like Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gpa-goals"
          element={
            <ProtectedRoute>
              <GpaGoals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/current-semester"
          element={
            <ProtectedRoute>
              <CurrentSemester />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-semesters"
          element={
            <ProtectedRoute>
              <EditSemesters />
            </ProtectedRoute>
          }
        />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/goals" element={<GpaGoals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
