import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import SecuritySection from "./components/SecuritySection";
import Process from "./components/Process";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentVerification from "./components/StudentVerification";

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
import ExamScreen from "./components/ExamScreen";

function App() {
  const [message, SetMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test")
      .then((res) => SetMessage(res.data.message))
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
    <div className="min-h-screen bg-white">
      {/* Navbar component */}
      <Navbar />

      {/* Hero section component */}
      <main>
        <ExamScreen/>
        <Hero />
        <HowItWorks />
        <SecuritySection />
        <Footer/>
      </main>

       

      {/* Optional: Backend API connection test message (agar aap monitor karna chahein) */}
      {message && (
        <div className="fixed bottom-4 right-4 rounded-md bg-[#0A291A] px-4 py-2 text-xs text-white shadow-lg">
          Backend Status: {message}
        </div>
      )}
    </div>
  );
}

export default App;