import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Camera,
  Video,
  Users,
  Heart,
  MessageCircle,
  MapPin,
  Tag,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  BadgeCheck,
  AlertCircle,
  RefreshCw,
  Calculator,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PRICING TABLES
// ─────────────────────────────────────────────────────────────────────────────

const INSTAGRAM_PRICING = [
  { label: "0–1K",     type: "Growth Phase",    story: [0,0],           post: null,               reel: null              },
  { label: "1K–5K",   type: "Nano Creator",     story: [200,500],       post: [500,1200],         reel: [1000,2000]       },
  { label: "5K–10K",  type: "Growing Nano",     story: [500,800],       post: [1000,2000],        reel: [2000,4000]       },
  { label: "10K–25K", type: "Micro",            story: [800,1500],      post: [2000,4000],        reel: [4000,8000]       },
  { label: "25K–50K", type: "Mid Micro",        story: [1500,3000],     post: [4000,8000],        reel: [8000,15000]      },
  { label: "50K–100K",type: "Upper Micro",      story: [3000,6000],     post: [8000,15000],       reel: [15000,30000]     },
  { label: "100K–250K",type:"Macro",            story: [6000,10000],    post: [15000,30000],      reel: [30000,60000]     },
  { label: "250K–500K",type:"Mid Macro",        story: [10000,20000],   post: [30000,60000],      reel: [60000,120000]    },
  { label: "500K–1M", type: "Mega Creator",     story: [20000,40000],   post: [60000,120000],     reel: [120000,250000]   },
  { label: "1M+",     type: "Premium Creator",  story: null,            post: null,               reel: null              },
];

const YOUTUBE_PRICING = [
  { label: "0–1K",     type: "Growth Phase",    shorts: null,           video: null               },
  { label: "1K–5K",   type: "Nano Creator",     shorts: [800,2000],     video: [2000,5000]        },
  { label: "5K–10K",  type: "Growing Nano",     shorts: [2000,4000],    video: [4000,8000]        },
  { label: "10K–25K", type: "Micro",            shorts: [4000,8000],    video: [8000,15000]       },
  { label: "25K–50K", type: "Mid Micro",        shorts: [8000,15000],   video: [15000,30000]      },
  { label: "50K–100K",type: "Upper Micro",      shorts: [15000,30000],  video: [30000,60000]      },
  { label: "100K–250K",type:"Macro",            shorts: [30000,60000],  video: [60000,120000]     },
  { label: "250K–500K",type:"Mid Macro",        shorts: [60000,120000], video: [120000,250000]    },
  { label: "500K–1M", type: "Mega Creator",     shorts: [120000,250000],video: [250000,500000]    },
  { label: "1M+",     type: "Premium Creator",  shorts: null,           video: null               },
];

const TIER_BOUNDARIES = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];

const CONTENT_CATEGORIES = [
  { value: "finance",       label: "Finance / Investing",     multiplier: 1.3 },
  { value: "tech",          label: "Tech / Gadgets",          multiplier: 1.3 },
  { value: "fashion",       label: "Fashion",                 multiplier: 1.1 },
  { value: "beauty",        label: "Beauty / Skincare",       multiplier: 1.1 },
  { value: "fitness",       label: "Fitness / Wellness",      multiplier: 1.1 },
  { value: "lifestyle",     label: "Lifestyle",               multiplier: 1.0 },
  { value: "food",          label: "Food & Cooking",          multiplier: 1.0 },
  { value: "travel",        label: "Travel",                  multiplier: 1.0 },
  { value: "entertainment", label: "Entertainment",           multiplier: 0.95 },
  { value: "gaming",        label: "Gaming",                  multiplier: 0.95 },
  { value: "education",     label: "Education",               multiplier: 1.0 },
  { value: "other",         label: "Other",                   multiplier: 1.0 },
];

const LOCATION_OPTIONS = [
  { value: "tier1",         label: "Tier 1 City (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune)", multiplier: 1.2 },
  { value: "tier2",         label: "Tier 2 City (Jaipur, Lucknow, Indore, Chandigarh, etc.)",         multiplier: 1.0 },
  { value: "tier3",         label: "Tier 3 City / Small Town / Rural",                                 multiplier: 0.85 },
  { value: "international", label: "International (Outside India)",                                     multiplier: 1.5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function getTierIndex(followers) {
  for (let i = 0; i < TIER_BOUNDARIES.length; i++) {
    if (followers < TIER_BOUNDARIES[i]) return i;
  }
  return TIER_BOUNDARIES.length; // 1M+
}

function calcER(likes, comments, followers) {
  if (!followers || followers === 0) return 0;
  return ((Number(likes) + Number(comments)) / Number(followers)) * 100;
}

function getERMultiplier(er) {
  if (er < 1)  return 0.6;
  if (er < 3)  return 0.85;
  if (er < 6)  return 1.0;
  if (er < 10) return 1.2;
  return 1.4;
}

function getERLabel(er) {
  if (er < 1)  return { label: "Low",         color: "text-red-400",    bg: "bg-red-400/10 border-red-400/30",    note: "Focus on content quality to improve engagement." };
  if (er < 3)  return { label: "Average",     color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", note: "Room for improvement — work on posting consistency." };
  if (er < 6)  return { label: "Good",        color: "text-emerald-400",bg: "bg-emerald-400/10 border-emerald-400/30", note: "Barter deals are very viable at this engagement level." };
  if (er < 10) return { label: "Excellent",   color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30",  note: "Strong paid campaign potential — brands will notice you." };
  return        { label: "Outstanding",       color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/30", note: "Premium positioning — you are significantly undercharging at market rates." };
}

function getCollabType(tierIndex, er) {
  if (tierIndex === 0) return "Barter Only";
  if (tierIndex === 1 && er < 3) return "Barter + Product Gifting";
  if (tierIndex === 1) return "Barter + Small Paid Campaigns";
  if (tierIndex <= 4) return "Paid Brand Campaigns";
  if (tierIndex <= 7) return "Dedicated Paid Campaigns + Brand Packages";
  if (tierIndex === 8) return "Premium Paid Campaigns + Long-term Partnerships";
  return "Custom Brand Representation (Contact THRM)";
}

function calcConfidenceScore(er, tierIndex) {
  let score = 50;
  if (er >= 3)  score += 15;
  if (er >= 6)  score += 10;
  if (er >= 10) score += 5;
  if (tierIndex >= 2) score += 10;
  if (tierIndex >= 4) score += 5;
  return Math.min(score, 95);
}

function applyMultipliers(base, erMult) {
  if (!base) return null;
  return [
    Math.round(base[0] * erMult),
    Math.round(base[1] * erMult),
  ];
}

function formatINR(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)   return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

function formatRange(range) {
  if (!range) return "Barter Only";
  return `${formatINR(range[0])} – ${formatINR(range[1])}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CALCULATION LOGIC
// ─────────────────────────────────────────────────────────────────────────────

function calculate({ platform, followers, avgLikes, avgComments, category, location }) {
  const f = Number(followers);
  const tierIndex = getTierIndex(f);
  const er = calcER(avgLikes, avgComments, f);
  const erMult = getERMultiplier(er);

  // Category and location are collected for THRM's reference only — not used in pricing
  const locObj = LOCATION_OPTIONS.find(l => l.value === location) || LOCATION_OPTIONS[0];
  const catObj = CONTENT_CATEGORIES.find(c => c.value === category) || CONTENT_CATEGORIES[5];

  const confidenceScore = calcConfidenceScore(er, tierIndex);
  const collabType = getCollabType(tierIndex, er);
  const erInfo = getERLabel(er);

  let formats = [];
  let creatorType = "";

  if (platform === "instagram") {
    const tier = INSTAGRAM_PRICING[tierIndex];
    creatorType = tier.type;

    if (tierIndex === 0) {
      formats = [
        { format: "Instagram Story",    range: "Barter Only" },
        { format: "Post / Carousel",    range: "Barter Only" },
        { format: "Reel",               range: "Barter Only" },
        { format: "Brand Package",      range: "Barter Only" },
      ];
    } else if (tierIndex >= 9) {
      formats = [
        { format: "Instagram Story",    range: "Custom Pricing" },
        { format: "Post / Carousel",    range: "Custom Pricing" },
        { format: "Reel",               range: "Custom Pricing" },
        { format: "Brand Package",      range: "Custom Pricing" },
      ];
    } else {
      const story = applyMultipliers(tier.story, erMult);
      const post  = applyMultipliers(tier.post,  erMult);
      const reel  = applyMultipliers(tier.reel,  erMult);
      const pkg   = post && reel
        ? [Math.round((post[0] + reel[0] + (story?.[0] || 0)) * 0.85), Math.round((post[1] + reel[1] + (story?.[1] || 0)) * 0.85)]
        : null;

      formats = [
        { format: "Instagram Story",    range: formatRange(story) },
        { format: "Post / Carousel",    range: formatRange(post)  },
        { format: "Reel",               range: formatRange(reel)  },
        { format: "Brand Package (Story + Post + Reel)", range: formatRange(pkg) },
      ];
    }
  } else {
    const tier = YOUTUBE_PRICING[tierIndex];
    creatorType = tier.type;

    if (tierIndex === 0) {
      formats = [
        { format: "YouTube Shorts",     range: "Barter Only" },
        { format: "Dedicated Video",    range: "Barter Only" },
      ];
    } else if (tierIndex >= 9) {
      formats = [
        { format: "YouTube Shorts",     range: "Custom Pricing" },
        { format: "Dedicated Video",    range: "Custom Pricing" },
      ];
    } else {
      const shorts = applyMultipliers(tier.shorts, erMult);
      const video  = applyMultipliers(tier.video,  erMult);

      formats = [
        { format: "YouTube Shorts",     range: formatRange(shorts) },
        { format: "Dedicated Video",    range: formatRange(video)  },
      ];
    }
  }

  return {
    platform,
    followers: f,
    er: er.toFixed(2),
    creatorType,
    tierLabel: (platform === "instagram" ? INSTAGRAM_PRICING : YOUTUBE_PRICING)[tierIndex].label,
    confidenceScore,
    collabType,
    erInfo,
    formats,
    locLabel: locObj.label.split(" (")[0],
    catLabel: catObj.label,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SelectField({ id, label, icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
        <Icon className="w-4 h-4" /> {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all cursor-pointer pr-10"
        >
          {placeholder && <option value="" disabled className="bg-[#0b1020]">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-[#0b1020] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      </div>
    </div>
  );
}

function NumberField({ id, label, icon: Icon, value, onChange, placeholder, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
        <Icon className="w-4 h-4" /> {label}
      </label>
      <input
        id={id}
        type="number"
        min="0"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white font-medium placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
      />
      {hint && <p className="text-xs text-white/30 pl-1">{hint}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIDENCE RING
// ─────────────────────────────────────────────────────────────────────────────

function ConfidenceRing({ score }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="56" cy="56" r={radius}
          fill="none" stroke="url(#confGrad)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <motion.p
          className="text-2xl font-black text-white leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {score}%
        </motion.p>
        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Confidence</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ResultCard({ result, onReset }) {
  const { platform, followers, er, creatorType, tierLabel, confidenceScore, collabType, erInfo, formats, locLabel, catLabel } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-violet-400">Your Creator Profile</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Here's What You're Worth
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Recalculate
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT — Profile Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-7 flex flex-col gap-6"
        >
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-4">Creator Summary</p>
            <div className="space-y-3">
              {[
                { k: "Platform",        v: platform === "instagram" ? "📸 Instagram" : "▶️ YouTube" },
                { k: "Followers",       v: Number(followers).toLocaleString("en-IN") },
                { k: "Follower Tier",   v: tierLabel },
                { k: "Creator Type",    v: creatorType },
                { k: "Engagement Rate", v: `${er}%` },
                { k: "Location",        v: locLabel },
                { k: "Category",        v: catLabel },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-sm text-white/50 font-medium">{k}</span>
                  <span className="text-sm font-bold text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Score Ring */}
          <div className="flex items-center gap-5 pt-2 border-t border-white/10">
            <ConfidenceRing score={confidenceScore} />
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Confidence Score</p>
              <p className="text-sm text-white/70 leading-relaxed">
                How likely brands are to pay within this estimated range for your audience quality.
              </p>
            </div>
          </div>

          {/* Collab Type */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Recommended Collaboration</p>
            <p className="text-base font-bold text-white">{collabType}</p>
          </div>
        </motion.div>

        {/* RIGHT — Pricing Breakdown */}
        <div className="flex flex-col gap-6">

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-7"
          >
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-5">Estimated Pricing Breakdown</p>
            <div className="space-y-0">
              {/* Table header */}
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Format</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Price Range</span>
              </div>
              {formats.map((f, i) => (
                <motion.div
                  key={f.format}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex justify-between items-center py-3.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-white/70 font-medium">{f.format}</span>
                  <span className="text-sm font-bold text-white">{f.range}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ER Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl border p-5 flex gap-4 items-start ${erInfo.bg}`}
          >
            <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${erInfo.color}`} />
            <div>
              <p className={`font-bold text-sm mb-1 ${erInfo.color}`}>
                Engagement Rate: {er}% — {erInfo.label}
              </p>
              <p className="text-xs text-white/60 leading-relaxed">{erInfo.note}</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="group w-full flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-black hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Get Represented by THRM
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-center text-xs text-white/30 mt-3">
              Let us negotiate brand deals and manage your influencer campaigns.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM
// ─────────────────────────────────────────────────────────────────────────────

function CalculatorForm({ onResult }) {
  const [platform, setPlatform] = useState("instagram");
  const [followers, setFollowers]     = useState("");
  const [avgLikes, setAvgLikes]       = useState("");
  const [avgComments, setAvgComments] = useState("");
  const [category, setCategory]       = useState("");
  const [location, setLocation]       = useState("");
  const [errors, setErrors]           = useState({});

  // Live ER preview
  const liveER = followers && avgLikes !== ""
    ? calcER(avgLikes, avgComments || 0, followers).toFixed(2)
    : null;
  const liveERInfo = liveER !== null ? getERLabel(Number(liveER)) : null;

  // Live tier label
  const liveTier = followers
    ? (platform === "instagram" ? INSTAGRAM_PRICING : YOUTUBE_PRICING)[getTierIndex(Number(followers))]
    : null;

  function validate() {
    const e = {};
    if (!followers || Number(followers) <= 0) e.followers = "Enter a valid follower count";
    if (avgLikes === "" || Number(avgLikes) < 0) e.avgLikes = "Enter average likes";
    if (!category) e.category = "Select a content category";
    if (!location) e.location = "Select your location";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onResult(calculate({ platform, followers, avgLikes, avgComments: avgComments || 0, category, location }));
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-8"
    >
      {/* Platform selector */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Platform
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "instagram", icon: Camera, label: "Instagram" },
            { value: "youtube",   icon: Video,   label: "YouTube"   },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPlatform(value)}
              className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${
                platform === value
                  ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  : "bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className={`w-8 h-8 transition-transform group-hover:scale-110 ${platform === value ? "text-black" : ""}`} />
              <span className="font-bold text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Followers */}
      <div className="flex flex-col gap-2">
        <NumberField
          id="followers"
          label="Followers / Subscribers"
          icon={Users}
          value={followers}
          onChange={setFollowers}
          placeholder="e.g. 8400"
          hint="Total number of followers on your selected platform"
        />
        <AnimatePresence>
          {liveTier && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 pl-1"
            >
              <BadgeCheck className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-violet-400">{liveTier.type}</span>
              <span className="text-xs text-white/30">({liveTier.label} followers)</span>
            </motion.div>
          )}
        </AnimatePresence>
        {errors.followers && <p className="text-xs text-red-400 pl-1">{errors.followers}</p>}
      </div>

      {/* Avg Likes + Comments */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <NumberField
            id="avgLikes"
            label="Average Likes"
            icon={Heart}
            value={avgLikes}
            onChange={setAvgLikes}
            placeholder="e.g. 600"
            hint="Per post average"
          />
          {errors.avgLikes && <p className="text-xs text-red-400 pl-1 mt-1">{errors.avgLikes}</p>}
        </div>
        <NumberField
          id="avgComments"
          label="Average Comments"
          icon={MessageCircle}
          value={avgComments}
          onChange={setAvgComments}
          placeholder="e.g. 25"
          hint="Optional — defaults to 0"
        />
      </div>

      {/* Live ER Preview */}
      <AnimatePresence>
        {liveER !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className={`rounded-2xl border p-4 flex gap-4 items-center overflow-hidden ${liveERInfo.bg}`}
          >
            <TrendingUp className={`w-5 h-5 shrink-0 ${liveERInfo.color}`} />
            <div>
              <span className={`text-sm font-bold ${liveERInfo.color}`}>
                Live Engagement Rate: {liveER}% — {liveERInfo.label}
              </span>
              <p className="text-xs text-white/50 mt-0.5">{liveERInfo.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category + Location */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <SelectField
            id="category"
            label="Content Category"
            icon={Tag}
            value={category}
            onChange={setCategory}
            options={CONTENT_CATEGORIES}
            placeholder="Select category"
          />
          {errors.category && <p className="text-xs text-red-400 pl-1 mt-1">{errors.category}</p>}
        </div>
        <div>
          <SelectField
            id="location"
            label="Your Location"
            icon={MapPin}
            value={location}
            onChange={setLocation}
            options={LOCATION_OPTIONS.map(l => ({ value: l.value, label: l.label.split(" (")[0] }))}
            placeholder="Select location"
          />
          {errors.location && <p className="text-xs text-red-400 pl-1 mt-1">{errors.location}</p>}
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group flex items-center justify-center gap-3 w-full rounded-2xl bg-white px-8 py-5 font-bold text-black text-base transition-all hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
      >
        <Calculator className="w-5 h-5" />
        Calculate My Worth
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function InfluencerCalculatorPage() {
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  function handleResult(res) {
    setResult(res);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">

      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-white transform origin-left z-50"
      />

      {/* Ambient BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-15%] w-[55%] h-[55%] bg-violet-500/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="star-drift opacity-30" />
        <div className="star-drift star-drift-2 opacity-15" />
      </div>

      {/* ──────── HERO ──────── */}
      <section className="relative z-10 pt-40 pb-16 lg:pt-52 lg:pb-24 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-300">
              Free Creator Tool
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black tracking-tighter leading-[1.05] mb-6">
            Know Your Worth.{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-blue-400">
              Charge What You Deserve.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-6">
            Stop undercharging brands. Enter your stats below and get an
            instant breakdown of what you should be charging — based on real
            market data, engagement rate, and your location.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 mb-0">
            {[
              { label: "Platforms", value: "Instagram & YouTube" },
              { label: "Pricing Formula", value: "Market-Benchmarked" },
              { label: "Result", value: "Instant" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-white font-bold text-base">{value}</span>
                <span className="text-white/40 text-xs uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="relative z-10 py-12 px-6 lg:px-14 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Enter Your Stats", desc: "Platform, followers, avg likes, comments, content category & location." },
              { step: "02", title: "We Calculate",     desc: "Our formula applies your engagement rate against industry-standard base rates per follower tier." },
              { step: "03", title: "Know Your Worth",  desc: "Get a full pricing breakdown per content format with a confidence score." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <span className="text-4xl font-black text-white/10">{step}</span>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CALCULATOR ──────── */}
      <section className="relative z-10 py-20 lg:py-28 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto">

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
                <Calculator className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Rate Calculator</h2>
                <p className="text-xs text-white/40">Fill in all fields for the most accurate result</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!result ? (
                <CalculatorForm key="form" onResult={handleResult} />
              ) : (
                <div key="result" ref={resultRef}>
                  <ResultCard result={result} onReset={() => setResult(null)} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ──────── ENGAGEMENT RATE GUIDE ──────── */}
      <section className="relative z-10 py-20 px-6 lg:px-14 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight mb-3">Understanding Engagement Rate</h2>
            <p className="text-white/50 text-base">
              ER = (Avg Likes + Avg Comments) ÷ Followers × 100
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { range: "Below 1%",  label: "Low",         color: "text-red-400",    bg: "bg-red-400/5 border-red-400/15",          desc: "Focus on content quality" },
              { range: "1% – 3%",  label: "Average",     color: "text-yellow-400", bg: "bg-yellow-400/5 border-yellow-400/15",    desc: "Room for improvement" },
              { range: "3% – 6%",  label: "Good",        color: "text-emerald-400",bg: "bg-emerald-400/5 border-emerald-400/15",  desc: "Barter deals viable" },
              { range: "6% – 10%", label: "Excellent",   color: "text-blue-400",   bg: "bg-blue-400/5 border-blue-400/15",        desc: "Strong paid potential" },
              { range: "10% +",    label: "Outstanding", color: "text-violet-400", bg: "bg-violet-400/5 border-violet-400/15",    desc: "Premium positioning" },
            ].map(({ range, label, color, bg, desc }, i) => (
              <motion.div
                key={range}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 text-center ${bg}`}
              >
                <p className={`text-lg font-black ${color}`}>{range}</p>
                <p className={`text-xs font-bold uppercase tracking-wider mt-1 mb-2 ${color}`}>{label}</p>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA BAND ──────── */}
      <section className="relative z-10 py-20 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-10 md:p-14"
          >
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight mb-4">
              Ready to land brand deals at the right price?
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              THRM manages influencer campaigns end-to-end — we negotiate rates, handle contracts,
              and connect you with brands that match your niche.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Get Represented by THRM <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
