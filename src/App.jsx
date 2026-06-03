import { useState, useEffect } from "react"; // <-- Import hooks
import { AnimatePresence } from "framer-motion"; // <-- Import AnimatePresence
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar.jsx";
import Footer from "./components/Common/Footer.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import { AuthProvider } from "./context/RouteContext.jsx"; // Adjust path
import ProtectedRoute from "./components/Common/ProtectedRoute.jsx"; // Adjust path

// Page Imports
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import AwardsPage from "./pages/AwardsPage.jsx";
import AdminClients from "./pages/admin/AdminClients.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import AdminBlogs from "./pages/admin/AdminBlogs.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import SingleBlogPage from "./pages/SingleBlogPage.jsx";

import SocialMediaPage from "./pages/SocialMediaPage.jsx";
import SeoPage from "./pages/SeoPage.jsx";
import WebDevPage from "./pages/WebDevPage.jsx";
import InfluencerPage from "./pages/InfluencerPage.jsx";
import BrandingPage from "./pages/BrandingPage.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import OurBrandingPage from "./pages/OurBrandingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Preloader from "./components/Common/Preloader.jsx";

import TaraChatbot from "./components/Home/TaraChatbot.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import FloatingButtons from "./components/Common/FloatingButtons.jsx";
import { TYP } from "./pages/ThankYouPage.jsx";

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPreloading(false), 2500);
    return () => clearTimeout(timer); 
  }, []);

  return (
    // Wrap everything in AuthProvider!
    <AuthProvider>
      <CustomCursor />
      
      <AnimatePresence>
        {isPreloading && <Preloader />}
      </AnimatePresence>

      <ScrollToTop />
      <Navbar />

      <main className="min-h-screen bg-[#02040a]">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/team" element={<TeamPage />} />
          <Route path="/about/awards" element={<AwardsPage />} />
          <Route path="/about/branding" element={<OurBrandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<SingleBlogPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/wenciuwenowmixwemi2012010010--0d-0sciskcsencnsk/Thank-you" element={<TYP/>}/>
          
          <Route path="/services/social" element={<SocialMediaPage />} />
          <Route path="/services/seo" element={<SeoPage />} />
          <Route path="/services/web" element={<WebDevPage />} />
          <Route path="/services/influencer" element={<InfluencerPage />} />
          <Route path="/services/branding" element={<BrandingPage />} />
          <Route path="/services/content" element={<ContentPage />} />

          {/* --- SECURE ADMIN ROUTES --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={
            <div className="pt-32 text-white h-screen flex flex-col items-center justify-center">
              <h1 className="text-6xl font-black mb-4">404</h1>
              <p className="text-xl text-white/60">Page not found</p>
            </div>
          }/>
        </Routes>
        <TaraChatbot />
      </main>

      {/* === ADD THE FLOATING BUTTONS HERE === */}
        <FloatingButtons />

      <Footer />
    </AuthProvider>
  );
}