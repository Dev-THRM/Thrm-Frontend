import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/influencer.png"
import { 
  Star, 
  TrendingUp, 
  Users, 
  Megaphone, 
  Video, 
  ShieldCheck, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  HeartHandshake
} from "lucide-react";

// --- FAQ DATA ---
const influencerFaqs = [
  {
    q: "Should we use Micro-influencers or Macro-influencers?",
    a: "It depends on your goal. Macro-influencers (100k+ followers) are great for massive brand awareness. However, Micro-influencers (10k - 50k followers) typically yield a much higher engagement rate and ROI because their audiences are highly niche and deeply trust their recommendations."
  },
  {
    q: "How do you ensure influencers don't have fake followers?",
    a: "We never rely on vanity metrics. We use advanced auditing software to analyze an influencer's audience demographics, engagement ratios, and follower growth history to strictly filter out bot accounts, engagement pods, and fake audiences."
  },
  {
    q: "Do we own the content the influencers create?",
    a: "Yes. Part of our contract negotiation process is securing the necessary usage rights (User-Generated Content licensing). This allows your brand to repurpose their high-performing videos for your own website, emails, and paid social ads."
  },
  {
    q: "What is 'Whitelisting' in influencer marketing?",
    a: "Whitelisting is when an influencer grants us access to their social media account to run paid ads through their handle. It performs exceptionally well because the ad looks like a natural, organic post from a trusted creator rather than a corporate advertisement."
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

export default function InfluencerPage() {
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
              <Star className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              Amplify Trust With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Authentic Voices.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Consumers don't trust faceless corporations; they trust people. We match your brand with high-converting creators to produce authentic User-Generated Content (UGC) that drives massive social proof and scales revenue.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Launch Creator Campaign <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Modern Influencer Marketing?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Influencer marketing is no longer just paying a celebrity for a single shoutout. It is the strategic deployment of micro and macro creators to produce User-Generated Content (UGC). These creators act as a trusted bridge between your product and their highly engaged communities, bypassing traditional ad fatigue and transferring their personal credibility directly to your brand.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">Banner blindness is real. People ignore ads, but they listen to people.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Instant Social Proof", desc: "When a trusted creator vouches for your product, it drastically lowers the friction to purchase. Trust is transferred instantly." },
            { icon: Users, title: "Bypass Ad Fatigue", desc: "UGC blends seamlessly into a user's feed. It looks, feels, and sounds like native content, preventing users from immediately scrolling past." },
            { icon: TrendingUp, title: "Highly Engaged Niches", desc: "We tap into specific subcultures and communities where your exact target demographic spends their time and money." }
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
          <p className="text-white/50 text-lg">We handle the creators. You handle the growth.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "Creator Vetting & Discovery", desc: "We manually audit creators to ensure brand alignment, verify audience authenticity (no fake followers), and ensure high engagement rates." },
            { title: "Campaign Strategy & Briefing", desc: "We develop the creative angles and provide detailed creative briefs to influencers, ensuring the content hits your core marketing KPIs." },
            { title: "Contract & Rights Management", desc: "We handle all negotiations, deliverables tracking, payments, and secure the UGC licensing rights for your brand's future use." },
            { title: "Paid Amplification (Whitelisting)", desc: "We take the best-performing organic creator videos and amplify them using paid ad budgets directly through the creator's social handles." }
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
              Managing influencers internally is an operational nightmare. We remove the headache. Our agency handles the outreach, the legal contracts, the creative direction, and the ROI reporting, so you can focus on scaling your business.
            </p>
            <ul className="space-y-4">
              {[
                "Strict Fake-Follower Auditing",
                "Full Usage Rights Secured for Your Brand",
                "Data-Driven Creator Matching",
                "Direct Revenue & ROAS Tracking"
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
            <Megaphone className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"Our ROAS tripled with UGC."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "We were burning cash on highly produced studio ads that nobody engaged with. THRM pivoted our entire strategy to micro-influencer UGC, and our Return on Ad Spend (ROAS) tripled in the first 60 days."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">Chief Marketing Officer</p>
              <p className="text-xs text-white/40">DTC Beauty Brand</p>
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
          {influencerFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}