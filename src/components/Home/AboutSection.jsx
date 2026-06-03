import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import about_me from "../../assets/Home/home-about.png";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiZap,
  FiTarget,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const ySlow = useTransform(smoothProgress, [0, 1], [100, -100]);
  const yFast = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const coreServices = [
    "SEO Strategy",
    "Paid Social",
    "Content ROI",
    "Web Experience",
    "Brand Systems",
    "Influencer Growth",
    "Email Marketing",
    "Data Analytics",
  ];

  const stats = [
    {
      title: "360°",
      desc: "Creative Strategy",
      icon: <FiTarget className="text-white" />,
    },
    {
      title: "2.5x",
      desc: "Traffic Growth",
      icon: <FiZap className="text-gray-300" />,
    },
    {
      title: "Global",
      desc: "Presence",
      icon: <FiGlobe className="text-gray-400" />,
    },
  ];

return (
  <section
    ref={ref}
    id="about"
    className="relative overflow-hidden text-white py-24 lg:py-40"
  >
    {/* Full-Screen Background Image Layer */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* The Image */}
      <img 
        src={about_me} 
        alt=""
        className="w-full h-full object-cover select-none" 
      />
      {/* Dark Overlay to ensure text stays readable */}
      <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
      {/* Your original ambient glows layered on top of the image */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
    </div>

    {/* Added z-10 to content container so it sits cleanly above the background */}
    <div className="relative z-10 max-w-375 mx-auto px-6 lg:px-16">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* LEFT SIDE - CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              {/* Accent line: Pure white */}
              <span className="h-0.5 w-10 bg-white" />
              <p className="text-[#B0B0B0] tracking-[0.4em] text-xs font-black uppercase">
                Growth Partners
              </p>
            </motion.div>

            <motion.h2
              style={{ opacity }}
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tighter leading-[1.05] mb-10"
            >
              We build the digital <br />
              {/* Gradient text: White to Dark Grey */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-300 to-gray-500">
                infrastructure for scale.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white/60 leading-relaxed text-xl max-w-2xl mb-12"
            >
              At THRM, we don't just "run ads." We engineer comprehensive
              growth systems that align your brand's identity with modern
              performance metrics, ensuring every click translates into
              long-term equity.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
                >
                  <div className="text-2xl font-bold mb-1 tracking-tight">
                    {stat.title}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Fills the empty space */}
          <div className="mt-auto pt-8 border-t border-white/5">
            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-6">
              Expertise Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {coreServices.map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium transition-colors cursor-default"
                >
                  {service}
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ gap: "20px" }}>
              <Link
                to="/about"
                className="mt-12 flex items-center gap-3 text-white font-bold group"
              >
                Explore our methodology
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - FLOATING CARD */}
        <motion.div style={{ y: yFast }} className="lg:col-span-5 relative">
          {/* Decorative Glow - Neutral/Silver */}
          <div className="absolute -inset-4 bg-linear-to-br from-white/10 to-transparent blur-3xl opacity-50" />

          <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-2">
                <div className="h-1 w-12 bg-white rounded-full" />
                <div className="h-1 w-8 bg-white/40 rounded-full" />
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
                <FiArrowUpRight className="text-white text-xl" />
              </div>
            </div>

            {/* Progress items */}
            <div className="space-y-6">
              {[
                { label: "Performance Marketing", val: "94%" },
                { label: "Technical SEO", val: "88%" },
                { label: "UX / UI Transformation", val: "98%" },
                { label: "Strategic Branding", val: "91%" },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold tracking-wide text-white/80 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {item.val}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.val }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-linear-to-r from-gray-500 to-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Quote/Stat */}
            <div className="mt-12 p-6 rounded-4xl bg-linear-to-br from-white/10 to-transparent border border-white/10">
              <p className="text-sm text-white/60 italic leading-relaxed">
                "THRM helped us achieve a 300% increase in qualified leads
                within the first quarter of our partnership."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">
                    VP of Growth
                  </p>
                  <p className="text-[10px] text-white/40 tracking-widest">
                    TechScale Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
        <div className="absolute inset-0 backdrop-blur-md opacity-40" />
      </div>
  </section>
);
}
