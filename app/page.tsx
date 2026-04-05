import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Portfolio from "@/components/sections/Portfolio";
import Expertise from "@/components/sections/Expertise";
import FunFacts from "@/components/sections/FunFacts";
import Logos from "@/components/sections/Logos";
import VideoSection from "@/components/sections/VideoSection";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Awards from "@/components/sections/Awards";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

/**
 * Landing Page - Floka Studio
 * 
 * Refactored into modular components for scalability and maintainability.
 * This is a Server Component that composes various Client/Server sections.
 * 
 * Rendering Strategy: SSG (Static Site Generation)
 * Why: The content is largely static and defined in component constants.
 * For dynamic data, fetch() with revalidate would be added to individual components.
 */
export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Portfolio />
        <Expertise />
        <FunFacts />
        <Logos />
        <VideoSection />
        <Testimonials />
        <Contact />
        <Awards />
        <Team />
        <FAQ />
        <Blog />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
