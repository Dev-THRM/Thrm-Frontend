import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read scroll progress for the top indicator bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const result = await response.json();
        if (result.success) setBlog(result.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex justify-center items-center">
        {/* Updated spinner to neutral white/grey */}
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#02040a] text-white flex justify-center items-center text-2xl font-bold">
        Blog not found.
      </div>
    );
  }

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* 1. Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" 
      />

      {/* 2. Global Ambient Background with Star Animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* 3. Main Content Container (wrapped in relative z-10 so it sits above the stars) */}
      <article className="relative z-10 pt-32 pb-32 px-6 max-w-[800px] mx-auto">
        
        <Link to="/blogs" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
          Back to all articles
        </Link>

        {/* Header Metadata */}
        <div className="flex items-center gap-6 text-[#B0B0B0] text-sm font-bold uppercase tracking-widest mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white" /> 
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white" /> 
            THRM Team
          </div>
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-10 leading-[1.1] break-words">
          {blog.title}
        </h1>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-[2rem] overflow-hidden mb-16 border border-white/10 shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full h-full object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        {/* RICH TEXT CONTENT - Colors updated to monochrome aesthetic */}
        <div 
          className="text-lg text-white/80 leading-relaxed space-y-6 break-words w-full
            [&>p]:mb-6 
            [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-12 [&>h1]:mb-6 [&>h1]:text-white [&>h1]:tracking-tight
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-6 [&>h2]:text-white [&>h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-white
            [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-6 [&>ul>li]:mb-3 [&>ul>li]:relative [&>ul>li]:pl-6
            before:[&>ul>li]:absolute before:[&>ul>li]:left-0 before:[&>ul>li]:top-[0.6em] before:[&>ul>li]:w-2 before:[&>ul>li]:h-2 before:[&>ul>li]:bg-white/40 before:[&>ul>li]:rounded-full
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol]:marker:text-white/50 [&>ol]:marker:font-bold
            [&>a]:text-white [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-white/30 hover:[&>a]:decoration-white [&>a]:transition-all [&>a]:break-all
            [&>blockquote]:border-l-4 [&>blockquote]:border-white/30 [&>blockquote]:bg-white/[0.02] [&>blockquote]:p-6 [&>blockquote]:rounded-r-2xl [&>blockquote]:italic [&>blockquote]:text-white/70 [&>blockquote]:my-8
            [&>strong]:text-white [&>strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
        
        {/* Footer/Share Divider inside the post */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/50 font-medium">Thank you for reading.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors"
          > 
            Back to top ↑
          </button>
        </div>

      </article>
    </main>
  );
}