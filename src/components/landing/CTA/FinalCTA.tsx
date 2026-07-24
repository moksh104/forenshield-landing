import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
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
                  animationDelay: `${(i % 5) * 0.8}s`,
                }}
              />
            ))}
            <div className="relative grid md:grid-cols-2 items-center gap-8">
              <div>
                <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                  Ready to master <br />
                  <span className="text-white">cyber </span>
                  <span className="text-primary text-glow-cyan">defense?</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Join thousands of learners building real skills for a safer digital world.
                </p>
              </div>
              <div className="flex flex-col md:items-end md:justify-center gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-muted-foreground font-medium mb-3">
                  <div>Platform: <span className="text-white">Android APK</span></div>
                  <div>Version: <span className="text-white">v1.0.0</span></div>
                  <div>Size: <span className="text-white">48 MB</span></div>
                  <div>Requires: <span className="text-white">Android 8.0+</span></div>
                  <div>Price: <span className="text-white">Free</span></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <MagneticButton
                    href="#download"
                    className="!px-8 !py-4 !text-base shadow-[0_0_60px_oklch(0.55_0.22_260/0.6)]"
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
                    className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[15px] font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all duration-300"
                  >
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                    View on GitHub
                  </a>
                </div>
                <div className="flex items-center gap-5 text-xs text-muted-foreground font-medium justify-center md:justify-end w-full">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 opacity-70" /> No account required</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
