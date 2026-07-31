import { Mail, QrCode, Smartphone, ShoppingCart } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal/ScrollReveal";
import { FadeContent } from "@/components/animations/FadeContent";

export function SimulationLabSection() {
  const sims = [
    { title: "Phishing Analysis", desc: "Examine sender headers, embedded URLs, and domain age to classify 12 email samples as safe or malicious — with instant feedback on each decision.", icon: Mail, xp: "+100 XP" },
    { title: "QR Code Scams", desc: "Decode payloads from QR codes used in physical-to-digital attacks.", icon: QrCode, xp: "+150 XP" },
    { title: "OTP Fraud", desc: "Identify account takeover attempts via SMS spoofing and SIM swap patterns.", icon: Smartphone, xp: "+200 XP" },
    { title: "Fake Shopping", desc: "Investigate fraudulent e-commerce domains stealing payment credentials.", icon: ShoppingCart, xp: "+250 XP" },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-4">
              <span className="tracking-[0.24em] uppercase text-danger font-semibold">Simulation Lab</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-foreground text-3xl sm:text-4xl">
              Practice in <span className="text-danger">Live Attack Scenarios</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              4 simulation types covering phishing, QR scams, OTP fraud, and fake e-commerce — each with branching decision paths and scored outcomes.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured + Supporting layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Featured card — spans 2 columns, taller */}
          <div className="lg:col-span-2">
            <FadeContent delay={0.1} amount={0.2}>
              {(() => {
                const sim = sims[0];
                const Icon = sim.icon;
                return (
                  <div className="p-8 rounded-2xl border border-border bg-card h-full flex flex-col group cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-primary shrink-0">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-foreground font-bold text-xl">{sim.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1 max-w-md">{sim.desc}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Reward</span>
                      <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono font-medium text-foreground">
                        {sim.xp}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </FadeContent>
          </div>

          {/* Supporting card — first supporting */}
          <div className="lg:col-span-1">
            <FadeContent delay={0.2} amount={0.2}>
              {(() => {
                const sim = sims[1];
                const Icon = sim.icon;
                return (
                  <div className="p-6 rounded-2xl border border-border bg-card h-full flex flex-col group cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-danger mb-4">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-foreground font-bold text-lg mb-2">{sim.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1">{sim.desc}</p>
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Reward</span>
                      <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono font-medium text-foreground">
                        {sim.xp}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </FadeContent>
          </div>

          {/* Remaining 2 supporting cards */}
          {sims.slice(2).map((sim, i) => {
            const Icon = sim.icon;
            return (
              <div key={i} className="lg:col-span-1">
                <FadeContent delay={0.3 + i * 0.1} amount={0.2}>
                  <div className="p-6 rounded-2xl border border-border bg-card h-full flex flex-col group cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary mb-4">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-foreground font-bold text-lg mb-2">{sim.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1">{sim.desc}</p>
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Reward</span>
                      <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono font-medium text-foreground">
                        {sim.xp}
                      </span>
                    </div>
                  </div>
                </FadeContent>
              </div>
            );
          })}

          {/* Empty spacer so the last row has asymmetric 2+1 feel */}
          <div className="hidden lg:block lg:col-span-1" />
        </div>
      </div>
    </section>
  );
}
