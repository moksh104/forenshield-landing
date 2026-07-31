import React, { useRef, Children, isValidElement, useMemo } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface ScrollStackProps {
  children: React.ReactNode;
  /** Scroll distance (px) allocated per card for the stacking reveal. */
  itemDistance?: number;
  /** Scale reduction per card stacked behind. */
  itemScale?: number;
  /** Vertical offset (px) between stacked cards. */
  itemStackDistance?: number;
  /** Viewport % at which cards begin sticking. */
  stackPosition?: string;
  /** Viewport % at which scale interpolation ends. */
  scaleEndPosition?: string;
  /** Minimum scale for the furthest-back card. */
  baseScale?: number;
  /** Rotation (deg) applied per stacked card (0 = none). */
  rotationAmount?: number;
  /** Blur (px) applied per stacked card (0 = none). */
  blurAmount?: number;
  /** Track window scroll (true) or container scroll (false). */
  useWindowScroll?: boolean;
  className?: string;
}

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

/* ---------------------------------------------------------------
   ScrollStackItem
   --------------------------------------------------------------- */

export function ScrollStackItem({ children, className, id, style }: ScrollStackItemProps) {
  return (
    <div id={id} className={cn("w-full", className)} style={style}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Internal — single card wrapper
   --------------------------------------------------------------- */

interface CardProps {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
  itemScale: number;
  itemStackDistance: number;
  stackPosition: string;
  baseScale: number;
  rotationAmount: number;
  blurAmount: number;
}

function ScrollStackCard({
  children,
  index,
  totalItems,
  scrollYProgress,
  itemScale,
  itemStackDistance,
  stackPosition,
  baseScale,
  rotationAmount,
  blurAmount,
}: CardProps) {
  const step = totalItems > 1 ? 1 / (totalItems - 1) : 1;
  const start = index * step;

  const targetScale = Math.max(0.6, baseScale - (totalItems - 1 - index) * itemScale);

  const scale = useTransform(scrollYProgress, [start, 1], [1, targetScale]);

  const rotate = useTransform(
    scrollYProgress,
    [start, 1],
    [0, (totalItems - 1 - index) * rotationAmount * (index % 2 === 0 ? 1 : -1)],
  );

  const blur = useTransform(scrollYProgress, [start, 1], [0, blurAmount]);
  const filter = useTransform(blur, (b) => (b > 0 ? `blur(${b}px)` : "none"));

  return (
    <div
      className="sticky w-full"
      style={{
        top: `calc(${stackPosition} + ${index * itemStackDistance}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, rotate, filter, transformOrigin: "top center" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ScrollStack
   --------------------------------------------------------------- */

export function ScrollStack({
  children,
  itemDistance = 120,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  className,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const { scrollYProgress } = useScroll(
    useWindowScroll
      ? { target: containerRef, offset: ["start start", "end end"] }
      : { container: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ paddingBottom: items.length > 1 ? `${(items.length - 1) * itemDistance}px` : 0 }}
    >
      {items.map((child, i) => (
        <ScrollStackCard
          key={child.key ?? i}
          index={i}
          totalItems={items.length}
          scrollYProgress={scrollYProgress}
          itemScale={itemScale}
          itemStackDistance={itemStackDistance}
          stackPosition={stackPosition}
          baseScale={baseScale}
          rotationAmount={rotationAmount}
          blurAmount={blurAmount}
        >
          {child}
        </ScrollStackCard>
      ))}
    </div>
  );
}
