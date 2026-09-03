import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  const rafRef = useRef(null);
  const scrollRafRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // -----------------------------------------
  // PRELOAD ALL FRAMES
  // -----------------------------------------
  useEffect(() => {
    let mounted = true;

    const images = new Array(TOTAL_FRAMES);
    let completed = 0;
    let errors = 0;

    const loadFrame = (index) => {
      const img = new Image();

      img.decoding = "async";

      img.onload = () => {
        if (!mounted) return;

        images[index] = img;

        completed++;

        setLoadedCount(completed);

        if (completed === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;

        errors++;
        completed++;

        setLoadedCount(completed);

        if (errors === TOTAL_FRAMES) {
          setLoadError(true);
        }

        if (completed === TOTAL_FRAMES && errors < TOTAL_FRAMES) {
          setLoaded(true);
        }
      };

      img.src = `/frames/frame_${String(index + 1).padStart(5, "0")}.png`;
    };

    // Load first frame immediately
    loadFrame(0);

    // Load remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // -----------------------------------------
  // DRAW FRAME
  // -----------------------------------------
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;

    if (!canvas || !frames.length) return;

    let index = Math.round(frameIndex);

    index = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));

    let image = frames[index];

    // If requested frame isn't ready,
    // find nearest loaded frame
    if (!image || !image.complete || image.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
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

    if (!image || image.naturalWidth === 0) return;

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

    ctx.clearRect(0, 0, width, height);

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // object-cover calculation
    const scale = Math.max(
      width / imageWidth,
      height / imageHeight
    );

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  };

  // -----------------------------------------
  // ANIMATION
  // -----------------------------------------
  const animateToTarget = () => {
    if (rafRef.current) return;

    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const difference = target - current;

      // Very small difference
      if (Math.abs(difference) < 0.15) {
        currentFrameRef.current = target;

        drawFrame(target);

        rafRef.current = null;
        return;
      }

      // Smooth but responsive
      currentFrameRef.current =
        current + difference * 0.22;

      drawFrame(currentFrameRef.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  // -----------------------------------------
  // INITIAL FRAME + RESIZE
  // -----------------------------------------
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    drawFrame(0);

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [loaded]);

  // -----------------------------------------
  // SCROLL
  // -----------------------------------------
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (scrollRafRef.current) return;

      scrollRafRef.current = requestAnimationFrame(() => {
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

        animateToTarget();
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

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

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, [loaded]);

  // -----------------------------------------
  // UI
  // -----------------------------------------
  const progress =
    Math.round(
      (loadedCount / TOTAL_FRAMES) * 100
    );

  return (
    <section
      ref={heroRef}
      className="relative h-[600vh] w-full bg-white"
    >
      <div className="sticky top-0 z-20 h-screen w-full overflow-hidden bg-white">

        {/* LOADING */}
        {!loaded && !loadError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white">

            <div className="mb-4 text-lg font-semibold text-[#0077B6]">
              Loading Surf Frames...
            </div>

            <div className="h-1.5 w-64 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-[#0077B6] transition-all duration-150"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-3 text-sm text-gray-500">
              {loadedCount} / {TOTAL_FRAMES} frames
            </div>
          </div>
        )}

        {/* ERROR */}
        {loadError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white px-6 text-center font-semibold text-red-500">
            Frames load nahi ho rahe.
            <br />
            Check karein ki
            <br />
            <code className="mx-1">
              public/frames/
            </code>
            mein PNG files hain.
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

export default Hero;