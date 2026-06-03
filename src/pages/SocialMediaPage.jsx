import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/social_media.png"
import { 
  Share2, 
  TrendingUp, 
  Users, 
  Target, 
  MessageCircle, 
  BarChart3, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Smartphone
} from "lucide-react";

// --- FAQ DATA ---
const smmFaqs = [
  {
    q: "Which social media platforms should my business be on?",
    a: "It entirely depends on where your target audience spends their time. We conduct deep audience research to determine if your brand belongs on LinkedIn (B2B), Instagram and TikTok (B2C Visuals), X/Twitter (Conversational), or a bespoke mix of several channels."
  },
  {
    q: "Do you create the content, or do we need to provide it?",
    a: "We are a full-service agency. Our in-house team handles everything: strategy, copywriting, graphic design, video editing, and publishing. You can provide raw assets if you have them, but we can operate entirely autonomously to produce high-end content."
  },
  {
    q: "How do you measure social media ROI?",
    a: "We look far beyond 'likes' and 'followers'. We track meaningful metrics including Website Click-Through Rates (CTR), Cost Per Acquisition (CPA), Lead Generation, and ultimately, the direct revenue attributed to our social campaigns."
  },
  {
    q: "How long does it take to build a social media presence?",
    a: "While paid social campaigns can drive immediate traffic, organic community building is a long-term strategy. Typically, you will see a significant shift in brand sentiment, engagement, and consistent traffic within the first 3 to 6 months of a dedicated strategy."
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

export default function SocialMediaPage() {
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
              <Share2 className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              Scroll-stopping <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Social Media.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              We turn passive scrollers into passionate brand advocates. Dominate feeds, drive conversations, and scale your revenue with data-backed social strategies.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Your Social Audit <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Social Media Marketing?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            It is far more than just posting pictures. Modern Social Media Marketing (SMM) is the systematic engineering of your brand's digital reputation. It involves leveraging high-impact visual storytelling, algorithm-specific content, and hyper-targeted advertising to build a loyal community that inherently trusts your business and purchases your services.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">Attention is the new currency. If you aren't capturing it, your competitors are.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Unmatched Reach", desc: "Access billions of active daily users globally. We put your brand directly into the hands of your exact demographic." },
            { icon: Target, title: "Precision Targeting", desc: "Unlike traditional media, we can target users based on granular data: interests, behaviors, job titles, and purchasing history." },
            { icon: TrendingUp, title: "Revenue Scalability", desc: "Social platforms act as high-speed funnels. We turn engagement into direct website traffic, qualified leads, and measurable sales." }
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
          <p className="text-white/50 text-lg">A 360-degree approach to social domination.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "Platform Strategy & Audits", desc: "We analyze your current presence, identify competitor weaknesses, and map out a bespoke roadmap for platform-specific growth." },
            { title: "High-End Content Production", desc: "Our creative team produces cinematic video, custom graphics, and viral-engineered short-form content (Reels/TikToks)." },
            { title: "Community Management", desc: "We act as your brand's voice, actively engaging with comments, messages, and mentions to foster deep brand loyalty." },
            { title: "Paid Social Amplification", desc: "We deploy highly optimized ad budgets to amplify top-performing organic content and drive immediate direct-response conversions." }
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
              We operate at the intersection of logic and magic. We don't just chase fleeting trends; we engineer campaigns based on deep psychological triggers and robust data analytics.
            </p>
            <ul className="space-y-4">
              {[
                "100% Data-Driven Decision Making",
                "In-House Creative & Video Team",
                "Transparent, Real-Time ROI Reporting",
                "No Cookie-Cutter Templates"
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
            <MessageCircle className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"They changed our trajectory."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "THRM completely overhauled our social presence. We went from posting into the void to generating hundreds of qualified inbound leads per month purely through Instagram and LinkedIn."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">VP of Marketing</p>
              <p className="text-xs text-white/40">Global Tech Enterprise</p>
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
          {smmFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}