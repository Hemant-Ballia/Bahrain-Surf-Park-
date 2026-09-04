import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Waves } from "lucide-react";

const stats = [
  {
    number: "100K+",
    label: "Riders",
    icon: <Users className="w-8 h-8 text-[#00bef0] mb-3" />,
  },
  {
    number: "50+",
    label: "Events",
    icon: <Calendar className="w-8 h-8 text-[#00bef0] mb-3" />,
  },
  {
    number: "365",
    label: "Days of Waves",
    icon: <Waves className="w-8 h-8 text-[#00bef0] mb-3" />,
  },
];

const Stats = () => {
  return (
    <section className="bg-white py-24 px-5 sm:px-8 font-outfit overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2, 
              ease: [0.215, 0.61, 0.355, 1] 
            }}
            whileHover={{ 
              scale: 1.03, 
              y: -5,
              transition: { duration: 0.3 } 
            }}
            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer flex flex-col items-center"
          >
            {stat.icon}
            
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="text-5xl sm:text-7xl font-bold text-[#00bef0] tracking-wide"
            >
              {stat.number}
            </motion.h3>

            <p className="text-gray-500 uppercase tracking-[0.2em] text-sm mt-4 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;