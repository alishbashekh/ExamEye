import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features"; // <-- was missing, used in LandingPage
import SecuritySection from "./components/SecuritySection";
import Process from "./components/Process";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentVerification from "./components/StudentVerification";
//import ExamScreen from "./components/ExamScreen";

// Landing Page (Home Route) Component
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SecuritySection />
        <Process />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test")
      .then((res) => setMessage(res.data.message))
      .catch((err) =>
        console.error("frontend-backend connection failed", err)
      );
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Register Page */}
          <Route path="/register" element={<Register />} />

          {/* Student Biometric Verification Page */}
          <Route path="/student-verification" element={<StudentVerification />} />
        </Routes>

        {/* Backend API Status Toast */}
        {message && (
          <div className="fixed bottom-4 right-4 z-50 rounded-md bg-[#0A291A] px-4 py-2 text-xs text-white shadow-lg">
            Backend Status: {message}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;