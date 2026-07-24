export interface ModuleDetail {
  overview: string;
  features: string[];
  skills: string[];
}

export const MODULE_DETAILS: Record<string, ModuleDetail> = {
  "Cyber Academy": {
    overview: "Master the fundamentals of cyber defense through interactive, scenario-based learning modules. Build your foundational knowledge before facing live attacks.",
    features: [
      "Interactive learning modules",
      "Scenario-based knowledge checks",
      "Networking & Web Security basics",
      "Command-line fundamentals",
      "Progress tracking and certification",
    ],
    skills: ["Networking Basics", "Web Security", "Linux Essentials", "Cryptography"],
  },
  "Simulation Lab": {
    overview: "Face real-world attack scenarios in a gamified environment. Make critical decisions under pressure, execute commands in a live console, and earn XP based on your response effectiveness.",
    features: [
      "Live attack simulations",
      "Decision-based gameplay with consequences",
      "Real-time terminal console",
      "Objective tracking and scoring",
      "XP rewards and leaderboard",
    ],
    skills: ["Incident Response", "Decision Making", "Command Line", "Threat Containment"],
  },
  "Investigation Lab": {
    overview: "A professional-grade digital forensics workspace. Analyze disk images, memory dumps, network captures, and email artifacts with hex inspection, hash verification, and chain of custody tracking.",
    features: [
      "Hex editor with pattern highlighting",
      "SHA-256 hash verification",
      "Chain of custody tracking",
      "Artifact correlation engine",
      "Evidence board with drag-and-drop",
    ],
    skills: ["Digital Forensics", "Evidence Analysis", "Hash Verification", "Incident Response"],
  },
  "Timeline View": {
    overview: "Reconstruct the full attack narrative with an interactive timeline. Filter by event type, zoom into specific time ranges, and correlate network, endpoint, and authentication events.",
    features: [
      "Multi-layer event correlation",
      "Time-range selection and zoom",
      "Filter by Network, Endpoint, Auth, Files",
      "Visual attack progression",
      "Event detail inspection",
    ],
    skills: ["Attack Reconstruction", "Log Analysis", "Event Correlation", "Threat Hunting"],
  },
  "Mission Control": {
    overview: "Track your career progression as a cyber defender. View your rank, manage your current streak, and show off the badges you've earned across all academy lessons and investigations.",
    features: [
      "Global leaderboard rankings",
      "XP and level progression",
      "Daily activity streaks",
      "Achievement badge showcase",
      "Performance analytics",
    ],
    skills: ["Continuous Learning", "Threat Intelligence", "Leadership", "Team Defense"],
  },
};
