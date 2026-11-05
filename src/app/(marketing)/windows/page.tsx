import { CategoryPage } from "@/components/categories/CategoryPage";
import { getCategory } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

const category = getCategory("windows");

export const metadata = buildPageMetadata(
  category.title,
  category.metadataDescription,
);

export default function WindowsPage() {
  return <CategoryPage category={category} />;
}
