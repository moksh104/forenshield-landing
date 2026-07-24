import { useState } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { Star, User, ChevronDown } from "lucide-react";

export function TrustCredibility() {
  return (
    <>
      <Testimonials />
      <Faq />
    </>
  );
}

function Testimonials() {
  return (
    <section className="relative px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">Community Trust</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-8 rounded-2xl glass flex flex-col h-full hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)] transition-all duration-[250ms] ease-out">
                <div className="flex gap-1 mb-6 text-primary">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed flex-1 italic">
                  "Placeholder testimonial — replace with real user quote once community feedback is collected. This slot is reserved for social proof."
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-sm truncate">Placeholder Name</div>
                    <div className="text-muted-foreground text-xs truncate">Security Analyst Role</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
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
    <section className="relative px-4 sm:px-8 py-24 bg-surface/30">
      <div className="mx-auto max-w-[800px]">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">Frequently Asked Questions</h2>
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
      <div className="rounded-2xl glass border border-white/10 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none focus-visible:bg-white/5"
          aria-expanded={open}
        >
          <span className="text-white font-medium pr-4">{question}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-[250ms] ease-out ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`accordion-content ${open ? "accordion-content-open" : ""}`}>
          <div className="accordion-inner">
            <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-white/5 pt-4 mx-2">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
