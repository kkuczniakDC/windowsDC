"use client";

import type { ReactNode } from "react";

import { useAdminNav } from "./AdminShell";
import { AdminTopBar } from "./AdminTopBar";

type AdminPageProps = {
  title: string;
  primaryAction?: ReactNode;
  children: ReactNode;
};

export function AdminPage({ title, primaryAction, children }: AdminPageProps) {
  const { onMenuClick, menuExpanded } = useAdminNav();

  return (
    <>
      <AdminTopBar
        title={title}
        primaryAction={primaryAction}
        onMenuClick={onMenuClick}
        menuExpanded={menuExpanded}
      />
      {children}
    </>
  );
}
