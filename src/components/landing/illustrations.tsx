import { motion } from "framer-motion";

/**
 * unDraw-style flat SVG illustrations for the ForenShield landing.
 * Palette: Signal Blue #2563EB, Cyan #22D3EE, Amber accent #F59E0B.
 * All illustrations sit on a transparent background so the parent card
 * chrome (dark navy gradient) shows through.
 */

const BLUE = "#2563EB";
const BLUE_D = "#1E3A8A";
const CYAN = "#22D3EE";
const AMBER = "#F59E0B";
const LIGHT = "#DBEAFE";
const SKIN = "#F1F5F9";

function Frame({ children, viewBox = "0 0 400 300" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IllusHacker() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Background glow */}
      <circle cx="200" cy="150" r="100" className="fill-primary/5 blur-3xl" />
      
      {/* Particles reusing animate-drift-twinkle */}
      <g className="fill-primary/60 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]">
        <circle cx="80" cy="100" r="1.5" className="animate-drift-twinkle" style={{ animationDelay: "0s" }} />
        <circle cx="320" cy="80" r="2" className="animate-drift-twinkle" style={{ animationDelay: "1s" }} />
        <circle cx="120" cy="60" r="1.5" className="animate-drift-twinkle" style={{ animationDelay: "2s" }} />
        <circle cx="280" cy="200" r="2.5" className="animate-drift-twinkle" style={{ animationDelay: "1.5s" }} />
        <rect x="70" y="160" width="8" height="2" rx="1" className="animate-drift-twinkle" style={{ animationDelay: "0.5s" }} />
        <rect x="310" y="140" width="12" height="2" rx="1" className="animate-drift-twinkle" style={{ animationDelay: "2.5s" }} />
      </g>

      {/* Desk */}
      <rect x="60" y="240" width="280" height="4" rx="2" className="fill-primary/20" />
      
      {/* Terminal Screen Glow */}
      <rect x="140" y="160" width="120" height="70" rx="6" className="fill-primary/10 blur-xl" />
      
      {/* Terminal Display */}
      <rect x="140" y="160" width="120" height="70" rx="6" className="fill-black stroke-primary/30" strokeWidth="2" />
      <rect x="150" y="170" width="50" height="4" rx="2" className="fill-primary/60" />
      <rect x="150" y="180" width="80" height="4" rx="2" className="fill-primary/40" />
      <rect x="150" y="190" width="40" height="4" rx="2" className="fill-warning/60" />
      
      {/* Breathing glow behind silhouette */}
      <path d="M120 240 C120 100, 280 100, 280 240 Z" className="fill-primary/10 blur-2xl motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]" />
      
      {/* Hooded Figure Silhouette (abstract geometric) */}
      <path d="M120 240 C120 100, 280 100, 280 240 Z" className="fill-background stroke-primary/20" strokeWidth="2" />
      {/* Subtle rim light */}
      <path d="M130 240 C130 120, 270 120, 270 240" className="fill-none stroke-primary/50" strokeWidth="4" filter="blur(4px)" opacity="0.6" />
      
      {/* Abstract Glowing Eyes/Nodes */}
      <ellipse cx="190" cy="180" rx="3" ry="1.5" className="fill-primary animate-pulse-glow" />
      <ellipse cx="210" cy="180" rx="3" ry="1.5" className="fill-primary animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
    </svg>
  );
}

export function IllusNetwork() {
  const nodes = [
    { x: 80, y: 150, r: 8, color: "var(--color-primary)", colorClass: "fill-primary", strokeClass: "stroke-primary" },
    { x: 160, y: 80, r: 12, color: "var(--color-warning)", colorClass: "fill-warning", strokeClass: "stroke-warning" },
    { x: 160, y: 220, r: 10, color: "var(--color-primary)", colorClass: "fill-primary", strokeClass: "stroke-primary" },
    { x: 250, y: 150, r: 14, color: "var(--color-danger)", colorClass: "fill-danger", strokeClass: "stroke-danger" },
    { x: 330, y: 100, r: 8, color: "var(--color-primary)", colorClass: "fill-primary", strokeClass: "stroke-primary" },
  ];
  
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
  ];

  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Glow */}
      <circle cx="200" cy="150" r="100" className="fill-primary/5 blur-3xl" />
      
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line 
          key={i} 
          x1={nodes[a].x} y1={nodes[a].y} 
          x2={nodes[b].x} y2={nodes[b].y} 
          className="stroke-primary/40 animate-data-flow" 
          strokeWidth="1.5" 
          strokeDasharray="4 4" 
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {/* Outer pulse */}
          <circle cx={n.x} cy={n.y} r={n.r + 6} className={`${n.colorClass} animate-pulse-glow opacity-15`} style={{ animationDelay: `${i * 0.2}s` }} />
          {/* Inner ring */}
          <circle cx={n.x} cy={n.y} r={n.r} className={`fill-background ${n.strokeClass}`} strokeWidth="2" />
          {/* Core */}
          <circle cx={n.x} cy={n.y} r={n.r * 0.4} className={n.colorClass} />
        </g>
      ))}
    </svg>
  );
}

export function IllusDashboard() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Main Panel */}
      <rect x="60" y="40" width="280" height="220" rx="12" className="fill-background stroke-white/10 shadow-2xl" strokeWidth="1" />
      <rect x="60" y="40" width="280" height="30" rx="12" className="fill-white/5" />
      
      {/* Window Controls */}
      <circle cx="80" cy="55" r="4" className="fill-danger/80" />
      <circle cx="95" cy="55" r="4" className="fill-warning/80" />
      <circle cx="110" cy="55" r="4" className="fill-success/80" />
      
      {/* List Rows with Staggered Shimmer */}
      <g transform="translate(80, 85)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0, ${i * 24})`} className="motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.5}s` }}>
            <rect x="0" y="0" width="240" height="16" rx="4" className="fill-white/5" />
            <rect x="8" y="6" width="40" height="4" rx="2" className="fill-white/20" />
            <rect x="60" y="6" width="100" height="4" rx="2" className="fill-white/10" />
            <rect x="210" y="6" width="20" height="4" rx="2" className={i === 1 ? "fill-warning/60" : "fill-primary/60"} />
          </g>
        ))}
      </g>
      
      {/* Mini Bar Chart Area */}
      <rect x="80" y="170" width="240" height="70" rx="6" className="fill-primary/5 stroke-primary/10" strokeWidth="1" />
      
      {/* Bars (reusing ReportScreen styling logic) with whileInView grow animation */}
      <g transform="translate(100, 185)">
        {[40, 60, 30, 80, 50, 90, 45, 70].map((h, i) => {
          const isHighlight = i === 5 || i === 3;
          return (
            <g key={i} transform={`translate(${i * 26}, 0)`}>
              {/* Background bar */}
              <rect x="0" y="0" width="14" height="40" rx="2" className="fill-primary/10" />
              {/* Foreground bar */}
              <motion.rect 
                x="0" 
                y={40 - h * 0.4} 
                width="14" 
                height={h * 0.4} 
                rx="2" 
                className={`${isHighlight ? "fill-warning motion-safe:animate-[pulse-glow_3s_ease-in-out_infinite]" : "fill-primary"}`} 
                style={{ transformOrigin: `0 40px`, animationDelay: isHighlight ? `${i * 0.3}s` : '0s' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function IllusPlay() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g className="origin-center motion-safe:animate-[spin_25s_linear_infinite]" style={{ transformOrigin: '200px 150px' }}>
        {/* Radar rings */}
        <circle cx="200" cy="150" r="120" className="fill-none stroke-primary/10" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="200" cy="150" r="80" className="fill-none stroke-primary/20" strokeWidth="1" />
        <circle cx="200" cy="150" r="40" className="fill-primary/5 stroke-primary/30" strokeWidth="1" />
        
        {/* Accent dots/orbiters rotating with the rings */}
        <circle cx="120" cy="150" r="4" className="fill-warning motion-safe:animate-[pulse-glow_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
        <circle cx="256" cy="94" r="3" className="fill-danger motion-safe:animate-[pulse-glow_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
        <circle cx="240" cy="219" r="2" className="fill-primary motion-safe:animate-[pulse-glow_3s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
      </g>
      
      {/* Play Button */}
      <g className="group cursor-pointer">
        {/* Expanding pulse ring */}
        <circle cx="200" cy="150" r="28" className="fill-primary/10 animate-[ping_3s_ease-out_infinite]" />
        {/* Glow */}
        <circle cx="200" cy="150" r="28" className="fill-primary/20 animate-pulse-glow" />
        {/* Button body */}
        <circle cx="200" cy="150" r="24" className="fill-background stroke-primary" strokeWidth="2" />
        {/* Play icon triangle */}
        <path d="M194 140 L212 150 L194 160 Z" className="fill-primary" />
      </g>
    </svg>
  );
}

export function IllusReports() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 160)">
        {/* Back page */}
        <g transform="translate(10, -20) rotate(8)">
          <rect x="-80" y="-100" width="160" height="200" rx="8" className="fill-background stroke-white/10 shadow-2xl" strokeWidth="1" />
          <rect x="-60" y="-70" width="120" height="4" rx="2" className="fill-white/10" />
          <rect x="-60" y="-55" width="90" height="4" rx="2" className="fill-white/10" />
        </g>
        
        {/* Middle page */}
        <g transform="translate(-10, -10) rotate(-4)">
          <rect x="-80" y="-100" width="160" height="200" rx="8" className="fill-background stroke-white/20 shadow-2xl" strokeWidth="1" />
          <rect x="-60" y="-70" width="120" height="4" rx="2" className="fill-white/10" />
          <rect x="-60" y="-55" width="100" height="4" rx="2" className="fill-white/10" />
        </g>
        
        {/* Front page */}
        <g transform="translate(0, 0)">
          <rect x="-80" y="-100" width="160" height="200" rx="8" className="fill-background stroke-primary/30 shadow-2xl" strokeWidth="1" />
          
          {/* Header */}
          <rect x="-80" y="-100" width="160" height="40" rx="8" className="fill-primary/10" />
          <motion.rect 
            x="-60" 
            y="-85" 
            height="6" 
            rx="3" 
            className="fill-primary" 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
          
          {/* Shield / Logo mark representing Rank - updated to primary blue */}
          <circle cx="50" cy="-80" r="10" className="fill-primary/20 stroke-primary/50 motion-safe:animate-[pulse-glow_3s_ease-in-out_infinite]" strokeWidth="1" />
          <path d="M46 -82 L54 -82 L50 -76 Z" className="fill-primary" />
          
          {/* Text lines */}
          <rect x="-60" y="-40" width="120" height="4" rx="2" className="fill-white/20" />
          <rect x="-60" y="-25" width="90" height="4" rx="2" className="fill-white/20" />
          <rect x="-60" y="-10" width="100" height="4" rx="2" className="fill-white/20" />
          
          {/* Chart Squiggle animated as progress */}
          <rect x="-60" y="15" width="120" height="60" rx="6" className="fill-primary/5 stroke-primary/10" strokeWidth="1" />
          <motion.path 
            d="M-50 60 L-30 40 L-10 50 L10 25 L30 35 L50 25" 
            className="fill-none stroke-primary" 
            strokeWidth="2" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
          <motion.circle 
            cx="50" 
            cy="25" 
            r="3" 
            className="fill-primary animate-pulse-glow" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2 }}
          />
        </g>
      </g>
    </svg>
  );
}
