"use client";

import Link from "next/link";

import { mediaCatalog } from "@/lib/admin-preview/media-catalog";
import { formatPreviewDate } from "@/lib/admin-preview/labels";

import { useAdminPreview } from "./AdminPreviewProvider";
import { AdminPage } from "./AdminPage";
import { StatusChip } from "./StatusChip";
import formStyles from "./admin-forms.module.css";
import panelStyles from "./admin-panels.module.css";
import tableStyles from "./admin-table.module.css";

export function DashboardView() {
  const { products, activity } = useAdminPreview();

  const published = products.filter((p) => p.status === "published").length;
  const draft = products.filter((p) => p.status === "draft").length;
  const imageCount = mediaCatalog.filter((m) => m.kind === "image").length;

  const recent = [...products]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 6);

  return (
    <AdminPage title="Overview">
      <section className={panelStyles.section}>
        <h2 className={panelStyles.sectionTitle}>Workspace totals</h2>
        <div className={panelStyles.statRow}>
          <div className={panelStyles.stat}>
            <p className={panelStyles.statValue}>{products.length}</p>
            <p className={panelStyles.statLabel}>Sample products</p>
          </div>
          <div className={panelStyles.stat}>
            <p className={panelStyles.statValue}>{published}</p>
            <p className={panelStyles.statLabel}>Published in preview</p>
          </div>
          <div className={panelStyles.stat}>
            <p className={panelStyles.statValue}>{draft}</p>
            <p className={panelStyles.statLabel}>Draft in preview</p>
          </div>
          <div className={panelStyles.stat}>
            <p className={panelStyles.statValue}>{imageCount}</p>
            <p className={panelStyles.statLabel}>Library images</p>
          </div>
        </div>
      </section>

      <section className={panelStyles.section}>
        <h2 className={panelStyles.sectionTitle}>Quick actions</h2>
        <div className={formStyles.btnRow}>
          <Link href="/admin-preview/products?create=1" className={formStyles.btnPrimary}>
            New sample product
          </Link>
          <Link href="/admin-preview/products" className={formStyles.btnSecondary}>
            View products
          </Link>
          <Link href="/admin-preview/media" className={formStyles.btnSecondary}>
            View media
          </Link>
        </div>
      </section>

      <div className={panelStyles.twoCol}>
        <section className={panelStyles.section}>
          <h2 className={panelStyles.sectionTitle}>Recently updated</h2>
          <ul className={tableStyles.list}>
            {recent.map((product, index) => (
              <li key={product.id}>
                <Link
                  href={`/admin-preview/products?selected=${product.id}`}
                  className={tableStyles.row}
                >
                  <span
                    className={`${tableStyles.index} ${index > 2 ? tableStyles.indexMuted : ""}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={tableStyles.title}>{product.title}</span>
                    <span className={tableStyles.meta}>
                      Updated {formatPreviewDate(product.updatedAt)}
                    </span>
                  </span>
                  <StatusChip variant={product.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={panelStyles.section}>
          <h2 className={panelStyles.sectionTitle}>Recent activity</h2>
          <div className={panelStyles.panel}>
            <ul className={panelStyles.activityList}>
              {activity.slice(0, 8).map((item) => (
                <li key={item.id} className={panelStyles.activityItem}>
                  <p className={panelStyles.activityMessage}>{item.message}</p>
                  <p className={panelStyles.activityMeta}>
                    {formatPreviewDate(item.timestamp)} · {item.sampleNote}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}
