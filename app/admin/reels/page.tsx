import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { reelAssetUrl } from "@/lib/supabase/image";
import { fetchContactInfo } from "@/lib/supabase/queries";
import { normalizeHandle } from "@/lib/instagram";
import type { Reel } from "@/lib/supabase/types";
import ReelsAdminClient from "./ReelsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminReelsPage() {
  const supabase = await createClient();
  const [{ data, error }, info] = await Promise.all([
    supabase
      .from("reels")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true }),
    fetchContactInfo(),
  ]);

  const reels = ((data ?? []) as Reel[]).map((r) => ({
    ...r,
    videoUrl: reelAssetUrl(r.video_path),
    posterUrl: reelAssetUrl(r.poster_path),
  }));

  const handle = normalizeHandle(info.instagram_handle);

  return (
    <div className="p-10 lg:p-14 max-w-[1400px]">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
            Instagram
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-black">
            Reels
          </h1>
        </div>
        <p className="text-brand-muted text-sm font-sans">
          {reels.length} {reels.length === 1 ? "reel" : "reels"}
        </p>
      </div>

      <p className="text-brand-muted text-sm font-sans mb-8 max-w-2xl">
        Upload short vertical videos (9:16) to show on the home page. Each one
        autoplays muted on a loop, and tapping it opens your Instagram. Changes
        go live within a minute of saving.
      </p>

      {/* Handle status banner */}
      <div
        className={`mb-8 px-6 py-4 border text-sm font-sans ${
          handle
            ? "border-green-600/30 bg-green-50 text-green-700"
            : "border-brand-red/30 bg-brand-red/5 text-brand-red"
        }`}
      >
        {handle ? (
          <>
            Reels will link to{" "}
            <span className="font-semibold">instagram.com/{handle}</span>. Change
            this under{" "}
            <Link href="/admin/contact" className="underline">
              Contact info → Instagram handle
            </Link>
            .
          </>
        ) : (
          <>
            No Instagram handle set yet, so reels have nowhere to link. Add your
            username under{" "}
            <Link href="/admin/contact" className="underline font-semibold">
              Contact info → Instagram handle
            </Link>{" "}
            first.
          </>
        )}
      </div>

      {error && (
        <div className="mb-8 px-6 py-4 border border-brand-red/20 bg-brand-red/5">
          <p className="text-brand-red text-sm font-sans">
            Failed to load reels: {error.message}. If this is the first time,
            the database table may still need to be created.
          </p>
        </div>
      )}

      <ReelsAdminClient reels={reels} />
    </div>
  );
}
