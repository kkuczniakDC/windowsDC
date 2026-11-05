"use client";

import Image from "next/image";

import {
  getMediaById,
  mediaCatalog,
  type MediaEntry,
} from "@/lib/admin-preview/media-catalog";

import { useAdminPreview } from "./AdminPreviewProvider";
import { AdminPage } from "./AdminPage";
import { StatusChip } from "./StatusChip";
import formStyles from "./admin-forms.module.css";
import styles from "./MediaView.module.css";

export function MediaView() {
  const {
    mediaOrder,
    selectedMediaIds,
    toggleMediaSelection,
    moveMediaUp,
    moveMediaDown,
  } = useAdminPreview();

  const ordered: MediaEntry[] = mediaOrder
    .map((id) => getMediaById(id))
    .filter((item): item is MediaEntry => Boolean(item));

  const selectedList = [...selectedMediaIds];

  return (
    <AdminPage title="Media">
      <p className={styles.note}>
        Flat library index for demo selection and ordering. Real uploads,
        transcoding, and CDN delivery will come in a later phase—use checkboxes
        and move controls to rehearse curation flow in this session only.
      </p>

      <div className={styles.toolbar}>
        <div className={formStyles.btnRow}>
          <button
            type="button"
            className={formStyles.btnSecondary}
            disabled={selectedList.length !== 1}
            onClick={() => {
              const id = selectedList[0];
              if (id) moveMediaUp(id);
            }}
          >
            Move up
          </button>
          <button
            type="button"
            className={formStyles.btnSecondary}
            disabled={selectedList.length !== 1}
            onClick={() => {
              const id = selectedList[0];
              if (id) moveMediaDown(id);
            }}
          >
            Move down
          </button>
        </div>
        <StatusChip variant="reference" />
      </div>

      <ul className={styles.index}>
        {ordered.map((item) => {
          const selected = selectedMediaIds.has(item.id);
          return (
            <li
              key={item.id}
              className={`${styles.row} ${selected ? styles.rowSelected : ""}`}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected}
                onChange={() => toggleMediaSelection(item.id)}
                aria-label={`Select ${item.filename}`}
              />
              {item.kind === "image" ? (
                <div className={styles.thumb}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    width={item.width}
                    height={item.height}
                    sizes="80px"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className={styles.thumbPlaceholder}>No preview</div>
              )}
              <div>
                <p className={styles.filename}>{item.filename}</p>
                <p className={styles.caption}>{item.caption}</p>
                {item.kind === "metadata-only" && item.note ? (
                  <p className={styles.metaOnly}>{item.note}</p>
                ) : null}
              </div>
              <span className={styles.caption}>
                {item.kind === "image"
                  ? `JPEG · ${item.width} × ${item.height}`
                  : item.filename.endsWith(".mp4")
                    ? "MP4 · not loaded"
                    : "JPEG · not loaded"}
              </span>
            </li>
          );
        })}
      </ul>

      <p className={styles.note}>
        {mediaCatalog.length} library rows ·{" "}
        {mediaCatalog.filter((m) => m.kind === "image").length} with thumbnails
        in preview
      </p>
    </AdminPage>
  );
}
