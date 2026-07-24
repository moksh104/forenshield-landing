import { Reveal } from "@/components/landing/Reveal";
import {
  MissionControlScreen,
  CaseDetailsScreen,
  EvidenceBoardScreen,
  TimelineScreen,
  AcademyScreen,
  ReportsScreen,
  ProfileScreen,
} from "@/components/app-mockups";

export function DeviceShowcase() {
  const screens = [
    { id: "dashboard", component: <MissionControlScreen /> },
    { id: "investigation", component: <CaseDetailsScreen /> },
    { id: "evidence", component: <EvidenceBoardScreen /> },
    { id: "timeline", component: <TimelineScreen /> },
    { id: "report", component: <ReportsScreen /> },
    { id: "learning", component: <AcademyScreen /> },
    { id: "profile", component: <ProfileScreen /> },
    { id: "dashboard_dup", component: <MissionControlScreen /> }
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Experience the <span className="text-primary text-glow-cyan">Platform</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A comprehensive toolkit for modern digital forensics.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto w-[320px] h-[650px] sm:w-[360px] sm:h-[720px] rounded-[44px] border-[12px] border-black bg-black shadow-[0_30px_80px_-20px_oklch(0.55_0.22_260/0.4)] overflow-hidden group">
          {/* Dynamic Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-black rounded-b-2xl z-20" />
          
          {/* Scroll Container */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-[360px] h-[800%] flex flex-col animate-phone-scroll group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] origin-top-left scale-[0.835] sm:scale-100 transition-transform">
              {screens.map((screen, i) => (
                <div key={`${screen.id}-${i}`} className="w-full h-[12.5%] relative overflow-hidden">
                  {screen.component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
