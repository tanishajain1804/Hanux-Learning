import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "text" | "glow";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D3152]";
  
  const variants = {
    solid: "bg-[#0D3152] text-white hover:bg-[#092239] hover:shadow-lg hover:shadow-cyan-200 border border-transparent",
    outline: "bg-transparent text-slate-800 border border-slate-300 hover:border-[#0D3152] hover:text-[#0D3152] hover:bg-slate-50",
    text: "bg-transparent text-[#0D3152] hover:text-[#092239] p-0 border-none shadow-none focus:ring-0 focus:ring-offset-0",
    glow: "bg-[#0D3152] text-white hover:bg-[#092239] shadow-[0_0_20px_rgba(0,168,255,0.3)] hover:shadow-[0_0_30px_rgba(0,168,255,0.5)] border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2 inline-flex">{icon}</span>}
    </button>
  );
};
export default Button;
