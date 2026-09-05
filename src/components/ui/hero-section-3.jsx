import React, { forwardRef, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ScrollFlyIn = forwardRef(
  ({ className = "", onExplore, ...props }, ref) => {
    const [isZooming, setIsZooming] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const pathRef = useRef(null);
    const tlRef = useRef(null);
    
    const btnZoneRef = useRef(null);
    const btnInnerRef = useRef(null);

    const startPath = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
    const midPath = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const endPath = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    useEffect(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(pathRef.current, { attr: { d: midPath }, ease: "power2.in", duration: 0.4 })
        .to(pathRef.current, { attr: { d: endPath }, ease: "power2.out", duration: 0.4 });

      tlRef.current = tl;

      return () => {
        tl.kill();
      };
    }, []);

    useEffect(() => {
      const zone = btnZoneRef.current;
      const btn = btnInnerRef.current;
      
      if (!zone || !btn) return;

      const strength = 0.5;

      const handleMouseMove = (e) => {
        const rect = zone.getBoundingClientRect();
        const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
        const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

        gsap.to(btn, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto"
        });
      };

      zone.addEventListener("mousemove", handleMouseMove);
      zone.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        zone.removeEventListener("mousemove", handleMouseMove);
        zone.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    const handleExploreClick = () => {
      setIsZooming(true); 
      tlRef.current?.play(); 

      setTimeout(() => {
        const mainContent = document.getElementById("main-content");

        if (mainContent) {
          mainContent.scrollIntoView({ behavior: "auto" });
        }

        if (onExplore) {
          onExplore();
        }

        setTimeout(() => {
          tlRef.current?.reverse();
          setIsZooming(false); 
        }, 200);

      }, 800);
    };

    return (
      <div
        ref={ref}
        className={`relative h-[100svh] w-full overflow-hidden bg-black ${className}`}
        {...props}
      >
        <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
                <stop offset="0.2" stopColor="#00E599" />
                <stop offset="0.8" stopColor="#029c69" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              stroke="url(#wave-grad)"
              fill="url(#wave-grad)"
              strokeWidth="2px"
              vectorEffect="non-scaling-stroke"
              d={startPath}
            />
          </svg>
        </div>

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
          <img
            src="/Landing_video.webp"
            alt="Bahrain Surf Park"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />

          <div className="relative z-20 flex flex-col items-center justify-center px-4 pb-[8vh] sm:pb-[10vh] md:pb-16">
            <div 
              ref={btnZoneRef}
              className="p-8 cursor-pointer" 
              onClick={handleExploreClick}
            >
              <button
                ref={btnInnerRef}
                className="group flex items-center justify-center rounded-full bg-[#00E599] px-6 py-3 text-sm font-bold tracking-wider text-white shadow-2xl transition-all duration-300 hover:opacity-95 active:scale-95 pointer-events-none sm:px-7 sm:py-3 sm:text-base md:px-8 md:py-3"
              >
                <span>Explore Now</span>
                <svg
                  className="ml-2 h-4 w-4 text-white transition-transform duration-300 group-hover:translate-y-1 sm:ml-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

ScrollFlyIn.displayName = "ScrollFlyIn";

export default ScrollFlyIn;