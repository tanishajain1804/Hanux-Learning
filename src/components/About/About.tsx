import React, { useEffect, useState } from "react";
import { TrailBadge } from "../Common/TrailBadge";
import "./About.css";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1200, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      const current = Math.round(startValue + easeProgress * (endValue - startValue));
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
};

export const About: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    { num: 50, suffix: "+", label: "Projects Shipped" },
    { num: 98, suffix: "%", label: "On-Time Delivery" },
    { num: 2, suffix: "M+", label: "End Users Served" },
    { num: 6, suffix: "yr", label: "In the Industry" }
  ];

  const values = [
    {
      icon: "🎯",
      label: "Outcome-First Thinking",
      desc: "We optimise for your business metrics, not lines of code"
    },
    {
      icon: "🔒",
      label: "Security by Default",
      desc: "OWASP top 10 hardening on every build"
    },
    {
      icon: "📡",
      label: "Radical Transparency",
      desc: "Shared dashboards — no black-box development"
    },
    {
      icon: "⚡",
      label: "Speed Without Shortcuts",
      desc: "CI/CD + thorough testing aren't opposites"
    }
  ];

  return (
    <section id="about" className="about-section-wrapper">
      <div className="about-inner-container">
        <div className="about-grid">
          
          {/* Left Column - Stats and Track Record Card */}
          <div className="about-visual reveal reveal-left">
            <div className="about-watermark">HX</div>
            
            <div className="about-card-container">
              <div className="about-card-header">
                <span className="about-card-header-dot"></span>
                <span className="about-card-header-title">Our Track Record</span>
              </div>
              
              <div className="about-stat-grid">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="about-stat-box"
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="about-stat-num">
                       <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                    </div>
                    <div className="about-stat-label">{stat.label}</div>
                    
                    {/* Glowing highlight border on hover */}
                    <div className={`about-stat-glow ${hoveredCard === idx ? 'active' : ''}`} />
                  </div>
                ))}
              </div>

              {/* Floating Certificate Badge */}
              <div className="about-floating-badge">
                <div className="about-badge-sparkle">⭐</div>
                <div className="about-badge-text-group">
                  <div className="about-badge-bold">Top Rated Agency</div>
                  <div className="about-badge-light">2023 & 2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text & Core Values */}
          <div className="about-text-side reveal reveal-right">
            <TrailBadge text="Who We Are" color="#2563eb" direction="left" />
            
            <h2 className="about-headline">
              Built by Engineers,<br />
              <span className="about-headline-gradient">Led by Outcomes</span>
            </h2>
            
            <p className="about-lead">
              HanuxTech is a full-service technology studio where senior engineers and product designers work as one team — not in silos. Every project gets a dedicated tech lead who owns quality end-to-end.
            </p>

            {/* Redesigned Value Rows */}
            <div className="about-values-list">
              {values.map((val, idx) => (
                <div key={idx} className="about-value-card">
                  <div className="about-value-icon-box">
                    <span>{val.icon}</span>
                  </div>
                  <div className="about-value-content">
                    <span className="about-value-name">{val.label}</span>
                    <span className="about-value-details">{val.desc}</span>
                  </div>
                  <div className="about-value-hover-line" />
                </div>
              ))}
            </div>

            {/* Redesigned CTA Button */}
            <div className="about-cta-container">
              <a href="/contact" className="about-btn-glowing">
                <span>Work With Us</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
