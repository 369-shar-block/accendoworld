"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  info: {
    email: string;
    shipping_text: string;
    response_time_text: string;
    location_headline_1: string;
    location_headline_2: string;
    location_body: string;
    instagram_url: string;
    facebook_url: string;
  };
};

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

export default function ContactClient({ info }: Props) {
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

  const infoCards = [
    { title: "Email", body: info.email, href: `mailto:${info.email}`, isLink: true },
    { title: "Shipping", body: info.shipping_text, isLink: false },
    { title: "Response Time", body: info.response_time_text, isLink: false },
  ];

  const socialCards = [
    info.instagram_url && info.instagram_url !== "#"
      ? { name: "Instagram", href: info.instagram_url, icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        )}
      : null,
    info.facebook_url && info.facebook_url !== "#"
      ? { name: "Facebook", href: info.facebook_url, icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
          </svg>
        )}
      : null,
  ].filter(Boolean) as Array<{ name: string; href: string; icon: React.ReactNode }>;

  return (
    <>
      {/* HERO */}
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
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
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

      {/* MAIN */}
      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Form */}
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

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10 px-6 py-4 border border-brand-red/20 bg-brand-red/5"
                >
                  <p className="text-brand-red text-sm font-sans tracking-wide">
                    Thank you — we&rsquo;ll get back to you within 24&ndash;48 hours.
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
                <motion.div custom={0} variants={fadeUp} className="mb-8">
                  <label htmlFor="name" className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans">
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

                <motion.div custom={1} variants={fadeUp} className="mb-8">
                  <label htmlFor="email" className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans">
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

                <motion.div custom={2} variants={fadeUp} className="mb-8">
                  <label htmlFor="subject" className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans">
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

                <motion.div custom={3} variants={fadeUp} className="mb-10">
                  <label htmlFor="message" className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans">
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

                <motion.div custom={4} variants={fadeUp}>
                  <button type="submit" className="btn-fill cursor-hover">
                    Send Message
                  </button>
                </motion.div>
              </motion.form>
            </div>

            {/* Info cards */}
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
                      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    }}
                    className="bg-cream-dark px-8 py-7 group"
                  >
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

              {/* Social cards */}
              {socialCards.length > 0 && (
                <div className="mt-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="font-serif text-2xl sm:text-3xl text-brand-black mb-8"
                  >
                    Follow Us
                  </motion.h3>

                  <div className="space-y-4">
                    {socialCards.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.12,
                          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                        }}
                        className="inline-flex items-center gap-4 bg-brand-black px-8 py-5 group cursor-hover hover:bg-brand-red transition-colors duration-500"
                      >
                        <div className="text-cream/80 group-hover:text-white transition-colors duration-300">
                          {social.icon}
                        </div>
                        <span className="font-sans text-sm tracking-[0.15em] uppercase text-cream group-hover:text-white transition-colors duration-300">
                          {social.name}
                        </span>
                        <svg className="w-4 h-4 text-cream/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
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
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-8 leading-tight"
            >
              {info.location_headline_1}
              <br />
              <span className="italic">{info.location_headline_2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-cream/40 text-base leading-relaxed font-sans mb-10"
            >
              {info.location_body}
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
    </>
  );
}
