import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Load all frames
  useEffect(() => {
    let isMounted = true;
    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let errorCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(5, "0")}.png`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount === 1) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        errorCount++;
        if (errorCount === TOTAL_FRAMES) {
          setLoadError(
            "Frames load nahi ho rahe. Check karein ki public/frames mein PNG files hain."
          );
        }
      };

      images[i - 1] = img;
    }

    framesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;

    if (!canvas || !frames.length) return;

    const index = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex))
    );

    let image = frames[index];

    if (!image || image.naturalWidth === 0) {
      image = frames.find((img) => img && img.naturalWidth > 0);
    }

    if (!image || image.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

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
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  };

  // Trigger animation loop only when needed
  const startAnimation = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const difference = target - current;

      // Increased interpolation factor slightly for responsiveness
      let next = current + difference * 0.08;

      if (Math.abs(difference) < 0.01) {
        next = target;
        currentFrameRef.current = next;
        drawFrame(next);
        isAnimatingRef.current = false;
        return; // Stop loop when motion settles to save CPU
      }

      currentFrameRef.current = next;
      drawFrame(next);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Initial frame + resize
  useEffect(() => {
    if (!loaded) return;

    drawFrame(0);

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded]);

  // Calculate target frame from scroll
  useEffect(() => {
    if (!loaded) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) {
          ticking = false;
          return;
        }

        const rect = hero.getBoundingClientRect();
        const scrollDistance = hero.offsetHeight - window.innerHeight;

        if (scrollDistance <= 0) {
          ticking = false;
          return;
        }

        let progress = -rect.top / scrollDistance;
        progress = Math.max(0, Math.min(1, progress));

        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
        startAnimation(); // Wake up animation loop on scroll

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loaded]);

  return (
    <section ref={heroRef} className="relative h-[600vh] w-full bg-white">
      <div className="sticky top-0 z-20 h-screen w-full overflow-hidden bg-white">
        {loadError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white px-6 text-center font-semibold text-red-500">
            {loadError}
          </div>
        )}

        {!loaded && !loadError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white font-semibold text-[#0077B6]">
            Loading Surf Frames...
          </div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      </div>
    </section>
  );
};

export default Hero;