"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import type { ContentPageId } from "@/lib/admin-preview/types";

import { useAdminPreview } from "./AdminPreviewProvider";
import { AdminPage } from "./AdminPage";
import formStyles from "./admin-forms.module.css";
import panelStyles from "./admin-panels.module.css";

export function ContentView() {
  const { contentPages, updateContentPage } = useAdminPreview();
  const [activeId, setActiveId] = useState<ContentPageId>("about");
  const [saved, setSaved] = useState(false);

  const page = contentPages[activeId];

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <AdminPage title="Content">
      <p className={panelStyles.detailBody}>
        Edit sample copies of editorial pages in this session only. Saving here
        updates React state—it does not write to{" "}
        <code>src/lib/content</code> or the public site.
      </p>

      <div className={formStyles.btnRow}>
        {(Object.keys(contentPages) as ContentPageId[]).map((id) => (
          <button
            key={id}
            type="button"
            className={
              id === activeId ? formStyles.btnPrimary : formStyles.btnSecondary
            }
            onClick={() => {
              setActiveId(id);
              setSaved(false);
            }}
          >
            {contentPages[id].label}
          </button>
        ))}
        <Link href={page.publicHref} className={formStyles.externalLink}>
          View public page ↗
        </Link>
      </div>

      <form
        className={panelStyles.panel}
        onSubmit={handleSave}
        aria-label={`Edit ${page.label}`}
      >
        <div className={formStyles.field}>
          <label htmlFor="hero-title">Hero title</label>
          <input
            id="hero-title"
            value={page.heroTitle}
            onChange={(e) =>
              updateContentPage(activeId, { heroTitle: e.target.value })
            }
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="hero-lede">Hero lede</label>
          <textarea
            id="hero-lede"
            value={page.heroLede}
            onChange={(e) =>
              updateContentPage(activeId, { heroLede: e.target.value })
            }
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="thesis-title">Thesis title</label>
          <input
            id="thesis-title"
            value={page.thesisTitle}
            onChange={(e) =>
              updateContentPage(activeId, { thesisTitle: e.target.value })
            }
          />
        </div>
        {page.thesisParagraphs.map((paragraph, index) => (
          <div key={index} className={formStyles.field}>
            <label htmlFor={`thesis-p-${index}`}>
              Thesis paragraph {index + 1}
            </label>
            <textarea
              id={`thesis-p-${index}`}
              value={paragraph}
              onChange={(e) => {
                const next = [...page.thesisParagraphs];
                next[index] = e.target.value;
                updateContentPage(activeId, { thesisParagraphs: next });
              }}
            />
          </div>
        ))}
        <div className={formStyles.btnRow}>
          <button type="submit" className={formStyles.btnPrimary}>
            Save in preview
          </button>
          {saved ? <span className={formStyles.saved}>Saved</span> : null}
        </div>
      </form>
    </AdminPage>
  );
}
