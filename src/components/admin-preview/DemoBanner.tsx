import styles from "./DemoBanner.module.css";

export function DemoBanner() {
  return (
    <div className={styles.banner} role="status">
      DEMO PREVIEW — Visual prototype only. No live data connected. Changes are
      not saved.
    </div>
  );
}
