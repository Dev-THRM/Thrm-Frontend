import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import thrmAnimation from "../../assets/thrm_animation.mp4";

export default function IntroPopup({ isPreloading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!isPreloading && !hasMounted) {
      // Show every time the website loads (App mounts)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      setHasMounted(true);
      return () => clearTimeout(timer);
    }
  }, [isPreloading, hasMounted]);

  // For testing purposes during development, you can uncomment this to force show it
  // useEffect(() => {
  //   if (!isPreloading) setIsOpen(true);
  // }, [isPreloading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[95vw] max-h-[85vh] mx-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-10 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <video
              src={thrmAnimation}
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={() => setIsOpen(false)}
              className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
