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
│       ├── actions.ts          # Server actions (CRUD products + reels, contact, sign out)
│       ├── products/
│       │   ├── page.tsx        # Products list (server)
│       │   └── ProductsAdminClient.tsx  # Products CRUD UI (add/edit/delete)
│       ├── reels/
│       │   ├── page.tsx        # Reels list (server) + IG handle status banner
│       │   └── ReelsAdminClient.tsx     # Reels CRUD UI (video upload, edit, delete)
│       └── contact/
│           ├── page.tsx        # Contact editor (server)
│           └── ContactAdminClient.tsx   # Contact fields form
├── lib/
│   ├── instagram.ts            # normalizeHandle / instagramWebUrl / instagramAppUrl / resolveInstagramUrl
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server component Supabase client
│       ├── middleware.ts        # Session refresh for middleware
│       ├── queries.ts          # Server-side data fetching (products, reels, contact)
│       ├── types.ts            # Product, Reel, ContactInfo types + field metadata
│       └── image.ts            # productImageUrl() + reelAssetUrl() helpers
├── components/
│   ├── Navbar.tsx              # Fixed nav, cream glass on scroll, animated mobile menu
│   ├── Footer.tsx              # Async server component (fetches contact info from Supabase)
│   ├── CustomCursor.tsx        # Mix-blend-difference cursor (desktop only)
│   ├── ProductCard.tsx         # Square product card, hover effects, opens Lightbox on click
│   ├── Lightbox.tsx            # Full-res image modal (backdrop/X/arrows/Esc, scroll-lock)
│   ├── ReelsSection.tsx        # Homepage "On Instagram" rail: autoplay 9:16 video + IG deep-link
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

### Homepage (`/`) — 10 sections
1. **Hero (Cream)** — Massive "ACCENDO" text with clipPath reveal, 3 floating product images, tagline, CTA buttons, scroll indicator
2. **Red Marquee** — Scrolling white text on brand red band
3. **Category Showcase (Cream)** — Asymmetric bento grid: large Women's left, Men + Kids stacked right
4. **Horizontal Scroll (Dark)** — Pinned 300vh section, products scroll horizontally via `useScroll` + `useTransform`
5. **Brand Story (Cream)** — Split layout: serif quote left, parallax image right with red accent block
6. **Bestsellers (Dark)** — Asymmetric grid (first item 2x2), hover reveals category/title
7. **Stats Band (Red)** — Animated counters: 110+ Products, 3 Collections, 20+ Styles, ∞ Comfort
8. **Reels / On Instagram (Dark)** — Horizontal rail of autoplay 9:16 videos; only rendered when visible reels exist; tap → Instagram (app on mobile, web tab on desktop)
9. **Newsletter (Cream)** — Email signup form
10. **Footer (Black)**

### Collections (`/collections`)
- Hero with text reveal animation
- Sticky filter pills: All, Men's, Women's, Kids'
- CSS masonry layout (`columns-2 lg:columns-3 xl:columns-4`), **square** product cells
- AnimatePresence for filter transitions
- 101 total products displayed
- **Lightbox:** clicking any product image opens `components/Lightbox.tsx` — full-res image, 85% dark backdrop, X + prev/next arrows (cycles the filtered list), close via X / backdrop / Esc, background scroll locked
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

**Adding Reels:** Use `/admin/reels` in the browser (upload a vertical video; set the Instagram handle once in `/admin/contact`)

**Data flow:** Server components fetch from Supabase → pass data as props → client components render with animations. ISR revalidation is 1 hour (`revalidate = 3600` on `/`, `/collections`, `/contact`); admin `revalidatePath()` calls push editor changes through sooner.

## Admin Panel

- **URL:** `/admin` (protected — requires Supabase Auth login)
- **Login:** `/login` (email + password)
- **Role:** Single `editor` role — any authenticated user can manage content
- **Features:**
  - Dashboard with product stats
  - Products: add (with photo upload), edit, delete, toggle visibility/bestseller/new arrival
  - Reels: upload vertical video (+ optional poster), edit title/IG link/visibility, delete (`/admin/reels`)
  - Contact info: edit all public-facing text (email, shipping, socials, footer, location) + **Instagram handle** (username only — powers reels links + footer/contact IG links via `resolveInstagramUrl`)
- **Auth accounts:** Created manually in Supabase dashboard → Authentication → Users

## Supabase

- **Project:** `xtwujonvlegegzikiuki`
- **Tables:** `profiles`, `products`, `reels`, `contact_info`
- **Storage:** `products` bucket + `reels` bucket (both public read, authed write; `reels` file_size_limit 50 MB = project global limit). Reel videos upload **directly browser→Storage** (bypasses Vercel's ~4.5 MB Server Action body cap); the `createReel` action only inserts the row.
- **RLS:** Public read on products + reels + contact_info; authenticated write
- **Schema:** `supabase/schema.sql` (reels = section 6). Run SQL from this machine via the Supabase Management API + CredMan token `Supabase CLI:supabase` (see user memory `supabase-sql-runner`).
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
6. **Product image uploads** still go through the `createProduct` Server Action, so they are subject to Vercel's ~4.5 MB request-body cap. Reels already upload directly browser→Storage to avoid this; give product uploads the same treatment if large product photos ever start failing.
7. **Storage ceiling:** project-wide Supabase storage limit is 50 MB (`fileSizeLimit`), so the `reels` bucket cannot exceed it. Reel upload guard + docs are set to 50 MB. Raising it requires changing the project storage config (may depend on plan).

---

**Last Updated:** July 2026
**Version:** 3.1.0
**Status:** Production Ready (admin panel + reels + image lightbox)

### v3.1.0 changelog (July 2026 — from 3 uncle-requested updates in `requirements/`)
- **Reels (Requirement 1):** new `reels` table + `reels` storage bucket (50 MB), `/admin/reels` CRUD, homepage "On Instagram" section (`components/ReelsSection.tsx`) with autoplay-muted-loop 9:16 video and Instagram deep-linking (mobile `instagram://user?username=` app link with web fallback; desktop new secure tab). Instagram handle managed once in `/admin/contact` (`instagram_handle` key, **live value `accendo_in`**), which also fixed the previously-blank footer/contact IG links via `lib/instagram.ts` `resolveInstagramUrl`.
- **Lightbox (Requirement 2):** `components/Lightbox.tsx` on the collections page — full-res image modal with backdrop/X/arrows/Esc and background scroll-lock.
- **Square images (Requirement 3):** product cards + home New Arrivals/Bestsellers switched from `aspect-[3/4]` to `aspect-square` so native 1600×1600 photos display fully (no edge cropping, no layout shift).
- **Reel upload architecture + bug fix:** first version POSTed the video through the `createReel` Server Action and crashed on Vercel ("Application error: a client-side exception has occurred") because the platform caps Server Action bodies at ~4.5 MB. Reworked so `ReelsAdminClient` uploads the video (and optional poster) **directly from the browser** to the `reels` bucket via the authed browser client, then calls `createReel` with only text metadata + storage paths; whole flow is wrapped in try/catch with rollback + a live status label.
- **Size limit correction:** client guard, bucket `file_size_limit`, and all docs aligned to the true 50 MB project storage ceiling (was mistakenly 100 MB). ~30s length is a recommendation, not an enforced limit.
- **Commits:** `92d0412` (features), `4186493` (upload crash fix), `e646c9d` (50 MB correction). All deployed to production.
