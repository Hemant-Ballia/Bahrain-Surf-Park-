import React from 'react';
import * as motion from "motion/react-client";

export default function ScrollTriggered() {
    return (
        <div style={container}>
            {experiences.map(([title, subtitle, image], i) => (
                <Card i={i} title={title} subtitle={subtitle} image={image} key={title} />
            ))}
        </div>
    )
}

function Card({ title, subtitle, image, i }) {
    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.6 }}
        >
            <div style={{ ...splash, backgroundImage: `url(${image})` }} />
            <motion.div style={card} variants={cardVariants} className="card">
                <span className="text-xs uppercase tracking-widest text-[#00C8A0] font-semibold mb-2">
                    Bahrain Surf Park
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0C3B58] mb-2 text-center px-4">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm text-center px-6">
                    {subtitle}
                </p>
            </motion.div>
        </motion.div>
    )
}

const cardVariants = {
    offscreen: {
        y: 200,
        opacity: 0,
    },
    onscreen: {
        y: 30,
        opacity: 1,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.8,
        },
    },
}

const container = {
    margin: "80px auto",
    maxWidth: 600,
    paddingBottom: 100,
    width: "100%",
}

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -100,
}

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.8)",
}

const card = {
    width: 340,
    height: 420,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    background: "#FFFFFF",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    transformOrigin: "center center",
    zIndex: 1,
}

const experiences = [
    ["Wavegarden Cove Technology", "MENA region's first authentic surfing lagoon bringing perfect waves.", "/14452162-uhd_3840_2160_30fps.mp4"],
    ["Club Hawaii Surf Academy", "Expert coaching for all skill levels from beginner learners to pros.", "/Man_surfing_on_artificial_wave_202608292320.mp4"],
    ["Signature Cabanas", "Private cabanas and VIP spaces for relaxation and celebrations[cite: 1].", "/14452162-uhd_3840_2160_30fps.mp4"],
]