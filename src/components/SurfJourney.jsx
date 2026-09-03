import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { ReactLenis } from "lenis/react";

const steps = [
  {
    number: "01",
    title: "Learn",
    label: "THE BEGINNING",
    image: "/images/f1.jpg",
  },
  {
    number: "02",
    title: "Ride",
    label: "FIND YOUR FLOW",
    image: "/images/f2.png",
  },
  {
    number: "03",
    title: "Master",
    label: "OWN THE WAVE",
    image: "/images/f3.png",
  },
  {
    number: "04",
    title: "Conquer",
    label: "BEYOND LIMITS",
    image: "/images/f4.png",
  },
];

const SurfJourney = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Horizontal slide movement
   *
   * 0%    = Slide 01
   * -25%  = Slide 02
   * -50%  = Slide 03
   * -75%  = Slide 04
   */
  const x = useTransform(
    scrollYProgress,
    [0, 0.283, 0.566, 0.85, 1],
    ["0%", "-25%", "-50%", "-75%", "-75%"]
  );

  /*
   * Heading movement
   */
  const headingX = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    ["0px", "-100px", "-100px"]
  );

  /*
   * Active slide indicator
   */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const normalizedProgress = Math.min(
      Math.max(progress / 0.85, 0),
      0.999999
    );

    const index = Math.min(
      Math.floor(normalizedProgress * steps.length),
      steps.length - 1
    );

    setActiveStep(index);
  });

  /*
   * Reset active slide on mount
   */
  useEffect(() => {
    setActiveStep(0);
  }, []);

  return (
    <ReactLenis root>
      <section
        ref={sectionRef}
        id="journey"
        className="relative z-40 h-[400vh] bg-[#0C3B58]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ================================
              TOP HEADER
          ================================= */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-7 text-white sm:px-10 lg:px-14">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#18C7A5]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#18C7A5]">
                Your Journey
              </span>
            </div>
          </div>

          {/* ================================
              HORIZONTAL SLIDES
          ================================= */}
          <motion.ul
            style={{ x }}
            className="m-0 flex h-screen w-[400vw] list-none p-0 will-change-transform"
          >
            {steps.map((step) => (
              <li
                key={step.number}
                className="journey-slide relative h-screen w-screen shrink-0 overflow-hidden"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-[#0C3B58]" />

                {/* ================================
                    IMAGE
                ================================= */}
                <div className="absolute inset-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition:
                        step.number === "01"
                          ? "center 20%"
                          : "center center",
                    }}
                  />

                  {/* Blue Overlay */}
                  <div className="absolute inset-0 bg-[#0C3B58]/35" />

                  {/* Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f30] via-transparent to-[#0C3B58]/20" />
                </div>

                {/* ================================
                    BIG BACKGROUND NUMBER
                ================================= */}
                <div className="pointer-events-none absolute right-[-3vw] top-1/2 z-10 -translate-y-1/2 select-none">
                  <span className="text-[35vw] font-semibold leading-none tracking-[-0.08em] text-white/[0.08]">
                    {step.number}
                  </span>
                </div>

                {/* ================================
                    MAIN CONTENT
                ================================= */}
                <div className="relative z-20 flex h-full w-full items-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
                  <div className="mx-auto w-full max-w-7xl">
                    <div className="max-w-5xl">

                      {/* Label */}
                      <div className="mb-6 flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.35em] text-[#18C7A5]">
                          {step.number}
                        </span>

                        <span className="h-px w-12 bg-white/30" />

                        <span className="text-[9px] uppercase tracking-[0.35em] text-white/60">
                          {step.label}
                        </span>
                      </div>

                      {/* Heading */}
                      <motion.h2
                        style={{ x: headingX }}
                        className="journey-heading whitespace-nowrap text-[28vw] font-semibold leading-[0.75] tracking-[-0.07em] text-white sm:text-[22vw] lg:text-[18vw]"
                      >
                        {step.title}
                      </motion.h2>

                    </div>
                  </div>
                </div>

                {/* ================================
                    CORNER DECORATION
                ================================= */}
                <div className="absolute bottom-0 right-0 z-20 h-24 w-24 rounded-tl-[100%] border-l border-t border-white/10 sm:h-32 sm:w-32 lg:h-40 lg:w-40" />
              </li>
            ))}
          </motion.ul>

          {/* ================================
              BOTTOM INDICATORS
          ================================= */}
          <div className="absolute bottom-7 left-6 z-30 flex items-center gap-3 sm:left-10 lg:left-14">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.number}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`text-[9px] tracking-[0.2em] transition-all duration-300 ${
                      isActive
                        ? "font-semibold text-[#18C7A5]"
                        : "text-white/40"
                    }`}
                  >
                    {step.number}
                  </span>

                  {index !== steps.length - 1 && (
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-8 bg-[#18C7A5]"
                          : "w-5 bg-white/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </ReactLenis>
  );
};

export default SurfJourney;