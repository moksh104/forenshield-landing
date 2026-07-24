import { Github, Linkedin, Heart } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export function Footer() {
  const cols = [
    { title: "Product", links: [
      { label: "Features", href: "#features" },
      { label: "Platform", href: "#platform" },
      { label: "Screenshots", href: "#platform" },
      { label: "Download", href: "#download" },
    ] },
    { title: "Resources", links: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "#" },
    ] },
  ];
  return (
    <footer className="relative border-t border-white/[0.06] bg-background/50 px-4 sm:px-8 py-10">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-16">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-[14px]">
            <Logo />
            <div>
              <div className="text-white font-display font-bold text-lg leading-none">
                ForenShield
              </div>
              <div className="text-[12px] font-medium tracking-[0.18em] mt-1.5 leading-none" style={{ color: "rgba(255,255,255,0.65)" }}>
                Learn. Investigate. Defend.
              </div>
            </div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-white font-semibold text-sm">{c.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="text-white font-semibold text-sm">Social</div>
          <div className="mt-3 flex items-center gap-2">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/in/moksh-patel-98591a36b?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { Icon: Github, href: "https://github.com/moksh104" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg border border-white/10 hover:border-primary/40 hover:text-primary hover:-translate-y-1 text-muted-foreground flex items-center justify-center transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] mt-10 pt-6 border-t border-white/5 flex flex-col gap-4 text-xs text-muted-foreground">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/40">© {new Date().getFullYear()} ForenShield. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5">
            Made with <Heart className="h-3 w-3 text-danger fill-danger" /> for Cyber Security Learners
          </span>
        </div>
      </div>
    </footer>
  );
}
