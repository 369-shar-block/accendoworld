"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// ─── PRODUCT DATA ───

const allProducts = [
  // ─── MEN'S COLLECTION ───
  { image: "/products/new-03.jpeg", title: "David Black", category: "Men's Flip Flops" },
  { image: "/products/new-04.jpeg", title: "David DK Grey", category: "Men's Flip Flops" },
  { image: "/products/new-09.jpeg", title: "David Navy", category: "Men's Flip Flops" },
  { image: "/products/new-05.jpeg", title: "David Olive", category: "Men's Flip Flops" },
  { image: "/products/new-37.jpeg", title: "Sam LT Grey", category: "Men's Slides" },
  { image: "/products/new-38.jpeg", title: "Sam Navy", category: "Men's Slides" },
  { image: "/products/new-39.jpeg", title: "Sam DK Grey", category: "Men's Slides" },
  { image: "/products/new-40.jpeg", title: "Sam Black", category: "Men's Slides" },
  { image: "/products/new-41.jpeg", title: "Jaxon Olive", category: "Men's Slides" },
  { image: "/products/new-42.jpeg", title: "Jaxon Navy", category: "Men's Slides" },
  { image: "/products/new-43.jpeg", title: "Jaxon Black", category: "Men's Slides" },
  { image: "/products/new-44.jpeg", title: "Jaxon DK Grey", category: "Men's Slides" },
  { image: "/products/new-45.jpeg", title: "Jaxon Sky Blue", category: "Men's Slides" },

  // ─── WOMEN'S COLLECTION ───
  { image: "/products/IMG-20251026-WA0010.jpg", title: "Pink Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0011.jpg", title: "White Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0012.jpg", title: "Beige Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0013.jpg", title: "Lavender Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0014.jpg", title: "Black Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0015.jpg", title: "Mint Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0016.jpg", title: "Sky Blue Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0017.jpg", title: "Rose Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0018.jpg", title: "Coral Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0019.jpg", title: "Peach Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0020.jpg", title: "Baby Pink Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0021.jpg", title: "Sage Bow Clogs", category: "Women's Clogs" },
  { image: "/products/IMG-20251026-WA0023.jpg", title: "Platform Sandals Tan", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0024.jpg", title: "Platform Sandals Black", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0025.jpg", title: "Platform Sandals White", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0026.jpg", title: "Platform Wedge Rose", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0027.jpg", title: "Platform Wedge Gold", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0028.jpg", title: "Platform Wedge Silver", category: "Women's Platforms" },
  { image: "/products/IMG-20251026-WA0002.jpg", title: "Classic Navy Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0003.jpg", title: "Classic Black Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0004.jpg", title: "Classic White Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0005.jpg", title: "Logo Print Navy", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0006.jpg", title: "Logo Print Black", category: "Women's Slides" },
  { image: "/products/IMG-20251107-WA0001.jpg", title: "Floral Slides Pink", category: "Women's Slides" },
  { image: "/products/IMG-20251107-WA0002.jpg", title: "Floral Slides Blue", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0033.jpg", title: "Leopard Print Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0034.jpg", title: "Wild Print Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0035.jpg", title: "Ethnic Print Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0036.jpg", title: "Traditional Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0037.jpg", title: "Heritage Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0029.jpg", title: "Puzzle Print Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0030.jpg", title: "Tech Print Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251026-WA0031.jpg", title: "Geometric Slides", category: "Women's Slides" },
  { image: "/products/IMG-20251103-WA0005.jpg", title: "Platform Clog White", category: "Women's Clogs" },
  { image: "/products/IMG-20251103-WA0006.jpg", title: "Platform Clog Pink", category: "Women's Clogs" },
  { image: "/products/IMG-20251103-WA0007.jpg", title: "Platform Clog Black", category: "Women's Clogs" },
  { image: "/products/IMG-20251103-WA0008.jpg", title: "Platform Clog Beige", category: "Women's Clogs" },

  // ─── KIDS' COLLECTION ───
  { image: "/products/new-01.jpeg", title: "Galaxy Mustard", category: "Kids' Clogs" },
  { image: "/products/new-02.jpeg", title: "Galaxy Sky Blue", category: "Kids' Clogs" },
  { image: "/products/new-06.jpeg", title: "Galaxy Pista", category: "Kids' Clogs" },
  { image: "/products/new-07.jpeg", title: "Galaxy Pink", category: "Kids' Clogs" },
  { image: "/products/new-08.jpeg", title: "Galaxy Red", category: "Kids' Clogs" },
  { image: "/products/new-14.jpeg", title: "Toby DK Grey/Mustard", category: "Kids' Clogs" },
  { image: "/products/new-15.jpeg", title: "Toby Navy/Red", category: "Kids' Clogs" },
  { image: "/products/new-16.jpeg", title: "Toby Black/LT Grey", category: "Kids' Clogs" },
  { image: "/products/new-17.jpeg", title: "Toby Olive/Mustard", category: "Kids' Clogs" },
  { image: "/products/new-18.jpeg", title: "Lexxy Vanilla", category: "Kids' Clogs" },
  { image: "/products/new-19.jpeg", title: "Lexxy Pink", category: "Kids' Clogs" },
  { image: "/products/new-20.jpeg", title: "Lexxy Peach", category: "Kids' Clogs" },
  { image: "/products/new-21.jpeg", title: "Lexxy Lilac", category: "Kids' Clogs" },
  { image: "/products/new-22.jpeg", title: "Lexxy Mint", category: "Kids' Clogs" },
  { image: "/products/new-23.jpeg", title: "Alex Olive", category: "Kids' Clogs" },
  { image: "/products/new-24.jpeg", title: "Alex Navy", category: "Kids' Clogs" },
  { image: "/products/new-25.jpeg", title: "Alex DK Grey", category: "Kids' Clogs" },
  { image: "/products/new-26.jpeg", title: "Alex Black", category: "Kids' Clogs" },
  { image: "/products/new-27.jpeg", title: "Alex Red/Black", category: "Kids' Clogs" },
  { image: "/products/new-28.jpeg", title: "Alex Sky Blue", category: "Kids' Clogs" },
  { image: "/products/new-29.jpeg", title: "Devin Red/Black", category: "Kids' Clogs" },
  { image: "/products/new-30.jpeg", title: "Devin Navy/LT Grey", category: "Kids' Clogs" },
  { image: "/products/new-31.jpeg", title: "Devin Olive", category: "Kids' Clogs" },
  { image: "/products/new-32.jpeg", title: "Devin Sky Blue", category: "Kids' Clogs" },
  { image: "/products/new-33.jpeg", title: "Devin Mustard", category: "Kids' Clogs" },
  { image: "/products/new-34.jpeg", title: "Devin DK Grey", category: "Kids' Clogs" },
  { image: "/products/new-35.jpeg", title: "Devin LT Grey", category: "Kids' Clogs" },
  { image: "/products/new-36.jpeg", title: "Devin Black", category: "Kids' Clogs" },
  { image: "/products/new-48.jpeg", title: "Carren Lilac", category: "Kids' Slides" },
  { image: "/products/new-49.jpeg", title: "Carren Pink", category: "Kids' Slides" },
  { image: "/products/new-50.jpeg", title: "Carren Peach", category: "Kids' Slides" },
  { image: "/products/new-51.jpeg", title: "Carren Baby Pink", category: "Kids' Slides" },
  { image: "/products/new-52.jpeg", title: "Carrie Pista", category: "Kids' Clogs" },
  { image: "/products/new-53.jpeg", title: "Lucy Baby Pink", category: "Kids' Clogs" },
  { image: "/products/new-46.jpeg", title: "Jaxon LT Grey Kids", category: "Kids' Slides" },
  { image: "/products/new-47.jpeg", title: "Jaxon Navy Kids", category: "Kids' Slides" },
  { image: "/products/new-10.jpeg", title: "David Olive Kids", category: "Kids' Flip Flops" },
  { image: "/products/new-11.jpeg", title: "David Navy Kids", category: "Kids' Flip Flops" },
  { image: "/products/new-12.jpeg", title: "David DK Grey Kids", category: "Kids' Flip Flops" },
  { image: "/products/new-13.jpeg", title: "David Black Kids", category: "Kids' Flip Flops" },
];

// ─── FILTER TABS ───

const filters = [
  { key: "All", label: "All" },
  { key: "Men's", label: "Men's" },
  { key: "Women's", label: "Women's" },
  { key: "Kids'", label: "Kids'" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const EASE_CUSTOM = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ─── COLLECTIONS PAGE ───

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return allProducts;
    return allProducts.filter((p) => p.category.startsWith(activeFilter));
  }, [activeFilter]);

  return (
    <main className="min-h-screen section-cream">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO — Cream bg, large serif title reveal
          ═══════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-24 section-cream overflow-hidden">
        {/* Subtle decorative red line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-brand-red/20" />

        {/* Background texture: large ghost lettering */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        >
          <span className="font-serif text-[22vw] font-bold text-brand-black/[0.025] leading-none tracking-[-0.03em] whitespace-nowrap">
            ACCENDO
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_CUSTOM }}
            className="text-[10px] tracking-[0.55em] uppercase text-brand-red font-sans mb-6"
          >
            Browse
          </motion.p>

          {/* Title — clip-path reveal */}
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

          {/* Divider + subtitle row */}
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

            {/* Product count badge */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-brand-muted">
                {allProducts.length} styles
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
              // Count per filter for the label badge
              const count =
                filter.key === "All"
                  ? allProducts.length
                  : allProducts.filter((p) => p.category.startsWith(filter.key)).length;

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
              /*
               * CSS columns masonry layout.
               * `space-y-*` on the container applies vertical rhythm between
               * column items; `break-inside-avoid` prevents cards from splitting.
               */
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
            {/* Left copy */}
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

            {/* Right actions */}
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
              <Link href="/contact" className="cursor-hover relative inline-flex items-center justify-center gap-2 px-11 py-[18px] font-sans font-medium text-xs tracking-[0.2em] uppercase bg-white text-brand-red overflow-hidden transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <Footer />
    </main>
  );
}
