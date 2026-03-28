"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const COORDINATES = "LAT: 35.7595 N // LONG: 5.8340 W"; // Tangier, Morocco

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }, 
    },
  };

  return (
    <section 
      className="w-full h-screen min-h-[900px] flex items-center relative overflow-hidden bg-grid-24"
      id="main"
    >
      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="scanning-line opacity-50"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1600px] mx-auto px-8 lg:px-16 z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-24 lg:gap-40 items-center"
      >
        {/* Left Side: Main Heading */}
        <div className="flex flex-col items-start lg:pr-12">
          <motion.div variants={itemVariants} className="mb-10">
            <div className="px-3 py-1 border-[0.5px] border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[10px] tracking-[0.3em] uppercase inline-block mb-8 rounded-none">
              SOFTWARE_ENGINEER_V2.5
            </div>
            
            <h1 className="text-[12vw] lg:text-[7.5vw] font-black tracking-tighter leading-[0.8] text-foreground uppercase whitespace-nowrap">
              BILAL<br />
              <span className="text-muted-foreground/60">NNASSER</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl">
            <h2 className="text-sm md:text-base font-mono tracking-[0.4em] text-accent-cyan mb-10 uppercase">
              LEAD WEB DEVELOPER // UI ARCHITECT
            </h2>
            <p className="font-mono text-[11px] md:text-xs leading-relaxed text-muted-foreground uppercase tracking-widest mb-14 max-w-lg">
              Software Engineer with a strong focus on modern frontend architecture 
              and technical leadership. Currently leading development teams at Logiciel Lab 
              and architecting solutions like Fasgo and Postuly.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-[0.5px] bg-accent-cyan/40" />
              <span className="font-mono text-[9px] text-muted-foreground/80 tracking-[0.4em] uppercase">
                MMXXIV_ESTABLISHED
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Code Spec (Bigger) */}
        <motion.div 
          variants={itemVariants}
          className="hidden lg:block font-mono text-[13px] text-muted-foreground border-[0.5px] border-border bg-card/40 backdrop-blur-sm p-12 relative overflow-hidden rounded-none w-full shadow-2xl"
        >
          {/* Internal Grid Overlay */}
          <div className="absolute inset-0 bg-grid-24 opacity-[0.02] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-12 border-b-[0.5px] border-border pb-8">
            <div className="flex gap-3">
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
            </div>
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground/60 uppercase">SYSTEM_MANIFEST.JSON</span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-accent-cyan/60 tracking-widest">"experience":</span> <span className="text-foreground/90">"2_YEARS_ACTIVE"</span>,
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">"specialization":</span> <span className="text-foreground/90">"FRONTEND_ARCHITECTURE"</span>,
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">"core_stack":</span> &#123;
              <div className="pl-8 text-foreground/90">
                "FRAMEWORK": "NEXT_JS_16",<br />
                "LIBRARY": "REACT_19",<br />
                "STYLING": "TAILWIND_V4"
              </div>
              &#125;,
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">"toolkit":</span> [
              <div className="pl-8 text-foreground/90">
                "SHADCN_UI", "ZUSTAND", "RADIX_UI",<br />
                "ZOD", "REACT_HOOK_FORM", "BASE_UI"
              </div>
              ],
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">"location":</span> <span className="text-foreground/90">"TANGIER_MOROCCO"</span>,
            </div>
            <div className="flex items-center gap-4 mt-12 text-accent-cyan animate-pulse">
              <span className="text-[12px] tracking-widest">{">"}</span>
              <span className="text-[10px] tracking-[0.6em] uppercase">KERNEL_OPTIMIZED_V4.2</span>
            </div>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
            <div className="absolute top-[-48px] right-[-48px] w-24 h-24 bg-accent-cyan/[0.03] rotate-45 border-[0.5px] border-accent-cyan/10" />
          </div>
        </motion.div>
      </motion.div>

      {/* Coordinate Markers */}
      <div className="absolute bottom-12 left-10 font-mono text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase">
        {COORDINATES}
      </div>
      <div className="absolute bottom-12 right-10 font-mono text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase">
        LOC: TANGIER_MAR <span className="text-muted/40 mx-2">//</span> STATUS: ENCRYPTED_LINK_ACTIVE
      </div>

      {/* Ambient Grid Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-80" />
    </section>
  );
}
