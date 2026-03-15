import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Main Footer */}
        <div className="py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <h3 className="font-serif text-4xl font-bold text-cream mb-2">
              ACCENDO
            </h3>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-red" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-brand-red font-sans">
                A Step Ahead
              </p>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-sm font-sans">
              Premium comfort footwear crafted for the entire family. Where
              style meets comfort in every step you take.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-red mb-6 font-sans">
              Navigate
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/collections", label: "Collections" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/40 hover:text-cream text-sm transition-colors duration-300 cursor-hover font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-red mb-6 font-sans">
              Collections
            </h4>
            <ul className="space-y-4">
              {["Men's", "Women's", "Kids'"].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/collections"
                    className="text-cream/40 hover:text-cream text-sm transition-colors duration-300 cursor-hover font-sans"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-red mb-6 font-sans">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-cream/40 font-sans">
              <li>
                <a
                  href="mailto:info@accendoworld.com"
                  className="hover:text-cream transition-colors duration-300 cursor-hover"
                >
                  info@accendoworld.com
                </a>
              </li>
              <li>
                <span className="hover:text-cream transition-colors duration-300">
                  www.accendoworld.com
                </span>
              </li>
              <li>Global Shipping Available</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/20 text-xs tracking-[0.1em] font-sans">
            &copy; {new Date().getFullYear()} ACCENDO. All rights reserved.
          </p>
          <div className="flex gap-8">
            {[
              { name: "Instagram", href: "#" },
              { name: "Facebook", href: "#" },
              { name: "Twitter", href: "#" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-cream/20 hover:text-brand-red text-xs tracking-[0.15em] uppercase transition-colors duration-300 cursor-hover font-sans"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
