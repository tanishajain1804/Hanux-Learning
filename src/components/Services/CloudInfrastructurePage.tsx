import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const CloudInfrastructurePage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your Cloud Infrastructure services for my project...");
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
      setProjectText("Hi, I'm interested in discussing your Cloud Infrastructure services for my project...");
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
            <div className="eyebrow-icon pulse">☁️</div>
            Cloud Infrastructure
          </div>

          <h1 className="hero-title">
            Deploy Infrastructure with <br />
            <em>Zero Downtime</em>
          </h1>
          
          <p className="hero-desc">
            We set up Infrastructure as Code (IaC), establish automated CI/CD deployment pipelines, and configure auto-scaling groups on AWS, GCP, or Azure. Zero-downtime, containers, and compliance.
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
              <div className="hstat-num">4–<span>8</span>wks</div>
              <div className="hstat-lbl">Avg. Delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>99.99%</span></div>
              <div className="hstat-lbl">Target Uptime</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>-42%</span></div>
              <div className="hstat-lbl">Host Costs Cut</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene">
            <div className="glow" style={{ width: "280px", height: "280px", background: "#1D9E75", opacity: 0.1, top: "-90px", right: "-60px", filter: "blur(65px)" }} />
            <div className="glow" style={{ width: "200px", height: "200px", background: "#378ADD", opacity: 0.1, bottom: "-60px", left: "-50px", filter: "blur(55px)" }} />
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px", marginBottom: "9px" }}>
                <div style={{ background: "linear-gradient(135deg,#0f2920,#1a1f2e)", border: "0.5px solid #1D9E75", borderRadius: "10px", padding: "10px", animation: "v3SlideUp .5s .1s ease both", opacity: 0 }}>
                  <div className="lbl">MRR</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#1D9E75" }}>$124K</div>
                  <div style={{ fontSize: "10px", color: "#1D9E75", marginTop: "2px" }}>↑ 18%</div>
                </div>
                <div style={{ background: "linear-gradient(135deg,#0a1827,#1a1f2e)", border: "0.5px solid #378ADD", borderRadius: "10px", padding: "10px", animation: "v3SlideUp .5s .2s ease both", opacity: 0 }}>
                  <div className="lbl">Active users</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#378ADD" }}>48.2K</div>
                  <div style={{ fontSize: "10px", color: "#378ADD", marginTop: "2px" }}>↑ 11%</div>
                </div>
                <div style={{ background: "linear-gradient(135deg,#17102a,#1a1f2e)", border: "0.5px solid #7F77DD", borderRadius: "10px", padding: "10px", animation: "v3SlideUp .5s .3s ease both", opacity: 0 }}>
                  <div className="lbl">Uptime SLA</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#7F77DD" }}>99.99%</div>
                  <div style={{ fontSize: "10px", color: "#1D9E75", marginTop: "2px" }}>Met ✓</div>
                </div>
              </div>
              <div className="c2" style={{ marginBottom: "8px", animation: "v3SlideUp .5s .35s ease both", opacity: 0 }}>
                <div className="lbl" style={{ marginBottom: "6px" }}>MRR growth</div>
                <svg viewBox="0 0 440 60" width="100%" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="sgg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D9E75" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#1D9E75" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d="M0,55 Q80,48 160,38 Q240,24 320,12 Q380,5 440,2" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeDasharray="700" strokeDashoffset="700" style={{ animation: "v3GraphDraw 2s .5s ease forwards" }} />
                  <path d="M0,55 Q80,48 160,38 Q240,24 320,12 Q380,5 440,2 L440,60 L0,60Z" fill="url(#sgg)" style={{ opacity: 0, animation: "v3SlideUp .4s 2.3s ease forwards" }} />
                  <circle cx="440" cy="2" r="4" fill="#1D9E75" style={{ animation: "v3Pulse 1.3s infinite" }} />
                </svg>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", animation: "v3SlideUp .5s .45s ease both", opacity: 0 }}>
                <div className="c2">
                  <div className="lbl" style={{ marginBottom: "6px" }}>Infrastructure</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1D9E75", animation: "v3Pulse 1.4s infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: "9px", color: "#9ca3af", flex: 1 }}>Auto-scaling</span>
                      <span style={{ fontSize: "9px", color: "#1D9E75", fontWeight: 500 }}>Active</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1D9E75", animation: "v3Pulse 1.6s infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: "9px", color: "#9ca3af", flex: 1 }}>Multi-tenant</span>
                      <span style={{ fontSize: "9px", color: "#1D9E75", fontWeight: 500 }}>Active</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#378ADD", animation: "v3Pulse 1.8s infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: "9px", color: "#9ca3af", flex: 1 }}>CDN edge</span>
                      <span style={{ fontSize: "9px", color: "#378ADD", fontWeight: 500 }}>22 nodes</span>
                    </div>
                  </div>
                </div>
                <div className="c2">
                  <div className="lbl">Monthly churn</div>
                  <div style={{ fontSize: "26px", fontWeight: 700, color: "#1D9E75", margin: "4px 0" }}>1.2%</div>
                  <div style={{ height: "5px", background: "#111827", borderRadius: "3px", overflow: "hidden", marginBottom: "4px" }}>
                    <div style={{ height: "100%", background: "#1D9E75", borderRadius: "3px", width: "0%", ...({"--tw": "12%"} as React.CSSProperties), animation: "v3FillW 1.5s .6s ease both" }} />
                  </div>
                  <div style={{ fontSize: "9px", color: "#6b7280" }}>Industry avg 5.6%</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="chip" style={{ color: "#9FE1CB" }}>Multi-tenant</div>
              <div className="chip" style={{ color: "#85B7EB" }}>Auto-scaling</div>
              <div className="chip" style={{ color: "#AFA9EC" }}>Stripe billing</div>
              <div className="chip" style={{ color: "#FAC775" }}>99.99% uptime</div>
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
              <div className="meta-value">4 - 8 Weeks</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-2">
            <div className="meta-icon">🏗️</div>
            <div>
              <div className="meta-label">Target Platforms</div>
              <div className="meta-value">AWS, GCP, Azure</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Target SLA Uptime</div>
              <div className="meta-value">99.99% Availability</div>
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
            <div className="process-steps">
              <div className={`pstep reveal ${activeStep === 0 ? "active" : ""}`} onClick={() => handleStepClick(0)}>
                <div className="pstep-num">1</div>
                <div className="pstep-body">
                  <div className="pstep-title">Security & Scale Audit</div>
                  <div className="pstep-desc">Reviewing hosting bills, CPU bottlenecks, and database read/write locks to map an optimal path.</div>
                </div>
              </div>
              <div className={`pstep reveal reveal-delay-1 ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">Infrastructure Scripting (IaC)</div>
                  <div className="pstep-desc">Drafting Terraform files configuring virtual private networks (VPCs), subnets, clusters, and policies.</div>
                </div>
              </div>
              <div className={`pstep reveal reveal-delay-2 ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">CI/CD Pipeline Construction</div>
                  <div className="pstep-desc">Configuring GitHub Actions or GitLab pipelines to build, test, and release Docker containers automatically.</div>
                </div>
              </div>
              <div className={`pstep reveal reveal-delay-3 ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Chaos Audit & Monitoring</div>
                  <div className="pstep-desc">Testing failovers, setting up autoscaling profiles, and deploying Prometheus/Grafana alert dashboards.</div>
                </div>
              </div>
            </div>

            <div className="process-panel reveal">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">Security & Scale Audit</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We analyze infrastructure metrics, scan firewall logs, review cluster layouts, and find server waste to reduce costs.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Infrastructure Audit</span>
                  <span className="panel-tag">Cost Management</span>
                  <span className="panel-tag">AWS IAM Review</span>
                  <span className="panel-tag">DDoS Check</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Infrastructure Map</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Cost Saving Plan</span>
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
                <div className="panel-title">Infrastructure Scripting (IaC)</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Drafting Terraform structures configuring private cloud VPCs, auto-scaling clusters, caching queues, and secure policies.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Terraform Scripts</span>
                  <span className="panel-tag">AWS VPC Scoping</span>
                  <span className="panel-tag">IAM Policy Design</span>
                  <span className="panel-tag">Docker configs</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Terraform Modules</span>
                      <span className="pp-pct">90%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "90%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Cluster Diagrams</span>
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
                <div className="panel-title">CI/CD Pipeline Construction</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Configuring GitHub Actions pipelines to run automated tests, compile source code, build Docker images, and deploy containers.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">GitHub Actions</span>
                  <span className="panel-tag">Docker Builds</span>
                  <span className="panel-tag">Automated Linting</span>
                  <span className="panel-tag">ECS Deploy Scripts</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Deployment Pipelines</span>
                      <span className="pp-pct">70%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "70%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Test Suites Integration</span>
                      <span className="pp-pct">65%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "65%" : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`panel-content ${activeStep === 3 ? "show" : ""}`}>
                <div className="panel-icon">🚀</div>
                <div className="panel-title">Chaos Audit & Monitoring</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Running mock load tests, verifying node failure recoveries, setting up cloud monitors, and wiring alerting metrics.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Chaos Monkey Tests</span>
                  <span className="panel-tag">Prometheus Setup</span>
                  <span className="panel-tag">Grafana Alerting</span>
                  <span className="panel-tag">AWS CloudWatch</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Observability Boards</span>
                      <span className="pp-pct">95%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "95%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Failover Validation</span>
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
                  <div className="cap-name">Infrastructure as Code (IaC)</div>
                  <div className="cap-desc">Reproducible Terraform configurations that let you spin up test or production environments in one click.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Kubernetes Orchestration</div>
                  <div className="cap-desc">Maximize server utilization and automate horizontal scaling for microservices using EKS/GKE.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Zero-Downtime Deployment</div>
                  <div className="cap-desc">Blue-green or rolling container releases ensuring user sessions are never interrupted during releases.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Robust Cloud Observability</div>
                  <div className="cap-desc">Tracing logs, alert notifications, and APM tracing alerts to flag code bottlenecks before clients notice.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Asset CDN Caching</div>
                  <div className="cap-desc">Static file cache routing utilizing Cloudflare or AWS CloudFront CDN endpoints globally.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">AWS</span>
                <span className="tech-pill hot">Terraform</span>
                <span className="tech-pill hot">Docker</span>
                <span className="tech-pill hot">Kubernetes</span>
                <span className="tech-pill">GitHub Actions</span>
                <span className="tech-pill">Prometheus</span>
                <span className="tech-pill">Grafana</span>
                <span className="tech-pill">Nginx</span>
                <span className="tech-pill">Redis</span>
                <span className="tech-pill">GCP</span>
                <span className="tech-pill">Helm</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Scale Audit</span>
                  <span className="tl-week">Wk 1</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Terraform Setup</span>
                  <span className="tl-week">Wk 2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">Pipeline Build</span>
                  <span className="tl-week">Wk 3–6</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Chaos Audit</span>
                  <span className="tl-week">Wk 7</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Handover & Launch</span>
                  <span className="tl-week">Wk 8</span>
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
            AWS Cluster Optimization <em>for SaaS Portal</em>
          </h2>
          <p className="spotlight-desc reveal">
            Migrated a legacy, single-server EC2 setup to a modern, auto-scaling ECS container layout with serverless RDS databases. This increased page speed, enabled seamless zero-downtime releases, and cut monthly cloud hosting costs by over 40%.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num"><span className="accent">−</span>42%</div>
              <div className="result-desc">Cloud Hosting Bills — through container consolidation and RDS resizing</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">Performance Gain</div>
              <div className="result-num"><span className="accent">+</span>230%</div>
              <div className="result-desc">API throughput capacity increased under high concurrent user load</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Uptime SLA</div>
              <div className="result-num">99.99%</div>
              <div className="result-desc">Reliability achieved through automated multi-AZ container failovers</div>
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
              <div className="form-title">Kickstart Your Cloud Infrastructure Project</div>
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
                      placeholder="Hi, I'm interested in discussing your Cloud Infrastructure services for my project..."
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

export default CloudInfrastructurePage;
