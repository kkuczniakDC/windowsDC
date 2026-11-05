"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";
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

/** Run after React hydration so ScrollSmoother DOM writes do not mismatch SSR HTML. */
function afterHydration(callback: () => void) {
  return window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

/** Route changes must jump to the top. CSS `scroll-behavior: smooth` would animate the old offset across the new page. */
function resetWindowScroll() {
  const root = document.documentElement;
  const body = document.body;
  const previousRoot = root.style.scrollBehavior;
  const previousBody = body.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  body.style.removeProperty("height");
  window.scrollTo(0, 0);

  if (previousRoot) {
    root.style.scrollBehavior = previousRoot;
  } else {
    root.style.removeProperty("scroll-behavior");
  }

  if (previousBody) {
    body.style.scrollBehavior = previousBody;
  } else {
    body.style.removeProperty("scroll-behavior");
  }
}

function isModifiedClick(event: MouseEvent) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function scrollToHashTarget(hash: string) {
  const id = hash.replace(/^#/, "");

  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  const smoother = ScrollSmoother.get();
  const wrapper = document.getElementById("smooth-wrapper");

  // Native hash / scrollIntoView can move the fixed wrapper, not the window.
  // ScrollSmoother then thinks we are at the top while the content is offset.
  if (wrapper) {
    wrapper.scrollTop = 0;
  }

  if (target && smoother) {
    smoother.scrollTo(target, true, HEADER_SCROLL_OFFSET);
    return;
  }

  target?.scrollIntoView();
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
  const skipScrollResetRef = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      skipScrollResetRef.current = true;
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    if (skipScrollResetRef.current) {
      skipScrollResetRef.current = false;
      return;
    }

    if (window.location.hash) {
      return;
    }

    resetWindowScroll();
    ScrollTrigger.clearScrollMemory();
  }, [pathname]);

  useLayoutEffect(() => {
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
    let cancelled = false;
    const hydrationFrame = afterHydration(() => {
      if (cancelled) {
        return;
      }

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
          if (event.defaultPrevented || isModifiedClick(event)) {
            return;
          }

          const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
            "a[href]",
          );

          if (
            !anchor ||
            anchor.target === "_blank" ||
            anchor.hasAttribute("download")
          ) {
            return;
          }

          const url = new URL(anchor.href, window.location.href);

          if (
            url.origin !== window.location.origin ||
            url.pathname !== window.location.pathname ||
            !url.hash
          ) {
            return;
          }

          const targetId = url.hash.slice(1);

          if (!targetId || !document.getElementById(targetId)) {
            return;
          }

          // Capture + preventDefault so Next.js Link sees defaultPrevented
          // and does not treat /#systems as a client navigation (RSC remount
          // + native scrollIntoView fights ScrollSmoother).
          event.preventDefault();
          scrollToHashTarget(url.hash);

          const nextUrl = `${url.pathname}${url.search}${url.hash}`;
          const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

          if (nextUrl !== currentUrl) {
            window.history.pushState(window.history.state, "", nextUrl);
          }
        };

        const onHashPop = () => {
          if (window.location.hash) {
            scrollToHashTarget(window.location.hash);
            return;
          }

          smoother.scrollTo(0, true);
        };

        document.addEventListener("click", onClick, true);
        window.addEventListener("popstate", onHashPop);

        const hashFrame = window.requestAnimationFrame(() => {
          if (window.location.hash) {
            scrollToHashTarget(window.location.hash);
          }
        });

        return () => {
          window.cancelAnimationFrame(hashFrame);
          document.removeEventListener("click", onClick, true);
          window.removeEventListener("popstate", onHashPop);
          smoother.kill();
          delete wrapper.dataset.enhanced;
          root.dataset.scrollSmoother = "off";
          document.body.style.removeProperty("height");
          // ScrollTrigger.refresh() replays the recorded window offset. Clear it
          // before refresh so the shorter next page is not clamped to that offset.
          ScrollTrigger.clearScrollMemory();
          if (!skipScrollResetRef.current && !window.location.hash) {
            resetWindowScroll();
          }
          ScrollTrigger.refresh();
          ScrollTrigger.clearScrollMemory();
          if (!skipScrollResetRef.current && !window.location.hash) {
            resetWindowScroll();
            window.requestAnimationFrame(() => {
              if (skipScrollResetRef.current || window.location.hash) {
                return;
              }
              resetWindowScroll();
              ScrollTrigger.clearScrollMemory();
            });
          }
        };
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(hydrationFrame);
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
