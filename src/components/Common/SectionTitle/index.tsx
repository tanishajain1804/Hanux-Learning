import React from "react";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  badge,
  align = "center",
  className = ""
}) => {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <div className={`flex flex-col mb-12 ${alignments[align]} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#0D3152] bg-[#E6F0FA] mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight max-w-2xl font-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;
