import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Award, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  X // Added X for the modal close button
} from "lucide-react";

import award from "../../src/assets/AwardsImages/award.jpeg";
import award1 from "../../src/assets/AwardsImages/award1.jpeg";
import award2 from "../../src/assets/AwardsImages/award2.jpeg";
import award3 from "../../src/assets/AwardsImages/award3.webp";
import award4 from "../../src/assets/AwardsImages/award4.jpg";
import award5 from "../../src/assets/AwardsImages/award5.jpg";

// --- AWARDS GALLERY DATA ---
const awardsGallery = [
  { id: 1, image: award, alt: "THRM Digital Marketing Award 1" },
  { id: 2, image: award1, alt: "THRM Digital Marketing Award 2" },
  { id: 3, image: award2, alt: "THRM Certificate of Excellence 1" },
  { id: 4, image: award3, alt: "THRM Industry Recognition" },
  { id: 5, image: award4, alt: "THRM Agency Certificate" },
  { id: 6, image: award5, alt: "THRM Top Agency Award" },
];

export default function AwardsPage() {
  const containerRef = useRef(null);
  
  // State to track which award is currently open in the lightbox
  const [selectedAward, setSelectedAward] = useState(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedAward) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedAward]);

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <header className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-24 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Industry Recognition
            </span>
          </div>
          
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            Recognized for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Absolute Excellence.
            </span>
          </h1>
        </motion.div>
      </header>

      {/* ================= OUR PHILOSOPHY ================= */}
      <section className="relative z-10 px-6 lg:px-14 pb-24 max-w-[1000px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed font-medium mb-8">
            At THRM, we don't work for trophies. We work for growth. Our primary obsession has always been, and will always be, generating measurable revenue and market dominance for our clients.
          </p>
          <p className="text-lg text-white/50 leading-relaxed">
            However, when you consistently prioritize innovation, ethical transparency, and data-driven results, the industry takes notice. The certificates and awards showcased below are not just decorations; they are a byproduct of our relentless commitment to pushing the boundaries of what is possible in digital marketing. They stand as a guarantee to our partners that they are working with a proven, elite-tier agency.
          </p>
          
          <div className="flex justify-center gap-8 mt-12 border-y border-white/5 py-8">
            <div className="flex flex-col items-center gap-2">
              <Award className="w-6 h-6 text-white/70" />
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">Certified Experts</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-white/70" />
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">Verified Results</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-white/70" />
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">Top Rated Agency</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= VISUAL GALLERY ================= */}
      <section className="relative z-10 px-6 lg:px-14 pb-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {awardsGallery.map((award, index) => (
            <motion.div 
              key={award.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedAward(award)}
              // Increased height here (h-[400px] on mobile, h-[500px] on desktop) and added cursor-pointer
              className="group relative w-full h-[400px] lg:h-[500px] rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm p-4 hover:border-white/30 transition-colors duration-500 shadow-2xl cursor-pointer"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                
                {/* Overlay text instructing users to click */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold tracking-wide border border-white/20">
                    Click to view
                  </span>
                </div>

                <img 
                  src={award.image} 
                  alt={award.alt}
                  loading="lazy"
                  // object-contain ensures the whole certificate is visible within the taller height without cropping
                  className="w-full h-full object-contain filter brightness-90 grayscale-[20%] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700 ease-out p-2"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAward(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02040a]/95 backdrop-blur-xl p-4 sm:p-8 cursor-pointer"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/20 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Expanded Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedAward.image}
              alt={selectedAward.alt}
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-[0_0_50px_rgba(255,255,255,0.1)] cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevents clicking the image from closing the modal
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CTA SECTION ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1000px] mx-auto text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 lg:p-20 overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-full bg-white/5 blur-[80px] pointer-events-none" />
          
          <h2 className="relative z-10 text-3xl lg:text-5xl font-black tracking-tight mb-8">
            Ready to build an award-winning campaign?
          </h2>
          <p className="relative z-10 text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            Let's translate this level of excellence into measurable growth for your business. Partner with THRM today.
          </p>
          <button className="relative z-10 group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200">
            Start Your Project <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>

    </main>
  );
}