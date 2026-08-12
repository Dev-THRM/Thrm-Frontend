import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  ArrowRight,
  Calendar,
  Briefcase,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  X,
  LogOut,
  Mic2,
  ChevronDown,
  MapPin,
  Clock,
  PenIcon,
  Users
} from "lucide-react";
import { useAuth } from "../../context/RouteContext.jsx"; // Assuming this is the correct path from earlier
import { API_BASE_URL } from "../../config";

// === FIX 1: Import ReactQuill and its CSS ===
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ImPencil2 } from "react-icons/im";

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  // ------------------ blogs ------------------
  const [blogs, setBlogs] = useState([]);
  const [loadingb, setLoadingb] = useState(true);

  // ------------------ founders ------------------
  const [founders, setFounders] = useState([]);
  const [loadingf, setLoadingf] = useState(true);

  // ------------------ careers ------------------
  const [openings, setOpenings] = useState([]);
  const [loadingc, setLoadingc] = useState(true);

  // n = none, c = client edit, b = blog edit
  const [edittoggle, setEditToggle] = useState("n");
  const [editingClient, setEditingClient] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Section collapse states
  const [isClientsExpanded, setIsClientsExpanded] = useState(false);
  const [isBlogsExpanded, setIsBlogsExpanded] = useState(false);
  const [isFoundersExpanded, setIsFoundersExpanded] = useState(false);
  const [isCareersExpanded, setIsCareersExpanded] = useState(false);

  const [clientEditForm, setClientEditForm] = useState({
    name: "",
    websiteLink: "",
    logo: null,
  });

  const [blogEditForm, setBlogEditForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [editingCareer, setEditingCareer] = useState(null);
  const [careerEditForm, setCareerEditForm] = useState({
    title: "",
    location: "",
    type: "Full-Time",
    experience: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs`);
        const result = await response.json();
        if (result.success) setBlogs(result.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoadingb(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/founders`);
        const result = await response.json();
        if (result.success) setFounders(result.data);
      } catch (err) {
        console.error("Error fetching founders:", err);
      } finally {
        setLoadingf(false);
      }
    };
    fetchFounders();
  }, []);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/openings`);
        const result = await response.json();
        if (result.success) setOpenings(result.data);
      } catch (err) {
        console.error("Error fetching openings:", err);
      } finally {
        setLoadingc(false);
      }
    };
    fetchOpenings();
  }, []);

  const createExcerpt = (htmlString) => {
    if (!htmlString) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;
  };

  // ------------------ client ------------------
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------------------ influencers ------------------
  const [pendingInfluencers, setPendingInfluencers] = useState(0);

  useEffect(() => {
    const fetchPendingInfluencers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/influencers/pending`, {
          credentials: "include"
        });
        const result = await response.json();
        if (result.success) setPendingInfluencers(result.influencers?.length || 0);
      } catch (err) {
        console.error("Error fetching pending influencers:", err);
      }
    };
    fetchPendingInfluencers();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients`);
        const result = await response.json();

        if (result.success) {
          setClients(result.data);
        } else {
          setError("Failed to load clients.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const deleteClient = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/deleteClients/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to delete client");

      setClients((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteBlog = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/deleteBlogs/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      setBlogs((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteFounder = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this founder episode?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/founders/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete founder");

      setFounders((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteCareer = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this job opening?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/openings/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete opening");

      setOpenings((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const openClientEdit = (client) => {
    setEditingClient(client);
    setClientEditForm({
      name: client.name || "",
      websiteLink: client.websiteLink || "",
      logo: null,
    });
    setEditToggle("c");
  };

  const openBlogEdit = (blog) => {
    setEditingBlog(blog);
    setBlogEditForm({
      title: blog.title || "",
      content: blog.content || "",
      image: null,
    });
    setEditToggle("b");
  };

  const openCareerEdit = (job) => {
    setEditingCareer(job);
    setCareerEditForm({
      title: job.title || "",
      location: job.location || "",
      type: job.type || "Full-Time",
      experience: job.experience || "",
    });
    setEditToggle("j");
  };

  const closeEditModal = () => {
    setEditToggle("n");
    setEditingClient(null);
    setEditingBlog(null);
    setEditingCareer(null);
  };

  const submitClientEdit = async (e) => {
    e.preventDefault();
    if (!editingClient?._id) return;

    try {
      const formData = new FormData();
      formData.append("name", clientEditForm.name);
      formData.append("websiteLink", clientEditForm.websiteLink);

      if (clientEditForm.logo) {
        formData.append("logo", clientEditForm.logo);
      }

      const res = await fetch(
        `${API_BASE_URL}/api/admin/edit/editClients/${editingClient._id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update client");
      }

      setClients((prev) =>
        prev.map((item) => (item._id === editingClient._id ? data.data : item))
      );

      closeEditModal();
    } catch (error) {
      console.error("Client edit error:", error);
      alert(error.message);
    }
  };

  const submitBlogEdit = async (e) => {
    e.preventDefault();
    if (!editingBlog?._id) return;

    try {
      const formData = new FormData();
      formData.append("title", blogEditForm.title);
      formData.append("content", blogEditForm.content);

      if (blogEditForm.image) {
        formData.append("image", blogEditForm.image);
      }

      const res = await fetch(
        `${API_BASE_URL}/api/admin/edit/editBlogs/${editingBlog._id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update blog");
      }

      setBlogs((prev) =>
        prev.map((item) => (item._id === editingBlog._id ? data.data : item))
      );

      closeEditModal();
    } catch (error) {
      console.error("Blog edit error:", error);
      alert(error.message);
    }
  };

  const submitCareerEdit = async (e) => {
    e.preventDefault();
    if (!editingCareer?._id) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/openings/${editingCareer._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(careerEditForm),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update job opening");
      }

      setOpenings((prev) =>
        prev.map((item) => (item._id === editingCareer._id ? data.data : item))
      );

      closeEditModal();
    } catch (error) {
      console.error("Career edit error:", error);
      alert(error.message);
    }
  };

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden pt-40 pb-32 px-6 lg:px-14">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* ================= HEADER & GLOBAL ACTIONS ================= */}
        <div className="text-center mb-16 relative">
          
          <button 
            onClick={handleLogout}
            className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white/70 hover:text-white"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
          </button>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <PenTool className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              Command Center
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-10">
            Admin Dashboard.
          </h1>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admin/clients"
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <Plus className="w-5 h-5" /> Add Client
            </Link>
            <Link
              to="/admin/blogs"
              className="flex items-center gap-2 bg-white/5 border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Blog Post
            </Link>
            <Link
              to="/admin/founders"
              className="flex items-center gap-2 bg-white/5 border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Founder Episode
            </Link>
            <Link
              to="/admin/careers"
              className="flex items-center gap-2 bg-white/5 border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Career Opening
            </Link>
            <Link
              to="/admin/influencers"
              className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-3 rounded-xl font-bold hover:bg-amber-500/20 transition-all relative"
            >
              <Users className="w-5 h-5" /> Influencer Approvals
              {pendingInfluencers > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {pendingInfluencers}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ================= CLIENTS SECTION ================= */}
        <div className="mb-20">
          <button
            onClick={() => setIsClientsExpanded(!isClientsExpanded)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Briefcase className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold text-white">Manage Clients</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {clients.length}
              </span>
            </div>
            <ChevronDown className={`w-6 h-6 text-white/50 group-hover:text-white transition-transform duration-300 ${isClientsExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {isClientsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-8 bg-red-500/10 rounded-2xl border border-red-500/20">
              {error}
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center text-white/50 p-8">No clients added yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.map((client, idx) => (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-white/30 transition-all duration-300"
                >
                  <div className="relative aspect-[3/2] flex items-center justify-center p-6 bg-white/[0.01]">
                    {client.websiteLink ? (
                      <a
                        href={client.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center p-6"
                        title={`Visit ${client.name}'s website`}
                      >
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </a>
                    ) : (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
                      />
                    )}
                  </div>

                  <div className="flex justify-between items-center px-4 py-3 border-t border-white/5 bg-black/40 mt-auto">
                    <span className="text-xs font-semibold text-white/50 truncate max-w-[50%]">
                      {client.name}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openClientEdit(client)}
                        className="text-white/40 hover:text-white transition-colors"
                        title="Edit Client"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-400/70 hover:text-red-400 transition-colors"
                        onClick={() => deleteClient(client._id)}
                        title="Delete Client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= BLOGS SECTION ================= */}
        <div className="mb-20">
          <button
            onClick={() => setIsBlogsExpanded(!isBlogsExpanded)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <PenTool className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold text-white">Manage Blogs</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {blogs.length}
              </span>
            </div>
            <ChevronDown className={`w-6 h-6 text-white/50 group-hover:text-white transition-transform duration-300 ${isBlogsExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {isBlogsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >

          {loadingb ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-white/50 p-8">No blogs published yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden shadow-xl hover:border-white/30 transition-all duration-300"
                >
                  <Link to={`/blogs/${blog._id}`} className="aspect-[16/10] overflow-hidden relative block">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h2>
                    <p className="text-white/50 text-sm mb-6 flex-1 line-clamp-2 break-normal text-justify">
                      {createExcerpt(blog.content)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center px-6 py-4 border-t border-white/5 bg-black/40 mt-auto">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-sm text-white font-bold hover:text-gray-300 transition-colors flex items-center gap-1"
                    >
                      View Post <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="flex gap-4">
                      <button
                        onClick={() => openBlogEdit(blog)}
                        className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-sm font-semibold"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        className="text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-1 text-sm font-semibold"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= FOUNDERS SECTION ================= */}
        <div className="mt-20">
          <button
            onClick={() => setIsFoundersExpanded(!isFoundersExpanded)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Mic2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold text-white">Manage Founders Series</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {founders.length}
              </span>
            </div>
            <ChevronDown className={`w-6 h-6 text-white/50 group-hover:text-white transition-transform duration-300 ${isFoundersExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {isFoundersExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >

          {loadingf ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : founders.length === 0 ? (
            <div className="text-center text-white/50 p-8">No founder episodes added yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {founders.map((founder, idx) => (
                <motion.div
                  key={founder._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden shadow-xl hover:border-white/30 transition-all duration-300"
                >
                  <div className="aspect-[5/5] overflow-hidden relative bg-white/5">
                    <img
                      src={founder.imageUrl}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/70">
                        EP {String(founder.episode).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-white/50 text-sm mb-3">{founder.title} &mdash; {founder.company}</p>
                    <p className="text-white/40 text-xs italic line-clamp-2 mb-4">
                      "{founder.quote}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center px-6 py-4 border-t border-white/5 bg-black/40 mt-auto">
                    <a
                      href={`/founders/${founder.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white font-bold hover:text-gray-300 transition-colors flex items-center gap-1"
                    >
                      View Page <ArrowRight className="w-4 h-4" />
                    </a>
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/admin/founders/edit/${founder._id}`)}
                        className="text-green-400/70 hover:text-green-400 transition-colors p-1"
                        title="Edit Founder"
                      >
                        <PenIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-400/70 hover:text-red-400 transition-colors p-1"
                        onClick={() => deleteFounder(founder._id)}
                        title="Delete Founder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= CAREERS SECTION ================= */}
        <div className="mt-20">
          <button
            onClick={() => setIsCareersExpanded(!isCareersExpanded)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Briefcase className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold text-white">Manage Careers</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {openings.length}
              </span>
            </div>
            <ChevronDown className={`w-6 h-6 text-white/50 group-hover:text-white transition-transform duration-300 ${isCareersExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {isCareersExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                {loadingc ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                ) : openings.length === 0 ? (
                  <div className="text-center text-white/50 p-8">No job openings published yet.</div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {openings.map((job, idx) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 shadow-xl hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3">{job.title}</h3>
                          <div className="space-y-2 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 shrink-0 text-white/40" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 shrink-0 text-white/40" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 shrink-0 text-white/40" />
                              <span>{job.experience}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-6">
                          <a
                            href="/careers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors"
                            title="View Careers"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <div className="flex gap-3">
                            <button
                              onClick={() => openCareerEdit(job)}
                              className="text-white/40 hover:text-white transition-colors"
                              title="Edit Job Opening"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-400/70 hover:text-red-400 transition-colors"
                              onClick={() => deleteCareer(job._id)}
                              title="Delete Job Opening"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {edittoggle !== "n" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
          
          {/* === FIX 2: Widened modal (max-w-4xl) and added max-height with scrolling === */}
          <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto hide-scrollbar rounded-3xl border border-white/10 bg-[#0b1020] p-6 md:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold">
                {edittoggle === "c" ? "Edit Client" : edittoggle === "b" ? "Edit Blog Post" : "Edit Job Opening"}
              </h3>
              <button
                onClick={closeEditModal}
                className="text-white/60 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {edittoggle === "c" && (
              <form onSubmit={submitClientEdit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Client Name</label>
                  <input
                    type="text"
                    value={clientEditForm.name}
                    onChange={(e) =>
                      setClientEditForm({ ...clientEditForm, name: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Website Link</label>
                  <input
                    type="text"
                    value={clientEditForm.websiteLink}
                    onChange={(e) =>
                      setClientEditForm({
                        ...clientEditForm,
                        websiteLink: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Client Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setClientEditForm({
                        ...clientEditForm,
                        logo: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  />
                  <p className="text-xs text-white/40 mt-2 ml-1">
                    Leave empty to keep the current logo.
                  </p>
                </div>

                <div className="flex gap-4 justify-end pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {edittoggle === "b" && (
              <form onSubmit={submitBlogEdit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Blog Title</label>
                  <input
                    type="text"
                    value={blogEditForm.title}
                    onChange={(e) =>
                      setBlogEditForm({ ...blogEditForm, title: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                {/* === FIX 3: Replaced textarea with ReactQuill === */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Blog Content</label>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <ReactQuill 
                      theme="snow" 
                      value={blogEditForm.content} 
                      onChange={(val) => setBlogEditForm({ ...blogEditForm, content: val })} 
                      className="h-64 mb-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setBlogEditForm({
                        ...blogEditForm,
                        image: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  />
                  <p className="text-xs text-white/40 mt-2 ml-1">
                    Leave empty to keep the current featured image.
                  </p>
                </div>

                <div className="flex gap-4 justify-end pt-4 border-t border-white/10 mt-12">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Update Blog Post
                  </button>
                </div>
              </form>
            )}

            {edittoggle === "j" && (
              <form onSubmit={submitCareerEdit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={careerEditForm.title}
                    onChange={(e) =>
                      setCareerEditForm({ ...careerEditForm, title: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Location</label>
                  <input
                    type="text"
                    required
                    value={careerEditForm.location}
                    onChange={(e) =>
                      setCareerEditForm({ ...careerEditForm, location: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Job Type</label>
                  <select
                    value={careerEditForm.type}
                    onChange={(e) =>
                      setCareerEditForm({ ...careerEditForm, type: e.target.value })
                    }
                    className="w-full bg-[#0b1020] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all cursor-pointer"
                  >
                    <option value="Full-Time" className="text-black">Full-Time</option>
                    <option value="Internship" className="text-black">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Experience Required</label>
                  <input
                    type="text"
                    required
                    value={careerEditForm.experience}
                    onChange={(e) =>
                      setCareerEditForm({ ...careerEditForm, experience: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div className="flex gap-4 justify-end pt-4 border-t border-white/10 mt-12">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};