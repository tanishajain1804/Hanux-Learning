import React from "react";

export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullScreen = false
}) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  const containerStyles = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-bg"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerStyles}>
      <div className="relative">
        <div className={`animate-spin rounded-full border-[#0D3152]/20 border-t-[#0D3152] ${sizes[size]}`}></div>
      </div>
    </div>
  );
};
export default Loader;
