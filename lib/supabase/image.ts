/**
 * Build the public URL for a product image stored in the Supabase "products" bucket.
 * The schema stores image_path as the object path inside the bucket (e.g. "new-01.jpeg").
 */
export function productImageUrl(imagePath: string): string {
  // If the value is already a full URL or a /public path, use as-is (belt and suspenders).
  if (imagePath.startsWith("http") || imagePath.startsWith("/")) {
    return imagePath;
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return imagePath;
  return `${base}/storage/v1/object/public/products/${imagePath}`;
}

/**
 * Build the public URL for an asset (video or poster image) stored in the
 * Supabase "reels" bucket.
 */
export function reelAssetUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return path;
  return `${base}/storage/v1/object/public/reels/${path}`;
}
