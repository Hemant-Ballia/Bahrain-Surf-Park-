import React, { useEffect, useRef } from "react";

const imgURLs = [
  "https://www.brunottisurfcamps.com/wp-content/uploads/beginner-surfing-mistakes-Brunotti-Surfcamps.jpg",
  "https://surfexpedition.com/wp-content/uploads/2023/06/longboard-surfing-tips-for-beginners.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/71/16/1e.jpg",
  "https://surfstrengthcoach.com/wp-content/uploads/2013/09/dynamic-surfing-stretches.jpg",
  "https://tse2.mm.bing.net/th/id/OIP.W0P28JFJYrQuNirjzztOIQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
];

const SurfJourney = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const repeatedItems = [...imgURLs, ...imgURLs];

  return (
    <div className="font-sans pt-[3rem] px-[1rem] bg-[#0C3B58] min-h-screen text-white">
      <section className="px-3 sm:px-12 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Surf Journey Progression</h1>
        <p className="max-w-4xl text-slate-300 text-sm sm:text-base leading-relaxed">
          Discover your ultimate wave progression at Bilaj Al Jazayer, Bahrain's premier coastal destination. Designed for all skill levels from absolute beginners to elite professionals, our advanced wave generation technology and expert coaching guide you through every phase of your surfing journey. Master your technique, build unstoppable confidence, and experience the thrill of endless waves in a world-class resort environment.
        </p>
      </section>

      <section className="px-3 sm:px-12 pb-12">
        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {repeatedItems.map((item, index) => {
            let marginClass = "";
            if (index === 0) marginClass = "ml-8";
            if (index === repeatedItems.length - 1) marginClass = "mr-8";

            return (
              <div
                key={index}
                className={`flex-[0_0_auto] w-[300px] rounded-[10px] overflow-hidden my-4 relative transition-all duration-300 hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px] hover:-translate-y-1.5 hover:translate-x-[-2px] ${marginClass}`}
              >
                <img
                  src={item}
                  alt={`Surf Journey step ${index + 1}`}
                  className="w-full h-auto object-cover aspect-[3/4] align-middle"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SurfJourney;