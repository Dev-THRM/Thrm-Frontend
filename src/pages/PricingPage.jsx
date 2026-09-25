import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { SiMeta } from "react-icons/si";

// Define the data for Digital Marketing
const digitalMarketingPlans = [
  {
    name: "STARTER PACK",
    price: "15,000",
    subtitle: "Social Media Management for Real Business Growth",
    description: "Build Your Brand. Grow Your Business. A perfect package for businesses who are ready to build a strong social media presence and start their digital growth journey.",
    features: [
      { name: "Social Media Management", desc: "Instagram & Facebook handles end-to-end" },
      { name: "4 Viral Reels per Month", desc: "Trend-based, engaging reels" },
      { name: "4 Static Posts per Month", desc: "High-quality, on-brand designs" },
      { name: "DM Management", desc: "Handle messages and enquiries" },
      { name: "Growth Management", desc: "Strategic planning to grow audience" },
      { name: "Social Media Analysis", desc: "Monthly performance report" }
    ],
    platforms: [
      { icon: FaInstagram, name: "Instagram" },
      { icon: FaFacebook, name: "Facebook" }
    ]
  },
  {
    name: "GROWTH PACKAGE",
    price: "25,000",
    popular: true,
    subtitle: "Social Media + Local SEO = Real Business Growth",
    description: "More Visibility. More Customers. More Growth. Everything you need to grow your brand on social media and locally - all in one powerful package.",
    features: [
      { name: "Instagram Management", desc: "Content, reels, stories, engagement" },
      { name: "Facebook Management", desc: "Consistent posting & audience growth" },
      { name: "Google My Business", desc: "Profile optimisation, updates" },
      { name: "8 Viral Reels per Month", desc: "Trend-based reels" },
      { name: "8 Static Posts per Month", desc: "Creative, on-brand designs" },
      { name: "DM & Growth Management", desc: "Messages, strategy, engagement" },
      { name: "Google Review Management", desc: "Positive reviews & reputation" },
      { name: "Social Media Analysis", desc: "Monthly performance tracking" }
    ],
    platforms: [
      { icon: FaInstagram, name: "Instagram" },
      { icon: FaFacebook, name: "Facebook" },
      { icon: FaGoogle, name: "GMB" }
    ]
  },
  {
    name: "BUSINESS SCALE",
    price: "35,000",
    subtitle: "Content + Local SEO + Meta Ads = Business Growth",
    description: "More Platforms. More Visibility. Real Growth. A complete digital growth solution to scale your brand, get more customers and build a strong online presence.",
    features: [
      { name: "Insta, FB & LinkedIn", desc: "Professional content & management" },
      { name: "Google My Business", desc: "Profile optimisation & local visibility" },
      { name: "10 Viral Reels per Month", desc: "High-quality video content" },
      { name: "10 Static Posts per Month", desc: "On-brand product/service designs" },
      { name: "DM & Growth Management", desc: "Full enquiry & growth handling" },
      { name: "Google Review Management", desc: "Reputation management" },
      { name: "Meta Ads Management", desc: "Includes ₹5,000 ad budget" },
      { name: "Social Media Analysis", desc: "Monthly tracking & reports" }
    ],
    platforms: [
      { icon: FaInstagram, name: "Instagram" },
      { icon: FaFacebook, name: "Facebook" },
      { icon: FaLinkedin, name: "LinkedIn" },
      { icon: FaGoogle, name: "GMB" },
      { icon: SiMeta, name: "Meta Ads" }
    ]
  },
  {
    name: "ENTERPRISE GROWTH",
    price: "50,000",
    subtitle: "Full-Funnel Marketing for a Future-Ready Business",
    description: "Complete Growth. Maximum Impact. A 360° digital marketing solution to scale your business across platforms, drive real engagement and generate revenue.",
    features: [
      { name: "All Social Platforms", desc: "Insta, FB, LinkedIn, GMB end-to-end" },
      { name: "Meta Ads Management", desc: "Includes ₹5,000 ad budget" },
      { name: "Google Ads Management", desc: "Includes ₹5,000 ad budget" },
      { name: "12 Viral Reels per Month", desc: "Trend-based video strategy" },
      { name: "12 Static Posts per Month", desc: "High-quality visual content" },
      { name: "6 LinkedIn Blogs/Articles", desc: "Thought leadership & B2B growth" },
      { name: "Local & Website SEO", desc: "On-page, technical & rankings" },
      { name: "DM, Growth & Reviews", desc: "Comprehensive brand handling" }
    ],
    platforms: [
      { icon: FaInstagram, name: "Instagram" },
      { icon: FaFacebook, name: "Facebook" },
      { icon: FaLinkedin, name: "LinkedIn" },
      { icon: FaGoogle, name: "GMB / SEO" },
      { icon: SiMeta, name: "Meta Ads" },
      { icon: FaGoogle, name: "Google Ads" }
    ]
  },
  {
    name: "CUSTOM PLAN",
    price: "LET'S DISCUSS",
    isCustom: true,
    subtitle: "Tailored Strategy for Your Unique Goals",
    description: "Need something specific? We can build a personalized digital marketing package that perfectly fits your exact business needs, budget, and platforms.",
    features: [
      { name: "Custom Platform Selection", desc: "Focus on where your audience is" },
      { name: "Tailored Content Mix", desc: "Custom ratio of reels, static posts & blogs" },
      { name: "Flexible Ad Budgets", desc: "Optimised campaigns based on your goals" },
      { name: "Dedicated Account Manager", desc: "Personalised strategy and support" },
      { name: "Custom Reporting", desc: "Track the metrics that matter most to you" }
    ],
    platforms: [
      { icon: FaInstagram, name: "Instagram" },
      { icon: FaFacebook, name: "Facebook" },
      { icon: FaLinkedin, name: "LinkedIn" },
      { icon: FaGoogle, name: "GMB / SEO" },
      { icon: SiMeta, name: "Meta Ads" },
      { icon: FaGoogle, name: "Google Ads" }
    ]
  }
];

const influencerMarketingPlans = [
  {
    name: "NANO INFLUENCER",
    price: "15,000",
    priceSub: "Service & Management Charges for Brands",
    subtitle: "REAL PEOPLE. HIGH TRUST.",
    features: [
      "Targeted creator shortlisting",
      "Content planning & coordination",
      "End-to-end collaboration management",
      "Performance tracking & report"
    ],
    bestFor: "Local reach | Niche audience | Product seeding | Brand awareness",
  },
  {
    name: "MICRO INFLUENCER",
    price: "25,000",
    popular: true,
    priceSub: "Service & Management Charges for Brands",
    subtitle: "ENGAGED AUDIENCE. REAL RESULTS.",
    features: [
      "Targeted creator shortlisting",
      "Content planning & coordination",
      "End-to-end collaboration management",
      "Performance tracking & report"
    ],
    bestFor: "Brand awareness | Product launches | Lead generation | Regional growth",
  },
  {
    name: "MACRO INFLUENCER",
    price: "50,000",
    priceSub: "Service & Management Charges for Brands",
    subtitle: "WIDER REACH. HIGHER IMPACT.",
    features: [
      "Targeted creator shortlisting",
      "Content planning & coordination",
      "End-to-end collaboration management",
      "Performance tracking & report"
    ],
    bestFor: "Mass awareness | Product launches | Brand positioning | Pan-India reach",
  },
  {
    name: "CUSTOM PACKAGE",
    price: "LET'S DISCUSS",
    isCustom: true,
    priceSub: "Plan the budget as per your goals",
    subtitle: "LET'S BUILD SOMETHING UNIQUE.",
    features: [
      "Custom creator mix (Nano, Micro, Macro)",
      "Campaign strategy & execution",
      "Content ideation & approvals",
      "End-to-end management",
      "Detailed performance report"
    ],
    bestFor: "Specific campaign goals | Multi-city / Pan-India | Long-term collaboration",
  }
];

const websiteDevelopmentPlans = [
  {
    name: "LANDING PAGE",
    price: "12,000",
    priceSub: "per project",
    subtitle: "A SIMPLE START WITH BIG OPPORTUNITIES",
    description: "Landing Page + 1 Year Hosting Server",
    features: [
      "1 Page Website",
      "Modern & Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "1 Year Hosting Server",
      "Ideal for Campaigns, Offers & Product Launches"
    ]
  },
  {
    name: "STATIC WEBSITE",
    price: "18,000",
    popular: true,
    priceSub: "per project",
    subtitle: "BUILD A STRONG ONLINE PRESENCE",
    description: "5 Page Static Website + 1 Year Hosting Server",
    features: [
      "Up to 5 Pages (Home, About, Services, Gallery, Contact)",
      "Modern & Responsive Design",
      "Contact Forms",
      "Basic SEO Setup",
      "1 Year Hosting Server",
      "Ideal for Small & Medium Businesses"
    ]
  },
  {
    name: "DYNAMIC WEBSITE",
    price: "30,000",
    priceSub: "per project",
    subtitle: "MORE FEATURES MORE POSSIBILITIES",
    description: "Dynamic Website + 1 Year Hosting Server + 1 Month AMC Support",
    features: [
      "Dynamic & CMS-based Website",
      "Custom Features (as per requirement)",
      "Modern & Responsive Design",
      "Contact Forms & Integrations",
      "Basic SEO Setup",
      "1 Year Hosting Server",
      "1 Month AMC Support",
      "Ideal for Growing Businesses"
    ]
  },
  {
    name: "ECOMMERCE WEBSITE",
    price: "50,000",
    priceSub: "per project",
    subtitle: "SELL SMARTER GROW FASTER",
    description: "Ecommerce Website + 3 Month AMC Support",
    features: [
      "Full E-commerce Functionality",
      "Product Listing & Categories",
      "Secure Payment Gateway Integration",
      "Order Management System",
      "Modern & Responsive Design",
      "Basic SEO Setup",
      "3 Months AMC Support",
      "Ideal for Online Stores & Retail Brands"
    ]
  }
];

const professionalShootPlans = [
  {
    name: "PRODUCTS",
    subtitle: "PHOTOSHOOT & VIDEOGRAPHY",
    pricePrefix: "STARTS FROM",
    price: "5,000",
    priceSuffix: "ONWARDS*",
    features: [
      "High-quality product photos & videos",
      "Creative concepts & styling",
      "Suitable for social media, e-commerce & ads",
      "Edited, ready-to-use content"
    ]
  },
  {
    name: "PERSONAL PORTFOLIO",
    subtitle: "PHOTOSHOOT & VIDEOGRAPHY",
    pricePrefix: "STARTS FROM",
    price: "10,000",
    priceSuffix: "ONWARDS*",
    features: [
      "Professional portraits & profiles",
      "For models, actors, creators & professionals",
      "Indoor & outdoor shoots",
      "Edited high-resolution images & reels"
    ]
  },
  {
    name: "EVENTS",
    subtitle: "PHOTOSHOOT & VIDEOGRAPHY",
    pricePrefix: "STARTS FROM",
    price: "15,000",
    popular: true,
    priceSuffix: "ONWARDS*",
    features: [
      "Corporate events, launches, college events & more",
      "Candid + highlight coverage",
      "Photos + reels/teaser video",
      "Quick turnaround time",
      "Edited, share-ready content"
    ]
  },
  {
    name: "PRE WEDDING",
    subtitle: "PHOTOSHOOT & VIDEOGRAPHY",
    pricePrefix: "STARTS FROM",
    price: "25,000",
    priceSuffix: "ONWARDS*",
    features: [
      "Concept-based shoots",
      "Multiple locations & themes",
      "Cinematic video + professional photos",
      "Outfit & styling guidance",
      "Edited teaser + full film"
    ]
  },
  {
    name: "WEDDING EVENTS",
    subtitle: "PHOTOSHOOT & VIDEOGRAPHY",
    pricePrefix: "STARTS FROM",
    price: "50,000",
    priceSuffix: "ONWARDS*",
    features: [
      "Complete wedding coverage",
      "Candid + traditional shoots",
      "Cinematic wedding film",
      "Teaser, highlights & full video",
      "Edited, high-resolution photos & videos",
      "Customisable packages as per functions"
    ]
  }
];

const weddingSocialMediaPlans = [
  {
    name: "THE ESSENTIAL",
    subtitle: "FOR THE BEAUTIFUL BEGINNING",
    tags: "SIMPLE | BEAUTIFUL | MEMORABLE",
    pricePrefix: "STARTS FROM",
    price: "35,000",
    priceSuffix: "ONWARDS*",
    slogan: "All the Important Moments, Covered",
    features: [
      "Social media coverage for all key events",
      "Candid photos & vertical videos (reels)",
      "Event highlights & same-day edits",
      "Instagram & Facebook posting",
      "Dedicated content planning",
      "All raw content (photos + videos) shared"
    ]
  },
  {
    name: "THE CELEBRATION",
    subtitle: "FOR A GRANDER STORY",
    tags: "MORE MOMENTS | MORE MAGIC",
    pricePrefix: "STARTS FROM",
    price: "50,000",
    popular: true,
    priceSuffix: "ONWARDS*",
    slogan: "A Team That Feels Like Family ♡",
    features: [
      "Complete social media coverage for all marriage events",
      "Candid photos, cinematic reels & highlight videos",
      "Real-time editing & daily posting",
      "Dedicated creative team (shoot, edit & manage)",
      "Custom templates, trending content & reels",
      "Instagram & Facebook management",
      "All raw content (photos + videos) shared"
    ]
  },
  {
    name: "THE FOREVER",
    subtitle: "FOR A ONCE-IN-A-LIFETIME LOVE",
    tags: "BIGGER | BOLDER | BEAUTIFULLY YOURS",
    pricePrefix: "STARTS FROM",
    price: "1,00,000",
    priceSuffix: "ONWARDS*",
    slogan: "Pre Wedding to Forever We Capture It All ♡",
    features: [
      "Complete social media coverage for all marriage events",
      "Pre-wedding shoot (photos + cinematic video)",
      "Professional wedding shoot (photos + cinematic video)",
      "Candid content, reels, highlight films & teasers",
      "Real-time editing, daily posting & content management",
      "Dedicated creative team (like family)",
      "Custom storytelling, trending edits & premium templates",
      "All raw content (photos + videos) shared"
    ]
  }
];

const tabs = [
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "influencer-marketing", label: "Influencer Marketing" },
  { id: "website-development", label: "Website Development" },
  { id: "professional-shoot", label: "Professional Shoot" },
  { id: "wedding-social", label: "Wedding Social Media" }
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("digital-marketing");

  const handleWhatsAppRedirect = (planName, category) => {
    const phoneNumber = "919004500657";
    const message = encodeURIComponent(`Hi, I'm interested in the ${planName} package from the ${category} section.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="pt-32 pb-20 min-h-screen text-white relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full z-0 pointer-events-none blur-3xl opacity-20" style={{background: 'radial-gradient(circle, rgba(100,100,255,0.8) 0%, transparent 70%)'}} />
      <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full z-0 pointer-events-none blur-3xl opacity-20" style={{background: 'radial-gradient(circle, rgba(255,100,200,0.8) 0%, transparent 70%)'}} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 uppercase tracking-wide">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Packages</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. We offer flexible pricing options designed to scale with your growth.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-white/10 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "digital-marketing" && (
            <motion.div 
              key="digital-marketing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 md:grid-cols-2 ${digitalMarketingPlans.length === 5 ? 'lg:grid-cols-6' : 'lg:grid-cols-4'} gap-5`}
            >
              {digitalMarketingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border ${
                    plan.popular 
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform md:-translate-y-2" 
                      : "bg-white/5 border-white/10"
                  } hover:bg-white/10 hover:border-white/20 transition-all duration-300 group ${
                    digitalMarketingPlans.length === 5 ? (index === 3 ? "lg:col-span-2 lg:col-start-2" : "lg:col-span-2") : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold uppercase text-white/90 mb-1.5">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-1.5">
                      {plan.isCustom ? (
                        <span className="text-lg font-black">{plan.price}</span>
                      ) : (
                        <>
                          <span className="text-2xl font-black">₹{plan.price}</span>
                          <span className="text-white/50 text-xs">/ MONTH</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs font-medium text-blue-400 mb-2">{plan.subtitle}</p>
                    <p className="text-white/60 text-xs leading-snug">{plan.description}</p>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-4" />

                  <div className="flex-grow mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3">What You Get</h4>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="mt-0.5 min-w-[14px] text-blue-400">
                            <Check size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white/90">{feature.name}</p>
                            <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{feature.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2 text-center">Platforms We Manage</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {plan.platforms.map((Platform, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors" title={Platform.name}>
                          <Platform.icon size={12} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsAppRedirect(plan.name, "Digital Marketing")}
                    className={`w-full mt-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}>
                    {plan.isCustom ? "Discuss Now" : "Get Started"}
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "influencer-marketing" && (
            <motion.div 
              key="influencer-marketing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {influencerMarketingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border ${
                    plan.popular 
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform md:-translate-y-2" 
                      : "bg-white/5 border-white/10"
                  } hover:bg-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold uppercase text-white/90 mb-1.5">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-1.5">
                      {plan.isCustom ? (
                        <span className="text-lg font-black">{plan.price}</span>
                      ) : (
                        <span className="text-2xl font-black">₹{plan.price}</span>
                      )}
                    </div>
                    <p className="text-white/50 text-[10px] mb-2">{plan.priceSub}</p>
                    <p className="text-xs font-medium text-blue-400 mb-2">{plan.subtitle}</p>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-4" />

                  <div className="flex-grow mb-5">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="mt-0.5 min-w-[14px] text-blue-400">
                            <Check size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white/90 leading-snug">{feature}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto bg-white/5 p-3 rounded-xl border border-white/5">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">Best For</h4>
                    <p className="text-[10px] text-white/70 leading-relaxed">{plan.bestFor}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsAppRedirect(plan.name, "Influencer Marketing")}
                    className={`w-full mt-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}>
                    {plan.isCustom ? "Discuss Now" : "Get Started"}
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "website-development" && (
            <motion.div 
              key="website-development"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {websiteDevelopmentPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border ${
                    plan.popular 
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform md:-translate-y-2" 
                      : "bg-white/5 border-white/10"
                  } hover:bg-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold uppercase text-white/90 mb-1.5">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-1.5">
                      <span className="text-2xl font-black">₹{plan.price}</span>
                      <span className="text-white/50 text-xs font-bold uppercase tracking-wider ml-1">ONWARDS*</span>
                    </div>
                    <p className="text-white/50 text-[10px] mb-2">{plan.priceSub}</p>
                    <p className="text-xs font-medium text-blue-400 mb-2">{plan.subtitle}</p>
                    <p className="text-white/60 text-xs leading-snug">{plan.description}</p>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-4" />

                  <div className="flex-grow mb-5">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="mt-0.5 min-w-[14px] text-blue-400">
                            <Check size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white/90 leading-snug">{feature}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppRedirect(plan.name, "Website Development")}
                    className={`w-full mt-auto py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}>
                    Get Started
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "professional-shoot" && (
            <motion.div 
              key="professional-shoot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
            >
              {professionalShootPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border ${
                    plan.popular 
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform md:-translate-y-2" 
                      : "bg-white/5 border-white/10"
                  } hover:bg-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold uppercase text-white/90 mb-1">{plan.name}</h3>
                    <p className="text-xs font-medium text-blue-400 mb-4">{plan.subtitle}</p>
                    
                    <p className="text-white/50 text-[10px] mb-1">{plan.pricePrefix}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-black">₹{plan.price}</span>
                    </div>
                    <p className="text-white/50 text-[10px] mb-2">{plan.priceSuffix}</p>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-4" />

                  <div className="flex-grow mb-5">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="mt-0.5 min-w-[14px] text-blue-400">
                            <Check size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white/90 leading-snug">{feature}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppRedirect(plan.name, "Professional Shoot")}
                    className={`w-full mt-auto py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}>
                    Book Now
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "wedding-social" && (
            <motion.div 
              key="wedding-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {weddingSocialMediaPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border ${
                    plan.popular 
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform md:-translate-y-2" 
                      : "bg-white/5 border-white/10"
                  } hover:bg-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold uppercase text-white/90">{plan.name}</h3>
                      <p className="text-[8px] text-right text-white/60 w-24 leading-tight uppercase tracking-widest">{plan.tags}</p>
                    </div>
                    <p className="text-xs font-medium text-blue-400 mb-6">{plan.subtitle}</p>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/50 text-[10px] mb-1">{plan.pricePrefix}</p>
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-3xl font-black">₹{plan.price}</span>
                        </div>
                        <p className="text-white/50 text-[10px] mb-2">{plan.priceSuffix}</p>
                      </div>
                      <p className="text-blue-300/80 italic text-sm w-32 text-right leading-snug mb-2 font-serif">
                        {plan.slogan}
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-5" />

                  <div className="flex-grow mb-6">
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 min-w-[16px] text-blue-400">
                            <Check size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white/90 leading-snug">{feature}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppRedirect(plan.name, "Wedding Social Media")}
                    className={`w-full mt-auto py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}>
                    Let's Plan Your Story
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab !== "digital-marketing" && activeTab !== "influencer-marketing" && activeTab !== "website-development" && activeTab !== "professional-shoot" && activeTab !== "wedding-social" && (
            <motion.div 
              key="coming-soon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-32 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm"
            >
              <Info className="w-12 h-12 text-white/30 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-white/50 text-center max-w-md">
                We are currently updating our pricing for this category. Please check back later or contact us directly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
