import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = {
  title: "Admin — ACCENDO",
};

// Admin is auth-gated and session-specific — never cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/contact", label: "Contact info" },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-black text-cream flex flex-col">
        <div className="p-8 border-b border-white/[0.08]">
          <Link href="/" className="block">
            <h1 className="font-serif text-2xl font-bold text-cream">ACCENDO</h1>
            <p className="text-[9px] tracking-[0.35em] uppercase text-brand-red mt-1 font-sans">
              Admin Panel
            </p>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm font-sans text-cream/70 hover:text-cream hover:bg-white/[0.04] rounded transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/[0.08]">
          <p className="px-4 text-[10px] tracking-[0.2em] uppercase text-cream/40 font-sans mb-3">
            Signed in as
          </p>
          <p className="px-4 text-xs text-cream/80 font-sans truncate mb-4">
            {user.email}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-xs font-sans text-cream/60 hover:text-brand-red transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
