import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-outfit">
      <footer
        ref={footerRef}
        className="relative bg-[#004658] text-white"
      >
        {/* =====================================================
            TOP BACKGROUND WAVE
        ===================================================== */}
        <div className="absolute top-0 left-0 z-10 w-full h-[30px] md:h-[50px] -translate-y-full pointer-events-none">
          <svg
            className="block w-full h-full -scale-y-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              className="fill-[#004658]"
              d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
            />
          </svg>
        </div>

        {/* =====================================================
            MAIN FOOTER GRID CONTENT
        ===================================================== */}
        <div
          className={`relative max-w-[1230px] mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-0">

            {/* COLUMN 1: Logo & Get Started (Pushed slightly up to match wave peak) */}
            <div className="flex flex-col lg:-mt-12">
              <div>
                <a href="#" className="inline-block">
                  <img
                    src="/Bahrain-Surf-Park-Logo-removebg-preview.png"
                    alt="Bahrain Surf Park"
                    className="h-28 md:h-32 w-auto object-contain -ml-2"
                  />
                </a>
              </div>

              <div className="mt-6">
                <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                  Get Started
                </h2>
                <ul className="flex flex-col gap-2 font-light">
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Start</a></li>
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Installation</a></li>
                </ul>
                <a
                  href="#booking"
                  className="mt-5 inline-flex items-center justify-center bg-[#00E599] text-slate-900 rounded-[21px] text-[11px] font-bold tracking-[0.12em] uppercase px-[30px] py-[12px] hover:bg-[#fffff2] hover:text-[#004658] transition-all duration-300 hover:-translate-y-1"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* COLUMN 2: Company & Legal (Pushed down to level with Quick Links & Let's Chat) */}
            <div className="flex flex-col gap-7 lg:mt-16">
              <div>
                <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                  Company
                </h2>
                <ul className="flex flex-col gap-2 font-light">
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Contact</a></li>
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">News</a></li>
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Careers</a></li>
                </ul>
              </div>

              <div>
                <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                  Legal
                </h2>
                <ul className="flex flex-col gap-2 font-light">
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Privacy Notice</a></li>
                  <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Terms of Use</a></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 3: Quick Links (Leveled) */}
            <div className="lg:mt-16">
              <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                Quick Links
              </h2>
              <ul className="flex flex-col gap-2 font-light">
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Support Center</a></li>
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Service Status</a></li>
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Security</a></li>
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Blog</a></li>
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Customers</a></li>
                <li><a href="#" className="text-white hover:text-[#00bef0] transition-colors">Reviews</a></li>
              </ul>
            </div>

            {/* COLUMN 4: Contact & Socials (Leveled) */}
            <div className="flex flex-col gap-7 lg:mt-16">
              <div>
                <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                  Let's Chat
                </h2>
                <p className="text-[#fffff2] mb-4 text-sm font-light">
                  Have a support question?
                </p>
                <a
                  href="#"
                  className="bg-[#027b9a] rounded-[21px] text-[#fffff2] text-[11px] font-bold tracking-[0.1em] uppercase px-[30px] py-[12px] inline-block hover:bg-[#fffff2] hover:text-[#00bef0] transition-colors"
                >
                  Get in Touch
                </a>
              </div>

              <div>
                <h2 className="font-caacupe text-[#fffff2] text-[15px] tracking-[0.1em] uppercase mb-3">
                  You Call Us
                </h2>
                <a
                  href="tel:0124-64XXXX"
                  className="text-white text-lg font-medium hover:text-[#00bef0] transition-colors"
                >
                  0124-64XXXX
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM RIGHT FLAT SOCIAL ICONS
          ===================================================== */}
          <div className="md:absolute bottom-0 right-4 md:right-8 flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="p-2.5 bg-[#027b9a] rounded-full hover:-translate-y-1 hover:bg-[#00bef0] transition-all duration-300">
              <svg className="w-[18px] h-[18px] fill-[#fffff2]" viewBox="0 0 30 30">
                <path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="p-2.5 bg-[#027b9a] rounded-full hover:-translate-y-1 hover:bg-[#00bef0] transition-all duration-300">
              <svg className="w-[18px] h-[18px] fill-[#fffff2]" viewBox="0 0 26 26">
                <path d="M25.855469 5.574219C24.914063 5.992188 23.902344 6.273438 22.839844 6.402344C23.921875 5.75 24.757813 4.722656 25.148438 3.496094C24.132813 4.097656 23.007813 4.535156 21.8125 4.769531C20.855469 3.75 19.492188 3.113281 17.980469 3.113281C15.082031 3.113281 12.730469 5.464844 12.730469 8.363281C12.730469 8.773438 12.777344 9.175781 12.867188 9.558594C8.503906 9.339844 4.636719 7.246094 2.046875 4.070313C1.59375 4.847656 1.335938 5.75 1.335938 6.714844C1.335938 8.535156 2.261719 10.140625 3.671875 11.082031C2.808594 11.054688 2 10.820313 1.292969 10.425781C1.292969 13.035156 3.101563 15.15625 5.503906 15.640625C5.0625 15.761719 4.601563 15.824219 4.121094 15.824219C3.78125 15.824219 3.453125 15.792969 3.132813 15.730469C3.800781 17.8125 5.738281 19.335938 8.035156 19.375C6.242188 20.785156 3.976563 21.621094 1.515625 21.621094C2.585938 23.039063 5.347656 23.90625 8.3125 23.90625C17.96875 23.90625 23.25 15.90625 23.25 8.972656C24.261719 7.554688 25.152344 6.628906 25.855469 5.574219" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="p-2.5 bg-[#027b9a] rounded-full hover:-translate-y-1 hover:bg-[#00bef0] transition-all duration-300">
              <svg className="w-[18px] h-[18px] fill-[#fffff2]" viewBox="0 0 30 30">
                <path d="M15 4C10.814 4 5.3808594 5.0488281 5.3808594 5.0488281L5.3671875 5.0644531C3.4606632 5.3693645 2 7.007624 2 9L2 15L2 15.001953L2 21L2 21.001953A4 4 0 0 0 5.3769531 24.945312L5.3808594 24.951172C5.3808594 24.951172 10.814 26.001953 15 26.001953C19.186 26.001953 24.619141 24.951172 24.619141 24.951172L24.621094 24.949219A4 4 0 0 0 28 21.001953L28 21L28 15.001953L28 15L28 9A4 4 0 0 0 24.623047 5.0546875L24.619141 5.0488281C24.619141 5.0488281 19.186 4 15 4zM12 10.398438L20 15L12 19.601562L12 10.398438z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="p-2.5 bg-[#027b9a] rounded-full hover:-translate-y-1 hover:bg-[#00bef0] transition-all duration-300">
              <svg className="w-[18px] h-[18px] fill-[#fffff2]" viewBox="0 0 32 32">
                <path d="M16 4C9.371094 4 4 9.371094 4 16C4 21.300781 7.4375 25.800781 12.207031 27.386719C12.808594 27.496094 13.027344 27.128906 13.027344 26.808594C13.027344 26.523438 13.015625 25.769531 13.011719 24.769531C9.671875 25.492188 8.96875 23.160156 8.96875 23.160156C8.421875 21.773438 7.636719 21.402344 7.636719 21.402344C6.546875 20.660156 7.71875 20.675781 7.71875 20.675781C8.921875 20.761719 9.554688 21.910156 9.554688 21.910156C10.625 23.746094 12.363281 23.214844 13.046875 22.910156C13.15625 22.132813 13.46875 21.605469 13.808594 21.304688C11.144531 21.003906 8.34375 19.972656 8.34375 15.375C8.34375 14.0625 8.8125 12.992188 9.578125 12.152344C9.457031 11.851563 9.042969 10.628906 9.695313 8.976563C9.695313 8.976563 10.703125 8.65625 12.996094 10.207031C13.953125 9.941406 14.980469 9.808594 16 9.804688C17.019531 9.808594 18.046875 9.941406 19.003906 10.207031C21.296875 8.65625 22.300781 8.976563 22.300781 8.976563C22.957031 10.628813 22.546875 11.851563 22.421875 12.152344C23.191406 12.992188 23.652344 14.062188 23.652344 15.375C23.652344 19.984375 20.847656 20.996094 18.175781 21.296875C18.605469 21.664063 18.988281 22.398438 18.988281 23.515625C18.988281 25.121094 18.976563 26.414063 18.976563 26.808594C18.976563 27.128906 19.191406 27.503906 19.800781 27.386719C24.566406 25.796875 28 21.300781 28 16C28 9.371094 22.628906 4 16 4Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM COPYRIGHT BAR
        ===================================================== */}
        <div className="bg-[#027b9a] text-white py-[13px] px-[20px] text-center w-full">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[13px] font-light leading-[18px] m-0">
              © {new Date().getFullYear()} Bahrain Surf Park. | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;