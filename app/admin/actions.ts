"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ---- Products ----

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const is_visible = formData.get("is_visible") === "on";
  const is_new_arrival = formData.get("is_new_arrival") === "on";
  const is_bestseller = formData.get("is_bestseller") === "on";
  const bestseller_label_raw = (formData.get("bestseller_label") as string) ?? "";
  const bestseller_label = bestseller_label_raw.trim() || null;

  if (!id || !title || !category) {
    return { error: "Title and category are required" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      title,
      category,
      is_visible,
      is_new_arrival,
      is_bestseller,
      bestseller_label,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const image_path = formData.get("image_path") as string;
  if (!id) return { error: "Missing product id" };

  const supabase = await createClient();

  // Delete the DB row first
  const { error: dbErr } = await supabase.from("products").delete().eq("id", id);
  if (dbErr) return { error: dbErr.message };

  // Best-effort: remove the image from storage (ignore errors — file may be shared or missing)
  if (image_path) {
    await supabase.storage.from("products").remove([image_path]);
  }

  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function createProduct(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const file = formData.get("image") as File | null;
  const is_visible = formData.get("is_visible") === "on";
  const is_new_arrival = formData.get("is_new_arrival") === "on";
  const is_bestseller = formData.get("is_bestseller") === "on";
  const bestseller_label_raw = (formData.get("bestseller_label") as string) ?? "";
  const bestseller_label = bestseller_label_raw.trim() || null;

  if (!title || !category) return { error: "Title and category are required" };
  if (!file || file.size === 0) return { error: "Please choose an image file" };

  const supabase = await createClient();

  // Build a safe unique filename
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const filename = `${slug}-${Date.now()}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from("products")
    .upload(filename, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type || undefined,
    });
  if (uploadErr) return { error: `Upload failed: ${uploadErr.message}` };

  // Determine next display_order (end of list)
  const { data: maxRow } = await supabase
    .from("products")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const display_order = (maxRow?.display_order ?? -1) + 1;

  const { error: insertErr } = await supabase.from("products").insert({
    title,
    category,
    image_path: filename,
    display_order,
    is_visible,
    is_new_arrival,
    is_bestseller,
    bestseller_label,
  });

  if (insertErr) {
    // Roll back the upload if the insert failed
    await supabase.storage.from("products").remove([filename]);
    return { error: insertErr.message };
  }

  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/admin/products");
  return { ok: true };
}

// ---- Reels (short-form vertical videos) ----

export async function createReel(formData: FormData) {
  const title = ((formData.get("title") as string) ?? "").trim() || null;
  const instagram_url_raw = ((formData.get("instagram_url") as string) ?? "").trim();
  const instagram_url = instagram_url_raw || null;
  const video = formData.get("video") as File | null;
  const poster = formData.get("poster") as File | null;
  const is_visible = formData.get("is_visible") === "on";

  if (!video || video.size === 0) return { error: "Please choose a video file" };
  if (!video.type.startsWith("video/")) {
    return { error: "That file is not a video. Please upload an MP4 (or MOV/WebM)." };
  }

  const supabase = await createClient();

  const slug = (title ?? "reel")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "reel";

  // Upload the video.
  const videoExt = (video.name.split(".").pop() ?? "mp4").toLowerCase();
  const videoName = `${slug}-${Date.now()}.${videoExt}`;
  const { error: videoErr } = await supabase.storage
    .from("reels")
    .upload(videoName, video, {
      cacheControl: "31536000",
      upsert: false,
      contentType: video.type || undefined,
    });
  if (videoErr) return { error: `Video upload failed: ${videoErr.message}` };

  // Optionally upload a poster image (shown before the video loads).
  let posterName: string | null = null;
  if (poster && poster.size > 0 && poster.type.startsWith("image/")) {
    const posterExt = (poster.name.split(".").pop() ?? "jpg").toLowerCase();
    posterName = `${slug}-poster-${Date.now()}.${posterExt}`;
    const { error: posterErr } = await supabase.storage
      .from("reels")
      .upload(posterName, poster, {
        cacheControl: "31536000",
        upsert: false,
        contentType: poster.type || undefined,
      });
    if (posterErr) posterName = null; // poster is optional — don't fail the whole reel
  }

  // Determine next display_order (end of list).
  const { data: maxRow } = await supabase
    .from("reels")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const display_order = (maxRow?.display_order ?? -1) + 1;

  const { error: insertErr } = await supabase.from("reels").insert({
    title,
    video_path: videoName,
    poster_path: posterName,
    instagram_url,
    display_order,
    is_visible,
  });

  if (insertErr) {
    // Roll back uploads if the insert failed.
    const toRemove = [videoName];
    if (posterName) toRemove.push(posterName);
    await supabase.storage.from("reels").remove(toRemove);
    return { error: insertErr.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/reels");
  return { ok: true };
}

export async function updateReel(formData: FormData) {
  const id = formData.get("id") as string;
  const title = ((formData.get("title") as string) ?? "").trim() || null;
  const instagram_url_raw = ((formData.get("instagram_url") as string) ?? "").trim();
  const instagram_url = instagram_url_raw || null;
  const is_visible = formData.get("is_visible") === "on";

  if (!id) return { error: "Missing reel id" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("reels")
    .update({ title, instagram_url, is_visible })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/reels");
  return { ok: true };
}

export async function deleteReel(formData: FormData) {
  const id = formData.get("id") as string;
  const video_path = formData.get("video_path") as string;
  const poster_path = (formData.get("poster_path") as string) || "";
  if (!id) return { error: "Missing reel id" };

  const supabase = await createClient();

  const { error: dbErr } = await supabase.from("reels").delete().eq("id", id);
  if (dbErr) return { error: dbErr.message };

  // Best-effort: remove the media from storage.
  const toRemove = [video_path, poster_path].filter(Boolean);
  if (toRemove.length > 0) {
    await supabase.storage.from("reels").remove(toRemove);
  }

  revalidatePath("/");
  revalidatePath("/admin/reels");
  return { ok: true };
}

// ---- Contact info ----

export async function updateContactInfo(formData: FormData) {
  const supabase = await createClient();
  const entries: Array<{ key: string; value: string }> = [];

  for (const [rawKey, rawValue] of formData.entries()) {
    if (!rawKey.startsWith("field:")) continue;
    const key = rawKey.slice("field:".length);
    entries.push({ key, value: typeof rawValue === "string" ? rawValue : "" });
  }

  if (entries.length === 0) return { error: "No fields submitted" };

  const { error } = await supabase
    .from("contact_info")
    .upsert(entries, { onConflict: "key" });

  if (error) return { error: error.message };

  revalidatePath("/contact");
  revalidatePath("/");
  revalidatePath("/admin/contact");
  return { ok: true };
}
