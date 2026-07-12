import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import {
  fetchBestsellers,
  fetchContactInfo,
  fetchNewArrivals,
  fetchVisibleProducts,
  fetchVisibleReels,
} from "@/lib/supabase/queries";
import { productImageUrl, reelAssetUrl } from "@/lib/supabase/image";
import {
  instagramAppUrl,
  normalizeHandle,
  resolveInstagramUrl,
} from "@/lib/instagram";
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
  const [allProducts, bestsellers, newArrivals, reels, contactInfo] =
    await Promise.all([
      fetchVisibleProducts(),
      fetchBestsellers(),
      fetchNewArrivals(),
      fetchVisibleReels(),
      fetchContactInfo(),
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

  // Reels → client shape
  const reelsClient = reels.map((r) => ({
    id: r.id,
    title: r.title,
    videoUrl: reelAssetUrl(r.video_path),
    posterUrl: reelAssetUrl(r.poster_path),
    instagramUrl: r.instagram_url,
  }));

  const instagram = {
    handle: normalizeHandle(contactInfo.instagram_handle),
    profileUrl: resolveInstagramUrl(
      contactInfo.instagram_handle,
      contactInfo.instagram_url
    ),
    appUrl: instagramAppUrl(contactInfo.instagram_handle),
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <HomeClient
        newArrivals={newArrivalsClient}
        bestSellers={bestSellersClient}
        heroImages={heroImages}
        categoryImages={categoryImages}
        storyImage={storyImage}
        reels={reelsClient}
        instagram={instagram}
      />
      <Footer />
    </main>
  );
}
