import { motion } from "framer-motion";

/**
 * UI/Dashboard Mockup SVG illustrations for the ForenShield landing.
 * Designed with dedicated dark-console window frames so all interface
 * elements, text lines, badges, and status lights pop crisply in BOTH light & dark modes.
 */

/** 1. Investigation Lab — Evidence Analysis & Hash Scanner */
export function IllusHacker() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 150)">
        {/* Background glow */}
        <circle cx="0" cy="0" r="110" className="fill-primary/10 blur-3xl" />
        
        {/* Main UI Console Window */}
        <rect x="-120" y="-85" width="240" height="170" rx="10" fill="#0E121B" stroke="#2563EB" strokeWidth="1.5" className="shadow-2xl" />
        
        {/* Window Title Bar */}
        <rect x="-120" y="-85" width="240" height="28" rx="10" fill="#161B26" />
        <rect x="-120" y="-65" width="240" height="8" fill="#161B26" /> {/* Flatten bottom corners of title bar */}
        <line x1="-120" y1="-57" x2="120" y2="-57" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Mac-style Window Controls */}
        <circle cx="-104" cy="-71" r="3.5" fill="#EF4444" />
        <circle cx="-94" cy="-71" r="3.5" fill="#F59E0B" />
        <circle cx="-84" cy="-71" r="3.5" fill="#10B981" />
        
        <text x="-65" y="-68" fill="#94A3B8" fontSize="9" fontFamily="monospace" fontWeight="bold">EVIDENCE_INSPECTOR_V2.0</text>
        
        {/* File scanner block on left */}
        <g transform="translate(-100, -42)">
          <rect x="0" y="0" width="34" height="42" rx="4" fill="#1E2638" stroke="#3B82F6" strokeWidth="1" />
          <text x="17" y="25" fill="#60A5FA" fontSize="16" textAnchor="middle">📄</text>
          
          {/* Animated Laser Scan Line */}
          <motion.line 
            x1="2" y1="4" x2="32" y2="4" 
            stroke="#EF4444" strokeWidth="2"
            animate={{ y: [0, 34, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
        
        {/* Metadata lines */}
        <g transform="translate(-56, -40)">
          <rect x="0" y="4" width="70" height="6" rx="3" fill="#60A5FA" />
          <rect x="0" y="16" width="110" height="5" rx="2.5" fill="#475569" />
          <rect x="0" y="27" width="90" height="5" rx="2.5" fill="#334155" />
        </g>
        
        {/* "VERIFIED" status badge top right */}
        <g transform="translate(62, -42)">
          <rect x="0" y="0" width="48" height="16" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
          <text x="24" y="11" fill="#34D399" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">VERIFIED</text>
        </g>
        
        {/* Evidence Hash Rows */}
        {[
          { label: "report.pdf", hash: "a7b39...8f", status: "VERIFIED", color: "#34D399" },
          { label: "capture.pcap", hash: "c2d14...1e", status: "ANALYZED", color: "#60A5FA" },
          { label: "mem_dump.raw", hash: "e9f40...7a", status: "SCANNING", color: "#F59E0B" }
        ].map((item, i) => (
          <g key={i} transform={`translate(-106, ${10 + i * 24})`}>
            <rect x="0" y="0" width="212" height="20" rx="4" fill="#161C2A" stroke="#2563EB" strokeOpacity="0.2" strokeWidth="1" />
            <text x="8" y="13" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace" fontWeight="bold">{item.label}</text>
            <text x="85" y="13" fill="#64748B" fontSize="8" fontFamily="monospace">{item.hash}</text>
            <text x="204" y="13" fill={item.color} fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">{item.status}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** 2. Cyber Academy — Curriculum Dashboard & Learning Progress */
export function IllusNetwork() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 150)">
        {/* Background glow */}
        <circle cx="0" cy="0" r="110" className="fill-primary/10 blur-3xl" />
        
        {/* Main UI Console Window */}
        <rect x="-120" y="-85" width="240" height="170" rx="10" fill="#0E121B" stroke="#2563EB" strokeWidth="1.5" className="shadow-2xl" />
        
        {/* Header Bar */}
        <rect x="-120" y="-85" width="240" height="28" rx="10" fill="#161B26" />
        <rect x="-120" y="-65" width="240" height="8" fill="#161B26" />
        <line x1="-120" y1="-57" x2="120" y2="-57" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
        
        <text x="-106" y="-68" fill="#94A3B8" fontSize="9" fontFamily="monospace" fontWeight="bold">ACADEMY // CYBER DEFENSE 101</text>
        <text x="106" y="-68" fill="#60A5FA" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">85% COMPLETE</text>
        
        {/* Overall Progress Bar */}
        <g transform="translate(-106, -45)">
          <rect x="0" y="0" width="212" height="8" rx="4" fill="#1E293B" />
          <motion.rect 
            x="0" y="0" height="8" rx="4" fill="#3B82F6"
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </g>
        
        {/* Module List Items */}
        {[
          { title: "01. Networking & PCAP Analysis", status: "COMPLETED", color: "#10B981", active: false },
          { title: "02. Memory Forensics & RAM", status: "IN PROGRESS", color: "#3B82F6", active: true },
          { title: "03. Reverse Engineering Malware", status: "LOCKED", color: "#64748B", active: false }
        ].map((m, i) => (
          <g key={i} transform={`translate(-106, ${-25 + i * 32})`}>
            <rect 
              x="0" y="0" width="212" height="26" rx="5" 
              fill={m.active ? "#1E293B" : "#131824"} 
              stroke={m.active ? "#3B82F6" : "#2563EB"} 
              strokeOpacity={m.active ? "0.8" : "0.2"}
              strokeWidth="1.2" 
            />
            
            {/* Status Dot / Checkmark */}
            <circle cx="14" cy="13" r="5" fill={m.color} fillOpacity={m.active ? "1" : "0.8"} />
            {m.color === "#10B981" && (
              <path d="M11.5 13 L13.5 15 L16.5 11" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            )}
            
            <text x="28" y="16" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace" fontWeight={m.active ? "bold" : "normal"}>
              {m.title}
            </text>
            
            <text x="204" y="16" fill={m.color} fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              {m.status}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** 3. Simulation Lab — Live Attack Terminal & Console */
export function IllusPlay() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 150)">
        {/* Background glow */}
        <circle cx="0" cy="0" r="110" className="fill-danger/10 blur-3xl" />
        
        {/* Main UI Console Window */}
        <rect x="-120" y="-85" width="240" height="170" rx="10" fill="#0A0D14" stroke="#EF4444" strokeWidth="1.5" className="shadow-2xl" />
        
        {/* Window Title Bar */}
        <rect x="-120" y="-85" width="240" height="28" rx="10" fill="#141923" />
        <rect x="-120" y="-65" width="240" height="8" fill="#141923" />
        <line x1="-120" y1="-57" x2="120" y2="-57" stroke="#EF4444" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Mac-style Window Controls */}
        <circle cx="-104" cy="-71" r="3.5" fill="#EF4444" />
        <circle cx="-94" cy="-71" r="3.5" fill="#F59E0B" />
        <circle cx="-84" cy="-71" r="3.5" fill="#10B981" />
        
        <text x="-65" y="-68" fill="#94A3B8" fontSize="8" fontFamily="monospace" fontWeight="bold">LIVE_ATTACK_STREAM</text>
        
        {/* [HIGH RISK] Flashing Warning Badge top right */}
        <g transform="translate(45, -78)">
          <rect x="0" y="0" width="65" height="14" rx="3" fill="#EF4444" fillOpacity="0.25" stroke="#EF4444" strokeWidth="1" />
          <text x="32.5" y="10" fill="#F87171" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            ⚠ HIGH RISK
          </text>
        </g>
        
        {/* Command Line Prompt lines */}
        <g transform="translate(-106, -42)">
          <text x="0" y="10" fill="#38BDF8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">root@forenshield:~#</text>
          <text x="95" y="10" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace">analyze --live --interface=eth0</text>
          
          <text x="0" y="24" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">[ALERT]</text>
          <text x="40" y="24" fill="#FCA5A5" fontSize="8" fontFamily="monospace">DDoS SYN Flood detected from 192.168.1.104</text>
          
          <text x="0" y="38" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold">[WARN]</text>
          <text x="40" y="38" fill="#FDE047" fontSize="8" fontFamily="monospace">Unauthorized SSH brute-force attempt logged</text>
          
          <text x="0" y="52" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">[ACTION]</text>
          <text x="45" y="52" fill="#6EE7B7" fontSize="8" fontFamily="monospace">Isolating target host & capturing dump...</text>
        </g>
        
        {/* Pulsing Signal Waveform Box at bottom */}
        <g transform="translate(-106, 22)">
          <rect x="0" y="0" width="212" height="50" rx="5" fill="#111827" stroke="#EF4444" strokeOpacity="0.3" strokeWidth="1" />
          
          {/* Attack Signal Waveform */}
          <motion.path 
            d="M 10 25 L 40 25 L 50 10 L 60 40 L 75 15 L 90 35 L 105 25 L 130 25 L 140 5 L 150 45 L 165 25 L 202 25" 
            fill="none" 
            stroke="#EF4444" 
            strokeWidth="1.8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </g>
      </g>
    </svg>
  );
}

/** 4. Timeline View — Attack Reconstruction Dashboard */
export function IllusDashboard() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 150)">
        {/* Background glow */}
        <circle cx="0" cy="0" r="110" className="fill-primary/10 blur-3xl" />
        
        {/* Main UI Console Window */}
        <rect x="-120" y="-85" width="240" height="170" rx="10" fill="#0E121B" stroke="#2563EB" strokeWidth="1.5" className="shadow-2xl" />
        
        {/* Window Title Bar */}
        <rect x="-120" y="-85" width="240" height="28" rx="10" fill="#161B26" />
        <rect x="-120" y="-65" width="240" height="8" fill="#161B26" />
        <line x1="-120" y1="-57" x2="120" y2="-57" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Mac-style Window Controls */}
        <circle cx="-104" cy="-71" r="3.5" fill="#EF4444" />
        <circle cx="-94" cy="-71" r="3.5" fill="#F59E0B" />
        <circle cx="-84" cy="-71" r="3.5" fill="#10B981" />
        
        <text x="-65" y="-68" fill="#94A3B8" fontSize="9" fontFamily="monospace" fontWeight="bold">TIMELINE // RECONSTRUCTION</text>
        
        {/* Attack Events List */}
        <g transform="translate(-106, -42)">
          {[
            { time: "14:02:01", event: "Initial Phishing Vector", risk: "CRITICAL", color: "#EF4444" },
            { time: "14:02:45", event: "LSASS Process Injected", risk: "HIGH", color: "#F59E0B" },
            { time: "14:03:12", event: "C2 Uplink Established", risk: "HIGH", color: "#F59E0B" }
          ].map((row, i) => (
            <g key={i} transform={`translate(0, ${i * 22})`}>
              <rect x="0" y="0" width="212" height="18" rx="4" fill="#161C2A" stroke="#2563EB" strokeOpacity="0.2" strokeWidth="1" />
              <text x="6" y="12" fill="#60A5FA" fontSize="8" fontFamily="monospace" fontWeight="bold">{row.time}</text>
              <text x="55" y="12" fill="#F8FAFC" fontSize="8" fontFamily="monospace">{row.event}</text>
              <text x="206" y="12" fill={row.color} fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">{row.risk}</text>
            </g>
          ))}
        </g>
        
        {/* Telemetry Bar Chart Box */}
        <g transform="translate(-106, 28)">
          <rect x="0" y="0" width="212" height="44" rx="5" fill="#131824" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
          
          <g transform="translate(16, 34)">
            {[30, 50, 25, 75, 40, 90, 60, 80].map((h, i) => {
              const isHighlight = i === 5 || i === 3;
              return (
                <g key={i} transform={`translate(${i * 24}, 0)`}>
                  <rect x="0" y="-26" width="12" height="26" rx="2" fill="#1E293B" />
                  <motion.rect 
                    x="0" y={-h * 0.28} width="12" height={h * 0.28} rx="2" 
                    fill={isHighlight ? "#F59E0B" : "#3B82F6"}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  />
                </g>
              );
            })}
          </g>
        </g>
      </g>
    </svg>
  );
}

/** 5. Mission Control — Track XP, Rank & Achievements */
export function IllusReports() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g transform="translate(200, 150)">
        {/* Background glow */}
        <circle cx="0" cy="0" r="110" className="fill-primary/10 blur-3xl" />
        
        {/* Main UI Console Window */}
        <rect x="-120" y="-85" width="240" height="170" rx="10" fill="#0E121B" stroke="#2563EB" strokeWidth="1.5" className="shadow-2xl" />
        
        {/* Window Title Bar */}
        <rect x="-120" y="-85" width="240" height="28" rx="10" fill="#161B26" />
        <rect x="-120" y="-65" width="240" height="8" fill="#161B26" />
        <line x1="-120" y1="-57" x2="120" y2="-57" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Mac-style Window Controls */}
        <circle cx="-104" cy="-71" r="3.5" fill="#EF4444" />
        <circle cx="-94" cy="-71" r="3.5" fill="#F59E0B" />
        <circle cx="-84" cy="-71" r="3.5" fill="#10B981" />
        
        <text x="-65" y="-68" fill="#94A3B8" fontSize="9" fontFamily="monospace" fontWeight="bold">MISSION_CONTROL // PROFILE</text>
        
        {/* Rank & XP Card Top Box */}
        <g transform="translate(-106, -44)">
          <rect x="0" y="0" width="212" height="42" rx="6" fill="#161C2A" stroke="#3B82F6" strokeOpacity="0.4" strokeWidth="1" />
          
          <text x="10" y="15" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">AGENT RANK</text>
          <text x="10" y="30" fill="#60A5FA" fontSize="10" fontFamily="monospace" fontWeight="bold">LVL 12 · INVESTIGATOR</text>
          
          <text x="202" y="15" fill="#94A3B8" fontSize="7.5" fontFamily="monospace" textAnchor="end">TOTAL XP</text>
          <text x="202" y="30" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">2,450 XP</text>
        </g>
        
        {/* Level XP Progress Bar */}
        <g transform="translate(-106, 6)">
          <rect x="0" y="0" width="212" height="8" rx="4" fill="#1E293B" />
          <motion.rect 
            x="0" y="0" height="8" rx="4" fill="#F59E0B"
            initial={{ width: 0 }}
            whileInView={{ width: 170 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </g>
        
        {/* Performance Trend Chart Box */}
        <g transform="translate(-106, 22)">
          <rect x="0" y="0" width="212" height="50" rx="6" fill="#131824" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" />
          
          {/* Trend Line Path */}
          <motion.path 
            d="M 12 38 L 45 28 L 80 34 L 115 15 L 150 22 L 196 8" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          />
          
          <motion.circle 
            cx="196" cy="8" r="3.5" fill="#F59E0B"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
          />
        </g>
      </g>
    </svg>
  );
}
