import React from "react";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Palette, 
  Search, 
  Share2, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  Award, 
  BookOpen, 
  FileText, 
  HelpCircle,
  ArrowRight,
  Monitor,
  Cloud,
  Sparkles
} from "lucide-react";
import "./Navbar.css";

export interface MegaMenuProps {
  items: {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[];
  onClose?: () => void;
}

// Icon mapper for the menu
const menuIconMapper = (iconName: string) => {
  const props = { className: "w-5 h-5 text-current transition-colors duration-300" };
  switch (iconName) {
    case "Globe": return <Globe {...props} />;
    case "Smartphone": return <Smartphone {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Search": return <Search {...props} />;
    case "Share2": return <Share2 {...props} />;
    case "Users": return <Users {...props} />;
    case "Briefcase": return <Briefcase {...props} />;
    case "ShoppingCart": return <ShoppingCart {...props} />;
    case "Award": return <Award {...props} />;
    case "BookOpen": return <BookOpen {...props} />;
    case "FileText": return <FileText {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Cloud": return <Cloud {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    default: return <HelpCircle {...props} />;
  }
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ items, onClose }) => {
  return (
    <div className="mega-menu-wrapper">
      <div className="w-full px-6 py-6 bg-gradient-to-br from-[#EBF3FE]/95 via-[#F0F4FE]/95 to-[#E2EAF7]/95 border border-[#2563eb]/20 shadow-[0_30px_70px_rgba(37,99,235,0.12)] backdrop-blur-xl rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-up">
        {/* Main Grid columns */}
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-4 p-5 pb-12 rounded-2xl bg-white/70 border border-blue-100 hover:bg-white hover:border-[#2563eb] hover:shadow-[0_12px_30px_rgba(37,99,235,0.06)] transition-all duration-300 group cursor-pointer relative"
          >
            <div className="p-3 bg-[#2563eb]/8 rounded-xl text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-300">
              {menuIconMapper(item.icon)}
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-[#0d1b3e] group-hover:text-[#2563eb] transition-colors">
                {item.title}
              </span>
              <span className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                {item.description}
              </span>
            </div>

            {/* Bottom-right arrow indicator matching the screenshot */}
            <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#2563eb] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
