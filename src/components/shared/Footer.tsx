import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/40 mt-32 py-12 font-mono text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase">
      <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-accent-cyan/40" />
          <span>SOFTWARE_ENGINEER // BILAL_NNASSER [v2.5.0]</span>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          <Link href="https://github.com/nightfall-storm" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
            GITHUB
          </Link>
          <Link href="https://linkedin.com/in/bilal-nnasser" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
            LINKEDIN
          </Link>
          <Link href="https://gitlab.com/nightfall-storm" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
            GITLAB
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground/40 italic hidden sm:block">STABLE_RELEASE_SYNCED</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-zinc-800" />
            <div className="w-1 h-1 bg-zinc-800" />
            <div className="w-1 h-1 bg-accent-cyan/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
