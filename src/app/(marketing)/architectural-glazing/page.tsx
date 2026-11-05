import { CategoryPage } from "@/components/categories/CategoryPage";
import { getCategory } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

const category = getCategory("architectural-glazing");

export const metadata = buildPageMetadata(
  category.title,
  category.metadataDescription,
);

export default function ArchitecturalGlazingPage() {
  return <CategoryPage category={category} />;
}
