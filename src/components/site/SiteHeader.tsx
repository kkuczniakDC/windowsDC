import Link from "next/link";

import { brandConfig, routes } from "@/lib/brand";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link className={styles.brand} href={routes.home}>
          <span>{brandConfig.workingName}</span>
          {brandConfig.isWorkingNameTemporary ? (
            <small>Working title</small>
          ) : null}
        </Link>
        <div className={styles.primaryLinks}>
          <Link href="/#systems">Systems</Link>
          <Link href="/#approach">Approach</Link>
          <Link href="/#architects">For architects</Link>
        </div>
        <Link className={styles.consultation} href={routes.consultation}>
          Book a consultation
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
