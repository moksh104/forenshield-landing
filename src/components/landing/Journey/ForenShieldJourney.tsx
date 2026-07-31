import {
  BookOpen,
  FlaskConical,
  Search,
  FileCheck2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { ScrollStack, ScrollStackItem } from "@/components/animations/ScrollStack";
import { SplitText } from "@/components/animations/SplitText";
import { FadeContent } from "@/components/animations/FadeContent";

export function ForenShieldJourney() {
  const cards = [
    {
      step: "01",
      title: "Learn",
      icon: BookOpen,
      accent: "text-blue-500 border-blue-500/30 bg-blue-500/10",
      content: (
        <div className="flex flex-col gap-4 w-full">
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest font-bold mb-1 uppercase">
            ACADEMY
          </div>
          <div className="space-y-3">
            {[
              { label: "Networking", percent: 100 },
              { label: "Linux", percent: 75 },
              { label: "Cryptography", percent: 100 },
              { label: "Operating Systems", percent: 85 },
            ].map((skill, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-foreground">
                  <span>{skill.label}</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs font-mono">
            <span className="text-foreground">Rank: <span className="font-bold text-primary">Apprentice</span></span>
            <span className="text-foreground">XP: <span className="font-bold text-achievement">2450</span></span>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "Practice",
      icon: FlaskConical,
      accent: "text-orange-500 border-orange-500/30 bg-orange-500/10",
      content: (
        <div className="flex flex-col gap-4 w-full">
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest font-bold mb-1 uppercase">
            THREAT ANALYSIS
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 p-2 rounded bg-danger/10 text-danger border border-danger/20">
              <span className="font-bold">[HIGH]</span> Suspicious traffic
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <span className="font-bold">[MEDIUM]</span> DNS anomaly
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-muted text-muted-foreground border border-border">
              <span className="font-bold text-foreground">[LOW]</span> Login failure
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground">Packets analysed: <span className="font-bold text-foreground">1248</span></span>
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Investigate",
      icon: Search,
      accent: "text-purple-500 border-purple-500/30 bg-purple-500/10",
      content: (
        <div className="flex flex-col gap-4 w-full overflow-hidden">
          <div className="grid grid-cols-3 text-[10px] font-mono text-muted-foreground tracking-widest font-bold mb-1 uppercase">
            <span>Filename</span>
            <span>Hash</span>
            <span className="text-right">Status</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            {[
              { file: "report.pdf", hash: "a7b3...", status: "Verified", statusColor: "text-success" },
              { file: "capture.pcap", hash: "c2d1...", status: "Analysed", statusColor: "text-primary" },
              { file: "device.img", hash: "e9f4...", status: "Stored", statusColor: "text-muted-foreground" },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 items-center py-1.5 border-b border-border/50 last:border-0">
                <span className="text-foreground truncate pr-2">{row.file}</span>
                <span className="text-muted-foreground">{row.hash}</span>
                <span className={`text-right font-semibold ${row.statusColor}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      step: "04",
      title: "Generate Reports",
      icon: FileCheck2,
      accent: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
      content: (
        <div className="flex flex-col gap-4 w-full">
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest font-bold mb-1 uppercase">
            CASE REPORT
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-card border border-border">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Risk score</span>
              <span className="text-xl font-display font-bold text-danger">82</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-card border border-border">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Evidence count</span>
              <span className="text-xl font-display font-bold text-primary">14</span>
            </div>
            <div className="col-span-2 flex justify-between items-center p-3 rounded-xl bg-card border border-border">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Timeline events</span>
              <span className="text-base font-display font-bold text-foreground">42</span>
            </div>
          </div>
          <button className="mt-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
            Export PDF
          </button>
        </div>
      ),
    },
    {
      step: "05",
      title: "Earn Rewards",
      icon: Trophy,
      accent: "text-achievement border-achievement/30 bg-achievement/10",
      content: (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground tracking-widest font-bold mb-1 uppercase">
            <span>LEVEL 12</span>
            <span className="text-achievement">Rank: Investigator</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-achievement rounded-full transition-all duration-1000 ease-out"
                style={{ width: "85%" }}
              />
            </div>
            <div className="text-right text-[10px] font-mono text-muted-foreground">XP: 2450</div>
          </div>

          <div className="mt-2 space-y-2">
            {["Packet Analysis", "Incident Response", "Digital Evidence"].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                <div className="h-4 w-4 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                {cert}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="journey" className="relative px-4 sm:px-8 py-24 sm:py-32 scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <FadeContent delay={0.1} amount={0.2}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-card glass px-5 py-2 text-xs sm:text-[13px] font-mono mb-6 border border-border shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="tracking-[0.28em] uppercase text-primary font-bold">
                Ecosystem Progression
              </span>
            </div>
          </FadeContent>

          <SplitText
            text="The ForenShield Journey"
            tag="h2"
            splitType="words"
            delay={50}
            duration={0.8}
            className="font-display font-bold tracking-tight text-foreground text-3xl sm:text-4xl lg:text-[48px] max-w-3xl mx-auto leading-[1.1]"
            textAlign="center"
          />

          <p className="mt-6 text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the complete analyst workflow from foundational training to live incident response.
          </p>
        </div>

        {/* Desktop / Tablet ScrollStack */}
        <div className="hidden md:block">
          <ScrollStack
            itemDistance={120}
            itemScale={0.03}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.9}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollStackItem key={i}>
                  <div className="relative rounded-[24px] border border-border bg-card/80 backdrop-blur-md p-8 shadow-system transition-all duration-300 w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center">

                    {/* Left: Metadata */}
                    <div className="flex-1 w-full text-left">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-full border border-border bg-card text-primary flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-muted-foreground tracking-widest uppercase">
                          STEP {card.step}
                        </span>
                      </div>
                      <h3 className="text-3xl font-display font-bold text-foreground tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* Right: Mockup Interface */}
                    <div className="flex-1 w-full bg-background/50 rounded-xl border border-border p-5 shadow-sm">
                      {card.content}
                    </div>

                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        {/* Mobile Vertical Layout */}
        <div className="flex flex-col gap-6 md:hidden">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeContent key={i} delay={0.1 + i * 0.1} amount={0.2}>
                <div className="relative rounded-[24px] border border-border bg-card/80 backdrop-blur-md p-6 shadow-system">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-full border border-border bg-card text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                        STEP {card.step}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-full bg-background/50 rounded-xl border border-border p-4 shadow-sm">
                    {card.content}
                  </div>
                </div>
              </FadeContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ForenShieldJourney;
