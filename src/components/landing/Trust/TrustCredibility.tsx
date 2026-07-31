import { useState } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { GraduationCap, Shield, BookOpen, ChevronDown } from "lucide-react";

export function TrustCredibility() {
  return (
    <>
      <BuiltFor />
      <Faq />
    </>
  );
}

function BuiltFor() {
  const useCases = [
    {
      role: "CS Students",
      icon: GraduationCap,
      text: "Replace 3-hour YouTube lecture marathons with a 40-minute guided PCAP lab using real captured traffic — not slides.",
    },
    {
      role: "SOC Analyst Interns",
      icon: Shield,
      text: "Run the OTP fraud simulation, make a wrong call at step 3, and see exactly how the attacker exploits it. Feedback textbooks can't give you.",
    },
    {
      role: "Cybersecurity Faculty",
      icon: BookOpen,
      text: "Assign real forensic investigation cases instead of static lab worksheets. Students work with actual evidence files, not screenshots of them.",
    },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold tracking-tight text-foreground text-3xl">Built For</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-border bg-card flex flex-col h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                      FOR {uc.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed flex-1">
                    {uc.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    { q: "What is ForenShield?", a: "ForenShield is an interactive cybersecurity training platform focused on digital forensics and incident response. It provides hands-on cases with real-world simulated evidence." },
    { q: "Is the platform free?", a: "The core platform and initial cases are free. Premium modules and advanced enterprise features may require a subscription in the future." },
    { q: "What skill level is required?", a: "Cases range from beginner to advanced. We recommend basic networking and IT knowledge, but our learning modules guide you through complex forensic concepts." },
    { q: "Are the certificates valid for CPE credits?", a: "Our certificates prove completion of rigorous, practical challenges. We are working on official CPE accreditation with major security organizations." },
    { q: "Can I use the app offline?", a: "Certain learning modules and static evidence files can be cached offline, but full investigation simulations require an active connection." },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24 bg-muted/20">
      <div className="mx-auto max-w-[800px]">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold tracking-tight text-foreground text-3xl">Frequently Asked Questions</h2>
          </div>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 50}>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors focus:outline-none focus-visible:bg-muted/50"
          aria-expanded={open}
        >
          <span className="text-foreground font-medium pr-4">{question}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`accordion-content ${open ? "accordion-content-open" : ""}`}>
          <div className="accordion-inner">
            <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4 mx-2">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
