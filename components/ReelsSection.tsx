"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export type HomeReel = {
  id: string;
  title: string | null;
  videoUrl: string;
  posterUrl: string;
  /** Optional link to the specific Instagram post; blank => profile. */
  instagramUrl: string | null;
};

type Props = {
  reels: HomeReel[];
  /** Bare Instagram username, e.g. "accendoworld" (may be ""). */
  handle: string;
  /** Resolved public profile URL, e.g. https://www.instagram.com/accendoworld (may be ""). */
  profileUrl: string;
  /** App deep link, e.g. instagram://user?username=accendoworld (may be ""). */
  appUrl: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function ReelsSection({ reels, handle, profileUrl, appUrl }: Props) {
  // Nothing to show until the editor uploads reels.
  if (!reels || reels.length === 0) return null;

  return (
    <section className="py-24 md:py-32 section-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
              Reels
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream">
              On Instagram
            </h2>
            <p className="text-cream/50 text-sm sm:text-base font-sans mt-4 max-w-md">
              Watch ACCENDO in motion. Tap any clip to see more on our Instagram.
            </p>
          </div>

          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-hover inline-flex items-center gap-2 self-start sm:self-auto text-cream text-xs tracking-[0.2em] uppercase font-sans border border-white/25 hover:border-white/60 px-6 py-4 transition-colors whitespace-nowrap"
            >
              <InstagramGlyph className="w-4 h-4" />
              {handle ? `Follow @${handle}` : "Follow us"}
            </a>
          )}
        </motion.div>

        {/* Horizontal rail of reels */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 lg:-mx-10 lg:px-10 pb-2">
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              profileUrl={profileUrl}
              appUrl={appUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({
  reel,
  index,
  profileUrl,
  appUrl,
}: {
  reel: HomeReel;
  index: number;
  profileUrl: string;
  appUrl: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay only while the card is on screen; pause when it scrolls away.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Where a click should send the visitor.
  const webTarget = reel.instagramUrl || profileUrl;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // On touch devices, try to open the native Instagram app first, then
    // fall back to the web profile if the app is not installed.
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;

    if (isCoarse && appUrl) {
      e.preventDefault();
      window.location.href = appUrl;
      window.setTimeout(() => {
        if (webTarget) window.location.href = webTarget;
      }, 900);
    }
    // On desktop, let the anchor open the web profile in a new secure tab.
  }

  return (
    <motion.a
      href={webTarget || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      className="cursor-hover group relative flex-shrink-0 w-[230px] sm:w-[250px] lg:w-[270px] snap-start"
      aria-label={
        reel.title ? `${reel.title}, open on Instagram` : "Open on Instagram"
      }
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-brand-charcoal rounded-sm">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.posterUrl || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        {/* Instagram glyph */}
        <div className="absolute top-3 right-3 text-white/90 drop-shadow">
          <InstagramGlyph className="w-5 h-5" />
        </div>

        {/* Play affordance */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30">
            <svg className="w-5 h-5 text-white translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        {/* Title / CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {reel.title && (
            <p className="text-white font-serif text-base leading-tight line-clamp-2">
              {reel.title}
            </p>
          )}
          <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-sans mt-1 flex items-center gap-1.5 group-hover:text-white transition-colors">
            View on Instagram
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </div>
      </div>
    </motion.a>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.166.422.36 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.249 1.805-.415 2.227a3.72 3.72 0 01-.896 1.382c-.42.419-.819.679-1.381.896-.422.166-1.057.36-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.805-.249-2.227-.415a3.72 3.72 0 01-1.382-.896 3.72 3.72 0 01-.896-1.381c-.166-.422-.36-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.166 1.057-.36 2.227-.415 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.132 4.902.333 4.14.63a5.98 5.98 0 00-2.163 1.409A5.98 5.98 0 00.63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.15.558 2.913a5.98 5.98 0 001.409 2.163 5.98 5.98 0 002.163 1.409c.762.297 1.635.499 2.912.558C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.15-.261 2.913-.558a5.98 5.98 0 002.163-1.409 5.98 5.98 0 001.409-2.163c.297-.762.499-1.635.558-2.912.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.06-1.277-.261-2.15-.558-2.913a5.98 5.98 0 00-1.409-2.163A5.98 5.98 0 0019.86.63c-.762-.297-1.636-.499-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
