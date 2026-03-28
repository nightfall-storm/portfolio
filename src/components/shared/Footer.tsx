import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/50 mt-32 py-8 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div>
          SYSTEM_ARCHITECT | BILAL NASSER [v1.0.0]
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-8">
          <Link href="https://github.com/bilalnnasser" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
            GITHUB
          </Link>
          <Link href="https://linkedin.com/in/bilalnnasser" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
            LINKEDIN
          </Link>
          <Link href="#" className="hover:text-accent-cyan transition-colors">
            SOURCE_CODE
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span>© 2024 TIME_STAMPED</span>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
        </div>
      </div>
    </footer>
  );
}
