import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Handshake, 
  Cpu, 
  Palette, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock 
} from "lucide-react";
import "./ScheduleMeeting.css";

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  iconName: "Globe" | "Smartphone" | "Cloud" | "Handshake" | "Cpu" | "Palette";
}

const servicesList: ServiceItem[] = [
  { id: "web-dev", name: "Website Development", duration: "30 min · Engineering lead", iconName: "Globe" },
  { id: "mobile-apps", name: "Mobile App Development", duration: "30 min · Mobile lead", iconName: "Smartphone" },
  { id: "saas-dev", name: "SaaS Development", duration: "30 min · Product lead", iconName: "Cloud" },
  { id: "crm-solutions", name: "CRM Solutions", duration: "30 min · Solutions lead", iconName: "Handshake" },
  { id: "ai-automation", name: "AI & Automation", duration: "30 min · AI lead", iconName: "Cpu" },
  { id: "ui-ux", name: "UI/UX Design", duration: "30 min · Design lead", iconName: "Palette" }
];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

export const ScheduleMeeting: React.FC = () => {
  // Wizard active step for highlights (1 to 4)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  
  // Selection States
  const [selectedService, setSelectedService] = useState<string>("web-dev");
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Form States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [requests, setRequests] = useState<string>("");
  
  // Calendar Month Navigation
  const [calMonth, setCalMonth] = useState<number>(5); // June
  const [calYear, setCalYear] = useState<number>(2026);
  
  // Error & Confetti
  const [error, setError] = useState<string>("");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Autofill today's date if valid
  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === calMonth && today.getFullYear() === calYear) {
      setSelectedDate({ day: today.getDate(), month: calMonth, year: calYear });
      setActiveStep(2); // Move highlight to Step 2: Date & Time
    }
  }, [calMonth, calYear]);

  const handleServiceSelect = (svcId: string) => {
    setSelectedService(svcId);
    if (activeStep < 2) {
      setActiveStep(2);
    }
  };

  const handleDaySelect = (dayNum: number) => {
    const today = new Date();
    const cellDate = new Date(calYear, calMonth, dayNum);
    const comparisonDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (cellDate < comparisonDate) return; // Ignore past dates

    setSelectedDate({ day: dayNum, month: calMonth, year: calYear });
    setSelectedTime(""); // Reset time on new day select
    setActiveStep(2);
  };

  const handleTimeInput = (val: string) => {
    setSelectedTime(val);
    if (val.trim().length > 0) {
      if (activeStep < 3) {
        setActiveStep(3);
      }
    } else {
      if (activeStep === 3 && (!name && !email && !phone)) {
        setActiveStep(2);
      }
    }
  };

  const handleNameInput = (val: string) => {
    setName(val);
    checkDetailsProgress(val, email, phone);
  };

  const handleEmailInput = (val: string) => {
    setEmail(val);
    checkDetailsProgress(name, val, phone);
  };

  const handlePhoneInput = (val: string) => {
    setPhone(val);
    checkDetailsProgress(name, email, val);
  };

  const checkDetailsProgress = (currName: string, currEmail: string, currPhone: string) => {
    if (currName.trim() && currEmail.trim() && currPhone.trim()) {
      setActiveStep(4);
    } else if (selectedDate && selectedTime) {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  };

  const handleMonthPrev = () => {
    setCalMonth(prev => {
      if (prev === 0) {
        setCalYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleMonthNext = () => {
    setCalMonth(prev => {
      if (prev === 11) {
        setCalYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      setError("Please select a service first.");
      return;
    }
    if (!selectedDate) {
      setError("Please select a date on the calendar.");
      return;
    }
    if (!selectedTime.trim()) {
      setError("Please specify your preferred time manually.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in Name, Email, and Mobile to confirm.");
      return;
    }
    setError("");

    // Trigger Confetti
    const pieces: ConfettiPiece[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      color: ["#0f3ca0", "#2563eb", "#10b981", "#fbbf24", "#ef4444"][i % 5],
      delay: Math.random() * 0.4,
      duration: 0.8 + Math.random() * 0.8
    }));
    setConfetti(pieces);
    setIsBooked(true);
    setActiveStep(4);

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleResetForm = () => {
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setRequests("");
    setIsBooked(false);
    setActiveStep(1);
    
    // Reset to today's date if possible
    const today = new Date();
    setSelectedDate({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() });
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe />;
      case "Smartphone": return <Smartphone />;
      case "Cloud": return <Cloud />;
      case "Handshake": return <Handshake />;
      case "Cpu": return <Cpu />;
      case "Palette": return <Palette />;
      default: return <Globe />;
    }
  };

  // Calendar calculations
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const totalDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayDate = new Date();

  const emptyCells = Array.from({ length: firstDayIndex });
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  const activeService = servicesList.find(s => s.id === selectedService);

  return (
    <div className="schedule-meeting-page">
      {/* Background decorations */}
      <div className="bg-decorations">
        <div className="bg-grid" />
        <div className="blob1" />
        <div className="blob2" />
      </div>

      <Navbar />

      {/* Confetti Render */}
      {confetti.map(p => (
        <div 
          key={p.id} 
          className="conf-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      <main className="page-container">
        
        {/* HERO / HEADER */}
        {!isBooked && (
          <div className="page-header">
            <div className="badge">
              <div className="badge-dot" />
              <span className="badge-text">Free consultation · 30 min</span>
            </div>
            <h1 className="page-title">
              Book a <span>Meeting</span>
            </h1>
            <p className="page-sub">
              Schedule a free technical consultation with our engineering leads. No commitment, just clarity.
            </p>
          </div>
        )}

        {/* PROGRESS STEPS INDICATOR */}
        {!isBooked && (
          <div className="steps-bar">
            <div className={`step ${activeStep >= 1 ? (activeStep > 1 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 1 ? "✓" : "1"}</div>
              <div className="step-label">Service</div>
            </div>
            <div className={`step-line ${activeStep > 1 ? "done" : (activeStep === 1 ? "active" : "")}`} />
            
            <div className={`step ${activeStep >= 2 ? (activeStep > 2 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 2 ? "✓" : "2"}</div>
              <div className="step-label">Date &amp; Time</div>
            </div>
            <div className={`step-line ${activeStep > 2 ? "done" : (activeStep === 2 ? "active" : "")}`} />
            
            <div className={`step ${activeStep >= 3 ? (activeStep > 3 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 3 ? "✓" : "3"}</div>
              <div className="step-label">Details</div>
            </div>
            <div className={`step-line ${activeStep > 3 ? "done" : (activeStep === 3 ? "active" : "")}`} />
            
            <div className={`step ${activeStep === 4 ? "active" : ""}`}>
              <div className="step-num">4</div>
              <div className="step-label">Confirm</div>
            </div>
          </div>
        )}

        {/* WIZARD CONTAINER CARDS */}
        {!isBooked ? (
          <div className="layout-grid">
            
            {/* LEFT COLUMN: SECTIONS */}
            <div className="flex flex-col gap-2">
              
              {/* SECTION 1: SERVICE */}
              <div className={`section ${activeStep === 1 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">1</div>
                  <h2 className="sec-title">What can we help you build?</h2>
                </div>
                
                <div className="services-grid">
                  {servicesList.map((svc) => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <div
                        key={svc.id}
                        onClick={() => handleServiceSelect(svc.id)}
                        className={`svc-card ${isSelected ? "selected" : ""}`}
                      >
                        <div className="svc-radio" />
                        <div className="svc-icon-wrapper">
                          {getServiceIcon(svc.iconName)}
                        </div>
                        <div className="svc-name">
                          {svc.name}
                        </div>
                        <div className="svc-dur">
                          <Clock className="w-3.5 h-3.5" /> 30 min
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: DATE & TIME */}
              <div className={`section ${activeStep === 2 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">2</div>
                  <h2 className="sec-title">Pick a Date &amp; Time</h2>
                </div>
                
                <div className="cal-wrap">
                  {/* Calendar Box */}
                  <div>
                    <div className="cal-header">
                      <button type="button" onClick={handleMonthPrev} className="cal-nav">
                        ‹
                      </button>
                      <div className="cal-title">{months[calMonth]} {calYear}</div>
                      <button type="button" onClick={handleMonthNext} className="cal-nav">
                        ›
                      </button>
                    </div>
                    
                    <div className="cal-days-header">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(lbl => (
                        <div key={lbl} className="cal-day-label">{lbl}</div>
                      ))}
                    </div>
                    
                    <div className="cal-grid">
                      {emptyCells.map((_, i) => (
                        <div key={`empty-${i}`} className="cal-day empty" />
                      ))}
                      
                      {daysArray.map((dNum: number) => {
                        const cellDate = new Date(calYear, calMonth, dNum);
                        const isPast = cellDate < new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                        const isToday = dNum === todayDate.getDate() && calMonth === todayDate.getMonth() && calYear === todayDate.getFullYear();
                        const isSelected = selectedDate && selectedDate.day === dNum && selectedDate.month === calMonth && selectedDate.year === calYear;
                        
                        return (
                          <div
                            key={dNum}
                            onClick={() => !isPast && handleDaySelect(dNum)}
                            className={`cal-day ${isPast ? "past" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                          >
                            {dNum}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Manual Time Input Box */}
                  <div className="manual-time-wrap">
                    <div className="manual-time-label">
                      {selectedDate 
                        ? `Time for ${months[selectedDate.month].slice(0,3)} ${selectedDate.day}` 
                        : "Preferred Time"
                      }
                    </div>
                    
                    <div className="time-input-container">
                      <input 
                        type="text"
                        className="time-input-field"
                        placeholder="e.g. 10:30 AM or 3:00 PM"
                        value={selectedTime}
                        onChange={(e) => handleTimeInput(e.target.value)}
                        disabled={!selectedDate}
                      />
                      <span className="time-icon-left">
                        <Clock />
                      </span>
                    </div>
                    <p className="time-helper">
                      {!selectedDate 
                        ? "⚠️ Please pick a date on the calendar first."
                        : "Type your preferred meeting time. Our team will verify and accommodate."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: YOUR DETAILS */}
              <div className={`section ${activeStep === 3 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">3</div>
                  <h2 className="sec-title">Your Details</h2>
                </div>
                
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">Full Name<span>*</span></label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        placeholder="Arjun Mehta" 
                        value={name}
                        onChange={(e) => handleNameInput(e.target.value)}
                        className="field-input"
                        required
                      />
                      <span className="field-icon-left">
                        <User />
                      </span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email Address<span>*</span></label>
                    <div className="field-wrap">
                      <input 
                        type="email" 
                        placeholder="arjun@company.com" 
                        value={email}
                        onChange={(e) => handleEmailInput(e.target.value)}
                        className="field-input"
                        required
                      />
                      <span className="field-icon-left">
                        <Mail />
                      </span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Mobile Number<span>*</span></label>
                    <div className="field-wrap">
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={phone}
                        onChange={(e) => handlePhoneInput(e.target.value)}
                        className="field-input"
                        required
                      />
                      <span className="field-icon-left">
                        <Phone />
                      </span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Company / Project</label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        placeholder="Your company name" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="field-input"
                      />
                      <span className="field-icon-left">
                        <Building />
                      </span>
                    </div>
                  </div>

                  <div className="form-field full">
                    <label className="field-label">Special Requests</label>
                    <div className="field-wrap">
                      <textarea 
                        placeholder="Tell us what you'd like to discuss — the more context, the better your consultation…" 
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        className="field-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-[#ef4444] text-xs font-bold text-center mt-3">
                  {error}
                </p>
              )}

              {/* Confirm CTA for mobile screen width */}
              <div className="cta-wrap md:hidden">
                <button 
                  onClick={handleConfirmBooking}
                  disabled={!selectedService || !selectedDate || !selectedTime.trim() || !name.trim() || !email.trim() || !phone.trim()}
                  className="cta-btn"
                >
                  <span>Confirm Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="cta-note">
                  <Lock className="w-3.5 h-3.5" /> Free consultation · No credit card · Cancel anytime
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SUMMARY SIDEBAR */}
            <div className="sidebar-column">
              <div className="summary">
                <div className="summary-title">Booking Summary</div>
                <div className="summary-row">
                  <div className="summary-icon"><Zap /></div>
                  <div>
                    <div className="summary-key">Service</div>
                    <div className="summary-val">{activeService?.name || "None selected"}</div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><Calendar /></div>
                  <div>
                    <div className="summary-key">Date</div>
                    <div className="summary-val">
                      {selectedDate 
                        ? `${months[selectedDate.month].slice(0,3)} ${selectedDate.day}, ${selectedDate.year}`
                        : <span className="summary-empty">Not selected</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><Clock /></div>
                  <div>
                    <div className="summary-key">Time</div>
                    <div className="summary-val">
                      {selectedTime.trim() 
                        ? selectedTime 
                        : <span className="summary-empty">Not selected</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><User /></div>
                  <div>
                    <div className="summary-key">Name</div>
                    <div className="summary-val">
                      {name.trim() 
                        ? name 
                        : <span className="summary-empty">—</span>
                      }
                    </div>
                  </div>
                </div>
                
                <div className="summary-meta-box">
                  <div className="meta-item">
                    <span className="meta-item-key">Duration</span>
                    <span className="meta-item-val">30 min</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-item-key">Format</span>
                    <span className="meta-item-val">Video call</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-item-key">Cost</span>
                    <span className="meta-item-val green">Free 🎉</span>
                  </div>
                </div>

                {/* Confirm CTA for desktop screen width */}
                <div className="cta-wrap hidden md:block">
                  <button 
                    onClick={handleConfirmBooking}
                    disabled={!selectedService || !selectedDate || !selectedTime.trim() || !name.trim() || !email.trim() || !phone.trim()}
                    className="cta-btn"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="cta-note">
                    <Lock className="w-3 h-3" /> Free consultation · No credit card
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="trust-signals">
                <div className="trust-card">
                  <span className="trust-icon"><Zap /></span>
                  <div>
                    <div className="trust-title">Fast response</div>
                    <div className="trust-desc">Confirmation in under 1 hour</div>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon"><ShieldCheck /></span>
                  <div>
                    <div className="trust-title">Global team</div>
                    <div className="trust-desc">Available across all timezones</div>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon"><Lock /></span>
                  <div>
                    <div className="trust-title">No obligation</div>
                    <div className="trust-desc">Cancel or reschedule free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          /* CONFIRM SUCCESS SCREEN */
          <div className="success-screen">
            <div className="success-icon-wrap">
              <CheckCircle className="w-10 h-10 text-white" fill="var(--green)" />
            </div>
            
            <h2 className="success-title">
              You're all set! 🎉
            </h2>
            <p className="success-sub">
              A calendar invite and confirmation have been sent to your email. Our team is excited to connect with you.
            </p>
            
            <div className="success-details-card">
              <div className="success-card-title">
                Your booking
              </div>
              <div className="success-detail-row">
                <Zap />
                <span>{activeService?.name}</span>
              </div>
              <div className="success-detail-row">
                <Calendar />
                <span>
                  {selectedDate && `${months[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`} at {selectedTime}
                </span>
              </div>
              <div className="success-detail-row">
                <User />
                <span>{name} · {email}</span>
              </div>
            </div>
            
            <div>
              <button
                onClick={handleResetForm}
                className="success-reset-btn"
              >
                Book another meeting
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default ScheduleMeeting;
