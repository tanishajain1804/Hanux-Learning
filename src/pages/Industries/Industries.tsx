import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { TrailBadge } from "../../components/Common/TrailBadge";
import "./Industries.css";

interface IndustryItem {
  key: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  lightBg: string;
}

const industriesList: IndustryItem[] = [
  { key: "startups", title: "Startups", desc: "MVP development, product-market fit, scalable architecture from day one.", icon: "🚀", color: "#1B4FD8", lightBg: "#EEF2FF" },
  { key: "edtech", title: "EdTech", desc: "LMS platforms, live classrooms, assessment engines, and AI tutors.", icon: "📚", color: "#7C3AED", lightBg: "#F5F3FF" },
  { key: "Bookingsystem", title: "Booking Systems", desc: "Real-time scheduling, multi-vendor calendars, and reservation management.", icon: "📅", color: "#0EA5C9", lightBg: "#E0F7FA" },
  { key: "fintech", title: "FinTech", desc: "Digital banking, DeFi protocols, payment gateways, and AI risk engines.", icon: "💳", color: "#10B981", lightBg: "#D1FAE5" },
  { key: "healthtech", title: "HealthTech", desc: "Telemedicine, EHR systems, HIPAA-compliant apps, and patient portals.", icon: "🏥", color: "#EF4444", lightBg: "#FEE2E2" },
  { key: "ecommerce", title: "Retail & E-commerce", desc: "Omnichannel stores, POS systems, inventory, and recommendation engines.", icon: "🛍️", color: "#2563eb", lightBg: "#eff6ff" },
  { key: "manufacturing", title: "Manufacturing", desc: "ERP, supply chain, IoT integration, and factory floor automation.", icon: "⚙️", color: "#6B7280", lightBg: "#F3F4F6" },
  { key: "real-estate", title: "Real Estate", desc: "Property portals, CRM, virtual tours, and transaction management platforms.", icon: "🏠", color: "#F97316", lightBg: "#FFEDD5" },
  { key: "legal", title: "Legal Services", desc: "Case management, contract automation, e-discovery, and client portals.", icon: "⚖️", color: "#EC4899", lightBg: "#FCE7F3" },
  { key: "consulting", title: "Consulting Firms", desc: "Knowledge management, project tracking, billing, and client collaboration.", icon: "💼", color: "#1B4FD8", lightBg: "#EEF2FF" },
  { key: "marketing", title: "Marketing Agencies", desc: "Campaign management, analytics dashboards, CRM, and automation tools.", icon: "📣", color: "#7C3AED", lightBg: "#F5F3FF" },
  { key: "logistics", title: "Logistics", desc: "Fleet management, supply chain tracking, order routing, and delivery systems.", icon: "📦", color: "#0891b2", lightBg: "#E0F7FA" },
  { key: "non-profit", title: "Non-Profit", desc: "Donor portals, fundraising campaigns, event registration, and compliance tracking.", icon: "🌱", color: "#16a34a", lightBg: "#dcfce7" }
];

export const Industries: React.FC = () => {
  return (
    <div className="industries-directory-page">
      <Navbar />
      
      <div className="industries-container">
        <div className="industries-header reveal visible">
          <TrailBadge text="All Industries" color="#1b4fd8" direction="left" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
            Industries We <span className="text-[#2563eb]">Serve</span>
          </h1>
          <p className="industries-sub text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We build world-class software for every industry vertical — from FinTech to HealthTech, E-commerce to Legal Services. Click any card to explore.
          </p>
        </div>

        <div className="industries-grid">
          {industriesList.map((item, idx) => (
            <a 
              key={idx}
              href={`/industries/${item.key}`}
              className="industry-card reveal visible"
              style={{ 
                "--hover-color": item.color,
                "--light-bg": item.lightBg
              } as React.CSSProperties}
            >
              <div className="industry-card-icon select-none">
                {item.icon}
              </div>
              <h3 className="industry-card-title">{item.title}</h3>
              <p className="industry-card-desc">{item.desc}</p>
              <div className="industry-card-more">
                Explore &rarr;
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Industries;
