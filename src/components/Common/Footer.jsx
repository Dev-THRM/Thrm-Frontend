import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowRight } from "lucide-react";

import logo from "../../assets/logo.png";
import instagram from "../../assets/icons/3.png";
import facebook from "../../assets/icons/4.png";
import youtube from "../../assets/icons/5.png";
import X from "../../assets/icons/6.png";
import whatsapp from "../../assets/icons/7.png";
import linkedin from "../../assets/icons/9.png";
import linktree from "../../assets/icons/10.jpeg";
import medium from "../../assets/icons/medium1.png";
import pinterest from "../../assets/icons/pinterest1.png";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About THRM", path: "/about" },
  { name: "Our Services", path: "/services" },
  { name: "Blog & News", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

const footerServices = [
  { name: "SEO Optimization", path: "/services/seo" },
  { name: "Social Media Marketing", path: "/services/social" },
  { name: "Website Development", path: "/services/web" },
  { name: "Content Strategy", path: "/services/content" },
  { name: "Brand Identity", path: "/services/branding" },
  { name: "Influencer Marketing", path: "/services/influencer" },
];

const footerLocations = [
  { name: "Services in Mumbai", path: "/services" },
  { name: "Services in Delhi", path: "/services" },
  { name: "Services in Pune", path: "/services" },
  { name: "Services in Bangalore", path: "/services" },
  { name: "Services in Hyderabad", path: "/services" },
];

const socialLinks = [
  { icon: instagram, href: "https://www.instagram.com/thrm.digitalmarketing_agency/", label: "Instagram" },
  { icon: facebook, href: "https://www.facebook.com/people/THRM-Digital-Marketing-Agency/61554950021351/", label: "Facebook" },
  { icon: X, href: "https://x.com/thrm_social", label: "X (Twitter)" },
  { icon: youtube, href: "https://www.youtube.com/@thrmdigitalmarketingagency", label: "YouTube" },
  { icon: whatsapp, href: "https://api.whatsapp.com/send/?phone=919004500657", label: "WhatsApp" },
  { icon: linkedin, href: "https://www.linkedin.com/company/thrmdigitalmarketingagency/", label: "LinkedIn" },
  { icon: linktree, href: "https://linktr.ee/thrm_group", label: "Linktree" }, 
  { icon: medium, href: "https://medium.com/@brands_69181", label: "Medium" },
  { icon: pinterest, href: "https://www.pinterest.com/thrmdigitalmarketing/", label: "Pinterest" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#02040a] text-white pt-24 overflow-hidden border-t border-white/5">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-14">
        
        {/* Pre-Footer CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-10 lg:p-16 overflow-hidden mb-24 backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/10 to-transparent blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
                Ready to dominate your <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  digital market?
                </span>
              </h2>
              <p className="text-white/60 text-lg">
                Let's build a growth engine that scales your revenue and
                elevates your brand authority.
              </p>
            </div>
            <Link
              to="/contact"
              className="group relative whitespace-nowrap rounded-2xl bg-white px-8 py-5 transition-all hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] shrink-0"
            >
              <div className="relative z-10 flex items-center gap-3 font-bold text-black">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-3 pr-4">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <img src={logo} alt="THRM Logo" className="h-26 w-auto object-contain" />
            </Link>
            <p className="text-white/60 leading-relaxed mb-8 max-w-sm text-sm">
              An elite digital marketing agency engineering strategy-first campaigns, modern web experiences, and sustainable brand growth.
            </p>

            {/* FIX: Allowed wrapping and increased gap/size so icons can breathe */}
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-9 w-9 object-cover rounded-md shadow-sm"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-6 tracking-wide text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-6 tracking-wide text-white">Expertise</h3>
            <ul className="space-y-3">
              {footerServices.map((service, idx) => (
                <li key={idx}>
                  <Link to={service.path} className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-6 tracking-wide text-white">Locations</h3>
            <ul className="space-y-3">
              {footerLocations.map((loc, idx) => (
                <li key={idx}>
                  <Link to={loc.path} className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-6 tracking-wide text-white">Connect</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a href="mailto:brands@thrmdigitalmarketing.in" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm whitespace-nowrap">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  brands@thrmdigitalmarketing.in
                </a>
              </li>
              <li>
                <a href="mailto:hr@thrmdigitalmarketing.in" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm whitespace-nowrap">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  hr@thrmdigitalmarketing.in
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  1st FLOOR, OFFICE NO-04 SEASONS HARMONY, COMMERCIAL BUILDING NR AYUSH NX KALYAN WEST, 421301
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
          <p>© {currentYear} Authorised & Copyright THRM Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}