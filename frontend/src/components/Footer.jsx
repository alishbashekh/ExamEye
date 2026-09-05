import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#1E1E1E]">
      <div className="flex items-center gap-[14px] px-[70px] pt-[55px] pb-[55px]">

        {/* ExamEye Logo */}
        <img
          src="/images/exameye-logo.png"
          alt="ExamEye Logo"
          className="h-[100px] w-[100px] object-contain"
        />


        {/* Text */}
        <div className="flex w-[333px] flex-col items-center gap-[6px]">

          {/* ExamEye */}
          <div
            className="
              w-full
              text-white
              font-bold
              leading-[1.167]
              tracking-[-1px]
            "
            style={{
              fontSize: "60px",
            }}
          >
            ExamEye
          </div>

          {/* Copyright */}
          <div
            className="
              w-full
              text-white
              font-normal
              leading-[23px]
              whitespace-nowrap
            "
            style={{
              fontSize: "25px",
            }}
          >
            © 2026. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;