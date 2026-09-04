import React, { forwardRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import WaveBarLoader from "../wave_loader";

const ScrollFlyIn = forwardRef(
  ({ className = "", onExplore, ...props }, ref) => {
    const [isZooming, setIsZooming] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 100) {
          setLoadProgress(currentProgress);
        } else {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 100);

      return () => clearInterval(interval);
    }, []);

    const handleExploreClick = () => {
      setIsLoading(true);
      setLoadProgress(0);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        if (currentProgress <= 100) {
          setLoadProgress(currentProgress);
        } else {
          clearInterval(interval);
          setIsLoading(false);
          setIsZooming(true); // Zoom animation start hogi

          // Animation finish hone ke baad hi scroll aur onExplore() chale
          setTimeout(() => {
            const mainContent = document.getElementById("main-content");
            if (mainContent) {
              mainContent.scrollIntoView({
                behavior: "smooth",
              });
            }

            if (onExplore) {
              onExplore();
            }
          }, 800); // 800ms timeout matched with framer-motion transition
        }
      }, 120);
    };

    return (
      <div
        ref={ref}
        className={`relative h-screen w-full overflow-hidden bg-white ${className}`}
        {...props}
      >
        {/* Loader Component */}
        {(isLoading || (!imageLoaded && !imageError)) && (
          <WaveBarLoader progress={loadProgress} />
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white px-6 text-center font-semibold text-red-500">
            Landing video load nahi ho raha.
            <br />
            Check karein:
            <br />
            <code className="mt-2">public/Landing_video.webp</code>
          </div>
        )}

        {/* Hero Content & Animation */}
        <motion.div
          animate={{
            scale: isZooming ? 20 : 1, // Thoda aur zoom diya for better fly-in effect
            opacity: isZooming ? 0 : 1, // Brightness ki jagah fade-out use kiya for clean exit
          }}
          transition={{
            duration: 0.8, // Duration ko slightly badhaya for smoothness
            ease: "easeInOut",
          }}
          className={`absolute inset-0 flex origin-center flex-col items-center justify-end pb-20 ${
            isZooming ? "pointer-events-none" : ""
          }`}
        >
          <img
            src="/Landing_video.webp"
            alt="Bahrain Surf Park"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />

          <div className="relative z-20 flex flex-col items-center justify-center px-4">
            <button
              onClick={handleExploreClick}
              disabled={isLoading}
              className="group flex cursor-pointer items-center rounded-full bg-[#00E599] px-8 py-3 text-base font-bold tracking-wider text-white shadow-2xl transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              <span>{isLoading ? "Loading..." : "Explore Now"}</span>

              <svg
                className="ml-2.5 h-4 w-4 text-white transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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