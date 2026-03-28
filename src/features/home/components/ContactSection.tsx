"use client";

import React from "react";
import { motion } from "motion/react";
import { Send, Terminal, AtSign, ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const GitlabIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.47 0 .41.41 0 0 0-.14.18L15 13.29H9L6.08 3.29a.42.42 0 0 0-.14-.18.38.38 0 0 0-.47 0 .41.41 0 0 0-.14.18L2 13.29a.38.38 0 0 0 0 .11.39.39 0 0 0 .14.24l9.54 7.15a.39.39 0 0 0 .44 0l9.54-7.15a.39.39 0 0 0 .14-.24.38.38 0 0 0 0-.11Z"></path>
  </svg>
);

interface TerminalInputProps {
  label: string;
  placeholder: string;
  type?: string;
}

function TerminalInput({ label, placeholder, type = "text" }: TerminalInputProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center border-b border-zinc-800/40 py-5 focus-within:border-accent-cyan/40 transition-colors duration-700 gap-3">
      <label className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] sm:w-48 flex items-center gap-3">
        <span className="text-accent-cyan/60 opacity-0 group-focus-within:opacity-100 transition-opacity">{">"}</span>
        {label}
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-zinc-300 placeholder:text-zinc-800 tracking-widest uppercase"
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        className="absolute bottom-[-1px] left-0 w-full h-px bg-accent-cyan origin-left opacity-60"
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      />
    </div>
  );
}

export function ContactSection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-20 sm:py-32 mb-24 lg:mb-32 text-left" id="comm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Text and Signal Info */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          viewport={{ once: true }}
          className="text-left"
        >
          <div className="flex flex-col gap-3 mb-10 sm:mb-12">
            <span className="font-mono text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-3">
              <Terminal className="w-3.5 h-3.5" /> UPLINK_PROTOCOL_V3
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase text-left">
              ESTABLISH_COMM
            </h2>
          </div>

          <p className="font-mono text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed max-w-md mb-12 sm:mb-20 uppercase tracking-widest text-left">
            Currently open for architectural audits, custom engineering contracts, and high-impact infrastructure partnerships.
            <br /><br />
            LOC: TANGIER_MAR <span className="text-zinc-800 mx-2">{`//`}</span> TZ: GMT+1
          </p>

          <div className="space-y-12 sm:space-y-16 text-left">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] text-zinc-700 tracking-[0.4em] uppercase text-left">DIRECT_SIGNAL_ENDPOINTS</span>
              <div className="grid grid-cols-1 gap-4 sm:gap-5">
                {[
                  { icon: AtSign, label: "BILALNNASSERNF@GMAIL.COM", href: "mailto:bilalnnassernf@gmail.com" },
                  { icon: ExternalLink, label: "BILAL-NNASSER", href: "https://linkedin.com/in/bilal-nnasser" },
                  { icon: GithubIcon, label: "NIGHTFALL-STORM", href: "https://github.com/nightfall-storm" },
                  { icon: GitlabIcon, label: "NIGHTFALL-STORM", href: "https://gitlab.com/nightfall-storm" }
                ].map((item, idx) => (
                  <a key={idx} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 sm:gap-5 group w-fit">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 border border-zinc-800/60 flex items-center justify-center group-hover:border-accent-cyan/40 transition-colors rounded-none bg-zinc-900/20">
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-accent-cyan/80 transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 group-hover:text-white transition-colors tracking-[0.15em] sm:tracking-[0.2em] break-all">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Terminal Form */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          viewport={{ once: true }}
          className="relative text-left"
        >
          <div className="border border-zinc-800/40 bg-[#0a0b10]/40 p-6 sm:p-10 relative overflow-hidden rounded-none backdrop-blur-sm">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-24 opacity-[0.01] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-10 lg:mb-12 border-b border-zinc-800/40 pb-6">
              <div className="flex gap-2 text-left">
                <div className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.3em] uppercase">ENCRYPTED_SESSION_ACTIVE</span>
            </div>

            <div className="space-y-2 sm:space-y-3 text-left">
              <TerminalInput label="EMAIL_RECIPIENT>" placeholder="IDENTIFIER@DOMAIN.SYS" />
              <TerminalInput label="SUBJECT_HEADER>" placeholder="PROJECT_PROPOSAL_V1" />
              <div className="group relative flex flex-col border-b border-zinc-800/40 py-6 focus-within:border-accent-cyan/40 transition-colors duration-700 text-left">
                <label className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                  <span className="text-accent-cyan/60 opacity-0 group-focus-within:opacity-100 transition-opacity">{">"}</span>
                  TRANSMISSION_BODY
                </label>
                <textarea 
                  rows={5}
                  placeholder="DESCRIBE_ARCHITECTURE_NEEDS..."
                  className="bg-transparent border-none outline-none font-mono text-[11px] text-zinc-300 placeholder:text-zinc-800 tracking-widest uppercase resize-none h-32 sm:h-36 text-left"
                />
              </div>
            </div>

            <button className="mt-10 sm:mt-12 w-full py-4 sm:py-5 border border-accent-cyan/20 bg-accent-cyan/[0.03] text-accent-cyan/80 font-mono text-[10px] tracking-[0.5em] uppercase hover:bg-accent-cyan/[0.06] hover:border-accent-cyan/40 transition-all flex items-center justify-center gap-4 group rounded-none overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-24 opacity-[0.05] pointer-events-none" />
              <span className="relative z-10">EXECUTE_TRANSMISSION</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
            </button>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute -top-1 -left-1 w-5 h-5 border-t border-l border-accent-cyan/30" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b border-r border-accent-cyan/30" />
        </motion.div>

      </div>
    </section>
  );
}
