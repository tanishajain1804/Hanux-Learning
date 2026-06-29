import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  borderEffect?: boolean;
  paddingSize?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  borderEffect = true,
  paddingSize = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "bg-white rounded-2xl transition-all duration-300 shadow-sm";
  const hoverStyles = hoverEffect ? "hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1" : "";
  const borderStyles = borderEffect ? "border border-slate-100/80" : "";
  
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${borderStyles} ${paddings[paddingSize]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
