"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { aboutContent, architectsContent } from "@/lib/content";
import { routes } from "@/lib/brand";
import { getInitialMediaOrder } from "@/lib/admin-preview/media-catalog";
import {
  buildInitialProducts,
  initialActivityFeed,
} from "@/lib/admin-preview/mock-data";
import type {
  ActivityEvent,
  AdminProduct,
  ContentPageId,
  EditablePageContent,
  ProductStatus,
} from "@/lib/admin-preview/types";
import type { CategoryId } from "@/lib/content";

type NewProductInput = {
  title: string;
  summary: string;
  categoryId: CategoryId;
  status: ProductStatus;
};

type AdminPreviewContextValue = {
  products: AdminProduct[];
  activity: ActivityEvent[];
  contentPages: Record<ContentPageId, EditablePageContent>;
  mediaOrder: string[];
  selectedMediaIds: Set<string>;
  createProduct: (input: NewProductInput) => void;
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  toggleProductStatus: (id: string) => void;
  updateContentPage: (
    id: ContentPageId,
    patch: Partial<EditablePageContent>,
  ) => void;
  toggleMediaSelection: (id: string) => void;
  moveMediaUp: (id: string) => void;
  moveMediaDown: (id: string) => void;
  pushActivity: (event: Omit<ActivityEvent, "id" | "sampleNote">) => void;
};

const AdminPreviewContext = createContext<AdminPreviewContextValue | null>(
  null,
);

function buildInitialContent(): Record<ContentPageId, EditablePageContent> {
  return {
    about: {
      id: "about",
      label: "About",
      publicHref: routes.about,
      heroTitle: aboutContent.heroTitle,
      heroLede: aboutContent.heroLede,
      thesisTitle: aboutContent.thesisTitle,
      thesisParagraphs: [...aboutContent.thesisParagraphs],
    },
    architects: {
      id: "architects",
      label: "For architects",
      publicHref: routes.architects,
      heroTitle: architectsContent.heroTitle,
      heroLede: architectsContent.heroLede,
      thesisTitle: architectsContent.thesisTitle,
      thesisParagraphs: [...architectsContent.thesisParagraphs],
    },
  };
}

function nextActivityId(): string {
  return `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AdminPreviewProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    buildInitialProducts(),
  );
  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivityFeed);
  const [contentPages, setContentPages] = useState(buildInitialContent);
  const [mediaOrder, setMediaOrder] = useState<string[]>(getInitialMediaOrder);
  const [selectedMediaIds, setSelectedMediaIds] = useState<Set<string>>(
    () => new Set(),
  );

  const pushActivity = useCallback(
    (event: Omit<ActivityEvent, "id" | "sampleNote">) => {
      setActivity((prev) => [
        {
          ...event,
          id: nextActivityId(),
          sampleNote: "Sample event",
        },
        ...prev,
      ]);
    },
    [],
  );

  const createProduct = useCallback(
    (input: NewProductInput) => {
      const id = `product-sample-${Date.now()}`;
      const product: AdminProduct = {
        id,
        title: input.title,
        summary: input.summary,
        categoryId: input.categoryId,
        status: input.status,
        sampleLabel: "Sample",
        configurations: [],
        updatedAt: new Date().toISOString(),
        mediaIds: [],
      };
      setProducts((prev) => [product, ...prev]);
      pushActivity({
        kind: "create",
        message: `Sample product “${input.title}” created in preview.`,
        timestamp: new Date().toISOString(),
      });
    },
    [pushActivity],
  );

  const updateProduct = useCallback(
    (id: string, patch: Partial<AdminProduct>) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, ...patch, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
      pushActivity({
        kind: "edit",
        message: `Product updated in preview (${patch.title ?? "fields changed"}).`,
        timestamp: new Date().toISOString(),
      });
    },
    [pushActivity],
  );

  const toggleProductStatus = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const product = prev.find((p) => p.id === id);
        if (!product) return prev;
        const status: ProductStatus =
          product.status === "published" ? "draft" : "published";
        pushActivity({
          kind: "status",
          message: `“${product.title}” marked ${status} in preview (not live).`,
          timestamp: new Date().toISOString(),
        });
        return prev.map((p) =>
          p.id === id
            ? { ...p, status, updatedAt: new Date().toISOString() }
            : p,
        );
      });
    },
    [pushActivity],
  );

  const updateContentPage = useCallback(
    (id: ContentPageId, patch: Partial<EditablePageContent>) => {
      setContentPages((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...patch },
      }));
    },
    [],
  );

  const toggleMediaSelection = useCallback((id: string) => {
    setSelectedMediaIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const moveMediaUp = useCallback((id: string) => {
    setMediaOrder((prev) => {
      const index = prev.indexOf(id);
      if (index <= 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
      return next;
    });
  }, []);

  const moveMediaDown = useCallback((id: string) => {
    setMediaOrder((prev) => {
      const index = prev.indexOf(id);
      if (index < 0 || index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      products,
      activity,
      contentPages,
      mediaOrder,
      selectedMediaIds,
      createProduct,
      updateProduct,
      toggleProductStatus,
      updateContentPage,
      toggleMediaSelection,
      moveMediaUp,
      moveMediaDown,
      pushActivity,
    }),
    [
      products,
      activity,
      contentPages,
      mediaOrder,
      selectedMediaIds,
      createProduct,
      updateProduct,
      toggleProductStatus,
      updateContentPage,
      toggleMediaSelection,
      moveMediaUp,
      moveMediaDown,
      pushActivity,
    ],
  );

  return (
    <AdminPreviewContext.Provider value={value}>
      {children}
    </AdminPreviewContext.Provider>
  );
}

export function useAdminPreview(): AdminPreviewContextValue {
  const ctx = useContext(AdminPreviewContext);
  if (!ctx) {
    throw new Error("useAdminPreview must be used within AdminPreviewProvider");
  }
  return ctx;
}
