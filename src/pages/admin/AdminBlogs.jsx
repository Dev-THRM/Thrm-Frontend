import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; 
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminBlogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); 
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/admin/b", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Blog published successfully!" });
        setTitle("");
        setContent("");
        setImage(null);
        e.target.reset();
      } else {
        setStatus({ type: "error", message: result.error || "Failed to publish." });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus({ type: "error", message: "Server connection failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 px-6 flex justify-center pb-20">
      <div className="w-full max-w-4xl bg-[#060b18]/80 border border-white/10 p-8 md:p-10 rounded-4xl backdrop-blur-xl shadow-2xl relative">
        <Link to="/admin/dashboard" className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-3xl font-black tracking-tight">Post a New Blog</h2>
        </div>

        {status.message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Blog Title *</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/50 focus:bg-white/10 outline-none transition-all"
              placeholder="e.g. 5 SEO Strategies for 2026"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Featured Image *</label>
            <input 
              type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Blog Content *</label>
            <div className="bg-white text-black rounded-xl overflow-hidden">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                className="h-64 mb-12"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full mt-4 bg-white text-black py-4 rounded-xl font-bold transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}