import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Film, 
  Eye, 
  Globe, 
  TrendingUp, 
  Volume2, 
  MapPin,
  ArrowRight,
  Play
} from "lucide-react";

import brand1 from "../../src/assets/BrandingImages/add1.webp"
import brand2 from "../../src/assets/BrandingImages/add2.webp"
import brand3 from "../../src/assets/BrandingImages/add3.webp"
import brand4 from "../../src/assets/BrandingImages/add4.webp"
import brand5 from "../../src/assets/BrandingImages/add5.webp"
import brand6 from "../../src/assets/BrandingImages/add6.webp"
import brand7 from "../../src/assets/BrandingImages/add7.webp"
import brand8 from "../../src/assets/BrandingImages/add8.webp"
import brand9 from "../../src/assets/BrandingImages/add9.webp"
import brand10 from "../../src/assets/BrandingImages/add10.webp"
import brand11 from "../../src/assets/BrandingImages/add11.webp"
import brand12 from "../../src/assets/BrandingImages/add12.webp"

import video1 from "../../src/assets/BrandingImages/video1.mp4"
import video2 from "../../src/assets/BrandingImages/video2.mp4"
import video3 from "../../src/assets/BrandingImages/video3.mp4"
import video4 from "../../src/assets/BrandingImages/video4.mp4"
import video5 from "../../src/assets/BrandingImages/video5.mp4"
import video6 from "../../src/assets/BrandingImages/video6.mp4"

// --- MEDIA GALLERY DATA ---
const mediaGallery = [
  { id: 1, type: "image", src: brand1, location: "FILM CITY - GOREGAON" },
  { id: 2, type: "image", src: brand2, location: "KURLA PHOENIX MARKET CITY CCD" },
  { id: 3, type: "image", src: brand3, location: "ANDHERI WEST CCD" },
  { id: 4, type: "image", src: brand4, location: "PVR- PHOENIX MALL KURLA" },
  { id: 5, type: "image", src: brand5, location: "PVR-XPERIA PALAVA, DOMBIVALI" },
  // { id: 6, type: "image", src: brand6, location: "GHATKOPAR PVR" },
  { id: 12, type: "video", src: video1, location: "ASHOK ANIL MULTIPLEX, ULHASNAGAR" },
  { id: 13, type: "video", src: video2, location: "THANE CINEPOLIS THEATER" },
  { id: 14, type: "video", src: video3, location: "Carnival Cinemas, Navi Mumbai" },
  { id: 15, type: "video", src: video4, location: "GHATKOPAR PVR" },
  // { id: 16, type: "video", src: video5, location: "Carnival Cinemas, Navi Mumbai" },
  { id: 16, type: "video", src: video6, location: "PVR-PHOENIX MALL KURLA" },
];

const MediaCard = ({ item, index }) => {
  const [showVideoText, setShowVideoText] = useState(false);
  const timeoutRef = useRef(null);

  const handleVideoHover = () => {
    setShowVideoText(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setShowVideoText(false);
    }, 3500);
  };

  const handleVideoLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowVideoText(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative aspect-[4/3] rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl"
    >
      {/* FIXED: Removed the space in "im age" */}
      {item.type === "image" ? (
        // --- IMAGE CARD ---
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={item.src} 
            alt={item.location}
            loading="lazy"
            className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-2 text-white/80 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Location</span>
            </div>
            <p className="text-lg font-bold text-white leading-tight">{item.location}</p>
          </div>
        </div>
      ) : (
        // --- VIDEO CARD ---
        <div 
          className="relative w-full h-full overflow-hidden"
          onMouseEnter={handleVideoHover}
          onMouseLeave={handleVideoLeave}
        >
          {/* FIXED: Removed the random 'by' text in the Play component */}
          <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play className="w-3.5 h-3.5 text-white ml-0.5" />
          </div>

          <video 
            src={item.src} controls autoPlay muted loop playsInline
            className="w-full h-full object-cover filter brightness-90 transition-all duration-700 ease-out"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${showVideoText ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className={`absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ${showVideoText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 text-white/80 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Cinema Campaign</span>
            </div>
            <p className="text-lg font-bold text-white leading-tight">{item.location}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function OurBrandingPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      <header className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Film className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Offline Amplification
            </span>
          </div>
          
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            Beyond the <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Digital Screen.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed">
            At THRM Digital Marketing, we believe that brand visibility should go beyond digital screens. We specialize in cinema advertising in Mumbai and across India, putting your brand in the spotlight it truly deserves.
          </p>
        </motion.div>
      </header>

      <section className="relative z-10 py-24 px-6 lg:px-14 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">Capture Complete Attention.</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              Movie theaters are one of the most powerful platforms for brand promotions because the audience is fully focused, free from distractions, and in a relaxed state of mind. 
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-semibold">
              Unlike online ads that can be skipped, cinema ads capture complete attention, ensuring that your brand leaves a lasting impression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {[
              { icon: Eye, title: "High Attention Rate", desc: "No skip buttons, no distractions – your brand gets 100% visibility." },
              { icon: Globe, title: "Wider Reach", desc: "From local theaters in Mumbai to multiplexes across India." },
              { icon: TrendingUp, title: "Cost-Effective", desc: "Delivers significantly better ROI compared to traditional TV advertising." },
              { icon: Volume2, title: "Memorable Impact", desc: "Big-screen visuals and surround sound make your message unforgettable." }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <feature.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-lg font-bold mb-2 text-white/90">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Our Branding Campaigns.</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Explore how we've promoted our clients through theater ads, interval screens, and movie pre-roll campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mediaGallery.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <div className="sr-only">
        At THRM Digital Marketing, we believe that brand visibility should go beyond digital screens. That's why we specialize in cinema advertising in Mumbai and across India, where your brand gets the spotlight it deserves. Whether it's a short video before the movie starts, an ad during the interval, or a static screen promotion, your message reaches a highly engaged audience.
      </div>
    </main>
  );
}