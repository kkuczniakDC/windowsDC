"use client";

import { type ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { registerGsapClientPlugins } from "@/lib/gsap/register-client-plugins";
import styles from "./ScrollDriftFigure.module.css";

registerGsapClientPlugins();
gsap.registerPlugin(useGSAP);

type ScrollDriftFigureProps = {
  className?: string;
  children: ReactNode;
  caption?: ReactNode;
  travel?: number;
  mobileTravel?: number;
};

export function ScrollDriftFigure({
  className,
  children,
  caption,
  travel = 6,
  mobileTravel = 3,
}: ScrollDriftFigureProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      const media = element?.querySelector<HTMLElement>("[data-drift-media]");

      if (!element || !media) {
        return;
      }

      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          isDesktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const amount = context.conditions?.isMobile ? mobileTravel : travel;

          gsap.fromTo(
            media,
            { yPercent: amount, force3D: true },
            {
              yPercent: -amount,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      return () => matchMedia.revert();
    },
    { scope: root, dependencies: [travel, mobileTravel], revertOnUpdate: true },
  );

  return (
    <figure
      ref={root}
      className={className ? `${styles.figure} ${className}` : styles.figure}
    >
      <div className={styles.media} data-drift-media>
        {children}
      </div>
      {caption}
    </figure>
  );
}
