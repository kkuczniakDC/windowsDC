"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brandConfig, routes } from "@/lib/brand";

import styles from "./AdminSidebar.module.css";
import formStyles from "./admin-forms.module.css";

const NAV = [
  { href: "/admin-preview", label: "Overview", exact: true },
  { href: "/admin-preview/products", label: "Products" },
  { href: "/admin-preview/categories", label: "Categories" },
  { href: "/admin-preview/media", label: "Media" },
  { href: "/admin-preview/content", label: "Content" },
  { href: "/admin-preview/social", label: "Social" },
] as const;

type AdminSidebarProps = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className={`${styles.overlay} ${styles.overlayVisible}`}
          aria-label="Close navigation"
          onClick={onCloseMobile}
        />
      ) : null}
      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}
        aria-label="Admin preview navigation"
      >
        <div className={styles.brand}>
          <p className={styles.wordmark}>{brandConfig.workingName}</p>
          {brandConfig.isWorkingNameTemporary ? (
            <p className={styles.workingTitle}>Working title</p>
          ) : null}
          <p className={styles.workspaceLabel}>Admin preview</p>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV.map((item) => {
              const active =
                "exact" in item && item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={onCloseMobile}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <Link
            href={routes.home}
            className={formStyles.externalLink}
            onClick={onCloseMobile}
          >
            View public site ↗
          </Link>
        </div>
      </aside>
    </>
  );
}
