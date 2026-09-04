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
    title: "Learn",
    label: "THE BEGINNING",
    image: "/images/f1.jpg",
  },
  {
    title: "Ride",
    label: "FIND YOUR FLOW",
    image: "/images/f2.png",
  },
  {
    title: "Master",
    label: "OWN THE WAVE",
    image: "/images/f3.png",
  },
  {
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

  const x = useTransform(
    scrollYProgress,
    [0, 0.283, 0.566, 0.85, 1],
    ["0%", "-25%", "-50%", "-75%", "-75%"]
  );

  const headingX = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    ["0px", "-100px", "-100px"]
  );

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
          {/* TOP HEADER */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center px-5 py-6 text-white sm:px-10 sm:py-7 lg:px-14">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-px w-7 bg-[#18C7A5] sm:w-10" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#18C7A5] sm:text-[10px] sm:tracking-[0.4em]">
                Your Journey
              </span>
            </div>
          </div>

          {/* HORIZONTAL SLIDES */}
          <motion.ul
            style={{ x }}
            className="m-0 flex h-screen w-[400vw] list-none p-0 will-change-transform"
          >
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="journey-slide relative h-screen w-screen shrink-0 overflow-hidden"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-[#0C3B58]" />

                {/* IMAGE */}
                <div className="absolute inset-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                      max-[480px]:object-center
                    "
                    style={{
                      objectPosition:
                        index === 0 ? "center 20%" : "center center",
                    }}
                  />

                  {/* Blue Overlay */}
                  <div className="absolute inset-0 bg-[#0C3B58]/35" />

                  {/* Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f30] via-transparent to-[#0C3B58]/20" />
                </div>

                {/* MAIN CONTENT */}
                <div className="relative z-20 flex h-full w-full items-end px-5 pb-14 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
                  <div className="mx-auto w-full max-w-7xl">
                    <div className="max-w-5xl">
                      {/* Label */}
                      <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                        <span className="h-px w-7 bg-[#18C7A5] sm:w-10" />

                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/60 sm:text-[9px] sm:tracking-[0.35em]">
                          {step.label}
                        </span>
                      </div>

                      {/* Heading */}
                      <motion.h2
                        style={{ x: headingX }}
                        className="
                          journey-heading
                          whitespace-nowrap
                          text-[25vw]
                          font-semibold
                          leading-[0.75]
                          tracking-[-0.07em]
                          text-white

                          sm:text-[22vw]

                          md:text-[20vw]

                          lg:text-[18vw]
                        "
                      >
                        {step.title}
                      </motion.h2>
                    </div>
                  </div>
                </div>

                {/* CORNER DECORATION */}
                <div
                  className="
                    absolute
                    bottom-0
                    right-0
                    z-20
                    h-20
                    w-20
                    rounded-tl-[100%]
                    border-l
                    border-t
                    border-white/10

                    sm:h-32
                    sm:w-32

                    lg:h-40
                    lg:w-40
                  "
                />
              </li>
            ))}
          </motion.ul>

          {/* BOTTOM INDICATORS */}
          <div className="absolute bottom-6 left-5 z-30 flex items-center gap-2 sm:bottom-7 sm:left-10 sm:gap-3 lg:left-14">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.title}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 sm:h-2 sm:w-2 ${
                      isActive
                        ? "scale-125 bg-[#18C7A5]"
                        : "bg-white/40"
                    }`}
                  />

                  {index !== steps.length - 1 && (
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-7 bg-[#18C7A5] sm:w-8"
                          : "w-4 bg-white/20 sm:w-5"
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