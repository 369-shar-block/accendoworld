import { createClient } from "@/lib/supabase/server";
import { productImageUrl } from "@/lib/supabase/image";
import type { Product } from "@/lib/supabase/types";
import ProductsAdminClient from "./ProductsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  const products = ((data ?? []) as Product[]).map((p) => ({
    ...p,
    publicUrl: productImageUrl(p.image_path),
  }));

  return (
    <div className="p-10 lg:p-14 max-w-[1400px]">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
            Catalogue
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-black">
            Products
          </h1>
        </div>
        <p className="text-brand-muted text-sm font-sans">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {error && (
        <div className="mb-8 px-6 py-4 border border-brand-red/20 bg-brand-red/5">
          <p className="text-brand-red text-sm font-sans">
            Failed to load products: {error.message}
          </p>
        </div>
      )}

      <ProductsAdminClient products={products} />
    </div>
  );
}
