import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
import { Rocket, ArrowRight, Github, User } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="download" className="relative px-4 sm:px-8 py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:border-primary/25 dark:bg-[radial-gradient(ellipse_at_top_right,oklch(0.20_0.06_260),oklch(0.10_0.03_260))] p-8 sm:p-12 transition-colors duration-300">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-15 dark:opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)] pointer-events-none" />
            
            {/* Top ambient glow (active only in dark mode) */}
            <div
              className="hidden dark:block absolute -inset-x-20 -top-32 h-64 opacity-40 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.55 0.22 260 / 0.35), transparent 70%)",
              }}
            />

            {/* Floating particles (hidden in light theme, active only in dark theme) */}
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="hidden dark:block absolute h-1 w-1 rounded-full bg-primary animate-drift-twinkle pointer-events-none"
                style={{
                  top: `${(i * 41) % 100}%`,
                  left: `${(i * 29) % 100}%`,
                  boxShadow: "0 0 8px currentColor",
                  animationDuration: `${4 + (i % 3)}s`,
                  animationDelay: `${(i % 5) * 0.8}s`,
                }}
              />
            ))}

            <div className="relative grid md:grid-cols-2 items-center gap-8 z-10">
              <div>
                <h2 className="font-display font-bold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                  Ready to master <br />
                  <span className="text-slate-900 dark:text-white">cyber </span>
                  <span className="text-primary">defense?</span>
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md text-base leading-relaxed">
                  Join thousands of learners building real skills for a safer digital world.
                </p>
              </div>

              <div className="flex flex-col md:items-end md:justify-center gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
                  <div>Platform: <span className="text-slate-900 dark:text-white font-semibold">Android APK</span></div>
                  <div>Version: <span className="text-slate-900 dark:text-white font-semibold">v1.0.0</span></div>
                  <div>Size: <span className="text-slate-900 dark:text-white font-semibold">48 MB</span></div>
                  <div>Requires: <span className="text-slate-900 dark:text-white font-semibold">Android 8.0+</span></div>
                  <div>Price: <span className="text-slate-900 dark:text-white font-semibold">Free</span></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <MagneticButton
                    href="#download"
                    className="!px-8 !py-4 !text-base shadow-sm dark:shadow-[0_0_60px_oklch(0.55_0.22_260/0.6)] w-full sm:w-auto"
                    style={{ animation: "button-glow-shadow 3s ease-in-out infinite" }}
                  >
                    <Rocket className="h-5 w-5" />
                    Start Learning Free
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                  <a
                    href="https://github.com/moksh104/Website-ForenShield-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[15px] font-semibold text-slate-800 bg-white hover:bg-slate-100/80 border border-slate-200/90 shadow-sm dark:text-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
                  >
                    <Github className="h-5 w-5 text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors" />
                    View on GitHub
                  </a>
                </div>

                <div className="flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400 font-medium justify-center md:justify-end w-full">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 opacity-70 text-slate-500 dark:text-slate-400" /> No account required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
