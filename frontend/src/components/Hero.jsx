import React, { useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHowItWorksHovered, setIsHowItWorksHovered] = useState(false);

  // Smooth Scroll Functionality
  const handleScrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback agar ID dhoondne mein problem ho
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative mx-auto h-[680px] w-full max-w-[1365px]">

        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div className="absolute left-[63px] top-[104px] z-20">

          {/* Small Heading */}
          <p className="mb-[43px] text-[28px] font-semibold leading-none tracking-[-0.8px] text-[#202020]">
            AI-POWERED ONLINE EXAMINATION
          </p>

          {/* Main Heading */}
          <h1
            className="
              mb-[32px]
              text-[64px]
              font-black
              leading-[1.08]
              tracking-[-2.7px]
              text-[#1d1d1d]
            "
            style={{
              fontFamily: "Arial Black, Arial, sans-serif",
            }}
          >
            Smarter Exams.
            <br />
            Fairer Assessments.
          </h1>

          {/* Description */}
          <p className="text-[29px] leading-[1.45] tracking-[-0.8px] text-[#292929]">
            ExamEye makes online exams simple, secure, and
            <br />
            reliable with AI-powered monitoring for a fair
            <br />
            testing experience.
          </p>

          {/* Buttons */}
          <div className="mt-[66px] flex gap-[19px]">

            {/* =================================================
                GET STARTED - ANIMATED
            ================================================== */}
            <button
              type="button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="
                relative
                h-[68px]
                w-[286px]
                overflow-hidden
                rounded-[9px]
                bg-[#062D20]
                text-white
              "
            >
              {/* Sliding text container */}
              <div
                className="absolute inset-0"
                style={{
                  transform: isHovered
                    ? "translateY(-65px)"
                    : "translateY(0px)",
                  transition:
                    "transform 270ms cubic-bezier(0.42, 0, 0.58, 1)",
                }}
              >
                {/* First Get Started */}
                <span
                  className="
                    absolute
                    left-1/2
                    top-[14px]
                    -translate-x-1/2
                    whitespace-nowrap
                    text-[25px]
                    font-medium
                    leading-[45px]
                  "
                >
                  Get Started
                </span>

                {/* Second Get Started */}
                <span
                  className="
                    absolute
                    left-1/2
                    top-[79px]
                    -translate-x-1/2
                    whitespace-nowrap
                    text-[25px]
                    font-medium
                    leading-[45px]
                  "
                >
                  Get Started →
                </span>
              </div>
            </button>

            {/* =================================================
                HOW IT WORKS - ANIMATED & WORKING CLICK
            ================================================== */}
            <button
              type="button"
              onClick={handleScrollToHowItWorks}
              onMouseEnter={() => setIsHowItWorksHovered(true)}
              onMouseLeave={() => setIsHowItWorksHovered(false)}
              className="
                relative
                h-[68px]
                w-[286px]
                overflow-hidden
                rounded-[9px]
                border-[3px]
                border-[#062D20]
                bg-white
                text-[25px]
                font-medium
                text-[#062D20]
                flex
                items-center
                justify-center
                cursor-pointer
              "
            >
              {/* Button Text */}
              <span
                className={`
                  transition-transform 
                  duration-300 
                  ease-out
                  whitespace-nowrap
                  z-10
                  ${isHowItWorksHovered ? "-translate-x-3" : "translate-x-0"}
                `}
              >
                How It Works
              </span>

              {/* Dynamic Bottom-Right Notch to Arrow Pill Expansion */}
              <div
                className={`
                  absolute
                  right-0
                  bottom-0
                  top-0
                  bg-[#062D20]
                  text-white
                  flex
                  items-center
                  justify-center
                  z-20
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    isHowItWorksHovered
                      ? "w-[56px] opacity-100"
                      : "w-[22px] h-[22px] top-auto left-auto rounded-tl-[4px]"
                  }
                `}
                style={{
                  clipPath: isHowItWorksHovered
                    ? "polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* Arrow Icon inside Pill */}
                <span
                  className={`
                    text-[22px]
                    font-bold
                    transition-all
                    duration-300
                    transform
                    ${
                      isHowItWorksHovered
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-2 opacity-0 scale-50"
                    }
                  `}
                >
                  ↓
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* =====================================================
            OPEN GRID
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0">

          {/* Vertical Lines */}

          <span className="absolute left-[836px] top-[24px] h-[656px] w-px bg-[#d8e4df]" />

          <span className="absolute left-[969px] top-[24px] h-[656px] w-px bg-[#d8e4df]" />

          <span className="absolute left-[1102px] top-[24px] h-[656px] w-px bg-[#d8e4df]" />

          <span className="absolute left-[1235px] top-[24px] h-[656px] w-px bg-[#d8e4df]" />

          {/* Horizontal Lines */}

          <span className="absolute left-[738px] top-[152px] h-px w-[622px] bg-[#d8e4df]" />

          <span className="absolute left-[738px] top-[285px] h-px w-[622px] bg-[#d8e4df]" />

          <span className="absolute left-[738px] top-[418px] h-px w-[622px] bg-[#d8e4df]" />

          <span className="absolute left-[738px] top-[552px] h-px w-[622px] bg-[#d8e4df]" />

        </div>

        {/* =====================================================
            HERO IMAGE
        ====================================================== */}

        <div
          className="
            absolute
            right-[80px]
            top-[82px]
            z-10
            h-[500px]
            w-[400px]
            overflow-hidden
            rounded-[18px]
          "
        >
          <img
            src="/images/Hero image.jpg"
            alt="Online examination"
            className="h-full w-full object-cover"
          />
        </div>

        {/* =====================================================
            TOP MONITOR ICON
        ====================================================== */}

        <div
          className="
            absolute
            right-[450px]
            top-[20px]
            z-30
            flex
            h-[95px]
            w-[96px]
            items-center
            justify-center
            rounded-[11px]
            border
            border-[#168052]
            bg-[#063024]
            shadow-[0_2px_8px_rgba(0,0,0,0.18)]
          "
        >
          <img
            src="/images/icon-monitor.svg"
            alt=""
            className="h-[55px] w-[55px] object-contain"
          />
        </div>

        {/* =====================================================
            LOCK ICON
        ====================================================== */}

        <div
          className="
            absolute
            right-[480px]
            top-[407px]
            z-30
            flex
            h-[95px]
            w-[96px]
            items-center
            justify-center
            rounded-[11px]
            border
            border-[#168052]
            bg-[#063024]
            shadow-[0_2px_8px_rgba(0,0,0,0.18)]
          "
        >
          <img
            src="/images/icon-lock.svg"
            alt=""
            className="h-[58px] w-[58px] object-contain"
          />
        </div>

        {/* =====================================================
            FACE SCAN ICON
        ====================================================== */}

        <div
          className="
            absolute
            right-[410px]
            top-[330px]
            z-30
            flex
            h-[95px]
            w-[96px]
            items-center
            justify-center
            rounded-[11px]
            border
            border-[#168052]
            bg-[#063024]
            shadow-[0_2px_8px_rgba(0,0,0,0.18)]
          "
        >
          <img
            src="/images/icon-face.svg"
            alt=""
            className="h-[58px] w-[58px] object-contain"
          />
        </div>

        {/* =====================================================
            CAMERA ICON
        ====================================================== */}

        <div
          className="
            absolute
            bottom-[58px]
            right-[21px]
            z-30
            flex
            h-[95px]
            w-[95px]
            items-center
            justify-center
            rounded-[11px]
            border
            border-[#168052]
            bg-[#063024]
            shadow-[0_2px_8px_rgba(0,0,0,0.18)]
          "
        >
          <img
            src="/images/icon-camera.svg"
            alt=""
            className="h-[58px] w-[58px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;