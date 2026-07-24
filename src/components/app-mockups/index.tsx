import { type ReactNode } from "react";
import {
  Shield,
  ShieldCheck,
  Radar,
  Wifi,
  Battery,
  Signal,
  Home,
  FolderOpen,
  GraduationCap,
  User,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  BookOpen,
  BarChart3,
  FileText,
  Eye,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
  Lock,
  Download,
  Share2,
  ChevronDown,
  Activity,
  FileSearch,
  Globe,
  Database,
  Crosshair,
  Mail,
  Bug
} from "lucide-react";

/* =============================================================
   MOCKUP CONTAINER
   ============================================================= */
function MockupContainer({ children, hideNav = false, activeTab = "home" }: { children: ReactNode, hideNav?: boolean, activeTab?: string }) {
  return (
    <div className="relative w-[360px] h-[780px] bg-background border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-2xl shrink-0 pointer-events-auto text-left group/mockup">
      {/* Status Bar */}
      <div className="absolute top-0 inset-x-0 h-12 z-20 flex items-center justify-between px-6 pointer-events-none">
        <div className="text-white font-medium text-[13px] tracking-tight">9:41</div>
        <div className="flex items-center gap-1.5 text-white">
          <Signal className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-[18px] w-[18px]" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-surface">
        {/* Subtle ambient light */}
        <div className="absolute top-0 inset-x-0 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
        {children}
      </div>

      {/* Bottom Nav */}
      {!hideNav && (
        <div className="h-20 bg-background/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 pb-4 z-20 shrink-0">
          <NavItem icon={Home} label="Dashboard" active={activeTab === "home"} />
          <NavItem icon={FolderOpen} label="Cases" active={activeTab === "cases"} />
          <NavItem icon={GraduationCap} label="Academy" active={activeTab === "academy"} />
          <NavItem icon={User} label="Profile" active={activeTab === "profile"} />
        </div>
      )}
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 ${active ? "text-primary" : "text-muted-foreground hover:text-white"}`}>
      <Icon className={`h-5 w-5 ${active ? "fill-primary/20" : ""}`} />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </div>
  );
}

/* =============================================================
   1. MISSION CONTROL DASHBOARD
   ============================================================= */
export function MissionControlScreen() {
  return (
    <MockupContainer activeTab="home">
      <div className="pt-16 pb-6 px-5 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white font-display font-bold text-2xl">Mission Control</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, Investigator.</p>
        </div>

        {/* Active Case Card (Adapted from hero) */}
        <div className="glass-strong rounded-2xl p-5 border border-primary/30 relative overflow-hidden group/card cursor-pointer hover:border-primary active:scale-[0.98] transition-all duration-300">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-danger/10 border border-danger/20 text-danger px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold mb-2">
                <AlertTriangle className="h-3 w-3" /> Critical
              </div>
              <h2 className="text-white font-display font-bold text-lg leading-tight">Operation<br/>Midnight Drop</h2>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Case ID</div>
              <div className="text-primary font-mono text-xs">#0421</div>
            </div>
          </div>
          
          <div className="space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Investigation Progress</span>
              <span className="text-primary">67%</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-primary w-[67%] rounded-full relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-black/20 rounded-lg p-2.5 border border-white/5 flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              <div className="min-w-0">
                <div className="text-[10px] text-muted-foreground font-mono truncate">THREAT LEVEL</div>
                <div className="text-white text-xs font-bold truncate">Severe</div>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2.5 border border-white/5 flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <div className="min-w-0">
                <div className="text-[10px] text-muted-foreground font-mono truncate">EVIDENCE</div>
                <div className="text-white text-xs font-bold truncate">12 Files</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatChip icon={Zap} label="XP" value="2,450" />
          <StatChip icon={CheckCircle2} label="Solved" value="14" />
          <StatChip icon={Clock} label="Streak" value="5 Days" />
        </div>

        {/* Recent Cases */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-display font-bold text-sm">Recent Cases</h3>
            <span className="text-primary text-xs font-medium cursor-pointer hover:text-white transition-colors">View All</span>
          </div>
          <div className="space-y-3">
            <RecentCaseRow title="UPI Fraud Ring" status="Closed" time="2h ago" />
            <RecentCaseRow title="Ransomware Payload" status="In Progress" time="1d ago" />
          </div>
        </div>
      </div>
    </MockupContainer>
  );
}

function StatChip({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="glass rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center cursor-default hover:bg-white/5 transition-colors">
      <Icon className="h-4 w-4 text-primary mb-1.5" />
      <div className="text-white font-bold text-sm leading-none mb-1">{value}</div>
      <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{label}</div>
    </div>
  );
}

function RecentCaseRow({ title, status, time }: { title: string, status: string, time: string }) {
  const isClosed = status === "Closed";
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:scale-[0.98] transition-all">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${isClosed ? "bg-white/10 text-white" : "bg-primary/20 text-primary"}`}>
          <FolderOpen className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-white text-sm font-medium truncate">{title}</div>
          <div className="text-xs text-muted-foreground truncate">{time}</div>
        </div>
      </div>
      <div className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wide border shrink-0 ml-2 ${isClosed ? "bg-white/5 text-muted-foreground border-white/10" : "bg-primary/10 text-primary border-primary/20"}`}>
        {status}
      </div>
    </div>
  );
}

/* =============================================================
   2. INVESTIGATION CASE DETAILS
   ============================================================= */
export function CaseDetailsScreen() {
  return (
    <MockupContainer activeTab="cases">
      <div className="pt-16 pb-32 px-5 space-y-6">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-danger/10 border border-danger/20 text-danger px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold mb-2">
            <AlertTriangle className="h-3 w-3" /> Critical
          </div>
          <h1 className="text-white font-display font-bold text-2xl leading-tight">UPI Fraud<br/>Investigation</h1>
          <div className="flex items-center gap-3 mt-3 text-xs">
            <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded border border-primary/20">ID #0421</span>
            <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Started 2d ago</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-white/10 pb-0 gap-6">
          <div className="text-primary font-medium text-sm pb-3 border-b-2 border-primary">Overview</div>
          <div className="text-muted-foreground font-medium text-sm pb-3 border-b-2 border-transparent">Evidence</div>
          <div className="text-muted-foreground font-medium text-sm pb-3 border-b-2 border-transparent">Timeline</div>
        </div>

        {/* Content */}
        <div className="space-y-6 relative z-10">
          <div className="glass rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-display font-bold text-sm mb-2">Case Summary</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Multiple anomalous transactions reported originating from IP addresses outside the user's typical geographic location. Preliminary network logs suggest a potential man-in-the-middle attack vector.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 glass rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
              <User className="h-4 w-4 text-primary mb-1.5" />
              <div className="text-white font-bold text-xs">J. Doe</div>
              <div className="text-[9px] text-muted-foreground font-mono uppercase">Assigned</div>
            </div>
            <div className="flex-1 glass rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
              <Database className="h-4 w-4 text-primary mb-1.5" />
              <div className="text-white font-bold text-xs">12 Files</div>
              <div className="text-[9px] text-muted-foreground font-mono uppercase">Collected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="absolute bottom-20 inset-x-0 p-5 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none">
        <button className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl shadow-[0_0_20px_oklch(0.55_0.22_260/0.4)] flex items-center justify-center gap-2 pointer-events-auto active:scale-[0.98] transition-transform">
          Continue Investigation <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </MockupContainer>
  );
}

/* =============================================================
   3. EVIDENCE BOARD
   ============================================================= */
export function EvidenceBoardScreen() {
  const evidences = [
    { name: "Email Headers", type: "Network", count: 3, status: "Flagged", icon: Mail, pulse: false },
    { name: "IP Routing Logs", type: "Logs", count: 12, status: "Analyzing", icon: Globe, pulse: true },
    { name: "Malware Sample", type: "Binary", count: 1, status: "Verified", icon: Bug, pulse: false },
    { name: "Browser History", type: "Local", count: 45, status: "Flagged", icon: FileText, pulse: false },
  ];

  return (
    <MockupContainer activeTab="cases">
      <div className="pt-16 pb-6 px-5 space-y-6">
        <div>
          <h1 className="text-white font-display font-bold text-2xl">Evidence Board</h1>
          <p className="text-muted-foreground text-sm mt-1">4 items collected</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {evidences.map((ev, i) => (
            <div key={i} className="glass rounded-xl p-4 border border-white/10 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all hover:border-primary/50">
              <div className="absolute top-3 right-3 text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wide border">
                {ev.status === "Analyzing" ? (
                  <span className="flex items-center gap-1 text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                    {ev.status}
                  </span>
                ) : ev.status === "Flagged" ? (
                  <span className="text-danger">{ev.status}</span>
                ) : (
                  <span className="text-muted-foreground">{ev.status}</span>
                )}
              </div>
              <ev.icon className="h-6 w-6 text-primary mb-3 mt-1" />
              <div className="text-white font-bold text-sm mb-1 leading-tight">{ev.name}</div>
              <div className="text-[10px] text-muted-foreground">{ev.count} {ev.count === 1 ? "File" : "Files"} • {ev.type}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupContainer>
  );
}

/* =============================================================
   4. DIGITAL TIMELINE
   ============================================================= */
export function TimelineScreen() {
  const events = [
    { time: "09:14:22", title: "Phishing Email Delivered", detail: "user@corp.com", icon: Mail },
    { time: "09:42:05", title: "Payload Executed", detail: "invoice_pdf.exe", icon: Bug },
    { time: "10:15:33", title: "Lateral Movement", detail: "RDP to 192.168.1.45", icon: Globe },
    { time: "11:03:12", title: "Data Exfiltration", detail: "4.2GB via port 443", icon: AlertTriangle, active: true },
  ];

  return (
    <MockupContainer activeTab="cases">
      <div className="pt-16 pb-6 px-5 space-y-6">
        <div>
          <h1 className="text-white font-display font-bold text-2xl">Digital Timeline</h1>
          <p className="text-muted-foreground text-sm mt-1">Chronological sequence</p>
        </div>

        <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-white/10 before:to-transparent mt-8">
          {events.map((ev, i) => (
            <div key={i} className="relative group cursor-pointer">
              <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_8px_oklch(0.55_0.22_260/0.6)] z-10 flex items-center justify-center">
                {ev.active && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />}
              </div>
              <div className={`glass rounded-xl p-4 border transition-all ${ev.active ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-white/30"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <ev.icon className={`h-4 w-4 ${ev.active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{ev.time}</span>
                </div>
                <div className="text-white font-bold text-sm">{ev.title}</div>
                {ev.active && (
                  <div className="mt-3 text-xs text-muted-foreground bg-black/20 p-2 rounded-lg border border-white/5">
                    <span className="text-primary font-mono bg-primary/10 px-1 rounded mr-1">T1048</span>
                    Exfiltration Over Alternative Protocol
                    <div className="mt-2 text-[10px] font-mono break-all text-white/70">{ev.detail}</div>
                  </div>
                )}
                {!ev.active && (
                  <div className="text-xs text-muted-foreground mt-1">{ev.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupContainer>
  );
}

/* =============================================================
   5. CYBER ACADEMY
   ============================================================= */
export function AcademyScreen() {
  const modules = [
    { title: "Networking Basics", progress: 75, icon: Globe },
    { title: "Web Security", progress: 60, icon: Lock },
    { title: "Linux Essentials", progress: 0, icon: Settings },
  ];

  return (
    <MockupContainer activeTab="academy">
      <div className="pt-16 pb-6 px-5 space-y-6">
        <div>
          <h1 className="text-white font-display font-bold text-2xl">Cyber Academy</h1>
          <p className="text-muted-foreground text-sm mt-1">Master forensic concepts.</p>
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-5 shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.4)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform border border-primary/20">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
          <div className="text-[10px] font-mono uppercase tracking-widest mb-1 opacity-80">Continue Learning</div>
          <h3 className="font-display font-bold text-lg mb-4">Networking Basics</h3>
          <div className="flex items-center gap-3 relative z-10">
            <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[75%]" />
            </div>
            <span className="text-xs font-bold">75%</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-display font-bold text-sm mb-3">All Modules</h3>
          <div className="space-y-3">
            {modules.map((m, i) => (
              <div key={i} className="glass rounded-xl p-4 border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/5 active:scale-[0.98] transition-all">
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <m.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm mb-1">{m.title}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{m.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupContainer>
  );
}

/* =============================================================
   6. REPORTS & ANALYTICS
   ============================================================= */
export function ReportsScreen() {
  return (
    <MockupContainer hideNav>
      {/* Custom Header for Reports */}
      <div className="absolute top-12 inset-x-0 h-14 border-b border-white/10 bg-background/80 backdrop-blur-xl z-20 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 text-white">
          <ChevronRight className="h-5 w-5 rotate-180" />
          <span className="font-medium text-sm">Case #0421</span>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <Download className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="pt-32 pb-6 px-5 space-y-6">
        <div className="text-center">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-white font-display font-bold text-xl">Executive Summary</h1>
          <p className="text-muted-foreground text-xs mt-2 max-w-[280px] mx-auto leading-relaxed">
            Forensic analysis confirms unauthorized access via compromised credentials. Data exfiltration detected over port 443.
          </p>
        </div>

        <div className="glass rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-display font-bold text-sm mb-3">Key Findings</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Crosshair className="h-4 w-4 text-danger mt-0.5 shrink-0" />
              <span className="text-xs text-white leading-relaxed">Initial Access: Valid Accounts (T1078) via phishing campaign.</span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="h-4 w-4 text-warning mt-0.5 shrink-0" />
              <span className="text-xs text-white leading-relaxed">Lateral Movement: RDP connections to critical internal servers.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-xs text-white leading-relaxed">Remediation: Credentials revoked, malicious IP blocked at firewall.</span>
            </li>
          </ul>
        </div>

        <div className="glass rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-display font-bold text-sm mb-3">Evidence Distribution</h3>
          {/* Simple Chart Mockup */}
          <div className="flex items-end gap-2 h-24 mb-2">
            {[40, 70, 30, 90, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-muted-foreground uppercase">
            <span>Net</span>
            <span>Mem</span>
            <span>Disk</span>
            <span>Log</span>
            <span>Reg</span>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
}

/* =============================================================
   7. PROFILE & SETTINGS
   ============================================================= */
export function ProfileScreen() {
  return (
    <MockupContainer activeTab="profile">
      <div className="pt-20 pb-6 px-5 space-y-8">
        {/* User Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-muted-foreground overflow-hidden">
              <User className="h-10 w-10" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-background shadow-lg">
              Lvl 12
            </div>
          </div>
          <h1 className="text-white font-display font-bold text-xl">Alex Hunter</h1>
          <p className="text-primary font-mono text-xs mt-1">Security Analyst II</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 border-y border-white/10 py-4">
          <div className="text-center">
            <div className="text-white font-bold text-lg">24</div>
            <div className="text-[9px] text-muted-foreground font-mono uppercase">Cases</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">3</div>
            <div className="text-[9px] text-muted-foreground font-mono uppercase">Certs</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">8</div>
            <div className="text-[9px] text-muted-foreground font-mono uppercase">Streak</div>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          <h3 className="text-white font-display font-bold text-sm mb-3 px-1">Settings</h3>
          {[
            { icon: Bell, label: "Notifications" },
            { icon: Lock, label: "Privacy & Security" },
            { icon: Eye, label: "Appearance" },
            { icon: BookOpen, label: "Help & Documentation" },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <s.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-white text-sm font-medium">{s.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
          <div className="flex items-center justify-between p-3 rounded-xl bg-danger/10 border border-danger/20 hover:bg-danger/20 cursor-pointer transition-colors mt-4">
            <div className="flex items-center gap-3 text-danger">
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-bold">Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
}
