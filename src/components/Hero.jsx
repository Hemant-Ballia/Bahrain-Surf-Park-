import React, { useEffect, useRef, useState } from "react";
import WaveBarLoader from "./wave_loader";

const TOTAL_FRAMES = 240;
const SMOOTHING = 0.14;

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

  // --------------------------------------------------
  // PRELOAD ALL FRAMES
  // --------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const images = new Array(TOTAL_FRAMES);
    framesRef.current = images;

    let completed = 0;
    let errors = 0;

    const loadFrame = (index) => {
      const img = new Image();

      img.decoding = "async";
      img.src = `/frames/frame_${String(index + 1).padStart(5, "0")}.png`;

      img.onload = async () => {
        try {
          if (img.decode) {
            await img.decode();
          }
        } catch {
          // Image is still usable if decoding throws
        }

        if (!mounted) return;

        images[index] = img;
        completed++;

        setLoadedCount(completed);

        if (completed === TOTAL_FRAMES) {
          if (errors === TOTAL_FRAMES) {
            setLoadError(true);
          } else {
            setLoaded(true);
          }
        }
      };

      img.onerror = () => {
        if (!mounted) return;

        errors++;
        completed++;

        setLoadedCount(completed);

        if (completed === TOTAL_FRAMES) {
          if (errors === TOTAL_FRAMES) {
            setLoadError(true);
          } else {
            setLoaded(true);
          }
        }
      };
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // --------------------------------------------------
  // DRAW FRAME
  // --------------------------------------------------
  const drawFrame = (frameIndex, force = false) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;

    if (!canvas || !frames.length) return;

    let index = Math.round(frameIndex);

    index = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, index)
    );

    // Avoid unnecessary redraws
    if (
      !force &&
      index === lastDrawnFrameRef.current
    ) {
      return;
    }

    let image = frames[index];

    // Find nearest available frame
    if (
      !image ||
      !image.complete ||
      image.naturalWidth === 0
    ) {
      for (
        let offset = 1;
        offset < TOTAL_FRAMES;
        offset++
      ) {
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

    // Limit DPR to reduce rendering load
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const canvasWidth = Math.round(width * dpr);
    const canvasHeight = Math.round(height * dpr);

    if (
      canvas.width !== canvasWidth ||
      canvas.height !== canvasHeight
    ) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Cover image
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const scale = Math.max(
      width / imageWidth,
      height / imageHeight
    );

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );

    lastDrawnFrameRef.current = index;
  };

  // --------------------------------------------------
  // SMOOTH FRAME ANIMATION
  // --------------------------------------------------
  useEffect(() => {
    if (!loaded) return;

    drawFrame(0, true);

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;

      const difference = target - current;

      if (Math.abs(difference) > 0.01) {
        currentFrameRef.current =
          current + difference * SMOOTHING;

        drawFrame(
          currentFrameRef.current
        );
      } else {
        currentFrameRef.current = target;

        drawFrame(
          target
        );
      }

      rafRef.current =
        requestAnimationFrame(animate);
    };

    rafRef.current =
      requestAnimationFrame(animate);

    // Resize
    const handleResize = () => {
      lastDrawnFrameRef.current = -1;

      drawFrame(
        currentFrameRef.current,
        true
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [loaded]);

  // --------------------------------------------------
  // SCROLL HANDLING
  // --------------------------------------------------
  useEffect(() => {
    if (!loaded) return;

    const updateScroll = () => {
      scrollRafRef.current = null;

      const hero = heroRef.current;

      if (!hero) return;

      const rect =
        hero.getBoundingClientRect();

      const scrollDistance =
        hero.offsetHeight -
        window.innerHeight;

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
          requestAnimationFrame(
            updateScroll
          );
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
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

  // --------------------------------------------------
  // LOADING PROGRESS
  // --------------------------------------------------
  const progress = Math.round(
    (loadedCount / TOTAL_FRAMES) * 100
  );

  // --------------------------------------------------
  // HERO
  // --------------------------------------------------
  return (
    <section
      ref={heroRef}
      className="relative h-[600vh] w-full bg-white"
    >
      <div className="sticky top-0 z-25 h-screen w-full overflow-hidden bg-white">

        {/* LOADER */}
        {!loaded && !loadError && (
          <WaveBarLoader
            progress={progress}
          />
        )}

        {/* FORMAL ERROR MESSAGE */}
        {loadError && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-md">

              <h2 className="text-lg font-semibold text-gray-800">
                Unable to Load Animation
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                We were unable to load the required
                animation frames. Please ensure that
                all frame files are available in the
                following directory:
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

      </div>
    </section>
  );
};

Hero.displayName = "Hero";

export default Hero;