"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Calendar,
  Layout,
  Smartphone,
  Globe,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useTouch } from "../common/hooks/use-touch";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  features?: string[];
  progress?: number;
  href?: string;
  tag: string;
  isRedacted?: boolean;
}

function ProjectCard({
  id,
  title,
  subtitle,
  date,
  description,
  features,
  progress,
  href,
  tag,
  isRedacted,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useTouch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      tabIndex={0} // keyboard focus
      className="project-card group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-6 sm:p-8 hover:border-accent-cyan/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors flex flex-col justify-between min-h-[420px] overflow-hidden rounded-none opacity-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-24 opacity-[0.02] pointer-events-none" />

      {isRedacted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 -rotate-12 z-0 text-center">
          <span className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-100 uppercase font-mono">
            REDACTED
          </span>
        </div>
      )}

      <div className="relative z-10 text-left">
        <div className="flex justify-between items-center mb-6 sm:mb-8 font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <span>PRJ_{id}</span>
            <span className="text-zinc-800">{`//`}</span>
            <span className="flex items-center gap-1.5 text-left">
              <Calendar className="w-2.5 h-2.5" />
              {date}
            </span>
          </div>
          <div className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/50 text-[8px] text-zinc-400 uppercase">
            {tag}
          </div>
        </div>

        <div className="mb-4">
          <h3
            className={cn(
              "text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none",
              isRedacted ? "text-zinc-600" : "text-zinc-100",
            )}
          >
            {title}
          </h3>
          <div className="text-accent-cyan/60 font-mono text-[9px] tracking-[0.2em] mt-1 uppercase flex items-center gap-2">
            {tag.includes("MOBILE") ? (
              <Smartphone className="w-3 h-3" />
            ) : (
              <Globe className="w-3 h-3" />
            )}
            <strong>{subtitle}</strong>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-zinc-400 font-mono leading-relaxed uppercase tracking-tight mb-4 line-clamp-3">
          {description}
        </p>

        {features && (
          <ul className="text-[9px] text-zinc-500 font-mono leading-relaxed space-y-1.5 uppercase tracking-tight border-t border-zinc-800/40 pt-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-accent-cyan/40 font-bold shrink-0">
                  {">"}
                </span>
                <span className="line-clamp-2">{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 sm:mt-8 relative z-10 flex flex-col justify-end gap-4">
        {progress !== undefined && (
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em] w-full">
            <div className="flex justify-between mb-1 sm:mb-1.5 text-left">
              <span>Status: In Progress</span>
              <span className="text-accent-cyan font-bold">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-zinc-800/30 rounded-none overflow-hidden border border-zinc-800/20">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(137,180,250,0.3)] transition-all duration-1000 ease-out"
              />
            </div>
          </div>
        )}

        {href && href !== "#" ? (
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-accent-cyan/80 tracking-[0.3em] hover:text-white transition-colors uppercase group/btn w-fit"
          >
            <span className="border-b border-accent-cyan/20 group-hover/btn:border-white pb-0.5 transition-colors uppercase">
              View Project
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <div className="h-[14px]" />
        )}
      </div>
    </motion.div>
  );
}

export function ProjectMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects: ProjectCardProps[] = [
    {
      id: "01",
      title: "UltraControle",
      subtitle: "Inspection System",
      date: "Oct 2024 – Feb 2025",
      tag: "Production",
      href: "https://ultracontrole.ma/fr",
      description:
        "Enterprise inspection platform handling multi-region complexity and real-time visit monitoring with reactive state management.",
      features: [
        "Multi-tenant UI Architecture",
        "Reactive Visit Orchestration",
        "WebSocket Integration",
        "MA/FR Multi-language Kernel",
      ],
    },
    {
      id: "02",
      title: "SavorScan",
      subtitle: "Restaurant SaaS",
      date: "2024 – Present",
      tag: "SaaS Product",
      href: "https://savor-scan.vercel.app/en/",
      description:
        "Digital QR-code menu engine focusing on high-performance content delivery and seamless hospitality management.",
      features: [
        "QR Code Dynamic Routing",
        "Vercel Edge Distribution",
        "Atomic Design System",
        "Optimized Mobile UI",
      ],
    },
    {
      id: "03",
      title: "Fasgo Platform",
      subtitle: "Internal Back-office",
      date: "2025 – Development",
      tag: "Infrastructure",
      description:
        "Mission-critical administrative portal orchestrating complex internal logistics with advanced real-time data filtering and RBAC.",
      features: [
        "Frontend Team Leadership",
        "Advanced Data Filtering",
        "Cloudflare Protected Edge",
        "Strict TypeScript Schemas",
      ],
    },
    {
      id: "04",
      title: "Postuly Engine",
      subtitle: "HR Workflow SaaS",
      date: "2025 – Development",
      tag: "Workflow Engine",
      progress: 65,
      description:
        "SaaS recruitment engine optimizing candidate screening through intelligent filtering and workflow phase synchronization.",
      features: [
        "Frontend Lead Architecture",
        "Phase Synchronization Logic",
        "UI System Performance",
        "Docker-ready Environment",
      ],
    },
    {
      id: "05",
      title: "SwiftShoe",
      subtitle: "E-commerce System",
      date: "Aug 2024 – Oct 2024",
      tag: "Mobile App",
      href: "https://github.com/nightfall-storm/SwiftShoe",
      description:
        "Complete mobile e-commerce ecosystem for footwear. Features secure user authentication, real-time product catalogs, and a streamlined mobile checkout experience.",
      features: [
        "Flutter & GetX Framework",
        "Firebase Secure Authentication",
        "MVVM Architectural Pattern",
        "Cloud Firestore Sync",
      ],
    },
    {
      id: "06",
      title: "LightTasks",
      subtitle: "UX & Productivity",
      date: "Jul 2024 – Aug 2024",
      tag: "Mobile App",
      href: "https://github.com/nightfall-storm/LightTasks",
      description:
        "Intuitive task management application built with a focus on simplicity and user experience. Provides offline-first capabilities with reliable local data persistence.",
      features: [
        "Flutter & Dart UI Engine",
        "Hive Offline Database",
        "Clean UI/UX Principles",
        "Productivity Sync Logic",
      ],
    },
    {
      id: "07",
      title: "Registration Dashboard",
      subtitle: "Data Supervision",
      date: "Apr 2024 – May 2024",
      tag: "PHP Dashboard",
      href: "https://github.com/nightfall-storm/Gestion-inscription",
      description:
        "Secure administrative portal for user registration and academic supervision. Designed to provide clear data oversight and role-based access control for institutional use.",
      features: [
        "PHP & MySQL Secure Kernel",
        "Role-based Permissions",
        "jQuery Data Interaction",
        "Management Log System",
      ],
    },
    {
      id: "08",
      title: "Mobile Suite",
      subtitle: "Android Utilities",
      date: "Sep 2023 – Mar 2024",
      tag: "Mobile App",
      href: "https://github.com/nightfall-storm/WeatherApp",
      description:
        "A collection of native Android applications showcasing mobile engineering fundamentals, including real-time weather integration and food ordering systems.",
      features: [
        "Kotlin & Java Native Development",
        "REST API Consumption",
        "Fragment-based Layouts",
        "Stable Release Version",
      ],
    },
    {
      id: "09",
      title: "Utility Labs",
      subtitle: "Micro-applications",
      date: "2024 Collection",
      tag: "Mobile Apps",
      href: "https://github.com/nightfall-storm/TipCalculatorApp",
      description:
        "Suite of focused mobile utilities including specialized calculators and notification schedulers built to solve specific daily tasks with efficient code.",
      features: [
        "Notification Orchestrator",
        "Logic-driven Calculators",
        "Modular System Design",
        "Open Source Repository",
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1400px] mx-auto px-6 py-20 sm:py-32 text-left"
      id="projects"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-12 sm:mb-16 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2">
            <Layout className="w-3.5 h-3.5" /> Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase">
            Featured Projects
          </h2>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase">
          Archive <span className="text-zinc-800 mx-3">{`//`}</span> Status:
          Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
