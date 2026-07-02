import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const WebDevelopmentPage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your Full-Stack Web Development services for my project...");
  const [submitted, setSubmitted] = useState(false);
  const [isFloatCtaVisible, setIsFloatCtaVisible] = useState(false);

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

      // Scroll-linked process steps
      const track = document.getElementById("process-track");
      if (track) {
        const rect = track.getBoundingClientRect();
        
        if (window.innerWidth > 768) {
          // Desktop: sticky pin scroll mapping
          const scrolled = -rect.top;
          const totalScrollTrack = rect.height - window.innerHeight;
          let progress = 0;
          if (scrolled > 0 && totalScrollTrack > 0) {
            progress = scrolled / totalScrollTrack;
          }
          progress = Math.max(0, Math.min(0.999, progress));
          const step = Math.floor(progress * 4);
          setActiveStep(Math.min(3, step));
        } else {
          // Mobile: standard scroll tracking
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
      
      let targetScrollY = 0;
      if (window.innerWidth > 768) {
        const totalScrollTrack = rect.height - window.innerHeight;
        const progress = (idx + 0.5) / 4;
        targetScrollY = elementAbsoluteTop + progress * totalScrollTrack;
      } else {
        const progress = (idx + 0.5) / 4;
        targetScrollY = elementAbsoluteTop - window.innerHeight / 2 + progress * rect.height;
      }
      
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
          serviceName: "Full-Stack Web Development",
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
      setProjectText("Hi, I'm interested in discussing your Full-Stack Web Development services for my project...");
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
            <div className="eyebrow-icon pulse">🌐</div>
            Full-Stack Web Development
          </div>

          <h1 className="hero-title">
            Build Platforms <br />
            <em>Scale to Millions</em>
          </h1>
          
          <p className="hero-desc">
            We design and build secure, fast, and responsive web platforms. From React + Next.js frontends to NestJS and Python APIs — engineered for Core Web Vitals, SEO, and zero-downtime at scale.
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
              <div className="hstat-num">6–<span>12</span>wks</div>
              <div className="hstat-lbl">Avg. Delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>98%</span></div>
              <div className="hstat-lbl">Client Satisfaction</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>50+</span></div>
              <div className="hstat-lbl">Projects Shipped</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene" style={{ minHeight: "380px" }}>
            <div className="glow" style={{ width: "320px", height: "320px", background: "#378ADD", opacity: 0.1, top: "-100px", right: "-80px", filter: "blur(70px)" }} />
            <div className="glow" style={{ width: "220px", height: "220px", background: "#534AB7", opacity: 0.1, bottom: "-70px", left: "-60px", filter: "blur(60px)" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "500px", margin: "0 auto" }}>
              {/* LEFT: Animated code terminal */}
              <div>
                <div style={{ background: "#111827", borderRadius: "12px", overflow: "hidden", border: "0.5px solid #2a3050" }}>
                  <div style={{ background: "#1a1f2e", padding: "8px 12px", display: "flex", alignItems: "center", gap: "6px", borderBottom: "0.5px solid #2a3050" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E24B4A" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EF9F27" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1D9E75" }} />
                    <span style={{ fontSize: "9px", color: "#6b7280", marginLeft: "4px", fontFamily: "monospace" }}>index.tsx</span>
                  </div>
                  <div style={{ padding: "12px", fontFamily: "monospace", fontSize: "9px", lineHeight: "1.7", minHeight: "140px" }}>
                    <div style={{ color: "#6b7280" }}>{"// HanuxTech — blazing fast"}</div>
                    <div><span style={{ color: "#7F77DD" }}>const</span> <span style={{ color: "#e5e7eb" }}>site</span> <span style={{ color: "#1D9E75" }}>=</span> <span style={{ color: "#378ADD" }}>{"{"}</span></div>
                    <div style={{ paddingLeft: "10px" }}><span style={{ color: "#9FE1CB" }}>speed</span><span style={{ color: "#6b7280" }}>:</span> <span style={{ color: "#EF9F27" }}>'98ms'</span><span style={{ color: "#6b7280" }}>,</span></div>
                    <div style={{ paddingLeft: "10px" }}><span style={{ color: "#9FE1CB" }}>seo</span><span style={{ color: "#6b7280" }}>:</span> <span style={{ color: "#EF9F27" }}>'100'</span><span style={{ color: "#6b7280" }}>,</span></div>
                    <div style={{ paddingLeft: "10px" }}><span style={{ color: "#9FE1CB" }}>uptime</span><span style={{ color: "#6b7280" }}>:</span> <span style={{ color: "#EF9F27" }}>'99.99%'</span><span style={{ color: "#6b7280" }}>,</span></div>
                    <div style={{ paddingLeft: "10px" }}><span style={{ color: "#9FE1CB" }}>users</span><span style={{ color: "#6b7280" }}>:</span> <span style={{ color: "#E24B4A" }}>growing</span><span style={{ color: "#6b7280" }}>,</span></div>
                    <div><span style={{ color: "#378ADD" }}>{"}"}</span></div>
                    <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "3px" }}>
                      <span style={{ color: "#1D9E75" }}>✓</span>
                      <span style={{ color: "#6b7280" }}>Build complete in </span>
                      <span style={{ color: "#1D9E75" }}>1.2s</span>
                      <span id="wc" style={{ width: "8px", height: "13px", background: "#378ADD", display: "inline-block", animation: "v3CursorBlink .9s infinite", borderRadius: "1px", marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>

                {/* Animated live URL bar */}
                <div style={{ background: "#1a1f2e", border: "0.5px solid #2a3050", borderRadius: "10px", padding: "10px 12px", marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0, animation: "v3Pulse 1.4s infinite" }} />
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#6b7280", overflow: "hidden", whiteSpace: "nowrap", flex: 1 }}>
                    <span style={{ color: "#378ADD" }}>https://</span><span style={{ color: "#1D9E75", overflow: "hidden", display: "inline-block", animation: "v3TypeLoop 4s 1s infinite", whiteSpace: "nowrap", verticalAlign: "bottom" }}>your-brand.com</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#1D9E75", fontWeight: 600, flexShrink: 0 }}>LIVE</div>
                </div>
              </div>

              {/* RIGHT: Scores + perf graph */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Big score cards row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px" }}>
                  <div style={{ background: "linear-gradient(135deg,#0f2920,#1a1f2e)", border: "0.5px solid #1D9E75", borderRadius: "10px", padding: "8px 5px", textAlign: "center", animation: "v3SlideUp .5s .1s ease both", opacity: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#1D9E75", animation: "v3BounceNum 2s .5s ease-in-out infinite" }}>98</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", fontWeight: 500 }}>Speed</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg,#0a1827,#1a1f2e)", border: "0.5px solid #378ADD", borderRadius: "10px", padding: "8px 5px", textAlign: "center", animation: "v3SlideUp .5s .2s ease both", opacity: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#378ADD", animation: "v3BounceNum 2s .8s ease-in-out infinite" }}>100</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", fontWeight: 500 }}>SEO</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg,#17102a,#1a1f2e)", border: "0.5px solid #7F77DD", borderRadius: "10px", padding: "8px 5px", textAlign: "center", animation: "v3SlideUp .5s .3s ease both", opacity: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#7F77DD", animation: "v3BounceNum 2s 1.1s ease-in-out infinite" }}>96</div>
                    <div style={{ fontSize: "7px", color: "#6b7280", fontWeight: 500 }}>A11y</div>
                  </div>
                </div>

                {/* Perf graph */}
                <div className="c2" style={{ animation: "v3SlideUp .5s .35s ease both", opacity: 0, flex: 1 }}>
                  <div className="lbl" style={{ marginBottom: "6px" }}>Perf over time</div>
                  <svg viewBox="0 0 200 70" width="100%" style={{ display: "block" }}>
                    <defs>
                      <linearGradient id="wgg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#378ADD" stopOpacity=".3" />
                        <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,65 Q50,55 100,42 Q140,30 180,15 Q192,10 200,8" fill="none" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" strokeDasharray="600" strokeDashoffset="600" style={{ animation: "v3GraphDraw 2s .5s ease forwards" }} />
                    <path d="M0,65 Q50,55 100,42 Q140,30 180,15 Q192,10 200,8 L200,70 L0,70Z" fill="url(#wgg)" style={{ opacity: 0, animation: "v3SlideUp .3s 2.3s ease forwards" }} />
                    <circle cx="200" cy="8" r="4" fill="#378ADD" style={{ animation: "v3Pulse 1.3s infinite" }} />
                  </svg>
                </div>

                {/* CWV bars */}
                <div className="c2" style={{ animation: "v3SlideUp .5s .5s ease both", opacity: 0 }}>
                  <div className="lbl" style={{ marginBottom: "6px" }}>Core web vitals</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "9px", color: "#9ca3af", width: "28px" }}>LCP</span>
                      <div style={{ flex: 1, height: "6px", background: "#111827", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#1D9E75", borderRadius: "3px", width: "0%", ...({"--tw": "92%"} as React.CSSProperties), animation: "v3FillW 1.3s .7s ease both" }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#1D9E75", width: "30px", textAlign: "right" }}>1.2s</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "9px", color: "#9ca3af", width: "28px" }}>FID</span>
                      <div style={{ flex: 1, height: "6px", background: "#111827", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#378ADD", borderRadius: "3px", width: "0%", ...({"--tw": "80%"} as React.CSSProperties), animation: "v3FillW 1.3s .9s ease both" }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#378ADD", width: "30px", textAlign: "right" }}>8ms</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "9px", color: "#9ca3af", width: "28px" }}>CLS</span>
                      <div style={{ flex: 1, height: "6px", background: "#111827", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#7F77DD", borderRadius: "3px", width: "0%", ...({"--tw": "97%"} as React.CSSProperties), animation: "v3FillW 1.3s 1.1s ease both" }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#7F77DD", width: "30px", textAlign: "right" }}>0.01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated traffic bar at bottom */}
            <div style={{ maxWidth: "500px", margin: "10px auto 0" }}>
              <div className="c2" style={{ animation: "v3SlideUp .5s .6s ease both", opacity: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
                  <span className="lbl" style={{ margin: 0 }}>Live traffic</span>
                  <span style={{ fontSize: "9px", color: "#1D9E75", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1D9E75", display: "inline-block", animation: "v3Pulse 1.2s infinite" }} />
                    24.8K users online
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "36px" }}>
                  <div style={{ flex: 1, background: "#378ADD", borderRadius: "3px 3px 0 0", height: "40%", transformOrigin: "bottom", animation: "v3BarRise .5s .65s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#378ADD", borderRadius: "3px 3px 0 0", height: "60%", transformOrigin: "bottom", animation: "v3BarRise .5s .7s ease both", transform: "scaleY(0)", opacity: 0.85 }} />
                  <div style={{ flex: 1, background: "#378ADD", borderRadius: "3px 3px 0 0", height: "50%", transformOrigin: "bottom", animation: "v3BarRise .5s .75s ease both", transform: "scaleY(0)", opacity: 0.9 }} />
                  <div style={{ flex: 1, background: "#1D9E75", borderRadius: "3px 3px 0 0", height: "80%", transformOrigin: "bottom", animation: "v3BarRise .5s .8s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#1D9E75", borderRadius: "3px 3px 0 0", height: "95%", transformOrigin: "bottom", animation: "v3BarRise .5s .85s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#1D9E75", borderRadius: "3px 3px 0 0", height: "85%", transformOrigin: "bottom", animation: "v3BarRise .5s .9s ease both", transform: "scaleY(0)", opacity: 0.9 }} />
                  <div style={{ flex: 1, background: "#7F77DD", borderRadius: "3px 3px 0 0", height: "100%", transformOrigin: "bottom", animation: "v3BarRise .5s .95s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#7F77DD", borderRadius: "3px 3px 0 0", height: "90%", transformOrigin: "bottom", animation: "v3BarRise .5s 1s ease both", transform: "scaleY(0)", opacity: 0.9 }} />
                  <div style={{ flex: 1, background: "#7F77DD", borderRadius: "3px 3px 0 0", height: "100%", transformOrigin: "bottom", animation: "v3BarRise .5s 1.05s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#D85A30", borderRadius: "3px 3px 0 0", height: "95%", transformOrigin: "bottom", animation: "v3BarRise .5s 1.1s ease both", transform: "scaleY(0)" }} />
                  <div style={{ flex: 1, background: "#D85A30", borderRadius: "3px 3px 0 0", height: "100%", transformOrigin: "bottom", transform: "scaleY(0)", animation: "v3BarRise .5s 1.15s ease both, v3Pulse 2s 2s ease-in-out infinite" }} />
                  <div style={{ flex: 1, background: "#D85A30", borderRadius: "3px 3px 0 0", height: "88%", transformOrigin: "bottom", animation: "v3BarRise .5s 1.2s ease both", transform: "scaleY(0)" }} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="chip" style={{ color: "#85B7EB" }}>⚡ Sub-1s load</div>
              <div className="chip" style={{ color: "#9FE1CB" }}>📈 SEO 100</div>
              <div className="chip" style={{ color: "#AFA9EC" }}>📱 Responsive</div>
              <div className="chip" style={{ color: "#FAC775" }}>🛡 Secure</div>
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
              <div className="meta-value">6 – 12 Weeks</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-2">
            <div className="meta-icon">🏗️</div>
            <div>
              <div className="meta-label">Architecture</div>
              <div className="meta-value">JAMstack / Microservices</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Security Compliance</div>
              <div className="meta-value">OWASP Top 10 Standards</div>
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
                  <div className="pstep-title">Discovery & Architecture Scoping</div>
                  <div className="pstep-desc">Analyzing your requirements, mapping database schemas, and deciding on frontend/backend hosting frameworks.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">UI/UX Alignment & API Design</div>
                  <div className="pstep-desc">Designing high-fidelity screens in Figma and defining contract specifications for REST/GraphQL endpoints.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">Agile Development & Integrations</div>
                  <div className="pstep-desc">Iterative sprints implementing modular components, styling systems, web socket events, and third-party integrations.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Performance Audit & Launch</div>
                  <div className="pstep-desc">Rigorous testing, optimizing database indexes, assets bundling optimization, and deploying to Vercel/AWS.</div>
                </div>
              </div>
            </div>

            <div className="process-panel-aligned">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">Discovery & Architecture Scoping</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We run deep-dive workshops to surface hidden requirements, map your data model, and produce a system architecture diagram before a single line of code is written.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Requirements Workshop</span>
                  <span className="panel-tag">DB Schema Design</span>
                  <span className="panel-tag">Tech Stack Decision</span>
                  <span className="panel-tag">Risk Assessment</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Architecture Blueprint</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Stakeholder Sign-off</span>
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
                <div className="panel-title">UI/UX Alignment & API Design</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Our designers produce interactive Figma prototypes while engineers simultaneously define OpenAPI 3.0 contracts — so frontend and backend teams never block each other.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Figma Prototyping</span>
                  <span className="panel-tag">OpenAPI 3.0</span>
                  <span className="panel-tag">Design System</span>
                  <span className="panel-tag">GraphQL Schema</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Figma Screens</span>
                      <span className="pp-pct">85%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "85%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">API Contract</span>
                      <span className="pp-pct">70%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "70%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 2 ? "show" : ""}`}>
                <div className="panel-icon">⚡</div>
                <div className="panel-title">Agile Development & Integrations</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Two-week sprints with daily stand-ups, a shared Jira board, and bi-weekly demos so you see working software every fortnight — not just reports.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">2-Week Sprints</span>
                  <span className="panel-tag">CI/CD Pipeline</span>
                  <span className="panel-tag">WebSocket Events</span>
                  <span className="panel-tag">3rd Party APIs</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Frontend Modules</span>
                      <span className="pp-pct">60%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "60%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Backend Services</span>
                      <span className="pp-pct">55%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "55%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 3 ? "show" : ""}`}>
                <div className="panel-icon">🚀</div>
                <div className="panel-title">Performance Audit & Launch</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Load testing at 10× expected traffic, Lighthouse scores above 90, zero-downtime blue-green deployment to Vercel or AWS ECS.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Lighthouse &gt;90</span>
                  <span className="panel-tag">Load Testing</span>
                  <span className="panel-tag">Vercel / AWS</span>
                  <span className="panel-tag">Blue-Green Deploy</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Performance Score</span>
                      <span className="pp-pct">94%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "94%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Test Coverage</span>
                      <span className="pp-pct">88%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "88%" : "0%" }} />
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
                  <div className="cap-name">Server-Side Rendering (SSR)</div>
                  <div className="cap-desc">Lightning-fast initial load times and outstanding SEO rankings using Next.js hydration frameworks.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Robust REST & GraphQL APIs</div>
                  <div className="cap-desc">Clean, self-documenting codebases that scale cleanly to support web, mobile, and third-party clients.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Real-Time WebSocket Sync</div>
                  <div className="cap-desc">Bi-directional instant message sockets for chat engines, operational dashboards, and notification systems.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Secure Single Sign-On (SSO)</div>
                  <div className="cap-desc">Robust Auth0, Cognito, or JWT logins with MFA controls protecting sensitive business layers.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Micro-Frontend Architecture</div>
                  <div className="cap-desc">Module federation for teams to deploy independently without breaking the overall application shell.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">React</span>
                <span className="tech-pill hot">Next.js</span>
                <span className="tech-pill hot">Node.js</span>
                <span className="tech-pill hot">TypeScript</span>
                <span className="tech-pill">GraphQL</span>
                <span className="tech-pill">TailwindCSS</span>
                <span className="tech-pill">PostgreSQL</span>
                <span className="tech-pill">NestJS</span>
                <span className="tech-pill">Vercel</span>
                <span className="tech-pill">AWS</span>
                <span className="tech-pill">Redis</span>
                <span className="tech-pill">Docker</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Discovery & Architecture</span>
                  <span className="tl-week">Wk 1–2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Design & API Contracts</span>
                  <span className="tl-week">Wk 2–4</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">Development Sprints</span>
                  <span className="tl-week">Wk 4–10</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">QA & Performance Audit</span>
                  <span className="tl-week">Wk 10–11</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Launch & Handover</span>
                  <span className="tl-week">Wk 12</span>
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
            Fintech Platform <em>Scaled to Millions</em>
          </h2>
          <p className="spotlight-desc reveal">
            Re-engineered a legacy jQuery/Java portal to React, TypeScript, and AWS serverless APIs. This cut initial load delays by 70%, boosted customer activation rates, and allowed the platform to support 500,000 active sessions with zero downtime.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num"><span className="accent">+</span>140%</div>
              <div className="result-desc">User Activation Rates — driven by dramatically faster onboarding flows</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">Performance Gain</div>
              <div className="result-num"><span className="accent">−</span>70%</div>
              <div className="result-desc">Initial load time reduced from 6.8s to under 2s via SSR + CDN</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Concurrent Sessions</div>
              <div className="result-num">500<span className="accent">K</span></div>
              <div className="result-desc">Active simultaneous users handled with zero-downtime blue-green deploys</div>
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
              <div className="form-title">Kickstart Your Full-Stack Web Development Project</div>
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
                      placeholder="Hi, I'm interested in discussing your Full-Stack Web Development services for my project..."
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

export default WebDevelopmentPage;
