import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FadeContentProps {
  children: ReactNode;
  /** CSS class on the wrapper. */
  className?: string;
  /** Delay before animation starts in seconds (default 0.1). */
  delay?: number;
  /** Duration of the fade in seconds (default 0.6). */
  duration?: number;
  /** Direction the content fades in from (default "up"). */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to travel in pixels (default 20). */
  distance?: number;
  /** Initial scale (default 0.98). */
  initialScale?: number;
  /** Only animate once when entering viewport (default true). */
  once?: boolean;
  /** IntersectionObserver threshold amount (default 0.2). */
  amount?: number;
  /** Optional inline styles. */
  style?: CSSProperties;
}

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
} as const;

/**
 * FadeContent — Fades and scales children into view when entering the viewport.
 * Configured according to ForenShield design parameters:
 * - duration: 0.6
 * - delay: 0.1
 * - initial state: opacity 0, y 20, scale 0.98
 * - final state: opacity 1, y 0, scale 1
 * - viewport: once true, amount 0.2
 */
export function FadeContent({
  children,
  className,
  delay = 0.1,
  duration = 0.6,
  direction = "up",
  distance = 20,
  initialScale = 0.98,
  once = true,
  amount = 0.2,
  style,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const shouldReduceMotion = useReducedMotion();

  const dir = directionMap[direction];
  const initialX = dir.x * distance;
  const initialY = dir.y * distance;

  if (shouldReduceMotion) {
    return (
      <div className={cn(className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={style}
      initial={{ opacity: 0, x: initialX, y: initialY, scale: initialScale }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: initialX, y: initialY, scale: initialScale }
      }
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeContent;
