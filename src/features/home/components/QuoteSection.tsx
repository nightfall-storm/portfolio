/**
 * @component QuoteSection
 * @description A decorative section displaying a core architectural philosophy.
 * Features high-impact typography and a minimalist SVG waveform to align with
 * the project's `COMMAND_CENTER` aesthetic.
 * 
 * @example
 * <QuoteSection />
 */
export function QuoteSection() {
  return (
    <section className="w-full max-w-[1000px] mx-auto px-6 py-32 flex flex-col items-center justify-center text-center relative">
      {/* Decorative Quote Mark */}
      <div className="absolute top-16 left-0 text-[12rem] font-serif text-zinc-800/20 leading-none pointer-events-none">
        &ldquo;
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-300 leading-tight uppercase relative z-10 max-w-4xl">
        &ldquo;Software is not a product. It is a{" "}
        <span className="text-accent-cyan">living architecture</span> that must
        be maintained with rigorous precision.&rdquo;
      </h2>

      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs tracking-[0.2em] uppercase">
          <div className="w-12 h-px bg-zinc-800"></div>
          SYSTEM_ARCHITECT
          <div className="w-12 h-px bg-zinc-800"></div>
        </div>

        {/* Simple sine wave SVG */}
        <svg
          width="60"
          height="20"
          viewBox="0 0 60 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-50"
        >
          <path
            d="M0 10 Q 15 20, 30 10 T 60 10"
            stroke="#89b4fa"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
