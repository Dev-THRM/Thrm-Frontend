import { useState, useRef, useEffect } from "react";
import bgImage from "../../assets/Home/home-work.png";

// Helper to build optimized Cloudinary video URL
// w_300 = scales down to 300px wide (massive size reduction), q_auto = auto quality, f_auto = auto format (WebM/MP4)
const cl = (path) =>
  `https://res.cloudinary.com/djwwbrdss/video/upload/w_300,q_auto,f_auto/${path}`;

// Import Cafe Videos
const cafe1 = cl("v1782196392/cafe-1_qyw61x.mp4");
const cafe2 = cl("v1782196863/cafe-2_tjmqer.mp4");  // fixed broken URL
const cafe3 = cl("v1782196863/cafe-3_d98ye8.mp4");
const cafe5 = cl("v1782196863/cafe-5_my9wwj.mp4");
const cafe6 = cl("v1782196864/cafe-6_enfarh.mp4");
const cafe7 = cl("v1782196864/cafe-7_pkysug.mp4");
const cafe8 = cl("v1782196864/cafe-8_evzkay.mp4");
const cafe9 = cl("v1782196865/cafe-9_zhe44z.mp4");

// Import Podcast Videos
const podcast1 = cl("v1782200718/podcast-1_tdxxzf.mp4");
const podcast2 = cl("v1782200711/podcast-2_uoddzl.mp4");
const podcast3 = cl("v1782200713/podcast-3_vvrptc.mp4");
const podcast4 = cl("v1782200712/podcast-4_rds92i.mp4");
const podcast5 = cl("v1782200713/podcast-5_gfxuwq.mp4");
const podcast6 = cl("v1782200714/podcast-6_ufiydc.mp4");

// Import Hospital Videos
const hospital1 = cl("v1782199570/hospital-1_xkmgaf.mp4");
const hospital2 = cl("v1782199572/hospital-2_cvr9mx.mp4");
const hospital3 = cl("v1782199579/hospital-3_bpofj8.mp4");
const hospital4 = cl("v1782199582/hospital-4_l16pd2.mp4");
const hospital5 = cl("v1782199579/hospital-5_jfwrrj.mp4");
const hospital6 = cl("v1782199579/hospital-6_jblzcm.mp4");

// Import Restaurants Videos
const res1  = cl("v1782200840/res-1_hskly2.mp4");
const res2  = cl("v1782200838/res-2_h1dcyt.mp4");
const res6  = cl("v1782200838/res-6_xddpzm.mp4");
const res7  = cl("v1782200840/res-7_lznvxb.mp4");
const res8  = cl("v1782200841/res-8_owdyn3.mp4");
const res9  = cl("v1782200844/res-10_phz3ys.mp4");
const res10 = cl("v1782200844/res-10_phz3ys.mp4");

// Import THRM Podcast
const thrm1 = cl("v1782201226/thrm-1_ju13sr.mp4");
const thrm2 = cl("v1782201208/thrm-2_f7te4i.mp4");
const thrm3 = cl("v1782201325/thrm-3_mnc6ru.mp4");
const thrm4 = cl("v1782201226/thrm-4_ysogs9.mp4");
const thrm5 = cl("v1782201212/thrm-5_v34b15.mp4");
const thrm6 = cl("v1782201212/thrm-6_uwok9e.mp4");

// Import TVC'S
const tvc1 = cl("v1782201404/tvc-1_nxptv4.mp4");
const tvc2 = cl("v1782201405/tvc-2_olf0t8.mp4");
const tvc3 = cl("v1782201404/tvc-3_zv9f62.mp4");
const tvc4 = cl("v1782201405/tvc-4_wdyz54.mp4");
const tvc5 = cl("v1782201409/tvc-5_racdzv.mp4");

// Import UGC
const ugc1 = cl("v1782201627/ugc-1_z7iefb.mp4");
const ugc2 = cl("v1782201614/ugc-2_eywrck.mp4");
const ugc3 = cl("v1782201616/ugc-3_zjkoij.mp4");
const ugc4 = cl("v1782201616/ugc-4_diu6nf.mp4");
const ugc5 = cl("v1782201618/ugc-5_dsekmb.mp4");

// Import VFX
const vfx1 = cl("v1782201704/vfx-1_svz8wq.mp4");
const vfx2 = cl("v1782201704/vfx-2_tiuy6d.mp4");
const vfx3 = cl("v1782201705/vfx-3_mtvadb.mp4");
const vfx4 = cl("v1782201706/vfx-4_apmnkn.mp4");

// Import SouthIndian
const south1 = cl("v1782201124/south-1_nomxc0.mp4");
const south2 = cl("v1782201117/south-2_mig9dl.mp4");
const south3 = cl("v1782201118/south-3_jhph4g.mp4");

// Import Cake
const cake1 = cl("v1782196865/cake-1_geb4y2.mp4");
const cake2 = cl("v1782196865/cake-2_osyx4m.mp4");

// Import Resorts
const resort1 = cl("v1782201038/resort1_i2jb60.mp4");
const resort2 = cl("v1782201024/resort2_ea73t9.mp4");
const resort3 = cl("v1782201024/resort3_bykjrv.mp4");
const resort4 = cl("v1782201026/resort4_sy5kuo.mp4");

// Import Parks
const park1 = cl("v1782200053/park1_m8m0yl.mp4");
const park2 = cl("v1782200040/park2_sxqmpz.mp4");
const park3 = cl("v1782200038/park3_bvs59i.mp4");
const park4 = cl("v1782200038/park4_lwfdyp.mp4");
const park5 = cl("v1782200043/park5_lktatx.mp4");
const park6 = cl("v1782200066/park6_nkg417.mp4");

// Import Clothes
const cloth1 = cl("v1782197798/cloth1_fkjccc.mp4");
const cloth3 = cl("v1782197673/cloth3_qstsbu.mp4");
const cloth4 = cl("v1782197672/cloth4_gcz4vx.mp4");
const cloth5 = cl("v1782197673/cloth5_rrasgu.mp4");
const cloth6 = cl("v1782197674/cloth6_bqhqlc.mp4");
const cloth7 = cl("v1782197673/cloth7_maaqn5.mp4");

// Import Jewellery
const jewl1 = cl("v1782199923/jewellery1_yuzfp9.mp4");
const jewl2 = cl("v1782199923/jewellery2_vvfxgx.mp4");
const jewl3 = cl("v1782199924/jewellery3_rixra1.mp4");
const jewl4 = cl("v1782199926/jewellery4_iterzo.mp4");

// Import Cloud Kitchen
const cloud1 = cl("v1782197864/cloud1_xq8heh.mp4");
const cloud2 = cl("v1782197865/cloud2_nfwqys.mp4");
const cloud3 = cl("v1782197865/cloud3_juexam.mp4");
const cloud4 = cl("v1782197866/cloud4_txkcdy.mp4");
const cloud5 = cl("v1782197865/cloud5_xavprc.mp4");

// Import Perfume
const perfume1 = cl("v1782200606/perfume1_qfggfo.mp4");
const perfume2 = cl("v1782200609/perfume2_mvlnc5.mp4");
const perfume3 = cl("v1782200617/perfume3_eeclji.mp4");
const perfume4 = cl("v1782200607/perfume4_lo9cgd.mp4");
const perfume5 = cl("v1782200610/perfume5_hbmwzm.mp4");

// Grouped category structure for the dropdown filter UI
const CATEGORY_GROUPS = [
  {
    label: "Behind The Brand",
    single: true, // Renders as a standalone tab, no dropdown
  },
  {
    label: "Food & Dining",
    items: ["Cafe Shoot", "Restaurants", "South Indian", "Cake Shoots", "Cloud Kitchen"],
  },
  {
    label: "Content & Media",
    items: ["Podcast", "UGC Content", "VFX Special", "TVC Shoots"],
  },
  {
    label: "Hospitality",
    items: ["Resort", "Hospital", "Parks"],
  },
  {
    label: "Fashion",
    items: ["Clothings", "Jewellery", "Perfume"],
  },
];

const workData = {
  // THRM (same order)
  "Behind The Brand": [thrm1, thrm2, thrm3, thrm4, thrm5, thrm6],

  // Restaurants (exact sequence from HTML)
  Restaurants: [
    res10,
    res1,
    res2,
    res6,
    res8,
    res9,
  ],

  // South Indian (mixed sources exactly like HTML)
  "South Indian": [res7, south1, south2, south3, res6],

  // Cafe (custom order)
  "Cafe Shoot": [cafe1, cafe2, cafe6, cafe7, cafe8,cafe9],

  // Cake (mix of cake + cafe like HTML)
  "Cake Shoots": [cake1, cake2, cafe3, cafe5],

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
  "Clothings": [cloth1, cloth3, cloth4, cloth5, cloth6, cloth7],

  // Jewellery
  "Jewellery": [jewl1, jewl2, jewl3, jewl4],

  // Cloud Kitchen
  "Cloud Kitchen": [cloud1, cloud2, cloud3, cloud4, cloud5],

  // Perfume
  "Perfume": [perfume1, perfume2, perfume3, perfume4, perfume5],
};

const VideoCard = ({ videoUrl, eager = true }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate thumbnail URL by replacing .mp4 with .jpg extension for Cloudinary
  const thumbnailUrl = videoUrl.replace(/\.mp4$/, ".jpg");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only control play/pause based on visibility — src is always set
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      // rootMargin: 80px pre-loads the video just before it enters the viewport
      { rootMargin: "0px 80px 0px 80px", threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Play / Pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-44 md:w-52 aspect-9/16 bg-[#1a1c23] rounded-2xl overflow-hidden border border-white/10 shrink-0 flex items-center justify-center"
    >
      {/* Background Poster Image (always rendered to prevent black flickers) */}
      <img
        src={thumbnailUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d0e12]/80 z-20">
          <div className="w-8 h-8 border-2 border-white/10 border-t-[#2b4cbe] rounded-full animate-spin" />
        </div>
      )}

      {/* Render the video element ONLY when the card is close to/in the viewport */}
      {isVisible && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          muted
          loop
          playsInline
          controls
          preload="auto"
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onPause={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none z-30" />
    </div>
  );
};

const getRepeatedVideos = (videos) => {
  if (!videos || videos.length === 0) return [];
  let repeated = [...videos];
  while (repeated.length < 8) {
    repeated = [...repeated, ...videos];
  }
  return repeated;
};

// ------------------------------------------------------------------
// FilterBar — grouped tabs with dropdowns
// ------------------------------------------------------------------
function FilterBar({ activeFilter, onSelect }) {
  const [openGroup, setOpenGroup] = useState(null);

  const handleGroupClick = (group) => {
    if (group.single) {
      onSelect(group.label);
      setOpenGroup(null);
    } else {
      setOpenGroup(openGroup === group.label ? null : group.label);
    }
  };

  const handleItemClick = (item) => {
    onSelect(item);
    setOpenGroup(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = () => setOpenGroup(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Derive which group the activeFilter belongs to (for highlight)
  const activeGroup = CATEGORY_GROUPS.find((g) =>
    g.single ? g.label === activeFilter : g.items?.includes(activeFilter)
  );

  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      onClick={(e) => e.stopPropagation()} // prevent document click from immediately closing
    >
      {CATEGORY_GROUPS.map((group) => {
        const isGroupActive = activeGroup?.label === group.label;
        const isOpen = openGroup === group.label;

        return (
          <div key={group.label} className="relative">
            {/* Group tab button */}
            <button
              onClick={() => handleGroupClick(group)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isGroupActive
                    ? "bg-[#2b4cbe] text-white shadow-lg shadow-[#2b4cbe]/30"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
            > 
              <span>{group.label}</span>
              {/* Chevron for groups with sub-items */}
              {!group.single && (
                <svg
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Sub-category dropdown */}
            {!group.single && isOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
                bg-[#0f1117] border border-white/10 rounded-2xl shadow-2xl shadow-black/60
                p-2 flex flex-col gap-1 min-w-[160px]
                animate-[fadeInDown_0.15s_ease-out]">
                {group.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-150
                      ${
                        activeFilter === item
                          ? "bg-[#2b4cbe] text-white"
                          : "text-white/70 hover:bg-white/8 hover:text-white"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------
// WorkSection
// ------------------------------------------------------------------
export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("Behind The Brand");

  const filteredVideos = workData[activeFilter] || [];
  const repeatedVideos = getRepeatedVideos(filteredVideos);

  // Calculate dynamic duration to maintain constant speed (40px/s)
  const duration = (repeatedVideos.length * 232) / 40;



  return (
    <section
      className="relative py-24 bg-[#02040a] text-white min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#02040a]/80 z-0" />
      <div className="relative z-10 max-w-350 mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold mb-8">
            The Art of Visual Storytelling
          </h2>

          {/* Active sub-category label */}
          <p className="text-white/40 text-sm mb-6 tracking-wide uppercase">
            {activeFilter}
          </p>

          <FilterBar activeFilter={activeFilter} onSelect={setActiveFilter} />
        </div>

        {/* Seamless Marquee loop layout */}
        <div className="mask-linear group relative flex gap-6 overflow-hidden mt-16">
          {/* Track 1 */}
          <div
            className="marquee-track flex gap-6 whitespace-nowrap"
            style={{ animationDuration: `${duration}s` }}
          >
            {repeatedVideos.map((video, index) => (
              <VideoCard
                key={`track1-${activeFilter}-${index}`}
                videoUrl={video}
              />
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless loop) — lazy loaded, aria-hidden */}
          <div
            className="marquee-track flex gap-6 whitespace-nowrap"
            style={{ animationDuration: `${duration}s` }}
            aria-hidden="true"
          >
            {repeatedVideos.map((video, index) => (
              <VideoCard
                key={`track2-${activeFilter}-${index}`}
                videoUrl={video}
                eager={false}  // Lazy: src bound only when it scrolls into view
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
      </div>
    </section>
  );
}
