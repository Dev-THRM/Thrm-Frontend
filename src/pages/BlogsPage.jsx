import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, ArrowRight, Calendar } from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://mediumturquoise-turtle-309545.hostingersite.com/api/blogs");
        const result = await response.json();
        if (result.success) setBlogs(result.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // UPDATED: Perfectly decodes &nbsp; and strips HTML using the browser's native parser
  const createExcerpt = (htmlString) => {
    if (!htmlString) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    // Increased character count to ensure we have enough text to fill 3-4 lines
    return plainText.length > 250 ? plainText.substring(0, 250) + '...' : plainText;
  };

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden pt-40 pb-32 px-6 lg:px-14">
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <PenTool className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">The Growth Library.</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Insights, strategies, and news from the frontlines of digital marketing.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center h-40 items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div 
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 line-clamp-2">{blog.title}</h2>
                  
                  {/* UPDATED: Added line-clamp-3 to strictly lock it to 3 lines */}
                  <p className="text-white/60 text-sm mb-8 flex-1 line-clamp-3 break-words">
                    {createExcerpt(blog.content)}
                  </p>
                  
                  <Link to={`/blogs/${blog._id}`} className="mt-auto inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}