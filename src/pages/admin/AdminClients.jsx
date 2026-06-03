import { useState } from "react";
import { UploadCloud, Link as LinkIcon, Building2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminClients() {
  const [name, setName] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [logo, setLogo] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("websiteLink", websiteLink);
    formData.append("logo", logo);

    try {
      const response = await fetch("https://thrmbackend.in/api/admin/c", {
        method: "POST",
        credentials: "include",
        body: formData, 
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Client added successfully!" });
        setName("");
        setWebsiteLink("");
        setLogo(null);
        e.target.reset();
      } else {
        setStatus({ type: "error", message: result.error || "Failed to add client." });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus({ type: "error", message: "Server connection failed. Is the backend running?" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 px-6 flex justify-center pb-20">
      
      <div className="w-full max-w-xl bg-[#060b18]/80 border border-white/10 p-8 md:p-10 rounded-4xl backdrop-blur-xl h-fit shadow-2xl relative">
        <Link to="/admin/dashboard" className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-3xl font-black tracking-tight">Add Client</h2>
          <p className="text-white/50 mt-2">Upload a new client logo to the database.</p>
        </div>

        {status.message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white" /> Client Name *
            </label>
            <input 
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
              placeholder="e.g. Amrut Clinic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-white" /> Website URL (Optional)
            </label>
            <input 
              type="url" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
              placeholder="https://clientwebsite.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-white" /> Client Logo *
            </label>
            <input 
              type="file" accept="image/*" required onChange={(e) => setLogo(e.target.files[0])}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
            />
            <p className="text-xs text-white/40 ml-1 mt-1">Accepts JPG, PNG, WEBP (Max 2MB)</p>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full mt-4 bg-white text-black py-4 rounded-xl font-bold transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Uploading to Database..." : "Save Client"}
          </button>
        </form>
      </div>
    </div>
  );
}