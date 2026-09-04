import React, { useEffect, useRef, useState } from "react";
import WaveBarLoader from "./wave_loader";

const TOTAL_FRAMES = 240;
const SMOOTHING = 0.12;

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  const rafRef = useRef(null);
  const scrollRafRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  const [loadedCount, setLoadedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // ==============================
  // PRELOAD ALL FRAMES
  // ==============================
  useEffect(() => {
    let mounted = true;

    const images = new Array(TOTAL_FRAMES);
    framesRef.current = images;

    let completed = 0;
    let errors = 0;

    const finishLoading = () => {
      if (!mounted) return;

      completed += 1;
      setLoadedCount(completed);

      if (completed === TOTAL_FRAMES) {
        if (errors === TOTAL_FRAMES) {
          setLoadError(true);
        } else {
          setLoaded(true);
        }
      }
    };

    const loadFrame = (index) => {
      const img = new Image();

      img.decoding = "async";
      img.src = `/frames/frame_${String(index + 1).padStart(5, "0")}.png`;

      img.onload = async () => {
        try {
          if (img.decode) {
            await img.decode();
          }
        } catch (error) {
          // Image is still usable if decode fails
        }

        if (!mounted) return;

        images[index] = img;
        finishLoading();
      };

      img.onerror = () => {
        if (!mounted) return;

        errors += 1;
        finishLoading();
      };
    };

    for (let i = 0; i < TOTAL_FRAMES; i += 1) {
      loadFrame(i);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // ==============================
  // DRAW FRAME
  // ==============================
  const drawFrame = (frameIndex, force = false) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;

    if (!canvas || !frames.length) return;

    let index = Math.round(frameIndex);

    index = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, index)
    );

    if (!force && index === lastDrawnFrameRef.current) {
      return;
    }

    let image = frames[index];

    // Find nearest loaded frame
    if (
      !image ||
      !image.complete ||
      image.naturalWidth === 0
    ) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset += 1) {
        const previous = index - offset;
        const next = index + offset;

        if (
          previous >= 0 &&
          frames[previous] &&
          frames[previous].complete &&
          frames[previous].naturalWidth > 0
        ) {
          image = frames[previous];
          break;
        }

        if (
          next < TOTAL_FRAMES &&
          frames[next] &&
          frames[next].complete &&
          frames[next].naturalWidth > 0
        ) {
          image = frames[next];
          break;
        }
      }
    }

    if (!image || image.naturalWidth === 0) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const canvasWidth = Math.round(width * dpr);
    const canvasHeight = Math.round(height * dpr);

    if (
      canvas.width !== canvasWidth ||
      canvas.height !== canvasHeight
    ) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // Cover image
    const scale = Math.max(
      width / imageWidth,
      height / imageHeight
    );

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );

    lastDrawnFrameRef.current = index;
  };

  // ==============================
  // SMOOTH ANIMATION
  // ==============================
  useEffect(() => {
    if (!loaded) return;

    drawFrame(0, true);

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;

      const difference = target - current;

      if (Math.abs(difference) > 0.001) {
        currentFrameRef.current =
          current + difference * SMOOTHING;

        drawFrame(currentFrameRef.current);
      } else {
        currentFrameRef.current = target;

        drawFrame(target);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      lastDrawnFrameRef.current = -1;

      drawFrame(
        currentFrameRef.current,
        true
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [loaded]);

  // ==============================
  // SCROLL HANDLING
  // ==============================
  useEffect(() => {
    if (!loaded) return;

    const updateScroll = () => {
      scrollRafRef.current = null;

      const hero = heroRef.current;

      if (!hero) return;

      const rect = hero.getBoundingClientRect();

      const scrollDistance =
        hero.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      let progress =
        -rect.top / scrollDistance;

      progress = Math.max(
        0,
        Math.min(1, progress)
      );

      targetFrameRef.current =
        progress * (TOTAL_FRAMES - 1);
    };

    const handleScroll = () => {
      if (scrollRafRef.current === null) {
        scrollRafRef.current =
          requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    updateScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      if (scrollRafRef.current) {
        cancelAnimationFrame(
          scrollRafRef.current
        );
      }
    };
  }, [loaded]);

  const progress = Math.round(
    (loadedCount / TOTAL_FRAMES) * 100
  );

  return (
    <section
      ref={heroRef}
      className="relative h-[600vh] w-full bg-white"
    >
      <div className="sticky top-0 z-20 h-screen w-full overflow-hidden bg-white">

        {/* LOADER */}
        {!loaded && !loadError && (
          <WaveBarLoader progress={progress} />
        )}

        {/* ERROR */}
        {loadError && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-md">
              <h2 className="text-lg font-semibold text-gray-800">
                Unable to Load Animation
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                We were unable to load the required
                animation frames. Please ensure that
                all frame files are available in:
              </p>

              <code className="mt-3 inline-block rounded bg-gray-100 px-4 py-2 text-sm text-gray-700">
                public/frames/
              </code>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Please verify the frame file names
                and try again.
              </p>
            </div>
          </div>
        )}

        {/* CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
        />

{/* GEMINI LOGO BLUR COVER (Shifted further left to completely cover the star) */}
<div className="absolute bottom-10 right-20 z-10 h-24 w-28 rounded-2xl bg-black/15 backdrop-blur-md pointer-events-none" />

        {/* BOTTOM BOOKING BAR */}
        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-30
            flex
            max-w-[95%]
            -translate-x-1/2
            items-center
            gap-5
            rounded-t-lg
            border
            border-white/20
            bg-white/10
            px-5
            py-4
            text-white
            shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            backdrop-blur-[20px]
          "
        >
          {/* ACCOMMODATION */}
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-house text-xl" />

            <div>
              <p className="font-bold text-sm sm:text-base">
                Accommodation
              </p>

              <small className="text-xs text-gray-200 sm:text-sm">
                5 days
              </small>
            </div>
          </div>

          <hr className="hidden h-8 w-px border-0 bg-white/20 sm:block" />

          {/* LIVE GUIDE */}
          <div className="hidden items-center gap-3 sm:flex">
            <i className="fa-solid fa-headphones text-xl" />

            <div>
              <p className="font-bold text-sm sm:text-base">
                Live guide
              </p>

              <small className="text-xs text-gray-200 sm:text-sm">
                available
              </small>
            </div>
          </div>

          <hr className="hidden h-8 w-px border-0 sm:block bg-white/20" />

          {/* CANCELLATION */}
          <div className="hidden items-center gap-3 md:flex">
            <i className="fa-solid fa-clock text-xl" />

            <div>
              <p className="font-bold text-sm sm:text-base">
                Easy cancellation
              </p>

              <small className="text-xs text-gray-200 sm:text-sm">
                cancel before 48 hours
              </small>
            </div>
          </div>

          {/* RESERVE SPOT ACTION */}
          <button
            type="button"
            className="
              cursor-pointer
              select-none
              rounded-[10px]
              border-0
              bg-[linear-gradient(45deg,#ff512f_0%,#f09819_51%,#ff512f_100%)]
              bg-[length:200%_auto]
              px-4
              py-3
              text-center
              text-xs
              font-bold
              uppercase
              text-white
              shadow-[0px_0px_14px_-7px_#f09819]
              transition-all
              duration-500
              hover:bg-right
              active:scale-95
              sm:text-sm
            "
          >
            Reserve Spot
          </button>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";

export default Hero;