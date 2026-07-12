"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LightboxItem = {
  image: string;
  title: string;
  category: string;
};

type Props = {
  items: LightboxItem[];
  /** Index of the open item, or null when the lightbox is closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const isOpen = index !== null && !!items[index];

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  // Keyboard controls + lock background scrolling while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const current = index !== null ? items[index] : null;
  const hasMultiple = items.length > 1;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} enlarged`}
        >
          {/* Dark backdrop (~85% opacity) */}
          <div className="absolute inset-0 bg-black/[0.85] backdrop-blur-sm" />

          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="cursor-hover absolute top-5 right-5 sm:top-8 sm:right-8 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev / Next arrows */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous"
                className="cursor-hover absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next"
                className="cursor-hover absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image + caption — clicks here do not close */}
          <motion.div
            key={current.image}
            className="relative z-10 flex flex-col items-center max-w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              className="max-h-[78vh] max-w-[92vw] w-auto h-auto object-contain shadow-2xl select-none"
              draggable={false}
            />
            <div className="mt-5 text-center">
              <p className="text-[10px] tracking-[0.35em] uppercase text-brand-red font-sans mb-1">
                {current.category}
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-white">
                {current.title}
              </h3>
              {hasMultiple && (
                <p className="text-white/40 text-[11px] tracking-[0.2em] font-sans mt-2">
                  {index! + 1} / {items.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
