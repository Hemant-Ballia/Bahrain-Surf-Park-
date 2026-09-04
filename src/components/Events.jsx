import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    date: "12 AUG",
    title: "Surf Competition",
    text: "Watch riders compete and push their limits.",
  },
  {
    date: "20 AUG",
    title: "Family Surf Day",
    text: "A fun experience designed for families.",
  },
  {
    date: "28 AUG",
    title: "Sunset Session",
    text: "Ride the waves as the sun goes down.",
  },
];

const Events = () => {
  return (
    <section
      id="events"
      // Added the dark blue color from your image
      className="bg-[#112E44] py-24 px-5 sm:px-8 text-white font-outfit relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-14"
        >
          <div>
            <p className="text-[#00bef0] uppercase text-sm font-bold tracking-[0.2em] mb-4">
              What's Happening
            </p>

            <h2 className="text-4xl sm:text-6xl font-caacupe text-[#fffff2] tracking-wide">
              Upcoming Events
            </h2>
          </div>
        </motion.div>

        <div className="border-t border-[#fffff2]/20">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              // Cleaned up hover state to match the solid background
              className="grid md:grid-cols-[180px_1fr_auto] gap-6 items-center py-8 border-b border-[#fffff2]/20 group transition-colors duration-300 hover:bg-white/5 px-4 rounded-lg cursor-pointer"
            >
              <span className="font-caacupe text-[#00bef0] text-lg tracking-wider">
                {event.date}
              </span>

              <div>
                <h3 className="text-2xl font-caacupe text-[#fffff2] tracking-wide group-hover:text-[#00bef0] transition-colors">
                  {event.title}
                </h3>

                <p className="text-[#fffff2]/90 mt-2 font-light text-sm sm:text-base">
                  {event.text}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full border border-[#fffff2]/40 flex items-center justify-center text-[#fffff2] group-hover:bg-[#fffff2] group-hover:text-[#112E44] group-hover:border-[#fffff2] transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;