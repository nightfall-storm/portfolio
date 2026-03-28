"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
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
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-6 sm:p-8 hover:border-accent-cyan/40 transition-colors flex flex-col justify-between min-h-[340px] sm:min-h-[360px] overflow-hidden rounded-none"
    >
      {/* Internal Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-24 opacity-[0.015] pointer-events-none" />

      {isRedacted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] -rotate-12 z-0">
          <span className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-100 uppercase font-mono text-center">REDACTED</span>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6 sm:mb-8 font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
          <span>PRJ_{id}</span>
          {badge}
        </div>
        
        <h3 className={cn(
          "text-xl sm:text-2xl font-black tracking-tighter mb-3 sm:mb-4 uppercase",
          isRedacted ? "text-zinc-600" : "text-zinc-100"
        )}>
          {title}
        </h3>

        {features ? (
          <ul className="text-[9px] sm:text-[10px] text-zinc-500 font-mono leading-relaxed space-y-1.5 sm:space-y-2 uppercase tracking-tight">
            {features.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-2 sm:gap-2.5">
                <span className="text-accent-cyan/30 font-bold">{">"}</span> {f}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono leading-relaxed uppercase tracking-tight">
            {description}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mt-10 relative z-10">
        {progress !== undefined ? (
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
            <div className="flex justify-between mb-2 sm:mb-2.5">
              <span>PHASE_EXECUTION</span>
              <span className="text-accent-cyan font-bold">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-zinc-800/30 rounded-none overflow-hidden border border-zinc-800/20">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
                className="h-full bg-accent-cyan/80 shadow-[0_0_10px_rgba(137,180,250,0.3)]" 
              />
            </div>
          </div>
        ) : isRedacted ? (
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-700 tracking-[0.3em] uppercase flex items-center gap-2 sm:gap-2.5">
            <Lock className="w-3 h-3" /> SECURITY_ENFORCED
          </div>
        ) : (
          <Link 
            href={href} 
            className="inline-flex items-center gap-2 sm:gap-2.5 font-mono text-[9px] sm:text-[10px] text-accent-cyan/80 tracking-[0.3em] hover:text-white transition-colors uppercase group/btn"
          >
            <span className="border-b border-accent-cyan/20 group-hover/btn:border-white pb-0.5 transition-colors text-[8px] sm:text-[10px]">EXECUTE_VIEW</span>
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
        staggerChildren: 0.12
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-20 sm:py-32" id="projects">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-12 sm:mb-16 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase">SYSTEM_REGISTRY_V2</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase">PROJECT_MATRIX</h2>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase">
          STATUS: SYNC_COMPLETE <span className="text-zinc-800 mx-2 sm:mx-3">//</span> ENTRIES: 03
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <motion.div variants={item}>
          <ProjectCard 
            id="01"
            title="FASGO_BACKOFFICE"
            badge={
              <span className="flex items-center gap-2 text-accent-cyan/80">
                <span className="w-1 h-1 bg-accent-cyan animate-pulse shadow-[0_0_8px_#89b4fa]" />
                LEAD_DEV
              </span>
            }
            features={[
              "NEXT.JS_16_ENGINE",
              "CI_CD_AUTOMATION",
              "SHADCN_SYSTEM_ARCH",
              "UI_OPTIMIZATION"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="02"
            title="POSTULY_CORE"
            progress={65}
            features={[
              "RECRUITMENT_SAAS",
              "FRONTEND_LEAD",
              "SCALABLE_ARCHITECTURE",
              "DOCKER_CONTAINERIZED"
            ]}
            badge={
              <span className="text-zinc-600 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5" /> BUILDING
              </span>
            }
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="03"
            title="ULTRA_CONTROLE"
            description="Enterprise resource management platform independently developed for appointment logistics."
            features={[
              "MULTI_LANGUAGE_UI",
              "NESTJS_BACKEND",
              "DASHBOARD_SUITE",
              "GITLAB_VCS_CYCLE"
            ]}
            badge={
              <span className="text-emerald-500/60 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> STABLE
              </span>
            }
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
