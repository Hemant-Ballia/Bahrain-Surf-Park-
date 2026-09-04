import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
        {/* Top Wave */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-[30px] w-full -translate-y-full md:h-[50px]">
          <svg
            className="block h-full w-full -scale-y-100"
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

        {/* Main Footer */}
        <div
          className={`relative mx-auto max-w-[1230px] px-4 pb-12 pt-14 transition-all duration-1000 ease-out md:px-8 md:pt-18 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Logo */}
          <div className="mb-8 text-left">
            <a href="#" className="inline-block">
              <img
                src="/Bahrain-Surf-Park-Logo-removebg-preview.png"
                alt="Bahrain Surf Park"
                className="-ml-6 h-28 w-auto object-contain md:h-32"
              />
            </a>
          </div>

          {/* Footer Columns */}
          <div className="mb-12 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:mb-0 lg:grid-cols-5 lg:gap-8">

            {/* Get Started */}
            <div className="flex flex-col text-left">
              <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                Get Started
              </h2>

              <ul className="flex flex-col gap-2 font-light">
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Start
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Installation
                  </a>
                </li>
              </ul>

              <a
                href="#booking"
                className="mt-5 inline-flex items-center justify-center rounded-[21px] bg-[#00E599] px-[30px] py-[12px] text-[11px] font-bold uppercase tracking-[0.12em] text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fffff2] hover:text-[#004658]"
              >
                Book Now
              </a>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-7 text-left">
              <div>
                <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                  Company
                </h2>

                <ul className="flex flex-col gap-2 font-light">
                  <li>
                    <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-7 text-left">
              <div>
                <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                  Legal
                </h2>

                <ul className="flex flex-col gap-2 font-light">
                  <li>
                    <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                      Privacy Notice
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-left">
              <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                Quick Links
              </h2>

              <ul className="flex flex-col gap-2 font-light">
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Service Status
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white transition-colors hover:text-[#00bef0]">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Let's Chat */}
            <div className="flex flex-col gap-7 text-left">
              <div>
                <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                  Let's Chat
                </h2>

                <p className="mb-4 text-sm font-light text-[#fffff2]">
                  Have a support question?
                </p>

                <a
                  href="#"
                  className="inline-block rounded-[21px] bg-[#027b9a] px-[30px] py-[12px] text-[11px] font-bold uppercase tracking-[0.1em] text-[#fffff2] transition-colors hover:bg-[#fffff2] hover:text-[#00bef0]"
                >
                  Get in Touch
                </a>
              </div>

              <div>
                <h2 className="mb-3 font-caacupe text-[15px] uppercase tracking-[0.1em] text-[#00E599]">
                  You Call Us
                </h2>

                <a
                  href="tel:0124-64XXXX"
                  className="text-lg font-medium text-white transition-colors hover:text-[#00bef0]"
                >
                  0124-64XXXX
                </a>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 md:absolute md:bottom-3 md:right-4">

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full bg-[#027b9a] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00bef0]"
            >
              <svg
                className="h-[18px] w-[18px] fill-[#fffff2]"
                viewBox="0 0 30 30"
              >
                <path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full bg-[#027b9a] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00bef0]"
            >
              <svg
                className="h-[18px] w-[18px] fill-[#fffff2]"
                viewBox="0 0 26 26"
              >
                <path d="M25.855469 5.574219C24.914063 5.992188 23.902344 6.273438 22.839844 6.402344C23.921875 5.75 24.757813 4.722656 25.148438 3.496094C24.132813 4.097656 23.007813 4.535156 21.8125 4.769531C20.855469 3.75 19.492188 3.113281 17.980469 3.113281C15.082031 3.113281 12.730469 5.464844 12.730469 8.363281C12.730469 8.773438 12.777344 9.175781 12.867188 9.558594C8.503906 9.339844 4.636719 7.246094 2.046875 4.070313C1.59375 4.847656 1.335938 5.75 1.335938 6.714844C1.335938 8.535156 2.261719 10.140625 3.671875 11.082031C2.808594 11.054688 2 10.820313 1.292969 10.425781C1.292969 13.035156 3.101563 15.15625 5.503906 15.640625C5.0625 15.761719 4.601563 15.824219 4.121094 15.824219C3.78125 15.824219 3.453125 15.792969 3.132813 15.730469C3.800781 17.8125 5.738281 19.335938 8.035156 19.375C6.242188 20.785156 3.976563 21.621094 1.515625 21.621094C2.585938 23.039063 5.347656 23.90625 8.3125 23.90625C17.96875 23.90625 23.25 15.90625 23.25 8.972656C24.261719 7.554688 25.152344 6.628906 25.855469 5.574219" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="rounded-full bg-[#027b9a] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00bef0]"
            >
              <svg
                className="h-[18px] w-[18px] fill-[#fffff2]"
                viewBox="0 0 30 30"
              >
                <path d="M15 4C10.814 4 5.3808594 5.0488281 5.3808594 5.0488281L5.3671875 5.0644531C3.4606632 5.3693645 2 7.007624 2 9L2 15L2 15.001953L2 21L2 21.001953A4 4 0 0 0 5.3769531 24.945312L5.3808594 24.951172C5.3808594 24.951172 10.814 26.001953 15 26.001953C19.186 26.001953 24.619141 24.951172 24.619141 24.951172L24.621094 24.949219A4 4 0 0 0 28 21.001953L28 21L28 15.001953L28 15L28 9A4 4 0 0 0 24.623047 5.0546875L24.619141 5.0488281C24.619141 5.0488281 19.186 4 15 4zM12 10.398438L20 15L12 19.601562L12 10.398438z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-[#027b9a] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00bef0]"
            >
              <svg
                className="h-[18px] w-[18px] fill-[#fffff2]"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-[#027b9a] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00bef0]"
            >
              <svg
                className="h-[18px] w-[18px] fill-[#fffff2]"
                viewBox="0 0 24 24"
              >
                <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.08c0-.87.24-1.46 1.5-1.46h1.6V3.94c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.06V10H8v3h2.3v8h3.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full bg-[#027b9a] px-[20px] py-[13px] text-center text-white">
          <div className="mx-auto max-w-[1200px]">
            <p className="m-0 text-[13px] font-light leading-[18px]">
              © {new Date().getFullYear()} Bahrain Surf Park. | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;