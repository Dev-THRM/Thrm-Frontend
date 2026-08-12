import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, CheckCircle2, XCircle, Clock, Camera, Video,
  ArrowLeft, LogOut, AlertTriangle, User
} from "lucide-react";
import { useAuth } from "../../context/RouteContext.jsx";
import { API_BASE_URL, getImageUrl } from "../../config";

function formatFollowers(n) {
  if (!n) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export const AdminInfluencers = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of influencer being actioned
  const [rejectConfirm, setRejectConfirm] = useState(null); // id to confirm reject

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/influencers/pending`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setPending(data.influencers);
    } catch (err) {
      console.error("Error fetching pending influencers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/influencers/${id}/approve`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPending((prev) => prev.filter((inf) => inf._id !== id));
      }
    } catch (err) {
      console.error("Error approving influencer:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/influencers/${id}/reject`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPending((prev) => prev.filter((inf) => inf._id !== id));
      }
    } catch (err) {
      console.error("Error rejecting influencer:", err);
    } finally {
      setActionLoading(null);
      setRejectConfirm(null);
    }
  };

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden pt-40 pb-32 px-6 lg:px-14">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white/70 hover:text-white"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400">
              Pending Approvals
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Influencer Approvals
          </h1>
          <p className="text-white/50 text-lg">
            Review and approve or reject influencer profile submissions.
          </p>
        </div>

        {/* Count Badge */}
        {!loading && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.04] border border-white/10 rounded-2xl">
              <Users className="w-5 h-5 text-white/60" />
              <span className="text-white font-bold text-lg">{pending.length}</span>
              <span className="text-white/50 text-sm">
                {pending.length === 1 ? "submission awaiting review" : "submissions awaiting review"}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 rounded-3xl bg-white/[0.03] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : pending.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <CheckCircle2 className="w-20 h-20 text-green-400/40 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-3">All caught up!</h3>
            <p className="text-white/50">No pending influencer submissions to review.</p>
          </motion.div>
        ) : (
          <div className="grid gap-5">
            <AnimatePresence>
              {pending.map((inf, index) => {
                const igData = inf.instagram;
                const ytData = inf.youtube;
                const primaryData = igData || ytData;
                if (!primaryData) return null;

                const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(inf.name)}&background=1a1a2e&color=ffffff&size=128&bold=true&format=png`;
                const isActioning = actionLoading === inf._id;

                return (
                  <motion.div
                    key={inf._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, scale: 0.97 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-white/5">
                      <img
                        src={inf.profileImage ? getImageUrl(inf.profileImage) : fallback}
                        alt={inf.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = fallback; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-lg font-black text-white truncate">{inf.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                          Pending
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/50">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" /> {inf.mobile}
                        </span>
                        {igData && (
                          <span className="flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5" />
                            {igData.handle} · <strong className="text-white/80">{formatFollowers(igData.followers)}</strong> followers
                          </span>
                        )}
                        {ytData && (
                          <span className="flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" />
                            {ytData.handle} · <strong className="text-white/80">{formatFollowers(ytData.followers)}</strong> subs
                          </span>
                        )}
                        {primaryData.category && (
                          <span className="capitalize bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-xs">
                            {primaryData.category}
                          </span>
                        )}
                        {primaryData.creatorType && (
                          <span className="text-white/40 text-xs">Tier: {primaryData.creatorType}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      {rejectConfirm === inf._id ? (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-red-300 text-xs font-medium">Confirm reject?</span>
                          <button
                            onClick={() => handleReject(inf._id)}
                            disabled={isActioning}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                          >
                            {isActioning ? "..." : "Yes, Reject"}
                          </button>
                          <button
                            onClick={() => setRejectConfirm(null)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(inf._id)}
                            disabled={isActioning}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300 font-bold rounded-2xl transition-all disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {isActioning ? "..." : "Approve"}
                          </button>
                          <button
                            onClick={() => setRejectConfirm(inf._id)}
                            disabled={isActioning}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-bold rounded-2xl transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
};
