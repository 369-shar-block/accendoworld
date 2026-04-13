import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionsClient from "./CollectionsClient";
import { fetchVisibleProducts } from "@/lib/supabase/queries";
import { productImageUrl } from "@/lib/supabase/image";

// Revalidate every 60s so editor updates appear without a redeploy
export const revalidate = 3600;

export default async function CollectionsPage() {
  const products = await fetchVisibleProducts();

  const clientProducts = products.map((p) => ({
    image: productImageUrl(p.image_path),
    title: p.title,
    category: p.category,
  }));

  return (
    <main className="min-h-screen section-cream">
      <Navbar />
      <CollectionsClient products={clientProducts} />
      <Footer />
    </main>
  );
}
