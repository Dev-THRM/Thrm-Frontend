import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles,  
  Smile, 
  Zap, 
  Send,
  Compass,
  X
} from "lucide-react";
import { GiClothes, GiPartyPopper } from "react-icons/gi";
import { API_BASE_URL } from "../config";

export default function CareersPage() {
  const containerRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Static Perks Data
  const perks = [
    {
      icon: Zap,
      title: "Fast Growth & Ownership",
      desc: "Get total ownership of your work, learn new tech, and accelerate your career path at lightning speed."
    },
    {
      icon: Smile,
      title: "Vibrant Work Culture",
      desc: "Join a friendly team that collaborates daily, hosts creative brainstorms, and celebrates every win together."
    },
    {
      icon: GiClothes,
      title: "Dress Comfortably",
      desc: "No strict dress code. Wear what makes you feel creative and productive."
    },
    {
      icon: GiPartyPopper,
      title: "Fun Work Environment",
      desc: "Office celebrations, and fun activities to keep the energy high."
    }
  ];

  const [openings, setOpenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/openings`);
        const result = await response.json();
        if (result.success) {
          setOpenings(result.data);
        }
      } catch (error) {
        console.error("Error fetching openings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpenings();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <header className="relative z-10 pt-44 pb-20 lg:pt-56 lg:pb-32 px-6 lg:px-14 text-center max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Compass className="w-4 h-4 text-white animate-spin-slow" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Careers at THRM
            </span>
          </div>
          
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            Shape the Digital <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Future With Us.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            We are a collective of strategic minds, bold visual creators, and technical engineers building the next generation of premium brand experiences.
          </p>

          <a 
            href="#openings" 
            className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Explore Openings <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </header>

      {/* ================= CULTURE & BENEFITS ================= */}
      <section className="relative z-10 py-24 px-6 lg:px-14 border-y border-white/5 bg-black/25 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Perks & Culture</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why Work at THRM?</h2>
            <p className="text-white/50 text-base lg:text-lg">
              We focus on building a healthy workspace that inspires creativity, supports mental wellbeing, and values personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 text-white w-fit transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <perk.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{perk.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS ================= */}
      <section id="openings" className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Join the Squad</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Open Opportunities.</h2>
          <p className="text-white/50 text-base lg:text-lg">
            Find a position that fits your talent. Don't see a perfect match? Send us a general application below.
          </p>
        </div>

        {/* Job Cards Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : openings.length === 0 ? (
          <div className="text-center text-white/40 py-10">No active job openings at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {openings.map((job, idx) => (
              <motion.div
                key={job._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setSelectedJob(job)}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-white/80">{job.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-white/5 pt-5 text-sm text-white/50">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.experience}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= GENERAL APPLICATION FORM ================= */}
      <section className="relative z-10 py-20 px-6 lg:px-14 border-t border-white/5 bg-black/20 backdrop-blur-sm pb-10">
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <div className="grid gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-none text-white">Can't Find Your Role?</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                If you believe you have skills that can take THRM to the next level, tell us about yourself. We're always on the lookout for absolute rockstars.
              </p>
              <p>Drop your CV/Resume at hr@thrmdigitalmarketing.in</p>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-sm text-white/40 space-y-2">
                <p className="font-semibold text-white/70">What happens next?</p>
                <p>1. Our creative leads review your submission.</p>
                <p>2. We reach out if your profile fits our strategic pipeline.</p>
                <p>3. If not immediately, we store your profile for upcoming roles.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= JOB DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#060b18] p-8 md:p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-2 text-white">{selectedJob.title}</h3>
              </div>

              <div className="space-y-4 mb-8 border-y border-white/5 py-6">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-white/40" />
                  <span className="text-sm font-medium">Location: <strong className="text-white">{selectedJob.location}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Briefcase className="w-5 h-5 text-white/40" />
                  <span className="text-sm font-medium">Job Type: <strong className="text-white">{selectedJob.type}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Clock className="w-5 h-5 text-white/40" />
                  <span className="text-sm font-medium">Experience: <strong className="text-white">{selectedJob.experience}</strong></span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-white/60 leading-relaxed">
                  We are looking for a creative, motivated individual to join our team in Kalyan. If you're ready to make an impact, click below to submit your application.
                </p>

                <div className="text-center mt-6 border-t border-white/5 pt-4">
                  <p className="text-s text-white/40">
                    To Apply, Mail your Resume/Portfolio to:
                  </p>
                  <p className="text-m font-bold text-white/80 select-all mt-1 hover:text-white transition-colors cursor-pointer" title="Double click to select all">
                    hr@thrmdigitalmarketing.in
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
