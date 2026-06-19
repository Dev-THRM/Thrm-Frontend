import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  User, 
  Tag,
  Briefcase, 
  Film, 
  Quote as QuoteIcon, 
  FileText, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Tv
} from "lucide-react";
import { API_BASE_URL } from "../../config.js";

// Inline Social Icon Components
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

export default function AdminEditFounder() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [episode, setEpisode] = useState("");
  const [quote, setQuote] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Social Links
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/founders/id/${id}`, {
          credentials: "include"
        });
        const result = await response.json();

        if (response.ok && result.success) {
          const founder = result.data;
          setName(founder.name || "");
          setSlug(founder.slug || "");
          setTitle(founder.title || "");
          setCompany(founder.company || "");
          setEpisode(founder.episode || "");
          setQuote(founder.quote || "");
          setInstaUrl(founder.instaUrl || "");
          setBio(founder.bio || "");
          setImagePreview(founder.imageUrl || null);
          
          if (founder.social) {
            setInstagram(founder.social.instagram || "");
            setLinkedin(founder.social.linkedin || "");
            setTwitter(founder.social.twitter || "");
          }
        } else {
          setStatus({ type: "error", message: result.error || "Failed to retrieve founder details." });
        }
      } catch (error) {
        console.error("Fetch founder error:", error);
        setStatus({ type: "error", message: "Failed to connect to the server." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFounder();
  }, [id]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    // Auto-generate slug: convert to lowercase, replace non-alphanumeric with hyphens
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(generatedSlug);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("company", company);
    formData.append("episode", episode);
    formData.append("quote", quote);
    formData.append("instaUrl", instaUrl);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    // Social handles JSON structure
    const socialLinks = {
      instagram: instagram || undefined,
      linkedin: linkedin || undefined,
      twitter: twitter || undefined
    };
    formData.append("social", JSON.stringify(socialLinks));

    try {
      const response = await fetch(`${API_BASE_URL}/api/founders/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Founder profile updated successfully! Redirecting..." });
        setTimeout(() => {
          navigate(`/founders/${slug}`);
        }, 1500);
      } else {
        setStatus({ type: "error", message: result.error || "Failed to update founder profile." });
      }
    } catch (error) {
      console.error("Founder update error:", error);
      setStatus({ type: "error", message: "Server connection failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#02040a] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 px-6 flex justify-center pb-20">
      <div className="w-full max-w-4xl bg-[#060b18]/80 border border-white/10 p-8 md:p-10 rounded-4xl backdrop-blur-xl shadow-2xl relative">
        <Link to="/admin/dashboard" className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-3xl font-black tracking-tight">Edit Founder Episode</h2>
          <p className="text-white/50 mt-2">Update founder biography, details, quotes, or social accounts.</p>
        </div>

        {status.message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${
            status.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="font-medium text-sm">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Identity & Role */}
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-white/40 pl-3">Identity & Role</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-white" /> Full Name *
                </label>
                <input 
                  type="text" required value={name} onChange={handleNameChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="e.g. Gunjan Shidame"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" /> URL Slug *
                </label>
                <input 
                  type="text" required value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="e.g. gunjan-shidame"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-white" /> Professional Title *
                </label>
                <input 
                  type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="e.g. Co-Founder & CMO"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-white" /> Company *
                </label>
                <input 
                  type="text" required value={company} onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="e.g. THRM Digital"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Show Details & Quote */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-white/40 pl-3">Episode Details & Quote</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <Tv className="w-4 h-4 text-white" /> Episode Number *
                </label>
                <input 
                  type="number" required value={episode} onChange={(e) => setEpisode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="e.g. 1"
                  min="1"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <Film className="w-4 h-4 text-white" /> Instagram Reel/Video URL *
                </label>
                <input 
                  type="url" required value={instaUrl} onChange={(e) => setInstaUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                  placeholder="https://www.instagram.com/reel/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <QuoteIcon className="w-4 h-4 text-white" /> Pull Quote *
              </label>
              <input 
                type="text" required value={quote} onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                placeholder="e.g. You don't need decades of experience — you need the audacity to try."
              />
            </div>
          </div>

          {/* Section 3: Profile Photo & Biography */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-white/40 pl-3">Profile Photo & Bio</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-white" /> Founder Image
                </label>
                <input 
                  type="file" accept="image/*" onChange={handleImageChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                />
                <p className="text-xs text-white/40 ml-1 mt-1">Leave empty to keep the current image. Prefer 3:4 aspect ratio portrait images.</p>
              </div>

              {imagePreview && (
                <div className="flex flex-col items-center justify-center p-4 border border-white/10 rounded-2xl bg-white/[0.02] max-w-[180px] mx-auto md:mx-0">
                  <span className="text-xs text-white/40 mb-2">Image Preview</span>
                  <div className="aspect-[3/4] w-28 overflow-hidden rounded-xl bg-white/5 border border-white/15">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-white" /> Full Biography *
              </label>
              <textarea 
                required value={bio} onChange={(e) => setBio(e.target.value)}
                rows="6"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all resize-y"
                placeholder="Write the full founder background story..."
              />
            </div>
          </div>

          {/* Section 4: Social media handles */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-2 border-white/40 pl-3">Social Media URLs</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-white" /> Instagram URL
                </label>
                <input 
                  type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="https://instagram.com/profile"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-white" /> LinkedIn URL
                </label>
                <input 
                  type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="https://linkedin.com/in/profile"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1 flex items-center gap-2">
                  <TwitterIcon className="w-4 h-4 text-white" /> Twitter / X URL
                </label>
                <input 
                  type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="https://x.com/profile"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link 
              to="/admin/dashboard"
              className="w-1/3 bg-white/5 border border-white/10 text-center py-4 rounded-xl font-bold transition-all hover:bg-white/10 text-white"
            >
              Cancel
            </Link>
            <button 
              type="submit" disabled={isSubmitting}
              className="w-2/3 bg-white text-black py-4 rounded-xl font-bold transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating Founder Profile..." : "Update Founder Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
