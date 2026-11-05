import { getAllCategories, type CategoryId } from "@/lib/content";

import type { ActivityEvent, AdminProduct, ProductChapter } from "./types";

const ENTRANCE_PARENT_FAMILY_ID = "contemporary-aluminium";

const CHAPTER_FAMILY_IDS = new Set([
  "contemporary-aluminium",
  "panelled",
  "glazed",
  "bespoke",
  "handles",
  "surfaces",
]);

function isoDate(day: number, statusOffset: number): string {
  const base = `2026-11-0${day}`;
  return `${base}T${10 + statusOffset}:30:00.000Z`;
}

function statusForIndex(index: number): "published" | "draft" {
  return index % 3 === 0 ? "draft" : "published";
}

function mediaForCategory(categoryId: CategoryId, index: number): string[] {
  const pools: Record<CategoryId, string[]> = {
    windows: ["bundo-kim", "sunset-window"],
    "sliding-doors": ["sliding-door-dark", "zhisheng-deng"],
    "entrance-doors": [],
    "architectural-glazing": ["naomi-august", "ej-li"],
  };
  const pool = pools[categoryId];
  if (pool.length === 0) return [];
  if (index % 2 === 0) return [pool[0]!];
  return [pool[0]!, pool[1]!];
}

export function buildInitialProducts(): AdminProduct[] {
  const categories = getAllCategories();
  const products: AdminProduct[] = [];
  let globalIndex = 0;

  for (const category of categories) {
    if (category.id === "entrance-doors") {
      const parentFamily = category.families.find(
        (f) => f.id === ENTRANCE_PARENT_FAMILY_ID,
      );
      const chapterFamilies = category.families.filter((f) =>
        CHAPTER_FAMILY_IDS.has(f.id),
      );

      if (!parentFamily) continue;

      const chapters: ProductChapter[] = chapterFamilies.map((family) => ({
        id: family.id,
        title: family.title,
        summary: family.summary,
        configurations: [...family.configurations],
      }));

      products.push({
        id: `product-${category.id}-${parentFamily.id}`,
        title: parentFamily.title,
        summary: parentFamily.summary,
        categoryId: category.id,
        status: statusForIndex(globalIndex),
        sampleLabel: "Sample",
        configurations: [...parentFamily.configurations],
        updatedAt: isoDate(3, globalIndex % 5),
        mediaIds: [],
        chapters,
      });
      globalIndex += 1;
      continue;
    }

    for (const family of category.families) {
      products.push({
        id: `product-${category.id}-${family.id}`,
        title: family.title,
        summary: family.summary,
        categoryId: category.id,
        status: statusForIndex(globalIndex),
        sampleLabel: "Sample",
        configurations: [...family.configurations],
        updatedAt: isoDate((globalIndex % 5) + 1, globalIndex % 4),
        mediaIds: mediaForCategory(category.id, globalIndex),
      });
      globalIndex += 1;
    }
  }

  return products;
}

export const initialActivityFeed: ActivityEvent[] = [
  {
    id: "act-1",
    kind: "status",
    message: "Timber Casement Windows marked draft (demo).",
    timestamp: "2026-11-05T09:12:00.000Z",
    sampleNote: "Sample event",
  },
  {
    id: "act-2",
    kind: "edit",
    message: "Slimline Sliding Doors summary edited in preview.",
    timestamp: "2026-11-04T16:40:00.000Z",
    sampleNote: "Sample event",
  },
  {
    id: "act-3",
    kind: "media",
    message: "Visual reference attached to Large Panoramic Sliding Doors.",
    timestamp: "2026-11-04T11:05:00.000Z",
    sampleNote: "Sample event",
  },
  {
    id: "act-4",
    kind: "create",
    message: "Sample product “Corner study slider” created locally.",
    timestamp: "2026-11-03T14:22:00.000Z",
    sampleNote: "Sample event",
  },
  {
    id: "act-5",
    kind: "status",
    message: "Structural Glass Walls published in preview (not live).",
    timestamp: "2026-11-02T10:00:00.000Z",
    sampleNote: "Sample event",
  },
  {
    id: "act-6",
    kind: "edit",
    message: "About page hero lede adjusted in content preview.",
    timestamp: "2026-11-01T08:45:00.000Z",
    sampleNote: "Sample event",
  },
];
