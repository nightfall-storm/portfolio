"use client";

import { motion } from "motion/react";

/**
 * List of technologies and their versions used in the developer's tech stack.
 */
const technologies = [
  "NEXT.JS [v16.2]",
  "REACT.JS [v19.0]",
  "TYPESCRIPT [v5.7]",
  "NEST.JS [v11]",
  "HONO [v4.5]",
  "FASTAPI [v0.11]",
  "SWR [v2.2]",
  "FLUTTER [v3.24]",
  "ASP.NET CORE [v8.0]",
  "TAILWIND CSS [v4.0]",
  "SHADCN UI",
  "CLOUDFLARE",
  "SUPABASE",
  "FIREBASE",
  "DOCKER",
  "POSTGRESQL",
  "GITLAB // CI/CD",
];

/**
 * `TechTicker` component that creates a scrolling marquee of technologies.
 * 
 * This component adds a dynamic, data-driven feel to the interface, mimicking a "Command Center" ticker.
 * 
 * @architectural_decision
 * - Implements a seamless infinite loop by duplicating the `technologies` array and using `motion.div`.
 * - Sets `animate={{ x: "-50%" }}` with a `linear` ease to maintain a constant scroll speed.
 * - Employs `fade-edge` gradient overlays to provide smooth entry and exit of the tech labels.
 * 
 * @returns {JSX.Element} The rendered scrolling ticker.
 */
export function TechTicker() {
  return (
    <div
      className="w-full border-y border-zinc-800/50 bg-[#0a0b10] py-4 overflow-hidden relative"
      id="tech"
    >
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          className="flex gap-16 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase w-max px-8"
        >
          {/* Duplicate for seamless infinite loop */}
          {[...technologies, ...technologies].map((tech, index) => (
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
