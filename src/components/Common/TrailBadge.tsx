import React from "react";
import "./TrailBadge.css";

interface TrailBadgeProps {
  text: string;
  color?: string;
  direction?: "left" | "right";
  className?: string;
}

export const TrailBadge: React.FC<TrailBadgeProps> = ({ 
  text, 
  color = "#2563eb",
  direction = "right",
  className = ""
}) => {
  const dirMultiplier = direction === "left" ? -1 : 1;
  return (
    <div 
      className={`trail-badge-container ${className}`}
      style={{ ["--trail-dir" as any]: dirMultiplier }}
    >
      <span className="trail-badge-ghost ghost-3" style={{ backgroundColor: color }} />
      <span className="trail-badge-ghost ghost-2" style={{ backgroundColor: color }} />
      <span className="trail-badge-ghost ghost-1" style={{ backgroundColor: color }} />
      <span className="trail-badge-main" style={{ backgroundColor: color }}>
        {text}
      </span>
    </div>
  );
};

export default TrailBadge;
