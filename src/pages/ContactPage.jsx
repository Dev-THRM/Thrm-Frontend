import { useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
// Import your new InstagramFeed component (Adjust the path if needed)
import InstagramFeed from "../components/InstagramFeed.jsx"; 

export default function ContactPage() {

  const containerRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Handle Input Changes
  const handleChange = (e) => {
    const {id, value} = e.target;
    if(id === "phone") {
      const phoneval = value.replace(/\D/g,"").slice(0,10);
      setFormData({...formData, [id]: phoneval});
      return;
    };
    setFormData({...formData, [id]: value});
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if(!emailRegex.test(formData.email)) {
      alert("invalid email format")
      return;
    }

    if(!phoneRegex.test(formData.phone)) {
      alert("invalid number formate only 10-digits are allowed")
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Web3Forms API Integration
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_ACCESS_WEB_3, // <-- PASTE YOUR KEY HERE
          subject: `New Lead from ${formData.name} - THRM Website`,
          from_name: "THRM Contact Form",
          ...formData
        }),
      });

      const navigate = useNavigation();
      const result = await response.json();

      if (result.success.true) {
        setStatus({ type: "success", message: "Message sent successfully! We will contact you shortly." });
        setFormData({ name: "", phone: "", email: "", service: "", message: "" }); // Reset form
        navigate("/wenciuwenowmixwemi2012010010--0d-0sciskcsencnsk/Thank-you");
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Scroll Progress Bar - Updated to Silver/White */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <header className="relative z-10 pt-40 pb-16 lg:pt-52 lg:pb-24 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <MessageSquare className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Let's Connect
            </span>
          </div>
          
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            Ready to scale? <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Start the conversation.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
            Whether you need a complete digital transformation, explosive SEO growth, or a cinematic branding campaign, our team is ready to engineer your success.
          </p>
        </motion.div>
      </header>

      {/* ================= CONTACT LAYOUT (GRID) ================= */}
      <section className="relative z-10 px-6 lg:px-14 pb-20 max-w-[1400px] mx-auto border-b border-white/10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Branch Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8">Our Offices</h2>

            {/* Branch 1: Mumbai HQ */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Mumbai HQ</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Primary Branch</p>
                </div>
              </div>

              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <span>203, Joshi Chamber, Tukdoji Maharaj St, Carnac Bunder, Masjid Bandar East, Masjid Bandar,<br/>Maharashtra, India 400053</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-white/40 shrink-0" />
                  <a href="tel:+919004500657">+91 9004500657 / 9665220569</a>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-white/40 shrink-0" />
                  <a href="mailto:brands@thrmdigitalmarketing.in">brands@thrmdigitalmarketing.in</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/40 shrink-0" />
                  <span>Mon - Sat: 10:30 AM - 8:30 PM</span>
                </li>
              </ul>
            </div>

            {/* Branch 2: Kalyan Branch */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Kalyan Branch</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Regional Office</p>
                </div>
              </div>

              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <span>1st FLOOR, OFFICE NO-04 SEASONS HARMONY, COMMERCIAL BUILDING NR AYUSH NX KALYAN WEST,<br/>Maharashtra, India 421301</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-white/40 shrink-0" />
                  <a href="tel:+919004500657">+91 9004500657 / 9665220569</a>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-white/40 shrink-0" />
                  <a href="mailto:kalyan@thrmdigitalmarketing.in">brands@thrmdigitalmarketing.in</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/40 shrink-0" />
                  <span>Mon - Sat: 10:30 AM - 8:30 PM</span>
                </li>
              </ul>
            </div>

            {/* Google Map (HQ) */}
            <div className="w-full h-[300px] rounded-[2rem] overflow-hidden border border-white/10 shadow-lg relative bg-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.6816627194626!2d73.131917175105!3d19.252700681988593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795408de609b3%3A0xd60c1f48108f89b4!2sTHRM%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1779178302015!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%)" }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="THRM HQ Map"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-[#060b18]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
              <p className="text-white/50 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              {status.message && (
                <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-white/10 text-white border border-white/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="font-medium text-sm">{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1">Full Name *</label>
                    <input 
                      type="text" id="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white/70 ml-1">Phone Number</label>
                    <input 
                      type="tel" required id="phone" value={formData.phone} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">Email Address *</label>
                  <input 
                    type="email" id="email" required value={formData.email} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-white/70 ml-1">Service Interested In</label>
                  <select 
                    id="service" required value={formData.service} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#02040a]">Select a service...</option>
                    <option value="seo" className="bg-[#02040a]">Search Engine Optimization (SEO)</option>
                    <option value="social" className="bg-[#02040a]">Social Media Marketing</option>
                    <option value="web" className="bg-[#02040a]">Website Development</option>
                    <option value="influencer" className="bg-[#02040a]">Influencer Marketing</option>
                    <option value="branding" className="bg-[#02040a]">Branding & Identity</option>
                    <option value="cinema" className="bg-[#02040a]">Cinema Advertising</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1">Your Message *</label>
                  <textarea 
                    id="message" required value={formData.message} onChange={handleChange} rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full group flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INSTAGRAM FEED (NEW) ================= */}
      <InstagramFeed />

    </main>
  );
}