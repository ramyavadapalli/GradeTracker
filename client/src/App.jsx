import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import FAQ from "./components/FAQs";
import Feedback from './components/Feedbacktt';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/FAQ" element={<FAQ />} /> {/* New FAQ Route */}
      <Route path="/feedback" element={<Feedback />} /> {/* Feedback route */}
    </Routes>
  </BrowserRouter>
);

export default App;
