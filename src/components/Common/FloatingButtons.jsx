import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll position to show/hide the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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
        // I used the number from your Hero.jsx code here!
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
  );
}