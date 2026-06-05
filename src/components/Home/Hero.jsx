import { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa6";

// Social links
const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/thrm.digitalmarketing_agency/",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/people/THRM-Digital-Marketing-Agency/61554950021351/",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=919004500657&text&type=phone_number&app_absent=0",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/thrmdigitalmarketingagency/",
  },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    setVideoReady(false);
  }, [isMobile]);

  const videoSrc = isMobile ? "/videos/mobile-banner.mp4" : "/videos/banner.mp4";
  const fallbackImage = isMobile
    ? "/home/mobile-banner.png"
    : "/home/desktop-banner.png";

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#02040a]">
      {/* Fallback image */}
      <img
        src={fallbackImage}
        alt="THRM Digital Marketing Agency hero banner"
        className={`absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0 transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchPriority="high"
      />

      {/* Render only one media type at a time */}
      {isMobile ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={fallbackImage}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0 transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={fallbackImage}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0 transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlays */}
      <div
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(2,4,10,0.1),rgba(2,4,10,0.2)_38%,rgba(2,4,10,0.6)_100%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.03),transparent_25%),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.02),transparent_25%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Social Icons */}
      <div
        className="pointer-events-none absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
        aria-hidden="true"
      >
        <div className="pointer-events-auto flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-[#1A1A1A]/60 px-3 py-4 backdrop-blur-md">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-white hover:text-black"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}