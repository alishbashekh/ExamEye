import React, { useState } from "react";
import { ShieldCheck, Video, Lock, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHowItWorksHovered, setIsHowItWorksHovered] = useState(false);

  const navigate = useNavigate();

  const handleScrollToFeatures = (e) => {
    e.preventDefault();

    const element = document.getElementById("features");

    if (element) {
      const navbarHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="
        relative
        min-h-0
        overflow-hidden
        bg-[#FEFDFC]
        pt-[25px]
        pb-[20px]
        sm:min-h-screen
        sm:pt-[0px]
        sm:pb-[60px]
        lg:pb-[70px]
      "
    >
      {/* TECHNICAL GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.25]
          sm:opacity-[0.32]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(6,45,32,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(6,45,32,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* RIGHT AMBIENT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          right-[3%]
          top-[18%]
          hidden
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#168052]/[0.06]
          blur-[90px]
          lg:block
        "
      />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1365px]
          flex-col
          gap-[20px]
          px-5
          sm:gap-[50px]
          sm:px-8
          lg:min-h-[680px]
          lg:flex-row
          lg:items-center
          lg:gap-[25px]
          lg:px-[45px]
          xl:px-[63px]
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            relative
            z-20
            w-full
            lg:w-[49%]
            xl:w-[48%]
          "
        >
          {/* BADGE */}
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#092517]/10
              bg-white/75
              px-3.5
              py-1.5
              shadow-[0_8px_30px_rgba(6,45,32,0.05)]
              backdrop-blur-md
              sm:mb-7
              sm:gap-2.5
              sm:px-4
              sm:py-2
            "
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[#168052]
                  opacity-40
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#168052]
                  sm:h-2
                  sm:w-2
                "
              />
            </span>

            <span
              className="
                text-[9px]
                font-semibold
                tracking-[0.12em]
                text-[#092517]
                sm:text-[11px]
                sm:tracking-[0.18em]
              "
            >
              AI-POWERED ONLINE EXAMINATION
            </span>
          </div>

          {/* HEADING */}
          <h1
            className="
              max-w-[700px]
              text-[40px]
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              text-[#092517]
              sm:text-[52px]
              md:text-[58px]
              lg:text-[57px]
              xl:text-[62px]
            "
          >
            <span className="block">Smarter Exams.</span>

            <span className="block text-[#092517]">
              Fairer Assessments.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-[570px]
              text-[14px]
              leading-[1.7]
              text-[#53645E]
              sm:mt-7
              sm:text-[16px]
              sm:leading-[1.8]
            "
          >
            ExamEye makes online exams simple, secure, and reliable with
            AI-powered monitoring for a fair testing experience.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-7
              flex
              w-full
              flex-row
              gap-3
              sm:mt-8
              sm:flex-row
              sm:items-center
            "
          >
            {/* GET STARTED */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="
                relative
                h-[52px]
                min-w-0
                flex-1
                overflow-hidden
                rounded-[9px]
                bg-[#092517]
                px-3
                text-[13px]
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(9,37,23,0.14)]
                transition-shadow
                duration-300
                hover:shadow-[0_16px_38px_rgba(9,37,23,0.24)]
                sm:h-[58px]
                sm:w-[190px]
                sm:flex-none
                sm:px-7
                sm:text-[15px]
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  transition-transform
                  duration-[270ms]
                  ease-[cubic-bezier(0.42,0,0.58,1)]
                "
                style={{
                  transform: isHovered
                    ? "translateY(-120%)"
                    : "translateY(0)",
                }}
              >
                Get Started
              </span>

              <span
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  transition-transform
                  duration-[270ms]
                  ease-[cubic-bezier(0.42,0,0.58,1)]
                "
                style={{
                  transform: isHovered
                    ? "translateY(0)"
                    : "translateY(120%)",
                }}
              >
                Get Started
                <span className="text-[17px]">→</span>
              </span>
            </button>

            {/* HOW IT WORKS */}
            <button
              type="button"
              onClick={handleScrollToFeatures}
              onMouseEnter={() => setIsHowItWorksHovered(true)}
              onMouseLeave={() => setIsHowItWorksHovered(false)}
              className="
                group
                relative
                h-[52px]
                min-w-0
                flex-1
                overflow-hidden
                rounded-[9px]
                border-[1.5px]
                border-[#092517]
                bg-white/80
                px-3
                text-[13px]
                font-semibold
                text-[#092517]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-[#EAF7F0]
                sm:h-[58px]
                sm:w-[190px]
                sm:flex-none
                sm:px-7
                sm:text-[15px]
              "
            >
              <span
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-transform
                  duration-300
                  sm:gap-3
                "
                style={{
                  transform: isHowItWorksHovered
                    ? "translateY(2px)"
                    : "translateY(0)",
                }}
              >
                How It Works

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible sm:h-5 sm:w-5"
                >
                  <line
                    x1="12"
                    y1="4"
                    x2="12"
                    y2={isHowItWorksHovered ? "17" : "14"}
                    stroke="#092517"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      transition:
                        "y2 320ms cubic-bezier(0.42, 0, 0.58, 1)",
                    }}
                  />

                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#092517"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isHowItWorksHovered
                        ? "translateY(2px)"
                        : "translateY(0)",
                      transition:
                        "transform 320ms cubic-bezier(0.42, 0, 0.58, 1)",
                    }}
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* TRUST HIGHLIGHTS */}
          <div
            className="
              mt-8
              grid
              grid-cols-3
              items-center
              border-t
              border-[#092517]/10
              pt-5
              sm:mt-9
              sm:flex
              sm:flex-wrap
              sm:gap-x-6
              sm:gap-y-4
            "
          >
            {/* FACE VERIFICATION */}
            <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF7F0] sm:h-8 sm:w-8">
                <ShieldCheck className="h-3.5 w-3.5 text-[#092517] sm:h-4 sm:w-4" />
              </div>

              <p className="text-center text-[9px] font-semibold text-[#092517] sm:text-left sm:text-[11px]">
                Face Verification
              </p>
            </div>

            <div className="hidden h-7 w-px bg-[#092517]/10 sm:block" />

            {/* AI MONITORING */}
            <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF7F0] sm:h-8 sm:w-8">
                <Video className="h-3.5 w-3.5 text-[#092517] sm:h-4 sm:w-4" />
              </div>

              <p className="text-center text-[9px] font-semibold text-[#092517] sm:text-left sm:text-[11px]">
                AI Monitoring
              </p>
            </div>

            <div className="hidden h-7 w-px bg-[#092517]/10 sm:block" />

            {/* SECURE EXAMS */}
            <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF7F0] sm:h-8 sm:w-8">
                <Lock className="h-3.5 w-3.5 text-[#092517] sm:h-4 sm:w-4" />
              </div>

              <p className="text-center text-[9px] font-semibold text-[#092517] sm:text-left sm:text-[11px]">
                Secure Exams
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div
          className="
            relative
            hidden
            min-h-[500px]
            w-full
            items-center
            justify-center
            sm:flex
            lg:min-h-[620px]
            lg:w-[51%]
          "
        >
          {/* OUTER CIRCLE */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[530px]
              w-[530px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#168052]/10
            "
          />

          {/* DASHED CIRCLE */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[430px]
              w-[430px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-dashed
              border-[#168052]/15
            "
          />

          {/* BACK CARD 1 */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[475px]
              w-[385px]
              -translate-x-[42%]
              -translate-y-[48%]
              rotate-[5deg]
              rounded-[28px]
              border
              border-[#168052]/20
              bg-[#EAF7F0]/40
              lg:h-[505px]
              lg:w-[410px]
            "
          />

          {/* BACK CARD 2 */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[475px]
              w-[385px]
              -translate-x-[57%]
              -translate-y-[52%]
              -rotate-[4deg]
              rounded-[28px]
              border
              border-[#092517]/[0.07]
              bg-white/40
              lg:h-[505px]
              lg:w-[410px]
            "
          />

          {/* MAIN IMAGE CARD */}
          <div
            className="
              relative
              z-10
              h-[500px]
              w-[385px]
              overflow-hidden
              rounded-[26px]
              border
              border-white/80
              bg-white/70
              p-2
              shadow-[0_25px_65px_rgba(6,45,32,0.15)]
              backdrop-blur-xl
              lg:h-[530px]
              lg:w-[420px]
            "
          >
            <div
              className="
                relative
                h-full
                w-full
                overflow-hidden
                rounded-[20px]
                bg-[#EAF7F0]
              "
            >
              <img
                src="/images/Hero image.jpg"
                alt="ExamEye AI powered online examination"
                className="h-full w-full object-cover"
              />

              {/* BOTTOM GRADIENT */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#062D20]/35
                  via-transparent
                  to-transparent
                "
              />

              {/* SCAN LINE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-[30%]
                  h-[1px]
                  bg-[#C5EED9]/80
                  shadow-[0_0_14px_3px_rgba(197,238,217,0.65)]
                  animate-[scan_4s_ease-in-out_infinite]
                "
              />

              {/* CORNER BRACKETS */}
              <div className="absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-white/80" />
              <div className="absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-white/80" />
              <div className="absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-white/80" />
              <div className="absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-white/80" />

              {/* FACE DETECTION POINT */}
              <div
                className="
                  absolute
                  left-[50%]
                  top-[40%]
                  flex
                  h-[80px]
                  w-[80px]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C5EED9]/70
                  bg-[#C5EED9]/5
                "
              >
                <div
                  className="
                    h-[9px]
                    w-[9px]
                    rounded-full
                    bg-[#C5EED9]
                    shadow-[0_0_15px_4px_rgba(197,238,217,0.6)]
                  "
                />
              </div>

              {/* AI MONITORING BADGE */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-[#062D20]/65
                  px-3
                  py-2
                  backdrop-blur-md
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#75F6B6]
                    shadow-[0_0_8px_2px_rgba(117,246,182,0.5)]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    tracking-[0.16em]
                    text-white
                  "
                >
                  AI MONITORING ACTIVE
                </span>
              </div>

              {/* IDENTITY VERIFIED */}
              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  flex
                  items-center
                  justify-between
                  rounded-[14px]
                  border
                  border-white/20
                  bg-[#062D20]/75
                  px-4
                  py-3
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#C5EED9]
                    "
                  >
                    <ShieldCheck className="h-5 w-5 text-[#092517]" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-white">
                      Identity Verified
                    </p>

                    <p className="mt-0.5 text-[8px] text-white/60">
                      Student securely authenticated
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[#75F6B6]/20
                  "
                >
                  <span className="text-[12px] text-[#75F6B6]">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CARD - LIVE MONITOR */}
          <div
            className="
              absolute
              left-[0%]
              top-[21%]
              z-20
              hidden
              items-center
              gap-3
              rounded-[14px]
              border
              border-white/80
              bg-white/80
              px-3
              py-3
              shadow-[0_15px_40px_rgba(6,45,32,0.12)]
              backdrop-blur-xl
              sm:flex
              lg:left-[-2%]
            "
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EAF7F0]">
              <Video className="h-5 w-5 text-[#092517]" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#092517]">
                Live Monitor
              </p>

              <p className="mt-0.5 text-[8px] text-[#708079]">
                AI Proctoring
              </p>
            </div>
          </div>

          {/* FLOATING LOCK */}
          <div
            className="
              absolute
              right-[0%]
              top-[15%]
              z-20
              hidden
              h-[58px]
              w-[58px]
              items-center
              justify-center
              rounded-[16px]
              border
              border-white/90
              bg-white/80
              shadow-[0_15px_40px_rgba(6,45,32,0.12)]
              backdrop-blur-xl
              sm:flex
              sm:right-[1%]
            "
          >
            <div className="absolute inset-2 rounded-[11px] border border-[#168052]/10" />

            <Lock className="relative h-6 w-6 text-[#092517]" />
          </div>

          {/* FLOATING SECURE FEED */}
          <div
            className="
              absolute
              bottom-[14%]
              right-[-1%]
              z-20
              hidden
              items-center
              gap-3
              rounded-[14px]
              border
              border-white/80
              bg-white/80
              px-3
              py-3
              shadow-[0_15px_40px_rgba(6,45,32,0.12)]
              backdrop-blur-xl
              sm:flex
              lg:right-[-2%]
            "
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#092517]">
              <Camera className="h-5 w-5 text-white" />

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#75F6B6] ring-2 ring-white" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#092517]">
                Secure Feed
              </p>

              <p className="mt-0.5 text-[8px] text-[#708079]">
                Protected stream
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-8
          bg-gradient-to-b
          from-transparent
          to-[#FEFDFC]
          sm:h-28
        "
      />

      {/* KEYFRAME STYLING */}
      <style>
        {`
          @keyframes scan {
            0% {
              transform: translateY(-80px);
              opacity: 0;
            }

            15% {
              opacity: 1;
            }

            50% {
              opacity: 1;
            }

            85% {
              opacity: 1;
            }

            100% {
              transform: translateY(350px);
              opacity: 0;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;