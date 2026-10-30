"use client";

import { type ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { registerGsapClientPlugins } from "@/lib/gsap/register-client-plugins";
import type { CategoryId } from "@/lib/content";

registerGsapClientPlugins();
gsap.registerPlugin(useGSAP);

type CategoryMotionProps = {
  category: CategoryId;
  children: ReactNode;
};

export function CategoryMotion({ category, children }: CategoryMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;

      if (!element) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = element.querySelectorAll<HTMLElement>(
          "[data-motion='hero'] > *",
        );
        const heroMedia = element.querySelector<HTMLElement>(
          "[data-motion='hero-media']",
        );

        if (heroItems.length) {
          gsap.fromTo(
            heroItems,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.08,
            },
          );
        }

        if (heroMedia) {
          const fromVars =
            category === "entrance-doors"
              ? { yPercent: 10, opacity: 0 }
              : category === "sliding-doors"
                ? { xPercent: 3, opacity: 0 }
                : category === "architectural-glazing"
                  ? { opacity: 0 }
                  : { y: 16, opacity: 0 };

          gsap.fromTo(heroMedia, fromVars, {
            y: 0,
            yPercent: 0,
            xPercent: 0,
            opacity: 1,
            duration: category === "entrance-doors" ? 1.35 : 1.05,
            ease: "power3.out",
            delay: 0.16,
          });
        }

        const families = element.querySelectorAll<HTMLElement>(
          "[data-motion='family']",
        );

        if (families.length) {
          gsap.fromTo(
            families,
            {
              y: category === "architectural-glazing" ? 0 : 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: category === "architectural-glazing" ? 1 : 0.75,
              stagger: category === "windows" ? 0.06 : 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: families[0],
                start: "top 86%",
                once: true,
              },
            },
          );
        }

        const panoramas = element.querySelectorAll<HTMLElement>(
          "[data-motion='panorama']",
        );

        if (category === "sliding-doors" && panoramas.length) {
          gsap.fromTo(
            panoramas,
            { xPercent: 4, opacity: 0.35 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1.15,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: panoramas[0],
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        const door = element.querySelector<HTMLElement>("[data-motion='door']");

        if (category === "entrance-doors" && door) {
          gsap.fromTo(
            door,
            { yPercent: 8, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: door,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [category], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
