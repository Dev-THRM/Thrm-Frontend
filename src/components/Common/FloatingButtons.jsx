import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa6";

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

export default function FloatingButtons() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  // Monitor scroll position to show/hide buttons (rAF throttled)
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        setShowBackToTop(scrollPos > 300);

        const isHomePage = location.pathname === "/";
        const isPastHero = scrollPos > 500;
        const isNearFooter = scrollPos + windowHeight > documentHeight - 650;

        setShowSocials(isHomePage && isPastHero && !isNearFooter);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Bottom Left Buttons (Back to Top & WhatsApp) */}
      <div className="fixed bottom-8 left-6 z-[90] flex flex-col gap-4">
        
        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/20 text-white/80 backdrop-blur-md transition-all hover:bg-white hover:text-black shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
              
              {/* Hover Tooltip (Appears to the right) */}
              <span className="absolute left-16 scale-0 rounded bg-white px-3 py-1.5 text-xs font-bold text-black transition-all group-hover:scale-100 origin-left whitespace-nowrap shadow-lg">
                Back to top
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.a
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          href="https://wa.me/919004500657" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/20 text-white/80 backdrop-blur-md transition-all hover:bg-[#25D366] hover:border-[#25D366] hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
          
          {/* Hover Tooltip (Appears to the right) */}
          <span className="absolute left-16 scale-0 rounded bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white transition-all group-hover:scale-100 origin-left whitespace-nowrap shadow-lg">
            Chat with us
          </span>
        </motion.a>
      </div>

      {/* Right-Side Floating Socials */}
      <AnimatePresence>
        {showSocials && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden xl:block"
          >
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-[#1A1A1A]/60 px-3 py-4 backdrop-blur-md">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}