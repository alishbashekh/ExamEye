import React from "react";

const features = [
  {
    image: "/images/verify.png",
    icon: "/images/icon-face.svg",
    badge: "Identity\nVerification",
    title: "Verify Before You Begin",
    description:
      "Before the exam starts, ExamEye performs a quick browser-based biometric face scan to verify the student's identity. The system confirms that the registered student is the person entering the exam before granting access.",
    imageFirst: true,
  },
  {
    image: "/images/Eye Monitor.png",
    icon: "/images/icon-camera.svg",
    badge: "Exam\nMonitoring",
    title: "Keep Focus on the Exam",
    description:
      "During the exam, ExamEye uses real-time facial and gaze tracking to detect when a student repeatedly looks away from the screen. Suspicious gaze activity is flagged automatically for review.",
    imageFirst: false,
  },
  {
    image: "/images/object detection.png",
    icon: "/images/icon-monitor.svg",
    badge: "Object\nDetection",
    title: "Detect What Doesn’t Belong",
    description:
      "ExamEye analyzes the webcam frame in real time to identify prohibited objects such as mobile phones and books. When a suspicious object appears, the system flags the activity for the teacher.",
    imageFirst: true,
  },
  {
    image: "/images/identity verify.png",
    icon: "/images/icon-face.svg",
    badge: "Identity\nVerification",
    title: "Secure the Exam Environment",
    description:
      "ExamEye creates a controlled browser environment by restricting tab switching, copy-paste, right-clicking, and exiting fullscreen. This helps prevent students from accessing outside resources during the exam.",
    imageFirst: false,
  },
];

const FeatureCard = ({ feature, index }) => {
  const badgeLeft = index % 2 === 0;

  return (
    <div
      className={`relative w-full overflow-visible rounded-[24px] border border-[#E5E7EB] bg-white ${
        index === 0
          ? "aspect-[1.28/1]"
          : index === 1
          ? "aspect-[1.28/1]"
          : index === 2
          ? "aspect-[1.28/1]"
          : "aspect-[1.28/1]"
      }`}
    >
 <img
  src={feature.image}
  alt={feature.title}
  className="absolute inset-0 h-full w-full rounded-[24px] object-contain"
/>

      {/* FLOATING BADGE */}
      <div
        className={`
          absolute
          bottom-[-18px]
          z-20
          flex
          min-h-[96px]
          w-[124px]
          flex-col
          items-center
          justify-center
          rounded-[9px]
          border
          border-[#168052]
          bg-[#072517]
          px-3
          py-3
          shadow-[0_3px_10px_rgba(0,0,0,0.18)]
          ${badgeLeft ? "left-[-18px]" : "right-[-18px]"}
        `}
      >
        <img
          src={feature.icon}
          alt=""
          className="mb-2 h-[32px] w-[32px] object-contain"
        />

        <span className="whitespace-pre-line text-center text-[13px] font-medium leading-[1.15] text-white">
          {feature.badge}
        </span>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section
      className="w-full bg-white px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-[130px] lg:pb-[90px]"
      
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-16 max-w-5xl text-center sm:mb-20 lg:mb-[105px]">
          <h2 className="text-[34px] font-extrabold leading-[1.12] tracking-[-1.4px] text-[#1E1E1E] sm:text-[42px] lg:text-[48px]">
            Four Layers of Protection for Safer Exams
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-[17px] font-normal leading-[1.6] tracking-[-0.2px] text-[#4B5563] sm:text-[18px] lg:text-[20px] lg:leading-[1.55]">
            ExamEye works quietly in the background to protect every stage of
            an online examination from verifying who enters to securing the
            browser throughout the exam.
          </p>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="space-y-24 sm:space-y-28 lg:space-y-[125px]">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                grid
                grid-cols-1
                items-center
                gap-12
                lg:grid-cols-[1.08fr_0.92fr]
                lg:gap-14
                xl:gap-[70px]
                ${feature.imageFirst ? "" : "lg:grid-cols-[0.92fr_1.08fr]"}
              `}
            >
              {/* IMAGE */}
              <div
                className={`
                  relative
                  w-full
                  ${feature.imageFirst ? "lg:order-1" : "lg:order-2"}
                `}
              >
                <FeatureCard feature={feature} index={index} />
              </div>

              {/* TEXT */}
              <div
                className={`
                  flex
                  flex-col
                  justify-center
                  ${feature.imageFirst ? "lg:order-2" : "lg:order-1"}
                `}
              >
                <h3 className="max-w-xl text-[30px] font-extrabold leading-[1.2] tracking-[-0.8px] text-[#1E1E1E] sm:text-[32px] lg:text-[34px]">
                  {feature.title}
                </h3>

                <p className="mt-5 max-w-xl text-[17px] font-normal leading-[1.7] tracking-[-0.2px] text-[#292929] sm:text-[18px] lg:text-[19px] lg:leading-[1.75]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;