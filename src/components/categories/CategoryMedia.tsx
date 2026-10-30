import Image, { type StaticImageData } from "next/image";

import styles from "./CategoryMedia.module.css";

export type CategoryMediaAspect = "frame" | "panorama" | "door" | "glass";

type CategoryMediaProps = {
  aspect: CategoryMediaAspect;
  label: string;
  tone?: "ink" | "paper";
  nested?: boolean;
  image?: StaticImageData;
  alt?: string;
  sizes?: string;
  className?: string;
  captionClassName?: string;
};

export function CategoryMedia({
  aspect,
  label,
  tone = "paper",
  nested = false,
  image,
  alt,
  sizes = "(min-width: 1100px) 48vw, 100vw",
  className,
  captionClassName,
}: CategoryMediaProps) {
  const figureClass = [
    styles.figure,
    styles[aspect],
    nested ? styles.nested : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={figureClass} data-media-aspect={aspect}>
      {image ? (
        <div className={styles.photo}>
          <Image
            src={image}
            alt={alt ?? label}
            fill
            sizes={sizes}
          />
        </div>
      ) : (
        <div className={`${styles.placeholder} ${styles[tone]}`}>
          <Diagram aspect={aspect} />
        </div>
      )}
      <figcaption className={captionClassName ?? styles.caption}>
        {label}
      </figcaption>
    </figure>
  );
}

function Diagram({ aspect }: { aspect: CategoryMediaAspect }) {
  switch (aspect) {
    case "frame":
      return (
        <svg
          className={styles.diagram}
          viewBox="0 0 160 200"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="10" y="10" width="140" height="180" fill="none" stroke="currentColor" strokeWidth="1.35" />
          <rect x="24" y="24" width="112" height="152" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <line x1="80" y1="24" x2="80" y2="176" stroke="currentColor" strokeWidth="0.7" />
          <line x1="118" y1="92" x2="126" y2="92" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "panorama":
      return (
        <svg
          className={styles.diagram}
          viewBox="0 0 280 110"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="8" y="12" width="264" height="78" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" y1="86" x2="272" y2="86" stroke="currentColor" strokeWidth="2" />
          <line x1="96" y1="12" x2="96" y2="86" stroke="currentColor" strokeWidth="0.7" />
          <line x1="184" y1="18" x2="184" y2="80" stroke="currentColor" strokeWidth="1.4" />
          <rect x="176" y="18" width="16" height="62" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </svg>
      );
    case "door":
      return (
        <svg
          className={styles.diagram}
          viewBox="0 0 120 220"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="18" y="8" width="84" height="204" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <rect x="30" y="22" width="60" height="88" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <rect x="30" y="122" width="60" height="74" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <line x1="88" y1="118" x2="96" y2="118" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="86" cy="118" r="2.2" fill="currentColor" />
        </svg>
      );
    case "glass":
      return (
        <svg
          className={styles.diagram}
          viewBox="0 0 200 160"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="14" y="18" width="86" height="124" fill="none" stroke="currentColor" strokeWidth="0.85" />
          <rect x="100" y="18" width="86" height="124" fill="none" stroke="currentColor" strokeWidth="0.85" />
          <line x1="100" y1="18" x2="100" y2="142" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M48 142 L100 86 L152 142"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.7"
          />
        </svg>
      );
  }
}
