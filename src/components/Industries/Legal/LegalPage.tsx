import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";
import { 
  ArrowRight,
  Star
} from "lucide-react";
import { industriesDataMap } from "../../../data/industriesData";
import { NotFound } from "../../../pages/NotFound";
import { TrailBadge } from "../../Common/TrailBadge";
import "../IndustryDetailPage.css";

// Local theme colors and metadata specific to this page
const themeColors = {
  primary: "#ec4899", secondary: "#f43f5e", lightBg: "#fce7f3", gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
};

const metaData = {
  stats: [["30+", "Law Firms Digitised"], ["50k+", "Contracts Automated"], ["45%", "Admin Time Saved"]] as [string, string][],
  trust: ["SOC 2 Certified ✓", "HIPAA Compliant ✓", "Bank-Grade Cryptography ✓", "Digital Signatures ✓", "Court Filing APIs ✓", "Time & Billing Sync ✓", "Conflict Check Automation ✓", "AI Contract Analysis ✓"],
  checks: ["Case & file management portals", "Automated legal document generation", "Secure time-tracking & invoice billing", "Conflict checks & compliance loops", "Electronic signature integrations"],
  h1: ["Legal ", "Technology", " Built for Modern Law Firms"] as [string, string, string]
};

import { IndustryCanvas } from "../IndustryCanvas";

export const LegalPage: React.FC = () => {
  const industryKey = "legal";
  const data = industriesDataMap[industryKey];
  const [scrollProgress, setScrollProgress] = useState(0);

  const badgeColor = themeColors.primary;

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger scroll check on initial mount
    setTimeout(() => {
      handleScroll();
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [industryKey]);

  if (!data) {
    return <NotFound />;
  }

  const breadcrumbParts = data.breadcrumb.split(" / ");
  const displayName = breadcrumbParts[breadcrumbParts.length - 1];

  return (
    <div 
      className="industry-detail-page"
      style={{
        "--primary-color": themeColors.primary,
        "--accent": themeColors.primary,
        "--accent2": themeColors.secondary,
        "--accent-soft": themeColors.lightBg,
        "--accent-gradient": themeColors.gradient,
        "--industry-theme": themeColors.primary,
        "--industry-glow": themeColors.primary + "33",
      } as React.CSSProperties}
    >
      {/* Background decorations */}
      <div className="bg-decorations">
        <div className="bg-grid" />
        <div className="blob1" />
        <div className="blob2" />
      </div>

      <div className="page-progress">
        <div className="page-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="industry-hero">
        <div className="industry-hero-grid">
          <div className="industry-hero-left reveal animate-scale-up">
            
            {/* Breadcrumb path */}
            <div className="breadcrumbs">
              {breadcrumbParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span className={index === breadcrumbParts.length - 1 ? "active-crumb" : ""}>{part}</span>
                  {index < breadcrumbParts.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-6">
              {metaData?.h1 ? metaData.h1[0] : "Best "}
              <span 
                className="hero-title-highlight font-extrabold"
                style={{
                  backgroundImage: themeColors.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                {metaData?.h1 ? metaData.h1[1] : displayName}
              </span>
              {metaData?.h1 ? metaData.h1[2] : " Software Development in Noida"}
            </h1>

            <p className="text-slate-500 text-[15px] md:text-base leading-relaxed max-w-xl">
              {data.tagline}
            </p>

            <div className="hero-actions">
              <a 
                href="/schedule-meeting"
                className="btn-primary py-3.5 px-8 text-base cursor-pointer"
                style={{ backgroundColor: themeColors.primary }}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </a>
              <a href="/projects" className="btn-ghost py-3.5 px-6 text-base cursor-pointer">
                View Case Studies
              </a>
            </div>

            {metaData && (
              <div className="stat-row">
                {metaData.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="stat-n" style={{ color: themeColors.primary }}>{stat[0]}</div>
                    <div className="stat-l">{stat[1]}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="industry-hero-right reveal animate-scale-up">
            <div className="vis-panel">
              <IndustryCanvas industryKey={data.key} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST TICKER BAR */}
      {metaData && (
        <div className="trust">
          <div className="t-track">
            {[1, 2].map((group) => (
              <React.Fragment key={group}>
                {metaData.trust.map((trustItem, idx) => (
                  <div key={`${group}-${idx}`} className="t-item">
                    <span className="t-dot" style={{ backgroundColor: themeColors.primary }} />
                    {trustItem}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Our Expertise / Demo Section */}
      <section style={{ padding: "40px 0" }}>
        <div className="section-card-3d">
          <div className="expertise-grid">
          <div className="expertise-left reveal">
            <TrailBadge text={data.eyebrow} color={badgeColor} direction="left" />
            <h2 className="expertise-title">{data.expertiseTitle}</h2>
            <div className="flex flex-col gap-5 mt-6">
              {data.expertiseParagraphs.map((para, idx) => (
                <p key={idx} className="expertise-desc">
                  {para}
                </p>
              ))}
            </div>
            {metaData && (
              <div className="chk-list">
                {metaData.checks.map((checkText, idx) => (
                  <div className="chk-item" key={idx}>
                    <div className="chk-icon" style={{ backgroundColor: themeColors.lightBg, color: themeColors.primary }}>✓</div>
                    <span>{checkText}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="expertise-right reveal">
            <div 
              className="pop-card-3d"
              style={{ 
                borderRadius: "20px", 
                padding: "32px",
                textAlign: "left",
                "--industry-theme": themeColors.primary,
                "--industry-glow": themeColors.primary + "33"
              } as React.CSSProperties}
            >
              {data.services.slice(0, 3).map((s, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: "flex", 
                    gap: "16px", 
                    marginBottom: idx === 2 ? "0" : "24px", 
                    paddingBottom: idx === 2 ? "0" : "24px", 
                    borderBottom: idx === 2 ? "none" : "1px solid rgba(0,0,0,0.06)" 
                  }}
                >
                  <div 
                    style={{ 
                      width: "44px", 
                      height: "44px", 
                      borderRadius: "12px", 
                      backgroundColor: "white", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "22px", 
                      flexShrink: 0 
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.5 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* SERVICES GRID */}
      <section className="bg-white">
        <div className="section">
          <div className="reveal text-left">
            <TrailBadge text="WHAT WE BUILD" color={themeColors.primary} direction="left" className="mb-4" />
            <h2 className="section-title">
              Complete <span className="accent">{displayName}</span> Solutions
            </h2>
            <p className="section-sub mb-10">
              From concept to deployment — every product type, engineered to perfection.
            </p>
          </div>

        <div className="services-grid">
          {data.services.map((svc, idx) => (
            <div 
              className="service-card reveal" 
              key={idx}
              style={{
                "--industry-theme": themeColors.primary,
                "--industry-glow": themeColors.primary + "33"
              } as React.CSSProperties}
            >
              <div className="svc-icon select-none">{svc.icon}</div>
              <div className="svc-title">{svc.title}</div>
              <div className="svc-desc">{svc.desc}</div>
              <a href="/schedule-meeting" className="svc-more">
                Explore <ArrowRight className="w-3.5 h-3.5 inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* DELIVERY PROCESS SECTION */}
      <section style={{ padding: "40px 0" }}>
        <div className="section-card-3d">
          <div className="reveal text-left">
            <TrailBadge text="HOW WE WORK" color={themeColors.primary} direction="left" className="mb-4" />
            <h2 className="section-title">
              Our <span className="accent">Proven</span> Delivery Process
            </h2>
            <p className="section-sub mb-10">
              A battle-tested methodology that takes you from idea to a live, compliant product — on time and on budget.
            </p>
          </div>

        <div className="process-steps">
          {data.steps.map((step, idx) => (
            <div className="ps reveal" key={idx}>
              <div className="ps-num">{`0${idx + 1}`}</div>
              <div className="ps-icon-wrap select-none">{step.icon}</div>
              <div className="ps-title">{step.title}</div>
              <div className="ps-desc">{step.desc}</div>
              <div className="ps-line" />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-surface2" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div className="reveal text-left">
            <TrailBadge text="CLIENT STORIES" color={themeColors.primary} direction="left" className="mb-4" />
            <h2 className="section-title">
              What Our Clients <span className="accent">Say</span>
            </h2>
          </div>

          <div className="testi-grid mt-10">
            {data.testimonials.map((testi, idx) => (
              <div className="testi-card reveal" key={idx}>
                <div className="testi-stars">
                  {Array.from({ length: testi.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-500 text-amber-500 inline-block mr-0.5" />
                  ))}
                </div>
                <p className="testi-quote">"{testi.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ backgroundColor: testi.color || themeColors.primary, color: "#fff" }}>
                    {testi.initials}
                  </div>
                  <div className="text-left">
                    <div className="testi-name">{testi.author}</div>
                    <div className="testi-role">{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band reveal">
        <div className="cta-inner">
          <div className="cta-text text-left">
            <h2>{data.ctaTitle}</h2>
            <p>{data.ctaDesc}</p>
          </div>
          <div className="cta-actions">
            <a href="/schedule-meeting" className="btn-white">
              Schedule a Meeting <ArrowRight className="w-4 h-4 inline ml-1" />
            </a>
            <a href="/projects" className="btn-outline-white">
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalPage;
