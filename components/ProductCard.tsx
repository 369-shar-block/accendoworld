"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price?: string;
}

export default function ProductCard({
  image,
  title,
  category,
  price,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className="group cursor-hover"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark img-reveal">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Corner red triangle accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-brand-red border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-sans mb-1">
          {category}
        </p>
        <h3 className="font-serif text-base text-brand-black group-hover:text-brand-red transition-colors duration-300">
          {title}
        </h3>
        {price && (
          <p className="text-brand-muted text-sm font-sans mt-1">{price}</p>
        )}
      </div>
    </motion.div>
  );
}
