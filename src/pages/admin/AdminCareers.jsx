import { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, Trash2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function AdminCareers() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Onsite (Kalyan)");
  const [type, setType] = useState("Full-Time");
  const [experience, setExperience] = useState("");
  
  const [openings, setOpenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Fetch current openings
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

  useEffect(() => {
    fetchOpenings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/openings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, location, type, experience }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Opening added successfully!" });
        setTitle("");
        setLocation("Onsite (Kalyan)");
        setType("Full-Time");
        setExperience("");
        fetchOpenings(); // Refresh the list
      } else {
        setStatus({ type: "error", message: result.error || "Failed to add job opening." });
      }
    } catch (error) {
      console.error("Create opening error:", error);
      setStatus({ type: "error", message: "Server connection failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job opening?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/openings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOpenings((prev) => prev.filter((o) => o._id !== id));
      } else {
        alert(result.error || "Failed to delete opening.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server connection failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 px-6 flex justify-center pb-20">
      
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left Card: Add form */}
        <div className="bg-[#060b18]/80 border border-white/10 p-8 md:p-10 rounded-4xl backdrop-blur-xl shadow-2xl relative">
          <Link to="/admin/dashboard" className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="mb-8 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-black tracking-tight">Add Career</h2>
            <p className="text-white/50 mt-2">Publish a new job opening for the careers section.</p>
          </div>

          {status.message && (
            <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${
              status.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-white" /> Job Title *
              </label>
              <input 
                type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                placeholder="e.g. Video Editor Intern"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" /> Location *
              </label>
              <input 
                type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                placeholder="Onsite (Kalyan)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" /> Job Type *
              </label>
              <select 
                value={type} onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#0b1020] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all cursor-pointer"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" /> Experience Required *
              </label>
              <input 
                type="text" required value={experience} onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                placeholder="e.g. 0-1 Years"
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full mt-4 bg-white text-black py-4 rounded-xl font-bold transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing..." : "Save Job Opening"}
            </button>
          </form>
        </div>

        {/* Right Card: Manage listings */}
        <div className="bg-[#060b18]/85 border border-white/10 p-8 md:p-10 rounded-4xl backdrop-blur-xl h-fit shadow-2xl">
          <div className="mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold">Active Openings</h2>
            <p className="text-sm text-white/40 mt-1">Below are the current live job listings.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : openings.length === 0 ? (
            <div className="text-center text-white/40 py-10">No active job listings.</div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {openings.map((job) => (
                <div key={job._id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                  <div>
                    <h3 className="font-bold text-white text-base">{job.title}</h3>
                    <p className="text-xs text-white/50 mt-1 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">{job.type}</span>
                      <span>·</span>
                      <span>{job.experience}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(job._id)}
                    className="text-red-400/70 hover:text-red-400 p-2 hover:bg-white/5 rounded-xl transition-all"
                    title="Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
