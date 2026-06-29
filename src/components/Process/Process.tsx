import React, { useState, useEffect, useRef } from "react";
import { TrailBadge } from "../Common/TrailBadge";
import "./Process.css";

interface TabData {
  id: string;
  label: string;
  icon: string;
  number: string;
  accent: string;
  bgClass: string;
  title: string;
  subtitle: string;
  bullets: string[];
  metricVal: string;
  metricLbl: string;
  badgeText: string;
  tools: string[];
  video: string;
  ctaText: string;
}

const tabData: TabData[] = [
  {
    id: "discovery",
    label: "Discovery",
    icon: "🔍",
    number: "01",
    accent: "#3B82F6",
    bgClass: "discovery",
    title: "Scoping & System Architecture",
    subtitle: "We run collaborative workshops to define product scope, evaluate the tech stack, perform risk assessment, and plan the architecture before writing code.",
    bullets: [
      "Stakeholder workshops & user journey mapping",
      "Tech stack evaluation & architecture design",
      "Database schema & API contracts draft",
      "Detailed project scope & risk mitigation document"
    ],
    metricVal: "98%",
    metricLbl: "Scoping Accuracy",
    badgeText: "⏱ 1–2 Weeks",
    tools: ["figma", "slack", "notion", "meet"],
    video: "/images/showcase_discovery.png",
    ctaText: "Book Discovery Workshop"
  },
  {
    id: "design",
    label: "Design",
    icon: "✏️",
    number: "02",
    accent: "#F97316",
    bgClass: "design",
    title: "High-Fidelity Interactive Prototypes",
    subtitle: "We build fully interactive Figma design kits and responsive web/mobile layouts. You test and approve every screen flow before we touch a single line of code.",
    bullets: [
      "Scaleable UX/UI design system & brand kit",
      "Interactive Figma prototypes (Mobile & Desktop)",
      "Real-user usability testing & feedback iteration",
      "Comprehensive design asset & specification hand-off"
    ],
    metricVal: "100%",
    metricLbl: "Client Approval Rate",
    badgeText: "⏱ 2–4 Weeks",
    tools: ["figma", "slack", "notion", "meet"],
    video: "/images/showcase_design.png",
    ctaText: "Review Figma Work"
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: "⚙️",
    number: "03",
    accent: "#10B981",
    bgClass: "engineering",
    title: "Type-Safe Test-Driven Development",
    subtitle: "Our developers build in clean 2-week sprint cycles with TypeScript, 80%+ unit test coverage, and automated CI/CD staging builds so you watch progress in real-time.",
    bullets: [
      "Type-safe React / Next.js & Node.js codebases",
      "Rigorous Test-Driven Development (TDD)",
      "Weekly production-ready staging deployments",
      "Automated pull request pipelines & security scans"
    ],
    metricVal: "80%+",
    metricLbl: "Test Unit Coverage",
    badgeText: "⏱ 4–6 Weeks",
    tools: ["github", "vercel", "jira", "slack", "typescript"],
    video: "/images/showcase_engineering.png",
    ctaText: "Schedule a Live Demo"
  },
  {
    id: "launch",
    label: "Launch & Scale",
    icon: "🚀",
    number: "04",
    accent: "#EC4899",
    bgClass: "launch",
    title: "Zero-Downtime Launch & Monitoring",
    subtitle: "We perform Lighthouse audits, load tests at 10x peak traffic, set up zero-downtime hot reloads, and provide 30 days of proactive support with alerting standard.",
    bullets: [
      "Lighthouse performance optimization (>90 score)",
      "High-traffic scalability & database index tuning",
      "Blue-green zero-downtime cloud deployment",
      "24/7 proactive uptime alerting & log monitoring"
    ],
    metricVal: "95+",
    metricLbl: "Lighthouse Speed Score",
    badgeText: "⏱ 1–2 Weeks",
    tools: ["aws", "cloudflare", "stripe", "datadog"],
    video: "/images/showcase_launch.png",
    ctaText: "Prepare Your Launch"
  }
];

const ToolIcon: React.FC<{ tool: string }> = ({ tool }) => {
  switch (tool) {
    case "figma":
      return (
        <div className="tool-badge-item" title="Figma">
          <svg viewBox="0 0 38 57" width="14" height="21" fill="none">
            <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z" fill="#F24E1E"/>
            <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5C0 33.75 4.25 38 9.5 38H19V19Z" fill="#A259FF"/>
            <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 38H28.5C33.75 38 38 33.75 38 28.5C38 23.25 33.75 19 28.5 19H19V38Z" fill="#1ABCFE"/>
            <path d="M38 9.5C38 4.25 33.75 0 28.5 0H19V19H28.5C33.75 19 38 14.75 38 9.5Z" fill="#FF7262"/>
          </svg>
          <span>Figma</span>
        </div>
      );
    case "slack":
      return (
        <div className="tool-badge-item" title="Slack">
          <svg viewBox="0 0 100 100" width="18" height="18">
            <path d="M22.5 37.5c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5 3.4-7.5 7.5-7.5h7.5v7.5zm5 0c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5v17.5c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5V37.5z" fill="#E01E5A"/>
            <path d="M37.5 77.5c-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5 7.5 3.4 7.5 7.5v7.5h-7.5zm0-5c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5V92.5c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5V72.5z" fill="#36C5F0"/>
            <path d="M77.5 62.5c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5h-7.5v-7.5zm-5 0c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5V45c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5v17.5z" fill="#2EB67D"/>
            <path d="M62.5 22.5c4.1 0 7.5 3.4 7.5 7.5s-3.4 7.5-7.5 7.5-7.5-3.4-7.5-7.5v-7.5h7.5zm0 5c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5V7.5C55 3.4 58.4 0 62.5 0s7.5 3.4 7.5 7.5v20z" fill="#ECB22E"/>
          </svg>
          <span>Slack</span>
        </div>
      );
    case "notion":
      return (
        <div className="tool-badge-item" title="Notion">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M4.2 3h15.6c1.2 0 2.2 1 2.2 2.2v13.6c0 1.2-1 2.2-2.2 2.2H4.2C3 21 2 20 2 18.8V5.2C2 4 3 3 4.2 3zm.8 3.8v10.4h14V6.8H5zM8.5 9h1v4.3L12.7 9h1.3v6h-1v-4.3L9.8 15H8.5V9z"/>
          </svg>
          <span>Notion</span>
        </div>
      );
    case "meet":
      return (
        <div className="tool-badge-item" title="Google Meet">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span>Meet</span>
        </div>
      );
    case "github":
      return (
        <div className="tool-badge-item" title="GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <span>GitHub</span>
        </div>
      );
    case "vercel":
      return (
        <div className="tool-badge-item" title="Vercel">
          <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
            <path d="M256 48L496 464H16Z"/>
          </svg>
          <span>Vercel</span>
        </div>
      );
    case "aws":
      return (
        <div className="tool-badge-item" title="AWS">
          <svg viewBox="0 0 100 100" width="18" height="18" fill="currentColor">
            <path d="M48.2 62.4c-6.1 0-11-2-13.4-5.3-2.1-2.9-2.5-6.6-2.5-12.7 0-6.1.5-9.6 2.5-12.5 2.4-3.4 7.3-5.3 13.4-5.3 6 0 10.9 2 13.3 5.3 2.1 2.9 2.5 6.4 2.5 12.5s-.4 9.8-2.5 12.7c-2.4 3.3-7.3 5.3-13.3 5.3zm.1-30.8c-3.1 0-5.5 1.5-6.6 4.2-1.1 2.8-1.2 7-1.2 11.6s.1 8.9 1.2 11.7c1.1 2.7 3.5 4.1 6.6 4.1 3 0 5.4-1.4 6.5-4.1 1.1-2.8 1.2-7.1 1.2-11.7 0-4.6-.1-8.8-1.2-11.6-1.1-2.7-3.5-4.2-6.5-4.2zM80 61.2V32.9H74v21.5L64.2 32.9h-6.2v28.3h5.9V39.7l9.8 21.5H80z" fill="currentColor"/>
            <path d="M23.1 53c0 2.2.4 3.7 1.3 4.5.8.8 2.2 1.1 4.1 1.1 2.3 0 4.1-.7 5.2-2.1.8-1.1 1-2.6 1-4.7v-2.3c0-2-.2-3.4-1-4.5-1.1-1.4-2.8-2.1-5.2-2.1-2 0-3.3.3-4.1 1.1-.9.8-1.3 2.3-1.3 4.5V53z" fill="currentColor" opacity="0.3"/>
          </svg>
          <span>AWS</span>
        </div>
      );
    case "jira":
      return (
        <div className="tool-badge-item" title="Jira">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M11.75 2C10.78 2 10 2.78 10 3.75V8.5h3.75c.97 0 1.75-.78 1.75-1.75V3.75C15.5 2.78 14.72 2 13.75 2h-2zm-6 6C4.78 8 4 8.78 4 9.75V14.5h3.75c.97 0 1.75-.78 1.75-1.75V9.75C9.5 8.78 8.72 8 7.75 8h-2zm12 0c-.97 0-1.75.78-1.75 1.75V14.5h3.75c.97 0 1.75-.78 1.75-1.75V9.75C21.5 8.78 20.72 8 19.75 8h-2zm-6 6c-.97 0-1.75.78-1.75 1.75V20.25c0 .97.78 1.75 1.75 1.75h2c.97 0 1.75-.78 1.75-1.75v-4.5H11.75z"/>
          </svg>
          <span>Jira</span>
        </div>
      );
    case "typescript":
      return (
        <div className="tool-badge-item" title="TypeScript">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6"/>
            <text x="18" y="19" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="end">TS</text>
          </svg>
          <span>TS</span>
        </div>
      );
    case "stripe":
      return (
        <div className="tool-badge-item" title="Stripe">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M13.93 10.09c0-1.07-.86-1.57-2.35-1.57-1.63 0-3.32.53-4.52 1.18V5.37C8.42 4.7 10.37 4.3 12.02 4.3c3.84 0 6.24 1.95 6.24 5.37 0 5.2-7.14 5.82-7.14 7.84 0 .96.9 1.44 2.37 1.44 1.9 0 3.82-.67 5.17-1.4v4.45c-1.45.67-3.52 1.07-5.32 1.07-3.9 0-6.52-1.95-6.52-5.46.01-5.26 7.11-5.91 7.11-7.52z"/>
          </svg>
          <span>Stripe</span>
        </div>
      );
    case "cloudflare":
      return (
        <div className="tool-badge-item" title="Cloudflare">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M22.5 12.5c-.3 0-.6.1-.8.2C21.1 9.4 18.2 7 14.8 7c-.6 0-1.2.1-1.7.3C12.1 5 9.3 3 6 3 2.7 3 0 5.7 0 9c0 .7.1 1.4.4 2-.2.2-.4.5-.4.8 0 1.2 1 2.2 2.2 2.2h20.3c.8 0 1.5-.7 1.5-1.5s-.7-1-1.5-1z"/>
          </svg>
          <span>Cloudflare</span>
        </div>
      );
    case "datadog":
      return (
        <div className="tool-badge-item" title="Datadog">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-2h2v2zm0-4H11V7h2v5z"/>
          </svg>
          <span>Datadog</span>
        </div>
      );
    default:
      return null;
  }
};

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll listener to update the active tab button based on which card is currently sticky at top
  useEffect(() => {
    const handleScroll = () => {
      const cardElements = document.querySelectorAll(".process-card-showcase");
      let activeIdx = 0;
      const threshold = 145; // Trigger line slightly below sticky top offset

      cardElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          activeIdx = idx;
        }
      });
      setActiveStep(activeIdx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Local Scroll Reveal Observer to keep 'visible' state across React re-renders
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (idx: number) => {
    const cardElements = document.querySelectorAll(".process-card-showcase");
    const targetCard = cardElements[idx];
    if (targetCard) {
      // Offset target by sticky header height (navbar + tabs header)
      const yOffset = -130;
      const y = targetCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveStep(idx);
    }
  };

  return (
    <div ref={sectionRef} className="process-section-wrapper" id="processTimeline">
      <div className="process-inner-container">
        
        {/* HEADER */}
        <div className={`process-head-showcase reveal ${hasRevealed ? "visible" : ""}`}>
          <div className="process-eyebrow-showcase">Our 4-Phase Framework</div>
          <h2 className="process-title-showcase">
            From Brief to <em>Live & Scaling</em>
          </h2>
          <p className="process-desc-showcase">
            We build high-performance products using a state-of-the-art interactive development delivery system. Each phase yields clear, measurable output.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className={`process-tabs-nav reveal ${hasRevealed ? "visible" : ""}`}>
          {tabData.map((tab, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={tab.id}
                className={`process-tab-btn ${isActive ? "active" : ""}`}
                style={{
                  "--tab-accent": tab.accent,
                } as React.CSSProperties}
                onClick={() => handleTabClick(idx)}
              >
                <span className="process-tab-btn-icon">{tab.icon}</span>
                <span className="process-tab-btn-lbl">
                  <span className="process-tab-btn-num">{tab.number}</span>
                  {tab.label}
                </span>
                {isActive && <div className="process-tab-btn-indicator" />}
              </button>
            );
          })}
        </div>

        {/* CAPABILITY SHOWCASE STACK */}
        <div className="process-cards-stack">
          {tabData.map((card, idx) => {
            const cardStyle = {
              ["--card-index" as any]: idx,
            };

            return (
              <div
                key={card.id}
                className={`process-card-showcase ${card.bgClass} reveal ${hasRevealed ? "visible" : ""}`}
                data-index={idx}
                style={cardStyle as React.CSSProperties}
              >
                {/* Left Column (Content) */}
                <div className="process-showcase-left">
                  <TrailBadge 
                    text={`${card.number} / ${card.label.toUpperCase()} PHASE`} 
                    color={card.accent} 
                    direction="left"
                    className="mb-4"
                  />
                  
                  <h3 className="process-showcase-h3">{card.title}</h3>
                  <p className="process-showcase-subtitle">{card.subtitle}</p>

                  {/* Checklist */}
                  <ul className="process-showcase-checklist">
                    {card.bullets.map((bullet, i) => (
                      <li key={i} className="process-showcase-checklist-item">
                        <span className="chk-icon" style={{ borderColor: card.accent }}>
                          <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke={card.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6l3 3 5-7" />
                          </svg>
                        </span>
                        <span className="chk-lbl">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools Stack */}
                  <div className="process-showcase-tools">
                    <span className="tools-title">TOOLS WE USE:</span>
                    <div className="tools-badges-row">
                      {card.tools.map((t) => (
                        <ToolIcon key={t} tool={t} />
                      ))}
                    </div>
                  </div>

                  {/* Metric Banner & Action */}
                  <div className="process-showcase-bottom">
                    <div className="metric-spotlight-box">
                      <span className="metric-val" style={{ color: card.accent }}>
                        {card.metricVal}
                      </span>
                      <span className="metric-lbl">{card.metricLbl}</span>
                    </div>
                    
                    <a
                      href="/schedule-meeting"
                      className="showcase-cta-btn"
                      style={{
                        background: card.accent,
                        boxShadow: `0 6px 20px rgba(${card.accent === "#3B82F6" ? "59,130,246" : card.accent === "#F97316" ? "249,115,22" : card.accent === "#10B981" ? "16,185,129" : "236,72,153"}, 0.3)`
                      }}
                    >
                      {card.ctaText}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </a>
                  </div>

                </div>

                {/* Right Column (Visual Asset) */}
                <div className="process-showcase-right">
                  {/* Glowing Orb Background */}
                  <div className="showcase-visual-glow" style={{ background: card.accent }} />
                  
                  {/* Float Container */}
                  <div className="showcase-image-wrapper">
                    <img
                      src={card.video}
                      alt={card.title}
                      className="showcase-video"
                    />
                  </div>
                  
                  {/* Floating shadow */}
                  <div className="showcase-shadow" />
                  
                  {/* Phase duration badge */}
                  <div className="showcase-duration-badge">
                    {card.badgeText}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Process;
