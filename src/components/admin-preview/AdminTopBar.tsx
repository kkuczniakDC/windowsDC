"use client";

import type { ReactNode } from "react";

import styles from "./AdminTopBar.module.css";

type AdminTopBarProps = {
  title: string;
  primaryAction?: ReactNode;
  onMenuClick: () => void;
  menuExpanded: boolean;
};

export function AdminTopBar({
  title,
  primaryAction,
  onMenuClick,
  menuExpanded,
}: AdminTopBarProps) {
  return (
    <header className={styles.bar}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-expanded={menuExpanded}
        aria-controls="admin-sidebar"
      >
        Menu
      </button>
      <h1 className={styles.title}>{title}</h1>
      {primaryAction ? (
        <div className={styles.actions}>{primaryAction}</div>
      ) : null}
    </header>
  );
}
