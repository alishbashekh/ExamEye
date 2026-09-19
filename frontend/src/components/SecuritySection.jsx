
import React, { useEffect, useRef, useState } from "react";

const slides = [
  {
    number: "01",
    title: "Verify Every Identity",
    description:
      "Face verification confirms that the registered student is the one taking the exam.",
    icon: "/images/shield.png",
    bg: "#FBDAE8",
  },
  {
    number: "02",
    title: "Real-Time Gaze Tracking",
    description:
      "AI monitors gaze direction and detects unusual off-screen looking during the exam.",
    icon: "/images/eye-scan.png",
    bg: "#FFE9B3",
  },
  {
    number: "03",
    title: "AI Object Detection",
    description:
      "AI detects prohibited objects such as mobile phones and books in the camera frame.",
    icon: "/images/borders.png",
    bg: "#EAF1FF",
  },
  {
    number: "04",
    title: "Browser Lockdown",
    description:
      "Prevents tab switching, copy-paste, right-click, and fullscreen exit during the exam.",
    icon: "/images/web-security.png",
    bg: "#DAFFEE",
  },
];

const Security = () => {
  const sectionRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* --------------------------------
     SCREEN SIZE
  -------------------------------- */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  /* --------------------------------
     DESKTOP CIRCLE SCROLL ANIMATION
  -------------------------------- */
  useEffect(() => {
    let animationFrame;

    const updateCircle = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startPoint = viewportHeight;
      const endPoint = viewportHeight * 0.18;

      let progress =
        (startPoint - rect.top) / (startPoint - endPoint);

      progress = Math.max(0, Math.min(1, progress));

      setCircleProgress(progress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(updateCircle);
    };

    updateCircle();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* --------------------------------
     AUTO SLIDER
  -------------------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  /* --------------------------------
     SLIDER CONTROLS
  -------------------------------- */
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const slide = slides[activeSlide];

  const circleScale = 2.15 - circleProgress * 1.15;

  return (
    <section
      ref={sectionRef}
      id="security"
      className="relative w-full overflow-hidden bg-[#F8FBF9]"
      style={{
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(9,37,23,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(9,37,23,0.035) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div
        className="
          relative mx-auto w-full max-w-[1365px]
          px-5
          py-14
          sm:px-8 sm:py-20
          lg:px-[63px] lg:py-[115px]
        "
      >
        <div
          className="
            grid items-center
            lg:grid-cols-[minmax(0,1fr)_minmax(500px,1fr)]
            lg:gap-20
          "
        >
          {/* =====================================
              DESKTOP ILLUSTRATION
              Hidden on mobile/tablet
          ===================================== */}
          <div
            className="
              relative hidden
              min-h-[650px]
              items-center justify-center
              lg:flex
            "
          >
            {/* Green Circle */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="
                  h-[560px] w-[560px]
                  rounded-full
                  bg-[#092517]
                  transition-transform duration-300 ease-out
                "
                style={{
                  transform: `scale(${circleScale})`,
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Soft Glow */}
            <div
              className="
                pointer-events-none
                absolute left-1/2 top-1/2
                z-[1]
                h-[260px] w-[260px]
                -translate-x-1/2 -translate-y-1/2
                rounded-full
                bg-[#C5EED9]/10
                blur-[75px]
              "
            />

            {/* Illustration */}
            <div
              className="
                relative z-10
                flex w-full
                items-center justify-center
                px-4
              "
            >
              <img
                src="/images/Security illustration.png"
                alt="Exam security illustration"
                className="
                  h-auto
                  w-full
                  max-w-[600px]
                  object-contain
                  drop-shadow-[0_25px_45px_rgba(0,0,0,0.12)]
                "
              />
            </div>
          </div>

          {/* =====================================
              CONTENT
          ===================================== */}
          <div className="relative z-20">
            {/* Security Pill */}
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-[#C5EED9]
                bg-white/80
                px-3.5 py-1.5
                backdrop-blur-sm
                sm:px-4 sm:py-2
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#168052]" />

              <span
                className="
                  text-[12px]
                  font-semibold
                  tracking-[0.5px]
                  text-[#092517]
                  sm:text-[14px]
                "
              >
                Security
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                mt-5
                max-w-[650px]
                text-[34px]
                font-bold
                leading-[1.08]
                tracking-[-1.3px]
                text-[#092517]
                sm:mt-6
                sm:text-[46px]
                sm:tracking-[-1.6px]
                lg:text-[54px]
              "
            >
              At ExamEye,
              <br />
              we take exam security seriously.
            </h2>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-[610px]
                text-[15px]
                leading-6
                text-[#4B5952]
                sm:mt-6
                sm:text-[18px]
                sm:leading-[30px]
              "
            >
              Our platform is designed to ensure a secure and fair exam
              experience with multiple layers of AI-powered protection.
            </p>

            {/* =====================================
                SECURITY CARD
            ===================================== */}
            <div
              className="
                mt-8
                sm:mt-12
              "
            >
              <div className="relative px-1 sm:px-0">
                {/* Card */}
                <div
                  key={activeSlide}
                  className="
                    relative
                    min-h-[300px]
                    w-full
                    overflow-hidden
                    rounded-[24px]
                    p-6
                    shadow-[0_20px_50px_rgba(9,37,23,0.09)]
                    animate-[securityCard_450ms_ease-out]
                    sm:min-h-[325px]
                    sm:max-w-[540px]
                    sm:rounded-[28px]
                    sm:p-9
                  "
                  style={{
                    backgroundColor: slide.bg,
                  }}
                >
                  {/* Background Number */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-[-25px]
                      right-[-5px]
                      text-[110px]
                      font-bold
                      leading-none
                      text-[#092517]/[0.035]
                      sm:bottom-[-30px]
                      sm:text-[150px]
                    "
                  >
                    {slide.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="
                      relative z-10
                      flex h-[52px] w-[52px]
                      items-center justify-center
                      sm:h-[64px] sm:w-[64px]
                    "
                  >
                    <img
                      src={slide.icon}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 mt-5 sm:mt-7">
                    <p
                      className="
                        mb-1.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[1.7px]
                        text-[#092517]/60
                        sm:mb-2
                        sm:text-[12px]
                        sm:tracking-[2px]
                      "
                    >
                      Protection layer {slide.number}
                    </p>

                    <h3
                      className="
                        max-w-[430px]
                        text-[21px]
                        font-semibold
                        leading-[1.25]
                        tracking-[-0.3px]
                        text-[#092517]
                        sm:text-[26px]
                        sm:tracking-[-0.4px]
                      "
                    >
                      {slide.title}
                    </h3>

                    <p
                      className="
                        mt-2.5
                        max-w-[455px]
                        text-[14px]
                        leading-[22px]
                        text-[#26342D]
                        sm:mt-3
                        sm:text-[16px]
                        sm:leading-6
                      "
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>

                {/* Previous */}
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous security feature"
                  className="
                    group
                    absolute
                    left-[-7px]
                    top-1/2
                    z-30
                    flex
                    h-9 w-9
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-[#D7E4DC]
                    bg-white
                    shadow-[0_6px_20px_rgba(9,37,23,0.10)]
                    transition-all duration-200
                    hover:scale-105
                    hover:bg-[#092517]
                    sm:left-[-20px]
                    sm:h-11 sm:w-11
                  "
                >
                  <span
                    className="
                      block
                      h-[8px] w-[8px]
                      -rotate-45
                      border-b-2 border-l-2
                      border-[#092517]
                      transition-colors
                      group-hover:border-white
                      sm:h-[9px] sm:w-[9px]
                    "
                  />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next security feature"
                  className="
                    group
                    absolute
                    right-[-7px]
                    top-1/2
                    z-30
                    flex
                    h-9 w-9
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-[#D7E4DC]
                    bg-white
                    shadow-[0_6px_20px_rgba(9,37,23,0.10)]
                    transition-all duration-200
                    hover:scale-105
                    hover:bg-[#092517]
                    sm:right-[-20px]
                    sm:h-11 sm:w-11
                  "
                >
                  <span
                    className="
                      block
                      h-[8px] w-[8px]
                      rotate-45
                      border-r-2 border-t-2
                      border-[#092517]
                      transition-colors
                      group-hover:border-white
                      sm:h-[9px] sm:w-[9px]
                    "
                  />
                </button>
              </div>

              {/* Pagination */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  sm:mt-6
                  sm:justify-start
                "
              >
                {slides.map((item, index) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to security feature ${index + 1}`}
                    className={`
                      h-2
                      rounded-full
                      transition-all duration-300
                      ${
                        activeSlide === index
                          ? "w-8 bg-[#092517]"
                          : "w-2 bg-[#AFC7B9] hover:bg-[#6D8A7B]"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes securityCard {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Security;

