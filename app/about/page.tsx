"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── VALUE CARDS DATA ─── */

const values = [
  {
    title: "Premium Comfort",
    description:
      "Every pair is engineered for all-day comfort using lightweight, flexible materials that move with your body.",
  },
  {
    title: "Global Vision",
    description:
      "Designed in India, made for the world. Quality that transcends borders and speaks a universal language of style.",
  },
  {
    title: "Trendsetting Design",
    description:
      "Where classic elegance meets bold contemporary style. Each silhouette is crafted to turn heads and stand the test of time.",
  },
];

/* ─── SHOWCASE IMAGES ─── */

const showcaseImages = [
  { src: "/products/new-03.jpeg", alt: "David Black" },
  { src: "/products/IMG-20251026-WA0010.jpg", alt: "Pink Bow Clogs" },
  { src: "/products/new-18.jpeg", alt: "Lexxy Vanilla" },
  { src: "/products/new-37.jpeg", alt: "Sam LT Grey" },
];

/* ─── ABOUT PAGE ─── */

export default function AboutPage() {
  /* Parallax ref for the full-width image band */
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bandProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(bandProgress, [0, 1], ["-12%", "12%"]);

  /* Parallax ref for the brand story image */
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyY = useTransform(storyProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ═══════════════════════════════════════
          1. HERO — Cream bg, full viewport, clip-path reveal
          ═══════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden section-cream">
        {/* Subtle background texture accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-red/[0.03] rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
          {/* Red label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] tracking-[0.6em] uppercase text-brand-red mb-6 font-sans"
          >
            ACCENDO
          </motion.p>

          {/* Clip-path title reveal */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{
              duration: 1.1,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
          >
            <h1 className="font-serif text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9vw] font-bold text-brand-black leading-[0.9] tracking-[-0.02em]">
              Our Story
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-8 text-brand-muted text-base sm:text-lg max-w-lg mx-auto font-sans leading-relaxed"
          >
            The belief that every step deserves to be comfortable, confident,
            and unmistakably you.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-brand-red/40" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-brand-muted font-sans">
              Est. 2025
            </span>
            <div className="w-12 h-px bg-brand-red/40" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-brand-muted font-sans">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-brand-red/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          2. BRAND STORY — Cream bg, two-column
          ═══════════════════════════════════════ */}
      <section
        ref={storyRef}
        className="py-24 md:py-32 lg:py-40 section-cream overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text — left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-6 font-sans">
                The Beginning
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.05] mb-8">
                Born From a
                <br />
                <span className="italic text-brand-red">Simple Belief</span>
              </h2>
              <div className="space-y-5 text-brand-black/50 text-base leading-relaxed font-sans max-w-lg">
                <p>
                  ACCENDO was built on the conviction that you should never have
                  to choose between how your feet feel and how they look.
                  Rooted in Indian craftsmanship with a global eye for design,
                  we set out to create footwear that earns its place in your
                  everyday life.
                </p>
                <p>
                  Every pair we craft carries that founding belief forward —
                  thoughtfully engineered with premium materials and silhouettes
                  that hold their own anywhere in the world.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="w-8 h-px bg-brand-red" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-brand-muted font-sans">
                  Indian Craft, Global Quality
                </span>
              </motion.div>
            </motion.div>

            {/* Image — right, with parallax */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="relative h-[500px] lg:h-[640px] overflow-hidden"
            >
              <motion.div
                style={{ y: storyY }}
                className="absolute inset-0 -top-[10%] -bottom-[10%]"
              >
                <Image
                  src="/products/IMG-20251026-WA0039.jpg"
                  alt="ACCENDO craftsmanship"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Red corner accent */}
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-red" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. FULL-WIDTH IMAGE BAND — Parallax, no text
          ═══════════════════════════════════════ */}
      <div
        ref={bandRef}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <motion.div
          style={{ y: bandY }}
          className="absolute inset-0 -top-[12%] -bottom-[12%]"
        >
          <Image
            src="/products/IMG-20251026-WA0023.jpg"
            alt="ACCENDO collection"
            fill
            className="object-cover"
          />
        </motion.div>
        {/* 40% dark overlay */}
        <div className="absolute inset-0 bg-brand-black/40" />
      </div>

      {/* ═══════════════════════════════════════
          4. MISSION — Dark bg, centered italic quote
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 lg:py-40 section-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          {/* Red divider above */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-12 h-px bg-brand-red mx-auto mb-14"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-8 font-sans">
              Our Mission
            </p>
            <blockquote className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic text-cream leading-[1.1] max-w-4xl mx-auto">
              "Comfort That Moves With You"
            </blockquote>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 text-cream/40 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
            >
              We engineer every pair to keep pace with your life — lightweight
              materials that flex when you move, cushioning that holds up from
              morning through evening, and silhouettes refined enough to go
              wherever the day takes you.
            </motion.p>
          </motion.div>

          {/* Red divider below */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-12 h-px bg-brand-red mx-auto mt-14"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. VALUES GRID — Cream bg, 3 cards, staggered
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 lg:py-40 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 lg:mb-20"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
              Our Principles
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black">
              What We Stand For
            </h2>
          </motion.div>

          {/* 3-column value cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
                className="group bg-white/60 border border-brand-black/[0.06] p-10 lg:p-12 hover:border-brand-red/20 transition-colors duration-500"
              >
                {/* Red accent line at top */}
                <div className="w-10 h-[3px] bg-brand-red mb-8 group-hover:w-16 transition-all duration-500" />

                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-4 leading-tight">
                  {value.title}
                </h3>
                <p className="text-brand-black/50 text-sm leading-relaxed font-sans">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. PRODUCT SHOWCASE — Cream bg, 4-image horizontal strip
          ═══════════════════════════════════════ */}
      <section className="pb-24 md:pb-32 lg:pb-40 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red font-sans">
              The Collection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {showcaseImages.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
                className="group relative aspect-[3/4] overflow-hidden cursor-hover"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. CTA — Red bg, white text and button
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 section-red">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 mb-6 font-sans">
              Shop Now
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Ready to Step Ahead?
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-md mx-auto mb-12 font-sans leading-relaxed">
              Explore the full ACCENDO range — designed for every member of the
              family, built to go the distance.
            </p>
            <Link href="/collections" className="btn-outline-light cursor-hover">
              Explore Collections
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
