import type { ReactNode } from "react";

import { SiteScrollShell } from "@/components/motion/SiteScrollShell";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteScrollShell
        header={<SiteHeader />}
        footer={<SiteFooter />}
      >
        {children}
      </SiteScrollShell>
    </>
  );
}
