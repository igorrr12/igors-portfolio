import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only (module is imported by client components).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
