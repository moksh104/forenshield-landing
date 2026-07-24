import { Reveal } from "@/components/landing/Reveal";
import { CaseOfTheDay } from "./CaseOfTheDay";
import { ThreatMap } from "./ThreatMap";

export function SpotlightRow() {
  return (
    <section id="about" className="relative px-4 sm:px-8 py-10 sm:py-16 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-4 sm:gap-6">
        <Reveal delay={0} className="lg:col-span-4">
          <CaseOfTheDay />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-8">
          <ThreatMap />
        </Reveal>
      </div>
    </section>
  );
}
