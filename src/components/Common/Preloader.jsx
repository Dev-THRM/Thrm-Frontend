import preload from "../../assets/preload1.mp4"
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      // The smooth fade-out animation when the preloader finishes
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02040a]"
    >
      {/* The Video Container 
        - max-w-[600px] and max-h-[600px] constrain its size.
        - w-full and h-auto ensure it remains responsive on smaller screens.
        - You can adjust the max-w/max-h values to make the video larger or smaller.
      */}
      <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center overflow-hidden rounded-full shadow-[0_0_80px_rgba(37,99,235,0.15)]">
        
        <video
          src= {preload} // Pointing to the file in your public folder
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen"
        />
        
      </div>
    </motion.div>
  );
}