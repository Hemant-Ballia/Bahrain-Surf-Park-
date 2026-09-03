import React, { useState } from "react";

export default function Navbar() {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    const nextState = !isArabic;
    setIsArabic(nextState);
    document.documentElement.dir = nextState ? "rtl" : "ltr";
    document.documentElement.lang = nextState ? "ar" : "en";
  };

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-gradient-to-b from-black/60 via-black/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        {/* Logo on Left - Restored to a prominent, balanced size */}
        <a href="#home" className="flex items-center" aria-label="Bahrain Surf Park Home">
          <img
            src="/Bahrain-Surf-Park-Logo-removebg-preview.png"
            alt="Bahrain Surf Park Logo"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-md"
          />
        </a>

        {/* Right side: Bilingual Switch & Primary CTA */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle language between English and Arabic"
            className="text-sm font-semibold text-white drop-shadow hover:text-[#00E599] transition-colors cursor-pointer"
          >
            {isArabic ? "EN | English" : "AR | العربية"}
          </button>

          <a
            href="#register"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#00E599] text-[#0077B6] font-bold text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}