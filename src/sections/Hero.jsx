// import React, { useEffect, useRef, useState } from "react";
// import { ArrowUpRight } from "lucide-react";

// const Hero = ({ onExploreClick }) => {
//   const [showContent, setShowContent] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const sectionRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (video) {
//       video.playbackRate = 0.5;

//       const handleTimeUpdate = () => {
//         if (video.currentTime >= 9) {
//           video.currentTime = 1;
//         }
//       };

//       video.addEventListener("timeupdate", handleTimeUpdate);

//       return () => {
//         video.removeEventListener("timeupdate", handleTimeUpdate);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const section = sectionRef.current;
//       const rect = section.getBoundingClientRect();

//       const scrollDistance =
//         section.offsetHeight - window.innerHeight;

//       const currentScroll = Math.min(
//         Math.max(-rect.top, 0),
//         scrollDistance
//       );

//       const progress =
//         scrollDistance > 0
//           ? currentScroll / scrollDistance
//           : 0;

//       setScrollProgress(progress);
//     };

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Stack Cover animation values
//   const scale = 1 - scrollProgress * 0.08;
//   const borderRadius = scrollProgress * 32;
//   const opacity = 1 - scrollProgress * 0.7;
//   const contentTranslateY = scrollProgress * -80;

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-[180vh] bg-[#0C3B58]"
//     >
//       {/* Sticky Stack Cover */}
//       <div className="sticky top-0 h-screen overflow-hidden">

//         <div
//           className="relative h-full w-full overflow-hidden bg-black"
//           style={{
//             transform: `scale(${scale})`,
//             borderRadius: `${borderRadius}px`,
//             transformOrigin: "top center",
//           }}
//         >
//           {/* Background Video */}
//           <video
//             ref={videoRef}
//             src="/14452162-uhd_3840_2160_30fps.mp4"
//             autoPlay
//             muted
//             playsInline
//             className="absolute inset-0 h-full w-full object-cover pointer-events-none"
//           />

//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-black/40 pointer-events-none" />

//           {/* Gradient for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

//           {/* Hero Content */}
//           <div
//             className={`absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-24 sm:px-6 lg:px-8 transition-all duration-700 ${
//               showContent ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               opacity: showContent ? opacity : 0,
//               transform: `translateY(${contentTranslateY}px)`,
//             }}
//           >
//             <div className="max-w-3xl">

//               <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00C8A0]">
//                 Bahrain Surf Park
//               </p>

//               <h1 className="mb-6 text-4xl font-serif font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
//                 Riding Today,
//                 <br />
//                 Shaping Tomorrow
//               </h1>

//               <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
//                 Experience the thrill of every wave and discover a new way
//                 to connect, ride, and explore the ocean.
//               </p>

//               <div className="flex flex-wrap items-center gap-4">

//                 <button
//                   onClick={onExploreClick}
//                   className="group flex cursor-pointer items-center gap-2 rounded-full bg-[#00C8A0] px-8 py-3.5 font-bold text-[#0C3B58] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#00b08e]"
//                 >
//                   One Wave at a Time

//                   <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
//                 </button>

//                 <button
//                   onClick={onExploreClick}
//                   className="cursor-pointer rounded-full bg-white px-8 py-3.5 font-semibold text-[#0C3B58] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
//                 >
//                   Get in contact
//                 </button>

//               </div>
//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div
//             className="absolute bottom-10 right-8 z-20 hidden sm:block"
//             style={{
//               opacity: 1 - scrollProgress,
//             }}
//           >
//             <p className="text-xs tracking-[0.25em] text-white/70">
//               SCROLL TO EXPLORE ↓
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;