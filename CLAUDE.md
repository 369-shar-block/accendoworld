# ACCENDO World - Complete Project Documentation

## Project Overview

**ACCENDO World** (accendoworld.com) is a premium, creatively-designed marketing website for ACCENDO footwear brand. The site features alternating cream/red/dark section rhythms, a custom cursor, horizontal scroll sections, parallax imagery, and massive editorial typography.

**Brand Identity:**
- **Name:** ACCENDO
- **Tagline:** "A Step Ahead"
- **Mission:** "Comfort That Moves With You"
- **Target Audience:** Men, women, kids — families seeking comfort and style

---

## Tech Stack

- **Framework:** Next.js 16.0.10 (React 19.2.3)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.x
- **Animations:** Framer Motion 12.23.26
- **Deployment:** Vercel (auto-deploy on push to `main`)
- **Domain:** Cloudflare DNS → Vercel
- **Repository:** https://github.com/369-shar-block/accendorworld

---

## Project Structure

```
accendorworld/
├── app/
│   ├── layout.tsx              # Root layout (fonts, CustomCursor, metadata)
│   ├── page.tsx                # Homepage (9 sections, horizontal scroll, parallax)
│   ├── globals.css             # Global styles, button classes, section utilities
│   ├── about/page.tsx          # About page (7 alternating sections)
│   ├── collections/page.tsx    # Collections (masonry grid, sticky filters, 101 products)
│   └── contact/page.tsx        # Contact (editorial form, info cards)
├── components/
│   ├── Navbar.tsx              # Fixed nav, cream glass on scroll, animated mobile menu
│   ├── Footer.tsx              # Black bg footer with red accents
│   ├── CustomCursor.tsx        # Mix-blend-difference cursor (desktop only)
│   ├── ProductCard.tsx         # Product card with hover effects (cream bg)
│   └── Hero.tsx                # [DEPRECATED - no longer imported]
├── public/
│   └── products/               # 112 product images
│       ├── IMG-*.jpg           # 59 original images
│       └── new-01 to 53.jpeg   # 53 new product images
├── pics/                       # Original source images (not deployed)
├── inventory/                  # Original product images backup
├── tailwind.config.ts          # Custom colors, fonts, animations
├── next.config.js              # images.unoptimized: true
└── CLAUDE.md                   # This file
```

---

## Design System

### Color Palette (tailwind.config.ts)
```typescript
cream:    { DEFAULT: "#FAF6F1", dark: "#EDE8E0", darker: "#DDD6CC" }
brand: {
  black:      "#0F0F0F",
  charcoal:   "#1A1A1A",
  red:        "#C41E3A",    // Primary accent
  "red-dark": "#A0182F",
  gold:       "#C8A97E",
  "gold-light":"#DFC9A3",
  muted:      "#9A9590",
}
```

### Section Rhythm
Pages alternate between three moods for visual drama:
- **`section-cream`** — `bg: #FAF6F1`, `color: #0F0F0F`
- **`section-dark`** — `bg: #0F0F0F`, `color: #FAF6F1`
- **`section-red`** — `bg: #C41E3A`, `color: white`

### Typography
- **Serif (headings):** Playfair Display via `font-serif` / `var(--font-playfair)`
- **Sans (body):** DM Sans via `font-sans` / `var(--font-dm-sans)`
- Massive viewport-filling titles: `text-[18vw]` down to `text-[12vw]`

### Button Classes (globals.css)
- **`.btn-fill`** — Red bg (#C41E3A), white text, hover lift + shadow
- **`.btn-outline`** — Dark border, transparent bg, hover fills dark
- **`.btn-outline-light`** — White border for dark sections, hover fills white

### Custom Cursor
- `components/CustomCursor.tsx` — white dot, `mix-blend-difference`, `z-[99999]`
- Expands from 12px to 48px on hoverable elements
- Only active on desktop (`pointer: fine`)
- Add `cursor-hover` class to interactive elements for cursor expansion
- Body uses `cursor: none` (overridden to `cursor: auto` on touch devices)

### Utility Classes
- `.scrollbar-hide` — hides scrollbars
- `.img-reveal` — shine sweep effect on hover
- `.custom-cursor` / `.cursor-dot` — cursor CSS fallbacks

---

## Pages & Sections

### Homepage (`/`) — 9 sections
1. **Hero (Cream)** — Massive "ACCENDO" text with clipPath reveal, 3 floating product images, tagline, CTA buttons, scroll indicator
2. **Red Marquee** — Scrolling white text on brand red band
3. **Category Showcase (Cream)** — Asymmetric bento grid: large Women's left, Men + Kids stacked right
4. **Horizontal Scroll (Dark)** — Pinned 300vh section, products scroll horizontally via `useScroll` + `useTransform`
5. **Brand Story (Cream)** — Split layout: serif quote left, parallax image right with red accent block
6. **Bestsellers (Dark)** — Asymmetric grid (first item 2x2), hover reveals category/title
7. **Stats Band (Red)** — Animated counters: 110+ Products, 3 Collections, 20+ Styles, ∞ Comfort
8. **Newsletter (Cream)** — Email signup form
9. **Footer (Black)**

### Collections (`/collections`)
- Hero with text reveal animation
- Sticky filter pills: All, Men's, Women's, Kids'
- CSS masonry layout (`columns-2 lg:columns-3 xl:columns-4`)
- AnimatePresence for filter transitions
- 101 total products displayed
- Red CTA band at bottom

### About (`/about`) — 7 sections
1. Hero (Cream) — clipPath text reveal
2. Brand Story (Cream) — two-column with parallax image
3. Full-Width Image Band — parallax effect, dark overlay
4. Mission (Dark) — centered italic serif quote
5. Values Grid (Cream) — 3 cards with red accent lines
6. Product Showcase (Cream) — 4 product images in a row
7. CTA (Red) — white text + outline button

### Contact (`/contact`)
- Hero with clipPath text reveal
- Two-column: editorial form (left) + info cards (right)
- Form fields: name, email, subject, message (border-bottom style)
- 3 info cards: email, shipping, response time
- Product image strip
- Dark location section: "Based in India, Serving the World"

---

## Product Inventory

**Total Images:** 112 (59 original + 53 new)

### Image Naming
- **Original:** `IMG-YYYYMMDD-WA####.jpg` (59 files)
- **New:** `new-01.jpeg` through `new-53.jpeg`

### Product Categories & Counts
| Category | Products | Image Prefix |
|----------|----------|-------------|
| Men's Flip Flops (David) | 4 | new-03 to 05, 09 |
| Men's Slides (Sam) | 4 | new-37 to 40 |
| Men's Slides (Jaxon) | 5 | new-41 to 45 |
| Women's Clogs (Bow) | 12 | IMG-*WA0010–0021 |
| Women's Platforms | 6 | IMG-*WA0023–0028 |
| Women's Slides | 14 | IMG-*WA0002–0006, 0029–0037, WA0107* |
| Women's Clogs (Platform) | 4 | IMG-*WA0103-0108* |
| Kids' Clogs (Galaxy) | 5 | new-01, 02, 06, 07, 08 |
| Kids' Clogs (Toby) | 4 | new-14 to 17 |
| Kids' Clogs (Lexxy) | 5 | new-18 to 22 |
| Kids' Clogs (Alex) | 6 | new-23 to 28 |
| Kids' Clogs (Devin) | 8 | new-29 to 36 |
| Kids' Slides (Carren) | 4 | new-48 to 51 |
| Kids' Clogs (Carrie/Lucy) | 2 | new-52, 53 |
| Kids' Slides (Jaxon) | 2 | new-46, 47 |
| Kids' Flip Flops (David) | 4 | new-10 to 13 |

---

## Animation Patterns

### Text Reveal (clipPath)
```typescript
initial={{ clipPath: "inset(100% 0 0 0)" }}
animate={{ clipPath: "inset(0% 0 0 0)" }}
transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
```

### Horizontal Scroll (pinned section)
```typescript
const scrollRef = useRef(null);
const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
const hX = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
// Section height: 300vh, sticky inner: h-screen
```

### Parallax Image
```typescript
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
```

### Animated Counters
```typescript
// useInView triggers count-up from 0 to target over 2 seconds
// Uses setInterval at 16ms (60fps) with Math.floor
```

### Scroll-triggered Fade Up
```typescript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.7 }}
```

---

## Key Files to Edit

**Adding New Products:**
1. Add image to `public/products/`
2. Add to `allProducts` array in `app/collections/page.tsx`
3. Optionally add to `newArrivals` or `bestSellers` in `app/page.tsx`

**Changing Brand Colors:**
1. Edit `tailwind.config.ts` color tokens
2. Update `app/globals.css` section/button classes

**Updating Contact Info:**
1. `components/Footer.tsx`
2. `app/contact/page.tsx`

---

## Deployment

- **Hosting:** Vercel
- **Domain:** accendoworld.com (Cloudflare DNS → `cname.vercel-dns.com`)
- **Auto-deploy:** Push to `main` branch
- **Production URLs:** https://accendoworld.com, https://accendoworld.vercel.app

### DNS (Cloudflare)
- Type: CNAME, Name: @, Target: cname.vercel-dns.com, Proxy: OFF

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build
npm start            # Production server
npm run lint         # Linter
```

---

## Known Issues / Notes

1. **Images:** Using `unoptimized: true` — consider enabling Vercel image optimization
2. **Contact Form:** Resets on submit but doesn't send data — wire up to email service (Resend, SendGrid)
3. **Newsletter:** Not connected to any service — integrate with Mailchimp/ConvertKit
4. **Product Data:** Hardcoded in page files — consider moving to JSON/database
5. **Hero.tsx:** Deprecated component, no longer imported — can be deleted

---

**Last Updated:** March 2026
**Version:** 2.0.0
**Status:** Production Ready
