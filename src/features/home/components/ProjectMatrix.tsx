"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, ExternalLink, Code2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

function ProjectCard({ 
  id, 
  title, 
  description, 
  status, 
  badge, 
  features, 
  progress, 
  isRedacted, 
  href = "#" 
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative border border-zinc-800/50 bg-[#0c0d14] p-6 hover:border-accent-cyan/50 transition-colors flex flex-col justify-between min-h-[320px] overflow-hidden"
    >
      {/* Internal Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Background Grid Pattern (Wireframe Fallback) */}
      <div className="absolute inset-0 bg-grid-24 opacity-[0.03] pointer-events-none" />

      {isRedacted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] -rotate-12 z-0">
          <span className="text-7xl font-black tracking-tighter text-zinc-100 uppercase font-mono">REDACTED</span>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span>PRJ_{id}</span>
          {badge}
        </div>
        
        <h3 className={cn(
          "text-xl font-bold tracking-tight mb-3 uppercase font-[family-name:var(--font-geist-sans)]",
          isRedacted ? "text-zinc-500" : "text-zinc-100"
        )}>
          {title}
        </h3>

        {features ? (
          <ul className="text-[10px] text-zinc-500 font-mono leading-relaxed space-y-1.5 uppercase">
            {features.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-accent-cyan/50 font-bold">{">"}</span> {f}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-zinc-400 font-mono leading-relaxed uppercase tracking-tight">
            {description}
          </p>
        )}
      </div>

      <div className="mt-8 relative z-10">
        {progress !== undefined ? (
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <div className="flex justify-between mb-2">
              <span>BUILD_IN_PROGRESS</span>
              <span className="text-accent-cyan font-bold">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/30">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                className="h-full bg-accent-cyan shadow-[0_0_8px_#89b4fa]" 
              />
            </div>
          </div>
        ) : isRedacted ? (
          <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase flex items-center gap-2">
            <Lock className="w-3 h-3" /> RESTRICTED_INTERNAL_SYS
          </div>
        ) : (
          <Link 
            href={href} 
            className="inline-flex items-center gap-2 font-mono text-[10px] text-accent-cyan tracking-[0.2em] hover:text-white transition-colors uppercase group/btn"
          >
            <span className="border-b border-accent-cyan group-hover/btn:border-white pb-0.5">EXECUTE_VIEW</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectMatrix() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24" id="projects">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-800/50 pb-4 mb-12">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-accent-cyan tracking-[0.4em] uppercase">COLLECTION_V1</span>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase font-[family-name:var(--font-geist-sans)]">PROJECT_MATRIX</h2>
        </div>
        <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase hidden md:block">
          TOTAL_ENTRIES: 03 <span className="text-zinc-800 mx-2">|</span> STATUS: SYNCED
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <ProjectCard 
            id="01"
            title="ULTRACONTROLE.MA"
            description="Enterprise-grade resource management platform for complex logistics. Live deployment with high-availability architecture."
            badge={
              <span className="flex items-center gap-1.5 text-accent-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_5px_#89b4fa]" />
                LIVE_DEPLOY
              </span>
            }
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="02"
            title="FASGO_BACKOFFICE"
            isRedacted
            features={[
              "AUTH_LAYER_OPT_V2.1",
              "DB_SHARD_NORMALIZATION",
              "CACHE_REDIS_CLUSTER",
              "ASYNC_CELERY_QUEUE"
            ]}
            badge={
              <span className="border border-zinc-800 px-2 py-0.5 rounded-full flex items-center gap-1 text-zinc-600">
                <Lock className="w-2.5 h-2.5" /> CLASSIFIED
              </span>
            }
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="03"
            title="POSTULY"
            description="Automated recruitment workflow engine. Built for massive scale and high-speed processing."
            progress={65}
            badge={
              <span className="text-zinc-600 flex items-center gap-1.5">
                <Code2 className="w-3 h-3" /> IN_REFACTOR
              </span>
            }
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
