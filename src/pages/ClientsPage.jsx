import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

// Inject keyframes once
const CAROUSEL_STYLE = `
@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scroll-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.carousel-track-left {
  display: flex;
  width: max-content;
  animation: scroll-left 35s linear infinite;
}
.carousel-track-right {
  display: flex;
  width: max-content;
  animation: scroll-right 40s linear infinite;
}
.carousel-row:hover .carousel-track-left,
.carousel-row:hover .carousel-track-right {
  animation-play-state: paused;
}
.client-card img {
  filter: grayscale(100%) brightness(0.85);
  transition: filter 0.4s ease, transform 0.4s ease;
}
.client-card:hover img {
  filter: grayscale(0%) brightness(1);
  transform: scale(1.07);
}
`;

function ClientCard({ client }) {
  const inner = (
    <div
      className="client-card"
      style={{
        width: "200px",
        height: "120px",
        flexShrink: 0,
        margin: "0 12px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "hidden",
        cursor: client.websiteLink ? "pointer" : "default",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <img
        src={client.logoUrl}
        alt={`${client.name} logo`}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );

  if (client.websiteLink) {
    return (
      <a
        href={client.websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        title={`Visit ${client.name}`}
      >
        {inner}
      </a>
    );
  }
  return <div title={client.name}>{inner}</div>;
}

function CarouselRow({ clients, direction = "left" }) {
  // Duplicate to create seamless infinite loop
  const doubled = [...clients, ...clients];

  return (
    <div
      className="carousel-row"
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, #02040a, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, #02040a, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className={direction === "left" ? "carousel-track-left" : "carousel-track-right"}>
        {doubled.map((client, idx) => (
          <ClientCard key={`${client._id}-${idx}`} client={client} />
        ))}
      </div>
    </div>
  );
}

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

  // Split clients into two rows for staggered effect
  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  return (
    <main
      style={{
        background: "#02040a",
        color: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{CAROUSEL_STYLE}</style>

      {/* Ambient Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "5%",
            width: "40%",
            height: "40%",
            background: "rgba(255,255,255,0.04)",
            filter: "blur(150px)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "5%",
            width: "40%",
            height: "40%",
            background: "rgba(255,255,255,0.04)",
            filter: "blur(150px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <section
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "160px",
          paddingBottom: "120px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              marginBottom: "32px",
            }}
          >
            <Briefcase style={{ width: "16px", height: "16px", color: "white" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#B0B0B0",
              }}
            >
              Our Network
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Brands that{" "}
            <br />
            <span
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(to right, #ffffff, #9ca3af, #6b7280)",
              }}
            >
              trust us.
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From local businesses in Mumbai to global enterprises, we are proud to engineer
            digital growth for these ambitious brands.
          </p>
        </div>

        {/* Carousel */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid rgba(255,255,255,0.1)",
                borderTopColor: "white",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: "center",
              color: "#9ca3af",
              padding: "32px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              maxWidth: "480px",
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {error}
          </div>
        ) : clients.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "32px" }}>
            No clients added yet. Add some from the Admin Dashboard!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {row1.length > 0 && <CarouselRow clients={row1} direction="left" />}
            {row2.length > 0 && <CarouselRow clients={row2} direction="right" />}
          </div>
        )}

        {/* Subtle count */}
        {!loading && !error && clients.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: "center",
              marginTop: "60px",
              color: "rgba(255,255,255,0.2)",
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {clients.length} brands &amp; growing
          </motion.p>
        )}
      </section>
    </main>
  );
}