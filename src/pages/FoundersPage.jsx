import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mic2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../config";

// ── GLOBE SECTION ─────────────────────────────────────────────────────────────
//
// Fixed positional layout — cards are placed in explicit zones:
//   TOP    : 2 cards side-by-side above the globe
//   SIDES  : 1-2 cards on each side (left / right) of the globe
//   BOTTOM : 2 cards side-by-side below the globe
//
// The globe sits in the center of a wide container.
// Cards overflow the globe vertically so the whole group feels connected.

// ── Dynamic sizing: bigger cards when fewer founders, scales down as more are added
// Breakpoints: 1-4 founders → large, 5-6 → medium, 7-8 → compact
function getCardSize(count) {
  if (count <= 4) return { cardW: 240, cardH: 320, globeD: 430, gap: 28, infoH: 64, badgeFontSize: "0.65rem", nameFontSize: "0.82rem", titleFontSize: "0.65rem" };
  if (count <= 6) return { cardW: 200, cardH: 266, globeD: 415, gap: 24, infoH: 56, badgeFontSize: "0.6rem",  nameFontSize: "0.74rem", titleFontSize: "0.6rem"  };
  if (count <= 8) return { cardW: 175, cardH: 230, globeD: 390, gap: 20, infoH: 50, badgeFontSize: "0.55rem", nameFontSize: "0.66rem", titleFontSize: "0.55rem" };
  return           { cardW: 165, cardH: 220, globeD: 360, gap: 18, infoH: 48, badgeFontSize: "0.55rem", nameFontSize: "0.66rem", titleFontSize: "0.55rem" };
}

// Distribution for 10 founders in 3-2-2-3 format around the globe:
//   TOP    : 3 cards (slots 0, 1, 2)
//   LEFT   : 2 cards (slots 3, 4)
//   RIGHT  : 2 cards (slots 5, 6)
//   BOTTOM : 3 cards (slots 7, 8, 9)
const SLOT_MAP = [
  { zone: "top",    slot: 0 },   // founder 0 (EP 01)
  { zone: "top",    slot: 1 },   // founder 1 (EP 02)
  { zone: "top",    slot: 2 },   // founder 2 (EP 03)
  { zone: "left",   slot: 0 },   // founder 3 (EP 04)
  { zone: "left",   slot: 1 },   // founder 4 (EP 05)
  { zone: "right",  slot: 0 },   // founder 5 (EP 06)
  { zone: "right",  slot: 1 },   // founder 6 (EP 07: Dr. Santosh Vhatkar)
  { zone: "bottom", slot: 0 },   // founder 7 (EP 08: Dr. Rohan Badgujar)
  { zone: "bottom", slot: 1 },   // founder 8 (EP 09: Dr. Asmita More-Bahirao)
  { zone: "bottom", slot: 2 },   // founder 9 (EP 10: Dr. K Vasudeva Rao)
];

// Skeleton shows 10 cards using all 10 slots
const SKELETON_SLOTS = SLOT_MAP.slice(0, 10);

// ── Mini founder card used inside GlobeSection ─────────────────────────────
function GlobeCard({ founder, delay, cardW, cardH, infoH, badgeFontSize, nameFontSize, titleFontSize }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, type: "spring", stiffness: 180, damping: 20 }}
      className="group shrink-0"
      style={{ width: cardW, willChange: "transform", transform: "translateZ(0)" }}
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
              src={getImageUrl(founder.imageUrl)}
              alt={founder.name}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${API_BASE_URL}/uploads/thrm_founders/${founder.slug}.jpg`;
              }}
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
    return <div className="rounded-2xl bg-white/[0.05] animate-pulse border border-white/10 aspect-[3/4] w-full" />;
  }
  return (
    <div
      className="rounded-2xl bg-white/[0.05] animate-pulse border border-white/10 shrink-0"
      style={{ width: cardW, height: cardH }}
    />
  );
}

// Compact card for the mobile 2-col grid
function MobileGlobeCard({ founder, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 180, damping: 22 }}
      className="group"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <Link to={`/founders/${founder.slug}`}>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 group-hover:border-white/35 group-hover:bg-white/[0.08] aspect-[3/4]">
          {/* Episode badge */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
            <Mic2 className="w-2 h-2 text-white/60 shrink-0" />
            <span className="text-[0.55rem] font-bold tracking-widest uppercase text-white/60 whitespace-nowrap">
              EP {String(founder.episode).padStart(2, "0")}
            </span>
          </div>
          {/* Photo */}
          <img
            src={getImageUrl(founder.imageUrl)}
            alt={founder.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${API_BASE_URL}/uploads/thrm_founders/${founder.slug}.jpg`;
            }}
            className="w-full h-full object-cover object-top brightness-85 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/15 to-transparent" />
          {/* Info bar */}
          <div className="px-2.5 py-2 bg-[#02040a]/85 absolute bottom-0 left-0 right-0">
            <p className="text-[0.72rem] font-bold text-white leading-tight truncate">{founder.name}</p>
            <p className="text-[0.6rem] text-white/45 truncate mt-0.5">{founder.company}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function GlobeSection({ founders, loading }) {
  const count = loading ? 6 : founders.length;
  const { cardW, cardH, globeD, gap, infoH, badgeFontSize, nameFontSize, titleFontSize } = getCardSize(count);

  const slots = loading ? SKELETON_SLOTS : SLOT_MAP.slice(0, Math.min(founders.length, SLOT_MAP.length));

  // Group items by zone
  const byZone = { top: [], left: [], right: [], bottom: [] };
  slots.forEach((s, i) => {
    byZone[s.zone].push(loading ? { skeleton: true, i } : { founder: founders[i], i });
  });

  // Shared card props
  const cardProps = { cardW, cardH, infoH, badgeFontSize, nameFontSize, titleFontSize };

  // Connector line component
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

  // Video refs: lazy play when in viewport to prevent network stall and scroll stutter
  const videoRef = useRef(null);      // mobile globe
  const videoRefDesktop = useRef(null); // desktop globe

  useEffect(() => {
    const refs = [videoRef.current, videoRefDesktop.current].filter(Boolean);
    const observers = refs.map((video) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(video);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Flat list of all items for the mobile 2-col grid
  const allItems = slots.map((s, i) =>
    loading ? { skeleton: true, i } : { founder: founders[i], i }
  );

  return (
    <section className="relative z-10 py-16 lg:py-24 overflow-hidden" style={{ willChange: "transform", transform: "translateZ(0)" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/50 mb-4">
          <Mic2 className="w-3 h-3" /> Our Founders Network
        </span>
        <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
          Visionaries Around the World
        </h2>
      </motion.div>

      {/* ── MOBILE LAYOUT (< lg) ── cards first, globe below */}
      <div className="lg:hidden flex flex-col items-center gap-8 px-4">

        {/* Founder cards — 2-col grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {allItems.map((item) =>
            item.skeleton ? (
              <SkeletonCard key={item.i} isMobile />
            ) : (
              <MobileGlobeCard key={item.founder._id} founder={item.founder} delay={0.03 + item.i * 0.03} />
            )
          )}
        </div>

        {/* Globe — below cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-full overflow-hidden shrink-0"
          style={{
            width: 280,
            height: 280,
            backgroundImage: "url('/images/globe-poster.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.18), 0 0 40px rgba(255,255,255,0.35), 0 0 100px rgba(255,255,255,0.18)",
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        >
          <video
            ref={videoRef}
            src="/videos/globe.mp4"
            poster="/images/globe-poster.jpg"
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover rounded-full"
            style={{ display: "block" }}
          />
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT (≥ lg) ── original positional layout */}
      <div className="hidden lg:flex flex-col items-center gap-0 select-none px-4">

        {/* TOP ROW */}
        {byZone.top.length > 0 && (
          <div className="flex items-end justify-center" style={{ gap: gap }}>
            {byZone.top.map((item) =>
              item.skeleton
                ? <SkeletonCard key={item.i} {...cardProps} />
                : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.05 + item.i * 0.05} {...cardProps} />
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
                    : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.05 + item.i * 0.05} {...cardProps} />
                )}
              </div>
              <ConnectorLine direction="h" />
            </div>
          )}

          {/* GLOBE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-full overflow-hidden shrink-0"
            style={{
              width: globeD,
              height: globeD,
              backgroundImage: "url('/images/globe-poster.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.18), 0 0 40px rgba(255,255,255,0.35), 0 0 100px rgba(255,255,255,0.18)",
              willChange: "transform",
              transform: "translateZ(0)"
            }}
          >
            <video
              ref={videoRefDesktop}
              src="/videos/globe.mp4"
              poster="/images/globe-poster.jpg"
              loop muted playsInline
              preload="none"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>

          {/* RIGHT CARDS */}
          {byZone.right.length > 0 && (
            <div className="flex items-center">
              <ConnectorLine direction="h" />
              <div className="flex flex-col" style={{ gap: gap }}>
                {byZone.right.map((item) =>
                  item.skeleton
                    ? <SkeletonCard key={item.i} {...cardProps} />
                    : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.05 + item.i * 0.05} {...cardProps} />
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
                : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.05 + item.i * 0.05} {...cardProps} />
            )}
          </div>
        )}

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
              src={getImageUrl(founder.imageUrl)}
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

const DEFAULT_FOUNDERS = [
  {
    _id: "f1",
    slug: "prasad-rane",
    name: "Prasad Rane",
    title: "Founder",
    company: "Spabulous",
    episode: 1,
    imageUrl: "/images/founders/prasad-rane.jpeg"
  },
  {
    _id: "f2",
    slug: "yash-sanjay-bhavsar",
    name: "Yash Sanjay Bhavsar",
    title: "Founder",
    company: "Kymps Perfume",
    episode: 2,
    imageUrl: "/images/founders/yash-sanjay-bhavsar.jpeg"
  },
  {
    _id: "f3",
    slug: "lakshya-pamnani",
    name: "Lakshya Pamnani",
    title: "Founder",
    company: "Drona",
    episode: 3,
    imageUrl: "/images/founders/lakshay-pamnani.jpeg"
  },
  {
    _id: "f4",
    slug: "akshay-manoj-rahul",
    name: "Akshay, Manoj, Rahul",
    title: "Co-Founders",
    company: "Fika Cafe",
    episode: 4,
    imageUrl: "/images/founders/akshay-manoj-rahul.jpg"
  },
  {
    _id: "f5",
    slug: "urvashi-chainani",
    name: "Urvashi Chainani",
    title: "Founder",
    company: "Choc N Chuckle",
    episode: 5,
    imageUrl: "/images/founders/urvashi-chainani.jpg"
  },
  {
    _id: "f6",
    slug: "preeti-patil",
    name: "Preeti Patil",
    title: "Founder",
    company: "Bookmark Cafe",
    episode: 6,
    imageUrl: "/images/founders/preeti-patil.png"
  },
  {
    _id: "f7",
    slug: "dr-santosh-vhatkar",
    name: "Dr. Santosh Vhatkar",
    title: "Director & Head of Critical Care",
    company: "Anantam Hospital",
    episode: 7,
    imageUrl: "/images/founders/dr-santosh-vhatkar.jpg",
    instaUrl: "https://www.instagram.com/reel/DUQixTgDRo6/?igsh=MW1yYjZrczE0Mjh1MA=="
  },
  {
    _id: "f8",
    slug: "dr-rohan-badgujar",
    name: "Dr. Rohan Badgujar",
    title: "Director & Head of Surgical Department",
    company: "Anantam Hospital",
    episode: 8,
    imageUrl: "/images/founders/dr-rohan-badgujar.jpg",
    instaUrl: "https://www.instagram.com/reel/DUTBeE6DRi5/?igsh=MWgyYmZ5cnM1ZDJvcg=="
  },
  {
    _id: "f9",
    slug: "dr-asmita-more-bahirao",
    name: "Dr. Asmita More-Bahirao",
    title: "Director & Head of Obstetrics & Gynaecology",
    company: "Anantam Hospital",
    episode: 9,
    imageUrl: "/images/founders/dr-asmita-more-bahirao.jpg",
    instaUrl: "https://www.instagram.com/reel/DUlyvc5DvcL/?igsh=Z242NXdud2ZhNmU0"
  },
  {
    _id: "f10",
    slug: "dr-k-vasudeva-rao",
    name: "Dr. K Vasudeva Rao",
    title: "Director & Head of Centre of Excellence",
    company: "Anantam Hospital",
    episode: 10,
    imageUrl: "/images/founders/dr-k-vasudeva-rao.jpg",
    instaUrl: "https://www.instagram.com/reel/DUKdPiMCCVh/?igsh=cTl0dWxqOW12Y3U1"
  }
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function FoundersPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [founders, setFounders] = useState(DEFAULT_FOUNDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/founders`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
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

      {/* Ambient Background - lightweight & GPU accelerated */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ contain: "strict", transform: "translate3d(0,0,0)" }}>
        <div className="absolute top-[5%] left-[-5%] w-[55%] h-[55%] rounded-full opacity-40" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'}} />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-30" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)'}} />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative z-10 pt-36 pb-20 lg:pt-48 lg:pb-28 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 1, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Mic2 className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Founders Series
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tighter leading-[1.02] mb-6 max-w-5xl text-white">
            Conversations with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Founders.
            </span>
          </h1>

          <p className="text-base lg:text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
            Raw, unfiltered interviews with the builders, visionaries, and risk-takers
            who are rewriting the rules of business. No scripts. No filters. Just the real story.
          </p>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden border border-white/10"
          >
            {[
              { value: loading ? "-" : `${founders.length}+`, label: "Episodes" },
              { value: "100%", label: "Authentic" },
              { value: "∞", label: "Insights" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-8 lg:px-10 py-4 lg:py-5 bg-white/[0.03]"
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
