// Hero animations using GSAP or standard CSS transitions
import { gsap } from "gsap";

export const initHeroAnimation = (target: string) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  );
};
