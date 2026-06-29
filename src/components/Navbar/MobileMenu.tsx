import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X, Home } from "lucide-react";
import { navItems } from "../../data/navData";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if (!isOpen) return;
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pathchange", handleLocationChange);

    const interval = setInterval(handleLocationChange, 250);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pathchange", handleLocationChange);
      clearInterval(interval);
    };
  }, [isOpen]);


  const getHref = (itemHref: string) => {
    return itemHref || "";
  };

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm md:hidden animate-fade-in">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-left">
        
        {/* Header / Close button */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <span className="text-lg font-bold text-slate-800 font-heading">Menu</span>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item, idx) => {
            const hasSub = item.isMega && item.dropdownItems && item.dropdownItems.length > 0;
            const isExpanded = expandedIndex === idx;
            const active = isActive(item.href, item.label);

            return (
              <div key={idx} className="border-b border-slate-50 pb-2 mb-2">
                {hasSub ? (
                  <div>
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className={`flex items-center justify-between w-full text-left py-2 px-3 font-semibold transition-colors cursor-pointer ${
                        active ? "text-[#0f3ca0]" : "text-slate-700 hover:text-[#0D3152]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="pl-4 mt-1 flex flex-col gap-1.5">
                        {item.dropdownItems?.map((sub, sidx) => {
                          const subActive = isActive(sub.href);
                          return (
                            <a
                              key={sidx}
                              href={sub.href}
                              onClick={onClose}
                              className={`block py-1.5 px-3 text-xs font-semibold transition-colors ${
                                subActive ? "text-[#0f3ca0] bg-[#2563eb]/5 rounded-lg" : "text-slate-500 hover:text-[#0D3152]"
                              }`}
                            >
                              {sub.title}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={getHref(item.href || "")}
                    onClick={onClose}
                    className={`flex items-center gap-2 py-2 px-3 font-semibold transition-colors rounded-lg ${
                      active ? "text-[#0f3ca0] bg-[#2563eb]/5" : "text-slate-700 hover:text-[#0D3152]"
                    }`}
                  >
                    {item.label === "Home" && <Home className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Call to action inside mobile drawer */}
        <div className="border-t border-slate-100 pt-6 mt-6 flex flex-col gap-4">
          <a
            href="/schedule-meeting"
            onClick={onClose}
            className="w-full py-3.5 text-center text-sm font-semibold text-white bg-[#0D3152] hover:bg-[#092239] rounded-full shadow-lg shadow-cyan-200 transition-all duration-300"
          >
            Schedule Meeting
          </a>
        </div>

      </div>
    </div>
  );
};

export default MobileMenu;
