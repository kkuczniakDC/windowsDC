"use client";

import { useEffect, useId, type FormEvent, useState } from "react";

import { categoryIds, type CategoryId } from "@/lib/content";
import { categoryLabel } from "@/lib/admin-preview/labels";
import type { AdminProduct, ProductStatus } from "@/lib/admin-preview/types";

import formStyles from "./admin-forms.module.css";
import styles from "./ProductEditor.module.css";

type ProductEditorProps = {
  open: boolean;
  mode: "create" | "edit";
  product?: AdminProduct;
  onClose: () => void;
  onSave: (values: {
    title: string;
    summary: string;
    categoryId: CategoryId;
    status: ProductStatus;
  }) => void;
};

export function ProductEditor(props: ProductEditorProps) {
  if (!props.open) {
    return null;
  }

  return (
    <ProductEditorForm
      key={props.mode === "edit" ? (props.product?.id ?? "edit") : "create"}
      {...props}
    />
  );
}

function ProductEditorForm({
  mode,
  product,
  onClose,
  onSave,
}: ProductEditorProps) {
  const titleId = useId();
  const [title, setTitle] = useState(product?.title ?? "");
  const [summary, setSummary] = useState(product?.summary ?? "");
  const [categoryId, setCategoryId] = useState<CategoryId>(
    product?.categoryId ?? "windows",
  );
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "draft");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onSave({
      title: title.trim(),
      summary: summary.trim(),
      categoryId,
      status,
    });
  }

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className={styles.heading}>
          {mode === "create" ? "New sample product" : "Edit sample product"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={formStyles.field}>
            <label htmlFor="pe-title">Title</label>
            <input
              id="pe-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="pe-summary">Summary</label>
            <textarea
              id="pe-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="pe-category">Category</label>
            <select
              id="pe-category"
              value={categoryId}
              onChange={(event) =>
                setCategoryId(event.target.value as CategoryId)
              }
              disabled={mode === "edit" && Boolean(product?.chapters?.length)}
            >
              {categoryIds.map((id) => (
                <option key={id} value={id}>
                  {categoryLabel(id)}
                </option>
              ))}
            </select>
          </div>
          <div className={formStyles.field}>
            <label htmlFor="pe-status">Status</label>
            <select
              id="pe-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ProductStatus)
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          {error ? <p className={formStyles.error}>{error}</p> : null}
          <div className={formStyles.btnRow}>
            <button type="submit" className={formStyles.btnPrimary}>
              {mode === "create" ? "Create sample" : "Save in preview"}
            </button>
            <button
              type="button"
              className={formStyles.btnSecondary}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
