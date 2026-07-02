import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./ServiceDetailPage.css";

export const AiAutomationPage: React.FC = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectText, setProjectText] = useState("Hi, I'm interested in discussing your AI & Automation services for my project...");
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
          serviceName: "AI & Automation",
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
      setProjectText("Hi, I'm interested in discussing your AI & Automation services for my project...");
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
            <div className="eyebrow-icon pulse">🤖</div>
            AI & Automation
          </div>

          <h1 className="hero-title">
            Supercharge Ops with <br />
            <em>Production AI Agents</em>
          </h1>
          
          <p className="hero-desc">
            We integrate state-of-the-art LLMs, custom machine learning models, and automated cognitive workflows into your software. From RAG systems fetching documentation to autonomous agents triggering APIs.
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
              <div className="hstat-num"><span>80%</span></div>
              <div className="hstat-lbl">Ops Time Saved</div>
            </div>
            <div className="hstat">
              <div className="hstat-num"><span>10M+</span></div>
              <div className="hstat-lbl">Tokens/Day</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="scene">
            <div className="glow" style={{ width: "280px", height: "280px", background: "#7F77DD", top: "-90px", right: "-60px", filter: "blur(65px)" }} />
            <div className="glow" style={{ width: "200px", height: "200px", background: "#1D9E75", bottom: "-50px", left: "-40px", filter: "blur(55px)" }} />
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <svg id="aisvg" viewBox="0 0 480 170" width="100%" style={{ display: "block", marginBottom: "10px" }}>
                <defs>
                  <marker id="ma" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                </defs>
                <rect x="8" y="60" width="88" height="52" rx="8" fill="#1a1f2e" stroke="#2a3050" strokeWidth=".5" />
                <text x="52" y="82" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">Data input</text>
                <text x="52" y="96" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="sans-serif">CSV · API · DB</text>
                <circle cx="52" cy="108" r="2.5" fill="#378ADD" style={{ animation: "v2Pulse 1.4s .0s infinite" }} />
                <circle cx="62" cy="108" r="2.5" fill="#378ADD" style={{ animation: "v2Pulse 1.4s .2s infinite" }} />
                <circle cx="72" cy="108" r="2.5" fill="#378ADD" style={{ animation: "v2Pulse 1.4s .4s infinite" }} />

                <line x1="96" y1="86" x2="136" y2="86" stroke="#534AB7" strokeWidth="1.3" strokeDasharray="5 3" markerEnd="url(#ma)" style={{ animation: "v2FlowDash 1.2s linear infinite" }} />

                <rect x="136" y="52" width="108" height="68" rx="9" fill="#1a1f2e" stroke="#534AB7" strokeWidth="1.2" />
                <text x="190" y="74" fill="#AFA9EC" fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">AI Engine</text>
                <text x="190" y="88" fill="#7F77DD" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Processing…</text>
                <circle cx="175" cy="105" r="3" fill="#534AB7" style={{ animation: "v2Pulse 1s .0s infinite" }} />
                <circle cx="190" cy="105" r="3" fill="#534AB7" style={{ animation: "v2Pulse 1s .18s infinite" }} />
                <circle cx="205" cy="105" r="3" fill="#534AB7" style={{ animation: "v2Pulse 1s .36s infinite" }} />

                <line x1="244" y1="72" x2="284" y2="55" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#ma)" style={{ animation: "v2FlowDash 1.1s .2s linear infinite" }} />
                <line x1="244" y1="100" x2="284" y2="117" stroke="#EF9F27" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#ma)" style={{ animation: "v2FlowDash 1.1s .4s linear infinite" }} />

                <rect x="284" y="36" width="100" height="40" rx="8" fill="#1a1f2e" stroke="#1D9E75" strokeWidth=".8" />
                <text x="334" y="54" fill="#9FE1CB" fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">Decision</text>
                <text x="334" y="67" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Route · Alert · Flag</text>

                <rect x="284" y="96" width="100" height="40" rx="8" fill="#1a1f2e" stroke="#EF9F27" strokeWidth=".8" />
                <text x="334" y="114" fill="#FAC775" fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">Automate</text>
                <text x="334" y="127" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Email · Slack · DB</text>

                <line x1="384" y1="56" x2="416" y2="56" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#ma)" style={{ animation: "v2FlowDash 1s .6s linear infinite" }} />
                <line x1="384" y1="116" x2="416" y2="116" stroke="#EF9F27" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#ma)" style={{ animation: "v2FlowDash 1s .8s linear infinite" }} />

                <rect x="416" y="40" width="60" height="32" rx="7" fill="#1a1f2e" stroke="#2a3050" strokeWidth=".5" />
                <text x="446" y="54" fill="#9FE1CB" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Insights</text>
                <circle cx="454" cy="63" r="3" fill="#1D9E75" style={{ animation: "v2Pulse 1.1s infinite" }} />

                <rect x="416" y="100" width="60" height="32" rx="7" fill="#1a1f2e" stroke="#2a3050" strokeWidth=".5" />
                <text x="446" y="113" fill="#FAC775" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Triggered</text>
                <text x="446" y="124" fill="#6b7280" fontSize="7" textAnchor="middle" fontFamily="sans-serif">3 actions</text>
              </svg>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px", animation: "v2SlideUp .5s .6s ease both", opacity: 0 }}>
                <div className="c2" style={{ textAlign: "center" }}><div className="lbl">Tasks / day</div><div className="vl" style={{ color: "#7F77DD" }}>12.4K</div></div>
                <div className="c2" style={{ textAlign: "center" }}><div className="lbl">Time saved</div><div className="vl" style={{ color: "#1D9E75" }}>68 hrs/wk</div></div>
                <div className="c2" style={{ textAlign: "center" }}><div className="lbl">Error rate</div><div className="vl" style={{ color: "#EF9F27" }}>0.02%</div></div>
              </div>
            </div>
            <div className="row">
              <div className="chip" style={{ color: "#AFA9EC" }}>LLM-powered</div>
              <div className="chip" style={{ color: "#9FE1CB" }}>No-code triggers</div>
              <div className="chip" style={{ color: "#FAC775" }}>Slack · Email · DB</div>
              <div className="chip" style={{ color: "#85B7EB" }}>Real-time decisions</div>
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
              <div className="meta-label">Models Supported</div>
              <div className="meta-value">OpenAI, Anthropic, Llama 3</div>
            </div>
          </div>
          <div className="meta-card reveal reveal-delay-3">
            <div className="meta-icon">🛡️</div>
            <div>
              <div className="meta-label">Ops Time Saved</div>
              <div className="meta-value">Up to 80% Automation</div>
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
                  <div className="pstep-title">Operational Pipeline Audit</div>
                  <div className="pstep-desc">Analyzing your support queues, logs, and sheets to identify high-return bottlenecks suited for AI agent automation.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 1 ? "active" : ""}`} onClick={() => handleStepClick(1)}>
                <div className="pstep-num">2</div>
                <div className="pstep-body">
                  <div className="pstep-title">Vector DB & Prompt Scoping</div>
                  <div className="pstep-desc">Setting up data pipelines, chunking policies, vector indexes (Pinecone/Chroma), and system prompts.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 2 ? "active" : ""}`} onClick={() => handleStepClick(2)}>
                <div className="pstep-num">3</div>
                <div className="pstep-body">
                  <div className="pstep-title">Agent Integration Sprints</div>
                  <div className="pstep-desc">Developing fail-safe loops, integrating tools execution (APIs, DB calls), and building verification interfaces.</div>
                </div>
              </div>
              <div className={`pstep ${activeStep === 3 ? "active" : ""}`} onClick={() => handleStepClick(3)}>
                <div className="pstep-num">4</div>
                <div className="pstep-body">
                  <div className="pstep-title">Performance Evaluation & Launch</div>
                  <div className="pstep-desc">Testing prompts for bias, tuning LLM temperatures, optimizing token usage costs, and deploying to cloud infrastructure.</div>
                </div>
              </div>
            </div>

            <div className="process-panel-aligned">
              <div className={`panel-content ${activeStep === 0 ? "show" : ""}`}>
                <div className="panel-icon">🔍</div>
                <div className="panel-title">Operational Pipeline Audit</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We audit your business processes, scan ticket histories, and identify manual labor choke points where LLM routing offers the highest return.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Process Audits</span>
                  <span className="panel-tag">Bottleneck Search</span>
                  <span className="panel-tag">ROI Scoping</span>
                  <span className="panel-tag">Security Mapping</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Automation Map</span>
                      <span className="pp-pct">100%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Data Flow Specs</span>
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
                <div className="panel-title">Vector DB & Prompt Scoping</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Configuring vector indexes (Pinecone/Chroma), building semantic chunking pipelines, and setting prompt guardrails.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Semantic Chunking</span>
                  <span className="panel-tag">Pinecone Indexing</span>
                  <span className="panel-tag">Guardrail Setup</span>
                  <span className="panel-tag">Prompt Tuning</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Vector Indexes</span>
                      <span className="pp-pct">85%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 1 ? "85%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Guardrail Config</span>
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
                <div className="panel-title">Agent Integration Sprints</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  We build self-correcting agent chains, write custom API tool calls, and wire Slack or web chat entry interfaces.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">LangChain Chains</span>
                  <span className="panel-tag">Tool Call APIs</span>
                  <span className="panel-tag">Slack Integration</span>
                  <span className="panel-tag">Evaluation Loops</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Agent Pipelines</span>
                      <span className="pp-pct">60%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 2 ? "60%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Tool Connectors</span>
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
                <div className="panel-title">Performance Evaluation & Launch</div>
                <p style={{ fontSize: ".82rem", lineHeight: "1.75", color: "var(--muted2)" }}>
                  Simulating user queries, optimizing token consumption costs, testing prompt vulnerability, and launching serverless pipelines.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">Token Optimization</span>
                  <span className="panel-tag">Safety Eval</span>
                  <span className="panel-tag">Serverless Deployment</span>
                  <span className="panel-tag">Live Monitoring</span>
                </div>
                <div className="panel-progress">
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Latency Target</span>
                      <span className="pp-pct">92%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "92%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="pp-row">
                      <span className="pp-lbl">Safety Score</span>
                      <span className="pp-pct">96%</span>
                    </div>
                    <div className="pp-bar">
                      <div className="pp-fill" style={{ width: activeStep === 3 ? "96%" : "0%" }} />
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
                  <div className="cap-name">Retrieval-Augmented Generation (RAG)</div>
                  <div className="cap-desc">Build smart QA bots that access your secure database tables, wikis, and guidelines with zero hallucinations.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Autonomous Work Agents</div>
                  <div className="cap-desc">AI agents that can trigger REST requests, update ticket states, scan logs, and send emails autonomously.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Cognitive Document Analysis</div>
                  <div className="cap-desc">Automated OCR extraction pipelines scanning invoices, shipping bills, and complex contracts in seconds.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Advanced Semantic Analytics</div>
                  <div className="cap-desc">Deep sentiment audits, clustering engines, and text summarization flows sorting high-volume feeds.</div>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-4">
                <div className="cap-dot" />
                <div>
                  <div className="cap-name">Model Fine-Tuning Labs</div>
                  <div className="cap-desc">Adapting open-weight models (Llama 3/Mistral) on your company parameters for fully private deployments.</div>
                </div>
              </div>
            </div>

            <div className="tech-stack-panel reveal">
              <div className="tech-header">Technology Stack</div>
              <div className="tech-pills">
                <span className="tech-pill hot">OpenAI API</span>
                <span className="tech-pill hot">LangChain</span>
                <span className="tech-pill hot">Python</span>
                <span className="tech-pill hot">Llama 3</span>
                <span className="tech-pill">Pinecone</span>
                <span className="tech-pill">ChromaDB</span>
                <span className="tech-pill">FastAPI</span>
                <span className="tech-pill">AWS Lambda</span>
                <span className="tech-pill">Hugging Face</span>
                <span className="tech-pill">Mistral</span>
                <span className="tech-pill">Docker</span>
              </div>
              <div className="delivery-timeline">
                <div className="tl-title">Typical Project Timeline</div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Pipeline Audit</span>
                  <span className="tl-week">Wk 1</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot done" />
                  <span className="tl-lbl">Prompt Engineering</span>
                  <span className="tl-week">Wk 2</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot active" />
                  <span className="tl-lbl">Agent Sprints</span>
                  <span className="tl-week">Wk 3–6</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Accuracy Testing</span>
                  <span className="tl-week">Wk 7</span>
                </div>
                <div className="tl-row">
                  <div className="tl-dot pending" />
                  <span className="tl-lbl">Production Release</span>
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
            Customer Support <em>Automation Redefined</em>
          </h2>
          <p className="spotlight-desc reveal">
            Deployed an advanced RAG support assistant connected directly to Zendesk and company databases. The agent scans customer histories, executes data lookups, and replies instantly to queries. Support resolution delays dropped from 4 hours to 30 seconds.
          </p>
          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-label-sm">Result Achieved</div>
              <div className="result-num">74%</div>
              <div className="result-desc">Tickets Auto-Resolved — without human intervention</div>
            </div>
            <div className="result-card reveal reveal-delay-1">
              <div className="result-label-sm">Resolution Speed</div>
              <div className="result-num">&lt;30s</div>
              <div className="result-desc">Customer response delay reduced from 4 hours</div>
            </div>
            <div className="result-card reveal reveal-delay-2">
              <div className="result-label-sm">Cost Reduction</div>
              <div className="result-num"><span className="accent">−</span>60%</div>
              <div className="result-desc">Customer support operation cost saved through automated tier-1 help</div>
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
              <div className="form-title">Kickstart Your AI & Automation Project</div>
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
                      placeholder="Hi, I'm interested in discussing your AI & Automation services for my project..."
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

export default AiAutomationPage;
