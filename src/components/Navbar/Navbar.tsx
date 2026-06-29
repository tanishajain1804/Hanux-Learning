import React, { useState, useEffect } from "react";
import { Menu, ArrowRight, Home } from "lucide-react";
import { navItems } from "../../data/navData";
import { useScroll } from "../../hooks/useScroll";
import { MegaMenu } from "./MegaMenu";
import { IndustriesMegaMenu } from "./IndustriesMegaMenu";
import { MobileMenu } from "./MobileMenu";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const { isSticky } = useScroll(20);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pathchange", handleLocationChange);

    const interval = setInterval(handleLocationChange, 200);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pathchange", handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  const getHref = (itemHref: string) => {
    return itemHref || "";
  };

  const isActive = (itemHref?: string, itemLabel?: string) => {
    if (itemLabel?.toLowerCase() === "about" || itemHref === "/about") {
      return currentPath === "/about";
    }
    if (itemLabel?.toLowerCase() === "contact us" || itemLabel?.toLowerCase() === "contact" || itemHref === "/contact") {
      return currentPath === "/contact";
    }
    if (itemLabel?.toLowerCase() === "services" || itemHref?.startsWith("/services")) {
      return currentPath.startsWith("/services");
    }
    if (itemLabel?.toLowerCase() === "our projects" || itemHref === "/projects") {
      return currentPath.startsWith("/projects");
    }
    if (itemLabel?.toLowerCase() === "industries") {
      return currentPath.startsWith("/industries");
    }

    if (itemHref) {
      if (currentPath === itemHref) return true;
    }
    return false;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isSticky ? "pt-3" : "pt-6"
      }`}>
        <div className={`mx-auto max-w-[1200px] w-full pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-full px-6 relative ${
          isSticky 
            ? "bg-white/45 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(15,60,160,0.08)] py-2" 
            : "bg-white/60 backdrop-blur-md border border-slate-200/30 shadow-sm py-3.5"
        }`}>
          
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-2.5 group cursor-pointer focus:outline-none">
            <div className={`logo-icon bg-gradient-to-br from-[#0f3ca0] to-[#2563eb] flex items-center justify-center rounded-[9px] shrink-0 transition-all duration-300 ${
              isSticky ? "w-[30px] h-[30px]" : "w-[36px] h-[36px]"
            }`}>
              <svg className={`fill-white transition-all duration-300 ${
                isSticky ? "w-[13px] h-[13px]" : "w-[16px] h-[16px]"
              }`} viewBox="0 0 16 16">
                <path d="M3 3h4v4H3zm6 0h4v4H9zM3 9h4v4H3zm6 2a2 2 0 104 0 2 2 0 00-4 0z"/>
              </svg>
            </div>
            <span className={`font-extrabold tracking-tight text-[#0d1b3e] font-heading transition-all duration-300 ${
              isSticky ? "text-[17px]" : "text-[19px]"
            }`}>
              HANUX<span className="text-[#2563eb]">TECH</span>
            </span>
          </a>

          {/* Desktop Navigation Links (with hover dropdown / mega menu) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const hasSub = item.isMega && item.dropdownItems && item.dropdownItems.length > 0;
              const active = isActive(item.href, item.label);
              const linkClasses = `font-semibold px-2 py-1.5 rounded-full transition-all duration-300 select-none cursor-pointer flex items-center gap-1 relative whitespace-nowrap ${
                active 
                  ? "text-[#0f3ca0] bg-[#2563eb]/8" 
                  : "text-[#475569] hover:text-[#0f3ca0] hover:bg-[#2563eb]/8"
              } ${
                isSticky ? "text-[15px]" : "text-[16.5px]"
              }`;
              
              return (
                <div
                  key={idx}
                  className={`py-1 nav-item-wrapper ${hasSub ? "nav-item-has-mega" : ""}`}
                >
                  {hasSub ? (
                    <>
                      <button className={linkClasses}>
                        {active && (
                          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1.2 h-1.2 bg-[#2563eb] rounded-full animate-fade-in" />
                        )}
                        <span>{item.label}</span>
                      </button>
                      {item.label.toLowerCase() === "industries" ? (
                        <IndustriesMegaMenu items={item.dropdownItems || []} />
                      ) : (
                        <MegaMenu items={item.dropdownItems || []} />
                      )}
                    </>
                  ) : (
                    <a
                      href={getHref(item.href || "")}
                      className={linkClasses}
                    >
                      {active && (
                        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1.2 h-1.2 bg-[#2563eb] rounded-full animate-fade-in" />
                      )}
                      {item.label === "Home" && (
                        <Home className={`${isSticky ? "w-[15px] h-[15px]" : "w-[17px] h-[17px]"} transition-all duration-300`} />
                      )}
                      <span>{item.label}</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right actions CTA */}
          <div className="flex items-center gap-4">
            <a
              href="/schedule-meeting"
              className={`hidden sm:inline-flex items-center justify-center text-sm font-bold text-white bg-[#0f3ca0] hover:bg-[#2563eb] rounded-full shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 gap-0 cursor-pointer overflow-hidden ${
                isSticky ? "w-9 h-9 p-0" : "px-6 py-2.5 h-10"
              }`}
            >
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap inline-block ${
                isSticky ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100 mr-1.5"
              }`}>
                Schedule Meeting
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 md:hidden rounded-full bg-slate-50 border border-slate-100 text-[#475569] hover:text-[#0f3ca0] hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Accordion Drawer */}
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
};

export default Navbar;
