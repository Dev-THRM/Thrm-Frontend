import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import statsBG from "../../assets/Home/home-stats.png";
import { Rocket, Users, BadgeCheck, Activity } from "lucide-react";

// Advanced Counter that only starts when scrolled into view
function AnimatedCounter({ from = 0, to, duration = 2.5 }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView, duration]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function StatsSection() {
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Rocket,
      number: 1569,
      suffix: "+",
      label: "Projects Deployed",
      desc: "Successfully launched campaigns",
      color: "text-gray-300",
      bgHover: "hover:bg-white/10",
      borderHover: "hover:border-white/30",
    },
    {
      icon: Users,
      number: 170,
      suffix: "+",
      label: "Global Clients",
      desc: "Trusting our methodology",
      color: "text-white",
      bgHover: "hover:bg-white/10",
      borderHover: "hover:border-white/40",
      highlight: true,
    },
    {
      icon: BadgeCheck,
      number: 69,
      suffix: "",
      label: "Brand Awards",
      desc: "Recognized industry excellence",
      color: "text-gray-400",
      bgHover: "hover:bg-white/10",
      borderHover: "hover:border-white/30",
    },
    {
      icon: Activity,
      number: 3,
      suffix: "Y+",
      label: "Years Experience",
      desc: "Continuous scale & growth",
      color: "text-gray-400",
      bgHover: "hover:bg-white/10",
      borderHover: "hover:border-white/30",
    },
  ];

  return (
  <section
    ref={sectionRef}
    className="relative py-24 lg:py-32 px-6 lg:px-16 overflow-hidden bg-[#02040a] text-white"
    aria-labelledby="stats-heading"
  >
    {/* Dynamic Background Elements */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Changed: Changed src variable name to statsBg to fix naming conflict */}
      <img 
        src={statsBG} 
        alt=""
        className="w-full h-full object-cover select-none" 
      />
      {/* Dark Overlay to ensure text stays readable */}
      <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
    </div>

    {/* Changed: Fixed invalid max-w-350 class to standard Tailwind max-w-7xl */}
    <div className="relative z-10 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
            Proven Metrics
          </span>
        </motion.div>

        <motion.h2
          id="stats-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter leading-[1.1]"
        >
          Scale verified by <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            the numbers.
          </span>
        </motion.h2>
      </div>

      {/* Stats Grid - Maps over the data array safely */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {stats.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl transition-all duration-500
                ${item.highlight 
                  ? "bg-gradient-to-b from-white/10 to-transparent border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] transform lg:-translate-y-4" 
                  : "bg-white/5 border border-white/10 hover:-translate-y-2"}
                ${item.bgHover || ""} ${item.borderHover || ""}
              `}
            >
              {item.highlight && (
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <div className="h-24 w-24 bg-white/20 blur-2xl rounded-full" />
                </div>
              )}

              <div className={`inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                <Icon size={28} strokeWidth={2} />
              </div>

              <h3 className="text-4xl lg:text-5xl font-black mb-2 tracking-tight flex items-baseline text-white">
                <AnimatedCounter to={item.number} />
                <span className={`text-2xl lg:text-3xl font-bold ml-1 ${item.color}`}>
                  {item.suffix}
                </span>
              </h3>

              <div className="mt-4 space-y-1">
                <p className="text-lg font-bold text-white tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </motion.div>
          );
        })}
      </div>
    </div>
    
    <p className="sr-only">
      THRM has completed over 1569 projects, serves over 170 global clients, has won 69 brand awards, and possesses over 3 years of digital marketing experience.
    </p>

    <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
        <div className="absolute inset-0 backdrop-blur-md opacity-40" />
      </div>
  </section>
);
}