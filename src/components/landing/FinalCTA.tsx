import { Reveal } from "./Reveal";
import { MagneticButton } from "../common/MagneticButton";
import { Rocket, ArrowRight, Github, User } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="download" className="relative px-4 sm:px-8 py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-[radial-gradient(ellipse_at_top_right,oklch(0.20_0.06_260),oklch(0.10_0.03_260))] p-8 sm:p-12">
            <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
            <div
              className="absolute -inset-x-20 -top-32 h-64 opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.55 0.22 260 / 0.6), transparent 70%)",
              }}
            />
            {/* particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary animate-drift-twinkle"
                style={{
                  top: `${(i * 41) % 100}%`,
                  left: `${(i * 29) % 100}%`,
                  boxShadow: "0 0 10px currentColor",
                  animationDuration: `${4 + (i % 3)}s`,
                  animationDelay: `${(i % 5) * 0.5}s`,
                }}
              />
            ))}

            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="font-display font-bold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
                Ready to start your first <span className="text-primary">Investigation?</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Join thousands of students, analysts, and law enforcement professionals who are already mastering cybersecurity through real-world simulations.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:shadow-[0_0_40px_-10px_oklch(0.55_0.22_260)] flex items-center justify-center gap-3">
                  <Rocket className="h-5 w-5" />
                  Launch ForenShield
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </MagneticButton>
                
                <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 flex items-center justify-center gap-3">
                  <Github className="h-5 w-5 opacity-70" />
                  View Documentation
                </MagneticButton>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground font-mono">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  No credit card required
                </span>
                <span className="hidden sm:inline-flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Instant access
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
