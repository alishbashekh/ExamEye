import React from "react";

const features = [
  {
    image: "/images/verify.png",
    icon: "/images/icon-face.svg",
    badge: "Identity Verification",
    title: "Verify Before You Begin",
    description:
      "Before the exam starts, ExamEye performs a quick browser-based biometric face scan to verify the student's identity. The system confirms that the registered student is the person entering the exam before granting access.",
    imageFirst: true,
  },
  {
    image: "/images/Eye Monitor.png",
    icon: "/images/icon-camera.svg",
    badge: "Exam Monitoring",
    title: "Keep Focus on the Exam",
    description:
      "During the exam, ExamEye uses real-time facial and gaze tracking to detect when a student repeatedly looks away from the screen. Suspicious gaze activity is flagged automatically for review.",
    imageFirst: false,
  },
  {
    image: "/images/object detection.png",
    icon: "/images/icon-monitor.svg",
    badge: "Object Detection",
    title: "Detect What Doesn’t Belong",
    description:
      "ExamEye analyzes the webcam frame in real time to identify prohibited objects such as mobile phones and books. When a suspicious object appears, the system flags the activity for the teacher.",
    imageFirst: true,
  },
  {
    image: "/images/identity verify.png",
    icon: "/images/icon-lock.svg",
    badge: "Browser Lockdown",
    title: "Secure the Exam Environment",
    description:
      "ExamEye creates a controlled browser environment by restricting tab switching, copy-paste, right-clicking, and exiting fullscreen. This helps prevent students from accessing outside resources during the exam.",
    imageFirst: false,
  },
];

const FeatureVisual = ({ feature, index }) => {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="relative w-full">
      {/* OUTER VISUAL CARD */}
      <div
        className="
          group
          relative
          h-[260px]
          w-full
          overflow-hidden
          rounded-[20px]
          border
          border-[#D9E8E0]
          bg-white
          p-2.5
          shadow-[0_10px_30px_rgba(6,45,32,0.05)]
          transition-all
          duration-500
          sm:h-[340px]
          sm:rounded-[28px]
          sm:p-4
          lg:aspect-[1.28/1]
          lg:h-auto
          lg:overflow-visible
          lg:hover:-translate-y-1
          lg:hover:shadow-[0_28px_75px_rgba(6,45,32,0.12)]
        "
      >
        {/* SUBTLE INNER GRID */}
        <div
          className="
            pointer-events-none
            absolute
            inset-2.5
            overflow-hidden
            rounded-[14px]
            opacity-30
            sm:inset-4
            sm:rounded-[21px]
            sm:opacity-40
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
            backgroundSize: "24px 24px",
          }}
        />

        {/* MAIN IMAGE CONTAINER */}
        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-[14px]
            bg-white
            p-2
            sm:rounded-[21px]
            sm:p-4
          "
        >
          <img
            src={feature.image}
            alt={feature.title}
            className="
              max-h-full
              w-full
              object-contain
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.025]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[14px]
              bg-gradient-to-t
              from-[#062D20]/[0.035]
              via-transparent
              to-white/[0.04]
              sm:rounded-[21px]
            "
          />

          {/* FEATURE NUMBER BADGE */}
          <div
            className="
              absolute
              right-2.5
              top-2.5
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#DCE8E2]
              bg-white/95
              px-2.5
              py-1
              shadow-sm
              backdrop-blur-md
              sm:right-4
              sm:top-4
              sm:gap-2
              sm:px-3
              sm:py-1.5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#092517]" />

            <span
              className="
                text-[8px]
                font-bold
                tracking-[0.1em]
                text-[#092517]
                sm:text-[9px]
                sm:tracking-[0.12em]
              "
            >
              FEATURE {stepNumber}
            </span>
          </div>
        </div>

        {/* FLOATING FEATURE BADGE - DESKTOP ONLY */}
        <div
          className={`
            hidden
            lg:absolute
            lg:bottom-[-22px]
            lg:z-30
            lg:flex
            lg:min-h-[110px]
            lg:w-[145px]
            lg:flex-col
            lg:items-center
            lg:justify-center
            lg:rounded-[16px]
            lg:border
            lg:border-[#092517]/30
            lg:bg-[#092517]
            lg:p-3
            lg:shadow-[0_12px_30px_rgba(6,45,32,0.20)]
            lg:transition-transform
            lg:duration-500
            lg:group-hover:-translate-y-1
            ${
              index % 2 === 0
                ? "lg:left-[-20px]"
                : "lg:left-auto lg:right-[-20px]"
            }
          `}
        >
          <div
            className="
              relative
              mb-2
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-[10px]
              bg-[#EAF7F0]
              shadow-inner
            "
          >
            <img
              src={feature.icon}
              alt=""
              className="h-6 w-6 object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(11%) sepia(34%) saturate(1636%) hue-rotate(106deg) brightness(92%) contrast(97%)",
              }}
            />
          </div>

          <span
            className="
              text-center
              text-[11px]
              font-semibold
              leading-tight
              text-white
            "
          >
            {feature.badge}
          </span>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FEFDFC]
        px-4
        py-8
        sm:px-6
        sm:py-16
        lg:px-10
        lg:pb-[100px]
        lg:pt-0
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[250px]
          w-[350px]
          -translate-x-1/2
          rounded-full
          bg-[#F5FAF7]
          blur-[70px]
          sm:h-[350px]
          sm:w-[600px]
          sm:blur-[100px]
        "
      />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px]">
        {/* SECTION HEADER */}
        <div
          className="
            mx-auto
            mb-8
            max-w-[850px]
            text-center
            sm:mb-12
            lg:mb-[60px]
          "
        >
          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#092517]/15
              bg-white/80
              px-3
              py-1
              shadow-sm
              backdrop-blur-sm
              sm:px-4
              sm:py-1.5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#092517]" />

            <span
              className="
                text-[9px]
                font-bold
                tracking-[0.14em]
                text-[#092517]
                sm:text-[10px]
                sm:tracking-[0.16em]
              "
            >
              CORE CAPABILITIES
            </span>
          </div>

          <h2
            className="
              text-[26px]
              font-extrabold
              leading-[1.2]
              tracking-tight
              text-[#092517]
              sm:text-[38px]
              sm:tracking-[-1.2px]
              lg:text-[46px]
            "
          >
            Four Layers of Protection{" "}
            <span className="block text-[#092517]">
              for Safer Exams
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-2.5
              max-w-[720px]
              text-[13px]
              leading-[1.6]
              text-[#59655F]
              sm:mt-3
              sm:text-[16px]
              lg:text-[17px]
            "
          >
            ExamEye works quietly in the background to protect every stage of
            an online examination, from verifying who enters to securing the
            browser throughout the exam.
          </p>
        </div>

        {/* FEATURE JOURNEY */}
        <div className="relative">
          {/* DESKTOP CENTER LINE */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              top-0
              hidden
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#092517]/15
              to-transparent
              lg:block
            "
          />

          {/* FEATURE ROWS */}
          <div className="space-y-10 sm:space-y-16 lg:space-y-[95px]">
            {features.map((feature, index) => {
              const isImageLeft = feature.imageFirst;

              return (
                <div
                  key={feature.title}
                  className="
                    relative
                    grid
                    grid-cols-1
                    items-center
                    gap-5
                    sm:gap-8
                    lg:grid-cols-2
                    lg:gap-[90px]
                  "
                >
                  {/* DESKTOP CENTER NUMBER */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-30
                      hidden
                      h-[52px]
                      w-[52px]
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border-[4px]
                      border-[#FEFDFC]
                      bg-[#092517]
                      shadow-[0_8px_30px_rgba(6,45,32,0.18)]
                      lg:flex
                    "
                  >
                    <span className="text-[12px] font-bold tracking-[0.08em] text-[#C5EED9]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* IMAGE CONTENT */}
                  <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
                    <FeatureVisual feature={feature} index={index} />
                  </div>

                  {/* TEXT CONTENT */}
                  <div
                    className={`
                      relative
                      ${isImageLeft ? "lg:order-2" : "lg:order-1"}
                    `}
                  >
                    {/* MOBILE INLINE BADGE & STEP */}
                    <div className="mb-3 flex items-center justify-between lg:hidden">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#092517]">
                          <span className="text-[9px] font-bold text-[#C5EED9]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <span className="h-px w-6 bg-[#092517]/20" />
                      </div>

                      {/* CLEAN MOBILE BADGE */}
                      <div className="flex items-center gap-1.5 rounded-full border border-[#092517]/15 bg-[#092517]/5 px-2.5 py-1">
                        <img
                          src={feature.icon}
                          alt=""
                          className="h-3.5 w-3.5 object-contain"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(11%) sepia(34%) saturate(1636%) hue-rotate(106deg) brightness(92%) contrast(97%)",
                          }}
                        />

                        <span className="text-[10px] font-semibold text-[#092517]">
                          {feature.badge}
                        </span>
                      </div>
                    </div>

                    {/* DESKTOP STEP */}
                    <div className="mb-3 hidden items-center gap-3 lg:flex">
                      <span className="h-px w-8 bg-[#092517]/40" />

                      <span className="text-[10px] font-bold tracking-[0.16em] text-[#092517]">
                        SYSTEM MODULE {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                        max-w-[480px]
                        text-[20px]
                        font-extrabold
                        leading-tight
                        text-[#092517]
                        sm:text-[26px]
                        lg:text-[32px]
                      "
                    >
                      {feature.title}
                    </h3>

                    {/* ACCENT */}
                    <div className="mt-2 h-[3px] w-8 rounded-full bg-[#092517] sm:mt-3 sm:w-10" />

                    {/* DESCRIPTION */}
                    <p
                      className="
                        mt-2.5
                        max-w-[500px]
                        text-[13px]
                        leading-[1.6]
                        text-[#4B5563]
                        sm:mt-4
                        sm:text-[15px]
                        lg:text-[17px]
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
