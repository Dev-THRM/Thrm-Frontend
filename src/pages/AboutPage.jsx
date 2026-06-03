import { useRef } from "react";
import abouta from "../assets/aboutsection/about-about.png";
import heroBg from "../assets/aboutsection/about-hero.png"
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ShieldCheck, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Award, 
  MapPin, 
  Target, 
  ArrowRight,
  Compass,
  Rocket
} from "lucide-react";

import about from "../assets/about.png"

// --- CORE VALUES DATA ---
const coreValues = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We believe in complete transparency and honesty in everything we do.",
    color: "text-white"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay updated with the latest tools and trends to keep our clients ahead of the competition.",
    color: "text-white"
  },
  {
    icon: TrendingUp,
    title: "Results",
    desc: "Our campaigns are designed to deliver measurable growth, not just vanity metrics.",
    color: "text-white"
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "We treat every client as a partner, working together toward long-term success.",
    color: "text-white"
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "From creative design to execution, we maintain the highest standards in our work.",
    color: "text-white"
  }
];

export default function AboutPage() {
  const containerRef = useRef(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      {/* Changed: Added overflow-hidden to contain the background image layout */}
      <header className="relative overflow-hidden">
  
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={heroBg}
      alt=""
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#02040a]/60" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-[1400px] mx-auto pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-14 text-center">

        {/* Changed: Added relative and z-10 to force the entire motion container above the image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Compass className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Our Vision
            </span>
          </div>
          
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            The Architects of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Digital Growth.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed">
            We combine creativity with data-driven strategies, ensuring that every campaign we engineer not only looks stunning but delivers tangible business results.
          </p>
        </motion.div>
       </div> 
      </header>


      {/* ================= OUR STORY ================= */}
      <section className="relative z-10 px-6 lg:px-14 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Our Story.</h2>
            <p className="text-lg text-white/60 leading-relaxed">
              THRM Digital Marketing was created with a single vision – to help businesses of all sizes grow in the digital age. Starting in Mumbai, we quickly recognized how important online presence had become for local businesses as well as companies across India.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Over the years, we have helped startups gain their first customers, supported small businesses in scaling up, and worked with established brands to dominate their industries online.
            </p>
            <div className="pt-4 flex items-center gap-3 text-white font-bold">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>Recognized as one of the best digital marketing agencies in Mumbai.</span>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  className="relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
>
  {/* Background Image */}
  <img
    src= {about}
    alt="THRM About Us"
    className="w-full h-full object-fit transition-transform duration-700"
  />

  {/* Dark Overlay */}
  {/* <div className="absolute inset-0 bg-black/25" /> */}

  {/* Glow Effect */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

  {/* Floating Blur */}
  <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full" />
</motion.div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className="relative z-10 py-24 px-6 lg:px-14 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 grid grid-cols-2 gap-4"
          >
            {[
              { title: "SEO", desc: "Organic Dominance" },
              { title: "Social Media", desc: "Brand Loyalty" },
              { title: "Paid Ads", desc: "Instant Scaling" },
              { title: "Branding", desc: "Premium Identity" }
            ].map((skill, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <h4 className="font-bold text-lg text-white mb-1">{skill.title}</h4>
                <p className="text-xs text-white/50 uppercase tracking-widest">{skill.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Target className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Our Methodology</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">Our Approach.</h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Our approach is simple but powerful: <strong>understand the client, analyze the market, and create tailored strategies that deliver results.</strong>
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Unlike many agencies that rely on generic plans, we build customized campaigns that reflect each brand’s unique story. Every project we work on is backed by detailed research, competitor analysis, and performance tracking designed to maximize return on investment.
            </p>
          </motion.div>
        </div>
      </section>

{/* ================= CORE VALUES ================= */}
{/* Added overflow-hidden to contain the background layout boundaries */}
{/* ================= CORE VALUES ================= */}
<section className="relative z-10 py-24 lg:py-32 overflow-hidden">

  {/* Full Width Background */}
  <div className="absolute inset-0 pointer-events-none">
    <img
      src={abouta}
      alt=""
      className="w-full h-full object-cover object-center scale-105 select-none"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-[#02040a]/65" />

    {/* Optional Gradient Fade */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/30 via-transparent to-[#02040a]/40" />
  </div>

  {/* Content Wrapper */}
  <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-14">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
        Our Core Values.
      </h2>

      <p className="text-white/60 text-lg">
        The principles that drive every campaign we launch.
      </p>
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

      {coreValues.map((val, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="
            group
            p-8
            rounded-3xl
            bg-black/20
            backdrop-blur-md
            border border-white/10
            flex flex-col
            items-center
            text-center
            hover:bg-white/[0.06]
            hover:border-white/20
            transition-all
            duration-300
          "
        >
          <div
            className={`
              p-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              mb-6
              ${val.color}
              transition-all
              duration-300
              group-hover:bg-white
              group-hover:text-black
            `}
          >
            <val.icon className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold mb-3 text-white">
            {val.title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed">
            {val.desc}
          </p>
        </motion.div>
      ))}

    </div>
  </div>
</section>


      {/* ================= WHY WE STAND OUT (CTA SECTION) ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1000px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 lg:p-20 overflow-hidden backdrop-blur-xl"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
          
          <h2 className="relative z-10 text-3xl lg:text-5xl font-black tracking-tight mb-8">
            Why We Stand Out.
          </h2>
          <p className="relative z-10 text-lg text-white/70 leading-relaxed mb-6">
            There are many digital marketing agencies in Mumbai, but what sets THRM apart is our absolute commitment to client success. We don’t believe in shortcuts or black-hat techniques. We focus on sustainable strategies that build long-term growth.
          </p>
          <p className="relative z-10 text-lg text-white/70 leading-relaxed mb-12 font-semibold">
            Most importantly, we measure our success by the success of our clients. When your brand grows, we grow too — and that philosophy has made us one of the top digital marketing companies in India.
          </p>

          <button className="relative z-10 group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Partner with THRM <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>

      {/* Invisible SEO text to ensure Google indexes the exact keywords you provided */}
      <div className="sr-only">
        Partner with THRM Digital Marketing and take the first step toward a stronger digital presence. Whether you need SEO, social media management, or a complete digital transformation, our team is here to help. Top digital marketing companies in Mumbai, India.
      </div>

    </main>
  );
}