import { Reveal } from "@/components/landing/Reveal";
import { FadeContent } from "@/components/animations/FadeContent";
import { CaseOfTheDay } from "./CaseOfTheDay";
import { ThreatMap } from "./ThreatMap";

export function SpotlightRow() {
  return (
    <section id="about" className="relative px-4 sm:px-8 py-10 sm:py-16 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-4">
          <FadeContent delay={0.1} amount={0.2}>
            <CaseOfTheDay />
          </FadeContent>
        </div>
        <div className="lg:col-span-8">
          <FadeContent delay={0.2} amount={0.2}>
            <ThreatMap />
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
