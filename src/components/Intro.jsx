import React, { useState } from "react";

export default function Intro() {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                .intro-section * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="intro-section flex flex-col md:flex-row items-center justify-center gap-12 max-md:px-4 py-24 bg-[#0b2d45]">
                {/* Left Image Card with Play Button Overlay */}
                <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative shadow-2xl shadow-black/40 rounded-2xl overflow-hidden shrink-0 cursor-pointer group w-full max-w-md"
                >
                    <img 
                        className="w-full aspect-video md:aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                        src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"
                        alt="Bahrain Surf Park" 
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white size-16 flex items-center justify-center aspect-square backdrop-blur-md bg-white/10 rounded-full group-hover:scale-110 transition-transform">
                        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z"
                                fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Right Text Content */}
                <div className="text-sm text-white/80 max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-white tracking-wide">
                        Experience The Wave
                    </h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-white/20 mt-3 mb-6"></div>
                    <p className="leading-relaxed">
                        Welcome to Bahrain Surf Park, where the thrill of surfing meets an unforgettable destination experience.
                    </p>
                    <p className="mt-4 leading-relaxed">
                        Designed for everyone from first-time surfers to experienced riders, our surf environment delivers consistent waves, exciting experiences and a place to connect with the ocean.
                    </p>
                    <p className="mt-4 leading-relaxed">
                        Discover world-class surfing, immersive experiences and endless opportunities to ride, explore and create memories with friends and family.
                    </p>
                    <a 
                        href="#journey" 
                        className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-white text-[#0b2d45] py-3 px-8 rounded-full font-medium shadow-md"
                    >
                        <span>Explore More</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#0b2d45" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Video Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 z-10 text-white bg-white/20 hover:bg-white/40 rounded-full px-4 py-2 text-xs font-bold cursor-pointer"
                        >
                            ✕ Close
                        </button>
                        <iframe
                            className="w-full aspect-video"
                            src="https://www.youtube.com/embed/r9rIamsp1ts?autoplay=1"
                            title="Bahrain Surf Park"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}