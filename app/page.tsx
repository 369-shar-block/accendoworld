"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    image: "/products/IMG-20251026-WA0002.jpg",
    title: "Classic Navy Slides",
    category: "Signature Collection",
  },
  {
    image: "/products/IMG-20251026-WA0010.jpg",
    title: "Bow Accent Clogs",
    category: "Designer Clogs",
  },
  {
    image: "/products/IMG-20251026-WA0015.jpg",
    title: "Puzzle Pattern Slides",
    category: "Bold Patterns",
  },
  {
    image: "/products/IMG-20251026-WA0020.jpg",
    title: "Leopard Print Slides",
    category: "Wild Collection",
  },
  {
    image: "/products/IMG-20251103-WA0005.jpg",
    title: "Platform Sandals",
    category: "Platform Collection",
  },
  {
    image: "/products/IMG-20251026-WA0033.jpg",
    title: "Sunflower Design",
    category: "Floral Collection",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Collection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of comfortable, stylish footwear
              designed to move with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a
              href="/collections"
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Collections
            </a>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-gradient-to-br from-peach-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                A Step Ahead in Comfort
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At ACCENDO, we believe that comfort and style should never be
                compromised. Our footwear is designed with the modern individual
                in mind—someone who values both aesthetics and functionality.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Each piece in our collection is crafted to provide maximum
                comfort while keeping you fashion-forward. From classic slides to
                trendy platform sandals, we have something for every step of your
                journey.
              </p>
              <a
                href="/about"
                className="inline-flex items-center text-peach-600 font-semibold hover:text-peach-700 transition-colors"
              >
                Learn More About Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/products/IMG-20251026-WA0005.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/products/IMG-20251026-WA0018.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/products/IMG-20251026-WA0012.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/products/IMG-20251103-WA0007.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-300 mb-8">
              Be the first to know about new collections, exclusive offers, and
              more.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-peach-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-peach-600 text-white rounded-full font-semibold hover:bg-peach-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
