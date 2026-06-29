import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Lock, 
  Calendar, 
  Zap, 
  MessageCircle, 
  MapPin 
} from "lucide-react";
import "./Contact.css";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer: "MVPs are typically delivered in 6–12 weeks. Enterprise platforms run 3–6 months with phased sprints and weekly deliverables. We scope accurately upfront so there are no timeline surprises."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely. Over 60% of our clients are based outside India — across the US, UK, UAE, and Europe. We operate across timezones with async-first communication and weekly video syncs."
  },
  {
    question: "What engagement models do you offer?",
    answer: "We offer three models: Fixed-price for well-defined projects, Time & Materials for evolving scopes, and Dedicated Team for long-term partnerships. We'll recommend the best fit after our first call."
  },
  {
    question: "Will my source code be mine?",
    answer: "100% yes. Upon project completion and final payment, full IP and source code ownership transfers to you. We sign NDAs before any project begins."
  },
  {
    question: "Do you handle post-launch support?",
    answer: "Yes — we offer 90-day post-launch warranty on all projects. After that, flexible support retainers are available for bug fixes, feature additions, and ongoing maintenance."
  },
  {
    question: "What's your tech stack?",
    answer: "React, Next.js, React Native, Flutter, Node.js, Python, AWS, Firebase, PostgreSQL, and more. We choose the right stack for your product — not just the trendy one."
  }
];

export const Contact: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Service needed");
  const [budget, setBudget] = useState("Budget range");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("success");
      
      // Clear fields
      setName("");
      setEmail("");
      setPhone("");
      setService("Service needed");
      setBudget("Budget range");
      setMessage("");

      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    }, 1500);
  };

  const getButtonText = () => {
    if (formStatus === "sending") return "Sending…";
    if (formStatus === "success") return "✓ Message sent! We'll reply within 24h";
    return "Send Message →";
  };

  return (
    <div className="contact-page-light">
      <Navbar />

      {/* Background decorations */}
      <div className="bg-layer">
        <div className="bg-grid"></div>
        <div className="bg-blob1"></div>
        <div className="bg-blob2"></div>
        <div className="bg-blob3"></div>
        
        {/* Decorative Rings */}
        <svg className="bg-rings" width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ opacity: 0.18 }}>
          <circle cx="90" cy="90" r="70" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="6 4"/>
          <circle cx="90" cy="90" r="48" stroke="#D4537E" strokeWidth="0.5" strokeDasharray="4 6"/>
          <circle cx="90" cy="90" r="26" stroke="#534AB7" strokeWidth="0.5"/>
          <circle cx="90" cy="90" r="6" fill="#534AB7" opacity="0.4"/>
        </svg>

        {/* Scattered Dots */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.25 }}>
          <circle cx="5%" cy="30%" r="3" fill="#534AB7"/>
          <circle cx="92%" cy="20%" r="2" fill="#D4537E"/>
          <circle cx="15%" cy="70%" r="2.5" fill="#1D9E75"/>
          <circle cx="80%" cy="75%" r="2" fill="#534AB7"/>
          <circle cx="50%" cy="12%" r="2" fill="#EF9F27"/>
          <circle cx="35%" cy="88%" r="2.5" fill="#D4537E"/>
          <circle cx="70%" cy="50%" r="1.5" fill="#534AB7"/>
          <circle cx="25%" cy="45%" r="2" fill="#1D9E75"/>
        </svg>
      </div>

      <main className="flex-grow pt-24 wrap">
        {/* HERO STRIP */}
        <div className="hero-strip">
          <div className="hs-badge">
            <div className="hs-dot"></div>
            <span style={{ fontSize: "10px", fontWeight: 600, color: "#534AB7", letterSpacing: ".1em" }}>
              GET IN TOUCH — WE REPLY IN &lt;24H
            </span>
          </div>
          <h1 className="hs-title">Let's build something<br />remarkable together</h1>
          <p className="hs-sub">Drop us a message and our solution architects will draft a free estimate within 24 hours — no strings attached.</p>
        </div>

        {/* MAIN 2-COL */}
        <div className="main-grid">
          {/* FAQ SIDE */}
          <div className="faq-side">
            <div className="faq-label">Questions you probably have</div>
            <h2 className="faq-headline">Got <em>doubts?</em><br />We've got answers.</h2>
            
            <div className="faq-list">
              {faqList.map((item, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className={`faq-item ${isOpen ? "open" : ""}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="faq-q">
                      <div className="faq-q-text">{item.question}</div>
                      <div className="faq-toggle">+</div>
                    </div>
                    <div className="faq-ans">
                      <div className="faq-ans-inner">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="form-side">
            <div className="form-card">
              <div className="form-top">
                <div className="form-live">
                  <div className="form-live-dot"></div>We're online — typically reply in &lt;2 hrs
                </div>
                <h2 className="form-headline">Ready to kickstart<br /><span>your next product?</span></h2>
                <p className="form-sub">Send us your requirements — our architects will draft an estimation within 24 hours, free.</p>
              </div>

              <form onSubmit={handleSend} className="form-fields">
                <div className="finp-wrap">
                  <span className="finp-icon"><User size={15} strokeWidth={2} /></span>
                  <input 
                    className="finp" 
                    placeholder="Your full name" 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="finp-wrap">
                  <span className="finp-icon"><Mail size={15} strokeWidth={2} /></span>
                  <input 
                    className="finp" 
                    placeholder="Work email address" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="finp-wrap">
                  <span className="finp-icon"><Phone size={15} strokeWidth={2} /></span>
                  <input 
                    className="finp" 
                    placeholder="Phone number (optional)" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="select-row">
                  <select 
                    className="fselect"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="Service needed">Service needed</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="SaaS Product">SaaS Product</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="CRM Solutions">CRM Solutions</option>
                  </select>

                  <select 
                    className="fselect"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Budget range">Budget range</option>
                    <option value="Under $5K">Under $5K</option>
                    <option value="$5K – $20K">$5K – $20K</option>
                    <option value="$20K – $50K">$20K – $50K</option>
                    <option value="$50K+">$50K+</option>
                  </select>
                </div>

                <div className="finp-wrap">
                  <span className="finp-icon ta-icon"><MessageSquare size={15} strokeWidth={2} /></span>
                  <textarea 
                    className="finp" 
                    placeholder="Tell us about your project — the more context, the better our response…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-send"
                  disabled={formStatus === "sending"}
                  style={{
                    background: formStatus === "success" ? "linear-gradient(135deg, #1D9E75, #159960)" : undefined,
                    opacity: formStatus === "sending" ? 0.8 : 1
                  }}
                >
                  {getButtonText()}
                </button>
              </form>

              <div className="form-trust">
                <div className="trust-item"><span className="trust-ico"><Lock size={12} strokeWidth={2.2} /></span>100% confidential</div>
                <div className="trust-item"><span className="trust-ico"><Calendar size={12} strokeWidth={2.2} /></span>Free consultation</div>
                <div className="trust-item"><span className="trust-ico"><Zap size={12} strokeWidth={2.2} /></span>24h response</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="info-strip">
          <div className="info-card">
            <div className="info-ico" style={{ background: "rgba(83, 74, 183, 0.1)", color: "#534AB7" }}>
              <Mail size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="info-label">Email us</div>
              <div className="info-val">hello@hanuxtech.com</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-ico" style={{ background: "rgba(29, 158, 117, 0.1)", color: "#1D9E75" }}>
              <MessageCircle size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="info-label">WhatsApp</div>
              <div className="info-val">+91 98765 43210</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-ico" style={{ background: "rgba(212, 83, 126, 0.1)", color: "#D4537E" }}>
              <MapPin size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="info-label">Head office</div>
              <div className="info-val">Bengaluru, India</div>
            </div>
          </div>
        </div>

        {/* RESPONSE BADGE */}
        <div className="resp-badge">
          <div className="rb-icon" style={{ color: "#1D9E75" }}>
            <Zap size={22} strokeWidth={2} fill="#1D9E75" />
          </div>
          <div className="rb-text">
            <strong>Lightning-fast response time</strong>
            <span>Our team is active Mon–Sat, 9 AM – 8 PM IST. We also monitor after hours for urgent requests.</span>
          </div>
          <div className="rb-time">
            <div className="rb-num">&lt;24h</div>
            <div className="rb-unit">avg reply time</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
