#!/usr/bin/env node
/**
 * One-time migration: upload all images from public/products to Supabase
 * Storage, then insert product + contact_info rows.
 *
 * Usage (from repo root):
 *   node scripts/migrate-to-supabase.mjs
 *
 * Requires env vars in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY        (service role — bypasses RLS)
 *
 * Safe to re-run: uploads use upsert, product rows are matched on title,
 * contact_info uses upsert on key.
 */

import { createClient } from "@supabase/supabase-js";
import { readFile, readdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// ---------- Load env from .env.local (without needing dotenv) ----------

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

async function loadEnv() {
  try {
    const envText = await readFile(join(repoRoot, ".env.local"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, k, rawV] = m;
      if (process.env[k]) continue;
      const v = rawV.replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

await loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ---------- Data (extracted from existing hardcoded pages) ----------

const PRODUCTS = [
  // Men's
  { image: "new-03.jpeg", title: "David Black", category: "Men's Flip Flops" },
  { image: "new-04.jpeg", title: "David DK Grey", category: "Men's Flip Flops" },
  { image: "new-09.jpeg", title: "David Navy", category: "Men's Flip Flops" },
  { image: "new-05.jpeg", title: "David Olive", category: "Men's Flip Flops" },
  { image: "new-37.jpeg", title: "Sam LT Grey", category: "Men's Slides" },
  { image: "new-38.jpeg", title: "Sam Navy", category: "Men's Slides" },
  { image: "new-39.jpeg", title: "Sam DK Grey", category: "Men's Slides" },
  { image: "new-40.jpeg", title: "Sam Black", category: "Men's Slides" },
  { image: "new-41.jpeg", title: "Jaxon Olive", category: "Men's Slides" },
  { image: "new-42.jpeg", title: "Jaxon Navy", category: "Men's Slides" },
  { image: "new-43.jpeg", title: "Jaxon Black", category: "Men's Slides" },
  { image: "new-44.jpeg", title: "Jaxon DK Grey", category: "Men's Slides" },
  { image: "new-45.jpeg", title: "Jaxon Sky Blue", category: "Men's Slides" },

  // Women's
  { image: "IMG-20251026-WA0010.jpg", title: "Pink Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0011.jpg", title: "White Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0012.jpg", title: "Beige Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0013.jpg", title: "Lavender Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0014.jpg", title: "Black Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0015.jpg", title: "Mint Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0016.jpg", title: "Sky Blue Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0017.jpg", title: "Rose Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0018.jpg", title: "Coral Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0019.jpg", title: "Peach Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0020.jpg", title: "Baby Pink Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0021.jpg", title: "Sage Bow Clogs", category: "Women's Clogs" },
  { image: "IMG-20251026-WA0023.jpg", title: "Platform Sandals Tan", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0024.jpg", title: "Platform Sandals Black", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0025.jpg", title: "Platform Sandals White", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0026.jpg", title: "Platform Wedge Rose", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0027.jpg", title: "Platform Wedge Gold", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0028.jpg", title: "Platform Wedge Silver", category: "Women's Platforms" },
  { image: "IMG-20251026-WA0002.jpg", title: "Classic Navy Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0003.jpg", title: "Classic Black Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0004.jpg", title: "Classic White Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0005.jpg", title: "Logo Print Navy", category: "Women's Slides" },
  { image: "IMG-20251026-WA0006.jpg", title: "Logo Print Black", category: "Women's Slides" },
  { image: "IMG-20251107-WA0001.jpg", title: "Floral Slides Pink", category: "Women's Slides" },
  { image: "IMG-20251107-WA0002.jpg", title: "Floral Slides Blue", category: "Women's Slides" },
  { image: "IMG-20251026-WA0033.jpg", title: "Leopard Print Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0034.jpg", title: "Wild Print Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0035.jpg", title: "Ethnic Print Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0036.jpg", title: "Traditional Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0037.jpg", title: "Heritage Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0029.jpg", title: "Puzzle Print Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0030.jpg", title: "Tech Print Slides", category: "Women's Slides" },
  { image: "IMG-20251026-WA0031.jpg", title: "Geometric Slides", category: "Women's Slides" },
  { image: "IMG-20251103-WA0005.jpg", title: "Platform Clog White", category: "Women's Clogs" },
  { image: "IMG-20251103-WA0006.jpg", title: "Platform Clog Pink", category: "Women's Clogs" },
  { image: "IMG-20251103-WA0007.jpg", title: "Platform Clog Black", category: "Women's Clogs" },
  { image: "IMG-20251103-WA0008.jpg", title: "Platform Clog Beige", category: "Women's Clogs" },

  // Kids'
  { image: "new-01.jpeg", title: "Galaxy Mustard", category: "Kids' Clogs" },
  { image: "new-02.jpeg", title: "Galaxy Sky Blue", category: "Kids' Clogs" },
  { image: "new-06.jpeg", title: "Galaxy Pista", category: "Kids' Clogs" },
  { image: "new-07.jpeg", title: "Galaxy Pink", category: "Kids' Clogs" },
  { image: "new-08.jpeg", title: "Galaxy Red", category: "Kids' Clogs" },
  { image: "new-14.jpeg", title: "Toby DK Grey/Mustard", category: "Kids' Clogs" },
  { image: "new-15.jpeg", title: "Toby Navy/Red", category: "Kids' Clogs" },
  { image: "new-16.jpeg", title: "Toby Black/LT Grey", category: "Kids' Clogs" },
  { image: "new-17.jpeg", title: "Toby Olive/Mustard", category: "Kids' Clogs" },
  { image: "new-18.jpeg", title: "Lexxy Vanilla", category: "Kids' Clogs" },
  { image: "new-19.jpeg", title: "Lexxy Pink", category: "Kids' Clogs" },
  { image: "new-20.jpeg", title: "Lexxy Peach", category: "Kids' Clogs" },
  { image: "new-21.jpeg", title: "Lexxy Lilac", category: "Kids' Clogs" },
  { image: "new-22.jpeg", title: "Lexxy Mint", category: "Kids' Clogs" },
  { image: "new-23.jpeg", title: "Alex Olive", category: "Kids' Clogs" },
  { image: "new-24.jpeg", title: "Alex Navy", category: "Kids' Clogs" },
  { image: "new-25.jpeg", title: "Alex DK Grey", category: "Kids' Clogs" },
  { image: "new-26.jpeg", title: "Alex Black", category: "Kids' Clogs" },
  { image: "new-27.jpeg", title: "Alex Red/Black", category: "Kids' Clogs" },
  { image: "new-28.jpeg", title: "Alex Sky Blue", category: "Kids' Clogs" },
  { image: "new-29.jpeg", title: "Devin Red/Black", category: "Kids' Clogs" },
  { image: "new-30.jpeg", title: "Devin Navy/LT Grey", category: "Kids' Clogs" },
  { image: "new-31.jpeg", title: "Devin Olive", category: "Kids' Clogs" },
  { image: "new-32.jpeg", title: "Devin Sky Blue", category: "Kids' Clogs" },
  { image: "new-33.jpeg", title: "Devin Mustard", category: "Kids' Clogs" },
  { image: "new-34.jpeg", title: "Devin DK Grey", category: "Kids' Clogs" },
  { image: "new-35.jpeg", title: "Devin LT Grey", category: "Kids' Clogs" },
  { image: "new-36.jpeg", title: "Devin Black", category: "Kids' Clogs" },
  { image: "new-48.jpeg", title: "Carren Lilac", category: "Kids' Slides" },
  { image: "new-49.jpeg", title: "Carren Pink", category: "Kids' Slides" },
  { image: "new-50.jpeg", title: "Carren Peach", category: "Kids' Slides" },
  { image: "new-51.jpeg", title: "Carren Baby Pink", category: "Kids' Slides" },
  { image: "new-52.jpeg", title: "Carrie Pista", category: "Kids' Clogs" },
  { image: "new-53.jpeg", title: "Lucy Baby Pink", category: "Kids' Clogs" },
  { image: "new-46.jpeg", title: "Jaxon LT Grey Kids", category: "Kids' Slides" },
  { image: "new-47.jpeg", title: "Jaxon Navy Kids", category: "Kids' Slides" },
  { image: "new-10.jpeg", title: "David Olive Kids", category: "Kids' Flip Flops" },
  { image: "new-11.jpeg", title: "David Navy Kids", category: "Kids' Flip Flops" },
  { image: "new-12.jpeg", title: "David DK Grey Kids", category: "Kids' Flip Flops" },
  { image: "new-13.jpeg", title: "David Black Kids", category: "Kids' Flip Flops" },
];

// New arrivals (order from homepage)
const NEW_ARRIVAL_TITLES = [
  "David Black",
  "Galaxy Sky Blue",
  "Lexxy Vanilla",
  "Sam LT Grey",
  "Galaxy Mustard",
  "Devin Olive",
  "Carren Lilac",
  "David Navy",
  "Lexxy Mint",
  "Alex Red/Black",
  "Jaxon Olive",
  "Toby DK Grey/Mustard", // was titled "Toby" on the homepage
];

// Bestsellers (order + optional label override from homepage)
const BESTSELLERS = [
  { title: "Pink Bow Clogs", label: "Designer Clogs" },
  { title: "David Black", label: "Men's Collection" },
  { title: "Platform Sandals Tan", label: "Platform Collection" }, // "Platform Sandals" → Tan variant
  { title: "Galaxy Sky Blue", label: "Kids' Collection" },
  { title: "Classic Navy Slides", label: "Signature" },
  { title: "Lexxy Vanilla", label: "Kids' Collection" },
];

const CONTACT_INFO = [
  { key: "email", value: "info@accendoworld.com" },
  { key: "shipping_text", value: "Global shipping available worldwide" },
  { key: "response_time_text", value: "We respond within 24\u201348 hours" },
  {
    key: "footer_description",
    value:
      "Premium comfort footwear crafted for the entire family. Where style meets comfort in every step you take.",
  },
  { key: "footer_website", value: "www.accendoworld.com" },
  { key: "footer_shipping_note", value: "Global Shipping Available" },
  { key: "location_headline_1", value: "Based in India," },
  { key: "location_headline_2", value: "Serving the World" },
  {
    key: "location_body",
    value:
      "From our workshop in India, ACCENDO ships premium comfort footwear to customers across the globe. No matter where you are, a step ahead is just an order away.",
  },
  { key: "instagram_url", value: "#" },
  { key: "facebook_url", value: "#" },
  { key: "twitter_url", value: "#" },
];

// ---------- Helpers ----------

function contentTypeFor(file) {
  const ext = extname(file).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

// ---------- Steps ----------

async function uploadImages() {
  const productsDir = join(repoRoot, "public", "products");
  const files = await readdir(productsDir);
  console.log(`\n[1/3] Uploading ${files.length} images to Supabase Storage...`);

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = join(productsDir, file);
    const buffer = await readFile(filePath);
    const { error } = await supabase.storage
      .from("products")
      .upload(file, buffer, {
        contentType: contentTypeFor(file),
        upsert: true,
        cacheControl: "31536000",
      });

    if (error) {
      failed++;
      console.error(`  ✗ ${file}: ${error.message}`);
    } else {
      uploaded++;
      if (uploaded % 20 === 0) console.log(`  ... ${uploaded}/${files.length}`);
    }
  }

  console.log(`  Done. Uploaded: ${uploaded}, failed: ${failed}`);
  if (failed > 0) throw new Error("Image upload had failures; aborting.");
}

async function insertProducts() {
  console.log(`\n[2/3] Inserting ${PRODUCTS.length} products...`);

  const newArrivalSet = new Set(NEW_ARRIVAL_TITLES);
  const bestsellerMap = new Map(BESTSELLERS.map((b) => [b.title, b.label]));

  const rows = PRODUCTS.map((p, idx) => ({
    title: p.title,
    category: p.category,
    image_path: p.image,
    display_order: idx,
    is_visible: true,
    is_new_arrival: newArrivalSet.has(p.title),
    is_bestseller: bestsellerMap.has(p.title),
    bestseller_label: bestsellerMap.get(p.title) ?? null,
  }));

  // Clear existing rows so re-runs are idempotent (safe — this is a migration, not prod data)
  const { error: delErr } = await supabase
    .from("products")
    .delete()
    .not("id", "is", null);
  if (delErr) throw new Error(`Delete existing products failed: ${delErr.message}`);

  const { error } = await supabase.from("products").insert(rows);
  if (error) throw new Error(`Insert products failed: ${error.message}`);

  console.log(`  Done. Inserted ${rows.length} rows.`);
}

async function upsertContactInfo() {
  console.log(`\n[3/3] Upserting ${CONTACT_INFO.length} contact_info rows...`);
  const { error } = await supabase
    .from("contact_info")
    .upsert(CONTACT_INFO, { onConflict: "key" });
  if (error) throw new Error(`Upsert contact_info failed: ${error.message}`);
  console.log(`  Done.`);
}

// ---------- Main ----------

(async () => {
  try {
    await uploadImages();
    await insertProducts();
    await upsertContactInfo();
    console.log("\n✓ Migration complete.\n");
  } catch (err) {
    console.error("\n✗ Migration failed:", err.message || err);
    process.exit(1);
  }
})();
