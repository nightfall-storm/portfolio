import React from "react";

export function Hero() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 pt-32 pb-16 relative" id="main">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16">
        {/* Left Side: Titles and Description */}
        <div className="max-w-2xl">
          <div className="font-mono text-xs tracking-[0.2em] text-zinc-500 mb-6 uppercase">
            ARCHITECTURE GRID // SOFTWARE ENGINEER
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-zinc-100 mb-8">
            BILAL<br />
            NASSER
          </h1>
          <p className="font-mono text-sm leading-relaxed text-zinc-400 max-w-md">
            Engineering sovereign digital structures.
            Building high performance architectural
            systems with industrial precision and brutalist
            aesthetics.
          </p>
        </div>

        {/* Right Side: Technical Specs */}
        <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase flex flex-col gap-8 md:text-right pt-4">
          <div>
            <div className="text-zinc-600 mb-1">CAP_DIMENSIONS</div>
            <div className="text-zinc-300">33_2731 N, 7_5898 W</div>
          </div>
          <div>
            <div className="text-zinc-600 mb-1">KERNEL_VERSION</div>
            <div className="text-zinc-300">V4.2.0_STABLE_10E</div>
          </div>
          <div>
            <div className="text-zinc-600 mb-1">UPTIME</div>
            <div className="text-zinc-300">01.0924</div>
          </div>
        </div>
      </div>
    </section>
  );
}
