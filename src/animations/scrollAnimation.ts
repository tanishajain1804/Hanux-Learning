// Scroll progress and timeline GSAP helpers
import { gsap } from "gsap";

export const initScrollProgress = (trigger: string, target: string) => {
  return gsap.to(target, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: trigger,
      scrub: true,
      start: "top top",
      end: "bottom bottom"
    }
  });
};
