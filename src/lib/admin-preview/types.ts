import type { CategoryId } from "@/lib/content";

export type ProductStatus = "published" | "draft";

export type ProductChapter = {
  id: string;
  title: string;
  summary: string;
  configurations: string[];
};

export type AdminProduct = {
  id: string;
  title: string;
  summary: string;
  categoryId: CategoryId;
  status: ProductStatus;
  sampleLabel: "Sample";
  configurations: string[];
  updatedAt: string;
  mediaIds: string[];
  chapters?: ProductChapter[];
};

export type ActivityKind = "status" | "edit" | "media" | "create";

export type ActivityEvent = {
  id: string;
  kind: ActivityKind;
  message: string;
  timestamp: string;
  sampleNote: string;
};

export type ContentPageId = "about" | "architects";

export type EditablePageContent = {
  id: ContentPageId;
  label: string;
  publicHref: string;
  heroTitle: string;
  heroLede: string;
  thesisTitle: string;
  thesisParagraphs: string[];
};

export type MediaAssetKind = "image" | "metadata-only";

export type MediaCatalogItem = {
  id: string;
  filename: string;
  caption: string;
  kind: MediaAssetKind;
  note?: string;
};
