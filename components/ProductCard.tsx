"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price?: string;
  /** When provided, the image becomes clickable to open the lightbox. */
  onImageClick?: () => void;
}

export default function ProductCard({
  image,
  title,
  category,
  price,
  onImageClick,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className="group cursor-hover"
    >
      {/* Square container matches the native 1600×1600 source so the full
          product photo is shown on desktop with no edges cropped. */}
      <button
        type="button"
        onClick={onImageClick}
        aria-label={onImageClick ? `View ${title} larger` : undefined}
        className="relative block w-full aspect-square overflow-hidden bg-cream-dark img-reveal cursor-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
        {...(onImageClick ? {} : { tabIndex: -1 })}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Corner red triangle accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-brand-red border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Zoom hint on hover (only when clickable) */}
        {onImageClick && (
          <div className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 8v6M8 11h6M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
      </button>
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
