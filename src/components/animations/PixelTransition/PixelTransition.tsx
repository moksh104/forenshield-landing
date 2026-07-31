import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface PixelTransitionProps {
  children: React.ReactNode;
  pixelSize?: number;
  gap?: number;
  duration?: number;
  className?: string;
  delay?: number;
}

export function PixelTransition({
  children,
  pixelSize = 14,
  gap = 1,
  duration = 0.5,
  className = "",
  delay = 0,
}: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const [gridConfig, setGridConfig] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setGridConfig({
        columns: Math.ceil(width / (pixelSize + gap)),
        rows: Math.ceil(height / (pixelSize + gap)),
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [pixelSize, gap]);

  // If reduced motion is preferred or it's not in view yet, just show or hide
  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration, delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  const totalPixels = gridConfig.columns * gridConfig.rows;
  // Create an array of random indices for the stagger effect
  const pixelIndices = Array.from({ length: totalPixels }, (_, i) => i).sort(
    () => Math.random() - 0.5
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* The actual content (always behind the mask initially) */}
      <div className="w-full h-full">{children}</div>

      {/* The pixel mask overlay */}
      {gridConfig.columns > 0 && gridConfig.rows > 0 && (
        <div
          className="absolute inset-0 z-10 pointer-events-none flex flex-wrap"
          style={{ gap: `${gap}px` }}
        >
          {Array.from({ length: totalPixels }).map((_, i) => {
            const renderIndex = pixelIndices.indexOf(i);
            // Calculate a normalized delay based on position in shuffled array
            const pixelDelay = delay + (renderIndex / totalPixels) * duration;

            return (
              <motion.div
                key={i}
                style={{
                  width: `${pixelSize}px`,
                  height: `${pixelSize}px`,
                  backgroundColor: "var(--color-background)", // Matches the page background to hide content
                }}
                initial={{ opacity: 1 }}
                animate={isInView ? { opacity: 0 } : { opacity: 1 }}
                transition={{
                  duration: 0.15, // quick fade per pixel
                  delay: pixelDelay,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
