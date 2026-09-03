import React from "react";
import { motion } from "motion/react";

const services = [
  {
    title: "Beginner Surf Lessons & Safety",
    description: "Catch your very first wave safely in a controlled lagoon environment with soft-top foam boards under the guidance of certified professional instructors.",
    image: "https://activityauthority.com/wp-content/uploads/2024/05/san-jose-del-cabo-surf-lessons.jpg",
  },
  {
    title: "Pro & Elite Barrel Sessions",
    description: "Conquer heavy, hollow sections built for advanced surfers looking for high-performance aerial maneuvers and deep tube riding thrills.",
    image: "https://www.theinertia.com/wp-content/gallery/wavegarden_1/mateus_herdy-_at_wavegarden.jpg",
  },
  {
    title: "Resort Dining & Coastal Hospitality",
    description: "Relax, dine, and immerse yourself in vibrant coastal hospitality, scenic dining terraces, and world-class relaxation amenities overlooking the lagoon.",
    image: "https://img.freepik.com/premium-photo/tropical-cafe-front-pool-by-seaside_1108314-41336.jpg",
  },
  {
    title: "Surf Lifestyle & Retail Experience",
    description: "Explore top-tier surf gear, high-performance apparel, and exclusive lifestyle accessories to elevate your everyday coastal adventures.",
    image: "https://i.pinimg.com/736x/27/40/4e/27404e500bd3737eda15e2e345c2400a.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-[#0C3B58] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00E599]">
          What We're Offering
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
          World-Class Surf Experiences
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-36">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "" : "lg:col-start-7"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[#00E599]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00E599]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* Image Content */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className={`lg:col-span-6 relative overflow-hidden rounded-3xl shadow-2xl h-[380px] md:h-[450px] bg-[#061f30] border border-white/10 ${
                  isEven ? "" : "lg:col-start-1"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061f30]/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}