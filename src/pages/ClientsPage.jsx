import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("https://thrmbackend.in/api/clients");
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

  return (
    <main className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      {/* Ambient Background - Adjusted to neutral silver/white tones */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-30" />
      </div>

      <section className="relative z-10 pt-40 pb-32 px-6 lg:px-14 max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Our Network</span>
          </div>
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-6">
            Brands that <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-lg">
              trust us.
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From local businesses in Mumbai to global enterprises, we are proud to engineer digital growth for these ambitious brands.
          </p>
        </div>

        {/* Database Rendering Logic */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-gray-400 p-8 bg-white/5 rounded-2xl max-w-lg mx-auto border border-white/10">
            {error}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center text-white/50 p-8">
            No clients added yet. Add some from the Admin Dashboard!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, idx) => {
              
              const LogoCard = (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="group relative aspect-3/2 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm flex items-center justify-center p-8 hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  <img 
                    src={client.logoUrl} 
                    alt={`${client.name} logo`} 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all duration-500"
                  />
                  
                  {client.websiteLink && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              );

              return client.websiteLink ? (
                <a 
                  key={client._id} 
                  href={client.websiteLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus:ring-2 focus:ring-white rounded-3xl"
                  title={`Visit ${client.name}'s website`}
                >
                  {LogoCard}
                </a>
              ) : (
                <div key={client._id} title={client.name}>
                  {LogoCard}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}