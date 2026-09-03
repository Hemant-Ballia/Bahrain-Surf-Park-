import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const ScrollFlyIn = forwardRef(
  ({ className = "", onExplore, ...props }, ref) => {
    const [isZooming, setIsZooming] = useState(false);

    const handleExploreClick = () => {
      setIsZooming(true);

      if (onExplore) {
        onExplore();
      }

      setTimeout(() => {
        const mainContent = document.getElementById("main-content");

        if (mainContent) {
          mainContent.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 500);
    };

    return (
      <div
        ref={ref}
        className={`relative h-screen w-full overflow-hidden bg-white ${className}`}
        {...props}
      >
        <motion.div
          animate={{
            scale: isZooming ? 15 : 1,
            filter: isZooming ? "brightness(0)" : "brightness(1)",
          }}
          transition={{
            duration: 0.6,
            ease: "easeIn",
          }}
          className="absolute inset-0 flex flex-col items-center justify-end origin-center pb-20"
        >
          {/* Animated WebP */}
          <img
            src="/Landing_video.webp"
            alt="Bahrain Surf Park"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 z-10 bg-black/10 pointer-events-none" />

          {/* Button */}
          <div className="relative z-20 flex flex-col items-center justify-center px-4">
            <button
              onClick={handleExploreClick}
              className="flex cursor-pointer items-center rounded-full bg-[#00E599] px-8 py-3 text-base font-bold tracking-wider text-white shadow-2xl transition-opacity hover:opacity-90 active:scale-95"
            >
              <span>Get Early Access</span>

              <svg
                className="ml-2.5 h-4 w-4 text-white transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
);

ScrollFlyIn.displayName = "ScrollFlyIn";

export default ScrollFlyIn;