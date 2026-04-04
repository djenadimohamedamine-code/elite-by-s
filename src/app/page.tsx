"use client";

import { useState, useEffect } from "react";
import {
  Film, Code2, Wifi, Car, Smartphone, Globe,
  Github, Mail, ExternalLink, ChevronRight,
  Layers, Zap, Monitor, Coffee, Camera, Network,
  Radio, Cpu, Eye, BrainCircuit, Server, MessageCircle
} from "lucide-react";

// ── SKILLS DATA ───────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    label: "Streaming & Distribution",
    icon: Radio,
    color: "cyan",
    items: ["HLS", "SRT", "WebRTC", "NDI Access Manager", "NDI Bridge", "Tailscale VPN", "ngrok", "Port Forwarding"],
  },
  {
    label: "Broadcast Software",
    icon: Monitor,
    color: "orange",
    items: ["vMix", "OBS Studio", "Wirecast", "Adobe Premiere Pro", "Resolume Arena"],
  },
  {
    label: "Étalonnage & Scopes",
    icon: Eye,
    color: "purple",
    items: ["DaVinci Resolve", "Waveform", "Vectorscope", "Parade Scope", "Étalonnage professionnel"],
  },
  {
    label: "Caméras & Systèmes",
    icon: Camera,
    color: "orange",
    items: ["Sony Alpha", "Sony XD Cameras", "Caméras PTZ", "NDI Camera Control"],
  },
  {
    label: "Réseau & Infrastructure",
    icon: Network,
    color: "cyan",
    items: ["IP statique", "Passerelle / Masque", "DNS public", "Câblage réseau", "Régie informatique", "Maintenance"],
  },
  {
    label: "Développement",
    icon: Code2,
    color: "purple",
    items: ["Flutter / Dart", "NDI SDK (iOS/Android/PC)", "Next.js", "TypeScript", "Firebase", "C++ NDK", "OBD-II KWP2000"],
  },
  {
    label: "IA & Outils Créatifs",
    icon: BrainCircuit,
    color: "cyan",
    items: ["Claude AI", "VS Code", "Prompt Engineering", "Génération photo/vidéo", "Veo 3", "LLM Workflows"],
  },
];

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "mimo-ndi-ios",
    title: "MIMO NDI — iOS App",
    subtitle: "Source NDI Broadcast Professionnelle",
    description:
      "Application iOS transformant un iPhone en source NDI pour OBS, vMix et Wirecast. Intègre le NDI SDK natif pour streaming zéro-latence vers toute régie broadcast. Déployée en conditions réelles à Echorouk TV.",
    tech: ["Flutter", "NDI SDK", "iOS", "Swift", "C++ NDK"],
    badge: "Broadcast",
    badgeColor: "orange" as const,
    icon: Monitor,
    gradient: "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(251,191,36,0.08))",
    border: "rgba(255,107,53,0.3)",
    files: ["lib/main.dart (39 KB)", "NdiCameraPreview.swift", "NDI 5/6 SDK"],
    github: "https://github.com/djenadimohamedamine-code/MIMO_IOS",
  },
  {
    id: "ptz-dashboard",
    title: "PTZ Remote Dashboard",
    subtitle: "Contrôle PTZ via Tailscale Tunnel",
    description:
      "Dashboard iPhone complet pour réception et pilotage d'une caméra PTZ à distance. Flux NDI → HLS avec segmentation (~3s latence fluide) ou WebRTC quasi-temps-réel. Les opérateurs accèdent via un lien Tailscale Funnel sans être sur le réseau. Contrôles directionnels (gauche/droite/haut/bas) intégrés dans le même dashboard.",
    tech: ["Flutter", "HLS", "WebRTC", "NDI", "Tailscale", "HLS Segmentation"],
    badge: "Remote Control",
    badgeColor: "cyan" as const,
    icon: Camera,
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,145,234,0.06))",
    border: "rgba(0,229,255,0.3)",
    files: ["PTZ Controls (↑↓←→)", "HLS Player", "WebRTC Stream", "Tailscale Funnel"],
    github: "https://github.com/djenadimohamedamine-code",
  },
  {
    id: "ndi-tracking",
    title: "NDI Vision — PC App",
    subtitle: "Tracking IA & Alertes Automatiques",
    description:
      "Application PC recevant un flux NDI et appliquant de l'analyse video en temps réel : tracking de sujet, détection de surexposition, alerte flou (bougé/mise au point), et autres métriques qualité. Entièrement développée et fonctionnelle.",
    tech: ["NDI SDK PC", "Computer Vision", "Tracking", "Python/C++"],
    badge: "IA Vision",
    badgeColor: "purple" as const,
    icon: Eye,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.06))",
    border: "rgba(139,92,246,0.3)",
    files: ["Tracking sujet", "Alerte surexposition", "Alerte flou", "NDI Input"],
    github: "https://github.com/djenadimohamedamine-code",
  },
  {
    id: "mimo-spark",
    title: "Mimo Spark OBD-II",
    subtitle: "Diagnostic Automobile Android",
    description:
      "Application Android dédiée à la Chevrolet Spark (KWP2000). Dashboard temps réel : RPM, vitesse, température, carburant. Scanner DTC avec protocole KWP2000 Fast-Init (ATFI), calcul de vitesse par rapport de boîte, GPS et historique.",
    tech: ["Flutter", "OBD-II", "KWP2000", "ELM327", "GPS", "Firebase"],
    badge: "Automotive",
    badgeColor: "orange" as const,
    icon: Car,
    gradient: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(251,191,36,0.06))",
    border: "rgba(255,107,53,0.25)",
    files: ["obd_service.dart", "dtc_scanner.dart", "dashboard.dart", "diagnostic.dart", "map_page.dart"],
    github: "https://github.com/djenadimohamedamine-code/spark",
  },
  {
    id: "elite-booking",
    title: "Elite By S — Booking PWA",
    subtitle: "Application de Réservation",
    description:
      "PWA Next.js pour salon de beauté haut de gamme. Booking flow complet, dashboard admin temps réel Firestore, notifications WhatsApp automatiques. Déployée sur Vercel.",
    tech: ["Next.js", "Firebase", "TypeScript", "PWA", "Vercel"],
    badge: "Web App",
    badgeColor: "purple" as const,
    icon: Globe,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.04))",
    border: "rgba(139,92,246,0.25)",
    files: ["bookings.ts", "admin/page.tsx", "notifications-func.js"],
    github: "https://github.com/djenadimohamedamine-code/elite-by-s",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = "Broadcast Engineer & Developer";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 55);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const colorMap: Record<string, string> = {
    cyan: "var(--accent-cyan)",
    orange: "var(--accent-orange)",
    purple: "var(--accent-purple)",
  };

  return (
    <>
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />

      {/* ── NAVBAR ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--accent-cyan)" }}>MIMO</span>
            <span style={{ color: "var(--text-secondary)" }}>-</span>
            <span>NDI</span>
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Compétences", href: "#competences" },
              { label: "Projets", href: "#projets" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a key={link.label} href={link.href}
                style={{ fontSize: "0.85rem", color: "var(--text-secondary)", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "6rem", position: "relative" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* Company badge */}
          <div className="animate-up" style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span className="badge badge-orange" id="badge-company">
              <span className="status-dot" style={{ background: "var(--accent-orange)", borderColor: "var(--accent-orange)" }} />
              Echorouk TV · Ingénieur Broadcast
            </span>
          </div>

          {/* Name */}
          <h1 className="animate-up-2" style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", marginBottom: "0.75rem", letterSpacing: "-0.025em" }}>
            Djenadi{" "}
            <span style={{ background: "var(--gradient-cyan)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Mohamed Amine
            </span>
          </h1>

          {/* Typewriter */}
          <p className="animate-up-3" style={{
            fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
            color: "var(--text-secondary)",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "1.5rem",
            minHeight: "2rem",
          }}>
            &gt; {typed}<span className="cursor" style={{ color: "var(--accent-cyan)" }}>_</span>
          </p>

          {/* Description */}
          <p className="animate-up-4" style={{
            maxWidth: "580px", color: "var(--text-secondary)",
            fontSize: "0.925rem", lineHeight: "1.85", marginBottom: "2.5rem",
          }}>
            Ingénieur broadcast à <span style={{ color: "var(--accent-orange)", fontWeight: 600 }}>Echorouk TV</span>. 
            Je maîtrise la chaîne complète du signal vidéo : de la caméra PTZ au flux&nbsp;
            <span style={{ color: "var(--accent-cyan)" }}>NDI/HLS/SRT/WebRTC</span>, 
            en passant par l'étalonnage, le câblage réseau, et le développement d'applications mobiles sur mesure.
          </p>

          {/* CTA */}
          <div className="animate-up-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            <a href="#projets" className="btn btn-primary" id="cta-projects">
              Voir mes projets <ChevronRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline" id="cta-contact">
              Me contacter
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "2rem",
            paddingTop: "2rem", borderTop: "1px solid var(--border)", width: "fit-content",
          }}>
            {[
              { value: "NDI", label: "SDK maîtrisé" },
              { value: "HLS·SRT", label: "Streaming" },
              { value: "5+", label: "Apps déployées" },
              { value: "PTZ", label: "Remote control" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", background: "var(--gradient-cyan)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="competences" style={{ padding: "var(--section-gap) 0", position: "relative", zIndex: 1 }}>
        <div className="container">
          <h2 className="section-title">Compétences</h2>
          <div className="divider divider-cyan" />
          <p className="section-subtitle">Maîtrise complète de la chaîne broadcast & développement</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              const col = colorMap[group.color];
              return (
                <div key={group.label} className="card">
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${col}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={17} color={col} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: "0.82rem", color: col }}>{group.label}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {group.items.map((item) => (
                        <span key={item} className="skill-pill">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projets" style={{ padding: "var(--section-gap) 0", position: "relative", zIndex: 1 }}>
        <div className="container">
          <h2 className="section-title">Projets réalisés</h2>
          <div className="divider divider-orange" />
          <p className="section-subtitle">Applications déployées et systèmes opérationnels</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <div key={project.id} id={`project-${project.id}`} className="card"
                  style={{ borderColor: project.border, background: project.gradient }}
                >
                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={19} color="var(--text-secondary)" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>{project.title}</h3>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{project.subtitle}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        <span className="status-dot" />
                        <span className={`badge badge-${project.badgeColor}`}>{project.badge}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
                      {project.description}
                    </p>

                    {/* Files (technical depth) */}
                    <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: "0.6rem 0.8rem", marginBottom: "0.85rem", fontFamily: "monospace", fontSize: "0.73rem" }}>
                      <div style={{ color: "var(--text-muted)", marginBottom: "0.3rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Modules</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {project.files.map((f) => (
                          <span key={f} style={{ color: "var(--accent-cyan)", background: "rgba(0,229,255,0.07)", padding: "0.15rem 0.5rem", borderRadius: 4 }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                      {project.tech.map((t) => (
                        <span key={t} className="badge badge-gray">{t}</span>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    {project.github && (
                      <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                           style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500, transition: "color 0.2s" }}
                           onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                           onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
                          <Github size={14} />
                          Voir le code sur GitHub
                          <ExternalLink size={10} style={{ opacity: 0.5 }} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "var(--section-gap) 0 6rem", position: "relative", zIndex: 1 }}>
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <div className="divider divider-purple" />
          <p className="section-subtitle">Collaborations broadcast, développement ou consulting réseau</p>

          <div className="card" style={{ borderColor: "rgba(139,92,246,0.3)", background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.04))", maxWidth: 540 }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: "1.85" }}>
                Disponible pour des projets en streaming broadcast, développement mobile Flutter/NDI, ou consulting infrastructure réseau. 
                Je travaille à <span style={{ color: "var(--accent-orange)", fontWeight: 600 }}>Echorouk TV</span> et suis ouvert à des missions complémentaires.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href="https://wa.me/213770945042?text=Bonjour%20Mohamed%20Amine,%20je%20viens%20depuis%20ton%20portfolio" id="contact-whatsapp"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary" style={{ justifyContent: "flex-start", width: "fit-content", background: "var(--gradient-cyan)", color: "#000" }}>
                  <MessageCircle size={15} />
                  WhatsApp : +213 770 94 50 42
                </a>
                <a href="mailto:djenadimohamedamine@gmail.com" id="contact-email"
                  className="btn btn-outline" style={{ justifyContent: "flex-start", width: "fit-content" }}>
                  <Mail size={15} color="var(--accent-purple)" />
                  djenadimohamedamine@gmail.com
                </a>
                <a href="https://github.com/djenadimohamedamine-code" id="contact-github"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline" style={{ justifyContent: "flex-start", width: "fit-content" }}>
                  <Github size={15} />
                  github.com/djenadimohamedamine-code
                  <ExternalLink size={11} style={{ opacity: 0.5 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.25rem 0", textAlign: "center", color: "var(--text-muted)", fontSize: "0.78rem", position: "relative", zIndex: 1 }}>
        <div className="container">
          <Coffee size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          MIMO-NDI · Djenadi Mohamed Amine · Echorouk TV · {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}