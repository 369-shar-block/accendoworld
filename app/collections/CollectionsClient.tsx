"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// ─── TYPES ───

export type CollectionsProduct = {
  image: string;
  title: string;
  category: string;
};

type Props = {
  products: CollectionsProduct[];
};

// ─── FILTER TABS ───

const filters = [
  { key: "All", label: "All" },
  { key: "Men's", label: "Men's" },
  { key: "Women's", label: "Women's" },
  { key: "Kids'", label: "Kids'" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const EASE_CUSTOM = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ─── CLIENT ───

export default function CollectionsClient({ products }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((p) => p.category.startsWith(activeFilter));
  }, [activeFilter, products]);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — Cream bg, large serif title reveal
          ═══════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-24 section-cream overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-brand-red/20" />

        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        >
          <span className="font-serif text-[22vw] font-bold text-brand-black/[0.025] leading-none tracking-[-0.03em] whitespace-nowrap">
            ACCENDO
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_CUSTOM }}
            className="text-[10px] tracking-[0.55em] uppercase text-brand-red font-sans mb-6"
          >
            Browse
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_CUSTOM }}
              className="font-serif text-[13vw] sm:text-[10vw] lg:text-[8vw] xl:text-[7vw] font-bold text-brand-black leading-[0.92] tracking-[-0.02em]"
            >
              Collections
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_CUSTOM }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-brand-red" />
              <p className="text-brand-muted text-sm font-sans leading-relaxed max-w-sm">
                Premium comfort footwear crafted for men, women &amp; kids.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-brand-muted">
                {products.length} styles
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STICKY FILTER BAR
          ═══════════════════════════════════════ */}
      <div className="sticky top-20 z-40 section-cream border-b border-brand-black/8 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              const count =
                filter.key === "All"
                  ? products.length
                  : products.filter((p) => p.category.startsWith(filter.key)).length;

              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`cursor-hover relative flex items-center gap-2 px-5 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase font-sans font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/25"
                      : "bg-brand-black/5 text-brand-muted hover:bg-brand-black/10 hover:text-brand-black"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`text-[9px] font-sans font-normal transition-colors duration-300 ${
                      isActive ? "text-white/70" : "text-brand-muted/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PRODUCT MASONRY GRID
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-20 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_CUSTOM }}
              className="columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={`${activeFilter}-${product.image}`}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.03, 0.35),
                    ease: EASE_CUSTOM,
                  }}
                  className="break-inside-avoid"
                >
                  <ProductCard
                    image={product.image}
                    title={product.title}
                    category={product.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA BAND — Red bg
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-24 section-red overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_CUSTOM }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          >
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 font-sans mb-3">
                A Step Ahead
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-lg">
                Every pair tells a story.
                <br />
                <span className="italic font-normal">Start yours.</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_CUSTOM }}
              className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
            >
              <Link href="/" className="btn-outline-light cursor-hover">
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="cursor-hover relative inline-flex items-center justify-center gap-2 px-11 py-[18px] font-sans font-medium text-xs tracking-[0.2em] uppercase bg-white text-brand-red overflow-hidden transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
