import Link from "next/link";

import { brandConfig, routes } from "@/lib/brand";

import { SiteNavLink } from "./SiteNavLink";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.lead}>
          <p className={styles.brand}>{brandConfig.workingName}</p>
          <p className={styles.statement}>
            Architectural windows, doors and glazing shaped around light,
            comfort and lasting detail.
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <div>
            <p>Explore</p>
            <SiteNavLink href="/#systems">Systems</SiteNavLink>
            <SiteNavLink href="/#approach">Approach</SiteNavLink>
            <SiteNavLink href={routes.architects}>For architects</SiteNavLink>
            <SiteNavLink href={routes.about}>About</SiteNavLink>
          </div>
          <div>
            <p>Begin</p>
            <SiteNavLink href={routes.consultation}>Project consultation</SiteNavLink>
            <SiteNavLink href="/#atmospheres">Atmosphere studies</SiteNavLink>
          </div>
        </nav>
        <div className={styles.legal}>
          <p>
            © {brandConfig.copyrightYear} {brandConfig.workingName}
            {brandConfig.isWorkingNameTemporary ? " — working title" : ""}
          </p>
          <p>
            <Link className="text-link" href={routes.privacy}>
              Privacy notice (draft)
            </Link>
          </p>
          <p>Visual references are not completed projects by the brand.</p>
        </div>
      </div>
    </footer>
  );
}
