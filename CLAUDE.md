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
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Deployment:** Vercel (auto-deploy on push to `main`)
- **Domain:** Cloudflare DNS → Vercel
- **Repository:** https://github.com/369-shar-block/accendorworld

---

## Project Structure

```
accendorworld/
├── app/
│   ├── layout.tsx              # Root layout (fonts, CustomCursor, metadata)
│   ├── page.tsx                # Homepage server component (fetches from Supabase)
│   ├── HomeClient.tsx          # Homepage client component (animations, scroll)
│   ├── globals.css             # Global styles, button classes, section utilities
│   ├── about/
│   │   ├── page.tsx            # About server wrapper
│   │   └── AboutClient.tsx     # About client component (animations)
│   ├── collections/
│   │   ├── page.tsx            # Collections server component (fetches products)
│   │   └── CollectionsClient.tsx # Collections client (filters, masonry, animations)
│   ├── contact/
│   │   ├── page.tsx            # Contact server component (fetches contact info)
│   │   └── ContactClient.tsx   # Contact client (form, info cards, social cards)
│   ├── login/
│   │   ├── page.tsx            # Login server wrapper
│   │   └── LoginClient.tsx     # Login form (email + password via Supabase Auth)
│   └── admin/
│       ├── layout.tsx          # Admin layout (auth guard + sidebar)
│       ├── page.tsx            # Dashboard (product stats)
│       ├── actions.ts          # Server actions (CRUD products, contact, sign out)
│       ├── products/
│       │   ├── page.tsx        # Products list (server)
│       │   └── ProductsAdminClient.tsx  # Products CRUD UI (add/edit/delete)
│       └── contact/
│           ├── page.tsx        # Contact editor (server)
│           └── ContactAdminClient.tsx   # Contact fields form
├── lib/supabase/
│   ├── client.ts               # Browser Supabase client
│   ├── server.ts               # Server component Supabase client
│   ├── middleware.ts            # Session refresh for middleware
│   ├── queries.ts              # Server-side data fetching functions
│   ├── types.ts                # Product, ContactInfo types + field metadata
│   └── image.ts                # productImageUrl() helper
├── components/
│   ├── Navbar.tsx              # Fixed nav, cream glass on scroll, animated mobile menu
│   ├── Footer.tsx              # Async server component (fetches contact info from Supabase)
│   ├── CustomCursor.tsx        # Mix-blend-difference cursor (desktop only)
│   ├── ProductCard.tsx         # Product card with hover effects (cream bg)
│   └── Hero.tsx                # [DEPRECATED - no longer imported]
├── middleware.ts                # Session refresh + /admin route protection
├── supabase/schema.sql          # DB schema, RLS policies, storage bucket
├── scripts/migrate-to-supabase.mjs  # One-time data migration script
├── public/products/             # 112 product images (legacy, now in Supabase Storage)
├── tailwind.config.ts           # Custom colors, fonts, animations
├── next.config.js               # images.unoptimized: true
└── CLAUDE.md                    # This file
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

**Storage:** Supabase Storage bucket `products` (public read)
**Database:** `products` table in Supabase PostgreSQL
**Total Products:** 90 (managed via /admin/products)
**Total Images:** 112 in storage (90 used by products, rest are extras)

### Product Categories
| Category | Filter Tab |
|----------|-----------|
| Men's Flip Flops | Men's |
| Men's Slides | Men's |
| Women's Clogs | Women's |
| Women's Slides | Women's |
| Women's Platforms | Women's |
| Kids' Clogs | Kids' |
| Kids' Slides | Kids' |
| Kids' Flip Flops | Kids' |

Products are managed via the admin panel at `/admin/products`. Categories must start with "Men's", "Women's", or "Kids'" for the collection filter tabs to work.

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

**Adding New Products:** Use `/admin/products` in the browser (upload image + fill in details)

**Editing Contact Info:** Use `/admin/contact` in the browser

**Changing Brand Colors:**
1. Edit `tailwind.config.ts` color tokens
2. Update `app/globals.css` section/button classes

**Data flow:** Server components fetch from Supabase → pass data as props → client components render with animations. ISR revalidation is 60 seconds.

## Admin Panel

- **URL:** `/admin` (protected — requires Supabase Auth login)
- **Login:** `/login` (email + password)
- **Role:** Single `editor` role — any authenticated user can manage content
- **Features:**
  - Dashboard with product stats
  - Products: add (with photo upload), edit, delete, toggle visibility/bestseller/new arrival
  - Contact info: edit all public-facing text (email, shipping, socials, footer, location)
- **Auth accounts:** Created manually in Supabase dashboard → Authentication → Users

## Supabase

- **Project:** `xtwujonvlegegzikiuki`
- **Tables:** `profiles`, `products`, `contact_info`
- **Storage:** `products` bucket (public read, authed write)
- **RLS:** Public read on products + contact_info; authenticated write
- **Schema:** `supabase/schema.sql`
- **Migration:** `scripts/migrate-to-supabase.mjs` (one-time, idempotent)

---

## Deployment

- **Hosting:** Vercel
- **Domain:** accendoworld.com (Cloudflare DNS → `cname.vercel-dns.com`)
- **Auto-deploy:** Push to `main` branch
- **Production URLs:** https://accendoworld.com, https://accendoworld.vercel.app
- **Env vars on Vercel:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (do NOT add service role key)

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
4. **Hero.tsx:** Deprecated component, no longer imported — can be deleted
5. **public/products/:** Legacy image files still exist locally; all images now served from Supabase Storage

---

**Last Updated:** April 2026
**Version:** 3.0.0
**Status:** Production Ready (with admin panel)
