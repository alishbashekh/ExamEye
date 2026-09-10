import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorksSection from "./components/HowItWorks";
import HowItWorks from "./components/HowItWorks";
import SecuritySection from "./components/SecuritySection";
import Footer from "./components/Footer";

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
    <div className="min-h-screen bg-white">
      {/* Navbar component */}
      <Navbar />

      {/* Hero section component */}
      <main>
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