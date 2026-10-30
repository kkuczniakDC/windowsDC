"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP client plugins once (ScrollTrigger + ScrollSmoother). */
export function registerGsapClientPlugins() {
  if (registered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  registered = true;
}

export const scrollSmootherMedia =
  "(min-width: 1100px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
