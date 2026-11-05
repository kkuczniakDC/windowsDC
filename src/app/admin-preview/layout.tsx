import type { ReactNode } from "react";

import { AdminPreviewProvider } from "@/components/admin-preview/AdminPreviewProvider";
import { AdminShell } from "@/components/admin-preview/AdminShell";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = {
  ...buildPageMetadata(
    "Admin preview",
    "Visual prototype of the Southern Windows admin workspace. Not indexed.",
  ),
  robots: { index: false, follow: false },
};

export default function AdminPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <AdminPreviewProvider>
      <AdminShell>{children}</AdminShell>
    </AdminPreviewProvider>
  );
}
