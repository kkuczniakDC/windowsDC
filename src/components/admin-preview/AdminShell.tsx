"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AdminSidebar } from "./AdminSidebar";
import { DemoBanner } from "./DemoBanner";
import styles from "./AdminShell.module.css";

type AdminNavContextValue = {
  onMenuClick: () => void;
  menuExpanded: boolean;
};

const AdminNavContext = createContext<AdminNavContextValue | null>(null);

export function useAdminNav(): AdminNavContextValue {
  const value = useContext(AdminNavContext);
  if (!value) {
    throw new Error("useAdminNav must be used within AdminShell");
  }
  return value;
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useMemo(
    () => ({
      onMenuClick: () => setMobileOpen((open) => !open),
      menuExpanded: mobileOpen,
    }),
    [mobileOpen],
  );

  return (
    <AdminNavContext.Provider value={nav}>
      <div className={styles.root}>
        <a href="#admin-main-content" className={styles.skip}>
          Skip to workspace content
        </a>
        <DemoBanner />
        <div className={styles.frame}>
          <div id="admin-sidebar">
            <AdminSidebar
              mobileOpen={mobileOpen}
              onCloseMobile={() => setMobileOpen(false)}
            />
          </div>
          <div className={styles.mainWrap}>
            <main id="admin-main-content" className={styles.main}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </AdminNavContext.Provider>
  );
}
