"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── TYPES ───

export type HomeProduct = {
  image: string;
  title: string;
  category: string;
};

type Props = {
  newArrivals: HomeProduct[];
  bestSellers: HomeProduct[];
  heroImages: {
    topRight: string;
    bottomLeft: string;
    center: string;
  };
  categoryImages: {
    women: string;
    men: string;
    kids: string;
  };
  storyImage: string;
};

const marqueeText =
  "A STEP AHEAD \u00B7 COMFORT THAT MOVES WITH YOU \u00B7 PREMIUM FOOTWEAR \u00B7 FOR THE ENTIRE FAMILY \u00B7 ";

const stats = [
  { value: 110, suffix: "+", label: "Products" },
  { value: 3, suffix: "", label: "Collections" },
  { value: 20, suffix: "+", label: "Styles" },
  { value: 0, suffix: "\u221E", label: "Comfort" },
];

/* ─── ANIMATED COUNTER ─── */

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || value === 0) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">
        {value === 0 ? suffix : `${count}${suffix}`}
      </p>
      <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-sans">
        {label}
      </p>
    </div>
  );
}

export default function HomeClient({
  newArrivals,
  bestSellers,
  heroImages,
  categoryImages,
  storyImage,
}: Props) {
  // Horizontal scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hScrollProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const hX = useTransform(hScrollProgress, [0, 1], ["0%", "-65%"]);

  // Parallax for brand story image
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyY = useTransform(storyProgress, [0, 1], ["-15%", "15%"]);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — Cream bg, massive text, floating images
          ═══════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden section-cream">
        {/* Floating product image — top right */}
        <motion.div
          className="absolute top-[12%] right-[3%] lg:right-[8%] w-[150px] h-[190px] sm:w-[220px] sm:h-[280px] lg:w-[280px] lg:h-[350px] z-10 overflow-hidden shadow-2xl shadow-brand-black/10"
          initial={{ opacity: 0, y: 60, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImages.topRight}
              alt="David Collection"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Floating product image — bottom left */}
        <motion.div
          className="absolute bottom-[12%] left-[2%] lg:left-[6%] w-[130px] h-[170px] sm:w-[200px] sm:h-[260px] lg:w-[260px] lg:h-[330px] z-10 overflow-hidden shadow-2xl shadow-brand-black/10"
          initial={{ opacity: 0, y: 60, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImages.bottomLeft}
              alt="Designer Clogs"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Floating product image — behind text, desaturated */}
        <motion.div
          className="hidden sm:block absolute top-[28%] left-[15%] lg:left-[22%] w-[140px] h-[180px] lg:w-[200px] lg:h-[260px] z-0 overflow-hidden shadow-xl shadow-brand-black/5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImages.center}
              alt="Galaxy Collection"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-serif text-[18vw] sm:text-[15vw] lg:text-[12vw] font-bold text-brand-black leading-[0.9] tracking-[-0.02em] text-center select-none">
              ACCENDO
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-4 mt-6"
          >
            <div className="w-10 h-px bg-brand-red" />
            <p className="text-[11px] tracking-[0.5em] uppercase text-brand-muted font-sans">
              A Step Ahead
            </p>
            <div className="w-10 h-px bg-brand-red" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-brand-black/50 text-sm sm:text-base max-w-md text-center mt-4 font-sans leading-relaxed"
          >
            Premium comfort footwear for men, women &amp; kids. Crafted for those who refuse to compromise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex gap-4 mt-8"
          >
            <Link href="/collections" className="btn-fill cursor-hover">
              Explore
            </Link>
            <Link href="/about" className="btn-outline cursor-hover">
              Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
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
          RED MARQUEE BAND
          ═══════════════════════════════════════ */}
      <div className="py-5 overflow-hidden section-red">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.4em] uppercase text-white/80 font-sans mx-0 inline-block"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CATEGORY SHOWCASE — Cream bg, bento grid
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 lg:py-40 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
              Explore
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black">
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <Link href="/collections" className="block group cursor-hover">
                <div className="relative h-[400px] md:h-[500px] lg:h-[620px] overflow-hidden">
                  <Image
                    src={categoryImages.women}
                    alt="Women's Collection"
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-brand-red mb-3 font-sans">
                      Collection
                    </p>
                    <h3 className="font-serif text-4xl lg:text-5xl text-white mb-3">
                      For Her
                    </h3>
                    <p className="text-white/60 text-sm max-w-sm font-sans">
                      Clogs, slides &amp; platform sandals crafted for elegance and comfort
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-sans group-hover:gap-4 transition-all duration-300">
                      Explore
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex-1"
              >
                <Link href="/collections" className="block group cursor-hover h-full">
                  <div className="relative h-[250px] lg:h-full overflow-hidden">
                    <Image
                      src={categoryImages.men}
                      alt="Men's Collection"
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-[10px] tracking-[0.4em] uppercase text-brand-red mb-2 font-sans">
                        Collection
                      </p>
                      <h3 className="font-serif text-3xl lg:text-4xl text-white mb-2">
                        For Him
                      </h3>
                      <div className="flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-sans group-hover:gap-4 transition-all duration-300">
                        Explore
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex-1"
              >
                <Link href="/collections" className="block group cursor-hover h-full">
                  <div className="relative h-[250px] lg:h-full overflow-hidden">
                    <Image
                      src={categoryImages.kids}
                      alt="Kids' Collection"
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-[10px] tracking-[0.4em] uppercase text-brand-red mb-2 font-sans">
                        Collection
                      </p>
                      <h3 className="font-serif text-3xl lg:text-4xl text-white mb-2">
                        For Kids
                      </h3>
                      <div className="flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-sans group-hover:gap-4 transition-all duration-300">
                        Explore
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HORIZONTAL SCROLL — Dark bg, pinned products
          ═══════════════════════════════════════ */}
      <section ref={scrollRef} className="relative section-dark" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
                Just Landed
              </p>
              <div className="flex items-end justify-between">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream">
                  New Arrivals
                </h2>
                <Link
                  href="/collections"
                  className="hidden sm:flex items-center gap-2 text-brand-red text-xs tracking-[0.2em] uppercase font-sans hover:gap-4 transition-all duration-300 cursor-hover"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ x: hX }} className="flex gap-6 pl-6 lg:pl-10">
            {newArrivals.map((product, i) => (
              <div
                key={i}
                className="w-[260px] sm:w-[300px] lg:w-[320px] flex-shrink-0 group cursor-hover"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-brand-red font-sans mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-lg text-cream group-hover:text-brand-red transition-colors duration-300">
                    {product.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRAND STORY — Cream bg, parallax image
          ═══════════════════════════════════════ */}
      <section ref={storyRef} className="py-24 md:py-32 lg:py-40 section-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-6 font-sans">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-black leading-[1.05] mb-8">
                Where Comfort
                <br />
                <span className="italic text-brand-red">Meets Style</span>
              </h2>
              <p className="text-brand-black/50 text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-sans">
                Every pair is crafted with care, combining premium materials with designs that elevate your everyday. From the playground to the promenade, ACCENDO moves with you.
              </p>
              <Link href="/about" className="btn-outline cursor-hover">
                Discover Our Story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] lg:h-[600px] overflow-hidden"
            >
              <motion.div style={{ y: storyY }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
                <Image
                  src={storyImage}
                  alt="ACCENDO Lifestyle"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-brand-red" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BESTSELLERS — Dark bg, asymmetric grid
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 lg:py-40 section-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
              Most Loved
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream">
              Bestsellers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestSellers.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group cursor-hover ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-brand-charcoal ${
                    i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-brand-red font-sans mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-xl text-white">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14"
          >
            <Link href="/collections" className="btn-outline-light cursor-hover">
              View All Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAND — Red bg, animated counters
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-24 section-red">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWSLETTER — Cream bg
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
              Stay Connected
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-black mb-4">
              Join the Journey
            </h2>
            <p className="text-brand-black/40 text-sm mb-10 max-w-md mx-auto font-sans">
              Be the first to discover new collections, exclusive offers, and the stories behind every step.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-transparent border border-brand-black/15 text-brand-black text-sm font-sans placeholder:text-brand-black/30 focus:outline-none focus:border-brand-red transition-colors cursor-hover"
              />
              <button type="submit" className="btn-fill cursor-hover whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
