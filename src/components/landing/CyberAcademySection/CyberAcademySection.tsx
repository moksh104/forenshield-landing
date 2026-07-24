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
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-2">
              <span className="tracking-[0.24em] uppercase text-primary">Cyber Academy</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Master the fundamentals <br/>
              of <span className="text-primary text-glow-cyan">Cyber Defense</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              Before you face live attacks, build your foundational knowledge through interactive, scenario-based learning modules. Learn networking basics, web security, cryptography, and linux essentials.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3 mt-6">
              {[
                "Interactive learning modules with knowledge checks",
                "Progress tracking and certifications",
                "Hands-on command line fundamentals",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-white font-medium">10,000+</span> learners already started
            </div>

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
