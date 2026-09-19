import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();

    const element = document.getElementById(targetId);

    if (!element) return;

    // Close mobile menu first
    setIsMenuOpen(false);

    // Wait for mobile menu closing animation/layout to finish
    setTimeout(() => {
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
    }, 320);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Features", id: "features" },
    { name: "Security", id: "security" },
    { name: "Process", id: "process" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      {/* ================= MAIN NAVBAR ================= */}
      <div
        className="
          relative
          mx-auto
          flex
          h-[80px]
          w-full
          max-w-[1440px]
          items-center
          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex shrink-0 items-center">
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            className="
              flex
              items-center
              gap-2.5
              transition-opacity
              duration-200
              hover:opacity-90
              sm:gap-3
            "
          >
            <img
              src="/images/exameye-logo.png"
              alt="ExamEye Logo"
              className="h-9 w-auto object-contain sm:h-11"
            />

            <div className="flex flex-col justify-center">
              <span
                className="
                  text-[19px]
                  font-bold
                  leading-none
                  tracking-tight
                  text-neutral-900
                  sm:text-[22px]
                "
              >
                ExamEye
              </span>

              <span
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#085631]
                  sm:text-[10px]
                "
              >
                AI Proctor
              </span>
            </div>
          </a>
        </div>

        {/* ================= VERTICAL DIVIDER ================= */}
        <div className="ml-7 hidden h-20 w-px bg-neutral-200 md:block lg:ml-20" />

        {/* ================= DESKTOP NAV LINKS ================= */}
        <nav
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-7
            md:flex
            lg:gap-9
            xl:gap-11
          "
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="
                relative
                whitespace-nowrap
                py-2
                text-[14px]
                font-medium
                text-neutral-700
                transition-colors
                duration-200
                hover:text-[#085631]
                after:absolute
                after:bottom-0
                after:left-1/2
                after:h-[2px]
                after:w-0
                after:-translate-x-1/2
                after:rounded-full
                after:bg-[#085631]
                after:transition-all
                after:duration-300
                hover:after:w-full
                lg:text-[15px]
              "
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* ================= DESKTOP GET STARTED ================= */}
        <div className="ml-auto hidden shrink-0 md:block">
          <a
            href="/login"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#085631]
              px-6
              py-3
              text-[13px]
              font-semibold
              text-white
              shadow-[0_5px_18px_rgba(8,86,49,0.16)]
              transition-all
              duration-300
              hover:bg-[#064225]
              hover:shadow-[0_7px_22px_rgba(8,86,49,0.22)]
              active:scale-95
              sm:text-sm
            "
          >
            Get Started
          </a>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="ml-auto flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-neutral-700
              transition-colors
              duration-200
              hover:bg-neutral-100
              focus:outline-none
            "
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          overflow-hidden
          border-t
          border-neutral-100
          bg-white
          transition-all
          duration-300
          md:hidden
          ${
            isMenuOpen
              ? "max-h-[420px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }
        `}
      >
        <nav className="px-5 pb-5 pt-3 sm:px-8">
          <div className="flex flex-col">
            {/* MOBILE LINKS */}
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="
                  rounded-xl
                  px-3
                  py-3.5
                  text-[15px]
                  font-medium
                  text-neutral-700
                  transition-all
                  duration-200
                  hover:bg-[#F5FAF7]
                  hover:text-[#085631]
                "
              >
                {link.name}
              </a>
            ))}

            {/* MOBILE GET STARTED */}
            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#085631]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_5px_18px_rgba(8,86,49,0.14)]
                transition-all
                duration-300
                hover:bg-[#064225]
                active:scale-[0.98]
              "
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;