"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Shield } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
      className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#08090f]/90 backdrop-blur-xl font-mono text-[10px] text-zinc-400"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Left Side: Brand */}
        <div className="flex items-center gap-3">
          <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="text-zinc-100 font-bold tracking-tighter text-sm font-[family-name:var(--font-geist-sans)]">
            BILAL NASSER <span className="text-zinc-600 font-normal ml-1">// ARCHITECT</span>
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-10 tracking-[0.2em]">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="hover:text-accent-cyan transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-cyan group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right Side: Status & Clock */}
        <div className="flex items-center gap-6 tracking-[0.15em]">
          <div className="hidden sm:flex items-center gap-2 text-accent-cyan">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#89b4fa]"
            />
            <span className="font-bold">SYSTEM_ACTIVE</span>
          </div>
          
          <div className="h-4 w-px bg-zinc-800" />
          
          <div className="flex items-center gap-3">
            <Shield className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-300 font-bold tabular-nums">
              {time || "00:00:00"}
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
