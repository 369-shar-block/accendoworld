"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
}

export default function ProductCard({ image, title, category }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm font-medium text-peach-300">{category}</p>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
