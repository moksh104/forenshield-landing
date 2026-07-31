import { Layers, Target, Zap, Cpu, CheckCircle2, Activity, Terminal } from "lucide-react";
import { FadeContent } from "@/components/animations/FadeContent";
import { CountUp } from "@/components/animations/CountUp";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

export function HighlightsRow() {
  return (
    <section className="relative px-4 sm:px-8 pb-8 pt-4">
      <div className="mx-auto max-w-[1400px]">
        {/* Asymmetric Bento Grid (4 Cards with Varying Structures & Interactive Spotlight Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* BENTO CARD 1 — FEATURED CARD (Spans 2 columns on lg) */}
          <div className="md:col-span-2 lg:col-span-2 flex h-full w-full">
            <FadeContent delay={0.1} amount={0.2} className="h-full w-full">
              <SpotlightCard spotlightRadius={240} className="h-full w-full">
                <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
                        <Zap className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-primary tracking-widest uppercase">
                        CORE CAPABILITY
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        01 · Hands-On Training
                      </span>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                        Interactive Investigations
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-xl">
                        Extract RAM artifacts, trace C2 traffic, and isolate malware in live sandboxes — using the same tools and evidence formats as real SOC workflows.
                      </p>
                    </div>
                  </div>

                  {/* Inline Progress Graphic Widget */}
                  <div className="mt-6 p-4 rounded-xl border border-border bg-muted/40">
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground mb-2">
                      <span>LAB MASTERY PROGRESS</span>
                      <span className="text-primary font-bold">
                        <CountUp from={0} to={87} duration={2} suffix="%" />
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                      <div className="h-full bg-primary rounded-full w-[87%] transition-all duration-1000" />
                    </div>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>Guided Simulation Labs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>Real Artifact Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>Automated Scoring</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>MITRE ATT&CK Mapping</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeContent>
          </div>

          {/* BENTO CARD 2 — 5 Core Modules */}
          <div className="md:col-span-1 lg:col-span-1 flex h-full w-full">
            <FadeContent delay={0.2} amount={0.2} className="h-full w-full">
              <SpotlightCard spotlightRadius={200} className="h-full w-full">
                <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
                        <Layers className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                        02
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-1 text-4xl font-display font-bold text-foreground">
                        <CountUp from={0} to={5} duration={2} delay={0.2} />
                        <span className="text-lg text-muted-foreground font-normal">Modules</span>
                      </div>
                      <h3 className="mt-2 text-xl font-display font-bold text-foreground tracking-tight">
                        Unified Command Post
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        Academy, Simulation Lab, Investigation Lab, Timeline, and Mission Control — all under one roof.
                      </p>
                    </div>
                  </div>

                  {/* Module Pills Array */}
                  <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border">
                    {["Mission Control", "Academy", "Lab", "Simulations", "Reports"].map((mod, i) => (
                      <span key={i} className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </FadeContent>
          </div>

          {/* BENTO CARD 3 — 20+ Planned Investigations */}
          <div className="md:col-span-1 lg:col-span-1 flex h-full w-full">
            <FadeContent delay={0.3} amount={0.2} className="h-full w-full">
              <SpotlightCard spotlightRadius={200} className="h-full w-full">
                <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
                        <Target className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                        03
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-1 text-4xl font-display font-bold text-foreground">
                        <CountUp from={0} to={20} duration={2} delay={0.2} suffix="+" />
                      </div>
                      <h3 className="mt-2 text-xl font-display font-bold text-foreground tracking-tight">
                        Investigation Scenarios
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        Insider leaks, phishing kits, process injection, and UPI fraud — each with real evidence files.
                      </p>
                    </div>
                  </div>

                  {/* Scenario Category Badges */}
                  <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border">
                    {["Phishing", "Insider Threats", "Injection", "Forensics"].map((tag, i) => (
                      <span key={i} className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </FadeContent>
          </div>

          {/* BENTO CARD 4 — High-Performance Architecture (Spans full width) */}
          <div className="md:col-span-2 lg:col-span-4 flex h-full w-full">
            <FadeContent delay={0.4} amount={0.2} className="h-full w-full">
              <SpotlightCard spotlightRadius={240} className="h-full w-full">
                <div className="group relative flex h-full w-full flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary shrink-0">
                      <Cpu className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        04 · System Design
                      </span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                        Built on PostgreSQL, Flutter, and Unity
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-xl">
                        PostgreSQL telemetry backend, Flutter cross-platform client, Unity-powered 3D simulations, and a REST API connecting all five modules.
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 shrink-0 sm:max-w-xs">
                    {["Flutter", "Web API", "PostgreSQL", "Unity", "Cloud"].map((tech, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-mono font-medium text-foreground">
                        <Terminal className="h-3 w-3 text-muted-foreground" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </FadeContent>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HighlightsRow;