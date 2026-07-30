import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mic2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

// ── GLOBE SECTION ─────────────────────────────────────────────────────────────
//
// Fixed positional layout — cards are placed in explicit zones:
//   TOP    : 2 cards side-by-side above the globe
//   SIDES  : 1-2 cards on each side (left / right) of the globe
//   BOTTOM : 2 cards side-by-side below the globe
//
// The globe sits in the center of a wide container.
// Cards overflow the globe vertically so the whole group feels connected.

// ── Dynamic sizing for Desktop ───────────────────────────────────────────
function getCardSize(count) {
  if (count <= 4) return { cardW: 210, cardH: 280, globeD: 360, gap: 22, infoH: 58, badgeFontSize: "0.65rem", nameFontSize: "0.82rem", titleFontSize: "0.65rem" };
  if (count <= 6) return { cardW: 185, cardH: 245, globeD: 340, gap: 18, infoH: 52, badgeFontSize: "0.6rem",  nameFontSize: "0.74rem", titleFontSize: "0.6rem"  };
  return           { cardW: 160, cardH: 215, globeD: 320, gap: 16, infoH: 46, badgeFontSize: "0.55rem", nameFontSize: "0.66rem", titleFontSize: "0.55rem" };
}

// How cards are distributed for desktop (up to 8 founders)
const SLOT_MAP = [
  { zone: "top",    slot: 0 },
  { zone: "top",    slot: 1 },
  { zone: "left",   slot: 0 },
  { zone: "right",  slot: 0 },
  { zone: "bottom", slot: 0 },
  { zone: "bottom", slot: 1 },
  { zone: "left",   slot: 1 },
  { zone: "right",  slot: 1 },
];

const SKELETON_SLOTS = SLOT_MAP.slice(0, 6);

// ── Founder Card Component ──────────────────────────────────────────────────
function GlobeCard({ founder, delay, cardW, cardH, infoH, badgeFontSize, nameFontSize, titleFontSize, isMobile = false }) {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 180, damping: 22 }}
        className="group w-full"
      >
        <Link to={`/founders/${founder.slug}`} className="block w-full">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 group-hover:border-white/35 group-hover:bg-white/[0.08] group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]">
            {/* Episode badge */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15">
              <Mic2 className="w-3 h-3 text-white/70 shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-widest uppercase text-white/80 whitespace-nowrap">
                EP {String(founder.episode).padStart(2, "0")}
              </span>
            </div>

            {/* Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5">
              <img
                src={founder.imageUrl}
                alt={founder.name}
                loading="lazy"
                className="w-full h-full object-cover object-top brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/25 to-transparent" />
            </div>

            {/* Info bar */}
            <div className="p-3 bg-[#02040a]/95 border-t border-white/5 flex items-center justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">{founder.name}</p>
                <p className="text-[0.65rem] sm:text-xs text-white/50 truncate mt-0.5">{founder.company}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, type: "spring", stiffness: 180, damping: 20 }}
      className="group shrink-0"
      style={{ width: cardW }}
    >
      <Link to={`/founders/${founder.slug}`}>
        <div
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm
                     transition-all duration-300 group-hover:border-white/35 group-hover:bg-white/[0.08]
                     group-hover:scale-105 group-hover:shadow-[0_8px_40px_rgba(255,255,255,0.08)]"
          style={{ width: cardW, height: cardH }}
        >
          {/* Episode badge */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
            <Mic2 className="w-2 h-2 text-white/60 shrink-0" />
            <span style={{ fontSize: badgeFontSize }} className="font-bold tracking-widest uppercase text-white/60 whitespace-nowrap">
              EP {String(founder.episode).padStart(2, "0")}
            </span>
          </div>

          {/* Photo */}
          <div className="relative overflow-hidden" style={{ height: cardH - infoH }}>
            <img
              src={founder.imageUrl}
              alt={founder.name}
              loading="lazy"
              className="w-full h-full object-cover object-top brightness-85 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/15 to-transparent" />
          </div>

          {/* Info bar */}
          <div className="px-3 py-2.5 bg-[#02040a]/85 absolute bottom-0 left-0 right-0">
            <p style={{ fontSize: nameFontSize }} className="font-bold text-white leading-tight truncate">{founder.name}</p>
            <p style={{ fontSize: titleFontSize }} className="text-white/45 truncate mt-0.5">{founder.company}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard({ cardW, cardH, isMobile = false }) {
  if (isMobile) {
    return (
      <div className="w-full aspect-[4/5] rounded-2xl bg-white/[0.05] animate-pulse border border-white/10 shrink-0" />
    );
  }
  return (
    <div
      className="rounded-2xl bg-white/[0.05] animate-pulse border border-white/10 shrink-0"
      style={{ width: cardW, height: cardH }}
    />
  );
}

// ── Globe Video Component ────────────────────────────────────────────────────
function GlobeVideo({ className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Mobile video play attempt:", err);
        });
      }
    }
  }, []);

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black ${className}`}>
      {/* Globe Poster Fallback Image (Pic 2) */}
      <img
        src="/images/globe-poster.jpg"
        alt="Visionaries Globe"
        className="absolute inset-0 w-full h-full object-cover rounded-full z-0 pointer-events-none"
      />

      {/* Globe Video Player */}
      <video
        ref={videoRef}
        src="/videos/globe.mp4"
        poster="/images/globe-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        className="w-full h-full object-cover rounded-full relative z-10"
      />
    </div>
  );
}

function GlobeSection({ founders, loading }) {
  const count = loading ? 6 : founders.length;
  const { cardW, cardH, globeD, gap, infoH, badgeFontSize, nameFontSize, titleFontSize } = getCardSize(count);

  const slots = loading ? SKELETON_SLOTS : SLOT_MAP.slice(0, Math.min(founders.length, SLOT_MAP.length));

  // Group items by zone for Desktop
  const byZone = { top: [], left: [], right: [], bottom: [] };
  slots.forEach((s, i) => {
    byZone[s.zone].push(loading ? { skeleton: true, i } : { founder: founders[i], i });
  });

  // Shared card props for desktop
  const cardProps = { cardW, cardH, infoH, badgeFontSize, nameFontSize, titleFontSize };

  // Connector line component for desktop
  const ConnectorLine = ({ direction }) => {
    const isH = direction === "h";
    return (
      <div
        className="pointer-events-none"
        style={{
          width: isH ? gap : 1,
          height: isH ? 1 : gap,
          background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
          flexShrink: 0,
        }}
      />
    );
  };

  return (
    <section className="relative z-10 py-10 lg:py-20 overflow-hidden">

      {/* ── DESKTOP LAYOUT (Screens >= 1024px) ── */}
      <div className="hidden lg:flex flex-col items-center gap-0 select-none px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12 px-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/50 mb-4">
            <Mic2 className="w-3 h-3 text-white/70" /> Our Founders Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Visionaries Around the World
          </h2>
          <p className="text-white/40 text-xs sm:text-sm mt-2 max-w-md mx-auto">
            Connecting builders, innovators, and leaders globally
          </p>
        </motion.div>

        {/* TOP ROW */}
        {byZone.top.length > 0 && (
          <div className="flex items-end justify-center" style={{ gap: gap }}>
            {byZone.top.map((item) =>
              item.skeleton
                ? <SkeletonCard key={item.i} {...cardProps} />
                : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.1 + item.i * 0.07} {...cardProps} />
            )}
          </div>
        )}

        {/* Connector lines — top */}
        {byZone.top.length > 0 && (
          <div className="flex items-center justify-center" style={{ gap: gap }}>
            {byZone.top.map((item) => (
              <div key={item.i} style={{ width: cardW, display: "flex", justifyContent: "center" }}>
                <ConnectorLine direction="v" />
              </div>
            ))}
          </div>
        )}

        {/* MIDDLE ROW: left cards + globe + right cards */}
        <div className="flex items-center justify-center">

          {/* LEFT CARDS */}
          {byZone.left.length > 0 && (
            <div className="flex items-center">
              <div className="flex flex-col" style={{ gap: gap }}>
                {byZone.left.map((item) =>
                  item.skeleton
                    ? <SkeletonCard key={item.i} {...cardProps} />
                    : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.1 + item.i * 0.07} {...cardProps} />
                )}
              </div>
              <ConnectorLine direction="h" />
            </div>
          )}

          {/* GLOBE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative rounded-full overflow-hidden shrink-0"
            style={{
              width: globeD,
              height: globeD,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.18), 0 0 40px rgba(255,255,255,0.35), 0 0 100px rgba(255,255,255,0.18), 0 0 220px rgba(255,255,255,0.08)",
            }}
          >
            <GlobeVideo />
          </motion.div>

          {/* RIGHT CARDS */}
          {byZone.right.length > 0 && (
            <div className="flex items-center">
              <ConnectorLine direction="h" />
              <div className="flex flex-col" style={{ gap: gap }}>
                {byZone.right.map((item) =>
                  item.skeleton
                    ? <SkeletonCard key={item.i} {...cardProps} />
                    : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.1 + item.i * 0.07} {...cardProps} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Connector lines — bottom */}
        {byZone.bottom.length > 0 && (
          <div className="flex items-center justify-center" style={{ gap: gap }}>
            {byZone.bottom.map((item) => (
              <div key={item.i} style={{ width: cardW, display: "flex", justifyContent: "center" }}>
                <ConnectorLine direction="v" />
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM ROW */}
        {byZone.bottom.length > 0 && (
          <div className="flex items-start justify-center" style={{ gap: gap }}>
            {byZone.bottom.map((item) =>
              item.skeleton
                ? <SkeletonCard key={item.i} {...cardProps} />
                : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.1 + item.i * 0.07} {...cardProps} />
            )}
          </div>
        )}
      </div>

      {/* ── MOBILE & TABLET LAYOUT (< 1024px) ── */}
      <div className="flex lg:hidden flex-col items-center select-none px-3 sm:px-6 max-w-xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-6 px-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
            <Mic2 className="w-2.5 h-2.5 text-white/70" /> Our Founders Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Visionaries Around the World
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Connecting builders, innovators, and leaders globally
          </p>
        </div>

        {/* Unified 2-Column Founder Cards Grid (ALL 6 CARDS) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
          {loading
            ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} isMobile />)
            : founders.map((founder, i) => (
                <GlobeCard
                  key={founder._id || i}
                  founder={founder}
                  delay={0.05 * i}
                  isMobile
                />
              ))}
        </div>

        {/* Vertical Connector Line (Leading down to Globe) */}
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 via-white/60 to-white/20 my-5 shrink-0" />

        {/* Large Globe Sphere (Fits left/right with tiny gap, after all cards) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-[calc(100%-0.75rem)] max-w-[440px] aspect-square rounded-full overflow-hidden shrink-0 mb-6 mx-auto"
          style={{
            boxShadow:
              "0 0 0 2px rgba(255,255,255,0.25), 0 0 50px rgba(255,255,255,0.4), 0 0 120px rgba(255,255,255,0.2)",
          }}
        >
          <GlobeVideo />
        </motion.div>
      </div>
    </section>
  );
}

// ── FOUNDER CARD ──────────────────────────────────────────────────────────────


function FounderCard({ founder, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05 }}
    >
      <Link to={`/founders/${founder.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]">
          {/* Episode Badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <Mic2 className="w-3 h-3 text-white/70" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/70">
              EP {String(founder.episode).padStart(2, '0')}
            </span>
          </div>

          {/* Photo */}
          <div className="relative aspect-[5/5] w-full overflow-hidden bg-white/5">
            <img
              src={founder.imageUrl}
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


            <h2 className="text-xl font-bold text-white mb-1">{founder.name}</h2>
            <p className="text-sm text-white/50 mb-4">{founder.title} - {founder.company}</p>



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

  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/founders`);
        const result = await response.json();
        if (result.success) {
          setFounders(result.data);
        }
      } catch (error) {
        console.error("Error fetching founders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFounders();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

      {/* Ambient Background - lightweight */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{willChange: 'transform'}}>
        <div className="absolute top-[5%] left-[-5%] w-[55%] h-[55%] rounded-full" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)'}} />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)'}} />
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
              { value: loading ? "-" : `${founders.length}+`, label: "Episodes" },
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

      {/* ═══════════════ GLOBE + FOUNDERS ═══════════════ */}
      <GlobeSection founders={founders} loading={loading} />

      {/* ═══════════════ GRID ═══════════════ 
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

        {loading ? (
          <div className="flex justify-center items-center h-30">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : founders.length === 0 ? (
          <div className="text-center text-white/50 p-8">No founder episodes found.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((founder, i) => (
              <FounderCard key={founder._id} founder={founder} index={i} />
            ))}
          </div>
        )}
      </section>
      */}
      
    </main>
  );
}
