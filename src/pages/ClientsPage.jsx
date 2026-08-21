import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { API_BASE_URL } from "../config";


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

const staticClients = [
  { _id: 1, name: "Dadar Darbar", logoUrl: "/clients/Dadar Darbar.jpg" },
  { _id: 2, name: "QTK", logoUrl: "/clients/QTK.jpg" },
  { _id: 3, name: "Shield", logoUrl: "/clients/Shield.png" },
  { _id: 4, name: "Solitarie", logoUrl: "/clients/Solitarie.png" },
  { _id: 5, name: "Advocate", logoUrl: "/clients/advocate.png" },
  { _id: 6, name: "Amrut", logoUrl: "/clients/amrut.png" },
  { _id: 7, name: "Anantam", logoUrl: "/clients/anantam.png" },
  { _id: 8, name: "Bioaltus", logoUrl: "/clients/bioaltus.jpg" },
  { _id: 9, name: "Bloom", logoUrl: "/clients/bloom.jpg" },
  { _id: 10, name: "Brambles", logoUrl: "/clients/brambles.png" },
  { _id: 11, name: "City", logoUrl: "/clients/city.png" },
  { _id: 12, name: "Double Dollar", logoUrl: "/clients/double-dollar.png" },
  { _id: 13, name: "DRD Insurance", logoUrl: "/clients/drdinsurance.jpeg" },
  { _id: 14, name: "Elevate", logoUrl: "/clients/elevate.png" },
  { _id: 15, name: "Eravio", logoUrl: "/clients/eravio.png" },
  { _id: 16, name: "Fashion Creation By Pallavi", logoUrl: "/clients/fashioncreationbypallavi.png" },
  { _id: 17, name: "Green", logoUrl: "/clients/green.jpeg" },
  { _id: 18, name: "Kathiawadi", logoUrl: "/clients/kathiawadi.jpg" },
  { _id: 19, name: "Kwality", logoUrl: "/clients/kwality.jpeg" },
  { _id: 20, name: "Lalit", logoUrl: "/clients/lalit_logo.png" },
  { _id: 21, name: "LIL", logoUrl: "/clients/lil.jpg" },
  { _id: 22, name: "Namaskar", logoUrl: "/clients/namaskar.jpeg" },
  { _id: 23, name: "Nitara", logoUrl: "/clients/nitara.png" },
  { _id: 24, name: "Pet", logoUrl: "/clients/pet.png" },
  { _id: 25, name: "Rahat", logoUrl: "/clients/rahat.jpeg" },
  { _id: 26, name: "RC", logoUrl: "/clients/rc.webp" },
  { _id: 27, name: "Revive", logoUrl: "/clients/revive.png" },
  { _id: 28, name: "Sacchi", logoUrl: "/clients/sacchi.jpeg" },
  { _id: 29, name: "Social Soda", logoUrl: "/clients/social-soda.png" },
  { _id: 30, name: "Windmill", logoUrl: "/clients/windmill.jpg" },
  { _id: 31, name: "Zenvis", logoUrl: "/clients/zenvis-logo.jpeg" }
];

export default function ClientsPage() {
  const [clients, setClients] = useState(staticClients);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Combine static clients with newly added backend clients
          setClients([...staticClients, ...result.data]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // We do not set error state here because we still want to show the static clients
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