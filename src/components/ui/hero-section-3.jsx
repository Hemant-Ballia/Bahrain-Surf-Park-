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
          setIsZooming(true);

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
          }, 800);
        }
      }, 120);
    };

    return (
      <div
        ref={ref}
        className={`relative h-[100svh] w-full overflow-hidden bg-black ${className}`}
        {...props}
      >
        {/* Loader */}
        {(isLoading || (!imageLoaded && !imageError)) && (
          <WaveBarLoader progress={loadProgress} />
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white px-5 text-center text-sm font-semibold text-red-500 sm:text-base">
            Landing image load nahi ho raha.
            <br />
            Check karein:
            <br />
            <code className="mt-2 break-all">
              public/Landing_video.webp
            </code>
          </div>
        )}

        {/* Hero */}
        <motion.div
          animate={{
            scale: isZooming ? 20 : 1,
            opacity: isZooming ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`absolute inset-0 flex origin-center flex-col items-center justify-end ${
            isZooming ? "pointer-events-none" : ""
          }`}
        >
          {/* Height Filled Image with object-cover on mobile and desktop */}
          <img
            src="/Landing_video.webp"
            alt="Bahrain Surf Park"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className="
              absolute
              inset-0
              z-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-black/15" />

          {/* Button */}
          <div
            className="
              relative
              z-20
              flex
              flex-col
              items-center
              justify-center
              px-4
              pb-[8vh]
              sm:pb-[10vh]
              md:pb-16
            "
          >
            <button
              onClick={handleExploreClick}
              disabled={isLoading}
              className="
                group
                flex
                items-center
                justify-center
                cursor-pointer
                rounded-full
                bg-[#00E599]
                px-6
                py-3
                text-sm
                font-bold
                tracking-wider
                text-white
                shadow-2xl
                transition-all
                duration-300
                hover:opacity-95
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:px-7
                sm:py-3
                sm:text-base

                md:px-8
                md:py-3
              "
            >
              <span>
                {isLoading ? "Loading..." : "Explore Now"}
              </span>

              <svg
                className="
                  ml-2
                  h-4
                  w-4
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                  sm:ml-2.5
                "
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