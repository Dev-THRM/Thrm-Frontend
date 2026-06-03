import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import sm from "../assets/individualservices/branding.png"
import { 
  Target, 
  Fingerprint, 
  Diamond, 
  Palette, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  PenTool
} from "lucide-react";

// --- FAQ DATA ---
const brandingFaqs = [
  {
    q: "What is the difference between branding and marketing?",
    a: "Branding is who you are; marketing is how you build awareness. Branding is your foundation—your logo, your voice, your values, and the feeling you give customers. Marketing is the process of actively promoting that brand to generate sales."
  },
  {
    q: "We already have a logo. Do we need a full branding package?",
    a: "A logo is just one piece of the puzzle. A full branding package includes your typography system, color psychology, tone of voice, and brand guidelines. Without these, your brand will look inconsistent across your website, social media, and physical assets, which destroys consumer trust."
  },
  {
    q: "What are Brand Guidelines (or a Brand Book)?",
    a: "It is the definitive rulebook for your brand. It dictates exactly how your logo can be used, which specific hex codes and fonts to use, and how your brand should sound. It ensures that no matter who works on your marketing in the future, your brand remains 100% consistent."
  },
  {
    q: "How long does a complete brand identity project take?",
    a: "A comprehensive brand identity—from initial market research and psychological positioning to final logo design and guideline creation—typically takes 4 to 8 weeks depending on the complexity of the organization."
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

export default function BrandingPage() {
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
              <Target className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
                Service Focus
              </span>
            </div>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
              Forge a Timeless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Brand Identity.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              A brand is more than a logo; it's a feeling. We distill your company's core values into a powerful visual identity and positioning strategy that instantly separates you from competitors and commands premium pricing.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Build Your Brand <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">What is Strategic Branding?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Branding is the deliberate psychological engineering of how the world perceives your business. It is the cohesive system of your messaging, visual aesthetics, typography, and core values. A strong brand eliminates the need to compete purely on price, elevating your business from a commodity to a deeply trusted industry authority.
          </p>
        </div>
      </section>

      {/* ================= WHY DO YOU NEED IT ================= */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Why your business needs it.</h2>
          <p className="text-white/50 text-lg">People don't buy products; they buy identities and trust.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Diamond, title: "Premium Pricing Power", desc: "A weak brand competes on price. A premium brand competes on value. Exceptional branding justifies higher price points and protects your margins." },
            { icon: Target, title: "Instant Differentiation", desc: "In crowded markets, looking like everyone else guarantees you will be ignored. We engineer identities that cut through the noise and demand attention." },
            { icon: Sparkles, title: "Customer Loyalty", desc: "When your visual identity and messaging resonate emotionally with a customer's worldview, they transition from one-time buyers to lifelong advocates." }
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
          <p className="text-white/50 text-lg">A comprehensive system for your visual identity.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { title: "Brand Discovery & Strategy", desc: "We map out your brand archetypes, target audience psychology, and competitive positioning to ensure your visuals are backed by business logic." },
            { title: "Logo & Visual Identity", desc: "We design striking, versatile logo systems, curating typography pairings and color palettes that evoke the exact emotional response your brand requires." },
            { title: "Comprehensive Brand Guidelines", desc: "We deliver a massive 'Brand Book' detailing exact rules for logo usage, spacing, color hex codes, and tone of voice to ensure absolute consistency." },
            { title: "Corporate Collateral Design", desc: "From pitch decks and business cards to social media templates and letterheads, we apply your new identity across all physical and digital touchpoints." }
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
              We do not design in a vacuum. Because we are a full-scale growth agency, our designers understand how a brand identity actually performs in the real world—on websites, in ad campaigns, and across social media.
            </p>
            <ul className="space-y-4">
              {[
                "Strategy-First Design Approach",
                "Scalable Systems, Not Just Logos",
                "Deep Understanding of Consumer Psychology",
                "Seamless Integration into Web & Marketing"
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
            <Palette className="w-12 h-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">"They captured our soul."</h3>
            <p className="text-white/60 italic leading-relaxed mb-6">
              "We knew our old branding was holding us back. THRM didn't just give us a new logo; they gave us an entire identity that perfectly communicates our premium value. Our confidence in pitching enterprise clients has skyrocketed."
            </p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">Managing Partner</p>
              <p className="text-xs text-white/40">Boutique Consulting Firm</p>
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
          {brandingFaqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}