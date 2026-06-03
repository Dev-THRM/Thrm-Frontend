import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bgImage from "../../assets/Home/home-work.png";

// Import Cafe Videos
import cafe1 from "../../assets/videos/cafe-1.mp4";
import cafe2 from "../../assets/videos/cafe-2.mp4";
import cafe3 from "../../assets/videos/cafe-3.mp4";
import cafe4 from "../../assets/videos/cafe-4.mp4";
import cafe5 from "../../assets/videos/cafe-5.mp4";
import cafe6 from "../../assets/videos/cafe-6.mp4";
import cafe7 from "../../assets/videos/cafe-7.mp4";
import cafe8 from "../../assets/videos/cafe-8.mp4";
import cafe9 from "../../assets/videos/cafe-9.mp4";

// Import Podcast Videos
import podcast1 from "../../assets/videos/podcast-1.mp4";
import podcast2 from "../../assets/videos/podcast-2.mp4";
import podcast3 from "../../assets/videos/podcast-3.mp4";
import podcast4 from "../../assets/videos/podcast-4.mp4";
import podcast5 from "../../assets/videos/podcast-5.mp4";
import podcast6 from "../../assets/videos/podcast-6.mp4";

// Import Hospital Videos
import hospital1 from "../../assets/videos/hospital-1.mp4";
import hospital2 from "../../assets/videos/hospital-2.mp4";
import hospital3 from "../../assets/videos/hospital-3.mp4";
import hospital4 from "../../assets/videos/hospital-4.mp4";
import hospital5 from "../../assets/videos/hospital-5.mp4";
import hospital6 from "../../assets/videos/hospital-6.mp4";

// Import Restaurants Videos
import res1 from "../../assets/videos/res-1.mp4";
import res2 from "../../assets/videos/res-2.mp4";
import res3 from "../../assets/videos/res-3.mp4";
import res4 from "../../assets/videos/res-4.mp4";
import res5 from "../../assets/videos/res-5.mp4";
import res6 from "../../assets/videos/res-6.mp4";
import res7 from "../../assets/videos/res-7.mp4";
import res8 from "../../assets/videos/res-8.mp4";
import res9 from "../../assets/videos/res-9.mp4";
import res10 from "../../assets/videos/res-10.mp4";
import res11 from "../../assets/videos/res-11.mp4";

// Import THRM Podcast
import thrm1 from "../../assets/videos/thrm-1.mp4";
import thrm2 from "../../assets/videos/thrm-2.mp4";
import thrm3 from "../../assets/videos/thrm-3.mp4";
import thrm4 from "../../assets/videos/thrm-4.mp4";

// Import TVC'S
import tvc1 from "../../assets/videos/tvc-1.mp4";
import tvc2 from "../../assets/videos/tvc-2.mp4";
import tvc3 from "../../assets/videos/tvc-3.mp4";
import tvc4 from "../../assets/videos/tvc-4.mp4";
import tvc5 from "../../assets/videos/tvc-5.mp4";

// Import UGC
import ugc1 from "../../assets/videos/ugc-1.mp4";
import ugc2 from "../../assets/videos/ugc-2.mp4";
import ugc3 from "../../assets/videos/ugc-3.mp4";
import ugc4 from "../../assets/videos/ugc-4.mp4";
import ugc5 from "../../assets/videos/ugc-5.mp4";

// Import VFX
import vfx1 from "../../assets/videos/vfx-1.mp4";
import vfx2 from "../../assets/videos/vfx-2.mp4";
import vfx3 from "../../assets/videos/vfx-3.mp4";
import vfx4 from "../../assets/videos/vfx-4.mp4";

// Import SouthIndian
import south1 from "../../assets/videos/south-1.mp4";
import south2 from "../../assets/videos/south-2.mp4";
import south3 from "../../assets/videos/south-3.mp4";

// Import Cake
import cake1 from "../../assets/videos/cake-1.mp4";
import cake2 from "../../assets/videos/cake-2.mp4";

// Import Resorts
import resort1 from "../../assets/videos/resort1.mp4";
import resort2 from "../../assets/videos/resort2.mp4";
import resort3 from "../../assets/videos/resort3.mp4";
import resort4 from "../../assets/videos/resort4.mp4";

// Import Parks
import park1 from "../../assets/videos/park1.mp4";
import park2 from "../../assets/videos/park2.mp4";
import park3 from "../../assets/videos/park3.mp4";
import park4 from "../../assets/videos/park4.mp4";
import park5 from "../../assets/videos/park5.mp4";
import park6 from "../../assets/videos/park6.mp4";

// Import Clothes
import cloth1 from "../../assets/videos/cloth1.mp4";
import cloth2 from "../../assets/videos/cloth2.mp4";
import cloth3 from "../../assets/videos/cloth3.mp4";
import cloth4 from "../../assets/videos/cloth4.mp4";
import cloth5 from "../../assets/videos/cloth5.mp4";
import cloth6 from "../../assets/videos/cloth6.mp4";
import cloth7 from "../../assets/videos/cloth7.mp4";

// Import Jewellery
import jewl1 from "../../assets/videos/jewellery1.mp4";
import jewl2 from "../../assets/videos/jewellery2.mp4";
import jewl3 from "../../assets/videos/jewellery3.mp4";
import jewl4 from "../../assets/videos/jewellery4.mp4";

// Import Cloud Kitchen
import cloud1 from "../../assets/videos/cloud1.mp4";
import cloud2 from "../../assets/videos/cloud2.mp4";
import cloud3 from "../../assets/videos/cloud3.mp4";
import cloud4 from "../../assets/videos/cloud4.mp4";
import cloud5 from "../../assets/videos/cloud5.mp4";

// Import Perfume
import perfume1 from "../../assets/videos/perfume1.mp4";
import perfume2 from "../../assets/videos/perfume2.mp4";
import perfume3 from "../../assets/videos/perfume3.mp4";
import perfume4 from "../../assets/videos/perfume4.mp4";
import perfume5 from "../../assets/videos/perfume5.mp4";

const categories = [
  "THRM Podcast",
  "Cafe Shoot",
  "Restaurants",
  "South Indian",
  "Cake Shoots",
  "TVC Shoots",
  "UGC Content",
  "VFX Special",
  "Podcast",
  "Hospital",
  "Resort",
  "Parks",
  "Clothings",
  "Jewellery",
  "Cloud Kitchen",
  "Perfume",
];

const workData = {
  // THRM (same order)
  "THRM Podcast": [thrm1, thrm2, thrm3, thrm4],

  // Restaurants (exact sequence from HTML)
  Restaurants: [
    res8,
    // res9 (skipped as in your HTML)
    res10,
    res11,
    res1,
    res2,
    res3,
    res5,
    res4,
  ],

  // South Indian (mixed sources exactly like HTML)
  "South Indian": [res7, south1, south2, south3, res6],

  // Cafe (custom order)
  "Cafe Shoot": [cafe7, cafe8, cafe9, cafe2, cafe6],

  // Cake (mix of cake + cafe like HTML)
  "Cake Shoots": [cake1, cake2, cafe3],

  // TVC
  "TVC Shoots": [tvc1, tvc2, tvc3, tvc4, tvc5],

  // VFX
  "VFX Special": [vfx1, vfx2, vfx3, vfx4],

  // UGC
  "UGC Content": [ugc1, ugc2, ugc3, ugc4, ugc5],

  // Podcast
  "Podcast": [podcast1, podcast2, podcast3, podcast4, podcast5, podcast6],

  // Hospital
  "Hospital": [hospital1, hospital2, hospital3, hospital4, hospital5, hospital6],

  // Resort
  "Resort": [resort1, resort2, resort3, resort4],

  // Parks
  "Parks": [park1, park2, park3, park4, park5, park6],

  // Clothings
  "Clothings": [cloth1, cloth2, cloth3, cloth4, cloth5, cloth6, cloth7],

  // Jewellery
  "Jewellery": [jewl1, jewl2, jewl3, jewl4],

  // Cloud Kitchen
  "Cloud Kitchen": [cloud1, cloud2, cloud3, cloud4, cloud5],

  // Perfume
  "Perfume": [perfume1, perfume2, perfume3, perfume4, perfume5],
};

const VideoCard = ({ videoUrl }) => {
  return (
    <motion.div
      layout
      className="relative w-full aspect-9/16 bg-[#1a1c23] rounded-2xl overflow-hidden border border-white/10 snap-center shrink-0 md:w-70"
    >
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("THRM Podcast");
  const scrollRef = useRef(null);

  const filteredVideos = workData[activeFilter] || [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative py-24 bg-[#02040a] text-white min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }} // Replace with your image path
    >
      {/* This div creates the dark overlay to make text readable */}
      <div className="absolute inset-0 bg-[#02040a]/80 z-0" />
      <div className="relative z-10 max-w-350 mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold mb-8">
            The Art of Visual Storytelling
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm transition ${activeFilter === cat
                  ? "bg-[#2b4cbe] text-white"
                  : "bg-[#1a1c23] text-white/70 hover:bg-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-16 group">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4"
          >
            <AnimatePresence mode="wait">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, index) => (
                  <VideoCard
                    key={`${activeFilter}-${index}`}
                    videoUrl={video}
                  />
                ))
              ) : (
                <div className="w-full text-center py-20 text-white/40">
                  No videos available
                </div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
        <div className="absolute inset-0 backdrop-blur-md opacity-40" />
      </div>
    </section>
  );
}
