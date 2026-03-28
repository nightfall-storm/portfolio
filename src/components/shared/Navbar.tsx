import Link from "next/link";
import { Terminal } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#08090f]/80 backdrop-blur-md font-mono text-xs text-zinc-400">
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-accent-cyan" />
          <span className="text-zinc-300 font-semibold tracking-wider">BILAL NASSER ARCHITECT</span>
          <span className="text-zinc-600">{"//"}</span>
          <span className="text-accent-cyan flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
            SYSTEM_ACTIVE
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8 tracking-[0.15em] font-medium">
          <Link href="#main" className="hover:text-accent-cyan transition-colors">MAIN_MENU</Link>
          <Link href="#projects" className="hover:text-accent-cyan transition-colors">PROJECT_MATRIX</Link>
          <Link href="#tech" className="hover:text-accent-cyan transition-colors">TECH_STACK</Link>
          <Link href="#comm" className="hover:text-accent-cyan transition-colors">COMM_LINK</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 tracking-widest">
          <span>OS 45.12 ENG</span>
          <div className="w-4 h-4 border border-zinc-600 flex items-center justify-center bg-zinc-800/30">
            <div className="w-1.5 h-1.5 bg-accent-cyan"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
