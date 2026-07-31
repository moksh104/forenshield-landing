import { CheckCircle2, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
import { AcademyCard } from "./AcademyCard";

export function CyberAcademySection() {
  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24 bg-surface/30">
      <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Text Left */}
        <div className="flex-1 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-mono mb-2 border border-border">
              <span className="tracking-[0.24em] uppercase text-primary font-bold">ACADEMY CURRICULUM</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-foreground text-3xl sm:text-4xl lg:text-[40px] leading-tight">
              From Zero to <br />
              <span className="text-primary">Digital Investigator</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-xl">
              5 structured modules covering packet analysis with Wireshark, Linux forensics, and memory acquisition — each ending with a hands-on lab, not a multiple-choice quiz.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3 mt-6">
              {[
                "Wireshark packet capture labs with guided walkthroughs",
                "Linux command-line forensics with real disk images",
                "Progress tracking across 5 modules with skill-based certificates",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <MagneticButton href="#download" className="!px-6 !py-3">
                <GraduationCap className="h-4 w-4" /> Start Learning
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Visual Right */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <Reveal delay={200}>
            <AcademyCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
