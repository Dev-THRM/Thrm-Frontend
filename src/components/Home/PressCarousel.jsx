import { motion } from "framer-motion";

// Simply define how many images you have in your public/PressImages folder.
// For example, if you have 1.png through 104.png, set this to 104.
const NUMBER_OF_LOGOS = 104; 

// Generate the array dynamically without relying on Vite's bundler
const pressLogos = Array.from({ length: NUMBER_OF_LOGOS }, (_, i) => ({
  id: i + 1,
  // This points directly to the public folder!
  src: `/PressImages/${i + 1}.png`, 
  alt: `Press coverage ${i + 1}`,
}));

export default function PressCarousel() {
  return (
    <section className="relative overflow-hidden bg-[#02040a] py-16 lg:py-24 border-t border-white/5">
      {/* Heading */}
      <div className="mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold uppercase tracking-[0.3em] text-white/40"
        >
          Recognized & Featured In
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="mask-linear group relative flex overflow-hidden">
        
        {/* Track 1 */}
        <div className="marquee-track flex whitespace-nowrap">
          {pressLogos.map((logo) => (
            <div
              key={`track1-${logo.id}`}
              // Updated to charcoal/silver hover effects
              className="group/card relative mx-5 flex h-32 md:h-44 w-72 md:w-105 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                // Added grayscale that turns to full color on hover for a premium feel
                className="h-full w-full object-contain p-2 filter grayscale opacity-60 transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110"
              />

              {/* Subtle White Glow */}
              <div className="absolute inset-0 rounded-3xl bg-white/0 transition-all duration-500 group-hover/card:bg-white/5 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless loop) */}
        <div
          className="marquee-track flex whitespace-nowrap"
          aria-hidden="true"
        >
          {pressLogos.map((logo) => (
            <div
              key={`track2-${logo.id}`}
              className="group/card relative mx-5 flex h-32 md:h-44 w-72 md:w-105 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-full w-full object-contain p-2 filter grayscale opacity-60 transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110"
              />

              <div className="absolute inset-0 rounded-3xl bg-white/0 transition-all duration-500 group-hover/card:bg-white/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}