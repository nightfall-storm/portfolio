"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Shield } from "lucide-react";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "MAIN_MENU", href: "#main" },
  { label: "PROJECT_MATRIX", href: "#projects" },
  { label: "TECH_STACK", href: "#tech" },
  { label: "COMM_LINK", href: "#comm" },
];

export function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      className="fixed top-0 w-full z-50 border-b-[0.5px] border-zinc-800/40 bg-[#08090f]/80 backdrop-blur-xl font-mono text-[10px] text-zinc-400"
    >
      <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
        {/* Left Side: Brand */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-[0.5px] border-accent-cyan/20 flex items-center justify-center bg-accent-cyan/[0.02]">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan/80" />
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-100 font-black tracking-tighter text-xs uppercase">
              BILAL NNASSER
            </span>
            <span className="text-zinc-600 font-mono text-[8px] tracking-[0.3em] uppercase leading-none">
              SOFTWARE_ENGINEER
            </span>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-12 tracking-[0.3em] font-mono uppercase">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="hover:text-accent-cyan transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-accent-cyan/60 group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* Right Side: Status & Clock */}
        <div className="flex items-center gap-8 tracking-[0.2em] font-mono">
          <div className="hidden sm:flex items-center gap-2.5 text-accent-cyan/70">
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1 h-1 bg-accent-cyan shadow-[0_0_8px_rgba(137,180,250,0.5)]"
            />
            <span className="font-bold text-[9px]">SYSTEM_ACTIVE</span>
          </div>
          
          <div className="h-5 w-[0.5px] bg-zinc-800/60" />
          
          <div className="flex items-center gap-3">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300 font-bold tabular-nums text-[11px] tracking-widest">
              {time || "00:00:00"}
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
