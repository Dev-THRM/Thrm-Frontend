import { motion } from "framer-motion";

const imageModules = import.meta.glob("../../assets/PressImages/*.png", {
  eager: true,
  as: "url",
});

const pressLogos = Object.entries(imageModules)
  .map(([path, src]) => {
    const match = path.match(/\/(\d+)\.png$/);
    const id = match ? Number(match[1]) : path;

    return {
      id,
      src,
      alt: `Press coverage ${id}`,
    };
  })
  .sort((a, b) => a.id - b.id);

export default function PressCarousel() {
  return (
    <section className="relative overflow-hidden bg-[#02040a] py-16 lg:py-24">
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
              className="group/card relative mx-5 flex h-44 w-105 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#4f7cff]/40 hover:bg-white/6"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-full w-full object-contain p-2 transition-all duration-500 group-hover/card:scale-110"
              />

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-[#4f7cff]/0 transition-all duration-500 group-hover/card:bg-[#4f7cff]/5" />
            </div>
          ))}
        </div>

        {/* Track 2 */}
        <div
          className="marquee-track flex whitespace-nowrap"
          aria-hidden="true"
        >
          {pressLogos.map((logo) => (
            <div
              key={`track2-${logo.id}`}
              className="group/card relative mx-5 flex h-28 w-72 shrink-0 items-center justify-center rounded-3xl border border-white/8 bg-white/3 p-7 backdrop-blur-md transition-all duration-500 hover:border-[#4f7cff]/40 hover:bg-white/6"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-full max-w-full object-contain opacity-90 transition-all duration-500 group-hover/card:scale-110"
              />

              <div className="absolute inset-0 rounded-3xl bg-[#4f7cff]/0 transition-all duration-500 group-hover/card:bg-[#4f7cff]/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}