"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

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
  const tickerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create the infinite horizontal scroll
      tweenRef.current = gsap.to(tickerRef.current, {
        x: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  return (
    <div
      className="w-full border-y border-zinc-800/50 bg-[#0a0b10] py-4 overflow-hidden relative"
      id="tech"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade Edges for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap">
        <div
          ref={tickerRef}
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
        </div>
      </div>
    </div>
  );
}
