import React from "react";
import { motion } from "framer-motion";

const metrics = [
  { value: "1,000", label: "Waves / Hr" },
  { value: "20+", label: "Wave Types" },
  { value: "90", label: "Surfers Capacity" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function VideoThumbnail({ onClick }) {
  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={onClick}
      aria-label="Play Wavegarden Cove video"
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-3xl shadow-lg"
    >
      <img
        src="/thumb.avif"
        alt="Wavegarden Cove mechanical wave generation"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-green shadow-xl sm:h-20 sm:w-20">
          <svg
            className="ml-1 h-6 w-6 text-ocean-blue sm:h-7 sm:w-7"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}

export default function WavegardenTech() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const YOUTUBE_ID = "20WQGKP9rVM";
  const START_TIME = 0;

  return (
    <section id="wavegarden" className="bg-soft-ice py-20 sm:py-28">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT — Narrative */}
        <div>
          <motion.h2 variants={itemVariants} className="text-h2 mb-6">
            Engineered for the Perfect Wave
          </motion.h2>

          <motion.p variants={itemVariants} className="mb-10 max-w-md text-slate-gray">
            At the heart of Club Hawaii lies the Wavegarden Cove — a
            52-module wave generation system capable of producing
            consistent, surfable waves at a scale never seen in the
            region. From gentle rollers for first-timers to
            barrel-grade sets for pros, every profile is shaped and
            tuned in real time.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-6"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-canvas px-3 py-5 text-center shadow-sm sm:px-4"
              >
                <p className="text-2xl font-bold text-ocean-blue sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-slate-gray sm:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Click-to-expand video thumbnail */}
        <VideoThumbnail onClick={() => setIsOpen(true)} />
      </motion.div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-white hover:text-mint-green transition-colors sm:-top-12"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?start=${START_TIME}&autoplay=1`}
              title="Wavegarden Cove — Mechanical Wave Generation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}