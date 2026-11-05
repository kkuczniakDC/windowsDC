import { Suspense } from "react";

import { ProductsView } from "@/components/admin-preview/ProductsView";

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<p>Loading sample products…</p>}>
      <ProductsView />
    </Suspense>
  );
}
