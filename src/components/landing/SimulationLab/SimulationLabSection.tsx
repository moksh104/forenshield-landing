import { Mail, QrCode, Smartphone, ShoppingCart } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";

export function SimulationLabSection() {
  const sims = [
    { title: "Phishing Analysis", desc: "Spot fake emails and domains before they compromise the network.", icon: Mail, tone: "primary", xp: "+100 XP" },
    { title: "QR Code Scams", desc: "Analyze malicious QR codes used in modern physical-to-digital attacks.", icon: QrCode, tone: "danger", xp: "+150 XP" },
    { title: "OTP Fraud", desc: "Intercept and identify account takeover attempts via SMS spoofing.", icon: Smartphone, tone: "primary", xp: "+200 XP" },
    { title: "Fake Shopping", desc: "Investigate fraudulent e-commerce domains stealing credentials.", icon: ShoppingCart, tone: "danger", xp: "+250 XP" },
  ];
  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-4">
              <span className="tracking-[0.24em] uppercase text-danger">Simulation Lab</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Practice in <span className="text-danger">Live Attack Scenarios</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              Face real-world threats in a safe, gamified environment. Make critical decisions under pressure and see the consequences of your actions.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sims.map((sim, i) => {
            const Icon = sim.icon;

            // Map the accent tones for the outer card border & hover shadow
            const cardToneCls: Record<string, string> = {
              primary: "border-primary/20 hover:border-primary/50 hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.35)]",
              danger: "border-danger/20 hover:border-danger/50 hover:shadow-[0_12px_30px_-10px_oklch(0.65_0.24_25/0.35)]",
            };

            // Map the accent tones for the inner icon badge
            const badgeCls: Record<string, string> = {
              primary: "text-primary border-primary/30 bg-primary/10 shadow-[0_0_15px_oklch(0.55_0.22_260/0.35)] group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_oklch(0.55_0.22_260/0.6)]",
              danger: "text-danger border-danger/30 bg-danger/10 shadow-[0_0_15px_oklch(0.65_0.24_25/0.35)] group-hover:border-danger/50 group-hover:bg-danger/20 group-hover:shadow-[0_0_25px_oklch(0.65_0.24_25/0.6)]",
            };

            return (
              <Reveal key={i} delay={i * 100}>
                <div className={`p-6 rounded-2xl border bg-white/[0.02] bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)] h-full flex flex-col group cursor-default ${cardToneCls[sim.tone]}`}>
                  <div className={`h-14 w-14 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite] ${badgeCls[sim.tone]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{sim.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1">{sim.desc}</p>

                  {/* Gamification bottom anchor */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Reward</span>
                    <span className="rounded-md bg-achievement/15 border border-achievement/30 px-2 py-0.5 text-[10px] font-medium text-achievement">
                      {sim.xp}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
