import { Link } from "@tanstack/react-router";
import { useRef, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  to,
  href,
  children,
  className = "",
  onClick,
  ...props
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionProperty = "translate";
    el.style.transitionDuration = "0s";
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.translate = `${x * 0.25}px ${y * 0.35}px`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionProperty = "translate";
    el.style.transitionDuration = "0.4s";
    el.style.transitionTimingFunction = "cubic-bezier(0.16,1,0.3,1)";
    el.style.translate = "0px 0px";
  };
  const sharedClass = `inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 active:scale-95 shadow-sm hover:shadow-md transition-all duration-200 will-change-transform ${className}`;
  const inner = children;

  // If href is provided, render a plain <a> (for anchor links)
  if (href) {
    return (
      <a
        href={href}
        ref={ref}
        onClick={onClick}
        onMouseMove={onMove as any}
        onMouseLeave={onLeave}
        className={sharedClass}
        {...props}
      >
        {inner}
      </a>
    );
  }

  // Otherwise render a router Link
  return (
    <Link
      to={to || "/"}
      ref={ref as any}
      onClick={onClick as any}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave}
      className={sharedClass}
      {...(props as any)}
    >
      {inner}
    </Link>
  );
}
