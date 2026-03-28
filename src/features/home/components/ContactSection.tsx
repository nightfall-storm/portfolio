import React from "react";
import { Search } from "lucide-react";

export function ContactSection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24" id="comm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-zinc-100 mb-6 uppercase">
            ESTABLISH_COMM
          </h2>
          <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-md mb-12">
            Currently open for architectural audits, custom engineering contracts, and high-impact infrastructure partnerships.
          </p>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/50 pb-2 group">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">EMAIL_ENDPOINT</span>
              <a href="mailto:bn@architect.sys" className="font-mono text-sm text-zinc-300 group-hover:text-accent-cyan transition-colors">
                BN@ARCHITECT.SYS
              </a>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800/50 pb-2 group">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">LINKEDIN_STATION</span>
              <a href="https://linkedin.com/in/bilalnnasser" target="_blank" rel="noreferrer" className="font-mono text-sm text-zinc-300 group-hover:text-accent-cyan transition-colors">
                IN/BILALNASSER
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Graphic/Radar */}
        <div className="h-[400px] border border-zinc-800/50 bg-[#0a0b10] relative flex items-center justify-center overflow-hidden group">
          {/* Subtle background grid in the box */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Scanning line animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-accent-cyan/50 shadow-[0_0_15px_#89b4fa] animate-[scan_4s_ease-in-out_infinite]"></div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full border border-accent-cyan/30 flex items-center justify-center bg-accent-cyan/5 group-hover:scale-110 transition-transform duration-700">
              <Search className="w-6 h-6 text-accent-cyan opacity-80" />
            </div>
            <div className="font-mono text-xs text-accent-cyan tracking-[0.3em] uppercase animate-pulse">
              SCANNING FOR INCOMING SIGNAL
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
