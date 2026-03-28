"use client";

import React, { useRef, useState, useEffect } from "react";
import { Briefcase, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ExperienceCardProps {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  highlights: string[];
  badge?: React.ReactNode;
  isLead?: boolean;
}

function ExperienceCard({ 
  id, 
  title, 
  subtitle,
  date,
  highlights, 
  badge,
  isLead
}: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

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
      className="group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-8 hover:border-accent-cyan/40 transition-colors flex flex-col justify-between min-h-[320px] overflow-hidden rounded-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-24 opacity-[0.01] pointer-events-none" />

      <div className="relative z-10 text-left">
        <div className="flex justify-between items-center mb-8 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3 h-3 text-accent-cyan/40" />
            <span>EXP_{id}</span>
            <span className="text-zinc-800">{`//`}</span>
            <span className="flex items-center gap-1.5 italic">
              {date}
            </span>
          </div>
          {badge}
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase leading-none">
            {title}
          </h3>
          <div className="text-accent-cyan/60 font-mono text-[10px] tracking-[0.2em] mt-2 uppercase flex items-center gap-2 text-left">
            <span className="w-1 h-[0.5px] bg-accent-cyan/40" />
            {subtitle}
          </div>
        </div>

        <ul className="text-[10px] sm:text-[11px] text-zinc-500 font-mono leading-relaxed space-y-3 uppercase tracking-tight text-left">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-left">
              <span className="text-accent-cyan/30 font-bold shrink-0">{">"}</span> 
              <span className="text-balance">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {isLead && (
        <div className="mt-8 pt-6 border-t border-zinc-800/40 relative z-10">
          <div className="flex items-center gap-3">
            <div className="px-2 py-0.5 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[8px] tracking-[0.2em] uppercase">
              LEADERSHIP_ROLE
            </div>
            <div className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/30 text-zinc-600 font-mono text-[8px] tracking-[0.2em] uppercase">
              MENTORING_ACTIVE
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function ExperienceSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 sm:py-32" id="experience">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-16 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2">
            <Terminal className="w-3 h-3" /> PROFESSIONAL_LOG_V2.5
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase">EXPERIENCE_PRO</h2>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase">
          STABLE_RELEASE <span className="text-zinc-800 mx-3">{`//`}</span> STATUS: ACTIVE
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <motion.div variants={item}>
          <ExperienceCard 
            id="01"
            title="LOGICIEL_LAB"
            subtitle="LEAD_FRONTEND_ENGINEER"
            date="FEB_2025_PRESENT"
            isLead
            badge={
              <span className="flex items-center gap-2 text-accent-cyan/80">
                <span className="w-1 h-1 bg-accent-cyan animate-pulse shadow-[0_0_8px_#89b4fa]" />
                CURRENT
              </span>
            }
            highlights={[
              "DRIVE_FRONTEND_DEV_FASGO_POSTULY",
              "TECHNICAL_OPS_CI_CD_CLOUDFLARE",
              "MENTOR_DEVELOPERS_LIFECYCLE_MGMT",
              "ARCHITECT_UI_SYSTEMS_HIGH_STANDARDS"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ExperienceCard 
            id="02"
            title="MEDIACARIS"
            subtitle="FRONTEND_DEV_INTERN"
            date="OCT_2024_FEB_2025"
            highlights={[
              "INDEPENDENT_DEV_ULTRA_CONTROLE",
              "MULTI_LANGUAGE_SUPPORT_ENGINE",
              "NESTJS_REST_API_INTEGRATION",
              "OWNED_FRONTEND_VCS_CYCLE"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ExperienceCard 
            id="03"
            title="ECI_SYSTEMS"
            subtitle="WEB_DEV_INTERN"
            date="MAY_2024_JUN_2024"
            highlights={[
              "ASP.NET_CORE_ENTITY_FW_CRUD",
              "AUTH_&_SESSION_ARCHITECTURE",
              "AUTO_EMAIL_NOTIF_ENGINE",
              "TASK_MGMT_SYSTEM_DEV"
            ]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
