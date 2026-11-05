"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { categoryIds, type CategoryId } from "@/lib/content";
import { categoryLabel, formatPreviewDate } from "@/lib/admin-preview/labels";
import { getMediaById } from "@/lib/admin-preview/media-catalog";
import type { ProductStatus } from "@/lib/admin-preview/types";

import { useAdminPreview } from "./AdminPreviewProvider";
import { AdminPage } from "./AdminPage";
import { ConfirmDialog } from "./ConfirmDialog";
import { ProductEditor } from "./ProductEditor";
import { StatusChip } from "./StatusChip";
import formStyles from "./admin-forms.module.css";
import panelStyles from "./admin-panels.module.css";
import tableStyles from "./admin-table.module.css";

export function ProductsView() {
  const {
    products,
    createProduct,
    updateProduct,
    toggleProductStatus,
  } = useAdminPreview();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | "all">(
    () => {
      const category = searchParams.get("category");
      if (category && categoryIds.includes(category as CategoryId)) {
        return category as CategoryId;
      }
      return "all";
    },
  );
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">(
    "all",
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    () => searchParams.get("selected"),
  );
  const [editorOpen, setEditorOpen] = useState(
    () => searchParams.get("create") === "1",
  );
  const [editorMode, setEditorMode] = useState<"create" | "edit">(
    () => (searchParams.get("create") === "1" ? "create" : "edit"),
  );
  const [confirmToggle, setConfirmToggle] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.categoryId !== categoryFilter)
        return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, categoryFilter, statusFilter]);

  const selected = products.find((p) => p.id === selectedId) ?? null;

  const openCreate = useCallback(() => {
    setEditorMode("create");
    setEditorOpen(true);
  }, []);

  const openEdit = useCallback(() => {
    if (!selected) return;
    setEditorMode("edit");
    setEditorOpen(true);
  }, [selected]);

  function clearCreateParam() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("create");
    const query = params.toString();
    router.replace(
      query ? `/admin-preview/products?${query}` : "/admin-preview/products",
      { scroll: false },
    );
  }

  return (
    <AdminPage
      title="Products"
      primaryAction={
        <button
          type="button"
          className={formStyles.btnPrimary}
          onClick={openCreate}
        >
          New sample product
        </button>
      }
    >
      <div className={panelStyles.filters}>
        <div className={formStyles.field}>
          <label htmlFor="prod-search">Search</label>
          <input
            id="prod-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title"
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="prod-category">Category</label>
          <select
            id="prod-category"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as CategoryId | "all")
            }
          >
            <option value="all">All categories</option>
            {categoryIds.map((id) => (
              <option key={id} value={id}>
                {categoryLabel(id)}
              </option>
            ))}
          </select>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="prod-status">Status</label>
          <select
            id="prod-status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ProductStatus | "all")
            }
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className={panelStyles.twoCol}>
        <div>
          {filtered.length === 0 ? (
            <p className={panelStyles.empty}>
              No sample products match this search. Try clearing filters or
              create a new sample product.
            </p>
          ) : (
            <ul className={tableStyles.list}>
              {filtered.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className={`${tableStyles.row} ${selectedId === product.id ? tableStyles.rowSelected : ""}`}
                    onClick={() => setSelectedId(product.id)}
                  >
                    <span
                      className={`${tableStyles.index} ${index > 4 ? tableStyles.indexMuted : ""}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={tableStyles.title}>{product.title}</span>
                      <span className={tableStyles.metaRow}>
                        <span className={tableStyles.meta}>
                          {categoryLabel(product.categoryId)}
                        </span>
                        <span className={tableStyles.meta}>
                          {product.sampleLabel}
                        </span>
                      </span>
                    </span>
                    <StatusChip variant={product.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className={panelStyles.panel} aria-label="Product detail">
          {selected ? (
            <>
              <p className={panelStyles.sectionTitle}>Detail</p>
              <h2 className={panelStyles.detailTitle}>{selected.title}</h2>
              <div className={formStyles.btnRow}>
                <StatusChip variant={selected.status} />
                <StatusChip variant="reference" label="Sample" />
              </div>
              <p className={panelStyles.detailBody}>{selected.summary}</p>
              <p className={tableStyles.meta}>
                {categoryLabel(selected.categoryId)} · Updated{" "}
                {formatPreviewDate(selected.updatedAt)}
              </p>
              {selected.configurations.length > 0 ? (
                <>
                  <p className={panelStyles.sectionTitle}>Configurations</p>
                  <ul className={panelStyles.tagList}>
                    {selected.configurations.map((cfg) => (
                      <li key={cfg} className={panelStyles.tag}>
                        {cfg}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {selected.mediaIds.length > 0 ? (
                <>
                  <p className={panelStyles.sectionTitle}>Linked media</p>
                  <ul className={panelStyles.tagList}>
                    {selected.mediaIds.map((id) => {
                      const media = getMediaById(id);
                      return (
                        <li key={id} className={panelStyles.tag}>
                          {media?.filename ?? id}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
              {selected.chapters && selected.chapters.length > 0 ? (
                <>
                  <p className={panelStyles.sectionTitle}>Chapters</p>
                  <ul className={panelStyles.chapterList}>
                    {selected.chapters.map((chapter) => (
                      <li key={chapter.id} className={panelStyles.chapterItem}>
                        <p className={panelStyles.chapterTitle}>
                          {chapter.title}
                        </p>
                        <p className={panelStyles.chapterSummary}>
                          {chapter.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <div className={formStyles.btnRow}>
                <button
                  type="button"
                  className={formStyles.btnSecondary}
                  onClick={openEdit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={formStyles.btnPrimary}
                  onClick={() => setConfirmToggle(true)}
                >
                  {selected.status === "published"
                    ? "Mark draft"
                    : "Publish in preview"}
                </button>
              </div>
            </>
          ) : (
            <p className={panelStyles.detailBody}>
              Select a sample product to inspect summary, configurations, and
              entrance chapters.
            </p>
          )}
        </aside>
      </div>

      <ProductEditor
        open={editorOpen}
        mode={editorMode}
        product={editorMode === "edit" ? selected ?? undefined : undefined}
        onClose={() => {
          setEditorOpen(false);
          clearCreateParam();
        }}
        onSave={(values) => {
          if (editorMode === "create") {
            createProduct(values);
          } else if (selected) {
            updateProduct(selected.id, values);
          }
          setEditorOpen(false);
          clearCreateParam();
        }}
      />

      <ConfirmDialog
        open={confirmToggle && Boolean(selected)}
        title="Update preview status?"
        description="This only changes the demo workspace. Nothing is published to the public site or saved to disk."
        confirmLabel={
          selected?.status === "published" ? "Mark draft" : "Publish in preview"
        }
        onCancel={() => setConfirmToggle(false)}
        onConfirm={() => {
          if (selected) toggleProductStatus(selected.id);
          setConfirmToggle(false);
        }}
      />
    </AdminPage>
  );
}
