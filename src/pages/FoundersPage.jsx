import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mic2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../config";

// ── GLOBE SECTION ─────────────────────────────────────────────────────────────

function getCardSize(count) {
  if (count <= 4) return { cardW: 240, cardH: 320, globeD: 430, gap: 28, infoH: 64, badgeFontSize: "0.65rem", nameFontSize: "0.82rem", titleFontSize: "0.65rem" };
  if (count <= 6) return { cardW: 200, cardH: 266, globeD: 415, gap: 24, infoH: 56, badgeFontSize: "0.6rem", nameFontSize: "0.74rem", titleFontSize: "0.6rem" };
  if (count <= 8) return { cardW: 175, cardH: 230, globeD: 390, gap: 20, infoH: 50, badgeFontSize: "0.55rem", nameFontSize: "0.66rem", titleFontSize: "0.55rem" };
  return { cardW: 165, cardH: 220, globeD: 360, gap: 18, infoH: 48, badgeFontSize: "0.55rem", nameFontSize: "0.66rem", titleFontSize: "0.55rem" };
}

// Dynamic slot mapping function supporting 4-2-2-3 (11 founders) and 4-2-2-4 (12 founders)
function getSlotMap(count) {
  if (count === 11) {
    // 4-2-2-3 layout
    return [
      { zone: "top", slot: 0 }, { zone: "top", slot: 1 }, { zone: "top", slot: 2 }, { zone: "top", slot: 3 },
      { zone: "left", slot: 0 }, { zone: "left", slot: 1 },
      { zone: "right", slot: 0 }, { zone: "right", slot: 1 },
      { zone: "bottom", slot: 0 }, { zone: "bottom", slot: 1 }, { zone: "bottom", slot: 2 }
    ];
  } else if (count >= 12) {
    // 4-2-2-4 layout
    return [
      { zone: "top", slot: 0 }, { zone: "top", slot: 1 }, { zone: "top", slot: 2 }, { zone: "top", slot: 3 },
      { zone: "left", slot: 0 }, { zone: "left", slot: 1 },
      { zone: "right", slot: 0 }, { zone: "right", slot: 1 },
      { zone: "bottom", slot: 0 }, { zone: "bottom", slot: 1 }, { zone: "bottom", slot: 2 }, { zone: "bottom", slot: 3 }
    ];
  }

  // Default 3-2-2-3 layout for 10 or fewer founders
  return [
    { zone: "top", slot: 0 }, { zone: "top", slot: 1 }, { zone: "top", slot: 2 },
    { zone: "left", slot: 0 }, { zone: "left", slot: 1 },
    { zone: "right", slot: 0 }, { zone: "right", slot: 1 },
    { zone: "bottom", slot: 0 }, { zone: "bottom", slot: 1 }, { zone: "bottom", slot: 2 }
  ];
}

// ── Mini founder card ─────────────────────────────────────────────────────────
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
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
            <Mic2 className="w-2 h-2 text-white/60 shrink-0" />
            <span className="text-[0.55rem] font-bold tracking-widest uppercase text-white/60 whitespace-nowrap">
              EP {String(founder.episode).padStart(2, "0")}
            </span>
          </div>
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
  const count = loading ? 11 : founders.length;
  const { cardW, cardH, globeD, gap, infoH, badgeFontSize, nameFontSize, titleFontSize } = getCardSize(count);

  const slotMap = getSlotMap(count);
  const slots = loading ? slotMap : slotMap.slice(0, Math.min(founders.length, slotMap.length));

  const byZone = { top: [], left: [], right: [], bottom: [] };
  slots.forEach((s, i) => {
    byZone[s.zone].push(loading ? { skeleton: true, i } : { founder: founders[i], i });
  });

  const cardProps = { cardW, cardH, infoH, badgeFontSize, nameFontSize, titleFontSize };

  const ConnectorLine = ({ direction }) => {
    const isH = direction === "h";
    return (
      <div
        className="pointer-events-none"
        style={{
          width: isH ? gap : 1,
          height: isH ? gap : 1,
          background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
          flexShrink: 0,
        }}
      />
    );
  };

  const videoRef = useRef(null);
  const videoRefDesktop = useRef(null);

  useEffect(() => {
    const refs = [videoRef.current, videoRefDesktop.current].filter(Boolean);
    const observers = refs.map((video) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
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

  const displayFounders = loading ? slots.map((s, i) => ({ skeleton: true, i })) : founders.map((f, i) => ({ founder: f, i }));

  return (
    <section className="relative z-10 py-16 lg:py-24 overflow-hidden" style={{ willChange: "transform", transform: "translateZ(0)" }}>
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

      {/* MOBILE ORBITAL GLOBE LAYOUT */}
      <div className="lg:hidden flex justify-center items-center px-4 py-8 overflow-hidden">
        <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">

          {/* Outer Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute inset-6 rounded-full border border-white/10 border-dashed pointer-events-none" />
          <div className="absolute inset-14 rounded-full border border-white/5 pointer-events-none" />

          {/* Central Globe Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden z-10"
            style={{
              backgroundImage: "url('/images/globe-poster.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.25)",
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
            />
          </motion.div>

          {/* Orbiting Founder Avatars */}
          {displayFounders.map((item, index) => {
            const total = displayFounders.length;
            const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
            const radius = 135; // Radius matching mobile orbital design
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (item.skeleton) {
              return (
                <div
                  key={index}
                  className="absolute w-10 h-10 rounded-full bg-white/10 animate-pulse border border-white/20"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                />
              );
            }

            return (
              <motion.div
                key={item.founder._id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="absolute z-20"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <Link to={`/founders/${item.founder.slug}`} className="group relative block">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white transition-all shadow-lg bg-black">
                    <img
                      src={getImageUrl(item.founder.imageUrl)}
                      alt={item.founder.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${API_BASE_URL}/uploads/thrm_founders/${item.founder.slug}.jpg`;
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Tooltip on tap/hover */}
                  <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-white/20 rounded px-1.5 py-0.5 whitespace-nowrap pointer-events-none z-30">
                    <p className="text-[0.55rem] font-bold text-white">{item.founder.name}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-col items-center gap-0 select-none px-4">
        {byZone.top.length > 0 && (
          <div className="flex items-end justify-center" style={{ gap: gap }}>
            {byZone.top.map((item) =>
              item.skeleton
                ? <SkeletonCard key={item.i} {...cardProps} />
                : <GlobeCard key={item.founder._id} founder={item.founder} delay={0.05 + item.i * 0.05} {...cardProps} />
            )}
          </div>
        )}

        {byZone.top.length > 0 && (
          <div className="flex items-center justify-center" style={{ gap: gap }}>
            {byZone.top.map((item) => (
              <div key={item.i} style={{ width: cardW, display: "flex", justifyContent: "center" }}>
                <ConnectorLine direction="v" />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center">
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

        {byZone.bottom.length > 0 && (
          <div className="flex items-center justify-center" style={{ gap: gap }}>
            {byZone.bottom.map((item) => (
              <div key={item.i} style={{ width: cardW, display: "flex", justifyContent: "center" }}>
                <ConnectorLine direction="v" />
              </div>
            ))}
          </div>
        )}

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

// ── DEFAULT DATA ─────────────────────────────────────────────────────────────

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
  },
  {
    _id: "f11",
    slug: "astha-shah",
    name: "Astha Shah",
    title: "Founder",
    company: "Lil Pitaara",
    episode: 11,
    imageUrl: "/images/founders/astha-shah.jpeg",
    instaUrl: "https://www.instagram.com/reel/DXOfyLkta51/?igsi=cDdxbHdzcGh3MnVu"
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
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

      <div className="fixed inset-0 pointer-events-none z-0" style={{ contain: "strict", transform: "translate3d(0,0,0)" }}>
        <div className="absolute top-[5%] left-[-5%] w-[55%] h-[55%] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <section className="relative z-10 pt-36 pb-20 lg:pt-48 lg:pb-28 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 1, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
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

      <GlobeSection founders={founders} loading={loading} />
    </main>
  );
}