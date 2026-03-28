"use client";

import React from "react";
import { motion, Variants } from "motion/react";

const COORDINATES = "LAT: 35.7595 N // LONG: 5.8340 W"; // Tangier, Morocco

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, 
    },
  };

  return (
    <section 
      className="w-full min-h-screen flex items-center relative overflow-hidden bg-grid-24 py-20 lg:py-0"
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
        className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-40 items-center mt-12 lg:mt-0 text-left"
      >
        {/* Left Side: Main Heading */}
        <div className="flex flex-col items-start lg:pr-12 text-left">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-10 w-full text-left">
            <div className="px-3 py-1 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 rounded-none text-left">
              SOFTWARE_ENGINEER_V3.0
            </div>
            
            <h1 className="text-[14vw] sm:text-[12vw] lg:text-[7.5vw] font-black tracking-tighter leading-[0.8] text-foreground uppercase break-all sm:whitespace-nowrap text-left">
              BILAL<br />
              <span className="text-muted-foreground/60 text-left">NNASSER</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl text-left">
            <h2 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] sm:tracking-[0.4em] text-accent-cyan mb-8 lg:mb-10 uppercase text-left">
              SOFTWARE ENGINEER // FRONTEND ARCHITECT
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] md:text-xs leading-relaxed text-muted-foreground uppercase tracking-widest mb-10 lg:mb-14 max-w-lg text-balance text-left">
              Software Engineer specializing in modern UI architecture 
              and technical leadership. Driving high-performance systems 
              while maintaining strategic project management. Expanding 
              deep expertise into backend systems with Hono and NestJS.
            </p>
            
            <div className="flex items-center gap-6 text-left">
              <div className="w-12 sm:w-16 h-px bg-accent-cyan/40 text-left" />
              <span className="font-mono text-[8px] sm:text-[9px] text-muted-foreground/80 tracking-[0.4em] uppercase text-left">
                MMXXIV_ESTABLISHED
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Code Spec */}
        <motion.div 
          variants={itemVariants}
          className="font-mono text-[11px] sm:text-[12px] lg:text-[13px] text-muted-foreground border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden rounded-none w-full shadow-2xl text-left"
        >
          {/* Internal Grid Overlay */}
          <div className="absolute inset-0 bg-grid-24 opacity-[0.02] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 lg:mb-12 border-b border-border pb-6 lg:pb-8 text-left">
            <div className="flex gap-2 sm:gap-3 text-left">
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30 text-left" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30 text-left" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30 text-left" />
            </div>
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.4em] text-muted-foreground/60 uppercase text-left">SYSTEM_MANIFEST.JSON</span>
          </div>

          <div className="space-y-4 lg:space-y-6 text-left">
            <div className="text-left">
              <span className="text-accent-cyan/60 tracking-widest text-left">&quot;environment&quot;:</span> &#123;
              <div className="pl-6 sm:pl-8 text-foreground/90 text-left">
                &quot;OS&quot;: [&quot;LINUX&quot;, &quot;FEDORA&quot;, &quot;UBUNTU&quot;, &quot;WINDOWS&quot;],<br />
                &quot;EDITOR&quot;: &quot;ZED&quot;,<br />
                &quot;SHELL&quot;: &quot;FISH&quot;
              </div>
              &#125;,
            </div>
            <div className="text-left">
              <span className="text-accent-cyan/60 tracking-widest text-left">&quot;core_stack&quot;:</span> &#123;
              <div className="pl-6 sm:pl-8 text-foreground/90 text-left">
                &quot;FRONTEND&quot;: [&quot;NEXT_JS&quot;, &quot;REACT&quot;, &quot;TAILWIND_V4&quot;],<br />
                &quot;BACKEND_EXP&quot;: [&quot;HONO&quot;, &quot;NEST_JS&quot;, &quot;TYPESCRIPT&quot;],<br />
                &quot;MOBILE&quot;: &quot;FLUTTER&quot;
              </div>
              &#125;,
            </div>
            <div className="text-left">
              <span className="text-accent-cyan/60 tracking-widest text-left">&quot;experience&quot;:</span> <span className="text-foreground/90 text-left">&quot;3_YEARS+&quot;</span>,
            </div>
            <div className="text-left">
              <span className="text-accent-cyan/60 tracking-widest text-left">&quot;status&quot;:</span> <span className="text-foreground/90 text-left">&quot;MASTER_CANDIDATE_ENSI&quot;</span>,
            </div>
            <div className="text-left">
              <span className="text-accent-cyan/60 tracking-widest text-left">&quot;location&quot;:</span> <span className="text-foreground/90 text-left">&quot;TANGIER_MOROCCO&quot;</span>,
            </div>
            <div className="flex items-center gap-3 sm:gap-4 mt-8 lg:mt-12 text-accent-cyan animate-pulse text-left">
              <span className="text-[10px] sm:text-[12px] tracking-widest text-left">{">"}</span>
              <span className="text-[8px] sm:text-[10px] lg:text-[10px] tracking-[0.4em] lg:tracking-[0.6em] uppercase text-left">KERNEL_OPTIMIZED_V4.2</span>
            </div>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 overflow-hidden pointer-events-none text-left">
            <div className="absolute top-[-32px] sm:top-[-48px] right-[-32px] sm:right-[-48px] w-16 sm:w-24 h-16 sm:h-24 bg-accent-cyan/[0.03] rotate-45 border border-accent-cyan/10 text-left" />
          </div>
        </motion.div>
      </motion.div>

      {/* Coordinate Markers */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 font-mono text-[8px] sm:text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase text-left">
        {COORDINATES}
      </div>
      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:left-10 sm:right-10 font-mono text-[8px] sm:text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase text-right">
        LOC: TANGIER_MAR <span className="text-muted/40 mx-2 text-right">{`//`}</span> STATUS: ENCRYPTED_LINK_ACTIVE
      </div>

      {/* Ambient Grid Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-80 text-left" />
    </section>
  );
}
