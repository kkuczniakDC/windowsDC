"use client";

import Link from "next/link";

import { getAllCategories } from "@/lib/content";

import { useAdminPreview } from "./AdminPreviewProvider";
import { AdminPage } from "./AdminPage";
import formStyles from "./admin-forms.module.css";
import panelStyles from "./admin-panels.module.css";
import tableStyles from "./admin-table.module.css";

export function CategoriesView() {
  const { products } = useAdminPreview();
  const categories = getAllCategories();

  return (
    <AdminPage title="Categories">
      <p className={panelStyles.detailBody}>
        Four public category lines, with illustrative sample product counts from
        this preview session.
      </p>
      <ul className={tableStyles.list}>
        {categories.map((category, index) => {
          const count = products.filter(
            (p) => p.categoryId === category.id,
          ).length;
          return (
            <li key={category.id}>
              <div className={`${tableStyles.row} ${tableStyles.rowStatic}`}>
                <span className={tableStyles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className={tableStyles.title}>{category.title}</span>
                  <span className={tableStyles.meta}>{category.navSummary}</span>
                  <p className={panelStyles.detailBody}>{category.heroLede}</p>
                  <div className={formStyles.btnRow}>
                    <Link
                      href={category.href}
                      className={formStyles.externalLink}
                    >
                      View public page ↗
                    </Link>
                    <Link
                      href={`/admin-preview/products?category=${category.id}`}
                      className={formStyles.btnSecondary}
                    >
                      View sample products
                    </Link>
                  </div>
                </span>
                <span className={tableStyles.meta}>
                  {count} sample
                  {count === 1 ? "" : "s"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
}
