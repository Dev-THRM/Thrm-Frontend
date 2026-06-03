import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/content.png"
import { 
  PenTool, 
  Search, 
  Award, 
  Layers, 
  FileText, 
  MessageSquare, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  BookOpen
} from "lucide-react";

// --- FAQ DATA ---
const contentFaqs = [
  {
    q: "How is Content Marketing different from Copywriting?",
    a: "Copywriting is designed to make a user take immediate action (like clicking a 'Buy Now' button on an ad). Content Marketing is about providing free, high-value information (like blogs, guides, and newsletters) to educate your audience, build deep trust, and nurture them until they are ready to buy."
  },
  {
    q: "Who actually writes the content?",
    a: "We use dedicated, native-speaking industry writers, overseen by our senior content strategists. We do not spin cheap articles or rely solely on AI. We interview your internal subject matter experts to ensure the content reflects your brand's unique voice and actual industry expertise."
  },
  {
    q: "How do you decide what topics to write about?",
    a: "Every piece of content we produce is backed by data. We use advanced SEO tools to identify exact questions your target audience is searching for, analyze competitor gaps, and map topics to specific stages of your buyer's journey."
  },
  {
    q: "How does Content Marketing help my SEO?",
    a: "They are two sides of the same coin. Technical SEO gets Google to crawl your site, but high-quality Content is what you actually rank for. Consistently publishing authoritative content earns backlinks, increases your keyword footprint, and signals to Google that your site is an active industry leader."
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

export default function ContentPage() {
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
              <PenTool className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              Content That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Commands Authority.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Stop publishing into the void. We engineer high-value digital assets—from SEO-driven articles to premium lead magnets—that educate your market, build absolute trust, and turn casual readers into loyal buyers.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Build Your Content Engine <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Strategic Content Marketing?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Content Marketing is the art of answering your customer's deepest questions before they even ask them. It is the systematic creation and distribution of valuable, relevant content designed to attract a clearly defined audience. Instead of pitching your products, you are providing truly useful information that proves your expertise and naturally guides prospects toward a purchase.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">The modern buyer researches heavily before ever speaking to sales.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Award, title: "Industry Authority", desc: "When you consistently publish the best answers to industry problems, you stop being just another vendor and become the definitive thought leader." },
            { icon: Search, title: "SEO Synergy", desc: "Google ranks content, not blank pages. A robust content strategy is the primary engine that drives compounding organic search traffic to your website." },
            { icon: Layers, title: "Evergreen Assets", desc: "An ad campaign dies the moment you stop paying. A highly optimized blog post or whitepaper will generate leads for years without additional cost." }
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
          <p className="text-white/50 text-lg">Full-funnel content engineered to convert.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "SEO-Optimized Blogging", desc: "We write deeply researched, long-form articles tailored to capture high-volume search queries and bring highly qualified traffic to your site." },
            { title: "Lead Magnets & Whitepapers", desc: "We design premium gated content (eBooks, industry reports, guides) that incentivize your visitors to hand over their email addresses." },
            { title: "Email Nurture Sequences", desc: "We craft automated email funnels that warm up your new leads, delivering continuous value until they are ready to book a call or purchase." },
            { title: "Content Strategy & Calendars", desc: "No more guessing what to post. We build a 6-12 month editorial calendar aligned directly with your product launches and revenue targets." }
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
              We write for humans first, and algorithms second. Our content doesn't just read well—it ranks well, and more importantly, it persuades. We bridge the gap between creative storytelling and technical SEO.
            </p>
            <ul className="space-y-4">
              {[
                "Data-Backed Topic Generation",
                "Native-Level, Industry-Specific Writers",
                "Built-in Technical SEO Optimization",
                "Focus on Lead Gen, Not Just Pageviews"
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
            <FileText className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"They became our voice."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "Before THRM, our blog was a ghost town of generic AI articles. They came in, interviewed our engineers, and produced incredibly technical whitepapers that established us as the absolute authority in our niche."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">Director of Communications</p>
              <p className="text-xs text-white/40">FinTech Startup</p>
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
          {contentFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}