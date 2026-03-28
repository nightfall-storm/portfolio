"use client";

import React from "react";
import { motion } from "motion/react";

const technologies = [
  "NEXT.JS [v15.0]",
  "HONO [v4.5]",
  "FASTAPI [v0.11]",
  "DOCKER [v27.x]",
  "POSTGRESQL [v17]",
  "TYPESCRIPT [v5.7]",
  "GSAP [v3.12]",
  "BASE_UI [v1.3]",
  "PYTHON [v3.12]",
  "GOLANG [v1.23]",
];

export function TechTicker() {
  return (
    <div
      className="w-full border-y border-zinc-800/50 bg-[#0a0b10] py-4 overflow-hidden relative"
      id="tech"
    >
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08090f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#08090f] to-transparent z-10 pointer-events-none"></div>

      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }} // 1035 is an estimate, will repeat to be safe
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: "linear" 
          }}
          className="flex gap-16 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase w-max px-8"
        >
          {/* Multiply entries for seamless loop */}
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <span
              key={index}
              className="hover:text-accent-cyan transition-colors cursor-default whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
