import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Share2,
  Search,
  MonitorSmartphone,
  Star,
  Target,
  PenTool,
  ArrowRight,
} from "lucide-react";
import bgImage from "../../assets/Home/home-services.png";

// Updated to completely neutral colors
const servicesData = [
  {
    id: "social-media",
    title: "Social Media Marketing",
    path: "/services/social",
    description:
      "Using Social Platforms To Promote Brands, Engage Users, And Drive Sales.",
    icon: Share2,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
  {
    id: "seo",
    title: "SEO",
    path: "/services/seo",
    description:
      "Optimizing Websites To Rank Higher On Search Engines And Increase Organic Traffic.",
    icon: Search,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
  {
    id: "web-dev",
    title: "Website Development",
    path: "/services/web",
    description:
      "Designing And Building Functional, User-Friendly, And Responsive Websites.",
    icon: MonitorSmartphone,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    path: "/services/influencer",
    description:
      "Partnering With Influencers To Promote Brands And Reach Target Audiences.",
    icon: Star,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
  {
    id: "branding",
    title: "Branding",
    path: "/services/branding",
    description:
      "Building A Unique Identity, Reputation, And Emotional Connection With Customers.",
    icon: Target,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
  {
    id: "content",
    title: "Content Marketing",
    path: "/services/content",
    description:
      "Creating And Sharing Valuable Content To Attract And Engage Audiences.",
    icon: PenTool,
    color: "text-white",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    bgAccent: "bg-[#1A1A1A]",
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <section
      ref={containerRef}
      // Added background utilities: bg-cover, bg-center, bg-no-repeat
      className="relative py-24 lg:py-32 px-6 lg:px-14 overflow-hidden bg-[#02040a] text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }} // Replace with your image path
      aria-labelledby="services-heading"
    >
      {/* Dark overlay to ensure text readability against the image */}
      <div className="absolute inset-0 bg-[#02040a]/60 z-0" />

      {/* Background Ambience - Layered over the image for extra depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            {/* Pill Text - Silver/Grey */}
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6"
          >
            Architects of your <br className="hidden sm:block" />
            {/* Gradient Text - Grey to White */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              digital expansion.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            We provide end-to-end digital solutions designed to elevate your
            brand, capture your target audience, and drive measurable revenue
            growth.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link to={service.path}>
                <motion.article
                  variants={itemVariants}
                  className={`group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/10 cursor-pointer ${service.glow}`}
                >
                  {/* Subtle top border linear line on hover */}
                  <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.bgAccent} border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white group-hover:text-black`}
                    >
                      <Icon
                        className={`h-6 w-6 ${service.color} transition-colors group-hover:text-black`}
                      />
                    </div>
                    <div className="text-white/10 transition-colors duration-300 group-hover:text-white/30">
                      <span className="text-4xl font-black opacity-50 font-serif">{`0${index + 1}`}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 tracking-tight text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:text-white">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </motion.div>

        {/* Global CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            to="/services"
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 px-8 py-4 transition-all hover:bg-white/10 hover:border-white/30 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
          >
            <div className="relative z-10 flex items-center gap-3 font-bold text-white">
              <span>View Full Service Catalog</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 text-white" />
            </div>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
        <div className="absolute inset-0 backdrop-blur-md opacity-40" />
      </div>
    </section>
  );
}
