"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  registerGsapClientPlugins,
  scrollSmootherMedia,
} from "@/lib/gsap/register-client-plugins";
import styles from "./SiteScrollShell.module.css";

type SiteScrollShellProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

const HEADER_SCROLL_OFFSET = "top 5.5rem";

function scrollToHashTarget(hash: string) {
  const id = hash.replace(/^#/, "");

  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  const smoother = ScrollSmoother.get();

  if (target && smoother) {
    smoother.scrollTo(target, true, HEADER_SCROLL_OFFSET);
  }
}

export function SiteScrollShell({
  header,
  footer,
  children,
}: SiteScrollShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapClientPlugins();
    const root = document.documentElement;
    root.dataset.scrollSmoother = "off";

    if (!isHome) {
      return () => {
        delete root.dataset.scrollSmoother;
      };
    }

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return () => {
        delete root.dataset.scrollSmoother;
      };
    }

    const media = gsap.matchMedia();

    media.add(scrollSmootherMedia, () => {
      wrapper.dataset.enhanced = "true";

      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: 0.85,
        smoothTouch: 0,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      root.dataset.scrollSmoother = "active";
      ScrollTrigger.refresh();

      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
          "a[href*='#']",
        );

        if (!anchor) {
          return;
        }

        const url = new URL(anchor.href, window.location.href);

        if (url.pathname !== "/" || !url.hash) {
          return;
        }

        event.preventDefault();
        scrollToHashTarget(url.hash);
        window.history.pushState(null, "", url.hash);
      };

      document.addEventListener("click", onClick);

      const hashFrame = window.requestAnimationFrame(() => {
        if (window.location.hash) {
          scrollToHashTarget(window.location.hash);
        }
      });

      return () => {
        window.cancelAnimationFrame(hashFrame);
        document.removeEventListener("click", onClick);
        smoother.kill();
        delete wrapper.dataset.enhanced;
        root.dataset.scrollSmoother = "off";
        ScrollTrigger.refresh();
      };
    });

    return () => {
      media.revert();
      delete root.dataset.scrollSmoother;
    };
  }, [isHome]);

  if (!isHome) {
    return (
      <div className={styles.plainShell}>
        {header}
        {children}
        {footer}
      </div>
    );
  }

  return (
    <div
      className={styles.smoothWrapper}
      id="smooth-wrapper"
      ref={wrapperRef}
    >
      <div
        className={styles.smoothContent}
        id="smooth-content"
        ref={contentRef}
      >
        {header}
        {children}
        {footer}
      </div>
    </div>
  );
}
