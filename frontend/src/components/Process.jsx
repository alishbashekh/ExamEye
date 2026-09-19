import React, { useEffect, useRef, useState } from "react";
import {
  UserCheck,
  ShieldCheck,
  ScanEye,
  LockKeyhole,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Identity Verification",
    description:
      "AI-powered face verification confirms that the registered student is the person starting the examination.",
    icon: UserCheck,
    tag: "IDENTITY VERIFICATION",
  },
  {
    number: "02",
    title: "Secure Exam Begins",
    description:
      "After verification, the exam starts in a protected environment with fullscreen and browser restrictions enabled.",
    icon: ShieldCheck,
    tag: "SECURE ENVIRONMENT",
  },
  {
    number: "03",
    title: "Continuous AI Monitoring",
    description:
      "ExamEye continuously monitors the student's face, gaze direction, and surroundings while the examination is in progress.",
    icon: ScanEye,
    tag: "REAL-TIME MONITORING",
  },
  {
    number: "04",
    title: "Violation Detection",
    description:
      "AI identifies unusual behavior, prohibited objects, and other suspicious activity to help maintain exam integrity.",
    icon: LockKeyhole,
    tag: "AI PROTECTION",
  },
  {
    number: "05",
    title: "Submission & Integrity Evaluation",
    description:
      "When the exam is submitted or time expires, monitoring ends and the system evaluates the student's Trust Score to determine the final integrity status.",
    icon: FileCheck2,
    tag: "FINAL EVALUATION",
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const stepElements = section.querySelectorAll("[data-process-step]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-process-step")
            );

            setVisibleSteps((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    stepElements.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#FEFDFC]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(9,37,23,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(9,37,23,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-[#C5EED9]/25 blur-[110px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-[#C5EED9]/20 blur-[110px]" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <div className="mx-auto max-w-[760px] text-center">

          {/* Pill Badge */}
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#C5EED9]
              bg-[#F4FAF6]
              px-4
              py-2
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#168052]" />

            <span
              className="
                text-[10px]
                font-semibold
                tracking-[0.18em]
                text-[#092517]
                sm:text-xs
              "
            >
              WORKFLOW
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              text-[34px]
              font-black
              leading-[1.08]
              tracking-[-0.035em]
              text-[#092517]
              sm:text-[44px]
              lg:text-[52px]
            "
            style={{
              fontFamily: "Arial Black, Arial, sans-serif",
            }}
          >
            From Verification to Completion,
            <span className="block text-[#092517]">
              Every Step is Protected.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-[650px]
              text-[15px]
              leading-7
              text-[#5B6961]
              sm:text-[16px]
              sm:leading-7
            "
          >
            ExamEye follows a simple, intelligent process that
            verifies the student, secures the exam, monitors
            activity, and evaluates exam integrity from start
            to finish.
          </p>
        </div>

        {/* PROCESS TIMELINE */}
        <div className="relative mx-auto mt-16 max-w-[1080px] sm:mt-20">

          {/* DESKTOP CENTER LINE */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              top-0
              hidden
              w-px
              -translate-x-1/2
              bg-[#C5EED9]
              lg:block
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-1/2
              top-0
              hidden
              w-[2px]
              -translate-x-1/2
              bg-gradient-to-b
              from-[#168052]
              via-[#168052]
              to-[#C5EED9]
              lg:block
            "
          />

          {/* MOBILE TIMELINE LINE */}
          <div
            className="
              absolute
              bottom-5
              left-[19px]
              top-5
              w-px
              bg-[#C5EED9]
              sm:left-[23px]
              lg:hidden
            "
          />

          {/* STEPS */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-20">

            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  data-process-step={index}
                  className={`
                    relative
                    flex
                    items-center
                    transition-all
                    duration-700
                    ease-out
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                    lg:min-h-[210px]
                    ${
                      isLeft
                        ? "lg:justify-start"
                        : "lg:justify-end"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                >

                  {/* MOBILE NUMBER */}
                  <div
                    className="
                      absolute
                      left-0
                      top-1/2
                      z-20
                      flex
                      h-10
                      w-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-[#FEFDFC]
                      bg-[#092517]
                      shadow-[0_0_0_1px_#C5EED9]
                      sm:h-12
                      sm:w-12
                      lg:hidden
                    "
                  >
                    <span className="text-[10px] font-bold tracking-wider text-white sm:text-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* DESKTOP CENTER NUMBER */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-20
                      hidden
                      h-14
                      w-14
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border-[4px]
                      border-[#FEFDFC]
                      bg-[#092517]
                      shadow-[0_0_0_1px_#C5EED9,0_10px_30px_rgba(9,37,23,0.12)]
                      lg:flex
                    "
                  >
                    <span className="text-xs font-bold tracking-wider text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* CARD */}
                  <div
                    className={`
                      ml-[58px]
                      w-[calc(100%-58px)]
                      sm:ml-[68px]
                      sm:w-[calc(100%-68px)]
                      lg:ml-0
                      lg:w-[440px]
                      ${
                        isLeft
                          ? "lg:mr-[calc(50%+45px)]"
                          : "lg:ml-[calc(50%+45px)]"
                      }
                    `}
                  >
                    <div
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#DCE9E1]
                        bg-white
                        p-5
                        shadow-[0_14px_45px_rgba(9,37,23,0.055)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#BBDDC9]
                        hover:shadow-[0_20px_55px_rgba(9,37,23,0.09)]
                        sm:p-6
                      "
                    >
                      {/* Top accent */}
                      <div
                        className="
                          absolute
                          left-0
                          top-0
                          h-1
                          w-20
                          rounded-br-full
                          bg-[#168052]
                          transition-all
                          duration-300
                          group-hover:w-32
                        "
                      />

                      {/* Card header */}
                      <div className="flex items-start justify-between gap-4">

                        {/* Icon */}
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-[14px]
                            bg-[#EAF7F0]
                            transition-all
                            duration-300
                            group-hover:bg-[#092517]
                          "
                        >
                          <Icon
                            size={22}
                            strokeWidth={1.8}
                            className="
                              text-[#168052]
                              transition-colors
                              duration-300
                              group-hover:text-[#75F6B6]
                            "
                          />
                        </div>

                        {/* Tag */}
                        <span
                          className="
                            rounded-full
                            bg-[#F4FAF6]
                            px-3
                            py-1.5
                            text-[9px]
                            font-semibold
                            tracking-[0.1em]
                            text-[#168052]
                          "
                        >
                          {step.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-5">
                        <h3
                          className="
                            text-[20px]
                            font-bold
                            tracking-[-0.02em]
                            text-[#092517]
                            sm:text-[22px]
                          "
                        >
                          {step.title}
                        </h3>

                        <p
                          className="
                            mt-2.5
                            text-[13px]
                            leading-6
                            text-[#66736B]
                            sm:text-[14px]
                            sm:leading-6
                          "
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* Protection indicator */}
                      <div className="mt-5 flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          strokeWidth={2}
                          className="text-[#168052]"
                        />

                        <span className="text-[10px] font-medium text-[#748179]">
                          Automated protection layer
                        </span>
                      </div>

                      {/* Decorative number */}
                      <span
                        className="
                          pointer-events-none
                          absolute
                          -bottom-7
                          -right-1
                          text-[92px]
                          font-black
                          leading-none
                          text-[#092517]/[0.025]
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* DESKTOP CONNECTOR */}
                    <div
                      className={`
                        absolute
                        top-1/2
                        hidden
                        h-px
                        w-[45px]
                        bg-[#C5EED9]
                        lg:block
                        ${
                          isLeft
                            ? "right-[calc(50%+0px)]"
                            : "left-[calc(50%+0px)]"
                        }
                      `}
                    >
                      <div
                        className={`
                          absolute
                          top-1/2
                          h-2
                          w-2
                          -translate-y-1/2
                          rounded-full
                          bg-[#168052]
                          ${
                            isLeft
                              ? "right-0"
                              : "left-0"
                          }
                        `}
                      />
                    </div>
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

export default Process;