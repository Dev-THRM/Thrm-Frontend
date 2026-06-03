import Hero from "../components/Home/Hero.jsx";
import AboutSection from "../components/Home/AboutSection.jsx";
import WorkSection from "../components/Home/WorkSection.jsx";
import StatsSection from "../components/Home/StatsSection.jsx";
import ServiceSection from "../components/Home/ServicesSection.jsx";
import FAQSection from "../components/Home/FAQSection.jsx";
import PressCarousel from "../components/Home/PressCarousel.jsx";

export default function Home() {
  return (
    <main className="bg-[#02040a] min-h-screen relative overflow-hidden">

      {/* ================= GLOBAL AMBIENT BACKGROUND ================= */}
      {/* 'fixed' ensures this background stays in place while the user scrolls */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Silver/White Glow Orbs */}
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />

        {/* Animated Stars - 3D Parallax Effect */}
        <div className="star-drift star-drift-1 opacity-70" />
        <div className="star-drift star-drift-2 opacity-100" />
        <div className="star-drift star-drift-3 opacity-100" />
      </div>

      {/* ================= PAGE CONTENT ================= */}
      {/* 'relative z-10' ensures all your sections sit on top of the stars */}
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <WorkSection />
        <StatsSection />
        <ServiceSection />
        <FAQSection />
        <PressCarousel />
      </div>

    </main>
  );
}