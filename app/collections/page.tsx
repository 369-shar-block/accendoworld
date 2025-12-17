"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

// Generate product list from available images
const allProducts = [
  { image: "/products/IMG-20251026-WA0002.jpg", title: "Classic Navy Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0003.jpg", title: "Black Logo Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0004.jpg", title: "White Logo Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0005.jpg", title: "Navy Comfort Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0006.jpg", title: "Red Accent Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0007.jpg", title: "Classic Black Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0008.jpg", title: "White Comfort Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0009.jpg", title: "Designer White Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0010.jpg", title: "Pink Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0011.jpg", title: "Purple Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0012.jpg", title: "White Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0013.jpg", title: "Black Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0014.jpg", title: "Mauve Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0015.jpg", title: "Puzzle Pattern Slides", category: "Bold Patterns" },
  { image: "/products/IMG-20251026-WA0016.jpg", title: "Colorful Puzzle Slides", category: "Bold Patterns" },
  { image: "/products/IMG-20251026-WA0017.jpg", title: "Tech Pattern Slides", category: "Bold Patterns" },
  { image: "/products/IMG-20251026-WA0018.jpg", title: "Tool Design Slides", category: "Bold Patterns" },
  { image: "/products/IMG-20251026-WA0019.jpg", title: "Orange Tech Slides", category: "Bold Patterns" },
  { image: "/products/IMG-20251026-WA0020.jpg", title: "Leopard Print Slides", category: "Wild Collection" },
  { image: "/products/IMG-20251026-WA0021.jpg", title: "Animal Print Slides", category: "Wild Collection" },
  { image: "/products/IMG-20251026-WA0022.jpg", title: "Leopard Comfort Slides", category: "Wild Collection" },
  { image: "/products/IMG-20251026-WA0023.jpg", title: "Black Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0024.jpg", title: "White Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0025.jpg", title: "White Buckle Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0026.jpg", title: "Double Strap Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0027.jpg", title: "Brown Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0028.jpg", title: "Taupe Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0029.jpg", title: "Casual Platform Slides", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0030.jpg", title: "Beige Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0031.jpg", title: "Classic White Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0032.jpg", title: "White Bow Accent Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0033.jpg", title: "Sunflower Design Slides", category: "Floral Collection" },
  { image: "/products/IMG-20251026-WA0034.jpg", title: "Floral Logo Slides", category: "Floral Collection" },
  { image: "/products/IMG-20251026-WA0035.jpg", title: "Blue Ethnic Pattern Slides", category: "Ethnic Designs" },
  { image: "/products/IMG-20251026-WA0036.jpg", title: "Traditional Pattern Slides", category: "Ethnic Designs" },
  { image: "/products/IMG-20251026-WA0037.jpg", title: "Geometric Pattern Slides", category: "Ethnic Designs" },
  { image: "/products/IMG-20251026-WA0038.jpg", title: "Pink Platform Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0039.jpg", title: "Lifestyle Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0040.jpg", title: "Summer Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251026-WA0041.jpg", title: "White Comfort Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251026-WA0042.jpg", title: "Classic Navy Slides Duo", category: "Classic Slides" },
  { image: "/products/IMG-20251026-WA0043.jpg", title: "Navy Collection Slides", category: "Classic Slides" },
  { image: "/products/IMG-20251103-WA0005.jpg", title: "Brown Double Strap Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0006.jpg", title: "Beige Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0007.jpg", title: "Chunky Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0008.jpg", title: "Trendy Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0009.jpg", title: "Modern Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0010.jpg", title: "Casual Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0011.jpg", title: "Summer Platform Slides", category: "Platform Collection" },
  { image: "/products/IMG-20251103-WA0012.jpg", title: "Comfortable Platform Sandals", category: "Platform Collection" },
  { image: "/products/IMG-20251107-WA0001.jpg", title: "White Designer Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0002.jpg", title: "Pink Designer Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0003.jpg", title: "Purple Designer Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0004.jpg", title: "Black Designer Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0005.jpg", title: "Bow Collection Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0006.jpg", title: "Classic Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0007.jpg", title: "Elegant Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0008.jpg", title: "Fashion Bow Clogs", category: "Designer Clogs" },
  { image: "/products/IMG-20251107-WA0009.jpg", title: "Stylish Bow Clogs", category: "Designer Clogs" },
];

const categories = [
  "All",
  "Classic Slides",
  "Designer Clogs",
  "Platform Collection",
  "Bold Patterns",
  "Wild Collection",
  "Floral Collection",
  "Ethnic Designs",
];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-peach-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Our Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore our full range of comfortable, stylish footwear designed to
            complement your lifestyle.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
