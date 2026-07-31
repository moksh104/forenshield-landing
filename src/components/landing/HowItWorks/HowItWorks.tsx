import { useState } from "react";
import { BookOpenCheck, Crosshair, ScanSearch, FileCheck2, Award } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { FadeContent } from "@/components/animations/FadeContent";

/* =============================================================
   HOW IT WORKS — Clean 5-Step Infographic
   ============================================================= */
export function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    { icon: BookOpenCheck, title: "Learn Concepts", desc: "Complete bite-sized modules on networking, OS forensics, and cryptography" },
    { icon: Crosshair, title: "Practice Live", desc: "Run phishing and OTP fraud simulations with branching outcomes" },
    { icon: ScanSearch, title: "Investigate Cases", desc: "Analyze packet captures, disk images, and mobile device evidence" },
    { icon: FileCheck2, title: "Generate Reports", desc: "File investigation verdicts with evidence references and risk scores" },
    { icon: Award, title: "Earn Rank & XP", desc: "Unlock Apprentice → Investigator → Analyst rank badges" },
  ];

  return (
    <section
      id="features"
      className="relative px-4 sm:px-8 py-16 sm:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* CONTAINER CARD */}
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 md:p-16 relative overflow-hidden">

          {/* HEADLINE & SUBTITLE */}
          <Reveal>
            <div className="text-center">
              <h2 className="relative font-display font-extrabold tracking-tight text-foreground text-2xl sm:text-3xl md:text-4xl">
                HOW <span className="text-primary">FORENSHIELD</span> WORKS
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground font-medium max-w-lg mx-auto">
                From your first login to filing a case report in under 30 minutes
              </p>
            </div>
          </Reveal>

          {/* 5-STEP INFOGRAPHIC GRID */}
          <div className="relative mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 items-start">

            {/* CONNECTING LINE (DESKTOP) — solid, no gradient */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px z-0 bg-border" />

            {steps.map((s, i) => {
              const Icon = s.icon;
              const isHovered = hoveredIndex === i;

              return (
                <FadeContent key={i} delay={0.1 + i * 0.1} amount={0.2}>
                  <div
                    className="relative flex flex-col items-center text-center cursor-pointer group"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Clean circular icon badge */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div
                        className={`h-14 w-14 rounded-full border bg-card text-primary flex items-center justify-center transition-all duration-200 ${isHovered
                          ? 'border-primary shadow-md'
                          : 'border-border'
                          }`}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* BADGE (01-05) & TITLE */}
                    <div className="mt-5 flex flex-col items-center gap-2 w-full">
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          0{i + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight whitespace-nowrap">
                          {s.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-snug max-w-[14rem] mx-auto text-center mt-1 min-h-[2.6rem] flex items-center justify-center">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </FadeContent>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
