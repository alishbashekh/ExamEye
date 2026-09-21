
import React from "react";
import { ArrowUpRight, ShieldCheck, Lock, Eye } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // GET STARTED → LOGIN PAGE
  const handleGetStartedClick = () => {
    navigate("/login");
  };

  // Smooth scroll handler for landing page sections
  const handleScroll = (e, targetId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);

    if (!element) return;

    const navbar = document.querySelector("header");

    const navbarHeight = navbar
      ? navbar.getBoundingClientRect().height
      : 80;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementPosition - navbarHeight),
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#FEFDFC] px-4 pb-8 pt-16 sm:px-8 sm:pb-12">
      
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none absolute -bottom-20 left-1/2
          h-[350px] w-[600px]
          -translate-x-1/2 rounded-full
          bg-[#168052]/10 blur-[130px]
        "
      />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative z-10 mx-auto max-w-7xl
          rounded-3xl bg-[#092517]
          p-8 text-white shadow-2xl
          sm:p-12 lg:p-16
        "
      >

        {/* TOP CTA SECTION */}
        <div
          className="
            flex flex-col items-start justify-between
            gap-8 border-b border-white/10 pb-12
            lg:flex-row lg:items-center
          "
        >
          <div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Make every exam more secure.
            </h2>

            <p className="mt-2 text-sm text-white/60 sm:text-base">
              AI-powered proctoring designed to protect exam
              integrity while keeping the assessment experience
              simple and fair.
            </p>
          </div>

          {/* GET STARTED → LOGIN */}
          <button
            type="button"
            onClick={handleGetStartedClick}
            className="
              group inline-flex cursor-pointer
              items-center gap-2
              rounded-xl bg-[#168052]
              px-6 py-3.5
              text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-[#20A068]
              hover:shadow-lg
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#75F6B6]
            "
          >
            Get Started

            <ArrowUpRight
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* MIDDLE GRID SECTION */}
        <div
          className="
            grid grid-cols-1 gap-10
            pt-12 sm:grid-cols-2
            lg:grid-cols-12 lg:gap-8
          "
        >

          {/* BRAND COLUMN */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/exameye-logo.png"
                alt="ExamEye Logo"
                className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              />

              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  ExamEye
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#75F6B6]">
                  AI Proctor
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Smarter, safer, and fairer online examinations powered
              by AI-driven proctoring technology.
            </p>
          </div>

          {/* EXPLORE LINKS */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#75F6B6]">
              Explore
            </h3>

            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">

              <li>
                <button
                  type="button"
                  onClick={(e) => handleScroll(e, "hero")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={(e) => handleScroll(e, "features")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={(e) => handleScroll(e, "process")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Process
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={(e) => handleScroll(e, "security")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Security
                </button>
              </li>

            </ul>
          </div>

          {/* PROTECTION FEATURES */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#75F6B6]">
              Protection
            </h3>

            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">

              <li className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#75F6B6]" />
                Identity Verification
              </li>

              <li className="flex items-center gap-2.5">
                <Eye className="h-4 w-4 shrink-0 text-[#75F6B6]" />
                AI Object & Gaze Detection
              </li>

              <li className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-[#75F6B6]" />
                Secure Browser Lockdown
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div
          className="
            mt-12 flex flex-col
            items-center justify-between
            gap-4 border-t border-white/10
            pt-8 text-xs text-white/40
            sm:flex-row
          "
        >
          <p>© 2026 ExamEye. All rights reserved.</p>

          <p className="text-center sm:text-right">
            Designed for privacy & assessment integrity.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

