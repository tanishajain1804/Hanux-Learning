import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const UiUxDesignSystemsPage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your UI/UX Design Systems services for my project...");
  const [submitted, setSubmitted] = useState(false);
  const [isFloatCtaVisible, setIsFloatCtaVisible] = useState(false);

  const [cyclingWordIdx, setCyclingWordIdx] = useState(0);
  const [cyclingWordOpacity, setCyclingWordOpacity] = useState(1);
  const words = ["convert visitors", "delight users", "build trust", "drive growth", "reduce churn"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCyclingWordOpacity(0);
      setTimeout(() => {
        setCyclingWordIdx((prev) => (prev + 1) % words.length);
        setCyclingWordOpacity(1);
      }, 320);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveStep(0);

    const handleScroll = () => {
      setIsFloatCtaVisible(window.scrollY > 400);

      const progressBar = document.getElementById("progressBar");
      if (progressBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        progressBar.style.width = pct + "%";
      }

      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementVisible = 150;
        if (rect.top < window.innerHeight - elementVisible) {
          el.classList.add("revealed");
        }
      });

      // Scroll-linked process steps with sticky pinning
      const track = document.getElementById("process-track");
      if (track) {
        const rect = track.getBoundingClientRect();
        
        // On mobile/tablet, do standard viewport position mapping
        if (window.innerWidth <= 768) {
          const elementHeight = rect.height;
          const elementTop = rect.top;
          const viewportCenter = window.innerHeight / 2;
          const elementCenter = elementTop + elementHeight / 2;
          const startPoint = viewportCenter + elementHeight / 2;
          const endPoint = viewportCenter - elementHeight / 2;
          
          let progress = (startPoint - elementCenter) / (startPoint - endPoint);
          progress = Math.max(0, Math.min(0.999, progress));
          
          const step = Math.floor(progress * 4);
          setActiveStep(step);
          return;
        }

        // On desktop, do sticky scroll pinning progress mapping
        if (window.innerWidth > 768) {
          const scrolled = -rect.top;
          const totalScrollTrack = rect.height - window.innerHeight;
          let progress = 0;
          if (scrolled > 0 && totalScrollTrack > 0) {
            progress = scrolled / totalScrollTrack;
          }
          progress = Math.max(0, Math.min(0.999, progress));
          const step = Math.floor(progress * 4);
          setActiveStep(Math.min(3, step));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleStepClick = (idx: number) => {
    const track = document.getElementById("process-track");
    if (track) {
      const rect = track.getBoundingClientRect();
      const elementAbsoluteTop = rect.top + window.scrollY;
      
      if (window.innerWidth <= 768) {
        // Mobile fallback
        const progress = (idx + 0.5) / 4;
        const targetScrollY = elementAbsoluteTop - window.innerHeight / 2 + progress * rect.height;
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth"
        });
        return;
      }

      // Desktop sticky scroll mapping
      const progress = (idx + 0.5) / 4;
      const targetScrollY = elementAbsoluteTop + progress * (rect.height - window.innerHeight);
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);

    try {
      await fetch(`http://${window.location.hostname}:5000/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          serviceName: "UI/UX Design Systems",
          projectDetails: projectText
        })
      });
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    }

    setName("");
    setEmail("");
    setProjectText("");
    setTimeout(() => {
      setSubmitted(false);
      setProjectText("Hi, I'm interested in discussing your UI/UX Design Systems services for my project...");
    }, 4000);
  };

  return (
    <div className="service-detail-page">
      <div className="page-progress">
        <div className="page-progress-bar" id="progressBar" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-left">
          <a href="/services" className="back-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back to Services
          </a>

          <div className="service-eyebrow">
            <div className="eyebrow-icon pulse">🎨</div>
            UI/UX Design Systems
          </div>

          <h1 className="hero-title">
            Design Interfaces that <br />
            <em>Convert Users</em>
          </h1>
          
          <p className="hero-desc">
            We build comprehensive, scalable design systems in Figma and translate them into reusable UI component libraries. Rigorous user research, wireframing, and WCAG accessibility standards.
          </p>

          <div className="hero-actions">
            <button 
              onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button 
              onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
            >
              See How We Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-num">4–<span>10</span>wks</div>
              <div className="hstat-lbl">Avg. Delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>WCAG AA</span></div>
              <div className="hstat-lbl">Compliance</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>+35%</span></div>
              <div className="hstat-lbl">Conversion Rate</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene">
            {/* Ambient glows */}
            <div className="glow" style={{ width: "320px", height: "320px", background: "#D4537E", opacity: 0.08, top: "-120px", right: "-80px", filter: "blur(80px)" }} />
            <div className="glow" style={{ width: "260px", height: "260px", background: "#534AB7", opacity: 0.08, bottom: "-80px", left: "-60px", filter: "blur(70px)" }} />
            <div className="glow" style={{ width: "180px", height: "180px", background: "#1D9E75", opacity: 0.06, top: "40%", left: "40%", filter: "blur(60px)" }} />

            {/* HEADER */}
            <div style={{ textAlign: "center", marginBottom: "20px", animation: "v4FadeUp .6s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,83,126,.12)", border: "0.5px solid rgba(212,83,126,.35)", borderRadius: "20px", padding: "5px 14px", marginBottom: "10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4537E", display: "inline-block", animation: "v4Pulse 1.4s infinite" }} />
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#D4537E", letterSpacing: ".1em", textTransform: "uppercase" }}>UI/UX Design Studio</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#e5e7eb", lineHeight: 1.15 }}>
                We design interfaces that<br />
                <span style={{ color: "#D4537E", transition: "opacity .3s", opacity: cyclingWordOpacity }}>{words[cyclingWordIdx]}</span>
                <span style={{ width: "2px", height: "24px", background: "#D4537E", display: "inline-block", verticalAlign: "middle", marginLeft: "2px", animation: "v4CursorBlink .9s infinite", borderRadius: "1px" }} />
              </div>
            </div>

            {/* MAIN 3-COL LAYOUT */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: "10px", maxWidth: "560px", margin: "0 auto 16px" }}>

              {/* COL 1: Design process flow */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="card" style={{ padding: "10px 12px", animation: "v4SlideRight .5s .1s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "8px" }}>Design process</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(83,74,183,.25)", border: "0.5px solid #534AB7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px" }}>🔍</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "8px", fontWeight: 600, color: "#AFA9EC" }}>Research</div>
                        <div style={{ height: "3px", background: "#111827", borderRadius: "2px", marginTop: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#534AB7", borderRadius: "2px", animation: "v4FillBar 1s .3s ease both", width: "100%", ["--w" as any]: "100%" }} />
                        </div>
                      </div>
                      <span style={{ fontSize: "7px", color: "#534AB7", fontWeight: 600 }}>✓</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(212,83,126,.25)", border: "0.5px solid #D4537E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px" }}>✏️</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "8px", fontWeight: 600, color: "#ED93B1" }}>Wireframe</div>
                        <div style={{ height: "3px", background: "#111827", borderRadius: "2px", marginTop: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#D4537E", borderRadius: "2px", animation: "v4FillBar 1s .5s ease both", width: "100%", ["--w" as any]: "100%" }} />
                        </div>
                      </div>
                      <span style={{ fontSize: "7px", color: "#D4537E", fontWeight: 600 }}>✓</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(55,138,221,.25)", border: "0.5px solid #378ADD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px" }}>🎨</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "8px", fontWeight: 600, color: "#85B7EB" }}>Visual design</div>
                        <div style={{ height: "3px", background: "#111827", borderRadius: "2px", marginTop: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#378ADD", borderRadius: "2px", animation: "v4FillBar 1s .7s ease both", width: "100%", ["--w" as any]: "100%" }} />
                        </div>
                      </div>
                      <span style={{ fontSize: "7px", color: "#378ADD", fontWeight: 600 }}>✓</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(29,158,117,.25)", border: "0.5px solid #1D9E75", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px" }}>🚀</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "8px", fontWeight: 600, color: "#9FE1CB" }}>Handoff</div>
                        <div style={{ height: "3px", background: "#111827", borderRadius: "2px", marginTop: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "#1D9E75", borderRadius: "2px", animation: "v4FillBar 1s .9s ease both, v4Pulse 1.2s 2s infinite", width: "65%", ["--w" as any]: "65%" }} />
                        </div>
                      </div>
                      <span style={{ fontSize: "7px", color: "#EF9F27", fontWeight: 600, animation: "v4CursorBlink 1s infinite" }}>live</span>
                    </div>
                  </div>
                </div>

                {/* Colour palette */}
                <div className="card" style={{ padding: "10px 12px", animation: "v4SlideRight .5s .2s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "7px" }}>Colour system</div>
                  <div style={{ display: "flex", gap: "5px", marginBottom: "7px" }}>
                    <div style={{ flex: 1, height: "28px", borderRadius: "5px", background: "#534AB7", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.15)", animation: "v4Shimmer 2.5s .5s infinite", width: "40%" }} />
                    </div>
                    <div style={{ flex: 1, height: "28px", borderRadius: "5px", background: "#D4537E", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.15)", animation: "v4Shimmer 2.5s .8s infinite", width: "40%" }} />
                    </div>
                    <div style={{ flex: 1, height: "28px", borderRadius: "5px", background: "#1D9E75", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.15)", animation: "v4Shimmer 2.5s 1.1s infinite", width: "40%" }} />
                    </div>
                    <div style={{ flex: 1, height: "28px", borderRadius: "5px", background: "#378ADD" }} />
                    <div style={{ flex: 1, height: "28px", borderRadius: "5px", background: "#EF9F27" }} />
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <div style={{ background: "#534AB7", borderRadius: "5px", padding: "3px 7px", fontSize: "7px", color: "#EEEDFE", fontWeight: 600 }}>Primary</div>
                    <div style={{ border: "0.5px solid #534AB7", borderRadius: "5px", padding: "3px 7px", fontSize: "7px", color: "#AFA9EC" }}>Ghost</div>
                    <div style={{ background: "#1a1f2e", borderRadius: "5px", padding: "3px 7px", fontSize: "7px", color: "#6b7280" }}>Muted</div>
                  </div>
                </div>

                {/* Typography scale */}
                <div className="card" style={{ padding: "10px 12px", animation: "v4SlideRight .5s .3s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "7px" }}>Typography</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#e5e7eb", lineHeight: 1.1 }}>Heading / 700</div>
                    <div style={{ fontSize: "10px", fontWeight: 500, color: "#9ca3af", lineHeight: 1.2 }}>Subhead / 500</div>
                    <div style={{ fontSize: "8px", fontWeight: 400, color: "#6b7280", lineHeight: 1.4 }}>Body copy — clean and readable at any size.</div>
                    <div style={{ fontSize: "7px", fontWeight: 400, color: "#4b5563", letterSpacing: ".08em", textTransform: "uppercase" }}>LABEL / CAPTION</div>
                  </div>
                </div>
              </div>

              {/* COL 2: Animated phone mockup (centre hero) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "v4SwoopIn .7s .1s ease both", opacity: 0 }}>
                {/* Phone */}
                <div style={{ background: "#1a1f2e", border: "1.5px solid #2a3050", borderRadius: "28px", width: "148px", height: "295px", overflow: "hidden", animation: "v4FloatUp 4.5s 1s ease-in-out infinite", position: "relative", flexShrink: 0, boxShadow: "0 0 0 1px #111827" }}>
                  {/* Notch */}
                  <div style={{ width: "55px", height: "10px", background: "#0d1117", borderRadius: "0 0 8px 8px", margin: "0 auto" }} />
                  <div style={{ padding: "10px 9px", height: "calc(100% - 10px)", display: "flex", flexDirection: "column", gap: "7px" }}>
                    {/* App header bar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ fontSize: "9px", fontWeight: 700, color: "#e5e7eb" }}>Dashboard</div>
                      <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✦</div>
                    </div>
                    {/* Hero stat card */}
                    <div style={{ background: "linear-gradient(135deg,#1a0d18,#2a1028)", border: "0.5px solid #D4537E", borderRadius: "10px", padding: "9px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", right: "-8px", top: "-8px", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(212,83,126,.2)", animation: "v4RotateSlow 8s linear infinite" }} />
                      <div style={{ fontSize: "7px", color: "#ED93B1", marginBottom: "3px", fontWeight: 500 }}>Conversion rate</div>
                      <div style={{ fontSize: "22px", fontWeight: 700, color: "#D4537E", lineHeight: 1 }}>5.8%</div>
                      <div style={{ fontSize: "7px", color: "#1D9E75", marginTop: "2px" }}>↑ +38% after redesign</div>
                    </div>
                    {/* Mini graph */}
                    <div style={{ background: "#111827", borderRadius: "8px", padding: "7px" }}>
                      <div style={{ fontSize: "7px", color: "#6b7280", marginBottom: "4px" }}>User satisfaction</div>
                      <svg viewBox="0 0 120 40" width="100%" style={{ display: "block" }}>
                        <defs>
                          <linearGradient id="phg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D4537E" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#D4537E" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <path d="M0,38 Q20,32 40,24 Q60,14 80,8 Q100,4 120,2" fill="none" stroke="#D4537E" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" style={{ animation: "v4DrawLine 1.8s .8s ease forwards" }} />
                        <path d="M0,38 Q20,32 40,24 Q60,14 80,8 Q100,4 120,2 L120,40 L0,40Z" fill="url(#phg)" style={{ opacity: 0, animation: "v4FadeUp .4s 2.4s ease forwards" }} />
                        <circle cx={120} cy={2} r={3} fill="#D4537E" style={{ animation: "v4Pulse 1.3s infinite" }} />
                      </svg>
                    </div>
                    {/* Component row */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      {/* Input field mockup */}
                      <div style={{ background: "#111827", border: "0.5px solid #534AB7", borderRadius: "6px", padding: "5px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ fontSize: "8px", color: "#6b7280", flex: 1 }}>Search anything…</div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#534AB7", opacity: 0.6 }} />
                      </div>
                      {/* Button */}
                      <div style={{ background: "#D4537E", borderRadius: "6px", padding: "6px", textAlign: "center" }}>
                        <div style={{ fontSize: "8px", fontWeight: 700, color: "#fff" }}>Get started →</div>
                      </div>
                      {/* Tabs */}
                      <div style={{ display: "flex", gap: "3px" }}>
                        <div style={{ flex: 1, background: "#534AB7", borderRadius: "4px", padding: "3px", textAlign: "center", fontSize: "6px", color: "#EEEDFE", fontWeight: 600 }}>Overview</div>
                        <div style={{ flex: 1, background: "#1a1f2e", borderRadius: "4px", padding: "3px", textAlign: "center", fontSize: "6px", color: "#6b7280" }}>Reports</div>
                        <div style={{ flex: 1, background: "#1a1f2e", borderRadius: "4px", padding: "3px", textAlign: "center", fontSize: "6px", color: "#6b7280" }}>Settings</div>
                      </div>
                    </div>
                    {/* Avatar / user row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "auto" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB7", border: "1.5px solid #0d1117", marginRight: "-5px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#EEEDFE", fontWeight: 600 }}>A</div>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#D4537E", border: "1.5px solid #0d1117", marginRight: "-5px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#FBEAF0", fontWeight: 600 }}>R</div>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#1D9E75", border: "1.5px solid #0d1117", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#E1F5EE", fontWeight: 600 }}>P</div>
                      </div>
                      <div style={{ fontSize: "7px", color: "#6b7280" }}>+142 active</div>
                      <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#1D9E75", animation: "v4Pulse 1.2s infinite" }} />
                    </div>
                  </div>
                </div>

                {/* Figma badge below phone */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#1a1f2e", border: "0.5px solid #2a3050", borderRadius: "20px", padding: "5px 12px", fontSize: "9px", color: "#9ca3af" }}>
                  <span style={{ fontSize: "11px" }}>✦</span> Figma → Production
                </div>
              </div>

              {/* COL 3: Stats + UX scores */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Big stat cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", animation: "v4SlideLeft .5s .1s ease both", opacity: 0 }}>
                  <div style={{ background: "linear-gradient(135deg,#1a0d18,#1a1f2e)", border: "0.5px solid #D4537E", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#D4537E", animation: "v4FloatUp 3s ease-in-out infinite" }}>+38%</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginTop: "2px" }}>Conversion</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg,#0f2920,#1a1f2e)", border: "0.5px solid #1D9E75", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1D9E75", animation: "v4FloatUp 3.5s .4s ease-in-out infinite" }}>94%</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginTop: "2px" }}>Satisfaction</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg,#17102a,#1a1f2e)", border: "0.5px solid #534AB7", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#534AB7", animation: "v4FloatUp 4s .2s ease-in-out infinite" }}>100</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginTop: "2px" }}>Accessibility</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg,#0a1827,#1a1f2e)", border: "0.5px solid #378ADD", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#378ADD", animation: "v4FloatUp 3.2s .6s ease-in-out infinite" }}>96</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginTop: "2px" }}>Usability</div>
                  </div>
                </div>

                {/* Before / after */}
                <div className="card" style={{ animation: "v4SlideLeft .5s .2s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "8px" }}>Before vs after</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "5px" }}>
                    <div style={{ flex: 1, textAlign: "center", padding: "7px", background: "#111827", borderRadius: "6px 0 0 6px", border: "0.5px solid #2a3050" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", textDecoration: "line-through" }}>2.1%</div>
                      <div style={{ fontSize: "7px", color: "#4b5563", marginTop: "2px" }}>Old CVR</div>
                    </div>
                    <div style={{ width: "28px", height: "28px", background: "#D4537E", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#fff", fontWeight: 700, flexShrink: 0, zIndex: 1, margin: "0 -2px" }}>→</div>
                    <div style={{ flex: 1, textAlign: "center", padding: "7px", background: "rgba(212,83,126,.12)", borderRadius: "0 6px 6px 0", border: "0.5px solid #D4537E" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#D4537E" }}>5.8%</div>
                      <div style={{ fontSize: "7px", color: "#ED93B1", marginTop: "2px" }}>New CVR</div>
                    </div>
                  </div>
                  <div style={{ height: "5px", background: "#111827", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg,#534AB7,#D4537E)", borderRadius: "3px", animation: "v4FillBar 1.6s .5s ease both", width: "80%", ["--w" as any]: "80%" }} />
                  </div>
                  <div style={{ fontSize: "8px", color: "#1D9E75", marginTop: "4px", fontWeight: 500 }}>↑ 2.76× improvement</div>
                </div>

                {/* Responsive check */}
                <div className="card" style={{ padding: "10px 12px", animation: "v4SlideLeft .5s .3s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "8px" }}>Responsive delivery</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "7px", justifyContent: "center" }}>
                    {/* Desktop */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                      <div style={{ width: "42px", height: "28px", background: "#111827", border: "0.5px solid #534AB7", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "30px", height: "14px", background: "#1a1f2e", borderRadius: "2px" }} />
                      </div>
                      <div style={{ width: "8px", height: "3px", background: "#2a3050", borderRadius: "1px" }} />
                      <div style={{ width: "18px", height: "2px", background: "#2a3050", borderRadius: "1px" }} />
                      <div style={{ fontSize: "6px", color: "#534AB7", fontWeight: 600 }}>Desktop</div>
                    </div>
                    {/* Tablet */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                      <div style={{ width: "28px", height: "36px", background: "#111827", border: "0.5px solid #D4537E", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "18px", height: "22px", background: "#1a1f2e", borderRadius: "2px" }} />
                      </div>
                      <div style={{ fontSize: "6px", color: "#D4537E", fontWeight: 600 }}>Tablet</div>
                    </div>
                    {/* Mobile */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                      <div style={{ width: "18px", height: "30px", background: "#111827", border: "0.5px solid #1D9E75", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "12px", height: "20px", background: "#1a1f2e", borderRadius: "2px" }} />
                      </div>
                      <div style={{ fontSize: "6px", color: "#1D9E75", fontWeight: 600 }}>Mobile</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "6px" }}>
                    <span style={{ fontSize: "8px", color: "#6b7280" }}>All screens. </span><span style={{ fontSize: "8px", color: "#1D9E75", fontWeight: 600 }}>Always perfect.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SCROLLING TOOL MARQUEE */}
            <div style={{ overflow: "hidden", maxWidth: "560px", margin: "0 auto 14px", maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
              <div style={{ display: "flex", gap: "8px", width: "max-content", animation: "v4MarqueePan 12s linear infinite" }}>
                <div className="chip" style={{ color: "#AFA9EC", flexShrink: 0 }}>✦ Figma</div>
                <div className="chip" style={{ color: "#9FE1CB", flexShrink: 0 }}>✦ Framer</div>
                <div className="chip" style={{ color: "#85B7EB", flexShrink: 0 }}>✦ Prototyping</div>
                <div className="chip" style={{ color: "#ED93B1", flexShrink: 0 }}>✦ Design systems</div>
                <div className="chip" style={{ color: "#FAC775", flexShrink: 0 }}>✦ A/B testing</div>
                <div className="chip" style={{ color: "#9FE1CB", flexShrink: 0 }}>✦ WCAG AA</div>
                <div className="chip" style={{ color: "#AFA9EC", flexShrink: 0 }}>✦ User research</div>
                <div className="chip" style={{ color: "#85B7EB", flexShrink: 0 }}>✦ Motion design</div>
                <div className="chip" style={{ color: "#AFA9EC", flexShrink: 0 }}>✦ Figma</div>
                <div className="chip" style={{ color: "#9FE1CB", flexShrink: 0 }}>✦ Framer</div>
                <div className="chip" style={{ color: "#85B7EB", flexShrink: 0 }}>✦ Prototyping</div>
                <div className="chip" style={{ color: "#ED93B1", flexShrink: 0 }}>✦ Design systems</div>
                <div className="chip" style={{ color: "#FAC775", flexShrink: 0 }}>✦ A/B testing</div>
                <div className="chip" style={{ color: "#9FE1CB", flexShrink: 0 }}>✦ WCAG AA</div>
                <div className="chip" style={{ color: "#AFA9EC", flexShrink: 0 }}>✦ User research</div>
                <div className="chip" style={{ color: "#85B7EB", flexShrink: 0 }}>✦ Motion design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META BAND */}
      <div className="meta-band">
        <div className="meta-cards">
          <div className="meta-card reveal reveal-delay-1">
            <div className="meta-icon">⏱️</div>
            <div>
              <div className="meta-label">Avg. Delivery Time</div>
              <div className="meta-value">4 - 10 Weeks</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-2">
            <div className="meta-icon">🏗️</div>
            <div>
              <div className="meta-label">Design Platforms</div>
              <div className="meta-value">Figma, Adobe Creative Suite</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Accessibility target</div>
              <div className="meta-value">WCAG 2.1 AA Compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="process-sticky-track" id="process-track">
        <section className="process-section" id="process">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">How We Work</div>
            <h2 className="section-title">From Idea to <em>Live Product</em></h2>
            <p className="section-sub">A proven 4-phase delivery model that keeps you in control at every sprint.</p>
          </div>

          <div className="process-grid">
            <div className="process-steps-aligned">
              <div className={`pstep ${activeStep === 0 ? "active" : ""}`} onClick={() => handleStepClick(0)}>
                <div className="pstep-num">1</div>
                <div className="pstep-body">
                  <div className="pstep-title">User Persona Research</div>
                  <div className="pstep-desc">Interviewing customers, analyzing competitor websites, and drafting user journey empathy maps.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">Component Architecture</div>
                  <div className="pstep-desc">Setting up color, spacing, typography tokens, and primary buttons/inputs in Figma.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">High-Fidelity UI Drafting</div>
                  <div className="pstep-desc">Designing full desktop and mobile views, testing dark/light modes, and mapping interactions.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Developer Handoff Prep</div>
                  <div className="pstep-desc">Writing layout documentation, exporting assets, and aligning with developers on theme files.</div>
                </div>
              </div>
            </div>

            <div className="process-panel-aligned">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">User Persona Research</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We research your target users, conduct competitor UX tear-downs, write user personas, and map navigation journeys.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">User Interviews</span>
                  <span className="panel-tag">Empathy Mapping</span>
                  <span className="panel-tag">Competitor Review</span>
                  <span className="panel-tag">Navigation Audits</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">User Persona Report</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Journey Flowsheets</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 1 ? "show" : ""}`}>
                <div className="panel-icon">🎨</div>
                <div className="panel-title">Component Architecture</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Designing primary components like inputs, buttons, and nav shells, and setting up token variables in Figma.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Figma Variables</span>
                  <span className="panel-tag">Component Library</span>
                  <span className="panel-tag">Button States</span>
                  <span className="panel-tag">Typography System</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Primary UI Kit</span>
                      <span className="pp-pct">85%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "85%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Token Configuration</span>
                      <span className="pp-pct">75%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "75%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 2 ? "show" : ""}`}>
                <div className="panel-icon">⚡</div>
                <div className="panel-title">High-Fidelity UI Drafting</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Drafting complete desktop, tablet, and mobile views, testing dark/light configurations, and creating clickable user testing prototypes.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Hi-Fi Prototypes</span>
                  <span className="panel-tag">Dark Mode design</span>
                  <span className="panel-tag">Responsive grids</span>
                  <span className="panel-tag">Interactive Figma</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Screen layouts</span>
                      <span className="pp-pct">65%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "65%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Prototype Links</span>
                      <span className="pp-pct">60%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "60%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 3 ? "show" : ""}`}>
                <div className="panel-icon">🚀</div>
                <div className="panel-title">Developer Handoff Prep</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Writing component specs, exporting SVG vectors, and auditing UI design tokens alongside engineers.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Zeplin/Figma handoff</span>
                  <span className="panel-tag">Asset Exports</span>
                  <span className="panel-tag">Storybook Audits</span>
                  <span className="panel-tag">Design QA check</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Token Handshake</span>
                      <span className="pp-pct">95%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "95%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Storybook Align</span>
                      <span className="pp-pct">90%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "90%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* CAPABILITIES */}
      <section className="caps-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">Capabilities</div>
            <h2 className="section-title">What We <em>Actually Build</em></h2>
          </div>
          <div className="caps-grid">
            <div className="cap-list">
              <div className="cap-item reveal">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Figma Component Libraries</div>
                  <div className="cap-desc">Clean, robust design files that let your in-house teams build new pages in minutes while staying on-brand.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">User Testing Feedback</div>
                  <div className="cap-desc">Interactive prototypes shared with real users to measure friction points and refine layout layouts.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Design System Tokens</div>
                  <div className="cap-desc">Centralized configuration variables (colors, borders, typography) that match direct CSS files.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">WCAG Accessibility Audit</div>
                  <div className="cap-desc">Ensuring proper contrast, keyboard navigation guidelines, and readable hierarchies for all users.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Interactive Micro-Animations</div>
                  <div className="cap-desc">Designing elegant hover and transition states that make digital products feel alive and premium.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">Figma</span>
                <span className="tech-pill hot">Adobe Illustrator</span>
                <span className="tech-pill hot">Storybook</span>
                <span className="tech-pill hot">TailwindCSS</span>
                <span className="tech-pill">Miro</span>
                <span className="tech-pill">Prototyping</span>
                <span className="tech-pill">UserTesting</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">CSS</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">User Research</span>
                  <span className="tl-week">Wk 1–2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Component Design</span>
                  <span className="tl-week">Wk 2–4</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">UI Drafting</span>
                  <span className="tl-week">Wk 4–8</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Accessibility Audit</span>
                  <span className="tl-week">Wk 8–9</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Developer Handoff</span>
                  <span className="tl-week">Wk 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS SPOTLIGHT */}
      <section className="spotlight-section">
        <div className="spotlight-inner">
          <div className="spotlight-badge reveal">⭐ Success Spotlight</div>
          <h2 className="spotlight-title reveal">
            SaaS Dashboard <em>Redesign Overhaul</em>
          </h2>
          <p className="spotlight-desc reveal">
            Redesigned a cluttered SaaS data reporting dashboard, consolidating features into clean tabs and implementing a standardized component library. Feedback showed a 35% jump in daily user activation and reduced onboarding time.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num"><span className="accent">+</span>35%</div>
              <div className="result-desc">Daily User Activation — driven by significantly simplified interface layouts</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">User Onboarding</div>
              <div className="result-num"><span className="accent">−</span>50%</div>
              <div className="result-desc">Onboarding time reduced for new enterprise clients</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Tech Handoff</div>
              <div className="result-num">1<span className="accent"> Click</span></div>
              <div className="result-desc">Auto-synced Figma-to-React tokens cut dev compilation times</div>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="form-section" id="inquiry">
        <div className="section-inner">
          <div className="form-inner">
            <div className="form-card reveal">
              <div className="form-eyebrow">Service Inquiry</div>
              <div className="form-title">Kickstart Your UI/UX Design Systems Project</div>
              <p className="form-sub">
                Tell us about your requirements below. Our design architects and lead engineers will review and send you a technical roadmap within 24 hours.
              </p>

              {submitted ? (
                <div 
                  className="p-5 text-[#059669] rounded-2xl flex items-center justify-center gap-3 animate-scale-up"
                  style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                >
                  <span className="text-sm font-bold">✅ Request Sent! We will contact you within 24 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        required 
                        placeholder="E.g., John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Work Email</label>
                      <input 
                        className="form-input" 
                        type="email" 
                        required 
                        placeholder="E.g., john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Details</label>
                    <textarea 
                      className="form-input" 
                      required
                      placeholder="Hi, I'm interested in discussing your UI/UX Design Systems services for my project..."
                      value={projectText}
                      onChange={(e) => setProjectText(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="form-submit">
                    Submit Project Brief
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-left">
          <div className="foot-logo">HANUX<span>TECH</span></div>
          <div className="foot-copy">© 2026 HanuxTech. All rights reserved.</div>
        </div>
        <div className="foot-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <button 
        className={`float-cta ${isFloatCtaVisible ? "visible" : ""}`}
        onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
      >
        🚀 Start Your Project
      </button>
    </div>
  );
};

export default UiUxDesignSystemsPage;
