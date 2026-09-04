import React, { useEffect, useRef, useState } from "react";
import WaveBarLoader from "./wave_loader";

const TOTAL_FRAMES = 240;

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  const rafRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

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

    loadFrame(0);
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;

    if (!canvas || !frames.length) return;

    let index = Math.round(frameIndex);
    index = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));

    let image = frames[index];

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

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = Math.round(width * dpr);
    const canvasHeight = Math.round(height * dpr);

    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const scale = Math.max(width / imageWidth, height / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";

    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (!loaded) return;

    drawFrame(0);

    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const difference = target - current;

      if (Math.abs(difference) > 0.001) {
        currentFrameRef.current = current + difference * 0.15;
        drawFrame(currentFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = heroRef.current;
          if (hero) {
            const rect = hero.getBoundingClientRect();
            const scrollDistance = hero.offsetHeight - window.innerHeight;

            if (scrollDistance > 0) {
              let progress = -rect.top / scrollDistance;
              progress = Math.max(0, Math.min(1, progress));
              targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loaded]);

  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section ref={heroRef} className="relative h-[600vh] w-full bg-white">
      <div className="sticky top-0 z-25 h-screen w-full overflow-hidden bg-white">
        {!loaded && !loadError && (
          <WaveBarLoader progress={progress} />
        )}

        {loadError && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white px-6 text-center">
            <div className="font-semibold text-red-500">
              <p>Frames load nahi ho rahe.</p>
              <p className="mt-2">Check karein:</p>
              <code className="mt-2 inline-block rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
                public/frames/
              </code>
              <p className="mt-2">mein PNG files hain.</p>
            </div>
          </div>
        )}

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