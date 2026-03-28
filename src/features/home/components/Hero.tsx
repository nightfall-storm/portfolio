"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const COORDINATES = "LAT: 35.5731 N // LONG: 5.3683 W";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section 
      className="w-full h-screen min-h-[850px] flex items-center relative overflow-hidden bg-grid-24"
      id="main"
    >
      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="scanning-line"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto px-6 z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side: Main Heading */}
        <div className="flex flex-col items-start">
          <motion.div variants={itemVariants} className="mb-8">
            <div className="px-3 py-1 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[10px] tracking-[0.3em] uppercase inline-block mb-6">
              FRONT_END_ENGINEER_V2.0
            </div>
            
            <h1 className="text-[12vw] lg:text-[8vw] font-[family-name:var(--font-geist-sans)] font-black tracking-tighter leading-[0.8] text-zinc-100 uppercase">
              BILAL<br />
              <span className="text-zinc-600">NASSER</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl">
            <h2 className="text-sm md:text-base font-mono tracking-[0.4em] text-accent-cyan mb-8 uppercase">
              FRONT END ENGINEER // UI ARCHITECT
            </h2>
            <p className="font-mono text-[11px] md:text-xs leading-relaxed text-zinc-500 uppercase tracking-wide mb-12">
              Engineering high-performance user interfaces with industrial precision.
              2+ years of expertise in building scalable, interactive systems 
              with modern web technologies.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-accent-cyan/50" />
              <span className="font-mono text-[9px] text-zinc-600 tracking-[0.3em] uppercase">
                ESTABLISHED_MMXXIV
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Code Spec */}
        <motion.div 
          variants={itemVariants}
          className="hidden lg:block font-mono text-[11px] text-zinc-500 border border-zinc-800/50 bg-[#0a0b10]/80 backdrop-blur-sm p-8 relative overflow-hidden group"
        >
          {/* Internal Grid */}
          <div className="absolute inset-0 bg-grid-24 opacity-[0.03] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 border-b border-zinc-800/30 pb-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <span className="text-[9px] tracking-widest text-zinc-600">SYSTEM_MANIFEST.JSON</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-accent-cyan/60">"experience":</span> <span className="text-zinc-300">"2_YEARS_ACTIVE"</span>,
            </div>
            <div>
              <span className="text-accent-cyan/60">"specialization":</span> <span className="text-zinc-300">"FRONTEND_ENGINEER"</span>,
            </div>
            <div>
              <span className="text-accent-cyan/60">"core_stack":</span> &#123;
              <div className="pl-4 text-zinc-300">
                "FRAMEWORK": "NEXT_JS_16",<br />
                "LIBRARY": "REACT_19",<br />
                "STYLING": "TAILWIND_V4"
              </div>
              &#125;,
            </div>
            <div>
              <span className="text-accent-cyan/60">"toolkit":</span> [
              <div className="pl-4 text-zinc-300">
                "ZOD", "ZUSTAND", "SHADCN_UI",<br />
                "BASE_UI", "RADIX_UI", "HOOK_FORM"
              </div>
              ],
            </div>
            <div>
              <span className="text-accent-cyan/60">"location":</span> <span className="text-zinc-300">"TETOUAN_MOROCCO"</span>,
            </div>
            <div className="flex items-center gap-2 mt-8 text-accent-cyan animate-pulse">
              <span className="text-[9px]">{">"}</span>
              <span className="text-[9px] tracking-widest uppercase">KERNEL_OPTIMIZED_V4.2</span>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
            <div className="absolute top-[-32px] right-[-32px] w-16 h-16 bg-accent-cyan/5 rotate-45 border border-accent-cyan/20" />
          </div>
        </motion.div>
      </motion.div>

      {/* Coordinate Markers */}
      <div className="absolute bottom-12 left-6 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block uppercase">
        {COORDINATES}
      </div>
      <div className="absolute bottom-12 right-6 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block uppercase">
        LOC: TETOUAN_MOROCCO // STATUS: ENCRYPTION_ACTIVE
      </div>

      {/* Ambient Grid Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090f] via-transparent to-[#08090f] pointer-events-none" />
    </section>
  );
}
