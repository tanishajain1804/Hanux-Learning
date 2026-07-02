import React, { useState, useEffect, useRef } from "react";
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

interface CountryCode {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
];

const getPhoneConfig = (countryCode: string) => {
  switch (countryCode) {
    case "US":
    case "CA":
      return { placeholder: "(555) 000-0000", maxLength: 14 };
    case "IN":
      return { placeholder: "98765 43210", maxLength: 11 };
    case "GB":
      return { placeholder: "7911 123456", maxLength: 11 };
    case "AU":
      return { placeholder: "412 345 678", maxLength: 11 };
    default:
      return { placeholder: "98765 43210", maxLength: 15 };
  }
};

const formatPhoneNumber = (val: string, countryCode: string) => {
  const digits = val.replace(/\D/g, "");
  if (countryCode === "US" || countryCode === "CA") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  if (countryCode === "IN") {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }
  if (countryCode === "GB") {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
  }
  if (countryCode === "AU") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3, 6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ").slice(0, 15);
};

export const Contact: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]); // default to India
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [service, setService] = useState("Service needed");
  const [budget, setBudget] = useState("Budget range");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handlePhoneInputChange = (val: string) => {
    const formatted = formatPhoneNumber(val, selectedCountry.code);
    setPhoneNumber(formatted);
    setPhone(`${selectedCountry.dial} ${formatted}`);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    const formatted = formatPhoneNumber(phoneNumber, country.code);
    setPhoneNumber(formatted);
    setPhone(`${country.dial} ${formatted}`);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setFormStatus("sending");

    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          serviceName: service !== "Service needed" ? `Contact Page - ${service}` : "General Contact Inquiry",
          projectDetails: `Phone: ${phone}\nBudget: ${budget}\nMessage: ${message}`
        })
      });
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (err: any) {
      console.error("Failed to submit contact form:", err);
      alert(`Error submitting form: ${err.message}. Please ensure the backend server is running on Port 5000 and matches the dynamic network IP.`);
    }

    setFormStatus("success");
    
    // Clear fields
    setName("");
    setEmail("");
    setPhone("");
    setPhoneNumber("");
    setSelectedCountry(countryCodes[0]);
    setIsDropdownOpen(false);
    setSearchQuery("");
    setService("Service needed");
    setBudget("Budget range");
    setMessage("");

    setTimeout(() => {
      setFormStatus("idle");
    }, 4000);
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

                <div className="finp-wrap flex gap-2 border-none bg-transparent p-0 shadow-none relative" ref={dropdownRef}>
                  <div className="relative">
                    <button 
                      type="button"
                      className="flex items-center gap-2 bg-[#FAF9F6] border border-[#eaeaea] rounded-xl px-3 h-[46px] text-sm font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <img 
                        src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`} 
                        srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                        className="w-5 h-3.5 object-cover rounded-sm shadow-xs" 
                        alt="" 
                      />
                      <span>{selectedCountry.dial}</span>
                      <span className="text-[10px] text-slate-400">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-[50px] left-0 z-50 w-72 max-h-60 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden">
                        <div className="p-2 border-b border-slate-100 bg-slate-50">
                          <input 
                            type="text"
                            placeholder="Search country..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-8 px-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-600 bg-white text-slate-800"
                            autoFocus
                          />
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-44">
                          {countryCodes
                            .filter(c => 
                              c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              c.dial.includes(searchQuery)
                            )
                            .map(c => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  handleCountrySelect(c);
                                  setIsDropdownOpen(false);
                                  setSearchQuery("");
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer text-left transition-colors"
                              >
                                <img 
                                  src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} 
                                  srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                                  className="w-5 h-3.5 object-cover rounded-sm shadow-xs flex-shrink-0" 
                                  alt="" 
                                />
                                <span className="flex-grow">{c.name}</span>
                                <span className="font-semibold text-slate-400">{c.dial}</span>
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="finp-wrap flex-1 m-0">
                    <span className="finp-icon"><Phone size={15} strokeWidth={2} /></span>
                    <input 
                      className="finp pl-[42px]" 
                      placeholder={getPhoneConfig(selectedCountry.code).placeholder} 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneInputChange(e.target.value)}
                      maxLength={getPhoneConfig(selectedCountry.code).maxLength}
                    />
                  </div>
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
