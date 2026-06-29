import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";
import { 
  ArrowRight,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  User,
  Mail,
  ChevronRight,
  ChevronLeft,
  CalendarPlus
} from "lucide-react";
import { industriesDataMap } from "../../../data/industriesData";
import { NotFound } from "../../../pages/NotFound";
import { TrailBadge } from "../../Common/TrailBadge";
import "../IndustryDetailPage.css";

// Local theme colors and metadata specific to Booking Systems
const themeColors = {
  primary: "#0ea5c9",
  secondary: "#06b6d4",
  lightBg: "#e0f7fa",
  gradient: "linear-gradient(135deg, #0ea5c9 0%, #06b6d4 100%)"
};

const metaData = {
  stats: [["80+", "Booking Platforms Built"], ["₹500Cr+", "Bookings Processed"], ["40%", "Avg. No-Show Reduction"]] as [string, string][],
  trust: ["Real-Time Availability ✓", "Google Calendar Sync ✓", "Stripe / Razorpay ✓", "SMS & Email Alerts ✓", "Multi-Timezone ✓", "GDPR Compliant ✓", "White-Label Ready ✓", "API-First ✓"],
  checks: ["Multi-vendor, multi-location support", "Dynamic pricing & availability rules", "Automated reminders via SMS, email, WhatsApp", "Deposits, refunds & subscription billing", "Custom branding and white-label options"],
  h1: ["Powerful ", "Booking", " & Scheduling Software"] as [string, string, string]
};

import { IndustryCanvas } from "../IndustryCanvas";

const BookingWidget: React.FC<{ themeColors: { primary: string; secondary: string; lightBg: string; gradient: string } }> = ({ themeColors }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const services = [
    { id: "consultation", name: "Consultation Call", desc: "30-min strategy session to map your architecture.", icon: "📞", duration: "30 min" },
    { id: "discovery", name: "Technical Discovery", desc: "60-min deep dive with our principal solutions architect.", icon: "🔍", duration: "60 min" },
    { id: "workshop", name: "Project Workshop", desc: "90-min workshop to align stakeholders & define scope.", icon: "🚀", duration: "90 min" }
  ];

  const timeSlots = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (m: number, y: number) => {
    const date = new Date(y, m, 1);
    const days = [];
    while (date.getMonth() === m) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d < today;
  };

  const isSameDay = (d1: Date | null, d2: Date) => {
    if (!d1) return false;
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingRef("HTX-" + Math.floor(100000 + Math.random() * 900000));
      setStep(4);
    }, 1500);
  };

  const selectedServiceObj = services.find(s => s.id === selectedService);

  return (
    <div className="booking-widget-card" style={{ "--primary-color": themeColors.primary } as React.CSSProperties}>
      <style>{`
        .booking-widget-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
          width: 100%;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }
        .widget-header {
          margin-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 16px;
        }
        .widget-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .widget-subtitle {
          font-size: 13px;
          color: #64748b;
        }
        .step-indicator {
          display: flex;
          gap: 6px;
          margin-top: 10px;
        }
        .step-dot {
          height: 4px;
          flex: 1;
          border-radius: 2px;
          background: #e2e8f0;
          transition: all 0.3s;
        }
        .step-dot.active {
          background: var(--primary-color);
        }
        .widget-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .service-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .service-opt {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #ffffff;
          text-align: left;
        }
        .service-opt:hover {
          border-color: var(--primary-color);
          background: #f8fafc;
          transform: translateY(-1px);
        }
        .service-opt.selected {
          border-color: var(--primary-color);
        }
        .service-opt-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .service-opt.selected .service-opt-icon {
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .service-opt-info {
          flex: 1;
        }
        .service-opt-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .service-opt-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
        }
        .service-opt-dur {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 99px;
          white-space: nowrap;
        }

        .datetime-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 20px;
        }
        @media (max-width: 640px) {
          .datetime-container {
            grid-template-columns: 1fr;
          }
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .calendar-month {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
        }
        .calendar-nav-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: all 0.2s;
        }
        .calendar-nav-btn:hover {
          background: #f1f5f9;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          text-align: center;
        }
        .weekday-label {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
          padding: 4px 0;
          text-transform: uppercase;
        }
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          color: #334155;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          border: none;
        }
        .calendar-day:hover:not(:disabled) {
          background: #f1f5f9;
        }
        .calendar-day.selected {
          background: var(--primary-color) !important;
          color: white !important;
          font-weight: 700;
        }
        .calendar-day:disabled {
          color: #cbd5e1;
          cursor: not-allowed;
        }
        
        .slots-panel {
          display: flex;
          flex-direction: column;
          justify-content: start;
        }
        .slots-title {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 12px;
          text-align: left;
        }
        .slots-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .slot-btn {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          color: #334155;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .slot-btn:hover {
          border-color: var(--primary-color);
          background: #f8fafc;
        }
        .slot-btn.selected {
          background: var(--primary-color) !important;
          color: white !important;
        }

        .form-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
        }
        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .form-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          width: 16px;
          height: 16px;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 13px;
          color: #1e293b;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 13px;
          color: #1e293b;
          min-height: 80px;
          resize: none;
          transition: all 0.2s;
        }
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .success-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
          text-align: center;
        }
        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f0fdf4;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 20px rgba(22, 163, 74, 0.15);
        }
        .success-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .success-desc {
          font-size: 13px;
          color: #64748b;
          max-width: 300px;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .summary-box {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: left;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 6px 0;
        }
        .summary-label {
          color: #64748b;
          font-weight: 500;
        }
        .summary-val {
          color: #0f172a;
          font-weight: 700;
        }

        .widget-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          gap: 12px;
        }
        .btn-prev {
          padding: 10px 18px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-prev:hover {
          background: #f1f5f9;
        }
        .btn-next {
          flex: 1;
          padding: 10px 20px;
          border: none;
          border-radius: 12px;
          background: var(--primary-color);
          color: white;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-next:hover {
          opacity: 0.95;
          transform: translateY(-0.5px);
        }
        .btn-next:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        .spinner {
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {step < 4 && (
        <div className="widget-header">
          <div className="widget-title">
            <Calendar className="w-5 h-5" style={{ color: themeColors.primary }} />
            Book a Demo Session
          </div>
          <div className="widget-subtitle">
            {step === 1 && "Choose a scheduling type to begin"}
            {step === 2 && "Select a day and convenient time slot"}
            {step === 3 && "Complete your details to secure the slot"}
          </div>
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? "active" : ""}`} />
            <div className={`step-dot ${step >= 2 ? "active" : ""}`} />
            <div className={`step-dot ${step >= 3 ? "active" : ""}`} />
          </div>
        </div>
      )}

      <div className="widget-body">
        {step === 1 && (
          <div className="service-list">
            {services.map((s) => (
              <div
                key={s.id}
                className={`service-opt ${selectedService === s.id ? "selected" : ""}`}
                style={selectedService === s.id ? { borderColor: themeColors.primary, background: themeColors.lightBg } : {}}
                onClick={() => setSelectedService(s.id)}
              >
                <div className="service-opt-icon">{s.icon}</div>
                <div className="service-opt-info">
                  <div className="service-opt-name">{s.name}</div>
                  <div className="service-opt-desc">{s.desc}</div>
                </div>
                <div className="service-opt-dur" style={{ color: themeColors.primary, background: themeColors.lightBg }}>
                  {s.duration}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="datetime-container">
            <div>
              <div className="calendar-header">
                <div className="calendar-month">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <div className="flex gap-1">
                  <button className="calendar-nav-btn" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="calendar-nav-btn" onClick={handleNextMonth}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="calendar-grid">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((dayName) => (
                  <div className="weekday-label" key={dayName}>
                    {dayName}
                  </div>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const past = isPastDate(day);
                  const isSel = isSameDay(selectedDate, day);
                  return (
                    <button
                      key={day.toISOString()}
                      disabled={past}
                      className={`calendar-day ${isSel ? "selected" : ""}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="slots-panel">
              <div className="slots-title">
                {selectedDate 
                  ? `Slots for ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()].slice(0, 3)}`
                  : "Select a date"
                }
              </div>
              <div className="slots-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    disabled={!selectedDate}
                    className={`slot-btn ${selectedTime === slot ? "selected" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                    style={selectedTime === slot ? { backgroundColor: themeColors.primary, borderColor: themeColors.primary } : {}}
                  >
                    <Clock className="w-3 h-3 inline mr-1.5" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="form-details">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="form-input-wrapper">
                <User className="form-icon" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <Mail className="form-icon" />
                <input
                  type="email"
                  required
                  placeholder="e.g. john@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Scope / Notes (Optional)</label>
              <textarea
                placeholder="What details would you like to discuss?"
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="success-panel">
            <div className="success-icon-wrap">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="success-title">Booking Confirmed!</div>
            <div className="success-desc">
              Your strategy session has been scheduled successfully. A calendar invite and confirmation email have been sent.
            </div>
            <div className="summary-box">
              <div className="summary-row">
                <span className="summary-label">Reference ID</span>
                <span className="summary-val">{bookingRef}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Session Type</span>
                <span className="summary-val">{selectedServiceObj?.name}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Date & Time</span>
                <span className="summary-val">
                  {selectedDate?.getDate()} {monthNames[selectedDate?.getMonth() || 0]}, {selectedTime}
                </span>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <button
                className="btn-prev"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  setStep(1);
                  setSelectedService("");
                  setSelectedDate(null);
                  setSelectedTime("");
                  setFormData({ name: "", email: "", notes: "" });
                }}
              >
                Book Another
              </button>
              <button
                className="btn-next"
                style={{ flex: 1, backgroundColor: "#16a34a" }}
                onClick={() => {
                  alert("Successfully added to your calendar!");
                }}
              >
                <CalendarPlus className="w-4 h-4" />
                Add to Calendar
              </button>
            </div>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="widget-actions">
          {step > 1 ? (
            <button className="btn-prev" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              className="btn-next"
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && (!selectedDate || !selectedTime))
              }
              style={
                ((step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime)))
                  ? { backgroundColor: "#cbd5e1", cursor: "not-allowed" }
                  : { backgroundColor: themeColors.primary }
              }
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="btn-next"
              disabled={!formData.name || !formData.email || isSubmitting}
              onClick={handleSubmit}
              style={
                (!formData.name || !formData.email || isSubmitting)
                  ? { backgroundColor: "#cbd5e1", cursor: "not-allowed" }
                  : { backgroundColor: themeColors.primary }
              }
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Securing Slot...
                </>
              ) : (
                <>
                  Confirm Booking
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const BookingPage: React.FC = () => {
  const industryKey = window.location.pathname.split("/").pop() || "booking";
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
      <section id="booking-widget" style={{ padding: "40px 0" }}>
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
            <BookingWidget themeColors={themeColors} />
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

export default BookingPage;
