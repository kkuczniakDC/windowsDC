import { getAllCategories, type CategoryId } from "@/lib/content";

const categoryTitleById = Object.fromEntries(
  getAllCategories().map((c) => [c.id, c.title]),
) as Record<CategoryId, string>;

export function categoryLabel(id: CategoryId): string {
  return categoryTitleById[id] ?? id;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatPreviewDate(iso: string): string {
  const datePart = iso.slice(0, 10);
  const [year, month, day] = datePart.split("-");
  const monthIndex = Number(month) - 1;
  const monthLabel = MONTHS[monthIndex] ?? month;
  return `${Number(day)} ${monthLabel} ${year}`;
}
