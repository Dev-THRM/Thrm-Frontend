import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Rocket } from "lucide-react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Track raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Main Cursor (The Rocket) - Very tight spring, follows instantly
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 40 });

  // Trail Particles - Progressively looser springs to create a dragging tail effect
  const trail1X = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const trail1Y = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const trail2X = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const trail2Y = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const trail3X = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const trail3Y = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const updatePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices or if mouse is outside the window
  if (!isVisible || typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      
      {/* Exhaust Particle 3 (Furthest Behind) */}
      <motion.div
        style={{ x: trail3X, y: trail3Y }}
        className="absolute top-0 left-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white/20 blur-[1px]"
      />
      
      {/* Exhaust Particle 2 */}
      <motion.div
        style={{ x: trail2X, y: trail2Y }}
        className="absolute top-0 left-0 h-2 w-2 -ml-[4px] -mt-[4px] rounded-full bg-white/40 blur-[1px]"
      />

      {/* Exhaust Particle 1 (Closest) */}
      <motion.div
        style={{ x: trail1X, y: trail1Y }}
        className="absolute top-0 left-0 h-2.5 w-2.5 -ml-[5px] -mt-[5px] rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      />

      {/* Main Rocket Cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="absolute top-0 left-0 -ml-[12px] -mt-[12px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      >
        {/* We rotate the rocket -45deg so it points to the top-left, exactly like a normal mouse cursor */}
        <Rocket className="w-6 h-6 -rotate-45 fill-white" strokeWidth={1.5} />
      </motion.div>

    </div>
  );
}