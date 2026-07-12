"use client";

import { useState, useTransition } from "react";
import type { Reel } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";
import { createReel, deleteReel, updateReel } from "../actions";

const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "reel"
  );
}

type AdminReel = Reel & { videoUrl: string; posterUrl: string };

export default function ReelsAdminClient({ reels }: { reels: AdminReel[] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  return (
    <>
      {message && (
        <div
          className={`mb-6 px-6 py-4 border ${
            message.type === "ok"
              ? "border-green-600/30 bg-green-50 text-green-700"
              : "border-brand-red/20 bg-brand-red/5 text-brand-red"
          }`}
        >
          <p className="text-sm font-sans">{message.text}</p>
        </div>
      )}

      <div className="flex justify-end mb-8">
        <button
          type="button"
          onClick={() => {
            setShowAdd(true);
            setEditingId(null);
          }}
          className="btn-fill whitespace-nowrap"
        >
          + Add reel
        </button>
      </div>

      {showAdd && (
        <AddReelForm
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            setMessage({ type: "ok", text: "Reel added." });
          }}
          onError={(text) => setMessage({ type: "err", text })}
        />
      )}

      <div className="bg-white border border-brand-black/[0.06]">
        {reels.length === 0 ? (
          <div className="p-12 text-center text-brand-muted text-sm font-sans">
            No reels yet. Click &ldquo;Add reel&rdquo; to upload your first vertical video.
          </div>
        ) : (
          <ul className="divide-y divide-brand-black/[0.06]">
            {reels.map((reel) => (
              <li key={reel.id} className="p-5">
                {editingId === reel.id ? (
                  <EditReelForm
                    reel={reel}
                    onCancel={() => setEditingId(null)}
                    onSuccess={() => {
                      setEditingId(null);
                      setMessage({ type: "ok", text: "Reel updated." });
                    }}
                    onError={(text) => setMessage({ type: "err", text })}
                  />
                ) : (
                  <ReelRow
                    reel={reel}
                    onEdit={() => setEditingId(reel.id)}
                    onDelete={() => setMessage({ type: "ok", text: "Reel deleted." })}
                    onError={(text) => setMessage({ type: "err", text })}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

// ---------- Small vertical video preview ----------

function ReelThumb({ reel }: { reel: AdminReel }) {
  return (
    <div className="relative w-20 flex-shrink-0 aspect-[9/16] bg-brand-black/5 overflow-hidden rounded-sm">
      <video
        src={reel.videoUrl}
        poster={reel.posterUrl || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
        onMouseLeave={(e) => {
          e.currentTarget.pause();
          e.currentTarget.currentTime = 0;
        }}
      />
    </div>
  );
}

// ---------- Row (view mode) ----------

function ReelRow({
  reel,
  onEdit,
  onDelete,
  onError,
}: {
  reel: AdminReel;
  onEdit: () => void;
  onDelete: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete this reel? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("id", reel.id);
    fd.append("video_path", reel.video_path);
    fd.append("poster_path", reel.poster_path ?? "");
    startTransition(async () => {
      const result = await deleteReel(fd);
      if (result?.error) onError(result.error);
      else onDelete();
    });
  }

  return (
    <div className="flex items-center gap-6">
      <ReelThumb reel={reel} />

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-brand-black truncate">
          {reel.title || "Untitled reel"}
        </h3>
        <p className="text-brand-muted text-xs font-sans mt-1 truncate">
          {reel.instagram_url ? reel.instagram_url : "Links to your Instagram profile"}
        </p>
        <div className="flex gap-3 mt-2 text-[10px] uppercase tracking-[0.15em] font-sans">
          {!reel.is_visible && <span className="text-brand-muted">Hidden</span>}
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ---------- Edit form (metadata only, not the video file) ----------

function EditReelForm({
  reel,
  onCancel,
  onSuccess,
  onError,
}: {
  reel: AdminReel;
  onCancel: () => void;
  onSuccess: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateReel(fd);
      if (result?.error) onError(result.error);
      else onSuccess();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
      <input type="hidden" name="id" value={reel.id} />

      <div className="md:col-span-2">
        <ReelThumb reel={reel} />
      </div>

      <div className="md:col-span-7 space-y-3">
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
            Title (optional)
          </label>
          <input
            type="text"
            name="title"
            defaultValue={reel.title ?? ""}
            placeholder="Shown for your reference only"
            className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
          />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
            Instagram post link (optional)
          </label>
          <input
            type="url"
            name="instagram_url"
            defaultValue={reel.instagram_url ?? ""}
            placeholder="Leave blank to link to your profile"
            className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      <div className="md:col-span-3 space-y-3 text-sm font-sans">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_visible"
            defaultChecked={reel.is_visible}
            className="accent-brand-red"
          />
          Visible on site
        </label>
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans bg-brand-red text-white hover:bg-brand-red-dark transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

// ---------- Add form ----------

function AddReelForm({
  onClose,
  onSuccess,
  onError,
}: {
  onClose: () => void;
  onSuccess: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const video = fd.get("video") as File | null;
    const poster = fd.get("poster") as File | null;
    const title = ((fd.get("title") as string) ?? "").trim();
    const instagram_url = ((fd.get("instagram_url") as string) ?? "").trim();
    const is_visible = fd.get("is_visible") === "on";

    // Validate before uploading anything.
    if (!video || video.size === 0) {
      onError("Please choose a video file.");
      return;
    }
    if (!video.type.startsWith("video/")) {
      onError("That file is not a video. Please upload an MP4 (or MOV/WebM).");
      return;
    }
    if (video.size > MAX_VIDEO_BYTES) {
      onError("That video is too large. Please use one under 100 MB.");
      return;
    }

    startTransition(async () => {
      // Upload the file(s) straight from the browser to Supabase Storage.
      // (Large files cannot pass through a Server Action on Vercel.)
      const supabase = createClient();
      const slug = slugify(title);
      const stamp = Date.now();
      const videoExt = (video.name.split(".").pop() || "mp4").toLowerCase();
      const videoName = `${slug}-${stamp}.${videoExt}`;
      let posterName: string | null = null;

      try {
        setStatus("Uploading video…");
        const { error: vErr } = await supabase.storage
          .from("reels")
          .upload(videoName, video, {
            cacheControl: "31536000",
            upsert: false,
            contentType: video.type || undefined,
          });
        if (vErr) throw new Error(`Video upload failed: ${vErr.message}`);

        // Optional cover image.
        if (poster && poster.size > 0 && poster.type.startsWith("image/")) {
          setStatus("Uploading cover image…");
          const posterExt = (poster.name.split(".").pop() || "jpg").toLowerCase();
          posterName = `${slug}-poster-${stamp}.${posterExt}`;
          const { error: pErr } = await supabase.storage
            .from("reels")
            .upload(posterName, poster, {
              cacheControl: "31536000",
              upsert: false,
              contentType: poster.type || undefined,
            });
          if (pErr) posterName = null; // poster is optional — don't fail the reel
        }

        setStatus("Saving…");
        const result = await createReel({
          title: title || null,
          instagram_url: instagram_url || null,
          is_visible,
          video_path: videoName,
          poster_path: posterName,
        });

        if (result?.error) {
          // Roll back the uploaded file(s) if the DB insert failed.
          const toRemove = [videoName];
          if (posterName) toRemove.push(posterName);
          await supabase.storage.from("reels").remove(toRemove);
          onError(result.error);
          setStatus(null);
          return;
        }

        setStatus(null);
        onSuccess();
      } catch (err) {
        // Best-effort cleanup, then show a friendly message.
        try {
          const toRemove = [videoName];
          if (posterName) toRemove.push(posterName);
          await supabase.storage.from("reels").remove(toRemove);
        } catch {
          /* ignore cleanup errors */
        }
        onError(
          err instanceof Error ? err.message : "Upload failed. Please try again."
        );
        setStatus(null);
      }
    });
  }

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <div className="mb-8 bg-white border border-brand-red/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-brand-black">Add new reel</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-brand-muted hover:text-brand-black text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Video upload */}
        <div className="md:col-span-4">
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-2 font-sans">
            Vertical video (9:16)
          </label>
          <label className="block border-2 border-dashed border-brand-black/20 hover:border-brand-red/50 cursor-pointer transition-colors">
            {videoPreview ? (
              <div className="relative aspect-[9/16] bg-black">
                <video
                  src={videoPreview}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[9/16] flex items-center justify-center text-center text-brand-muted text-xs uppercase tracking-[0.2em] font-sans px-4">
                Click to choose an MP4
              </div>
            )}
            <input
              type="file"
              name="video"
              accept="video/mp4,video/quicktime,video/webm,video/*"
              required
              onChange={handleVideoChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Fields */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Title (optional)
            </label>
            <input
              type="text"
              name="title"
              placeholder="For your reference only, e.g. Summer slides clip"
              className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
            />
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Instagram post link (optional)
            </label>
            <input
              type="url"
              name="instagram_url"
              placeholder="Leave blank to link to your profile"
              className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
            />
            <p className="text-brand-muted text-xs font-sans mt-1">
              On phones this opens the Instagram app on your profile; on computers
              it opens Instagram in a new tab.
            </p>
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Cover image (optional)
            </label>
            <input
              type="file"
              name="poster"
              accept="image/*"
              className="block w-full text-sm font-sans text-brand-muted file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-brand-black/5 file:text-brand-black file:text-xs file:uppercase file:tracking-[0.15em]"
            />
            <p className="text-brand-muted text-xs font-sans mt-1">
              A still frame shown while the video loads. If you skip it, the video&apos;s
              first frame is used.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm font-sans pt-1">
            <input type="checkbox" name="is_visible" defaultChecked className="accent-brand-red" />
            Visible on site
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isPending} className="btn-fill disabled:opacity-50">
              {isPending ? status ?? "Uploading…" : "Add reel"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
