import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const CrmErpSystemsPage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your CRM & ERP Systems services for my project...");
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
          serviceName: "CRM & ERP Systems",
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
      setProjectText("Hi, I'm interested in discussing your CRM & ERP Systems services for my project...");
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
            <div className="eyebrow-icon pulse">🔧</div>
            CRM & ERP Systems
          </div>

          <h1 className="hero-title">
            Optimize Operations with <br />
            <em>Custom Systems</em>
          </h1>
          
          <p className="hero-desc">
            We build custom CRM modules, automate ERP workflows, and integrate third-party tools to eliminate manual data entry. Unified dashboards for real-time operations, inventory, and automated billing.
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
              <div className="hstat-num">8–<span>16</span>wks</div>
              <div className="hstat-lbl">Avg. Delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>85%</span></div>
              <div className="hstat-lbl">Manual Input Cut</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>100%</span></div>
              <div className="hstat-lbl">Real-Time Sync</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene">
            <div className="glow" style={{ width: "260px", height: "260px", background: "#D85A30", top: "-80px", left: "-60px", filter: "blur(65px)" }} />
            <div className="glow" style={{ width: "200px", height: "200px", background: "#7F77DD", bottom: "-50px", right: "-40px", filter: "blur(55px)" }} />
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: 500, marginBottom: "5px", textTransform: "uppercase" }}>Live pipeline</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div className="c2" style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: "7px", animation: "v2SlideUp .4s .1s ease both", opacity: 0 }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(83,74,183,.35)", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>👤</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: "9px", color: "#e5e7eb", fontWeight: 500 }}>Arjun Mehta</div><div style={{ fontSize: "8px", color: "#6b7280" }}>$42K · Closing</div></div>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0, animation: "v2Pulse 1.3s infinite" }} />
                    </div>
                    <div className="c2" style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: "7px", animation: "v2SlideUp .4s .2s ease both", opacity: 0 }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(55,138,221,.35)", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>👤</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: "9px", color: "#e5e7eb", fontWeight: 500 }}>Priya Shah</div><div style={{ fontSize: "8px", color: "#6b7280" }}>$18K · Proposal</div></div>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF9F27", flexShrink: 0, animation: "v2Blink .8s infinite" }} />
                    </div>
                    <div className="c2" style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: "7px", animation: "v2SlideUp .4s .3s ease both", opacity: 0 }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(29,158,117,.35)", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>👤</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: "9px", color: "#e5e7eb", fontWeight: 500 }}>Ravi Kumar</div><div style={{ fontSize: "8px", color: "#6b7280" }}>$95K · Discovery</div></div>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#378ADD", flexShrink: 0, animation: "v2Pulse 1.5s infinite" }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div className="c2" style={{ textAlign: "center", padding: "10px", animation: "v2SlideUp .4s .15s ease both", opacity: 0 }}>
                    <div className="lbl">Pipeline value</div>
                    <div style={{ fontSize: "22px", fontWeight: 500, color: "#7F77DD" }}>$2.4M</div>
                    <div style={{ fontSize: "10px", color: "#1D9E75", marginTop: "2px" }}>↑ 34% this quarter</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", animation: "v2SlideUp .4s .25s ease both", opacity: 0 }}>
                    <div className="c2" style={{ textAlign: "center", padding: "8px" }}><div className="lbl">Win rate</div><div className="vl" style={{ color: "#1D9E75", fontSize: "16px" }}>68%</div></div>
                    <div className="c2" style={{ textAlign: "center", padding: "8px" }}><div className="lbl">Avg cycle</div><div className="vl" style={{ color: "#EF9F27", fontSize: "16px" }}>21d</div></div>
                  </div>
                  <div className="c2" style={{ padding: "8px", animation: "v2SlideUp .4s .35s ease both", opacity: 0 }}>
                    <div className="lbl" style={{ marginBottom: "5px" }}>Stage breakdown</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "40px" }}>
                      <div style={{ flex: 1, background: "#534AB7", borderRadius: "3px 3px 0 0", transformOrigin: "bottom", ["--tw" as any]: "100%", height: "85%", animation: "v2BarRise .6s .4s ease both", transform: "scaleY(0)" }} />
                      <div style={{ flex: 1, background: "#378ADD", borderRadius: "3px 3px 0 0", transformOrigin: "bottom", height: "65%", animation: "v2BarRise .6s .5s ease both", transform: "scaleY(0)" }} />
                      <div style={{ flex: 1, background: "#1D9E75", borderRadius: "3px 3px 0 0", transformOrigin: "bottom", height: "50%", animation: "v2BarRise .6s .6s ease both", transform: "scaleY(0)" }} />
                      <div style={{ flex: 1, background: "#EF9F27", borderRadius: "3px 3px 0 0", transformOrigin: "bottom", height: "35%", animation: "v2BarRise .6s .7s ease both", transform: "scaleY(0)" }} />
                      <div style={{ flex: 1, background: "#D85A30", borderRadius: "3px 3px 0 0", transformOrigin: "bottom", height: "20%", animation: "v2BarRise .6s .8s ease both", transform: "scaleY(0)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="c2" style={{ marginTop: "8px", padding: "9px 11px", display: "flex", alignItems: "center", gap: "8px", animation: "v2SlideUp .4s .5s ease both", opacity: 0 }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1D9E75", flexShrink: 0, animation: "v2Pulse 1s infinite" }} />
                <span style={{ fontSize: "9px", color: "#9ca3af", flex: 1 }}>AI follow-up sent to Priya Shah — 3× reply rate boost expected</span>
                <span style={{ fontSize: "8px", color: "#1D9E75", fontWeight: 500, whiteSpace: "nowrap" }}>Just now</span>
              </div>
            </div>
            <div className="row">
              <div className="chip" style={{ color: "#F0997B" }}>AI lead scoring</div>
              <div className="chip" style={{ color: "#9FE1CB" }}>68% win rate</div>
              <div className="chip" style={{ color: "#AFA9EC" }}>Custom workflows</div>
              <div className="chip" style={{ color: "#85B7EB" }}>Auto follow-ups</div>
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
              <div className="meta-value">8 - 16 Weeks</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-2">
            <div className="meta-icon">🏗️</div>
            <div>
              <div className="meta-label">Integrations supported</div>
              <div className="meta-value">Salesforce, Stripe, HubSpot</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Data sync delay</div>
              <div className="meta-value">Real-time Event Hooks</div>
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
                  <div className="pstep-title">Silo & Flow Mapping</div>
                  <div className="pstep-desc">Auditing how departments (finance, sales, warehouse) exchange data to identify duplication gaps.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">Unified Database Modeling</div>
                  <div className="pstep-desc">Building a central Postgres or SQL Server schema hosting all client, billing, and logistics entities.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">Pipeline & API Integration</div>
                  <div className="pstep-desc">Connecting Stripe triggers, Salesforce webhooks, automated PDF generators, and alert emails.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Permissions Setup & Rollout</div>
                  <div className="pstep-desc">Setting up role-based security filters, importing legacy CSVs, and conducting staff onboarding.</div>
                </div>
              </div>
            </div>

            <div className="process-panel-aligned">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">Silo & Flow Mapping</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We analyze sales pipelines, warehouse operations, and billing cycles to document cross-department data pipelines.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Silo Discovery</span>
                  <span className="panel-tag">Logistics Mapping</span>
                  <span className="panel-tag">Audit Reporting</span>
                  <span className="panel-tag">Billing Review</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Silo Map Document</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Operations Audit</span>
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
                <div className="panel-title">Unified Database Modeling</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Drafting relational schema mappings that link invoices, client profiles, inventory tallies, and supply orders securely.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Relational Database</span>
                  <span className="panel-tag">PostgreSQL Schema</span>
                  <span className="panel-tag">Data Validation</span>
                  <span className="panel-tag">Secure Key Ring</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Database Diagram</span>
                      <span className="pp-pct">90%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "90%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Schema Validation</span>
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
                <div className="panel-title">Pipeline & API Integration</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Connecting Stripe triggers, Salesforce leads webhooks, PDF billing generators, and transactional emails.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Salesforce APIs</span>
                  <span className="panel-tag">Stripe Connect</span>
                  <span className="panel-tag">PDF Builders</span>
                  <span className="panel-tag">Transactional Mail</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">API Connectors</span>
                      <span className="pp-pct">65%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "65%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Webhook Routing</span>
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
                <div className="panel-title">Permissions Setup & Rollout</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Configuring role-based access levels, migrating legacy spreadsheet datasets, and conducting walkthrough trainings.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Role-Based Access</span>
                  <span className="panel-tag">CSV Migration</span>
                  <span className="panel-tag">Staff Onboarding</span>
                  <span className="panel-tag">Live Deploy</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Data Migrations</span>
                      <span className="pp-pct">95%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "95%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Training Sessions</span>
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
                  <div className="cap-name">Custom Deal Pipelines</div>
                  <div className="cap-desc">Tailored sales boards matching your actual lead validation phases, keeping deals moving.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Automated Billing & Invoices</div>
                  <div className="cap-desc">Instantly draft estimates, generate Stripe subscription invoices, and flag overdue payments automatically.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Live Inventory Auditing</div>
                  <div className="cap-desc">Synchronize stock quantities across warehouse scans, online purchases, and incoming supplier orders.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Operational Dashboards</div>
                  <div className="cap-desc">Executive KPI summaries, reports, and projections displayed in customizable chart interfaces.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Legacy System Sync</div>
                  <div className="cap-desc">Bridges modern interfaces to older databases using secure offline cache sync bridges.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">React</span>
                <span className="tech-pill hot">PostgreSQL</span>
                <span className="tech-pill hot">Salesforce API</span>
                <span className="tech-pill hot">Stripe Connect</span>
                <span className="tech-pill">HubSpot SDK</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Docker</span>
                <span className="tech-pill">AWS ECS</span>
                <span className="tech-pill">NestJS</span>
                <span className="tech-pill">Express</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Silo Mapping</span>
                  <span className="tl-week">Wk 1–2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">DB Modeling</span>
                  <span className="tl-week">Wk 2–4</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">API Integrations</span>
                  <span className="tl-week">Wk 4–12</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Data Migrations</span>
                  <span className="tl-week">Wk 12–14</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Onboarding & Launch</span>
                  <span className="tl-week">Wk 16</span>
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
            ERP Modernization <em>for E-Commerce Brand</em>
          </h2>
          <p className="spotlight-desc reveal">
            Consolidated five disconnected inventory spreadsheets and billing tools into a custom unified ERP platform. The system auto-generates shipping labels, updates inventory quantities, and routes billing records to bookkeeping platforms in real-time.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num"><span className="accent">−</span>85%</div>
              <div className="result-desc">Manual Data Entry Time — saving hours of admin labor daily</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">Sync Speed</div>
              <div className="result-num">Real-time</div>
              <div className="result-desc">Stock quantities sync instantly across all sales platforms</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Security compliance</div>
              <div className="result-num">100%</div>
              <div className="result-desc">Role-based safety blocks prevent cross-department data leaks</div>
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
              <div className="form-title">Kickstart Your CRM & ERP Systems Project</div>
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
                      placeholder="Hi, I'm interested in discussing your CRM & ERP Systems services for my project..."
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

export default CrmErpSystemsPage;
