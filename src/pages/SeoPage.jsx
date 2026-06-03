import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/seo.png"
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Target, 
  LineChart, 
  FileCode, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  MousePointerClick
} from "lucide-react";

// --- FAQ DATA ---
const seoFaqs = [
  {
    q: "How long does it take to see results from SEO?",
    a: "SEO is a compounding, long-term strategy. Typically, you will start seeing noticeable upward movement in rankings and organic traffic within 3 to 6 months. By month 12, the compounding effects usually result in massive, sustainable ROI."
  },
  {
    q: "Can you guarantee a #1 ranking on Google?",
    a: "Any agency that guarantees a #1 spot is lying. Google's algorithm is proprietary and constantly updating. What we guarantee is executing a flawless, data-driven, 'white-hat' strategy that historically pushes our clients to the top of page one for high-value keywords."
  },
  {
    q: "What is the difference between On-Page and Off-Page SEO?",
    a: "On-Page SEO involves optimizing the elements on your website (content quality, keyword density, loading speed, meta tags). Off-Page SEO involves building your website's authority across the internet, primarily through acquiring high-quality backlinks from other reputable sites."
  },
  {
    q: "Is SEO better than paid advertising (PPC)?",
    a: "They serve different purposes. PPC provides immediate traffic as long as you pay for it. SEO takes longer to build, but once established, it provides 'free', highly-qualified traffic 24/7. The best digital strategies utilize both."
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

export default function SeoPage() {
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
              <Search className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              Dominate the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Search Results.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Stop hiding on page two. We engineer technical, high-authority SEO systems that push your website to the top of Google, capturing high-intent traffic and driving sustainable revenue.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Your Free SEO Audit <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Modern SEO?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Search Engine Optimization is no longer about stuffing keywords into paragraphs. It is the highly technical process of aligning your digital infrastructure with search engine algorithms. By optimizing site speed, architectural hierarchy, content relevance, and domain authority, we prove to Google that your website is the absolute best answer to your customer's query.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">Stop paying for every single click. Build permanent digital real estate.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: "High-Intent Traffic", desc: "Unlike social media where you interrupt users, SEO captures people exactly when they are actively searching for your service." },
            { icon: TrendingUp, title: "Compounding ROI", desc: "Paid ads stop working the second you stop paying. A well-ranked SEO article generates free traffic 24/7/365, compounding over time." },
            { icon: Globe, title: "Brand Authority", desc: "Users implicitly trust Google. Ranking organically on page one immediately establishes your brand as the industry leader." }
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
          <p className="text-white/50 text-lg">A full-stack approach to algorithm domination.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "Comprehensive Technical SEO", desc: "We fix crawl errors, optimize site architecture, implement schema markup, and maximize your Core Web Vitals (site speed) to please search bots." },
            { title: "Keyword & Content Strategy", desc: "We identify untapped, high-converting keyword opportunities and deploy a content calendar designed to capture search volume across the entire buyer journey." },
            { title: "High-Authority Link Building", desc: "We acquire powerful, white-hat backlinks from relevant, high-domain-authority websites to dramatically boost your site's trust signals." },
            { title: "Local SEO & GMB Optimization", desc: "For brick-and-mortar or service-area businesses, we dominate the 'Local Pack' mapping results to drive immediate foot traffic and calls." }
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
              We do not rely on outdated 'hacks' or risky shortcuts that get websites penalized. We build fundamentally sound, technically perfect SEO systems that withstand algorithm updates.
            </p>
            <ul className="space-y-4">
              {[
                "Strictly White-Hat Methodologies",
                "Deep Technical Development Expertise",
                "Transparent Ranking & Traffic Reporting",
                "Focus on Revenue, Not Just Traffic"
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
            <LineChart className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"A 400% increase in organic leads."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "Before THRM, we were virtually invisible on Google. Within 8 months of their technical overhaul and content strategy, organic search became our #1 channel for high-ticket client acquisition."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">Founder & CEO</p>
              <p className="text-xs text-white/40">B2B Software Solutions</p>
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
          {seoFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}