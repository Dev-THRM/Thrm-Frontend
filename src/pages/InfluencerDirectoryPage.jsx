import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { API_BASE_URL } from "../config";
import {
  Users,
  Search,
  Camera,
  Video,
  Star,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

const CATEGORIES = [
  "finance", "tech", "fashion", "beauty", "fitness",
  "lifestyle", "food", "travel", "entertainment", "gaming", "education", "other",
];

const CATEGORY_LABELS = {
  finance: "Finance", tech: "Tech", fashion: "Fashion", beauty: "Beauty",
  fitness: "Fitness", lifestyle: "Lifestyle", food: "Food", travel: "Travel",
  entertainment: "Entertainment", gaming: "Gaming", education: "Education", other: "Other",
};

function formatFollowers(n) {
  if (!n) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function extractUsername(link) {
  if (!link) return "";
  let str = link.trim();
  if (str.startsWith('@') && !str.includes('/')) return str.split('?')[0];
  
  try {
    if (!str.startsWith('http')) {
      if (str.includes('.com')) str = 'https://' + str;
      else {
        str = str.split('?')[0];
        return str.startsWith('@') ? str : '@' + str;
      }
    }
    const url = new URL(str);
    const paths = url.pathname.split('/').filter(Boolean);
    if (paths.length > 0) {
      const last = paths[paths.length - 1];
      return last.startsWith('@') ? last : '@' + last;
    }
  } catch (e) {}
  
  str = str.split('?')[0];
  return str.startsWith('@') ? str : '@' + str;
}

function InfluencerCard({ inf, index, onClick }) {
  const igData = inf.instagram;
  const ytData = inf.youtube;
  const primaryData = igData || ytData;
  if (!primaryData) return null;

  // Build generated fallback avatar
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(inf.name)}&background=1a1a2e&color=ffffff&size=128&bold=true&format=png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 overflow-hidden hover:border-white/25 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-300 flex flex-col"
    >
      {/* Card header */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] z-0" />

        {/* Full Header Image (if custom uploaded) */}
        {inf.profileImage && (
          <>
            <img
              src={inf.profileImage}
              alt={inf.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
                // Show the fallback circle if custom image fails
                if (e.currentTarget.nextElementSibling && e.currentTarget.nextElementSibling.nextElementSibling) {
                   e.currentTarget.nextElementSibling.style.display = "none"; // hide overlay
                   e.currentTarget.nextElementSibling.nextElementSibling.style.display = "block"; // show fallback
                }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay to ensure badges stay readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/20 to-black/40 z-0 pointer-events-none" />
          </>
        )}

        {/* Circular Fallback (if no custom upload, or if custom upload fails) */}
        <img
          src={fallbackAvatarUrl}
          alt={inf.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-white/20 z-10 relative"
          style={{ display: inf.profileImage ? "none" : "block" }}
        />

        {/* Platform badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5">
          {igData && (
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1">
              <Camera className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white">IG</span>
            </div>
          )}
          {ytData && (
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1">
              <Video className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white">YT</span>
            </div>
          )}
        </div>

        {/* Category pill */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white/80 capitalize">
            {primaryData.category || "General"}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow gap-4 sm:gap-5">
        <div>
          <h3 className="text-base sm:text-xl font-black text-white mb-0.5 truncate">{inf.name}</h3>
          <p className="text-white/40 text-[10px] sm:text-sm font-medium truncate">{extractUsername(primaryData.handle)}</p>
        </div>

        <div className="space-y-3">
          {igData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/50 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Instagram</span>
                <span className="sm:hidden">IG</span>
              </div>
              <div className="text-right flex flex-col sm:block">
                <span className="font-black text-white text-sm sm:text-base">{formatFollowers(igData.followers)}</span>
                <span className="text-white/40 text-[9px] sm:text-xs sm:ml-1 uppercase sm:lowercase">followers</span>
              </div>
            </div>
          )}
          {ytData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/50 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">YouTube</span>
                <span className="sm:hidden">YT</span>
              </div>
              <div className="text-right flex flex-col sm:block">
                <span className="font-black text-white text-sm sm:text-base">{formatFollowers(ytData.followers)}</span>
                <span className="text-white/40 text-[9px] sm:text-xs sm:ml-1 uppercase sm:lowercase">subs</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-white/50 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Tier</span>
          <span className="text-[10px] sm:text-xs font-bold text-white px-2 py-1 sm:px-3 sm:py-1 bg-white/5 border border-white/10 rounded-full capitalize truncate max-w-[120px] text-right">
            {primaryData.creatorType}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function InfluencerModal({ inf, onClose }) {
  const igData = inf.instagram;
  const ytData = inf.youtube;
  const primaryData = igData || ytData;
  const [isConnecting, setIsConnecting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", company: "", niche: "", description: "" });

  if (!primaryData) return null;

  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(inf.name)}&background=1a1a2e&color=ffffff&size=128&bold=true&format=png`;

  const handleConnectSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setSubmitStatus('invalid_phone');
      return;
    }
    setSubmitStatus('loading');
    
    const messageBody = `
New Brand Connection Request for Influencer: ${inf.name} (Phone: ${inf.mobile})

Brand Details:
Name: ${formData.name}
Phone: ${formData.phone}
Company/Brand: ${formData.company}
Niche: ${formData.niche}
Description: ${formData.description}
    `;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_ACCESS_WEB_3,
          subject: `Brand Collab Request: ${formData.company} x ${inf.name}`,
          from_name: "THRM Influencer Directory",
          message: messageBody,
        }),
      });

      const result = await response.json();
      
      // Save to Database
      try {
        await fetch(`${API_BASE_URL}/api/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            company: formData.company,
            niche: formData.niche,
            description: formData.description,
            influencerId: inf._id
          })
        });
      } catch (dbErr) {
        console.error("Database save failed:", dbErr);
      }

      if (result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-gradient-to-br from-[#0a0a1a] to-[#02040a] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12">
          {/* Header / Avatar */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl overflow-hidden border border-white/20 relative shadow-2xl">
              <img
                src={inf.profileImage || fallbackAvatarUrl}
                alt={inf.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = fallbackAvatarUrl; }}
              />
            </div>
            <div className="text-center md:text-left flex-grow pt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-bold tracking-widest uppercase text-violet-400">Creator Profile</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{inf.name}</h2>
                  <p className="text-white/50 text-lg font-medium">{extractUsername(primaryData.handle)}</p>
                </div>
                
                {!isConnecting && (
                  <button 
                    onClick={() => setIsConnecting(true)}
                    className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                  >
                    Connect with {inf.name.split(' ')[0]}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Conditional Rendering: Connect Form OR Platform Data Sections */}
          {isConnecting ? (
            <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Connect with {inf.name}</h3>
                  <p className="text-white/50 text-sm">Fill in your brand details to request a collaboration.</p>
                </div>
                <button onClick={() => setIsConnecting(false)} className="text-sm text-white/50 hover:text-white underline">Cancel</button>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="p-8 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Request Sent Successfully!</h4>
                  <p className="text-green-200/80 mb-6">The influencer has been notified and our team will facilitate the connection shortly.</p>
                  <button onClick={() => { setIsConnecting(false); setSubmitStatus(null); }} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors">Back to Profile</button>
                </div>
              ) : (
                <form onSubmit={handleConnectSubmit} className="space-y-4">
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4" /> Failed to send request. Please try again.
                    </div>
                  )}
                  {submitStatus === 'invalid_phone' && (
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4" /> Please enter a valid 10-digit phone number.
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70 ml-1">Your Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70 ml-1">Phone Number *</label>
                      <input required type="tel" value={formData.phone} onChange={e => {
                        let clean = e.target.value.replace(/\D/g, '');
                        if (clean.length > 10 && clean.startsWith("91")) clean = clean.slice(2);
                        setFormData({...formData, phone: clean.slice(0, 10)});
                      }} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50" placeholder="9876543210" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70 ml-1">Company / Brand Name *</label>
                      <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50" placeholder="Acme Corp" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70 ml-1">Niche / Industry *</label>
                      <input required type="text" value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50" placeholder="e.g. Fashion, Tech" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70 ml-1">Campaign Description *</label>
                    <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 resize-none" placeholder="Briefly describe what you're looking for..." />
                  </div>
                  <button type="submit" disabled={submitStatus === 'loading'} className="w-full group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-black transition-all hover:bg-gray-200 disabled:opacity-70 mt-2">
                    {submitStatus === 'loading' ? 'Sending...' : (
                      <><span>Send Request</span><Send className="h-4 w-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
          <div className="space-y-10">
            {[igData && { ...igData, platformName: "Instagram", icon: Camera }, ytData && { ...ytData, platformName: "YouTube", icon: Video }]
              .filter(Boolean)
              .map((data, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <data.icon className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">{data.platformName} Details</h3>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Summary */}
                    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-7 flex flex-col gap-6">
                      <div className="space-y-3">
                        {[
                          { k: "Followers", v: formatFollowers(data.followers) },
                          { k: "Category", v: CATEGORY_LABELS[data.category] || data.category },
                          { k: "Creator Type", v: data.creatorType },
                          { k: "Follower Tier", v: data.tierLabel },
                        ].map(({ k, v }) => (
                          <div key={k} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="text-sm text-white/50 font-medium">{k}</span>
                            <span className="text-sm font-bold text-white">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Collab Type</p>
                        <p className="text-sm font-bold text-white">{data.collabType}</p>
                      </div>
                    </div>

                    {/* Pricing / Formats */}
                    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-7">
                      <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-5">Estimated Pricing</p>
                      <div className="space-y-0">
                        <div className="flex justify-between pb-2 border-b border-white/10">
                          <span className="text-xs font-bold uppercase tracking-widest text-white/30">Format</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-white/30">Price Range</span>
                        </div>
                        {(data.formats || []).map((f, i) => (
                          <div key={i} className="flex justify-between items-center py-3.5 border-b border-white/5 last:border-0">
                            <span className="text-sm text-white/70 font-medium">{f.format}</span>
                            <span className="text-sm font-bold text-white">{f.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InfluencerDirectoryPage() {
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlatform, setActivePlatform] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/influencers`);
        const data = await res.json();
        if (data.success) setInfluencers(data.influencers);
      } catch (err) {
        console.error("Failed to fetch influencers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  const filtered = influencers
    .filter((inf) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        inf.name.toLowerCase().includes(q) ||
        (inf.instagram?.handle || "").toLowerCase().includes(q) ||
        (inf.youtube?.handle || "").toLowerCase().includes(q);

      const matchPlatform =
        activePlatform === "all" ||
        (activePlatform === "instagram" && inf.instagram) ||
        (activePlatform === "youtube" && inf.youtube);

      const matchCategory =
        activeCategory === "all" ||
        inf.instagram?.category === activeCategory ||
        inf.youtube?.category === activeCategory;

      return matchSearch && matchPlatform && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      const aF = Math.max(a.instagram?.followers || 0, a.youtube?.followers || 0);
      const bF = Math.max(b.instagram?.followers || 0, b.youtube?.followers || 0);
      return sortBy === "followers_desc" ? bF - aF : aF - bF;
    });

  const igCount = influencers.filter((i) => i.instagram).length;
  const ytCount = influencers.filter((i) => i.youtube).length;

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      {/* Scroll Progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Ambient BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-15%] w-[60%] h-[50%] bg-white/[0.04] blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.04] blur-[160px] rounded-full" />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-28 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Star className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Creator Network</span>
          </div>

          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black tracking-tighter leading-[1.05] mb-6">
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Verified Creators.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto mb-12">
            Browse THRM's network of vetted influencers — searchable by name, platform, category, and tier.
          </p>

          {/* Live Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mt-4">
            {[
              { label: "Total Creators", value: influencers.length },
              { label: "On Instagram", value: igCount },
              { label: "On YouTube", value: ytCount },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-5xl font-black text-white">{value}</p>
                <p className="text-white/40 text-sm font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ SEARCH & FILTERS ═══ */}
      <section className="relative z-10 px-6 lg:px-14 max-w-[1400px] mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-3 items-stretch p-4 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-sm mb-4"
        >
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/35" />
            <input
              type="text"
              placeholder="Search by name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none border-none py-4 pl-14 pr-6 text-white font-medium placeholder:text-white/30 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-3 md:border-l border-white/10 md:pl-4 flex-wrap">
            {/* Platform */}
            <div className="relative">
              <select
                value={activePlatform}
                onChange={(e) => setActivePlatform(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-2xl pl-5 pr-10 py-3 text-white text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0b1020]">All Platforms</option>
                <option value="instagram" className="bg-[#0b1020]">Instagram</option>
                <option value="youtube" className="bg-[#0b1020]">YouTube</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-2xl pl-5 pr-10 py-3 text-white text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-[#0b1020]">Newest First</option>
                <option value="followers_desc" className="bg-[#0b1020]">Most Followers</option>
                <option value="followers_asc" className="bg-[#0b1020]">Least Followers</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>

            {/* Category toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all ${
                isFilterOpen || activeCategory !== "all"
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Category
              {activeCategory !== "all" && (
                <span className="bg-black/20 rounded-full px-2 py-0.5 text-xs capitalize">
                  {CATEGORY_LABELS[activeCategory]}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Category chips */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-5 bg-white/[0.02] border border-white/5 rounded-2xl mb-4">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === "all" ? "bg-white text-black" : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? "all" : cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                      activeCategory === cat ? "bg-white text-black" : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-white/40 text-sm font-medium">
          Showing <span className="text-white font-bold">{filtered.length}</span> creator{filtered.length !== 1 ? "s" : ""}
          {searchQuery && <> matching "<span className="text-white">{searchQuery}</span>"</>}
        </p>
      </section>

      {/* ═══ GRID ═══ */}
      <section className="relative z-10 px-6 lg:px-14 max-w-[1400px] mx-auto pb-32">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-white/[0.03] border border-white/5 h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((inf, i) => (
              <InfluencerCard key={inf._id} inf={inf} index={i} onClick={() => setSelectedInfluencer(inf)} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-32 text-center">
            <Users className="w-16 h-16 text-white/15 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-3">No creators found</h3>
            <p className="text-white/50 mb-8">Try adjusting your search or clearing the filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActivePlatform("all"); setActiveCategory("all"); }}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedInfluencer && (
          <InfluencerModal inf={selectedInfluencer} onClose={() => setSelectedInfluencer(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
