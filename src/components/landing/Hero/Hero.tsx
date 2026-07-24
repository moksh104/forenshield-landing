import { ArrowRight, Github } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MissionControlWidget } from "./MissionControlWidget";
import { LetterStagger } from "./LetterStagger";

export function Hero() {
  return (
    <section id="top" className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mt-2 mb-2 border border-[#30363D]">
                <span className="tracking-[0.2em] uppercase text-[#8B949E]">
                  Free Android app · v1.0.0 · APK direct download
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 
                className="mt-6 flex flex-col items-start font-display font-bold text-[#F0F6FC] tracking-tight"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  maxWidth: "620px",
                }}
              >
                <span className="whitespace-nowrap"><LetterStagger>Learn.</LetterStagger></span>
                <span className="whitespace-nowrap"><LetterStagger delay={180}>Investigate.</LetterStagger></span>
                <span className="text-[#2F81F7] whitespace-nowrap flex items-baseline">
                  <LetterStagger delay={480}>Defend.</LetterStagger>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-[42ch] text-[16px] md:text-[18px] text-[#8B949E] leading-[1.5]">
                Hands-on cybersecurity training through realistic digital investigations, evidence analysis, and incident response simulations.
              </p>
            </Reveal>

            {/* Action Triggers */}
            <Reveal delay={260}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <MagneticButton href="#download" className="!px-7 !py-4 !h-[54px] !text-[16px] flex items-center gap-2">
                  Get ForenShield — Free
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <a
                  href="https://github.com/moksh104/Website-ForenShield-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[15px] font-semibold text-[#F0F6FC] glass hover:bg-[#1C2128] transition-all duration-200"
                >
                  <Github className="h-5 w-5 text-[#8B949E] group-hover:text-[#F0F6FC] transition-colors" />
                  View on GitHub
                </a>
              </div>


            </Reveal>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <MissionControlWidget />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
