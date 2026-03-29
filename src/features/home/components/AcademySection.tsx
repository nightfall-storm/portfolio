"use client";

import { motion, Variants } from "motion/react";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

/**
 * Represents an individual educational milestone.
 */
interface EducationEntry {
  /** The degree or certification earned. */
  degree: string;
  /** The name of the educational institution. */
  institution: string;
  /** Physical location of the institution. */
  location: string;
  /** Duration of the study. */
  date: string;
  /** Current academic status (e.g., "GRADUATED", "ACTIVE_RESEARCH"). */
  status: string;
}

const EDUCATION: EducationEntry[] = [
  {
    degree: "Master in Software Engineering & Web Applications",
    institution: "ENSI - State-Recognized",
    location: "Tangier, Morocco",
    date: "Nov 2025 – Present",
    status: "In Progress",
  },
  {
    degree: "Bachelor's Degree in Software Engineering",
    institution: "FEDE",
    location: "Tangier, Morocco",
    date: "Sep 2024 – Oct 2025",
    status: "Graduated",
  },
  {
    degree: "Specialized Technician Diploma (DTS)",
    institution: "ISMONTIC",
    location: "Tangier, Morocco",
    date: "Sep 2022 – Jul 2024",
    status: "Graduated",
  },
];

/**
 * `AcademySection` component that showcases the developer's educational background.
 * 
 * Presents academic credentials in a clean, technical list format with subtle hover effects.
 * 
 * @architectural_decision
 * - Uses `framer-motion` with `whileInView` to trigger entrance animations as the user scrolls.
 * - Employs `itemVariants` for a consistent left-to-right slide and fade effect.
 * - Implements a responsive `grid` for each entry to balance information density across devices.
 * - Centralizes academic data in the `EDUCATION` constant for easy updates.
 * 
 * @returns {JSX.Element} The rendered Academy section.
 */
export function AcademySection() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="w-full max-w-[1400px] mx-auto px-6 py-24 border-t border-zinc-800/40 text-left"
      id="academy"
    >
      <div className="flex flex-col gap-12 text-left">
        {/* Header */}
        <div className="flex flex-col gap-2 text-left">
          <span className="font-mono text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2 text-left">
            <GraduationCap className="w-3 h-3" /> Education
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase text-left">
            Academic Background
          </h2>
        </div>

        {/* Education List */}
        <div className="space-y-8 text-left">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group border border-zinc-800/40 bg-zinc-900/10 p-6 sm:p-8 hover:border-accent-cyan/20 transition-all text-left"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start text-left">
                <div className="space-y-4 text-left min-w-0">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase text-left">
                      {edu.institution}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 uppercase leading-tight group-hover:text-accent-cyan transition-colors text-left break-words overflow-hidden">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] text-zinc-500 tracking-widest uppercase text-left">
                    <div className="flex items-center gap-2 text-left">
                      <MapPin className="w-3 h-3 text-accent-cyan/40" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Calendar className="w-3 h-3 text-accent-cyan/40" />
                      {edu.date}
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <BookOpen className="w-3 h-3 text-accent-cyan/40" />
                      Status: {edu.status}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-end gap-2 text-right shrink-0">
                  <div className="w-12 h-[0.5px] bg-zinc-800" />
                  <span className="font-mono text-[8px] text-zinc-700 tracking-[0.4em] uppercase">
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
