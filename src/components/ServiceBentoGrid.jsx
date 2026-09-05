import React from "react";
import { motion } from "framer-motion";

const tiles = [
  {
    id: "surf-lagoon",
    title: "The Surf Lagoon",
    description: "The heart of the park — a vast, crystal-clear lagoon shaped by the Wavegarden Cove for every skill level.",
    image: "https://i.pinimg.com/originals/1f/2e/ae/1f2eae5663e593f0ec3c380ef27a3231.jpg",
    span: "md:col-span-2 md:row-span-2",
    order: "order-1 md:order-none",
  },
  {
    id: "surf-academy",
    title: "Club Hawaii Surf Academy",
    description: "Certified instructors, structured progressions, and small-group coaching for first-timers to advanced surfers.",
    image: "https://somewheregood.com/wp-content/uploads/2026/01/beginner-surf-lesson-at-te-arai-beach.jpg",
    span: "md:col-span-1 md:row-span-1",
    order: "order-2 md:order-none",
  },
  {
    id: "dining",
    title: "Hospitality & Dining Terraces",
    description: "Beachfront dining and lounge terraces overlooking the lagoon, open through sunset sessions.",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/83/e1/01.jpg",
    span: "md:col-span-1 md:row-span-1",
    order: "order-3 md:order-none",
  },
  {
    id: "events",
    title: "Private Events & Competitions",
    description: "Host championships, brand activations, and private surf days with full venue and broadcast support.",
    image: "https://wavepoolmag.com/wp-content/uploads/2025/06/Houston-surf-park-render-1493x840.jpeg",
    span: "md:col-span-2 md:row-span-1",
    order: "order-4 md:order-none",
  },
  {
    id: "retail",
    title: "Retail & Surf Gear Shops",
    description: "Boards, wetsuits, and apparel from leading surf brands, available to rent or take home.",
    image: "https://retaildesignblog.net/wp-content/uploads/2014/03/Patagonia-Bowery-Surf-Shop-New-York-City.jpg",
    span: "md:col-span-1 md:row-span-1",
    order: "order-5 md:order-none",
  },
  {
    id: "wellness",
    title: "Auxiliary Sports & Wellness",
    description: "Recovery pools, fitness studios, and wellness treatments to round out every visit.",
    image: "/img.png",
    span: "md:col-span-1 md:row-span-1",
    order: "order-6 md:order-none",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function BentoCard({ tile }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative overflow-hidden rounded-3xl ${tile.span} ${tile.order} min-h-[220px]`}
    >
      <img
        src={tile.image}
        alt={tile.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {tile.title}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-white/85">
          {tile.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServiceBentoGrid() {
  return (
    <section id="ecosystem" className="bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="text-h2">The Complete Service Ecosystem</h2>
          <p className="mt-4 text-slate-gray">
            Every element of Club Hawaii is designed to work together — from
            the water to the wellness studio.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[220px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {tiles.map((tile) => (
            <BentoCard key={tile.id} tile={tile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}