"use client";

import { motion } from "motion/react";

/**
 * Core technologies used in projects where I led development.
 */
const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "NestJS",
  "Hono",
  "FastAPI",
  "SWR",
  "Flutter",
  "ASP.NET Core",
  "Tailwind CSS",
  "shadcn/ui",
  "Cloudflare",
  "Supabase",
  "Firebase",
  "Docker",
  "PostgreSQL",
  "GitLab CI/CD",
];

/**
 * Scrolling marquee of technologies.
 * Indicates tools and frameworks actively used in projects.
 */
export function TechTicker() {
  return (
    <div
      className="w-full border-y border-zinc-800/50 bg-[#0a0b10] py-4 overflow-hidden relative"
      id="tech"
    >
      {/* Fade Edges for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-16 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase w-max px-8"
        >
          {/* Duplicate array for seamless loop */}
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
