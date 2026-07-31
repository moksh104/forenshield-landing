import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps {
  children: ReactNode;
  /** Custom CSS class names. */
  className?: string;
  /** Spotlight color (CSS color string). Default: rgba(255, 255, 255, 0.12). */
  spotlightColor?: string;
  /** Spotlight radius in pixels. Default: 220. */
  spotlightRadius?: number;
  /** Optional inline styles. */
  style?: CSSProperties;
}

/**
 * SpotlightCard — Apple/Linear/Cursor-inspired interactive card that reveals
 * a subtle radial spotlight tracking the cursor on hover and focus.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.12)",
  spotlightRadius = 220,
  style,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  }

  function handleMouseLeave() {
    if (shouldReduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", `-9999px`);
    el.style.setProperty("--mouse-y", `-9999px`);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "group relative rounded-[24px] overflow-hidden transition-all duration-300 ease-out",
        className
      )}
      style={
        {
          "--mouse-x": "-9999px",
          "--mouse-y": "-9999px",
          ...style,
        } as CSSProperties
      }
    >
      {/* Radial Spotlight Overlay */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-out"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
