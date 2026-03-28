"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  date: string;
  status: string;
}

const EDUCATION: EducationEntry[] = [
  {
    degree: "MASTER_IN_SOFTWARE_ENGINEERING_&_WEB_APPLICATIONS",
    institution: "ENSI - STATE-RECOGNIZED",
    location: "TANGIER, MOROCCO",
    date: "NOV_2025_PRESENT",
    status: "ACTIVE_RESEARCH"
  },
  {
    degree: "BACHELOR'S_DEGREE_IN_SOFTWARE_ENGINEERING",
    institution: "FEDE",
    location: "TANGIER, MOROCCO",
    date: "SEP_2024_OCT_2025",
    status: "GRADUATED"
  },
  {
    degree: "DTS_SPECIALIZED_TECHNICIAN_DIPLOMA",
    institution: "ISMONTIC",
    location: "TANGIER, MOROCCO",
    date: "SEP_2022_JUL_2024",
    status: "GRADUATED"
  }
];

export function AcademySection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 border-t border-zinc-800/40" id="academy">
      <div className="flex flex-col gap-12 text-left">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2">
            <GraduationCap className="w-3 h-3" /> ACADEMIC_CREDENTIALS_V4
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase">THE_ACADEMY</h2>
        </div>

        {/* Education List */}
        <div className="space-y-8">
          {EDUCATION.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
              viewport={{ once: true }}
              className="group border border-zinc-800/40 bg-zinc-900/10 p-8 hover:border-accent-cyan/20 transition-all text-left"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase">{edu.institution}</span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 uppercase leading-tight group-hover:text-accent-cyan transition-colors text-left">
                      {edu.degree}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-accent-cyan/40" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-accent-cyan/40" />
                      {edu.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-accent-cyan/40" />
                      STATUS: {edu.status}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-end gap-2">
                  <div className="w-12 h-[0.5px] bg-zinc-800" />
                  <span className="font-mono text-[8px] text-zinc-700 tracking-[0.4em] uppercase">LEVEL_SYNCED</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
