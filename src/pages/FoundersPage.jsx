import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mic2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Gunjan from "../assets/TeamImages/Founder.jpeg";
import Sunny from "../assets/TeamImages/sunny.png";
import Manas from "../assets/TeamImages/manas.jpeg";

// ── FOUNDERS DATA ─────────────────────────────────────────────────────────────
// Add / edit founders here. Each slug must match the route in App.jsx.
// instagramVideoUrl  → the full URL of the Instagram reel / post
// social             → social handles (leave null if not applicable)
export const founders = [
  {
    id: 1,
    slug: "gunjan-shidame",
    name: "Gunjan Shidame",
    title: "Co-Founder & CMO",
    company: "THRM Digital",
    image: Gunjan,
    tagline: "Youngest CMO in the game.",
    episode: "EP 01",
    topics: ["Brand Strategy", "Gen-Z Marketing", "Entrepreneurship"],
    bio: `Gunjan Shidame is the Co-Founder and Chief Marketing Officer of THRM Digital Marketing Agency. At just 20 years old, she is one of the youngest leaders in the industry, bringing a fresh and fearless perspective to the digital marketing world. Her journey is driven by a relentless passion for innovation, creativity, and delivering results that actually matter. Gunjan leads the THRM team with a vision to empower businesses through social media, web, and impactful ad campaigns. Under her leadership, the agency continues to set new benchmarks in the digital space.`,
    quote: "You don't need decades of experience — you need the audacity to try.",
    // Replace with the actual Instagram reel/post URL
    instagramVideoUrl: "https://www.instagram.com/p/PLACEHOLDER_GUNJAN/",
    social: {
      instagram: "https://www.instagram.com/thrm.digital/",
      linkedin: null,
      twitter: null,
    },
  },
  {
    id: 2,
    slug: "sunny-sharma",
    name: "Sunny Sharma",
    title: "Co-Founder & CEO",
    company: "THRM Digital",
    image: Sunny,
    tagline: "The vision that built THRM.",
    episode: "EP 02",
    topics: ["Growth Hacking", "Performance Marketing", "Leadership"],
    bio: `Sunny Sharma is the visionary Co-Founder and CEO of THRM Digital Marketing Agency. He has been instrumental in shaping THRM into a 360° digital marketing powerhouse known for delivering impactful results and building lasting client relationships. With a sharp eye for detail and a passion for helping brands thrive, he has spearheaded countless successful campaigns spanning social media management, performance marketing, influencer collaborations, and content creation.`,
    quote: "Build systems that scale. Build culture that lasts.",
    instagramVideoUrl: "https://www.instagram.com/p/PLACEHOLDER_SUNNY/",
    social: {
      instagram: "https://www.instagram.com/thrm.digital/",
      linkedin: null,
      twitter: null,
    },
  },
  {
    id: 3,
    slug: "manas-patil",
    name: "Manas Patil",
    title: "Director IT",
    company: "THRM Digital",
    image: Manas,
    tagline: "The engineer powering the vision.",
    episode: "EP 03",
    topics: ["Full-Stack Dev", "Product Thinking", "Tech Startups"],
    bio: `Manas Patil is the Director of IT at THRM Digital, responsible for architecting the digital backbone of the agency and its clients. A passionate full-stack developer, he specialises in building high-performance web applications using React.js, Node.js, and MongoDB. His expertise spans both elegant front-end experiences and robust back-end infrastructure, ensuring THRM's digital products are fast, scalable, and future-proof.`,
    quote: "Great code is invisible. Great design is unforgettable. The best products are both.",
    instagramVideoUrl: "https://www.instagram.com/p/PLACEHOLDER_MANAS/",
    social: {
      instagram: "https://www.instagram.com/thrm.digital/",
      linkedin: null,
      twitter: null,
    },
  },
];

// ── FOUNDER CARD ──────────────────────────────────────────────────────────────
function FounderCard({ founder, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/founders/${founder.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]">
          {/* Episode Badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <Mic2 className="w-3 h-3 text-white/70" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/70">
              {founder.episode}
            </span>
          </div>

          {/* Photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
            <img
              src={founder.image}
              alt={founder.name}
              loading="lazy"
              className="w-full h-full object-cover object-top brightness-90 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/30 to-transparent" />

            {/* Play button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {founder.topics.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                >
                  {t}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{founder.name}</h2>
            <p className="text-sm text-white/50 mb-4">{founder.title}</p>

            <p className="text-sm text-white/70 italic leading-relaxed border-l-2 border-white/20 pl-4 mb-6">
              "{founder.tagline}"
            </p>

            <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300">
              <span className="text-xs font-bold tracking-widest uppercase">Watch Interview</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function FoundersPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-5%] w-[55%] h-[55%] bg-white/[0.03] blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[160px] rounded-full" />
        <div className="star-drift opacity-30" />
        <div className="star-drift star-drift-2 opacity-15" />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-52 lg:pb-36 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10">
            <Mic2 className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Founders Series
            </span>
          </div>

          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black tracking-tighter leading-[1.02] mb-8 max-w-5xl">
            Conversations with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Founders.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-2xl mb-14">
            Raw, unfiltered interviews with the builders, visionaries, and risk-takers
            who are rewriting the rules of business. No scripts. No filters. Just the real story.
          </p>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden border border-white/10"
          >
            {[
              { value: `${founders.length}+`, label: "Episodes" },
              { value: "100%", label: "Authentic" },
              { value: "∞", label: "Insights" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-10 py-5 bg-white/[0.02] backdrop-blur-sm"
              >
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-white/40 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ GRID ═══════════════ */}
      <section className="relative z-10 px-6 lg:px-14 pb-40 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-2">
            All Interviews
          </h2>
          <p className="text-white/40 text-sm">Click a card to watch the full interview.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, i) => (
            <FounderCard key={founder.id} founder={founder} index={i} />
          ))}
        </div>
      </section>

    </main>
  );
}
