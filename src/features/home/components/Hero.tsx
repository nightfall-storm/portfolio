"use client";

import { motion, Variants } from "motion/react";

/** Geographic coordinates for Tangier, Morocco. Displayed as a decorative element. */
const COORDINATES = "LAT: 35.7595 N // LONG: 5.8340 W";

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
      {/* Vertical scanning line */}
      <motion.div
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="scanning-line opacity-50"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-40 items-center mt-12 lg:mt-0"
      >
        {/* Left: Name and Role */}
        <div className="flex flex-col items-start lg:pr-12">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-10 w-full">
            <div className="px-3 py-1 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 rounded-none">
              Software Engineer
            </div>

            <h1 className="text-[14vw] sm:text-[12vw] lg:text-[7.5vw] font-black tracking-tighter leading-[0.8] text-foreground uppercase break-all sm:whitespace-nowrap">
              BILAL
              <br />
              <span className="text-muted-foreground/60">NNASSER</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl">
            <h2 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] sm:tracking-[0.4em] text-accent-cyan mb-8 lg:mb-10 uppercase">
              Frontend Architect & System Owner
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] md:text-xs leading-relaxed text-muted-foreground uppercase tracking-widest mb-10 lg:mb-14 max-w-lg text-balance">
              Responsible for core frontend infrastructure. Optimized UI
              performance, reduced redundant data calls, and structured
              system-wide frontend architecture for Fasgo and Postuly.
            </p>

            <div className="flex items-center gap-6">
              <div className="w-12 sm:w-16 h-px bg-accent-cyan/40" />
              <span className="font-mono text-[8px] sm:text-[9px] text-muted-foreground/80 tracking-[0.4em] uppercase">
                Based in Tangier, Morocco
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Technical Profile */}
        <motion.div
          variants={itemVariants}
          className="font-mono text-[11px] sm:text-[12px] lg:text-[13px] text-muted-foreground border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden rounded-none w-full shadow-2xl"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-24 opacity-[0.02] pointer-events-none" />

          <div className="flex items-center justify-between mb-8 lg:mb-12 border-b border-border pb-6 lg:pb-8">
            <div className="flex gap-2 sm:gap-3">
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
              <div className="w-2.5 h-2.5 rounded-none bg-muted/30" />
            </div>
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.4em] text-muted-foreground/60 uppercase">
              Technical Profile
            </span>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div>
              <span className="text-accent-cyan/60 tracking-widest">
                &quot;environment&quot;:
              </span>{" "}
              {" {"}
              <div className="pl-6 sm:pl-8 text-foreground/90">
                &quot;OS&quot;: [&quot;Linux&quot;, &quot;Fedora&quot;,
                &quot;Ubuntu&quot;, &quot;Windows&quot;],
                <br />
                &quot;EDITOR&quot;: &quot;Zed&quot;,
                <br />
                &quot;SHELL&quot;: &quot;Fish&quot;
              </div>
              {" },"}
            </div>

            <div>
              <span className="text-accent-cyan/60 tracking-widest">
                &quot;core_stack&quot;:
              </span>{" "}
              {" {"}
              <div className="pl-6 sm:pl-8 text-foreground/90">
                &quot;FRONTEND&quot;: [&quot;Next.js&quot;, &quot;React&quot;,
                &quot;Tailwind CSS 4&quot;, &quot;GSAP&quot;],
                <br />
                &quot;BACKEND&quot;: [&quot;Hono&quot;, &quot;NestJS&quot;,
                &quot;ASP.NET Core&quot;],
                <br />
                &quot;INFRA&quot;: [&quot;Cloudflare&quot;, &quot;Docker&quot;,
                &quot;CI/CD&quot;]
              </div>
              {" },"}
            </div>

            <div>
              <span className="text-accent-cyan/60 tracking-widest">
                &quot;experience&quot;:
              </span>{" "}
              <span className="text-foreground/90">&quot;1.5+ Years&quot;</span>
              ,
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">
                &quot;status&quot;:
              </span>{" "}
              <span className="text-foreground/90">
                &quot;Master&apos;s Student at ENSI&quot;
              </span>
              ,
            </div>
            <div>
              <span className="text-accent-cyan/60 tracking-widest">
                &quot;location&quot;:
              </span>{" "}
              <span className="text-foreground/90">
                &quot;Tangier, Morocco&quot;
              </span>
              ,
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-8 lg:mt-12 text-accent-cyan animate-pulse">
              <span className="text-[10px] sm:text-[12px] tracking-widest">
                {">"}
              </span>
              <span className="text-[8px] sm:text-[10px] lg:text-[10px] tracking-[0.4em] lg:tracking-[0.6em] uppercase">
                System Active
              </span>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 overflow-hidden pointer-events-none">
            <div className="absolute top-[-32px] sm:top-[-48px] right-[-32px] sm:right-[-48px] w-16 sm:w-24 h-16 sm:h-24 bg-accent-cyan/[0.03] rotate-45 border border-accent-cyan/10" />
          </div>
        </motion.div>
      </motion.div>

      {/* Coordinates */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 font-mono text-[8px] sm:text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase">
        {COORDINATES}
      </div>
      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:left-10 sm:right-10 font-mono text-[8px] sm:text-[9px] text-muted-foreground/60 tracking-[0.5em] hidden md:block uppercase">
        Location: Tangier, Morocco{" "}
        <span className="text-muted/40 mx-2">{`//`}</span> Status: Active
      </div>

      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-80" />
    </section>
  );
}
