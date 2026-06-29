import React, { useState, useEffect } from "react";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Services } from "../pages/Services";
import { Projects } from "../pages/Projects";
import { Industries } from "../pages/Industries/Industries";
import { Career } from "../pages/Career";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound";
import { WebDevelopmentPage } from "../components/Services/WebDevelopmentPage";
import { MobileAppDevelopmentPage } from "../components/Services/MobileAppDevelopmentPage";
import { AiAutomationPage } from "../components/Services/AiAutomationPage";
import { CrmErpSystemsPage } from "../components/Services/CrmErpSystemsPage";
import { CloudInfrastructurePage } from "../components/Services/CloudInfrastructurePage";
import { UiUxDesignSystemsPage } from "../components/Services/UiUxDesignSystemsPage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { ScheduleMeeting } from "../pages/ScheduleMeeting";
import { EdtechPage } from "../components/Industries/Edtech/EdtechPage";
import { FintechPage } from "../components/Industries/Fintech/FintechPage";
import { HealthtechPage } from "../components/Industries/Healthtech/HealthtechPage";
import { StartupsPage } from "../components/Industries/Startups/StartupsPage";
import { EcommercePage } from "../components/Industries/Ecommerce/EcommercePage";
import { ManufacturingPage } from "../components/Industries/Manufacturing/ManufacturingPage";
import { RealEstatePage } from "../components/Industries/RealEstate/RealEstatePage";
import { LogisticsPage } from "../components/Industries/Logistics/LogisticsPage";
import { LegalPage } from "../components/Industries/Legal/LegalPage";
import { ConsultingPage } from "../components/Industries/Consulting/ConsultingPage";
import { MarketingPage } from "../components/Industries/Marketing/MarketingPage";
import { NonProfitPage } from "../components/Industries/NonProfit/NonProfitPage";
import { BookingPage } from "../components/Industries/Booking/BookingPage";



export const AppRoutes: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [transitionState, setTransitionState] = useState<"idle" | "in" | "out">("idle");

  const startTransition = (targetHref: string) => {
    setTransitionState("in");
    
    // Switch route content at 350ms (when overlay fully covers screen)
    setTimeout(() => {
      window.history.pushState({}, "", targetHref);
      setCurrentPath(window.location.pathname);
      window.dispatchEvent(new Event("pathchange"));
      setTransitionState("out");
      
      // Hide transition overlay after slide-out completes
      setTimeout(() => {
        setTransitionState("idle");
      }, 650);
    }, 350);
  };

  useEffect(() => {
    // Intercept browser back/forward buttons with transition
    const handleLocationChange = () => {
      setTransitionState("in");
      setTimeout(() => {
        setCurrentPath(window.location.pathname);
        window.dispatchEvent(new Event("pathchange"));
        setTransitionState("out");
        setTimeout(() => {
          setTransitionState("idle");
        }, 650);
      }, 350);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Dynamic internal routing listener
    const handleLinkClick = (e: MouseEvent) => {
      if (transitionState !== "idle") {
        e.preventDefault();
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (
          anchor && 
          anchor.href && 
          (anchor.getAttribute("href")?.startsWith("/") || anchor.getAttribute("href")?.startsWith("#")) &&
          anchor.target !== "_blank"
      ) {
        const href = anchor.getAttribute("href") || "/";

        // Let standard page hashes handle themselves (same page scroll)
        if (href.startsWith("#")) {
          return;
        }

        e.preventDefault();
        startTransition(href);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [transitionState]);

  // Handle route transition scrolls
  useEffect(() => {
    if (
      currentPath.startsWith("/services/") || 
      currentPath.startsWith("/projects/") || 
      currentPath.startsWith("/industries/")
    ) {
      window.scrollTo(0, 0);
    } else if (currentPath === "/" || currentPath === "/index.html") {

      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [currentPath]);

  // Render correct component based on path
  const renderRoute = () => {
    if (currentPath.startsWith("/services/")) {
      const key = currentPath.split("/").pop() || "";
      if (key === "web-development" || key === "software-development") return <WebDevelopmentPage />;
      if (key === "mobile-app-development" || key === "mobile-apps") return <MobileAppDevelopmentPage />;
      if (key === "ai-automation") return <AiAutomationPage />;
      if (key === "crm-erp-systems" || key === "crm-solutions") return <CrmErpSystemsPage />;
      if (key === "cloud-infrastructure") return <CloudInfrastructurePage />;
      if (key === "ui-ux-design-systems" || key === "web-design") return <UiUxDesignSystemsPage />;
      return <NotFound />;
    }

    if (currentPath.startsWith("/projects/")) {
      const projectKey = currentPath.split("/").pop() || "";
      return <ProjectDetailPage projectKey={projectKey} />;
    }

    if (currentPath.startsWith("/industries/")) {
      const industryKey = currentPath.split("/").pop() || "";
      switch (industryKey) {
        case "edtech": return <EdtechPage />;
        case "fintech": return <FintechPage />;
        case "healthtech": return <HealthtechPage />;
        case "startups": return <StartupsPage />;
        case "ecommerce": return <EcommercePage />;
        case "manufacturing": return <ManufacturingPage />;
        case "real-estate": return <RealEstatePage />;
        case "logistics": return <LogisticsPage />;
        case "legal": return <LegalPage />;
        case "consulting": return <ConsultingPage />;
        case "marketing": return <MarketingPage />;
        case "non-profit": return <NonProfitPage />;
        case "booking":
        case "bookingsystem":
        case "Bookingsystem":
          return <BookingPage />;
        default: return <NotFound />;
      }
    }


    switch (currentPath) {
      case "/":
      case "/index.html":
        return <Home />;
      case "/about":
        return <About />;
      case "/services":
        return <Services />;
      case "/projects":
        return <Projects />;
      case "/industries":
        return <Industries />;
      case "/career":
        return <Career />;
      case "/contact":
        return <Contact />;
      case "/schedule-meeting":
        return <ScheduleMeeting />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      {/* Render active route content */}
      {renderRoute()}

      {/* Dynamic page transition overlay */}
      <div 
        className={`page-transition-overlay ${
          transitionState === "in" ? "anim-in" : transitionState === "out" ? "anim-out" : ""
        }`}
      >
        <div className="transition-brand text-white font-extrabold text-2xl tracking-widest flex items-center gap-3 select-none">
          <span className="w-3 h-3 rounded-full bg-[#3B82F6] animate-ping" />
          <span>HANUXTECH</span>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
