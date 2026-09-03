import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const ScrollFlyIn = forwardRef(
  ({ className = "", onExplore, ...props }, ref) => {
    const [isZooming, setIsZooming] = useState(false);

    const handleExploreClick = () => {
      setIsZooming(true);
      if (onExplore) onExplore();

      setTimeout(() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    };

    return (
      <div ref={ref} className={`relative h-screen w-full overflow-hidden bg-white ${className}`} {...props}>
        <motion.div
          animate={{
            scale: isZooming ? 15 : 1,
            filter: isZooming ? "brightness(0)" : "brightness(1)",
          }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="absolute inset-0 flex flex-col items-center justify-end origin-center pb-20"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover z-0"
          >
            <source src="/Landing_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center justify-center px-4">
            <button
              onClick={handleExploreClick}
              className="px-8 py-3 bg-[#00E599] text-white font-bold rounded-full text-base tracking-wider hover:opacity-90 transition-opacity shadow-2xl active:scale-95 cursor-pointer flex items-center group"
            >
              <span>Get Early Access</span>
              
              <svg 
                className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-y-1 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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