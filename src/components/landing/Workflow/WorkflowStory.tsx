import { Reveal } from "@/components/landing/Reveal";
import {
  MissionControlScreen,
  CaseDetailsScreen,
  EvidenceBoardScreen,
  TimelineScreen,
  ReportsScreen,
} from "@/components/app-mockups";

export function WorkflowStory() {
  const steps = [
    { id: 1, title: "Incident Received", desc: "A new suspicious activity alert triggers an investigation protocol. Review the initial threat intelligence and scope the incident.", component: <MissionControlScreen /> },
    { id: 2, title: "Evidence Collected", desc: "Gather critical artifacts from the simulated environment, including network logs, memory dumps, and file system snapshots.", component: <EvidenceBoardScreen /> },
    { id: 3, title: "Analysis in Progress", desc: "Correlate collected data points. Identify the attack vector and trace the adversary's lateral movement.", component: <CaseDetailsScreen /> },
    { id: 4, title: "Timeline Built", desc: "Construct a chronological sequence of events. Map findings directly to MITRE ATT&CK tactics and techniques.", component: <TimelineScreen /> },
    { id: 5, title: "Report Generated", desc: "Compile findings into a professional-grade forensic report, complete with executive summaries and technical details.", component: <ReportsScreen /> },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              From Alert to <span className="text-primary text-glow-cyan">Resolution</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Follow a concrete investigation workflow end-to-end.
            </p>
          </div>
        </Reveal>

        <div className="space-y-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
                {/* Image / Mockup */}
                <div className="flex-1 w-full">
                  <Reveal delay={100}>
                    <div className="relative aspect-[4/3] rounded-2xl glass flex flex-col items-center justify-center p-8 overflow-hidden group hover:border-primary/40 transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)]">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      
                      {/* Scaled Mockup Render */}
                      <div className="w-[360px] h-[780px] origin-center scale-[0.4] sm:scale-[0.45] md:scale-[0.4] lg:scale-[0.5] shadow-2xl rounded-[40px] pointer-events-none group-hover:pointer-events-auto">
                        {step.component}
                      </div>
                    </div>
                  </Reveal>
                </div>
                {/* Text */}
                <div className="flex-1 w-full space-y-4">
                  <Reveal delay={200}>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-mono text-xs font-bold border border-primary/40 shadow-[0_0_12px_oklch(0.55_0.22_260/0.4)]">
                      0{step.id}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-4 text-lg">{step.desc}</p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
