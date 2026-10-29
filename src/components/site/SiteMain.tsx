import type { ReactNode } from "react";

type SiteMainProps = {
  children: ReactNode;
  id?: string;
};

export function SiteMain({ children, id = "main-content" }: SiteMainProps) {
  return (
    <main className="site-main" id={id}>
      {children}
    </main>
  );
}
