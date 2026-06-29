import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";
import { TrailBadge } from "../../Common/TrailBadge";
import { 
  ArrowRight, 
  Video, 
  BookOpen, 
  FileText, 
  Star,
  CheckCircle2, 
  Smartphone,
  Globe,
  Sparkles,
  PlayCircle
} from "lucide-react";
import "./EdtechPage.css";

// Dynamic Count-Up hook / subcomponent
const Counter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = target;
          const totalSteps = 60;
          const stepTime = Math.max(duration / totalSteps, 16);
          const increment = Math.ceil(end / totalSteps);
          
          const timer = setInterval(() => {
            start = Math.min(start + increment, end);
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}</span>;
};

// Customized SVGs for character cards from IndustryDetailPage
const StressedCharacter: React.FC = () => (
  <svg viewBox="0 0 100 100" className="avatar-character-svg">
    <path d="M50 48 V75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="33" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
    <path d="M45 20 Q48 18 50 20 M52 20 Q54 18 55 20" stroke="#0f172a" strokeWidth="2" fill="none" />
    <path d="M38 30 Q35 32 36 35" stroke="#10b981" strokeWidth="2.5" fill="none" />
    <path d="M34 50 Q36 34 43 32" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M66 50 Q64 34 57 32" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 48 C44 48 40 65 42 70 H58 C60 65 56 48 56 48 Z" fill="#d1fae5" stroke="#0f172a" strokeWidth="2.5" />
    <circle cx="48" cy="55" r="1.5" fill="#10b981" />
    <circle cx="52" cy="55" r="1.5" fill="#10b981" />
    <circle cx="50" cy="62" r="1.5" fill="#10b981" />
    <path d="M46 75 V95" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 75 V95" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M47 33 H53" stroke="#0f172a" strokeWidth="1.5" />
  </svg>
);

const ActiveCharacter: React.FC = () => (
  <svg viewBox="0 0 100 100" className="avatar-character-svg">
    <path d="M50 48 V75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="33" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
    <path d="M38 52 Q34 60 38 65" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M62 52 Q68 45 74 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M42 48 C42 48 38 62 42 72 H58 C62 62 58 48 58 48 Z" fill="#10b981" stroke="#0f172a" strokeWidth="2.5" />
    <path d="M46 75 V95" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 75 V95" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="48" cy="32" r="1" fill="#0f172a" />
    <circle cx="52" cy="32" r="1" fill="#0f172a" />
    <path d="M48 36 Q50 38 52 36" stroke="#0f172a" strokeWidth="1.5" fill="none" />
  </svg>
);

const GrowingCharacter: React.FC = () => (
  <svg viewBox="0 0 100 100" className="avatar-character-svg">
    <path d="M50 48 V75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="55" cy="31" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
    <path d="M44 52 Q35 48 30 55" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M64 54 Q72 60 76 66" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 48 C44 48 40 68 45 74 H62 C65 68 60 48 60 48 Z" fill="#059669" stroke="#0f172a" strokeWidth="2.5" />
    <path d="M46 74 Q40 82 48 92" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M58 74 Q64 84 54 94" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="53" cy="30" r="1" fill="#0f172a" />
    <circle cx="57" cy="30" r="1" fill="#0f172a" />
    <path d="M53 34 Q55 36 57 34" stroke="#0f172a" strokeWidth="1.5" fill="none" />
  </svg>
);

export const EdtechPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check after short delay
    setTimeout(() => {
      handleScroll();
      setAnimatedBars(true);
    }, 150);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="edtech-page">
      {/* Background decorations */}
      <div className="bg-decorations">
        <div className="bg-grid" />
        <div className="blob1" />
        <div className="blob2" />
      </div>

      {/* Scroll Progress Indicator */}
      <div className="page-progress">
        <div className="page-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      {/* Breadcrumbs */}
      <div className="breadcrumb">
        <a href="/">HOME</a> / <a href="/industries">INDUSTRIES</a> / <span>EDTECH</span>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-blur" />
        <div className="hero-left reveal">
          <div className="hero-pill">🎓 EdTech Specialists</div>
          <h1>
            Best <span className="accent">EdTech</span> Software Development in Noida
          </h1>
          <p className="hero-sub">
            Build immersive learning management systems (LMS), virtual classrooms, and educational software designed for modern schools and universities.
          </p>
          <div className="hero-actions">
            <a href="/schedule-meeting" className="btn-primary py-3.5 px-8 text-base">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/projects" className="btn-ghost py-3.5 px-6 text-base">
              View Case Studies
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">
                <Counter target={120} />+
              </div>
              <div className="hero-stat-label">EdTech Projects Delivered</div>
            </div>
            <div>
              <div className="hero-stat-num">
                <Counter target={98} />%
              </div>
              <div className="hero-stat-label">Student Engagement Rate</div>
            </div>
            <div>
              <div className="hero-stat-num">
                <Counter target={6} />+
              </div>
              <div className="hero-stat-label">Years Industry Experience</div>
            </div>
          </div>
        </div>

        {/* Right-side Spinning Orbital Graphics */}
        <div className="orbital-wrap reveal">
          <div className="orbit orbit-1">
            <div className="orb-node n1">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <div className="orb-label">LMS</div>
            </div>
            <div className="orb-node n2">
              <Video className="w-5 h-5 text-indigo-600" />
              <div className="orb-label">Video</div>
            </div>
            <div className="orb-node n3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <div className="orb-label">Quizzes</div>
            </div>
            <div className="orb-node n4">
              <span className="text-[10px] font-bold text-indigo-600 select-none">💯</span>
              <div className="orb-label">Grading</div>
            </div>
          </div>

          <div className="orbit orbit-2">
            <div className="orb-node n1">
              <span className="text-base select-none">🏫</span>
              <div className="orb-label">Classroom</div>
            </div>
            <div className="orb-node n2">
              <span className="text-base select-none">🎮</span>
              <div className="orb-label">Gamification</div>
            </div>
            <div className="orb-node n3">
              <PlayCircle className="w-5 h-5 text-indigo-600" />
              <div className="orb-label">Live Stream</div>
            </div>
            <div className="orb-node n4">
              <Smartphone className="w-4.5 h-4.5 text-indigo-600" />
              <div className="orb-label">Mobile</div>
            </div>
            <div className="orb-node n5">
              <Globe className="w-4.5 h-4.5 text-indigo-600" />
              <div className="orb-label">Portal</div>
            </div>
          </div>

          <div className="orbit orbit-3">
            <div className="orb-node n1">
              <span className="text-[10px] font-bold text-blue-600 select-none">Zoom</span>
            </div>
            <div className="orb-node n2">
              <span className="text-sm select-none">📊</span>
              <div className="orb-label">Tracking</div>
            </div>
            <div className="orb-node n3">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <div className="orb-label">Admissions</div>
            </div>
            <div className="orb-node n4">
              <span className="text-[10px] font-bold text-purple-600 select-none">AI</span>
            </div>
            <div className="orb-node n5">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
              <div className="orb-label">Analytics</div>
            </div>
          </div>

          <div className="orbital-center">Learn</div>

          {/* Floating metrics chips */}
          <div className="float-chip float-chip-top">
            <div className="chip-label">Monthly Active Learners</div>
            <div className="chip-val">48,921</div>
            <div className="chip-badge up">↑ 18.2%</div>
          </div>
          <div className="float-chip float-chip-mid">
            <div className="chip-label">Completion Rate</div>
            <div className="chip-val">92%</div>
            <div className="chip-badge up">✓ Verified</div>
          </div>
          <div className="float-chip float-chip-bot">
            <div className="chip-label">Class Video Uptime</div>
            <div className="chip-val">99.9%</div>
            <div className="chip-badge up">● Active</div>
          </div>
        </div>
      </section>

      {/* TRUST TICKER BAR */}
      <div className="trust-bar">
        <div className="ticker-track">
          {[1, 2].map((groupKey) => (
            <React.Fragment key={groupKey}>
              <div className="ticker-item hi">
                <span className="ticker-dot" />COPPA Compliant
              </div>
              <div className="ticker-item">
                <span className="ticker-dot" />FERPA Compliant
              </div>
              <div className="ticker-item hi">
                <span className="ticker-dot" />GDPR Ready
              </div>
              <div className="ticker-item">
                <span className="ticker-dot" />SOC 2 Certified
              </div>
              <div className="ticker-item hi">
                <span className="ticker-dot" />99.99% Video Uptime
              </div>
              <div className="ticker-item">
                <span className="ticker-dot" />SCORM Compliant
              </div>
              <div className="ticker-item hi">
                <span className="ticker-dot" />LTI Integrated
              </div>
              <div className="ticker-item">
                <span className="ticker-dot" />Real-Time Interactivity
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* EXPERTISE + STUDENT DASHBOARD */}
      <section style={{ padding: "40px 0" }}>
        <div className="section-card-3d">
          <div className="reveal">
            <TrailBadge text="OUR EXPERTISE" color="#2563eb" direction="left" className="mb-4" />
            <h2 className="section-title">
              Leading <span className="accent">EdTech</span> Development Company
            </h2>
          </div>

        <div className="expertise-grid">
          <div className="reveal">
            <p className="expertise-body">
              At HanuxTech, we assist institutions and edtech startups innovate in the rapidly expanding education environment by offering the best edtech software development services. Learning management systems, virtual classrooms, virtual labs, and student analytics portals are among our areas of competence.
            </p>
            <p className="expertise-body">
              We understand the intricacies of the education industry — high-concurrent video streaming, real-time interactive widgets, student progress tracking, and privacy compliance. Building safe, engaging, and accessible solutions is our core focus.
            </p>
            <div className="expertise-checks">
              {[
                "End-to-end LMS & virtual classroom engineering",
                "Live video streaming & interactive whiteboard integrations",
                "AI-powered personalized learning & smart quizzes",
                "Detailed student progress & analytics dashboards",
                "Regulatory compliance (COPPA, FERPA, GDPR)"
              ].map((checkText, idx) => (
                <div className="chk" key={idx}>
                  <div className="chk-icon">✓</div>
                  <span>{checkText}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive student dashboard cards */}
          <div className="client-dashboard-grid">
            {/* AT RISK STUDENT */}
            <div className="client-card-column reveal">
            <div 
              className="clay-client-card"
              style={{
                "--card-theme": "#ef4444",
                "--card-glow": "rgba(239, 68, 68, 0.18)"
              } as React.CSSProperties}
            >
                <div className="card-header">
                  <span className="card-badge">AT-RISK STUDENT</span>
                  <span className="health-pill pink">38</span>
                </div>
                <div className="client-avatar-row">
                  <div className="client-avatar-circle" style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="health-label-text">STUDENT ENGAGEMENT</span>
                    <span className="health-score-val">38</span>
                  </div>
                </div>
                <div className="card-metrics-list">
                  <div className="metric-row">
                    <span className="metric-lbl">Attendance Rate</span>
                    <span className="metric-val text-red-500">
                      <span className="indicator-dot red" /> 62%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Average Grade</span>
                    <span className="metric-val">D+</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Completed Quizzes</span>
                    <span className="metric-val text-red-500">4 / 10</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Missing Labs</span>
                    <span className="metric-val text-red-500">6 Labs</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Forum Discussions</span>
                    <span className="metric-val">1 Post</span>
                  </div>
                </div>
              </div>
              <div className="character-illustration-container">
                <StressedCharacter />
              </div>
              <div className="staggered-bar-container">
                <div 
                  className="staggered-bar-column red"
                  style={{ height: animatedBars ? "40%" : "0%" }}
                />
              </div>
            </div>

            {/* STEADY PROGRESS */}
            <div className="client-card-column reveal">
              <div 
                className="clay-client-card"
                style={{
                  "--card-theme": "#f59e0b",
                  "--card-glow": "rgba(245, 158, 11, 0.18)"
                } as React.CSSProperties}
              >
                <div className="card-header">
                  <span className="card-badge">STEADY PROGRESS</span>
                  <span className="health-pill yellow">74</span>
                </div>
                <div className="client-avatar-row">
                  <div className="client-avatar-circle" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>
                    P
                  </div>
                  <div className="flex flex-col">
                    <span className="health-label-text">STUDENT ENGAGEMENT</span>
                    <span className="health-score-val">74</span>
                  </div>
                </div>
                <div className="card-metrics-list">
                  <div className="metric-row">
                    <span className="metric-lbl">Attendance Rate</span>
                    <span className="metric-val text-amber-500">
                      <span className="indicator-dot yellow" /> 91%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Average Grade</span>
                    <span className="metric-val">B</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Completed Quizzes</span>
                    <span className="metric-val">9 / 10</span>
                  </div>
                </div>
              </div>
              <div className="character-illustration-container">
                <ActiveCharacter />
              </div>
              <div className="staggered-bar-container">
                <div 
                  className="staggered-bar-column yellow"
                  style={{ height: animatedBars ? "65%" : "0%" }}
                />
              </div>
            </div>

            {/* HONORS CANDIDATE */}
            <div className="client-card-column reveal">
              <div 
                className="clay-client-card"
                style={{
                  "--card-theme": "#10b981",
                  "--card-glow": "rgba(16, 185, 129, 0.18)"
                } as React.CSSProperties}
              >
                <div className="card-header">
                  <span className="card-badge">HONORS CANDIDATE</span>
                  <span className="health-pill green">96</span>
                </div>
                <div className="client-avatar-row">
                  <div className="client-avatar-circle" style={{ backgroundColor: "#d1fae5", color: "#059669" }}>
                    C
                  </div>
                  <div className="flex flex-col">
                    <span className="health-label-text">STUDENT ENGAGEMENT</span>
                    <span className="health-score-val">96</span>
                  </div>
                </div>
                <div className="card-metrics-list">
                  <div className="metric-row">
                    <span className="metric-lbl">Attendance Rate</span>
                    <span className="metric-val text-emerald-500">
                      <span className="indicator-dot green" /> 99%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Average Grade</span>
                    <span className="metric-val">A+</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-lbl">Completed Quizzes</span>
                    <span className="metric-val">10 / 10</span>
                  </div>
                </div>
              </div>
              <div className="character-illustration-container">
                <GrowingCharacter />
              </div>
              <div className="staggered-bar-container">
                <div 
                  className="staggered-bar-column green"
                  style={{ height: animatedBars ? "90%" : "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* SERVICES GRID */}
      <section className="bg-white">
        <div className="section">
          <div className="reveal text-left">
            <TrailBadge text="WHAT WE BUILD" color="#2563eb" direction="left" className="mb-4" />
            <h2 className="section-title">
              Complete <span className="accent">EdTech</span> Solutions
            </h2>
            <p className="section-sub mb-10">
              From concept to classroom — every educational product type, engineered to perfection.
            </p>
          </div>

        <div className="services-grid">
          {[
            {
              icon: "📚",
              title: "Learning Management Systems",
              desc: "Custom LMS platforms, school management portals, course builders, and student information systems built for scale."
            },
            {
              icon: "🎥",
              title: "Virtual Classrooms",
              desc: "Real-time interactive classroom solutions, live video streaming, whiteboard widgets, and group chat systems."
            },
            {
              icon: "🤖",
              title: "AI Personalized Learning",
              desc: "Adaptive learning pathways, automated grading engines, smart recommendation tutors, and automated quiz generators."
            },
            {
              icon: "🎮",
              title: "Gamified Education",
              desc: "Quiz games, badge reward systems, progress levels, and interactive simulation dashboards to boost student retention."
            },
            {
              icon: "📊",
              title: "Student Analytics",
              desc: "Comprehensive performance reports, engagement matrices, drop-out risk prediction, and admin control panels."
            },
            {
              icon: "🏢",
              title: "Corporate Training Portals",
              desc: "Employee onboarding platforms, compliance certification trackers, skill path builders, and supervisor dashboards."
            }
          ].map((svc, idx) => (
            <div 
              className="service-card reveal" 
              key={idx}
              style={{
                "--industry-theme": "#7c3aed",
                "--industry-glow": "rgba(124, 58, 237, 0.2)"
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

      {/* TECH STACK SECTION */}
      <section className="tech-section">
        <div className="tech-inner text-left">
          <div className="reveal">
            <TrailBadge text="TECHNOLOGY STACK" color="#2563eb" direction="left" className="mb-4" />
            <h2 className="section-title">
              Built With <span className="accent">Industry-Grade</span> Tools
            </h2>
          </div>

          <div className="tech-grid mt-10">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="-11.5 -10.23 23 20.46">
                    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
                    <g stroke="#61DAFB" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                ),
                name: "React / Next.js"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#339933">
                    <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm-1 15.5l-5-2.8v-5.4l5 2.8v5.4zm2 0v-5.4l5-2.8v5.4l-5 2.8z"/>
                  </svg>
                ),
                name: "Node.js"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#3776AB"/>
                    <path d="M11 7V9H9V11H7V13H9V15H11V17H13V15H15V13H17V11H15V9H13V7H11z" fill="#FFE873"/>
                  </svg>
                ),
                name: "Python / Django"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2zM1 7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"/>
                    <path d="M9 12h6"/>
                    <circle cx="12" cy="12" r="2" fill="#38bdf8"/>
                  </svg>
                ),
                name: "WebRTC Streaming"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2496ED">
                    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.91 0h2.117c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186h-2.117c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.912 0h2.119c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186H8.16c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zm-2.91 0h2.12c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186H5.25c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zM8.16 8.162h2.119c.102 0 .185-.083.185-.185V6.074c0-.102-.083-.186-.185-.186H8.16c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zM11.07 8.162h2.119c.102 0 .186-.083.186-.185V6.074c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm0-2.913h2.119c.102 0 .186-.083.186-.185V3.161c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.903c0 .102.083.185.186.185zM15 22.8c-1.2.6-3 .9-4.2.9C5.4 23.7 0 20.1 0 12.6c0-1.8.6-3.6 1.8-5.1.3-.3.9-.3 1.2 0l1.2 1.2c.3.3.3.9 0 1.2C3.3 10.8 3 12 3 12.9c0 5.4 3.9 7.8 7.5 7.8 2.7 0 5.4-1.2 5.7-3.9h-8.7c-.3 0-.6-.3-.6-.6v-1.2c0-.3.3-.6.6-.6h14.7c.3 0 .6.3.6.6C22.8 19.8 19.2 21.9 15 22.8z"/>
                  </svg>
                ),
                name: "Docker"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#336791">
                    <path d="M12 2a10 10 0 0 0-10 10c0 4.54 3.03 8.38 7.18 9.57.17-.4.22-.84.22-1.24v-1.66c0-.52-.16-1.02-.46-1.44a5.955 5.955 0 0 1-.94-3.23c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.25-.38 2.41-.94 3.23-.3.42-.46.92-.46 1.44v-1.66c0 .4.05.84.22 1.24 4.15-1.19 7.18-5.03 7.18-9.57A10 10 0 0 0 12 2z"/>
                  </svg>
                ),
                name: "PostgreSQL"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D82C20">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 18.25l-7.75-3.87v-4.5L12 15.75l7.75-3.87v4.5L12 20.25zM4.25 10.38L12 14.25l7.75-3.87-7.75-3.88-7.75 3.88z"/>
                  </svg>
                ),
                name: "Redis"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF9900">
                    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4c-3.48 0-6.47 2.37-7.35 5.54A6 6 0 0 0 0 15c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                  </svg>
                ),
                name: "AWS / Cloud"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#326CE5">
                    <path d="M12 1.6l9 5.2v10.4l-9 5.2-9-5.2V6.8zM12 4.4L5.4 8.2v7.6l6.6 3.8 6.6-3.8V8.2z"/>
                  </svg>
                ),
                name: "Kubernetes"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF007A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                ),
                name: "HLS Streaming"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E10098">
                    <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 3.2L18.8 9.3v5.4L12 18.8l-6.8-4.1V9.3L12 5.2z"/>
                  </svg>
                ),
                name: "GraphQL"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFCA28">
                    <path d="M3.89 15.75L10.95 2.1a1.2 1.2 0 0 1 2.1 0l7.06 13.65a1.2 1.2 0 0 1-1.05 1.75H4.94a1.2 1.2 0 0 1-1.05-1.75z"/>
                  </svg>
                ),
                name: "Firebase"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F47A20">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                ),
                name: "Grafana"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6F00">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 14.5l-4-2.3v-4.4l4 2.3v4.4z"/>
                  </svg>
                ),
                name: "TensorFlow"
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="-11.5 -10.23 23 20.46">
                    <circle cx="0" cy="0" r="2.05" fill="#00d8ff"/>
                    <g stroke="#00d8ff" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                ),
                name: "React Native"
              }
            ].map((tech, idx) => (
              <div className="tech-pill reveal" key={idx}>
                <span className="tech-pill-icon select-none">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY PROCESS SECTION */}
      <section style={{ padding: "40px 0" }}>
        <div className="section-card-3d">
          <div className="reveal text-left">
            <TrailBadge text="HOW WE WORK" color="#2563eb" direction="left" className="mb-4" />
            <h2 className="section-title">
              Our <span className="accent">Proven</span> Delivery Process
            </h2>
            <p className="section-sub mb-10">
              A battle-tested methodology that takes you from idea to a live, compliant product — on time and on budget.
            </p>
          </div>

        <div className="process-steps">
          {[
            {
              num: "01",
              icon: "🔍",
              title: "Discovery & Scoping",
              desc: "Deep-dive into curriculum goals, student workflows, audio-video latency requirements, and compliance."
            },
            {
              num: "02",
              icon: "🎨",
              title: "Design & UX Prototyping",
              desc: "Wireframing user-friendly interfaces for students, teachers, and admins validated with educators."
            },
            {
              num: "03",
              icon: "⚙️",
              title: "Agile Engineering",
              desc: "Continuous integration, security compliance checks, high-performance streaming tests, and interactive demos."
            },
            {
              num: "04",
              icon: "🚀",
              title: "Deploy & Scale",
              desc: "Seamless deployment, load testing for peak class hours, 24/7 server monitoring, and ongoing updates."
            }
          ].map((step, idx) => (
            <div className="ps reveal" key={idx}>
              <div className="ps-num">{step.num}</div>
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
            <TrailBadge text="CLIENT STORIES" color="#2563eb" direction="left" className="mb-4" />
            <h2 className="section-title">
              Trusted by <span className="accent">EdTech</span> Leaders
            </h2>
          </div>

          <div className="testi-grid mt-10">
            {[
              {
                stars: 5,
                quote: "HanuxTech built our customized school portal in record time. The interactive features and video integration are flawless — our students love the remote classrooms.",
                initials: "AV",
                bgColor: "#1B4FD8",
                author: "Dr. Amit Verma",
                role: "Director, Spark Academy"
              },
              {
                stars: 5,
                quote: "Their gamification engine completely changed how our corporate learners interact with onboarding. Compliance completion rate jumped to 94% in a month.",
                initials: "SI",
                bgColor: "#7C3AED",
                author: "Sneha Iyer",
                role: "Head of L&D, FinCorp Services"
              },
              {
                stars: 5,
                quote: "The adaptive learning algorithms they implemented help us personalize paths for 20,000+ students. Outstanding engineering and project execution.",
                initials: "RP",
                bgColor: "#059669",
                author: "Rajesh Patel",
                role: "Founder, EduPath Tech"
              }
            ].map((testi, idx) => (
              <div className="testi-card reveal" key={idx}>
                <div className="testi-stars">
                  {Array.from({ length: testi.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-500 text-amber-500 inline-block mr-0.5" />
                  ))}
                </div>
                <p className="testi-quote">"{testi.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ backgroundColor: testi.bgColor, color: "#fff" }}>
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
            <h2>Need a Custom EdTech Solution?</h2>
            <p>We help schools, universities, and startups build modern, scalable learning platforms. Let's schedule a meeting to map your software scope.</p>
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

export default EdtechPage;
