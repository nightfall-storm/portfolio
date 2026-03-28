"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { ExternalLink, Calendar, Layout, Smartphone, Globe } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  isRedacted
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
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
      } as any}
      className="project-card group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-6 sm:p-8 hover:border-accent-cyan/40 transition-colors flex flex-col justify-between min-h-[420px] overflow-hidden rounded-none opacity-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(137,180,250,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-24 opacity-[0.015] pointer-events-none" />

      {isRedacted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] -rotate-12 z-0 text-center">
          <span className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-100 uppercase font-mono">REDACTED</span>
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
          <h3 className={cn(
            "text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none",
            isRedacted ? "text-zinc-600" : "text-zinc-100"
          )}>
            {title}
          </h3>
          <div className="text-accent-cyan/60 font-mono text-[9px] tracking-[0.2em] mt-1 uppercase flex items-center gap-2 text-left">
            {tag.includes("MOBILE") ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            {subtitle}
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-zinc-400 font-mono leading-relaxed uppercase tracking-tight mb-6 text-left">
          {description}
        </p>

        {features && (
          <ul className="text-[9px] text-zinc-500 font-mono leading-relaxed space-y-1.5 uppercase tracking-tight text-left border-t border-zinc-800/40 pt-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-left">
                <span className="text-accent-cyan/30 font-bold shrink-0">{">"}</span> 
                <span className="line-clamp-1 text-left">{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 sm:mt-10 relative z-10 text-left min-h-[40px] flex flex-col justify-end gap-6">
        {progress !== undefined && (
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em] w-full">
            <div className="flex justify-between mb-2 sm:mb-2.5 text-left">
              <span>STATUS: IN_PHASE</span>
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
            <span className="border-b border-accent-cyan/20 group-hover/btn:border-white pb-0.5 transition-colors uppercase text-left">EXECUTE_VIEW</span>
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
        { 
          y: 30, 
          opacity: 0 
        },
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
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full max-w-[1400px] mx-auto px-6 py-20 sm:py-32 text-left" id="projects">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-12 sm:mb-16 gap-4 text-left">
        <div className="flex flex-col gap-2 text-left">
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2 text-left">
            <Layout className="w-3.5 h-3.5" /> PROJECT_MANIFEST_V3
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase text-left">PROJECTS_&_LABS</h2>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase text-left">
          STORAGE: CLOUD_SYNCED <span className="text-zinc-800 mx-3">{`//`}</span> REGISTRY: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
        <ProjectCard 
          id="01"
          title="ULTRA_CONTROLE"
          subtitle="INSPECTION_SYSTEM"
          date="2024_OCT_FEB"
          tag="INTERNSHIP"
          href="https://ultracontrole.ma/fr"
          description="Enterprise solution for automobile technical inspections. Developed a multi-language platform (MA/FR) with a specialized dashboard for appointment management and technical visit monitoring."
          features={[
            "MULTI_LANGUAGE_UI_ARCHITECTURE",
            "TECHNICAL_VISIT_ORCHESTRATION",
            "REALTIME_APPOINTMENT_LOGIC",
            "NEXTJS_SHADCN_TAILWIND_V4"
          ]}
        />

        <ProjectCard 
          id="02"
          title="SAVOR_SCAN"
          subtitle="RESTAURANT_SAAS"
          date="2024_ACTIVE"
          tag="WEB_APP"
          href="https://savor-scan.vercel.app/en/"
          description="Digital QR-code menu engine for the modern hospitality industry. Allows customers to browse menus instantly while providing owners with a robust management dashboard."
          features={[
            "QR_CODE_DYNAMIC_ROUTING",
            "MENU_MANAGEMENT_INTERFACE",
            "INTERACTIVE_USER_UX",
            "DEPLOYED_VIA_VERCEL_EDGE"
          ]}
        />

        <ProjectCard 
          id="03"
          title="FASGO_PLATFORM"
          subtitle="INTERNAL_BACKOFFICE"
          date="2025_DEVELOPMENT"
          tag="COMPANY_PROJECT"
          description="High-performance administrative portal built to orchestrate complex internal business operations and logistics with real-time data filtering and industrial-grade security."
          features={[
            "TEAM_LEAD_COORDINATION",
            "ADVANCED_DATA_VISUALIZATION",
            "CLOUDFLARE_PROTECTED_EDGE",
            "STRICT_TYPESCRIPT_SCHEMA"
          ]}
        />

        <ProjectCard 
          id="04"
          title="POSTULY_ENGINE"
          subtitle="HR_WORKFLOW_SAAS"
          date="2025_DEVELOPMENT"
          tag="COMPANY_PROJECT"
          progress={65}
          description="Automated recruitment platform designed to streamline high-volume hiring processes. Optimizes candidate screening through intelligent filtering and collaborative workflow tools."
          features={[
            "FRONTEND_LEAD_ARCHITECTURE",
            "RECRUITMENT_PHASE_SYNC",
            "UI_SYSTEM_OPTIMIZATION",
            "DOCKER_READY_ENVIRONMENT"
          ]}
        />

        <ProjectCard 
          id="05"
          title="SWIFTSHOE"
          subtitle="ECOMMERCE_SYSTEM"
          date="AUG_2024_OCT_2024"
          tag="MOBILE_APP"
          href="https://github.com/nightfall-storm/SwiftShoe"
          description="Complete mobile e-commerce ecosystem for footwear. Features secure user authentication, real-time product catalogs, and a streamlined mobile checkout experience."
          features={[
            "FLUTTER_GETX_FRAMEWORK",
            "FIREBASE_SECURE_AUTH",
            "MVVM_ARCHITECTURAL_PATTERN",
            "CLOUD_FIRESTORE_SYNC"
          ]}
        />

        <ProjectCard 
          id="06"
          title="LIGHTTASKS"
          subtitle="UX_PRODUCTIVITY"
          date="JUL_2024_AUG_2024"
          tag="MOBILE_APP"
          href="https://github.com/nightfall-storm/LightTasks"
          description="Intuitive task management application built with a focus on simplicity and user experience. Provides offline-first capabilities with reliable local data persistence."
          features={[
            "FLUTTER_DART_UI_ENGINE",
            "HIVE_OFFLINE_DATABASE",
            "CLEAN_UI_UX_PRINCIPLES",
            "PRODUCTIVITY_SYNC_LOGIC"
          ]}
        />

        <ProjectCard 
          id="07"
          title="REG_DASHBOARD"
          subtitle="DATA_SUPERVISION"
          date="APR_2024_MAY_2024"
          tag="PHP_DASHBOARD"
          href="https://github.com/nightfall-storm/Gestion-inscription"
          description="Secure administrative portal for user registration and academic supervision. Designed to provide clear data oversight and role-based access control for institutional use."
          features={[
            "PHP_MYSQL_SECURE_KERNEL",
            "ROLE_BASED_PERMISSIONS",
            "JQUERY_DATA_INTERACTION",
            "MANAGEMENT_LOG_SYSTEM"
          ]}
        />

        <ProjectCard 
          id="08"
          title="MOBILE_SUITE"
          subtitle="ANDROID_UTILITIES"
          date="SEP_2023_MAR_2024"
          tag="MOBILE_APP"
          href="https://github.com/nightfall-storm/WeatherApp"
          description="A collection of native Android applications showcasing mobile engineering fundamentals, including real-time weather integration and food ordering systems."
          features={[
            "KOTLIN_JAVA_NATIVE_DEV",
            "REST_API_CONSUMPTION",
            "FRAGMENT_BASED_LAYOUTS",
            "STABLE_RELEASE_VERSION"
          ]}
        />

        <ProjectCard 
          id="09"
          title="UTILITY_LABS"
          subtitle="MICRO_APPLICATIONS"
          date="2024_COLLECTION"
          tag="MOBILE_APPS"
          href="https://github.com/nightfall-storm/TipCalculatorApp"
          description="Suite of focused mobile utilities including specialized calculators and notification schedulers built to solve specific daily tasks with efficient code."
          features={[
            "NOTIFICATION_ORCHESTRATOR",
            "LOGIC_DRIVEN_CALCULATORS",
            "MODULAR_SYSTEM_DESIGN",
            "OPEN_SOURCE_REPOSITORY"
          ]}
        />
      </div>
    </section>
  );
}
