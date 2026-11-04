import Link from "next/link";

import { brandConfig, routes } from "@/lib/brand";

import { SiteNavLink } from "./SiteNavLink";
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
          <SiteNavLink href="/#systems">Systems</SiteNavLink>
          <SiteNavLink href="/#approach">Approach</SiteNavLink>
          <SiteNavLink href={routes.architects}>For architects</SiteNavLink>
        </div>
        <SiteNavLink className={styles.consultation} href={routes.consultation}>
          Book a consultation
          <span aria-hidden="true">↗</span>
        </SiteNavLink>
      </nav>
    </header>
  );
}
