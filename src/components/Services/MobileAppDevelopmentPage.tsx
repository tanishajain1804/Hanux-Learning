import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const MobileAppDevelopmentPage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your Mobile App Development services for my project...");
  const [submitted, setSubmitted] = useState(false);
  const [isFloatCtaVisible, setIsFloatCtaVisible] = useState(false);

  const autoRotateRef = useRef<any>(null);

  const startAutoRotation = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveStep(0);
    startAutoRotation();

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
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 200);

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    startAutoRotation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setProjectText("");
    setTimeout(() => {
      setSubmitted(false);
      setProjectText("Hi, I'm interested in discussing your Mobile App Development services for my project...");
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
            <div className="eyebrow-icon pulse">📱</div>
            Mobile App Development
          </div>

          <h1 className="hero-title">
            Create Apps <br />
            <em>Users Genuinely Love</em>
          </h1>
          
          <p className="hero-desc">
            We design and build native-quality iOS and Android applications. Powered by React Native and Flutter with a 95% shared codebase, engineered for 60 FPS fluidity, offline-first sync, and biometric security.
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
              <div className="hstat-num">8–<span>14</span>wks</div>
              <div className="hstat-lbl">Avg. Delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>99%</span></div>
              <div className="hstat-lbl">Crash-Free Rate</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>20M+</span></div>
              <div className="hstat-lbl">App Installs</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene">
            <div className="glow" style={{ width: "280px", height: "280px", background: "#534AB7", top: "-90px", left: "-60px", filter: "blur(65px)" }} />
            <div className="glow" style={{ width: "200px", height: "200px", background: "#1D9E75", bottom: "-50px", right: "-40px", filter: "blur(55px)" }} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "12px" }}>
              <div id="ph-l" style={{ background: "#1a1f2e", border: "1.5px solid #2a3050", borderRadius: "22px", width: "108px", height: "210px", overflow: "hidden", animation: "v2FloatA 5s 1s ease-in-out infinite, v2SlideUp .5s .1s ease forwards", opacity: 0, transform: "rotate(-4deg)" }}>
                <div style={{ width: "45px", height: "8px", background: "#0d1117", borderRadius: "0 0 7px 7px", margin: "0 auto" }} />
                <div style={{ padding: "8px 7px" }}>
                  <div style={{ fontSize: "7px", color: "#6b7280", fontWeight: 500, marginBottom: "5px" }}>ANALYTICS</div>
                  <svg viewBox="0 0 94 45" width="100%" style={{ display: "block", marginBottom: "5px" }}>
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D9E75" stopOpacity=".3" />
                        <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,40 Q15,30 30,28 Q45,15 60,10 Q75,5 94,2" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" style={{ animation: "v2GraphDraw 1.5s .4s ease forwards" }} />
                    <path d="M0,40 Q15,30 30,28 Q45,15 60,10 Q75,5 94,2 L94,45 L0,45Z" fill="url(#ag)" style={{ opacity: 0, animation: "v2FadeUp .3s 1.8s ease forwards" }} />
                    <circle cx="94" cy="2" r="3" fill="#1D9E75" style={{ animation: "v2Pulse 1.4s infinite" }} />
                  </svg>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", marginBottom: "5px" }}>
                    <div className="c2" style={{ padding: "5px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", fontWeight: 500, color: "#1D9E75" }}>20M+</div>
                      <div style={{ fontSize: "6px", color: "#6b7280" }}>Installs</div>
                    </div>
                    <div className="c2" style={{ padding: "5px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", fontWeight: 500, color: "#EF9F27" }}>4.9★</div>
                      <div style={{ fontSize: "6px", color: "#6b7280" }}>Rating</div>
                    </div>
                  </div>
                  <div className="c2" style={{ padding: "6px" }}>
                    <div style={{ fontSize: "6px", color: "#6b7280", marginBottom: "4px" }}>Performance</div>
                    <div style={{ height: "4px", background: "#111827", borderRadius: "2px", marginBottom: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "2px", background: "#7F77DD", ["--tw" as any]: "92%", animation: "v2FillW 1.4s .5s ease both", width: "0%" }} />
                    </div>
                    <div style={{ height: "4px", background: "#111827", borderRadius: "2px", marginBottom: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "2px", background: "#1D9E75", ["--tw" as any]: "78%", animation: "v2FillW 1.4s .7s ease both", width: "0%" }} />
                    </div>
                    <div style={{ height: "4px", background: "#111827", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "2px", background: "#378ADD", ["--tw" as any]: "86%", animation: "v2FillW 1.4s .9s ease both", width: "0%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div id="ph-c" style={{ background: "#1a1f2e", border: "1.5px solid #2a3050", borderRadius: "26px", width: "132px", height: "265px", overflow: "hidden", animation: "v2FloatB 4.5s .5s ease-in-out infinite, v2SlideUp .5s 0s ease forwards", opacity: 0, zIndex: 2 }}>
                <div style={{ width: "52px", height: "9px", background: "#0d1117", borderRadius: "0 0 8px 8px", margin: "0 auto" }} />
                <div style={{ padding: "10px 8px", position: "relative" }}>
                  <div style={{ position: "absolute", top: "10px", left: "8px", right: "8px", background: "rgba(30,35,50,.97)", border: "0.5px solid #2a3050", borderRadius: "9px", padding: "6px 9px", display: "flex", alignItems: "center", gap: "5px", animation: "v2NotifIn 5s 1.5s ease both", opacity: 0, zIndex: 10 }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "5px", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: 0 }}>🔔</div>
                    <div style={{ fontSize: "7.5px" }}>
                      <div style={{ color: "#e5e7eb", fontWeight: 500 }}>Build deployed!</div>
                      <div style={{ color: "#6b7280" }}>v2.4 live on stores</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "9px", marginTop: "2px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>📱</div>
                    <div>
                      <div style={{ fontSize: "8px", fontWeight: 500, color: "#e5e7eb" }}>HanuxApp</div>
                      <div style={{ fontSize: "7px", color: "#1D9E75", display: "flex", alignItems: "center", gap: "3px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1D9E75", display: "inline-block", animation: "v2Pulse 1.2s infinite" }} />
                        v2.4 Live
                      </div>
                    </div>
                  </div>
                  <div className="c2" style={{ marginBottom: "6px", padding: "7px" }}>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginBottom: "4px" }}>60 FPS frame rate</div>
                    <svg viewBox="0 0 112 28" width="100%" style={{ display: "block" }}>
                      <polyline points="0,25 10,18 20,20 30,8 40,12 50,4 60,7 70,2 80,5 90,1 100,4 112,1" fill="none" stroke="#7F77DD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400" strokeDashoffset="400" style={{ animation: "v2GraphDraw 1.5s .6s ease forwards" }} />
                    </svg>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "5px" }}>
                    <div className="c2" style={{ textAlign: "center", padding: "6px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 500, color: "#1D9E75" }}>99%</div>
                      <div style={{ fontSize: "6px", color: "#6b7280" }}>Crash-free</div>
                    </div>
                    <div className="c2" style={{ textAlign: "center", padding: "6px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 500, color: "#378ADD" }}>95%</div>
                      <div style={{ fontSize: "6px", color: "#6b7280" }}>Shared code</div>
                    </div>
                  </div>
                  <div className="c2" style={{ padding: "7px", marginBottom: "5px" }}>
                    <div style={{ fontSize: "7px", color: "#6b7280", marginBottom: "4px" }}>Store builds</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>iOS</span>
                      <span style={{ fontSize: "7px", color: "#1D9E75", fontWeight: 500 }}>✓ Done</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>Android</span>
                      <span style={{ fontSize: "7px", color: "#1D9E75", fontWeight: 500 }}>✓ Done</span>
                    </div>
                  </div>
                  <div style={{ background: "rgba(83,74,183,.2)", border: "0.5px solid rgba(83,74,183,.4)", borderRadius: "6px", padding: "5px", textAlign: "center" }}>
                    <div style={{ fontSize: "8px", color: "#AFA9EC", fontWeight: 500 }}>20M+ installs</div>
                  </div>
                </div>
              </div>
              <div id="ph-r" style={{ background: "#1a1f2e", border: "1.5px solid #2a3050", borderRadius: "22px", width: "108px", height: "210px", overflow: "hidden", animation: "v2FloatC 5.5s 1.2s ease-in-out infinite, v2SlideUp .5s .2s ease forwards", opacity: 0, transform: "rotate(4deg)" }}>
                <div style={{ width: "45px", height: "8px", background: "#0d1117", borderRadius: "0 0 7px 7px", margin: "0 auto" }} />
                <div style={{ padding: "8px 7px" }}>
                  <div style={{ fontSize: "7px", color: "#6b7280", fontWeight: 500, marginBottom: "5px" }}>DELIVERY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "7px" }}>
                    <div className="c2" style={{ padding: "5px 7px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#534AB7", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>Design</span>
                      <span style={{ fontSize: "7px", color: "#534AB7", fontWeight: 500 }}>✓</span>
                    </div>
                    <div className="c2" style={{ padding: "5px 7px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>Build</span>
                      <span style={{ fontSize: "7px", color: "#1D9E75", fontWeight: 500 }}>✓</span>
                    </div>
                    <div className="c2" style={{ padding: "5px 7px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#EF9F27", animation: "v2Blink .9s infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>Review</span>
                      <span style={{ fontSize: "7px", color: "#EF9F27", fontWeight: 500 }}>…</span>
                    </div>
                    <div className="c2" style={{ padding: "5px 7px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a3050", border: "1px solid #EF9F27", flexShrink: 0 }} />
                      <span style={{ fontSize: "7px", color: "#9ca3af", flex: 1 }}>Ship</span>
                      <span style={{ fontSize: "7px", color: "#6b7280" }}>—</span>
                    </div>
                  </div>
                  <div style={{ background: "rgba(83,74,183,.2)", border: "0.5px solid rgba(83,74,183,.4)", borderRadius: "6px", padding: "5px", textAlign: "center" }}>
                    <div style={{ fontSize: "8px", color: "#AFA9EC", fontWeight: 500 }}>8–14 wks avg</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="chip" style={{ color: "#AFA9EC" }}>React Native · Flutter</div>
              <div className="chip" style={{ color: "#9FE1CB" }}>Biometric auth</div>
              <div className="chip" style={{ color: "#85B7EB" }}>Offline-first sync</div>
              <div className="chip" style={{ color: "#FAC775" }}>iOS + Android</div>
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
              <div className="meta-value">8 – 14 Weeks</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-2">
            <div className="meta-icon">🏗️</div>
            <div>
              <div className="meta-label">Cross-platform split</div>
              <div className="meta-value">95% Shared Codebase</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Device support</div>
              <div className="meta-value">iOS & Android Tablet/Mobile</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
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
                  <div className="pstep-title">UX Journey Storyboarding</div>
                  <div className="pstep-desc">Mapping mobile-first interactions, gestures, navigation hierarchies, and edge cases like offline states.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">Native Bridge Design</div>
                  <div className="pstep-desc">Setting up custom native libraries, native capabilities permissions, and notification certificates.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">Feature Engineering Sprints</div>
                  <div className="pstep-desc">Building UI views, connecting local offline databases (SQLite/Realm), and mapping cloud push notifications.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Store Submission & Launch</div>
                  <div className="pstep-desc">Conducting TestFlight and Google Play Console beta rounds, verifying app guidelines, and publishing stores.</div>
                </div>
              </div>
            </div>

            <div className="process-panel-aligned">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">UX Journey Storyboarding</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We design mobile-first interaction patterns, gesture controls, and complex screen transitions, mapping paths for offline state triggers.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Gesture Mapping</span>
                  <span className="panel-tag">Wireframing</span>
                  <span className="panel-tag">Offline Logic</span>
                  <span className="panel-tag">Navigation Flow</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Interactive Prototype</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">User Journey Maps</span>
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
                <div className="panel-title">Native Bridge Design</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Setting up Native modules, configuring push notification certificates, mapping background geolocation tools, and native SDK permissions.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Native SDKs</span>
                  <span className="panel-tag">Push Certificates</span>
                  <span className="panel-tag">Geolocation Bridge</span>
                  <span className="panel-tag">Swift/Kotlin Bind</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Native Bridges</span>
                      <span className="pp-pct">90%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "90%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">API Configuration</span>
                      <span className="pp-pct">80%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "80%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 2 ? "show" : ""}`}>
                <div className="panel-icon">⚡</div>
                <div className="panel-title">Feature Engineering Sprints</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Developing reusable UI screens, integrating local offline-first SQLite or Realm databases, and wiring Firebase analytics events.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Redux Toolkit</span>
                  <span className="panel-tag">Realm DB Setup</span>
                  <span className="panel-tag">UI Engineering</span>
                  <span className="panel-tag">Firebase Sync</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Screen Modules</span>
                      <span className="pp-pct">65%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "65%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Local Data Sync</span>
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
                <div className="panel-title">Store Submission & Launch</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Pushing TestFlight & Play Store beta builds, completing security audits, complying with App Store guidelines, and publishing apps.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">TestFlight Audits</span>
                  <span className="panel-tag">Play Store Console</span>
                  <span className="panel-tag">App Store Signoff</span>
                  <span className="panel-tag">CI/CD Fastlane</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Store Compliance</span>
                      <span className="pp-pct">95%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "95%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Release Automation</span>
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
                  <div className="cap-name">Shared Code Architecture</div>
                  <div className="cap-desc">Write once, deploy twice. Speeds up feature rollout and cuts ongoing codebase maintenance bills in half.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Offline-First Sync</div>
                  <div className="cap-desc">Let users complete activities offline, then auto-sync background queues seamlessly once connections resume.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Biometric Protection</div>
                  <div className="cap-desc">Quick secure entry utilizing hardware FaceID, TouchID, and Android biometric interfaces.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Device APIs Integration</div>
                  <div className="cap-desc">Direct hardware integrations (Camera, Gyroscope, Bluetooth BLE, Geolocation tracking APIs).</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Push Notifications Dispatch</div>
                  <div className="cap-desc">Highly targetable user segment notifications utilizing Firebase Cloud Messaging (FCM) brokers.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">React Native</span>
                <span className="tech-pill hot">Flutter</span>
                <span className="tech-pill hot">iOS (Swift)</span>
                <span className="tech-pill hot">Android (Kotlin)</span>
                <span className="tech-pill">Firebase</span>
                <span className="tech-pill">Redux Toolkit</span>
                <span className="tech-pill">SQLite</span>
                <span className="tech-pill">App Store Connect</span>
                <span className="tech-pill">Fastlane</span>
                <span className="tech-pill">Google Play Console</span>
                <span className="tech-pill">TypeScript</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Storyboarding</span>
                  <span className="tl-week">Wk 1–2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Native Configuration</span>
                  <span className="tl-week">Wk 2–4</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">Feature Sprints</span>
                  <span className="tl-week">Wk 4–12</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Store Verification</span>
                  <span className="tl-week">Wk 12–13</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">App Store Launch</span>
                  <span className="tl-week">Wk 14</span>
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
            Logistics Fleet <em>Tracker Redeployed</em>
          </h2>
          <p className="spotlight-desc reveal">
            Designed a React Native application with offline-first synchronizations for remote delivery drivers. Drivers could log package status in low-connectivity areas, syncing records smoothly once online. It reduced logistics operational delays by 40%.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num">99.98%</div>
              <div className="result-desc">Offline Sync Reliability — zero data loss across remote areas</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">Efficiency Gain</div>
              <div className="result-num"><span className="accent">−</span>40%</div>
              <div className="result-desc">Logistics operational delays reduced through auto-logging</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Store Publishing</div>
              <div className="result-num">2 Weeks</div>
              <div className="result-desc">Fastlane pipeline automated store releases simultaneously</div>
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
              <div className="form-title">Kickstart Your Mobile App Development Project</div>
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
                      placeholder="Hi, I'm interested in discussing your Mobile App Development services for my project..."
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

export default MobileAppDevelopmentPage;
