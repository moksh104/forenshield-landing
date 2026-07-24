import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Mail,
  Globe,
  Bug,
  FileSearch,
  BookOpen,
  FlaskConical,
  FolderOpen,
  Wifi,
  AlertTriangle,
  Rocket,
  Layers,
  Target,
  Zap,
  Smartphone,
  GraduationCap,
  Play,
  Search,
  FileText,
  Trophy,
  X,
  ArrowRight,
  Github,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Star,
  ChevronDown,
  QrCode,
  ShoppingCart,
  Eye,
  Lock,
  User,
} from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import {
  IllusHacker,
  IllusNetwork,
  IllusDashboard,
  IllusPlay,
  IllusReports,
} from "@/components/landing/illustrations";
import logo from "@/assets/logo.webp";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/common/MagneticButton";
import { Logo } from "@/components/common/Logo";
import { Hero } from "@/components/landing/Hero";
import { HighlightsRow } from "@/components/landing/Highlights/HighlightsRow";
import { HowItWorks } from "@/components/landing/HowItWorks/HowItWorks";
import { PlatformModules } from "@/components/landing/PlatformModules";
import { CyberAcademySection } from "@/components/landing/CyberAcademySection";
import { DeviceShowcase } from "@/components/landing/DeviceShowcase/DeviceShowcase";
import { WorkflowStory } from "@/components/landing/Workflow/WorkflowStory";
import { FeaturesComparison } from "@/components/landing/Features/FeaturesComparison";
import { FinalCTA } from "@/components/landing/CTA/FinalCTA";
import { CursorGlow } from "@/components/landing/Ambient/CursorGlow";
import { AmbientBackdrop } from "@/components/landing/Ambient/AmbientBackdrop";
import { SpotlightRow } from "@/components/landing/Spotlight/SpotlightRow";
import { SimulationLabSection } from "@/components/landing/SimulationLab/SimulationLabSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ForenShield — Learn. Investigate. Defend." },
      {
        name: "description",
        content:
          "Interactive cybersecurity training and digital investigation platform. Solve real-world cyber incidents through hands-on forensics, simulations, and evidence analysis.",
      },
      { property: "og:title", content: "ForenShield — Learn. Investigate. Defend." },
      {
        property: "og:description",
        content:
          "Train like a defender. Think like an investigator. Master cybersecurity through immersive, hands-on cases.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased relative overflow-x-clip">
      <CursorGlow />
      <AmbientBackdrop />
      <Navbar />
      <main>
        <Hero />
        <HighlightsRow />
        <HowItWorks />
        <PlatformModules />
        <CyberAcademySection />
        <SimulationLabSection />
        <DeviceShowcase />
        <WorkflowStory />
        <SpotlightRow />
        <FeaturesComparison />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}





