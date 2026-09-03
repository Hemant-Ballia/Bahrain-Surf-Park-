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
      className="bg-[#004658] py-24 px-5 sm:px-8 text-white font-outfit relative overflow-hidden"
    >
      {/* Background 3D Surf Park Image with proper opacity and visibility */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.65 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80"
            alt="Surf Park Background"
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />
        </motion.div>
        {/* Soft gradient overlay to keep text readable while keeping the image clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#004658]/70 via-[#004658]/50 to-[#004658]/70" />
      </div>

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
              className="grid md:grid-cols-[180px_1fr_auto] gap-6 items-center py-8 border-b border-[#fffff2]/20 group transition-colors duration-300 hover:bg-[#027b9a]/40 px-4 rounded-lg cursor-pointer backdrop-blur-md bg-[#004658]/30"
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

              <div className="w-12 h-12 rounded-full border border-[#fffff2]/40 flex items-center justify-center text-[#fffff2] group-hover:bg-[#fffff2] group-hover:text-[#004658] group-hover:border-[#fffff2] transition-all duration-300">
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