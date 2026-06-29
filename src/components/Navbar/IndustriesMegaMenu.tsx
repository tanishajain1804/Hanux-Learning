import React from "react";
import { ArrowRight } from "lucide-react";
import "./Navbar.css";

export interface IndustriesMegaMenuProps {
  items: {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[];
  onClose?: () => void;
}

export const IndustriesMegaMenu: React.FC<IndustriesMegaMenuProps> = ({ items, onClose }) => {
  const categories = ["Technology", "Traditional Sectors", "Professional Services"];
  const colorsMap = {
    "Technology": "text-emerald-600 border-emerald-500/20",
    "Traditional Sectors": "text-[#16A34A] border-green-500/20",
    "Professional Services": "text-teal-600 border-teal-500/20"
  };

  return (
    <div className="mega-menu-wrapper">
      <div className="max-w-[760px] mx-auto px-8 py-8 bg-white/95 border border-slate-200/80 shadow-[0_30px_70px_rgba(15,60,160,0.12)] backdrop-blur-xl rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-scale-up text-left">
        {categories.map((cat, idx) => {
          const catItems = items.filter((item) => item.description === cat).slice(0, 3);
          const colorClass = colorsMap[cat as keyof typeof colorsMap] || "text-slate-600 border-slate-200";
          
          return (
            <div key={idx} className="flex flex-col">
              <h4 className={`text-[14px] font-bold pb-2 border-b-2 ${colorClass} tracking-wide font-heading`}>
                {cat}
              </h4>
              <ul className="flex flex-col gap-3 mt-4">
                {catItems.map((item, iIdx) => (
                  <li key={iIdx}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] font-semibold white hover:text-[#2563eb] transition-colors duration-250 flex items-center justify-between py-1 group/item cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#2563eb] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/industries"
                    onClick={onClose}
                    className="text-[13px] font-semibold text-slate-500 hover:text-[#2563eb] transition-colors duration-250 flex items-center justify-between py-1 group/item cursor-pointer"
                  >
                    <span>More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2563eb] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustriesMegaMenu;
