"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Briefcase, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useTouch } from "../common/hooks/use-touch";

/**
 * Properties for the `ExperienceCard` component.
 */
interface ExperienceCardProps {
  /** Unique identifier for the experience entry (e.g., "01"). */
  id: string;
  /** The company or organization name. */
  title: string;
  /** The job title or role held. */
  subtitle: string;
  /** The duration of the experience. */
  date: string;
  /** Key achievements or responsibilities. */
  highlights: string[];
  /** Optional status badge (e.g., "CURRENT"). */
  badge?: React.ReactNode;
  /** Flag to indicate a technical leadership role. */
  isLead?: boolean;
}

/**
 * `ExperienceCard` component for displaying an individual professional role.
 * 
 * Features a 3D tilt effect on hover and a technical "Command Center" visual style.
 * 
 * @architectural_decision
 * - Uses `framer-motion` for the 3D tilt effect (`rotateX`, `rotateY`) controlled by mouse movement.
 * - Employs `useSpring` to smooth out the tilt transitions for a premium feel.
 * - Implements a radial gradient "spotlight" effect that follows the cursor using CSS variables.
 * - Integrates `useTouch` hook to disable tilt effects on touch devices, ensuring better UX.
 * 
 * @param {ExperienceCardProps} props - The component props.
 * @returns {JSX.Element} The rendered experience card.
 */
function ExperienceCard({
  id,
  title,
  subtitle,
  date,
  highlights,
  badge,
  isLead,
}: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useTouch();

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
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
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
      className="experience-card group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-8 hover:border-accent-cyan/40 transition-colors flex flex-col justify-between min-h-[320px] overflow-hidden rounded-none opacity-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-24 opacity-[0.01] pointer-events-none" />

      <div className="relative z-10 text-left">
        <div className="flex justify-between items-center mb-8 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2 text-left">
            <Briefcase className="w-3 h-3 text-accent-cyan/40" />
            <span>EXP_{id}</span>
            <span className="text-zinc-800">{`//`}</span>
            <span className="flex items-center gap-1.5 italic text-left">
              {date}
            </span>
          </div>
          {badge}
        </div>

        <div className="mb-6 text-left">
          <h3 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase leading-none text-left">
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
              <span className="text-accent-cyan/30 font-bold shrink-0">
                {">"}
              </span>
              <span className="text-balance text-left">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {isLead && (
        <div className="mt-8 pt-6 border-t border-zinc-800/40 relative z-10 text-left">
          <div className="flex items-center gap-3 text-left">
            <div className="px-2 py-0.5 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan font-mono text-[8px] tracking-[0.2em] uppercase">
              TECHNICAL_LEAD
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

/**
 * `ExperienceSection` component that displays the professional history.
 * 
 * Orchestrates the entry animation for multiple `ExperienceCard` components.
 * 
 * @architectural_decision
 * - Uses `GSAP` with `ScrollTrigger` for high-performance scroll-based entrance animations.
 * - Employs a `stagger` effect in GSAP to reveal cards sequentially as they enter the viewport.
 * - Utilizes `useLayoutEffect` to ensure GSAP animations are initialized before the browser paints.
 * 
 * @returns {JSX.Element} The rendered Experience section.
 */
export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1400px] mx-auto px-6 py-24 sm:py-32"
      id="experience"
    >
      <div className="flex flex-col gap-12 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-4 gap-4 text-left">
          <div className="flex flex-col gap-2 text-left">
            <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2 text-left">
              <Terminal className="w-3 h-3" /> PROFESSIONAL_LOG_V2.5
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase text-left">
              EXPERIENCE_PRO
            </h2>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase text-left">
            STABLE_RELEASE <span className="text-zinc-800 mx-3">{`//`}</span>{" "}
            STATUS: ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <ExperienceCard
            id="01"
            title="LOGICIEL_LAB"
            subtitle="SOFTWARE_ENGINEER"
            date="FEB_2025_PRESENT"
            isLead
            badge={
              <span className="flex items-center gap-2 text-accent-cyan/80 text-left uppercase">
                <span className="w-1 h-1 bg-accent-cyan animate-pulse shadow-[0_0_8px_#89b4fa] rounded-full" />
                CURRENT
              </span>
            }
            highlights={[
              "DRIVE_FRONTEND_DEV_FASGO_POSTULY",
              "TECHNICAL_OPS_CI_CD_CLOUDFLARE",
              "MENTOR_DEVELOPERS_LIFECYCLE_MGMT",
              "ARCHITECT_UI_SYSTEMS_HIGH_STANDARDS",
            ]}
          />

          <ExperienceCard
            id="02"
            title="MEDIACARIS"
            subtitle="SOFTWARE_ENGINEER_INTERN"
            date="OCT_2024_FEB_2025"
            highlights={[
              "DEV_ULTRACONTROLE_MA_FR_SYSTEM",
              "AUTOMOBILE_VISIT_TECHNICAL_DASH",
              "APPOINTMENT_MGMT_ORCHESTRATOR",
              "MULTI_LANGUAGE_UI_ARCHITECTURE",
            ]}
          />

          <ExperienceCard
            id="03"
            title="ECI_SYSTEMS"
            subtitle="WEB_DEV_INTERN"
            date="MAY_2024_JUN_2024"
            highlights={[
              "ASP.NET_CORE_ENTITY_FW_CRUD",
              "AUTH_&_SESSION_ARCHITECTURE",
              "AUTO_EMAIL_NOTIF_ENGINE",
              "TASK_MGMT_SYSTEM_DEV",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
