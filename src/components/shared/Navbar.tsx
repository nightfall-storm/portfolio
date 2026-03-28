"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "MAIN_MENU", href: "#main" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ACADEMY", href: "#academy" },
  { label: "COMM_LINK", href: "#comm" },
];

export function Navbar() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#08090f]/80 backdrop-blur-xl font-mono text-[10px] text-zinc-400"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Left Side: Brand */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
            <Terminal className="w-4 h-4 text-accent-cyan/80 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-zinc-100 font-bold tracking-tighter text-[10px] sm:text-xs uppercase truncate">
                BILAL NNASSER
              </span>
              <span className="text-zinc-600 font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase leading-none hidden xs:block truncate">
                SOFTWARE_ENGINEER
              </span>
            </div>
          </div>

          {/* Center Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 tracking-[0.2em] font-mono uppercase flex-shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-accent-cyan transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-cyan/60 group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>

          {/* Right Side: Status, Clock & Toggle */}
          <div className="flex items-center gap-3 sm:gap-6 tracking-[0.1em] sm:tracking-[0.2em] font-mono flex-shrink-0">
            <div className="hidden xl:flex items-center gap-2.5 text-accent-cyan/70">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(137,180,250,0.5)]"
              />
              <span className="font-bold text-[9px]">SYSTEM_ACTIVE</span>
            </div>

            <div className="hidden sm:block h-4 w-px bg-zinc-800/60" />

            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-zinc-600 flex-shrink-0" />
              <span
                suppressHydrationWarning
                className="text-zinc-300 font-bold tabular-nums text-[10px] sm:text-[11px] tracking-normal sm:tracking-widest"
              >
                {time || "00:00:00"}
              </span>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 sm:p-2 hover:text-accent-cyan transition-colors flex-shrink-0"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#08090f]/95 backdrop-blur-2xl pt-24 px-6 sm:px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
              <div className="font-mono text-[9px] text-zinc-600 tracking-[0.5em] mb-4 uppercase border-b border-zinc-800 pb-4">
                SYSTEM_NAVIGATOR_V3
              </div>
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-100 hover:text-accent-cyan transition-colors uppercase flex items-center justify-between group"
                  >
                    {link.label}
                    <Terminal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-zinc-800 pt-8">
                <div className="flex items-center gap-3 text-accent-cyan/60 font-mono text-[10px] tracking-[0.3em]">
                  <div className="w-1 h-1 bg-accent-cyan animate-pulse rounded-full" />
                  UPLINK_STABLE
                </div>
                <div className="font-mono text-[9px] text-zinc-500 tracking-[0.2em]">
                  LOC: TANGIER_MAR // TZ: GMT+1
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
