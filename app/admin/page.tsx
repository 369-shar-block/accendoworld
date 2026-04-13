import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: totalProducts }, { count: visibleProducts }, { count: bestsellers }, { count: newArrivals }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("is_visible", true),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("is_bestseller", true),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("is_new_arrival", true),
    ]);

  const stats = [
    { label: "Total products", value: totalProducts ?? 0 },
    { label: "Visible on site", value: visibleProducts ?? 0 },
    { label: "Bestsellers", value: bestsellers ?? 0 },
    { label: "New arrivals", value: newArrivals ?? 0 },
  ];

  return (
    <div className="p-10 lg:p-14 max-w-[1200px]">
      <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
        Overview
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-black mb-12">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-brand-black/[0.06] p-6"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase text-brand-muted font-sans mb-3">
              {s.label}
            </p>
            <p className="font-serif text-4xl font-bold text-brand-black">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          href="/admin/products"
          className="block bg-white border border-brand-black/[0.06] p-8 hover:border-brand-red/40 transition-colors group"
        >
          <div className="w-10 h-[2px] bg-brand-red mb-6 group-hover:w-16 transition-all" />
          <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">
            Manage products
          </h2>
          <p className="text-brand-muted text-sm font-sans">
            Upload new products, edit existing ones, or remove items from the
            collection.
          </p>
        </Link>

        <Link
          href="/admin/contact"
          className="block bg-white border border-brand-black/[0.06] p-8 hover:border-brand-red/40 transition-colors group"
        >
          <div className="w-10 h-[2px] bg-brand-red mb-6 group-hover:w-16 transition-all" />
          <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">
            Edit contact info
          </h2>
          <p className="text-brand-muted text-sm font-sans">
            Update the email, shipping copy, footer details, and social links.
          </p>
        </Link>
      </div>
    </div>
  );
}
