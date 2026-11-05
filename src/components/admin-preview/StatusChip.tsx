import styles from "./StatusChip.module.css";

type StatusChipProps =
  | { variant: "draft" | "published" }
  | { variant: "reference"; label?: string };

export function StatusChip(props: StatusChipProps) {
  if (props.variant === "reference") {
    return (
      <span className={`${styles.chip} ${styles.reference}`}>
        {props.label ?? "Reference — not a project"}
      </span>
    );
  }

  const label = props.variant === "published" ? "Published" : "Draft";
  return (
    <span
      className={`${styles.chip} ${props.variant === "published" ? styles.published : styles.draft}`}
    >
      {label}
    </span>
  );
}
