"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function LoginClient({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  const inputBase =
    "w-full px-0 py-4 bg-transparent border-b border-brand-black/15 text-brand-black text-sm font-sans placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-red transition-colors duration-300";

  return (
    <section className="pt-40 pb-32 section-cream min-h-screen">
      <div className="max-w-md mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-5 font-sans"
        >
          Staff Access
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
            className="font-serif text-5xl sm:text-6xl font-bold text-brand-black leading-[1.0]"
          >
            Sign In
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-brand-muted text-sm font-sans mb-12"
        >
          Editor access to the ACCENDO admin dashboard.
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-6 py-4 border border-brand-red/20 bg-brand-red/5"
          >
            <p className="text-brand-red text-sm font-sans">{error}</p>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputBase}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[9px] tracking-[0.35em] uppercase text-brand-muted mb-2 font-sans"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className={inputBase}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-fill w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in\u2026" : "Sign In"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
