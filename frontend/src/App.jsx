import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SecuritySection from "./components/SecuritySection";
import Process from "./components/Process";
import Footer from "./components/Footer";
import Login from "./components/Login";

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
          {/* Main Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Backend API status toast (Har page par visible rahega) */}
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