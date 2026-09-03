import React from "react";

const ImageBreak = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* High-Resolution Surfing Background Image */}
      <img
        src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2000&q=80"
        alt="Surf experience"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
      />

      {/* Dark Overlay Gradient for Content Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Centered Content Section */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <p className="text-[#00C8A0] uppercase tracking-[0.35em] text-xs sm:text-sm font-semibold mb-6 drop-shadow-md">
            Feel The Energy
          </p>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
            Every Wave Has
            <br />
            A Story.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ImageBreak;