import { Hero } from "@/features/home/components/Hero";
import { TechTicker } from "@/features/home/components/TechTicker";
import { ExperienceSection } from "@/features/home/components/ExperienceSection";
import { ProjectMatrix } from "@/features/home/components/ProjectMatrix";
import { AcademySection } from "@/features/home/components/AcademySection";
import { ContactSection } from "@/features/home/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TechTicker />
      <ExperienceSection />
      <ProjectMatrix />
      <AcademySection />
      <ContactSection />
    </div>
  );
}
