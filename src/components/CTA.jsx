import React, { useState } from 'react';

const CTA = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setIsPlaying(true);
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsPlaying(false);
  };

  return (
    <section className="relative h-[600px] w-full bg-black overflow-hidden">
      {/* Background & Play Button Overlay */}
      <div 
        className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1920')] bg-cover bg-center flex items-center justify-center z-10 transition-transform duration-1000 ease-in-out ${
          isPlaying ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={handlePlayClick}
          className="flex items-center text-3xl md:text-5xl font-bold text-white uppercase tracking-wider group cursor-pointer bg-transparent border-none"
        >
          <svg 
            className="w-16 h-16 md:w-20 md:h-20 mr-6 transition-transform duration-500 group-hover:rotate-[120deg]" 
            viewBox="0 0 512 512" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="256" cy="256" r="256" fill="#ffffff"/>
            <path d="M200 150l160 106-160 106v-212z" fill="#000000"/>
          </svg>
          Watch The Promo Video
        </button>
      </div>

      {/* Video Player & Close Button */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        {isPlaying && (
          <button
            type="button"
            onClick={handleCloseClick}
            className="absolute top-5 left-8 z-[20000] text-white text-4xl font-light hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Close video"
          >
            &#10005;
          </button>
        )}

        <div className="w-full h-full">
          {isPlaying && (
            <iframe
              className="w-full h-full border-none"
              src="https://www.youtube.com/embed/r9rIamsp1ts?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Bahrain Surf Park Promo Video"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;