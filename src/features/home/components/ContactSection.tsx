"use client";

import React from "react";
import { motion } from "motion/react";
import { Send, Terminal, AtSign, ExternalLink, ChevronRight } from "lucide-react";

function TerminalInput({ label, placeholder, type = "text" }: any) {
  return (
    <div className="group relative flex items-center border-b border-zinc-800/50 py-4 focus-within:border-accent-cyan transition-colors duration-500">
      <label className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em] w-48 flex items-center gap-2">
        <span className="text-accent-cyan opacity-0 group-focus-within:opacity-100 transition-opacity">{">"}</span>
        {label}
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-zinc-300 placeholder:text-zinc-700 tracking-wider uppercase"
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        className="absolute bottom-[-1px] left-0 w-full h-px bg-accent-cyan origin-left"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
      />
    </div>
  );
}

export function ContactSection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 mb-24" id="comm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Left Side: Text and Signal Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-2 mb-12">
            <span className="font-mono text-[10px] text-accent-cyan tracking-[0.4em] uppercase flex items-center gap-2">
              <Terminal className="w-3 h-3" /> UPLINK_PROTOCOL_V2
            </span>
            <h2 className="text-5xl font-black tracking-tighter text-zinc-100 uppercase font-[family-name:var(--font-geist-sans)]">
              ESTABLISH_COMM
            </h2>
          </div>

          <p className="text-xs text-zinc-500 font-mono leading-relaxed max-w-md mb-16 uppercase tracking-tight">
            Currently open for architectural audits, custom engineering contracts, and high-impact infrastructure partnerships.
            <br /><br />
            EXPECTED_RESPONSE_TIME: {"<"} 24_HOURS
          </p>

          <div className="space-y-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-zinc-700 tracking-[0.3em] uppercase">DIRECT_SIGNAL_ENDPOINTS</span>
              <div className="space-y-4">
                <a href="mailto:bilalnnassernf@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors">
                    <AtSign className="w-3.5 h-3.5 text-zinc-600 group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <span className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors uppercase">bilalnnassernf@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/bilal-nnasser" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <span className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors uppercase">in/bilal-nnasser</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Terminal Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="border border-zinc-800/50 bg-[#0a0b10] p-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-24 opacity-[0.02] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-12 border-b border-zinc-800/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-900/50" />
                <div className="w-2 h-2 rounded-full bg-amber-900/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-900/50" />
              </div>
              <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">ENCRYPTED_SESSION_ACTIVE</span>
            </div>

            <div className="space-y-2">
              <TerminalInput label="EMAIL_RECIPIENT>" placeholder="YOUR_IDENTIFIER@DOMAIN.COM" />
              <TerminalInput label="SUBJECT_HEADER>" placeholder="PROJECT_PROPOSAL_V1" />
              <div className="group relative flex flex-col border-b border-zinc-800/50 py-4 focus-within:border-accent-cyan transition-colors duration-500">
                <label className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="text-accent-cyan opacity-0 group-focus-within:opacity-100 transition-opacity">{">"}</span>
                  TRANSMISSION_BODY
                </label>
                <textarea 
                  rows={4}
                  placeholder="DESCRIBE_YOUR_ARCHITECTURE_NEEDS..."
                  className="bg-transparent border-none outline-none font-mono text-xs text-zinc-300 placeholder:text-zinc-700 tracking-wider uppercase resize-none h-32"
                />
              </div>
            </div>

            <button className="mt-12 w-full py-4 border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan font-mono text-xs tracking-[0.3em] uppercase hover:bg-accent-cyan/10 hover:border-accent-cyan/50 transition-all flex items-center justify-center gap-3 group">
              EXECUTE_TRANSMISSION
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <div className="mt-6 flex justify-between items-center font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
              <span>SECURITY: AES_256_GCM</span>
              <span>PACKET_LOSS: 0.00%</span>
            </div>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-accent-cyan/40" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-accent-cyan/40" />
        </motion.div>

      </div>
    </section>
  );
}
