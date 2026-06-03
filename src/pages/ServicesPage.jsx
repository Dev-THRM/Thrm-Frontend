import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Search, 
  Share2, 
  MonitorSmartphone, 
  Star, 
  Target, 
  PenTool,
  CheckCircle2,
  ArrowRight,
  BarChart3,
} from "lucide-react";

import banner from "../assets/services/service-banner.png";

// === FIX: Import all your images explicitly at the top ===
// Adjust the "../" path if your component is nested deeper!
import imgSeo from "../assets/ServicePageImages/seo.png";
import imgSocial from "../assets/ServicePageImages/digitalmarketing.png";
import imgWebDev from "../assets/ServicePageImages/websitedevelopment.png";
import imgInfluencer from "../assets/ServicePageImages/influencermarketing.png";
import imgBranding from "../assets/ServicePageImages/strategicbranding.png";
import imgContent from "../assets/ServicePageImages/contentmarketing.png";

// Deep-dive data for each service - strictly neutral/monochrome palette
const detailedServices = [
  {
    id: "seo",
    image: imgSeo, // <-- Use the imported variable, not a string
    title: "Search Engine Optimization (SEO)",
    subtitle: "Dominate Search Results & Capture High-Intent Traffic",
    description: "We don't just chase keywords; we engineer total search dominance. Our technical and content-driven SEO strategies ensure your brand appears exactly when your ideal customers are searching for solutions, driving sustainable, compounding organic revenue.",
    deliverables: [
      "Comprehensive Technical Site Audits",
      "High-Authority Backlink Acquisition",
      "On-Page & Keyword Optimization",
      "Local SEO & Google Business Profiling"
    ],
    metric: "250% Avg. Increase in Organic Traffic",
    icon: Search,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  },
  {
    id: "social-media",
    image: imgSocial, // <-- Use the imported variable
    title: "Social Media Marketing",
    subtitle: "Build Cult-Like Brand Loyalty & Engagement",
    description: "Transform your social channels from broadcast platforms into active community hubs. We craft thumb-stopping content and data-backed distribution strategies across LinkedIn, Instagram, TikTok, and X to turn passive scrollers into passionate brand advocates.",
    deliverables: [
      "Multi-Platform Content Strategy",
      "Community Management & Engagement",
      "Viral-Engineered Short Form Video",
      "Paid Social Campaign Management"
    ],
    metric: "10x Average Engagement Rate Growth",
    icon: Share2,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  },
  {
    id: "web-dev",
    image: imgWebDev, // <-- Use the imported variable
    title: "Website Development",
    subtitle: "High-Performance Digital Experiences",
    description: "Your website is your ultimate salesperson. We design and develop blazing-fast, visually stunning, and highly converting websites using modern frameworks (React, Next.js). Every pixel is optimized for user experience and search engine crawlability.",
    deliverables: [
      "Custom UI/UX Design Systems",
      "Full-Stack Web Development",
      "E-Commerce & Funnel Optimization",
      "Core Web Vitals & Speed Optimization"
    ],
    metric: "< 1s Average Page Load Speed",
    icon: MonitorSmartphone,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  },
  {
    id: "influencer",
    image: imgInfluencer, // <-- Use the imported variable
    title: "Influencer Marketing",
    subtitle: "Amplify Trust Through Authentic Voices",
    description: "Leverage the power of human connection. We identify, vet, and partner with niche influencers and creators who align perfectly with your brand ethos, driving authentic user-generated content (UGC) that converts better than traditional ads.",
    deliverables: [
      "Creator Discovery & Vetting",
      "End-to-End Campaign Management",
      "Contract & Deliverables Negotiation",
      "UGC Whitelisting & Paid Amplification"
    ],
    metric: "3.5x Higher ROI than standard Social Ads",
    icon: Star,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  },
  {
    id: "branding",
    image: imgBranding, // <-- Use the imported variable
    title: "Strategic Branding",
    subtitle: "Forge a Distinct & Memorable Identity",
    description: "A brand is more than a logo; it's a feeling. We distill your company's core values into a cohesive visual identity, tone of voice, and brand positioning strategy that immediately separates you from competitors and commands premium pricing.",
    deliverables: [
      "Brand Archetype & Positioning Strategy",
      "Logo, Typography & Color Systems",
      "Comprehensive Brand Guidelines",
      "Corporate Identity & Collateral Design"
    ],
    metric: "Elevate Perceived Market Value",
    icon: Target,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  },
  {
    id: "content",
    image: imgContent, // <-- Use the imported variable
    title: "Content Marketing",
    subtitle: "Educate, Engage, and Convert",
    description: "Content is the fuel for your digital growth engine. Our editorial team produces high-value blogs, whitepapers, case studies, and email sequences that establish your brand as an absolute industry authority and nurture leads through the funnel.",
    deliverables: [
      "SEO-Driven Blog Content Creation",
      "Lead Magnet & Whitepaper Design",
      "Email Marketing Automations",
      "Video Scripting & Storyboarding"
    ],
    metric: "Build Long-Term Asset Equity",
    icon: PenTool,
    color: "text-white",
    linear: "from-white/10 to-transparent",
    border: "border-white/10"
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  // Top Progress Bar for long reading pages
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <header className="relative z-10 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/0" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#02040a]" />

        {/* Content */}
        <div className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/20 backdrop-blur-md mb-8">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
                Our Expertise
              </span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
              Services engineered for
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                exponential scale.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed">
              We don't offer generic packages. We provide bespoke, data-driven
              digital infrastructure designed to dominate your market and multiply
              your revenue.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ================= DETAILED SERVICES SECTION ================= */}
      <section className="relative z-10 px-6 lg:px-14 pb-32 max-w-[1400px] mx-auto">
        <div className="space-y-32 lg:space-y-40">
          {detailedServices.map((service, index) => {
            const Icon = service.icon;
            // Alternate layout: Image/Graphic on left or right
            const isEven = index % 2 === 0;

            return (
              <motion.article 
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                              
                {/* Visual / Graphic Side */}
                <div className="w-full lg:w-1/2 relative group">
                  {/* Outer Blur Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.linear} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80`} />
                  
                  {/* The Main Container Card */}
                  <div className={`relative h-[400px] lg:h-[440px] w-full rounded-[2.5rem] bg-white/[0.02] border ${service.border} backdrop-blur-xl p-10 flex flex-col justify-between overflow-hidden shadow-2xl`}>
                                      
                    {/* 1. Background Image */}
                    <img 
                      src={service.image} 
                      alt={service.title || "service"} 
                      className="absolute inset-0 h-full w-full object-contain z-0 transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* 2. Soft Dark Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />

                    {/* Top Row: Icon on Left */}
                    <div className="relative z-20 flex justify-between items-start w-full">
                      <div className={`p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md ${service.color}`}>
                        <Icon size={40} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Bottom Row: Metric Callout */}
                    <div className="relative z-20 mt-auto">
                      <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-md">
                        <BarChart3 className={service.color} size={24} />
                        <div>
                          <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Target Metric</p>
                          <p className="text-sm font-bold text-white">{service.metric}</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Lines */}
                    <div className="absolute z-15 right-0 bottom-20 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45" />
                    <div className="absolute z-15 left-10 top-20 w-px h-3/4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
                
                {/* Text / Content Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{service.title}</h2>
                    <h3 className={`text-xl font-bold ${service.color} mb-6`}>{service.subtitle}</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Grid */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#B0B0B0] mb-6">Core Deliverables</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${service.color}`} />
                          <span className="text-sm font-medium text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="group flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/30">
                      Discuss this service
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${service.color}`} />
                    </button>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>
      </section>

      {/* SEO Screen Reader Text */}
      <div className="sr-only">
        <h2>Complete Digital Marketing Services List</h2>
        <p>THRM Digital Marketing Agency offers professional SEO (Search Engine Optimization) to increase organic traffic, Social Media Marketing to build brand loyalty across LinkedIn, Instagram, and TikTok, Custom Website Development using React and Next.js, Influencer Marketing for authentic UGC content, Corporate Branding and identity design, and high-quality Content Marketing strategies.</p>
      </div>
      
    </main>
  );
}