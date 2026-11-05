"use client";

import { AdminPage } from "./AdminPage";
import styles from "./SocialView.module.css";

export function SocialView() {
  return (
    <AdminPage title="Social">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Publishing integrations</p>
        <h2 className={styles.title}>Coming soon</h2>
        <p className={styles.body}>
          Social and syndication hooks—scheduled posts, Open Graph previews, and
          channel-specific crops—are planned for a later phase. This preview
          deliberately shows no connected accounts or fake “live” badges.
        </p>
      </div>
    </AdminPage>
  );
}
