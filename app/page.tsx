import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import {
  fetchBestsellers,
  fetchNewArrivals,
  fetchVisibleProducts,
} from "@/lib/supabase/queries";
import { productImageUrl } from "@/lib/supabase/image";
import type { Product } from "@/lib/supabase/types";

export const revalidate = 3600; // 1 hour — product data rarely changes

// Fallback images if the tables are empty or a lookup fails
const FALLBACK_IMAGE = "/products/new-03.jpeg";

function toClientProduct(p: Product, labelOverride?: string | null) {
  return {
    image: productImageUrl(p.image_path),
    title: p.title,
    category: labelOverride || p.category,
  };
}

function pickImage(products: Product[], title: string, fallback: string): string {
  const match = products.find((p) => p.title === title);
  return match ? productImageUrl(match.image_path) : fallback;
}

export default async function Home() {
  const [allProducts, bestsellers, newArrivals] = await Promise.all([
    fetchVisibleProducts(),
    fetchBestsellers(),
    fetchNewArrivals(),
  ]);

  // Sort new arrivals by display_order (already done by query) and map
  const newArrivalsClient = newArrivals.map((p) => toClientProduct(p));

  // For bestsellers, apply the bestseller_label override if set
  const bestSellersClient = bestsellers.map((p) =>
    toClientProduct(p, p.bestseller_label)
  );

  // Hero floating images — pick by title from the full product list
  const heroImages = {
    topRight: pickImage(allProducts, "David Black", FALLBACK_IMAGE),
    bottomLeft: pickImage(allProducts, "Pink Bow Clogs", FALLBACK_IMAGE),
    center: pickImage(allProducts, "Galaxy Mustard", FALLBACK_IMAGE),
  };

  // Category showcase images
  const categoryImages = {
    women: pickImage(allProducts, "Pink Bow Clogs", FALLBACK_IMAGE),
    men: pickImage(allProducts, "Sam LT Grey", FALLBACK_IMAGE),
    kids: pickImage(allProducts, "Galaxy Mustard", FALLBACK_IMAGE),
  };

  // Brand story parallax image — use any women's slide from the catalogue
  const storyImage = pickImage(
    allProducts,
    "Heritage Slides",
    FALLBACK_IMAGE
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <HomeClient
        newArrivals={newArrivalsClient}
        bestSellers={bestSellersClient}
        heroImages={heroImages}
        categoryImages={categoryImages}
        storyImage={storyImage}
      />
      <Footer />
    </main>
  );
}
