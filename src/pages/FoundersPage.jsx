import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mic2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import globePoster from "../assets/globe-poster.jpg";

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

// ── Social media SVG logos matching Pic 2 ─────────────────────────────────────
const SOCIAL_LOGOS = {
  ig: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%] text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  li: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  fb: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%] text-neutral-800" fill="currentColor">
      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.2-.8.8-.8H17V1H13.8C9.9 1 9 2.8 9 5.5V8z"/>
    </svg>
  ),
  yt: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%] text-neutral-800" fill="currentColor">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  pi: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="currentColor">
      <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.147 3.238 9.543 7.8 11.267-.103-.965-.195-2.451.041-3.51.213-.96 1.371-5.828 1.371-5.828s-.351-.703-.351-1.743c0-1.632.947-2.853 2.127-2.853.999 0 1.482.752 1.482 1.655 0 1.005-.639 2.507-.968 3.9-.276 1.168.587 2.122 1.74 2.122 2.088 0 3.693-2.202 3.693-5.38 0-2.812-2.022-4.78-4.907-4.78-3.344 0-5.309 2.508-5.309 5.1 0 1.011.389 2.096.877 2.687.096.117.11.22.081.339-.089.37-.288 1.171-.327 1.332-.052.21-.173.255-.399.15-1.489-.693-2.42-2.868-2.42-4.619 0-3.763 2.736-7.22 7.887-7.22 4.143 0 7.362 2.952 7.362 6.899 0 4.117-2.597 7.43-6.202 7.43-1.211 0-2.35-.629-2.74-1.373l-.747 2.846c-.27 1.029-1.002 2.318-1.493 3.118 1.125.347 2.316.535 3.551.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.115-2.882-6.976C16.593 1.905 14.116.88 11.48.88 6.046.88 1.624 5.299 1.62 10.738c-.001 1.639.499 3.236 1.447 4.807L2.09 21.09l5.657-1.482zM18.21 15.35c-.3-.15-1.77-.875-2.04-.975-.27-.1-.47-.15-.67.15-.2.3-.77.975-.94 1.175-.17.2-.34.225-.64.075-.3-.15-1.265-.467-2.41-1.487-.893-.797-1.495-1.782-1.67-2.082-.17-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C10.74 9.9 10.14 8.425 9.89 7.825c-.244-.596-.492-.51-.67-.52-.18-.01-.385-.01-.59-.01-.205 0-.54.077-.82.385-.28.308-1.07.105-1.07 2.562 0 2.457 1.79 4.823 2.04 5.157.25.333 3.525 5.385 8.54 7.555 1.19.515 2.12.822 2.846 1.053 1.2.38 2.29.325 3.15.195.96-.145 1.97-.8 2.25-1.535.28-.74.28-1.375.2-1.5-.08-.125-.28-.2-.58-.35z"/></svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  ma: (
    <svg viewBox="0 0 24 24" className="w-[55%] h-[55%] text-neutral-800" fill="currentColor">
      <path d="M17 6c-2.2 0-4.1 1.3-5 3.2C11.1 7.3 9.2 6 7 6 3.7 6 1 8.7 1 12s2.7 6 6 6c2.2 0 4.1-1.3 5-3.2.9 1.9 2.8 3.2 5 3.2 3.3 0 6-2.7 6-6s-2.7-6-6-6zm-10 9.5c-1.9 0-3.5-1.6-3.5-3.5S5.1 8.5 7 8.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm10 0c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
    </svg>
  ),
  ga: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="currentColor">
      <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6z"/>
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  )
};

// ── Animated Orbiting Globe UI (White Badges, Dark Realistic Sphere) ──────────
const ORBIT_ICONS = [
  { id: "ig",  icon: SOCIAL_LOGOS.ig,  angle: 0   },
  { id: "li",  icon: SOCIAL_LOGOS.li,  angle: 36  },
  { id: "pi",  icon: SOCIAL_LOGOS.pi,  angle: 72  },
  { id: "yt",  icon: SOCIAL_LOGOS.yt,  angle: 108 },
  { id: "web", icon: SOCIAL_LOGOS.web, angle: 144 },
  { id: "wa",  icon: SOCIAL_LOGOS.wa,  angle: 180 },
  { id: "seo", icon: SOCIAL_LOGOS.seo, angle: 216 },
  { id: "ma",  icon: SOCIAL_LOGOS.ma,  angle: 252 },
  { id: "ga",  icon: SOCIAL_LOGOS.ga,  angle: 288 },
  { id: "fb",  icon: SOCIAL_LOGOS.fb,  angle: 324 },
];

const ORBIT_R = 43; // orbit radius as % of container

// World Map Component: Seamless flat world map rotating horizontally
const WorldMapSvg = ({ mapRef }) => (
  <svg viewBox="0 0 200 100" ref={mapRef} className="absolute top-0 left-0 w-[200%] h-full opacity-80" style={{ transformStyle: "preserve-3d" }}>
    {/* Map 1 */}
    <g fill="#f1f5f9" opacity="0.9">
      {/* Greenland */}
      <path d="M38,8 C43,7 46,12 43,15 C40,16 37,13 38,8 Z" />
      {/* North America */}
      <path d="M10,20 C15,18 20,10 25,10 C30,10 32,15 35,15 C38,15 40,12 42,12 C44,15 42,20 40,22 C35,25 32,30 32,35 C30,38 25,35 20,32 C15,30 8,28 10,20 Z" />
      {/* South America */}
      <path d="M32,35 C35,37 38,42 36,48 C34,55 30,62 28,68 C27,68 26,62 27,55 C28,48 29,42 32,35 Z" />
      {/* Africa */}
      <path d="M48,28 C55,27 60,30 62,35 C64,40 60,46 58,52 C55,56 50,58 48,56 C46,54 46,48 47,42 C47,35 45,30 48,28 Z" />
      {/* Eurasia */}
      <path d="M48,15 C52,10 65,8 75,12 C82,14 88,10 92,15 C95,20 90,25 85,28 C80,30 75,26 70,30 C65,32 60,28 55,27 Z" />
      {/* India & Indochina */}
      <path d="M70,30 C72,32 74,38 72,40 C70,42 68,38 68,36 C66,35 64,32 65,30 Z" />
      <path d="M78,32 C80,35 82,38 80,42 C78,44 76,40 76,36 Z" />
      {/* Australia */}
      <path d="M76,46 C81,46 84,50 82,54 C79,56 75,55 74,52 C74,49 75,46 76,46 Z" />
      {/* Japan / Indonesia / Philippines */}
      <path d="M88,18 C89,18 89,22 88,22 Z" />
      <path d="M84,38 C85,38 85,40 84,40 Z" />
    </g>
    {/* Map 2 (Offset by 100) */}
    <g fill="#f1f5f9" opacity="0.9" transform="translate(100, 0)">
      {/* Greenland */}
      <path d="M38,8 C43,7 46,12 43,15 C40,16 37,13 38,8 Z" />
      {/* North America */}
      <path d="M10,20 C15,18 20,10 25,10 C30,10 32,15 35,15 C38,15 40,12 42,12 C44,15 42,20 40,22 C35,25 32,30 32,35 C30,38 25,35 20,32 C15,30 8,28 10,20 Z" />
      {/* South America */}
      <path d="M32,35 C35,37 38,42 36,48 C34,55 30,62 28,68 C27,68 26,62 27,55 C28,48 29,42 32,35 Z" />
      {/* Africa */}
      <path d="M48,28 C55,27 60,30 62,35 C64,40 60,46 58,52 C55,56 50,58 48,56 C46,54 46,48 47,42 C47,35 45,30 48,28 Z" />
      {/* Eurasia */}
      <path d="M48,15 C52,10 65,8 75,12 C82,14 88,10 92,15 C95,20 90,25 85,28 C80,30 75,26 70,30 C65,32 60,28 55,27 Z" />
      {/* India & Indochina */}
      <path d="M70,30 C72,32 74,38 72,40 C70,42 68,38 68,36 C66,35 64,32 65,30 Z" />
      <path d="M78,32 C80,35 82,38 80,42 C78,44 76,40 76,36 Z" />
      {/* Australia */}
      <path d="M76,46 C81,46 84,50 82,54 C79,56 75,55 74,52 C74,49 75,46 76,46 Z" />
      {/* Japan / Indonesia / Philippines */}
      <path d="M88,18 C89,18 89,22 88,22 Z" />
      <path d="M84,38 C85,38 85,40 84,40 Z" />
    </g>
  </svg>
);

function MobileGlobeUI({ className = "" }) {
  const mapRef = useRef(null);
  const orbitRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    let animationId;
    let mapOffset = 0;
    let orbitAngle = 0;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // 50% map translation loop runs every 24 seconds (approx 2.083% per second)
      mapOffset = (mapOffset - (2.083 * delta) / 1000) % 50;

      // 360 degree orbit loop runs every 28 seconds (approx 12.857 degrees per second)
      orbitAngle = (orbitAngle + (12.857 * delta) / 1000) % 360;

      // Directly update inline styles for smooth 60fps rotation, bypassing CSS keyframes block on mobile
      if (mapRef.current) {
        mapRef.current.style.transform = `translate3d(${mapOffset}%, 0, 0)`;
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = `rotate(${orbitAngle}deg)`;
      }
      iconRefs.current.forEach((el) => {
        if (el) {
          el.style.transform = `rotate(${-orbitAngle}deg)`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className={`relative w-full h-full rounded-full overflow-hidden select-none bg-[#02040a] ${className}`}
      style={{ background: "radial-gradient(ellipse at 40% 35%, #181d28 0%, #080a0f 60%, #010204 100%)" }}
    >
      {/* ── Overlapping elliptical wireframe orbit rings (matching Pic 2 mesh) ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.25 }}>
        <ellipse cx="50%" cy="50%" rx="45%" ry="18%" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" transform="rotate(-15 250 250)" />
        <ellipse cx="50%" cy="50%" rx="45%" ry="24%" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" transform="rotate(20 250 250)" />
        <ellipse cx="50%" cy="50%" rx="45%" ry="12%" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" transform="rotate(45 250 250)" />
        <ellipse cx="50%" cy="50%" rx="45%" ry="30%" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" transform="rotate(-60 250 250)" />
      </svg>

      {/* ── 3D Globe sphere (Central White/Grayscale Earth) ── */}
      <div style={{
        position: "absolute",
        borderRadius: "50%",
        width: "50%",
        height: "50%",
        top: "25%",
        left: "25%",
        background: "radial-gradient(circle at 35% 30%, #20242b 0%, #0d0f12 50%, #020304 100%)",
        boxShadow: "inset -8px -8px 24px rgba(0,0,0,0.85), inset 4px 4px 12px rgba(255,255,255,0.06), 0 0 35px rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
        {/* Rotating world map continents */}
        <WorldMapSvg mapRef={mapRef} />

        {/* 3D sphere ambient lighting shadows & specular overlays (non-moving on top of map) */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.88) 100%)",
          pointerEvents: "none",
        }} />
        {/* Specular light highlight reflection */}
        <div style={{
          position: "absolute",
          width: "35%",
          height: "28%",
          top: "5%",
          left: "8%",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "50%",
          filter: "blur(6px)",
          pointerEvents: "none",
        }} />
        {/* Atmospheric rim highlight border */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.15)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Spinning orbit container ── */}
      <div
        ref={orbitRef}
        className="absolute inset-0"
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* Connector lines inside the spinning orbit container */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          {ORBIT_ICONS.map(({ id, angle }) => {
            const rad = (angle - 90) * Math.PI / 180;
            const ix = 50 + ORBIT_R * Math.cos(rad);
            const iy = 50 + ORBIT_R * Math.sin(rad);
            const ex = 50 + 25.2 * Math.cos(rad); // globe boundary point
            const ey = 50 + 25.2 * Math.sin(rad);
            return (
              <line key={id + "_line"}
                x1={`${ix}%`} y1={`${iy}%`}
                x2={`${ex}%`} y2={`${ey}%`}
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
            );
          })}
        </svg>

        {/* Orbiting White Icon Badges */}
        {ORBIT_ICONS.map(({ id, icon, angle }, idx) => {
          const rad = (angle - 90) * Math.PI / 180;
          const leftPct = 50 + ORBIT_R * Math.cos(rad);
          const topPct  = 50 + ORBIT_R * Math.sin(rad);
          return (
            <div key={id} style={{
              position: "absolute",
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: "translate(-50%,-50%)",
            }}>
              {/* Counter-rotate icon badge to keep it upright */}
              <div
                ref={(el) => (iconRefs.current[idx] = el)}
                style={{ transformOrigin: "50% 50%" }}
              >
                <div
                  className="rounded-full bg-white flex items-center justify-center border transition-all duration-300"
                  style={{
                    width: "clamp(28px, 7.8vw, 42px)",
                    height: "clamp(28px, 7.8vw, 42px)",
                    borderColor: "rgba(0,0,0,0.12)",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.32), inset 0 2px 4px rgba(255,255,255,0.6)",
                  }}
                >
                  {icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Outer vignette overlay ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        pointerEvents: "none",
        boxShadow: "inset 0 0 45px rgba(0,0,0,0.65), inset 0 0 5px rgba(255,255,255,0.06)",
      }} />
    </div>
  );
}


// ── Globe Video Component for Desktop ──────────────────────────────────────────
function GlobeVideo({ className = "" }) {
  return <MobileGlobeUI className={className} />;
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
          <MobileGlobeUI />
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
