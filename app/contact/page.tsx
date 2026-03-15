"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── ANIMATION VARIANTS ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/* ─── CONTACT INFO DATA ─── */

const infoCards = [
  {
    title: "Email",
    body: "info@accendoworld.com",
    href: "mailto:info@accendoworld.com",
    isLink: true,
  },
  {
    title: "Shipping",
    body: "Global shipping available worldwide",
    isLink: false,
  },
  {
    title: "Response Time",
    body: "We respond within 24–48 hours",
    isLink: false,
  },
];

/* ─── PRODUCT STRIP IMAGES ─── */

const stripImages = [
  { src: "/products/new-02.jpeg", alt: "Galaxy Sky Blue Clogs" },
  { src: "/products/IMG-20251107-WA0002.jpg", alt: "Designer Slides" },
  { src: "/products/new-48.jpeg", alt: "Carren Lilac Slides" },
];

/* ─── CONTACT PAGE ─── */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4500);
  };

  const inputBase =
    "w-full px-0 py-4 bg-transparent border-b border-brand-black/15 text-brand-black text-sm font-sans placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-red transition-colors duration-300 cursor-hover";

  return (
    <main className="min-h-screen section-cream">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO — Cream bg, clipPath reveal
          ═══════════════════════════════════════ */}
      <section className="pt-40 pb-20 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-5 font-sans"
          >
            Get in Touch
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as [
                  number,
                  number,
                  number,
                  number
                ],
              }}
              className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold text-brand-black leading-[1.0]"
            >
              Contact Us
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-brand-muted text-base sm:text-lg font-sans max-w-sm"
          >
            We&rsquo;d love to hear from you
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAIN CONTENT — Two-column: form + info
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* ── Left: Contact Form ── */}
            <div className="lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-serif text-2xl sm:text-3xl text-brand-black mb-12"
              >
                Send Us a Message
              </motion.h2>

              {/* Success state */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10 px-6 py-4 border border-brand-red/20 bg-brand-red/5"
                >
                  <p className="text-brand-red text-sm font-sans tracking-wide">
                    Thank you — we&rsquo;ll get back to you within 24–48 hours.
                  </p>
                </motion.div>
              )}

              <motion.form
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-0"
              >
                {/* Name */}
                <motion.div custom={0} variants={fadeUp} className="mb-8">
                  <label
                    htmlFor="name"
                    className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className={inputBase}
                  />
                </motion.div>

                {/* Email */}
                <motion.div custom={1} variants={fadeUp} className="mb-8">
                  <label
                    htmlFor="email"
                    className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputBase}
                  />
                </motion.div>

                {/* Subject */}
                <motion.div custom={2} variants={fadeUp} className="mb-8">
                  <label
                    htmlFor="subject"
                    className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={inputBase}
                  />
                </motion.div>

                {/* Message */}
                <motion.div custom={3} variants={fadeUp} className="mb-10">
                  <label
                    htmlFor="message"
                    className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more..."
                    className={`${inputBase} resize-none`}
                  />
                </motion.div>

                {/* Submit */}
                <motion.div custom={4} variants={fadeUp}>
                  <button type="submit" className="btn-fill cursor-hover">
                    Send Message
                  </button>
                </motion.div>
              </motion.form>
            </div>

            {/* ── Right: Info Cards ── */}
            <div className="lg:col-span-5">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-serif text-2xl sm:text-3xl text-brand-black mb-12"
              >
                Contact Information
              </motion.h2>

              <div className="space-y-5">
                {infoCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94] as [
                        number,
                        number,
                        number,
                        number
                      ],
                    }}
                    className="bg-cream-dark px-8 py-7 group"
                  >
                    {/* Red accent line */}
                    <div className="w-6 h-px bg-brand-red mb-4" />

                    <p className="text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans">
                      {card.title}
                    </p>

                    {card.isLink && card.href ? (
                      <a
                        href={card.href}
                        className="font-sans text-sm text-brand-black/80 hover:text-brand-red transition-colors duration-300 cursor-hover"
                      >
                        {card.body}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-brand-black/80">
                        {card.body}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT IMAGE STRIP — Visual break
          ═══════════════════════════════════════ */}
      <section className="py-16 section-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {stripImages.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94] as [
                    number,
                    number,
                    number,
                    number
                  ],
                }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LOCATION NOTE — Dark bg
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 section-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-5 font-sans"
            >
              Our Reach
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] as [
                  number,
                  number,
                  number,
                  number
                ],
              }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-8 leading-tight"
            >
              Based in India,
              <br />
              <span className="italic">Serving the World</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-cream/40 text-base leading-relaxed font-sans mb-10"
            >
              From our workshop in India, ACCENDO ships premium comfort
              footwear to customers across the globe. No matter where you are,
              a step ahead is just an order away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/collections" className="btn-outline-light cursor-hover">
                Shop Collections
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
