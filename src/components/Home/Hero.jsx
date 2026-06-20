import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const videoSrc = isMobile ? "/videos/mobile-banner.mp4" : "/videos/banner.mp4";
  const fallbackImage = isMobile
    ? "/home/mobile-banner.png"
    : "/home/desktop-banner.png";

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#02040a]">
      {/* Fallback image for instant visual paint (LCP optimized) */}
      <img
        src={fallbackImage}
        alt="THRM Digital Marketing Agency hero banner"
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0"
        loading="eager"
        fetchPriority="high"
      />

      {/* Video element plays natively on top of the fallback image as soon as buffered */}
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={fallbackImage}
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(2,4,10,0.1),rgba(2,4,10,0.2)_38%,rgba(2,4,10,0.6)_100%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.03),transparent_25%),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.02),transparent_25%)] pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}