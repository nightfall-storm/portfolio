const technologies = [
  "PYTHON",
  "TYPESCRIPT",
  "RUST",
  "DATABASES [SQL/NOSQL]",
  "POSTGRESQL",
  "DOCKER",
  "NEXT.JS",
  "REACT",
  "GOLANG",
];

export function TechTicker() {
  return (
    <div
      className="w-full border-y border-zinc-800/50 bg-[#0a0b10] py-4 overflow-hidden relative"
      id="tech"
    >
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08090f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#08090f] to-transparent z-10 pointer-events-none"></div>

      <div className="flex whitespace-nowrap animate-in fade-in slide-in-from-right-10 duration-1000">
        <div className="flex gap-16 font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase w-max">
          {/* Repeat array for seamless feel or just map once if it's not a true auto-scroller.
              We'll map it twice to ensure it fills the screen on wide monitors. */}
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="hover:text-accent-cyan transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
          {technologies.map((tech, index) => (
            <span
              key={`dup-${index}`}
              className="hover:text-accent-cyan transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
