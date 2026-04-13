import { createClient } from "./server";
import { CONTACT_DEFAULTS, type ContactInfoMap, type Product } from "./types";

/** Fetch all visible products, sorted by display_order then created_at. */
export async function fetchVisibleProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[fetchVisibleProducts]", error);
    return [];
  }
  return (data ?? []) as Product[];
}

/** Fetch products flagged as bestsellers. */
export async function fetchBestsellers(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .eq("is_bestseller", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[fetchBestsellers]", error);
    return [];
  }
  return (data ?? []) as Product[];
}

/** Fetch products flagged as new arrivals. */
export async function fetchNewArrivals(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .eq("is_new_arrival", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[fetchNewArrivals]", error);
    return [];
  }
  return (data ?? []) as Product[];
}

/** Fetch contact_info as a flat map, merged over defaults. */
export async function fetchContactInfo(): Promise<ContactInfoMap> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contact_info").select("key,value");

  if (error) {
    console.error("[fetchContactInfo]", error);
    return { ...CONTACT_DEFAULTS };
  }

  const merged: ContactInfoMap = { ...CONTACT_DEFAULTS };
  for (const row of data ?? []) {
    merged[row.key] = row.value;
  }
  return merged;
}
