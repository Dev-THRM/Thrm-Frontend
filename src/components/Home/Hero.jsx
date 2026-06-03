import { useState, useEffect, useRef } from "react";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp, 
  FaLinkedinIn 
} from "react-icons/fa6";

// Social links
const socials = [
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/thrm.digitalmarketing_agency/" },
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/people/THRM-Digital-Marketing-Agency/61554950021351/" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=919004500657&text&type=phone_number&app_absent=0" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/thrmdigitalmarketingagency/" },
];

export default function Hero() {
  const videoRef = useRef(null);

  // FIX 1: Initialize state instantly based on window size to prevent the "Double Download" bug.
  // We check if window exists to prevent SSR errors (just in case).
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

  // FIX 2: Physically force the video to play using JavaScript. 
  // This bypasses stubborn iOS restrictions that ignore the autoPlay attribute.
  useEffect(() => {
    if (videoRef.current) {
      // Force load the new source
      videoRef.current.load();
      // Force play
      const playPromise = videoRef.current.play();
      
      // Catch any autoplay blocking errors (like Low Power Mode) so the app doesn't crash
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented by the browser. Low Power Mode may be active.", error);
        });
      }
    }
  }, [isMobile]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#02040a]">
      
      {/* Background Video */}
      <video
        ref={videoRef}
        key={isMobile ? "mobile-video" : "desktop-video"}
        autoPlay
        loop
        muted
        playsInline
        preload="auto" /* FIX 3: Tells the browser this is a high-priority download */
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center z-0"
        poster="/hero1.png"
        aria-hidden="true"
      >
        <source 
          src={isMobile ? "/videos/banner-mobile.mp4" : "/videos/banner.mp4"} 
          type="video/mp4" 
        />
        <img src="/hero1.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
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