import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Share2,
  Search,
  MonitorSmartphone,
  Star,
  Target,
  PenTool,
  Briefcase,
  Users,
  Trophy,
  PenBox
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png"

// IMPORT YOUR AUTH CONTEXT HERE
import { useAuth } from "../../context/RouteContext.jsx"; // <-- Adjust path if needed

// Upgraded Navigation Data Structure
const navData = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    isMegaMenu: true,
    subItems: [
      { name: "Social Media Marketing", path: "/services/social", desc: "Using Social Platforms To Promote Brands, Engage Users, And Drive Sales.", icon: Share2 },
      { name: "SEO", path: "/services/seo", desc: "Optimizing Websites To Rank Higher On Search Engines And Increase Organic Traffic.", icon: Search },
      { name: "Website Development", path: "/services/web", desc: "Designing And Building Functional, User-Friendly, And Responsive Websites.", icon: MonitorSmartphone },
      { name: "Influencer Marketing", path: "/services/influencer", desc: "Partnering With Influencers To Promote Brands And Reach Target Audiences.", icon: Star },
      { name: "Branding", path: "/services/branding", desc: "Building A Unique Identity, Reputation, And Emotional Connection With Customers.", icon: Target },
      { name: "Content Marketing", path: "/services/content", desc: "Creating And Sharing Valuable Content To Attract And Engage Audiences.", icon: PenTool },
    ]
  },
  {
    name: "About",
    path: "/about",
    isMegaMenu: false,
    subItems: [
      { name: "Our Clients", path: "/clients", icon: Briefcase },
      { name: "Our Team", path: "/about/team", icon: Users },
      { name: "Our Awards", path: "/about/awards", icon: Trophy },
      { name: "Our Branding", path: "/about/branding", icon: PenBox },
    ]
  },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [expandedMobileNav, setExpandedMobileNav] = useState({});

  const location = useLocation();
  const currentPath = location.pathname;

  // === PULL IN YOUR GLOBAL AUTH STATE HERE ===
  const { isAuthenticated, role, logout } = useAuth();

  // Handle Scroll Transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  // Toggle mobile accordion
  const toggleMobileNav = (name) => {
    setExpandedMobileNav(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#02040a]/90 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent border-b border-transparent py-4"
          }`}
      >
        {/* FIX: Removed max-w-[1400px] and changed justify layout so logo is far left, nav is grouped right */}
        {/* Notice we changed px to pr (padding-right) and pl (padding-left) */}
        <div className="mx-auto flex h-20 md:h-24 w-full items-center justify-between pr-6 pl-3 lg:pr-14 lg:pl-6">

  {/* Logo - Pulled even further left with a negative margin (-ml-2) */}
  <Link to="/" className="flex items-center gap-3 relative z-50 mr-auto -ml-2 lg:-ml-4">
    <img
      src={logo}
      alt="THRM"
      className="h-24 md:h-28 w-auto object-contain"
    />
  </Link>

          {/* Wrapper for Navigation + Button - Pushed to the Right */}
          <div className="hidden xl:flex items-center gap-10 h-full">

            {/* Desktop Navigation */}
            <nav className="flex items-stretch gap-8 h-full">
              {(isAuthenticated && role === "admin") && (<div className="relative flex gap-6 items-center h-full">
                <Link
                  to="/admin/dashboard"
                  className="relative flex items-center gap-1.5 text-[1.02rem] font-semibold tracking-wide transition-colors duration-300 py-8 text-blue-400/80 hover:text-blue-400"
                >
                  Admin Dashboard
                </Link>
              </div>)}

              {navData.map((item) => {
                const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");

                return (
                  <div
                    key={item.name}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setHoveredNav(item.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center gap-1.5 text-[1.02rem] font-semibold tracking-wide transition-colors duration-300 py-8 ${isActive || hoveredNav === item.name ? "text-white" : "text-white/60 hover:text-white"
                        }`}
                    >
                      {item.name}
                      {item.subItems && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredNav === item.name ? "rotate-180" : ""}`} />
                      )}

                      {/* Active Route Indicator (Updated to White/Silver) */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute left-1/2 bottom-5 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                        />
                      )}
                    </Link>

                    {/* Desktop Dropdowns */}
                    {item.subItems && (
                      <AnimatePresence>
                        {hoveredNav === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 cursor-default ${item.isMegaMenu ? "w-[750px]" : "w-[250px]"
                              }`}
                          >
                            <div className="bg-[#0b1020]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                              <div className={`grid gap-4 ${item.isMegaMenu ? "grid-cols-2 gap-y-6" : "grid-cols-1"}`}>

                                {item.subItems.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      onClick={() => setHoveredNav(null)}
                                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                                        <SubIcon className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-bold text-white transition-colors mb-1">
                                          {subItem.name}
                                        </h4>
                                        {subItem.desc && (
                                          <p className="text-xs text-white/50 leading-relaxed font-medium">
                                            {subItem.desc}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}

                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              {/* Desktop Admin Logout Button */}
              {(isAuthenticated && role === "admin") && (
                <div className="relative flex gap-6 items-center h-full">
                  <Link
                    onClick={() => logout()}
                    to="/"
                    className="relative flex items-center gap-1.5 text-[1.02rem] font-semibold tracking-wide transition-colors duration-300 py-8 text-red-400/80 hover:text-red-400"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </nav>

            {/* Desktop CTA Button */}
            <div>
              <Link to="/contact" className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[0.98rem] font-medium text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10">
                <span>Let&apos;s Talk</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white xl:hidden ml-auto"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-[#02040a]/95 backdrop-blur-2xl px-6 pt-28 pb-10 xl:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 w-full max-w-md mx-auto">
              {/* --- ADDED CONDITIONAL CHECK HERE --- */}
              {(isAuthenticated && role === "admin") && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col border-b border-white/10 pb-4"
                >
                  <Link
                    onClick={() => { setIsMobileMenuOpen(false); }}
                    to="/admin/dashboard"
                    className="text-2xl font-black tracking-tight text-blue-400 hover:text-white"
                  >
                    Admin Dashboard
                  </Link>
                </motion.div>
              )}
              {navData.map((item, i) => {
                const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");
                const hasSub = !!item.subItems;
                const isExpanded = expandedMobileNav[item.name];

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item.name}
                    className="flex flex-col border-b border-white/10 pb-4 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.path}
                        onClick={() => !hasSub && setIsMobileMenuOpen(false)}
                        className={`text-2xl font-black tracking-tight ${isActive ? "text-white" : "text-white/70 hover:text-white"
                          }`}
                      >
                        {item.name}
                      </Link>

                      {hasSub && (
                        <button
                          onClick={() => toggleMobileNav(item.name)}
                          className="p-2 rounded-full bg-white/5 text-white"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Sub-Menu Accordion */}
                    {hasSub && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-4 pt-4 pl-4"
                          >
                            {item.subItems.map(sub => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-white/60 hover:text-white font-medium"
                              >
                                <sub.icon className="w-4 h-4" />
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile Admin Logout Button */}
              {(isAuthenticated && role === "admin") && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col border-b border-white/10 pb-4"
                >
                  <Link
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    to="/"
                    className="text-2xl font-black tracking-tight text-red-400 hover:text-red-300"
                  >
                    Logout
                  </Link>
                </motion.div>
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex justify-center pb-8"
            >
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-gray-200"
              >
                Start a Project <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}