import React, { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Verify Every Identity:",
    description:
      "Face verification confirms that the registered student is the one taking the exam.",
    icon: "/images/shield.png",
    bg: "#FBDAE8",
  },
  {
    title: "Real-Time Gaze Tracking:",
    description:
      "AI monitors gaze direction and detects unusual off-screen looking during the exam.",
    icon: "/images/eye-scan.png",
    bg: "#FFE9B3",
  },
  {
    title: "AI Object Detection:",
    description:
      "AI detects prohibited objects such as mobile phones and books in the camera frame.",
    icon: "/images/borders.png",
    bg: "#EAF1FF",
  },
  {
    title: "Browser Lockdown:",
    description:
      "Prevents tab switching, copy-paste, right-click, and fullscreen exit during the exam.",
    icon: "/images/web-security.png",
    bg: "#DAFFEE",
  },
];

const Security = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const autoSlideRef = useRef(null);

  /* =====================================================
     SCROLL ANIMATION
  ====================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     CAROUSEL FUNCTIONS
  ====================================================== */

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

  /* =====================================================
     AUTOMATIC CARD CHANGE
  ====================================================== */

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 2800);

    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, []);

  /* =====================================================
     RESET AUTO SLIDE AFTER USER INTERACTION
  ====================================================== */

  useEffect(() => {
    if (activeSlide === null) return;

    clearInterval(autoSlideRef.current);

    autoSlideRef.current = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 2800);

    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, [activeSlide]);

  const slide = slides[activeSlide];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        border-2
        border-[#085631]
        bg-white
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-10
        lg:py-[110px]
      "
      style={{
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[1448px]">
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-12
            lg:grid-cols-[1fr_603px]
            lg:gap-[55px]
          "
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div
            className="
              relative
              flex
              min-h-[650px]
              items-center
              justify-center
              overflow-visible
            "
          >
            {/* =================================================
                GREEN ANIMATED BACKGROUND
            ================================================= */}

            <div
              className="
                absolute
                z-0
                rounded-full
                bg-[#085631]
                transition-all
                duration-[700ms]
              "
              style={{
                width: isVisible ? "560px" : "1971px",
                height: isVisible ? "560px" : "1377px",

                /*
                  Before animation:
                  huge green shape

                  After animation:
                  centered 560px circle
                */
                left: isVisible ? "50%" : "-410px",
                top: isVisible ? "50%" : "-224px",

                transform: isVisible
                  ? "translate(-50%, -50%)"
                  : "translate(0, 0)",

                transitionTimingFunction:
                  "cubic-bezier(0.42, 0, 0.58, 1)",
              }}
            />

            {/* =================================================
                SECURITY ILLUSTRATION
            ================================================= */}

            <div
              className="
                relative
                z-10
                flex
                w-full
                items-center
                justify-center
              "
            >
              <img
                src="/images/Security illustration.png"
                alt="Exam security illustration"
                className="
                  h-auto
                  w-full
                  max-w-[650px]
                  object-contain
                "
              />
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="relative z-20 pt-2 lg:pt-0">
            {/* =================================================
                SECURITY PILL
            ================================================= */}

            <div
              className="
                inline-flex
                h-[41px]
                min-w-[137px]
                items-center
                justify-center
                rounded-[10px]
                border-2
                border-[rgba(42,129,88,0.70)]
                bg-[#FCFBFC]
                px-5
              "
            >
              <span
                className="
                  text-[20px]
                  font-medium
                  leading-[45px]
                  text-[#092517]
                "
              >
                Security
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mt-[30px]">
              <h2
                className="
                  text-[43px]
                  font-semibold
                  leading-[45px]
                  tracking-[-1.2px]
                  text-[#1E1E1E]
                  sm:text-[45px]
                "
              >
                At ExamEye,
                <br />
                we take exam security seriously.
              </h2>

              {/* =================================================
                  SUBTITLE
              ================================================= */}

              <p
                className="
                  mt-[27px]
                  max-w-[623px]
                  text-[20px]
                  font-normal
                  leading-[34px]
                  text-[#1E1E1E]
                "
              >
                Our platform is designed to ensure a secure and fair exam
                experience with multiple layers of AI-powered protection.
              </p>
            </div>

            {/* =================================================
                CAROUSEL
            ================================================= */}

            <div className="mt-[90px]">
              <div
                className="
                  relative
                  h-[365px]
                  w-full
                  max-w-[603px]
                "
              >
                {/* =================================================
                    LEFT ARROW
                ================================================= */}

                <button
                  onClick={previousSlide}
                  aria-label="Previous security feature"
                  className="
                    absolute
                    left-0
                    top-1/2
                    z-30
                    flex
                    h-[58px]
                    w-[34px]
                    -translate-y-1/2
                    rotate-180
                    items-center
                    justify-center
                    border-0
                    bg-transparent
                    p-0
                    transition-transform
                    duration-200
                    hover:scale-105
                  "
                >
                  <span
                    className="
                      block
                      h-[58px]
                      w-[34px]
                      bg-[#1E1E1E]
                    "
                    style={{
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    }}
                  />
                </button>

                {/* =================================================
                    CARD
                ================================================= */}

                <div
                  key={activeSlide}
                  className="
                    absolute
                    left-[112px]
                    top-0
                    h-[311px]
                    w-[379px]
                    rounded-[35px]
                    animate-[securityCard_400ms_ease-in-out]
                  "
                  style={{
                    backgroundColor: slide.bg,
                  }}
                >
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      flex-col
                      px-[40px]
                      pb-[65px]
                      pt-[45px]
                    "
                  >
                    {/* ICON */}

                    <img
                      src={slide.icon}
                      alt=""
                      className="
                        h-[62px]
                        w-[62px]
                        object-contain
                      "
                    />

                    {/* TEXT */}

                    <div className="mt-[37px]">
                      <h3
                        className="
                          text-[25px]
                          font-medium
                          leading-[34px]
                          text-[#1E1E1E]
                        "
                      >
                        {slide.title}
                      </h3>

                      <p
                        className="
                          mt-[14px]
                          text-[16px]
                          font-normal
                          leading-[21px]
                          text-[#1E1E1E]
                        "
                      >
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    RIGHT ARROW
                ================================================= */}

                <button
                  onClick={nextSlide}
                  aria-label="Next security feature"
                  className="
                    absolute
                    right-0
                    top-1/2
                    z-30
                    flex
                    h-[58px]
                    w-[34px]
                    -translate-y-1/2
                    items-center
                    justify-center
                    border-0
                    bg-transparent
                    p-0
                    transition-transform
                    duration-200
                    hover:scale-105
                  "
                >
                  <span
                    className="
                      block
                      h-[58px]
                      w-[34px]
                      bg-[#1E1E1E]
                    "
                    style={{
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    }}
                  />
                </button>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-[35px]
                    flex
                    items-center
                    gap-[10px]
                  "
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className="
                        h-[19px]
                        w-[19px]
                        rounded-full
                        transition-all
                        duration-200
                      "
                      style={{
                        backgroundColor:
                          activeSlide === index
                            ? "#5BBE2F"
                            : "#436556",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CARD CHANGE ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes securityCard {
            0% {
              opacity: 0;
              transform: translateX(20px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Security;