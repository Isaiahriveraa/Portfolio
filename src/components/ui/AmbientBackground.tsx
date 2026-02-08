"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    size: 600,
    color: "rgba(232, 224, 212, 0.08)",
    x: "10%",
    y: "20%",
    duration: 25,
    delay: 0,
  },
  {
    size: 500,
    color: "rgba(232, 224, 212, 0.05)",
    x: "70%",
    y: "60%",
    duration: 30,
    delay: 5,
  },
  {
    size: 400,
    color: "rgba(245, 240, 232, 0.04)",
    x: "50%",
    y: "10%",
    duration: 20,
    delay: 10,
  },
];

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="ambient-orb"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
