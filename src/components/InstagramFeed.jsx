import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react"; // Removed Instagram from here
import { FaInstagram } from "react-icons/fa6"; // Imported from react-icons instead!

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Replace this with import.meta.env.VITE_INSTAGRAM_TOKEN in production!
  const accessToken = "IGAA3XnEejX9JBZAGJ4VWpFaTNyMGtvaW9sWmRoNzRBVHdlSXpWdlI3N0VkakhTbkpCTk9ybHJlZAHphRFVycWYxRDhsT0tfbXZApaGR4RDdPejlZAZAnk1cnVjMUVCUTZArRk5nLVpydWRQWWFrZAnZAzc2RWNjJNZAkM1cWFBZAzhMNmNMTQZDZD";

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.data) {
          // Limit to 5 posts just like the old PHP script
          setPosts(result.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching Instagram feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
  }, [accessToken]);

  // Smooth scroll function for the slider buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="py-24 bg-[#02040a] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="relative z-10 py-24 px-6 lg:px-14 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <FaInstagram className="w-4 h-4 text-white" /> {/* Replaced icon here */}
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Social Feed
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Latest from <span className="text-white/50">@THRM</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 hidden md:flex">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((media, index) => (
          <motion.a
            key={media.id}
            href={media.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden snap-start shadow-xl"
          >
            {/* Media Content */}
            {media.media_type === "VIDEO" ? (
              <div className="w-full h-full relative">
                <video 
                  src={media.media_url} 
                  poster={media.thumbnail_url}
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Play Icon Overlay */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center z-10">
                  <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                </div>
              </div>
            ) : (
              <img 
                src={media.media_url} 
                alt="Instagram Post" 
                loading="lazy"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-white font-bold">
                View on Instagram <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
    </section>
  );
}