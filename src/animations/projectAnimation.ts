// Project card hover/reveal animations
import { gsap } from "gsap";

export const animateProjectCardReveal = (target: string) => {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
  );
};
