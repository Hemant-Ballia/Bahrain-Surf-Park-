import React from "react";
import { Zap, Waves, Puzzle } from "lucide-react";

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        .about-section * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="about-section py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0077B6] tracking-tight">
              About Bahrain Surf Park
            </h2>

            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Experience the ultimate coastal lifestyle and world-class wave
              technology at Bilaj Al Jazayer.
            </p>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative">

            {/* Glow */}
            <div
              className="
                size-[520px]
                rounded-full
                absolute
                -left-32
                top-1/2
                -translate-y-1/2
                blur-[300px]
                -z-10
                bg-[#00E599]/10
              "
            />

            {/* Left Side */}
            <div className="w-full lg:max-w-xl">

              <h3 className="text-2xl font-semibold text-[#0077B6] mb-2">
                World-Class Features
              </h3>

              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Engineered with cutting-edge Wavegarden Cove technology —
                delivering pristine waves, safety, and resort-level
                hospitality.
              </p>

              <div className="flex flex-col gap-6">

                {/* Feature 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-slate-50">

                  <div className="size-10 bg-[#0077B6] rounded-lg flex items-center justify-center shrink-0">
                    <Zap
                      size={20}
                      strokeWidth={2.2}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-800">
                      1,000 Waves Per Hour
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      High-capacity generation supporting up to 90 surfers
                      simultaneously.
                    </p>
                  </div>

                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-slate-50">

                  <div className="size-10 bg-[#0077B6] rounded-lg flex items-center justify-center shrink-0">
                    <Waves
                      size={20}
                      strokeWidth={2.2}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-800">
                      Multi-Level Surf Profiles
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Customizable wave types ranging from gentle beginner
                      whitewater to pro barrels.
                    </p>
                  </div>

                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-slate-50">

                  <div className="size-10 bg-[#0077B6] rounded-lg flex items-center justify-center shrink-0">
                    <Puzzle
                      size={20}
                      strokeWidth={2.2}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-800">
                      Complete Resort Ecosystem
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Integrated surf academy, dining terraces, retail shops,
                      and wellness zones.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Side Image */}
            <div className="w-full lg:w-auto shrink-0 flex justify-center">

              <div className="relative shadow-2xl border border-slate-100 rounded-lg overflow-hidden max-w-lg w-full">

                <img
                  className="w-full h-[480px] object-cover block"
                  src="/about.jpeg"
                  alt="Bahrain Surf Park Experience"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop";
                  }}
                />

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}