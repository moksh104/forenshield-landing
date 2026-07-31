import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { FadeContent } from "@/components/animations/FadeContent";

export function FeaturesComparison() {
  const comparisons = [
    { old: "Theory Only", new: "Interactive Investigations", detail: "Analyze real packet captures and disk images instead of reading about them" },
    { old: "Watching Videos", new: "Hands-on Simulations", detail: "4 live attack simulations with branching decision paths" },
    { old: "Separate Tools", new: "One Unified Platform", detail: "Academy, Lab, Simulations, Timeline, and Reports — one login" },
    { old: "Static Labs", new: "Real Case Investigations", detail: "20+ scenarios with actual forensic evidence files" },
    { old: "Certificates", new: "Practical Investigation Skills", detail: "File real investigation reports, not multiple-choice quizzes" },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-32 overflow-hidden">
      {/* Hand-crafted asymmetric decorative element */}
      <div
        aria-hidden
        className="absolute -right-10 top-32 w-32 h-20 border border-border rounded-lg opacity-[0.15] pointer-events-none"
        style={{ transform: "rotate(6deg)" }}
      />
      <div
        aria-hidden
        className="absolute -right-6 top-44 w-24 h-14 border border-primary/20 rounded-lg opacity-[0.10] pointer-events-none"
        style={{ transform: "rotate(-3deg)" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Asymmetric 2-column layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* LEFT: Header + "Old way" list (5 cols) */}
          <div className="md:col-span-5">
            <FadeContent delay={0.1} amount={0.2}>
              <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 block">
                Why ForenShield
              </span>
              <h2 className="font-display font-bold tracking-tight text-foreground text-3xl sm:text-4xl leading-[1.1]">
                Why Learn Cybersecurity Differently?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Traditional cybersecurity education relies on passive content. ForenShield replaces that with active investigation workflows.
              </p>
            </FadeContent>

            <FadeContent delay={0.2} amount={0.2}>
              <div className="mt-10 space-y-4">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase font-semibold mb-3">
                  Traditional Learning
                </div>
                {comparisons.map((row, i) => (
                  <div key={i} className="flex items-center gap-3 text-muted-foreground">
                    <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    <span className="text-base">{row.old}</span>
                  </div>
                ))}
              </div>
            </FadeContent>
          </div>

          {/* RIGHT: ForenShield advantages (7 cols) */}
          <div className="md:col-span-7">
            <FadeContent delay={0.3} amount={0.2}>
              <div className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold mb-6">
                ForenShield
              </div>
              <div className="space-y-3">
                {comparisons.map((row, i) => (
                  <FadeContent key={i} delay={0.3 + i * 0.08} amount={0.2}>
                    <div className="group p-5 rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="text-foreground font-bold text-lg tracking-tight">
                            {row.new}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {row.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeContent>
                ))}
              </div>
            </FadeContent>
          </div>

        </div>
      </div>
    </section>
  );
}
