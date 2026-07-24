import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MagneticButton } from "@/components/common/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-spy: highlight active nav item based on visible section
  useEffect(() => {
    const sectionIds = ["features", "platform", "download", "about"];
    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, boolean>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleMap.set(id, entry.isIntersecting);
          // Pick the first visible section in DOM order
          for (const sid of sectionIds) {
            if (visibleMap.get(sid)) {
              setActiveSection(sid);
              return;
            }
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Platform", href: "#platform" },
    { label: "Download", href: "#download" },
    { label: "About", href: "#about" },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // account for fixed nav
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div
          className={`flex items-center justify-between gap-6 rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "border border-white/10 shadow-elevated"
              : "border border-transparent"
          }`}
          style={
            scrolled
              ? {
                  background: "rgba(11,18,32,0.85)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  borderColor: "rgba(255,255,255,0.08)",
                }
              : undefined
          }
        >
          <a href="#top" className="flex items-center gap-[14px] group">
            <Logo />
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="font-display font-bold tracking-tight text-white text-[17px] leading-none">
                ForenShield
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.map((l) => {
              const isActive = `#${activeSection}` === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`relative px-4 py-2 transition-all duration-300 hover:text-glow-cyan active:scale-95 ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px bg-primary transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex flex-col items-center justify-center h-9 w-9 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-4 bg-white rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block h-0.5 w-4 bg-white rounded mt-1 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[2px]" : ""}`} />
            </button>
            <MagneticButton href="#download" onClick={(e: MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#download")}>
              Download
              <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ${
            mobileOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <nav className="flex flex-col gap-1 rounded-2xl backdrop-blur-xl bg-background/80 border border-white/[0.06] p-3">
            {navLinks.map((l) => {
              const isActive = `#${activeSection}` === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-white/[0.06]"
                      : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
