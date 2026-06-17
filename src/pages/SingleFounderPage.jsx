import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Mic2, Quote, Tag, ExternalLink, Play } from "lucide-react";
import { founders } from "./FoundersPage";

// ── Inline brand SVGs (lucide-react dropped brand icons) ─────────────────────
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ── Extracts Instagram post/reel shortcode from URL for embed ─────────────────
function getInstagramEmbed(url) {
  // Matches /p/CODE or /reel/CODE
  const match = url?.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
}

// ── Social Icon Row ───────────────────────────────────────────────────────────
function SocialHandles({ social }) {
  const handles = [
    {
      key: "instagram",
      Icon: InstagramIcon,
      label: "Instagram",
      color: "hover:text-[#E1306C]",
      borderHover: "hover:border-[#E1306C]/40",
    },
    {
      key: "linkedin",
      Icon: LinkedinIcon,
      label: "LinkedIn",
      color: "hover:text-[#0A66C2]",
      borderHover: "hover:border-[#0A66C2]/40",
    },
    {
      key: "twitter",
      Icon: TwitterIcon,
      label: "Twitter / X",
      color: "hover:text-white",
      borderHover: "hover:border-white/40",
    },
  ];

  const active = handles.filter((h) => social?.[h.key]);
  if (!active.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {active.map(({ key, Icon, label, color, borderHover }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 ${borderHover} text-white/50 ${color} transition-all duration-300 text-sm font-semibold`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </a>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SingleFounderPage() {
  const { slug } = useParams();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const founder = founders.find((f) => f.slug === slug);

  // ── 404 ────────────────────────────────────────────────────────────────────
  if (!founder) {
    return (
      <main className="bg-[#02040a] text-white min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-black">404</h1>
        <p className="text-white/50">This founder's episode was not found.</p>
        <Link
          to="/founders"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Founders Series
        </Link>
      </main>
    );
  }

  const currentIndex = founders.findIndex((f) => f.slug === slug);
  const prevFounder = founders[currentIndex - 1] || null;
  const nextFounder = founders[currentIndex + 1] || null;
  const embedUrl = getInstagramEmbed(founder.instagramVideoUrl);

  return (
    <main
      ref={containerRef}
      className="bg-[#02040a] text-white min-h-screen relative overflow-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[55%] h-[55%] bg-white/[0.03] blur-[160px] rounded-full" />
        <div className="absolute bottom-[15%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[160px] rounded-full" />
        <div className="star-drift opacity-30" />
        <div className="star-drift star-drift-2 opacity-15" />
      </div>

      {/* ═══════════════ BACK BUTTON ═══════════════ */}
      <div className="relative z-10 pt-32 pb-0 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/founders"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Founders Series
          </Link>
        </motion.div>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative z-10 pt-10 pb-16 lg:pb-24 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* — Left: Text — */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Episode Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Mic2 className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                {founder.episode} · Founders Series
              </span>
            </div>

            <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-3">
              {founder.name}
            </h1>
            <p className="text-lg text-white/50 font-medium mb-8">
              {founder.title} &mdash; {founder.company}
            </p>

            {/* Social Handles */}
            <div className="mb-8">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                Find them on
              </p>
              <SocialHandles social={founder.social} />
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-10">
              {founder.topics.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50"
                >
                  <Tag className="w-3 h-3" /> {t}
                </span>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="relative pl-6 border-l-2 border-white/20">
              <Quote className="absolute -top-2 -left-1 w-4 h-4 text-white/20" />
              <p className="text-xl lg:text-2xl font-semibold italic text-white/80 leading-relaxed">
                {founder.quote}
              </p>
              <p className="text-sm text-white/40 mt-3 font-medium">— {founder.name}</p>
            </div>
          </motion.div>

          {/* — Right: Photo — */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-[480px] mx-auto overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/40 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-5 -left-5 lg:-left-10 px-5 py-4 rounded-2xl bg-[#0b0e17]/80 backdrop-blur-xl border border-white/10 shadow-xl"
            >
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
                Featured Interview
              </p>
              <p className="text-sm font-bold text-white">{founder.episode}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ BIO SECTION ═══════════════ */}
      <section className="relative z-10 py-20 px-6 lg:px-14 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight mb-8">
              About {founder.name.split(" ")[0]}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">{founder.bio}</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ INSTAGRAM VIDEO SECTION ═══════════════ */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <InstagramIcon className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Watch the Interview
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
            The Full Conversation.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            Catch our exclusive interview with {founder.name.split(" ")[0]} — originally posted on our Instagram. Watch the full reel below or head straight to Instagram.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1fr_auto] gap-10 items-start"
        >
          {/* Instagram Embed */}
          <div className="w-full">
            {embedUrl ? (
              <div className="relative w-full max-w-[540px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
                <iframe
                  src={embedUrl}
                  title={`Interview with ${founder.name}`}
                  className="w-full"
                  style={{ minHeight: 680, border: "none", display: "block" }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              /* Fallback card if embed fails */
              <div className="relative w-full max-w-[540px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
                <div className="aspect-[4/5] flex flex-col items-center justify-center gap-6 p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shadow-lg">
                    <InstagramIcon className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg mb-2">Watch on Instagram</p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Our interview with {founder.name.split(" ")[0]} is live on Instagram. Tap below to watch the full reel.
                    </p>
                  </div>
                  <a
                    href={founder.instagramVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(253,29,29,0.3)] hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Watch the Interview
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: open on Instagram CTA */}
          <div className="lg:w-72 flex flex-col gap-6">
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center mb-5 shadow-lg">
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-bold text-white mb-2">Prefer Instagram?</p>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Watch the original reel directly on our Instagram profile.
              </p>
              <a
                href={founder.instagramVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-sm transition-all hover:shadow-[0_0_24px_rgba(253,29,29,0.3)] hover:scale-[1.02]"
              >
                <span>Open on Instagram</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Share handle if exists */}
            {founder.social?.instagram && (
              <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                  Follow {founder.name.split(" ")[0]}
                </p>
                <SocialHandles social={founder.social} />
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ PREV / NEXT NAVIGATION ═══════════════ */}
      {(prevFounder || nextFounder) && (
        <section className="relative z-10 py-16 px-6 lg:px-14 max-w-[1400px] mx-auto border-t border-white/5">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-8 text-center">
            More Episodes
          </p>
          <div
            className={`grid gap-6 ${
              prevFounder && nextFounder ? "md:grid-cols-2" : "max-w-md mx-auto"
            }`}
          >
            {prevFounder && (
              <Link to={`/founders/${prevFounder.slug}`} className="group">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-white transition-colors shrink-0" />
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                      Previous
                    </p>
                    <p className="font-bold text-white/80 group-hover:text-white transition-colors">
                      {prevFounder.name}
                    </p>
                    <p className="text-sm text-white/40">{prevFounder.episode}</p>
                  </div>
                </div>
              </Link>
            )}
            {nextFounder && (
              <Link to={`/founders/${nextFounder.slug}`} className="group">
                <div className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                      Next
                    </p>
                    <p className="font-bold text-white/80 group-hover:text-white transition-colors">
                      {nextFounder.name}
                    </p>
                    <p className="text-sm text-white/40">{nextFounder.episode}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors shrink-0" />
                </div>
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
