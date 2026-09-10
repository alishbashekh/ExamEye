import React from 'react';

function Navbar() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center px-8 pt-8 pb-4 sm:px-12">
        {/* ExamEye Logo - Increased size */}
        <a href="/" className="inline-block">
          <img
            src="/images/exameye-logo.svg"
            alt="ExamEye Logo"
            className="h-12 w-auto object-contain sm:h-14 md:h-16"
          />
        </a>
      </div>
    </header>
  );
}

export default Navbar;