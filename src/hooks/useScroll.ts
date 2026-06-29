import { useState, useEffect } from "react";

export interface ScrollState {
  y: number;
  x: number;
  direction: "up" | "down" | null;
  isSticky: boolean;
}

export const useScroll = (threshold = 50) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    y: 0,
    x: 0,
    direction: null,
    isSticky: false
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      
      let direction: "up" | "down" | null = null;
      if (currentY > lastY) {
        direction = "down";
      } else if (currentY < lastY) {
        direction = "up";
      }

      setScrollState({
        y: currentY,
        x: currentX,
        direction,
        isSticky: currentY > threshold
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
};
export default useScroll;
