import React from "react";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";

export function ProjectMatrix() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24" id="projects">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-800/50 pb-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-zinc-100">PROJECT_MATRIX</h2>
        <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
          TOTAL_ENTRIES: 12
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Project Card 1 */}
        <div className="group border border-zinc-800/50 bg-[#0c0d14] p-6 hover:border-accent-cyan/50 transition-colors flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-zinc-500 uppercase">
              <span>PRJ_01</span>
              <CheckCircle2 className="w-3 h-3 text-accent-cyan" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-200 mb-3">ULTRACONTROLE.MA</h3>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">
              Enterprise-grade resource management platform for complex logistics. Live deployment with high-availability architecture.
            </p>
          </div>
          <div className="mt-8">
            <Link href="#" className="font-mono text-xs text-accent-cyan tracking-widest hover:underline uppercase">
              EXECUTE_VIEW
            </Link>
          </div>
        </div>

        {/* Project Card 2 - Redacted */}
        <div className="group border border-zinc-800/50 bg-[#0a0b10] p-6 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 -rotate-12">
            <span className="text-6xl font-black tracking-tighter text-zinc-100 uppercase">REDACTED</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-zinc-500 uppercase">
              <span>PRJ_02</span>
              <span className="border border-zinc-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> CLASSIFIED
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-400 mb-3">FASGO_BACKOFFICE</h3>
            <ul className="text-xs text-zinc-500 font-mono leading-relaxed space-y-1">
              <li>{">"} AUTH_LAYER_OPT_V2.1</li>
              <li>{">"} DB_SHARD_NORMALIZATION</li>
              <li>{">"} CACHE_REDIS_CLUSTER</li>
              <li>{">"} ASYNC_CELERY_QUEUE_PROCESSING</li>
            </ul>
          </div>
          <div className="mt-8 font-mono text-[10px] text-zinc-600 tracking-widest uppercase relative z-10">
            RESTRICTED INTERNAL SYS
          </div>
        </div>

        {/* Project Card 3 - Progress */}
        <div className="group border border-zinc-800/50 bg-[#0c0d14] p-6 hover:border-accent-cyan/50 transition-colors flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-zinc-500 uppercase">
              <span>PRJ_03</span>
              <span className="text-amber-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> IN_DEV
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-200 mb-3">POSTULY</h3>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">
              Automated recruitment workflow engine. Built for massive scale and high-speed processing.
            </p>
          </div>
          
          <div className="mt-8 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <div className="flex justify-between mb-2">
              <span>PHASE_BUILD_RC</span>
              <span>85%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent-cyan w-[85%]"></div>
            </div>
            <div className="mt-4 text-zinc-600 text-[9px]">
              COMPLETION_EST: ADMIN_PEND
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
