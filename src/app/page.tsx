import { Hero } from "@/features/home/components/Hero";
import { TechTicker } from "@/features/home/components/TechTicker";
import { ProjectMatrix } from "@/features/home/components/ProjectMatrix";
import { QuoteSection } from "@/features/home/components/QuoteSection";
import { ContactSection } from "@/features/home/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <TechTicker />
      <ProjectMatrix />
      <QuoteSection />
      <ContactSection />
    </div>
  );
}
