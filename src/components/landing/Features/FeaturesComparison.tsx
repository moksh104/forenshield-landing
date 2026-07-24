import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FeaturesComparison() {
  const prefersReducedMotion = useReducedMotion();
  const rows = [
    { old: "Theory Only", new: "Interactive Investigations" },
    { old: "Watching Videos", new: "Hands-on Simulations" },
    { old: "Separate Tools", new: "One Unified Platform" },
    { old: "Static Labs", new: "Real Case Investigations" },
    { old: "Certificates", new: "Practical Investigation Skills" },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-32 overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.55_0.22_260/0.05),transparent_70%)]" />
        <div className="absolute inset-0 grid-bg opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        {/* Subtle drifting particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/40 animate-float"
            style={{
              top: `${(i * 61) % 100}%`,
              left: `${(i * 43) % 100}%`,
              animationDuration: `${10 + (i % 8)}s`,
              animationDelay: `${(i % 5) * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-6 border border-white/5"
          >
            <span className="tracking-[0.24em] uppercase text-primary font-medium">Why ForenShield</span>
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
            className="font-display font-bold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight"
          >
            Why Learn Cybersecurity <span className="text-primary text-glow-cyan">Differently?</span>
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            className="mt-6 text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
          >
            One platform, four ways to master cyber defense.
          </motion.p>
        </div>

        {/* Comparison List */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Desktop/Tablet Headers */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-12 px-6">
            <div className="text-right font-mono text-xs tracking-widest text-muted-foreground/60 uppercase">Traditional Learning</div>
            <div className="w-px" /> {/* Spacer for vertical line */}
            <div className="text-left font-mono text-xs tracking-widest text-primary uppercase">ForenShield</div>
          </div>

          <div className="relative">
            {/* The continuous vertical line (Desktop/Tablet only) */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-primary/15 hidden md:block -translate-x-1/2 overflow-hidden">
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent w-full"
                  animate={{
                    y: ["-100%", "200%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{ height: "40%" }}
                />
              )}
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-10 sm:gap-12">
              {rows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : i * 0.1 }}
                  className="group relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center"
                >
                  {/* Hover background for the whole row (subtle wide gradient) */}
                  <div className="absolute inset-0 -mx-6 md:-mx-12 rounded-xl bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_260/0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Left Column (Traditional) */}
                  <div className="md:text-right px-6 md:px-0 py-2 md:py-4 transition-opacity duration-300 group-hover:opacity-60 z-10 relative">
                    <div className="md:hidden font-mono text-[10px] tracking-wider text-muted-foreground/50 uppercase mb-2">Traditional Learning</div>
                    <div className="text-muted-foreground font-medium text-xl md:text-2xl decoration-muted-foreground/30">{row.old}</div>
                  </div>

                  {/* Center Divider / Arrow */}
                  <div className="relative hidden md:flex w-0 justify-center z-10 h-full">
                    {/* Active highlight line segment on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-0 bg-primary opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 motion-reduce:transition-none" />
                    
                    {/* The Arrow (slides right on hover) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors duration-300">
                      <div className="bg-background px-4 py-2 group-hover:translate-x-2 transition-transform duration-300 ease-out motion-reduce:translate-x-0">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Arrow/Divider */}
                  <div className="md:hidden px-6 py-2">
                     <ArrowRight className="h-5 w-5 text-primary/40 rotate-90" />
                  </div>

                  {/* Right Column (ForenShield) */}
                  <div className="md:text-left px-6 md:px-0 py-2 md:py-4 z-10 relative">
                    <div className="md:hidden font-mono text-[10px] tracking-wider text-primary/70 uppercase mb-2 mt-2">ForenShield</div>
                    <div className="text-white font-bold text-xl md:text-2xl tracking-tight transition-all duration-300 group-hover:text-glow-cyan motion-reduce:group-hover:text-white">
                      {row.new}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
