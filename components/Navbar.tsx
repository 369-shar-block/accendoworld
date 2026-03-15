"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-cream/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(15,15,15,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 lg:h-24">
            <Link href="/" className="relative z-50 cursor-hover">
              <span
                className={`font-serif text-2xl lg:text-[28px] font-bold tracking-[0.05em] transition-colors duration-500 ${
                  isOpen ? "text-cream" : "text-brand-black"
                }`}
              >
                ACCENDO
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] font-sans tracking-[0.25em] uppercase transition-colors duration-300 group cursor-hover ${
                    pathname === link.href
                      ? "text-brand-red"
                      : "text-brand-black/50 hover:text-brand-black"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-brand-red transition-all duration-500 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[5px] cursor-hover"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isOpen
                    ? { rotate: 45, y: 7, width: 24 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.3 }}
                className={`h-[1.5px] block origin-center transition-colors duration-300 ${
                  isOpen ? "bg-cream" : "bg-brand-black"
                }`}
                style={{ width: 20 }}
              />
              <motion.span
                animate={
                  isOpen
                    ? { opacity: 0, x: -10 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
                className={`w-5 h-[1.5px] block transition-colors duration-300 ${
                  isOpen ? "bg-cream" : "bg-brand-black"
                }`}
              />
              <motion.span
                animate={
                  isOpen
                    ? { rotate: -45, y: -7, width: 24 }
                    : { rotate: 0, y: 0, width: 14 }
                }
                transition={{ duration: 0.3 }}
                className={`h-[1.5px] block self-end origin-center transition-colors duration-300 ${
                  isOpen ? "bg-cream" : "bg-brand-black"
                }`}
                style={{ width: 14 }}
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-brand-black/[0.97] backdrop-blur-2xl z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-serif text-4xl sm:text-5xl transition-colors duration-300 cursor-hover ${
                      pathname === link.href
                        ? "text-brand-red"
                        : "text-cream/70 hover:text-brand-red"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-brand-muted text-xs tracking-[0.3em] uppercase"
              >
                A Step Ahead
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
