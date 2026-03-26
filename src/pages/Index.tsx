import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { NuiSimulator } from "@/components/skills/NuiSimulator";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { TerminalContact } from "@/components/contact/TerminalContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NuiSimulator />
        <ProjectsGallery />
        <TerminalContact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
