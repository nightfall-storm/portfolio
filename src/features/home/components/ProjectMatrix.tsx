"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Calendar, Layout, Smartphone, Globe } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "motion/react";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  features: string[];
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
  features, 
  progress, 
  href,
  tag,
  isRedacted
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
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
      className="group relative border border-zinc-800/40 bg-[#0c0d14]/40 p-6 sm:p-8 hover:border-accent-cyan/40 transition-colors flex flex-col justify-between min-h-[380px] overflow-hidden rounded-none"
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
            <span className="flex items-center gap-1.5">
              <Calendar className="w-2.5 h-2.5" />
              {date}
            </span>
          </div>
          <div className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/50 text-[8px] text-zinc-400">
            {tag}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className={`text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none ${isRedacted ? "text-zinc-600" : "text-zinc-100"}`}>
            {title}
          </h3>
          <div className="text-accent-cyan/60 font-mono text-[9px] tracking-[0.2em] mt-1 uppercase flex items-center gap-2">
            {tag.includes("MOBILE") ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            {subtitle}
          </div>
        </div>

        <ul className="text-[9px] sm:text-[10px] text-zinc-500 font-mono leading-relaxed space-y-1.5 sm:space-y-2 uppercase tracking-tight text-left">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-left">
              <span className="text-accent-cyan/30 font-bold shrink-0">{">"}</span> 
              <span className="line-clamp-2">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 sm:mt-10 relative z-10 text-left min-h-[40px] flex items-end">
        {progress !== undefined && (
          <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.3em] w-full">
            <div className="flex justify-between mb-2 sm:mb-2.5">
              <span>STATUS: IN_REFACTOR</span>
              <span className="text-accent-cyan font-bold">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-zinc-800/30 rounded-none overflow-hidden border border-zinc-800/20">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
                className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(137,180,250,0.3)]" 
              />
            </div>
          </div>
        )}
        {href && href !== "#" && (
          <Link 
            href={href} 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-accent-cyan/80 tracking-[0.3em] hover:text-white transition-colors uppercase group/btn"
          >
            <span className="border-b border-accent-cyan/20 group-hover/btn:border-white pb-0.5 transition-colors uppercase">EXECUTE_VIEW</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectMatrix() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-20 sm:py-32" id="projects">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/40 pb-6 mb-12 sm:mb-16 gap-4 text-left">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-cyan/50 tracking-[0.5em] uppercase flex items-center gap-2 text-left">
            <Layout className="w-3.5 h-3.5" /> PROJECT_MANIFEST_V3
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-100 uppercase text-left">PROJECTS_&_LABS</h2>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.4em] uppercase text-left">
          STORAGE: CLOUD_SYNCED <span className="text-zinc-800 mx-3">{`//`}</span> REGISTRY: ACTIVE
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <motion.div variants={item}>
          <ProjectCard 
            id="01"
            title="ULTRA_CONTROLE"
            subtitle="AUTOMOBILE_VISIT_SYS"
            date="2024_OCT_FEB"
            tag="INTERNSHIP"
            href="https://ultracontrole.ma"
            features={[
              "MULTI_LANGUAGE_UI_MA_FR",
              "TECHNICAL_VISIT_DASHBOARD",
              "APPOINTMENT_MGMT_SYSTEM",
              "NEXTJS_SHADCN_TAILWIND"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="02"
            title="SAVOR_SCAN"
            subtitle="RESTAURANT_DIGITAL_MENU"
            date="2024_ACTIVE"
            tag="WEB_APP"
            href="https://savor-scan.vercel.app/en/"
            features={[
              "DIGITAL_QR_MENU_SYSTEM",
              "MULTI_LANGUAGE_SUPPORT",
              "REALTIME_ORDER_READY_NOTIF",
              "RESTAURANT_DASHBOARD_V1"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="03"
            title="FASGO_PLATFORM"
            subtitle="BACKOFFICE_ORCHESTRATOR"
            date="2025_DEVELOPMENT"
            tag="COMPANY_PROJECT"
            features={[
              "NEXT.JS_16_APP_ROUTER",
              "SHADCN_UI_CUSTOM_THEME",
              "CI_CD_CLOUDFLARE_OPS",
              "TEAM_LEAD_FRONTEND"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="04"
            title="POSTULY_SAAS"
            subtitle="RECRUITMENT_ENGINE"
            date="2025_DEVELOPMENT"
            tag="COMPANY_PROJECT"
            progress={65}
            features={[
              "SCALABLE_UI_ARCHITECTURE",
              "HIGH_PERFORMANCE_DASHBOARD",
              "HETEROGENEOUS_DATA_SYNC",
              "LEAD_ENGINEERING_PHASE"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="05"
            title="SWIFTSHOE"
            subtitle="MOBILE_ECOMMERCE"
            date="AUG_2024_OCT_2024"
            tag="MOBILE_APP"
            href="https://github.com/nightfall-storm/SwiftShoe"
            features={[
              "FLUTTER_GETX_MVVM_ARCHITECTURE",
              "FIREBASE_AUTH_&_FIRESTORE",
              "REALTIME_DB_MANAGEMENT",
              "CLOUD_STORAGE_MEDIA_HANDLING"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="06"
            title="LIGHTTASKS"
            subtitle="TASK_MANAGEMENT_APP"
            date="JUL_2024_AUG_2024"
            tag="MOBILE_APP"
            href="https://github.com/nightfall-storm/LightTasks"
            features={[
              "FLUTTER_DART_UI_UX_FOCUSED",
              "HIVE_LOCAL_PERSISTENCE_SYNC",
              "CRUD_OPERATIONS_OPTIMIZED",
              "OFFLINE_FIRST_ARCHITECTURE"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="07"
            title="REG_DASHBOARD"
            subtitle="USER_SUPERVISION_SYS"
            date="APR_2024_MAY_2024"
            tag="PHP_DASHBOARD"
            href="https://github.com/nightfall-storm/Gestion-inscription"
            features={[
              "PHP_JS_JQUERY_MYSQL_STACK",
              "SECURE_AUTH_LAYER_V1",
              "DATA_MGMT_ORCHESTRATOR",
              "ADMIN_LEVEL_SUPERVISION"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="08"
            title="MOBILE_PORTFOLIO"
            subtitle="NATIVE_ANDROID_SUITE"
            date="SEP_2023_MAR_2024"
            tag="MOBILE_APP"
            href="https://github.com/nightfall-storm/WeatherApp"
            features={[
              "KOTLIN_JAVA_NATIVE_DEV",
              "REST_API_INTEGRATION_SYNC",
              "WEATHERAPP_PIZZAAPP_BUILDS",
              "INTENT_&_FRAGMENTS_MGMT"
            ]}
          />
        </motion.div>

        <motion.div variants={item}>
          <ProjectCard 
            id="09"
            title="UTILITY_SYSTEMS"
            subtitle="MICRO_APP_COLLECTION"
            date="2024_LABS"
            tag="MOBILE_APPS"
            href="https://github.com/nightfall-storm/TipCalculatorApp"
            features={[
              "TIP_CALC_&_NOTIF_SCHEDULER",
              "STARS_ACTORS_REGISTRY",
              "INTENT_IMPLICITE_LOGIC",
              "TRANSITIONS_DRAW_SYS"
            ]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
