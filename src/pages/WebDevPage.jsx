import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/web_development.png"
import { 
  MonitorSmartphone, 
  Zap, 
  Smartphone, 
  LayoutTemplate, 
  Code2, 
  Layers, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Laptop
} from "lucide-react";

// --- FAQ DATA ---
const webDevFaqs = [
  {
    q: "How long does it take to build a custom website?",
    a: "A standard corporate website typically takes 4 to 8 weeks from initial strategy to final launch. Complex e-commerce platforms or custom web applications may take 12+ weeks. We provide a strict, transparent timeline during the discovery phase."
  },
  {
    q: "Do you use templates or custom code?",
    a: "We do not rely on bloated, slow-loading templates. Every website we build is a custom digital product, engineered from the ground up using modern frameworks like React and Next.js to ensure lightning-fast speeds and perfect scalability."
  },
  {
    q: "Will my website be mobile-friendly and optimized for SEO?",
    a: "Absolutely. We employ a mobile-first design philosophy. Furthermore, technical SEO (site speed, schema markup, proper hierarchy) is baked into the code from day one, giving you a massive advantage in search rankings."
  },
  {
    q: "Do you provide hosting and ongoing maintenance?",
    a: "Yes. Post-launch, we offer enterprise-grade hosting, security monitoring, and ongoing maintenance retainers to ensure your website remains fast, secure, and fully updated as your business grows."
  }
];

// --- ACCORDION COMPONENT ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <span className="text-[1.05rem] font-medium text-white/90 group-hover:text-white transition-colors pr-6">
          {question}
        </span>
        <div className="shrink-0 text-white/40 group-hover:text-white transition-colors">
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-white/60 leading-relaxed pr-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function WebDevPage() {
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
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <MonitorSmartphone className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              High-Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Web Experiences.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Your website is your ultimate salesperson. We design and engineer blazing-fast, visually stunning digital storefronts perfectly optimized for user experience and high-ticket conversions.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start Your Web Project <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[390px] rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 flex items-center justify-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
              <img className="absolute inset-0 h-full w-full object-contain z-0
              transition-transform duration-700 group-hover:scale-105" src={sm} alt="" />
          </motion.div>
        </div>
      </section>

      {/* ================= WHAT IS IT ================= */}
      <section className="relative z-10 py-24 px-6 lg:px-14 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto text-center max-w-4xl">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Modern Web Development?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Modern web development is the fusion of elite design psychology and advanced software engineering. It means abandoning slow, generic templates and building custom digital architecture using headless CMS systems, React-based frontends, and edge-network hosting to deliver instantaneous, immersive experiences to your users.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">A brilliant marketing campaign sent to a bad website yields zero revenue.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: LayoutTemplate, title: "The Ultimate First Impression", desc: "You have 50 milliseconds to form an impression. A premium, modern interface establishes immediate trust and brand authority." },
            { icon: Zap, title: "Conversion Rate Optimization", desc: "Every second of load time drops conversions by 7%. We engineer sites that load instantly and guide users seamlessly to checkout." },
            { icon: Smartphone, title: "Mobile Domination", desc: "Over 60% of web traffic is mobile. We build responsive systems that look and perform flawlessly on every device, every time." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <feature.icon className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHAT WE PROVIDE ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Our Core Deliverables.</h2>
          <p className="text-white/50 text-lg">End-to-end digital product engineering.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "UI/UX Design Systems", desc: "We map out user journeys, wireframes, and high-fidelity interactive prototypes to ensure the final product converts at the highest possible rate." },
            { title: "Front-End Engineering", desc: "We bring designs to life using modern, component-based frameworks (React/Next.js) with smooth micro-interactions and animations." },
            { title: "E-Commerce Architecture", desc: "From headless Shopify builds to custom payment gateways, we engineer scalable e-commerce solutions built to handle massive traffic spikes." },
            { title: "Performance & Security", desc: "We implement rigorous security protocols, optimize database queries, and utilize edge CDNs so your site loads instantly anywhere in the world." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
            >
              <div className="text-4xl font-black text-white/10">0{idx + 1}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">Why partner with THRM?</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              We don't outsource. We don't use cut-and-paste templates. We are a team of senior engineers and elite designers who view your website as the ultimate growth engine for your business.
            </p>
            <ul className="space-y-4">
              {[
                "100% Custom Design & Development",
                "Technical SEO Built-In by Default",
                "Scalable, Enterprise-Grade Architecture",
                "Dedicated Post-Launch Support"
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                  <span className="font-semibold text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px]" />
            <Layers className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"Conversion rates doubled overnight."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "The new platform THRM engineered for us is night and day. It loads instantly on mobile, the UI is incredibly intuitive, and our e-commerce conversion rate literally doubled in the first week."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">Director of E-Commerce</p>
              <p className="text-xs text-white/40">Premium Retail Brand</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQS ================= */}
      <section className="relative z-10 py-24 px-6 lg:px-14 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Service FAQ's</h2>
        </div>
        <div className="flex flex-col rounded-3xl bg-white/[0.02] border border-white/10 p-6 md:p-10">
          {webDevFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}