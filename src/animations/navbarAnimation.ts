// Navbar animation hooks
import { gsap } from "gsap";

export const animateNavbarReveal = (target: string) => {
  return gsap.fromTo(
    target,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );
};
