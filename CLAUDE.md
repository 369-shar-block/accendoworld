# ACCENDO World - Complete Project Documentation

## 🎯 Project Overview

**ACCENDO World** (accendoworld.com) is a modern, responsive marketing website for ACCENDO footwear brand. The site showcases a collection of comfortable, stylish slides, clogs, and platform sandals targeting young women and fashion-conscious adults.

**Brand Identity:**
- **Name:** ACCENDO
- **Tagline:** "A Step Ahead"
- **Mission:** "Comfort That Moves With You"
- **Target Audience:** Young women, teens, fashion-conscious adults seeking comfort and style

---

## 🛠 Tech Stack

### Core Technologies
- **Framework:** Next.js 16.0.10 (React 19.2.3)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.x
- **Animations:** Framer Motion 12.23.26
- **Deployment:** Vercel (Production)
- **Domain:** Cloudflare DNS → Vercel
- **Version Control:** Git + GitHub

### Dependencies
```json
{
  "next": "^16.0.10",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "framer-motion": "^12.23.26",
  "tailwindcss": "^3.x",
  "typescript": "^5.9.3"
}
```

---

## 📁 Project Structure

```
accendorworld/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + Tailwind imports
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── collections/
│   │   └── page.tsx            # Collections page (all products)
│   └── contact/
│       └── page.tsx            # Contact page with form
├── components/
│   ├── Navbar.tsx              # Fixed navigation with mobile menu
│   ├── Footer.tsx              # Footer with links and branding
│   ├── Hero.tsx                # Animated hero section
│   └── ProductCard.tsx         # Reusable product card with hover effects
├── public/
│   └── products/               # 59 product images (IMG-*.jpg)
├── inventory/                  # Original product images backup
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind with custom peach colors
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── DEPLOYMENT.md               # Deployment instructions
└── CLAUDE.md                   # This file

```

---

## 🎨 Design System

### Color Palette
```typescript
// Tailwind Custom Colors (tailwind.config.ts)
peach: {
  50: '#fef5f1',
  100: '#fce8df',
  200: '#f9d0c0',
  300: '#f5b199',
  400: '#f08866',
  500: '#e86642',  // Primary peach
  600: '#d54d2f',
  700: '#b33d24',
  800: '#933522',
  900: '#7a3020',
}
```

**Primary Colors:**
- Peach/Orange tones: #f08866, #e86642, #d54d2f
- Gray scale: #111827 (gray-900) to white
- Background gradients: from-peach-50 to-white

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, large (4xl-9xl)
- **Body:** Regular, readable (lg-xl)

### Border Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-full`
- Images: `rounded-2xl` or `rounded-3xl`

---

## 📄 Pages & Features

### 1. Homepage (`/`)
**Sections:**
- **Hero Section**
  - Animated entrance (fade + slide up)
  - Large ACCENDO logo (7xl-9xl font)
  - Tagline with decorative lines
  - Two CTA buttons (Explore Collections, Get in Touch)
  - Bouncing scroll indicator

- **Featured Collection**
  - 6 handpicked products in responsive grid
  - Staggered animation on scroll
  - Product cards with hover effects
  - "View All Collections" CTA

- **Brand Story**
  - Two-column layout (text + image grid)
  - 4 product images in 2x2 offset grid
  - Brand mission and values
  - Link to About page

- **Newsletter Signup**
  - Dark background (gray-900)
  - Email input + Subscribe button
  - Centered layout

### 2. Collections Page (`/collections`)
**Features:**
- Category filter buttons (sticky on scroll)
- 8 categories: All, Classic Slides, Designer Clogs, Platform Collection, Bold Patterns, Wild Collection, Floral Collection, Ethnic Designs
- 59 total products displayed
- Responsive grid: 1 col (mobile) → 2 (tablet) → 3 (desktop) → 4 (xl)
- Each product has image, title, category
- Animated entrance on scroll

**Product Categories Breakdown:**
- **Classic Slides:** Navy, black, white logo slides (13 products)
- **Designer Clogs:** Bow-accent clogs in various colors (17 products)
- **Platform Collection:** Chunky platform sandals (13 products)
- **Bold Patterns:** Puzzle, tech-inspired designs (5 products)
- **Wild Collection:** Leopard print slides (3 products)
- **Floral Collection:** Sunflower design slides (2 products)
- **Ethnic Designs:** Traditional pattern slides (3 products)

### 3. About Page (`/about`)
**Sections:**
- Hero with page title
- Brand story (two-column with image)
- Mission statement
- Core values grid (3 cards):
  - Premium Comfort
  - Global Reach
  - Trendsetting Design
- CTA to collections

### 4. Contact Page (`/contact`)
**Features:**
- Contact form (name, email, subject, message)
- Contact information cards:
  - Email: info@accendoworld.com
  - Global shipping available
  - 24-48 hour response time
- Form validation (required fields)
- Product image showcase

---

## 🖼 Product Inventory

**Total Products:** 59 professional product photos

**Image Format:** JPG files
**Naming Convention:** IMG-YYYYMMDD-WA####.jpg
**Storage Locations:**
- `public/products/` - Used by website
- `inventory/` - Original backup

**Image Dates:**
- October 26, 2025: 42 images (IMG-20251026-WA0002 to WA0043)
- November 3, 2025: 8 images (IMG-20251103-WA0005 to WA0012)
- November 7, 2025: 9 images (IMG-20251107-WA0001 to WA0009)

**Photography Style:**
- High-quality studio shots
- Clean backgrounds
- Lifestyle photography with models
- Multiple color/pattern backdrops
- Flat lay and environmental shots

---

## ⚡ Key Components

### Navbar.tsx
- Fixed position (z-50)
- Transparent background with backdrop blur
- Desktop: horizontal menu
- Mobile: hamburger menu with slide-down
- Links: Home, Collections, About, Contact
- Smooth transitions

### Hero.tsx
- Full-screen height section
- Background: gradient + subtle pattern overlay
- Animated text reveals (staggered delays)
- Two CTA buttons with hover scale
- Parallax scroll indicator

### ProductCard.tsx
- Aspect-square container
- Image with Next.js Image component (optimized)
- Hover effects:
  - Lifts up (-8px translate)
  - Image scales (1.1x)
  - Gradient overlay fades in
  - Text slides up from bottom
- Category badge + title on hover

### Footer.tsx
- Dark background (gray-900)
- Four-column grid (responsive to single column mobile)
- Brand info, Quick Links, Contact info
- Copyright notice
- Link hover effects

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🌐 Deployment

### Current Setup
- **Hosting:** Vercel
- **Domain:** accendoworld.com (managed by Cloudflare)
- **Git Repository:** https://github.com/369-shar-block/accendorworld
- **Production URL:** https://accendoworld.vercel.app (also https://accendoworld.com)

### Deployment Process
1. **Automatic:** Push to `main` branch triggers Vercel deployment
2. **Manual:** Run `vercel` or `vercel --prod` from CLI

### DNS Configuration (Cloudflare)
- **Type:** CNAME
- **Name:** @ (root domain)
- **Target:** cname.vercel-dns.com
- **Proxy:** DNS only (orange cloud OFF)

### Build Settings (Vercel)
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** (auto-detected)
- **Install Command:** `npm install`
- **Node Version:** 18.x or 20.x

---

## 🎭 Animation Details

### Framer Motion Patterns Used

**Page Load Animations:**
```typescript
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

**Scroll-triggered Animations:**
```typescript
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

**Hover Animations:**
```typescript
whileHover={{ y: -8, scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Staggered Children:**
- Products animate with increasing delays (index * 0.1s)
- Creates cascading entrance effect

---

## 📱 Responsive Breakpoints

Tailwind breakpoints used:
- **sm:** 640px (tablet)
- **md:** 768px (small desktop)
- **lg:** 1024px (desktop)
- **xl:** 1280px (large desktop)

**Grid Layouts:**
- Mobile: 1 column
- Tablet (sm): 2 columns
- Desktop (lg): 3 columns
- Large (xl): 4 columns (collections page)

---

## 🔧 Configuration Files

### next.config.js
```javascript
const nextConfig = {
  images: {
    unoptimized: true,  // For Vercel deployment
  },
};
```

### tailwind.config.ts
- Custom peach color palette
- Custom font (Inter)
- Extended theme with gradient utilities

### tsconfig.json
- Strict mode enabled
- Path aliases: `@/*` maps to root
- React JSX set to `react-jsx`

---

## 📊 SEO & Metadata

### Homepage Meta Tags (app/layout.tsx)
```typescript
{
  title: "ACCENDO - A Step Ahead",
  description: "Comfort That Moves With You. Discover our collection of stylish, comfortable footwear designed for your active lifestyle.",
  keywords: ["footwear", "slides", "sandals", "clogs", "comfort", "fashion", "ACCENDO"]
}
```

### Sitemap Pages
- `/` - Homepage
- `/collections` - All products
- `/about` - Brand story
- `/contact` - Contact form

---

## 🎯 Future Enhancements (Potential)

### Phase 1: E-commerce
- [ ] Add shopping cart functionality
- [ ] Product detail pages
- [ ] Checkout flow
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management

### Phase 2: Backend
- [ ] Database integration (product data)
- [ ] User authentication
- [ ] Customer accounts
- [ ] Order history
- [ ] Admin dashboard

### Phase 3: Marketing
- [ ] Blog section
- [ ] Product reviews/testimonials
- [ ] Email newsletter integration (Mailchimp/ConvertKit)
- [ ] Social media integration
- [ ] Analytics (Google Analytics 4)

### Phase 4: Advanced Features
- [ ] Multi-language support (i18n)
- [ ] Currency converter
- [ ] Size guide/fit finder
- [ ] AR try-on feature
- [ ] Wishlist functionality

---

## 🐛 Known Issues / Notes

1. **Images:** Currently using `unoptimized: true` for Next.js Image component. For better performance, consider using Vercel's image optimization.

2. **Form Handling:** Contact form currently shows alert on submit. Should integrate with email service (SendGrid, Resend, etc.)

3. **Newsletter:** Newsletter form not connected to any service. Integrate with Mailchimp, ConvertKit, or similar.

4. **Product Data:** Products are hardcoded in components. Consider moving to JSON file or database for easier management.

5. **Image Names:** Product images have WhatsApp export names. Consider renaming for better SEO and organization.

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Update dependencies monthly (`npm update`)
- [ ] Monitor Vercel deployment status
- [ ] Check analytics for user behavior
- [ ] Update product images as needed
- [ ] Review and respond to contact form submissions

### Performance Monitoring
- Check Vercel Analytics dashboard
- Monitor Core Web Vitals
- Test mobile responsiveness regularly
- Verify all images load correctly

### Content Updates
- Product images: Upload to `public/products/`
- Update product list in `app/collections/page.tsx`
- Modify branding/copy in respective pages

---

## 🔑 Key Files to Edit

**Adding New Products:**
1. Add image to `public/products/`
2. Update `allProducts` array in `app/collections/page.tsx`
3. Optionally add to `featuredProducts` in `app/page.tsx`

**Changing Brand Colors:**
1. Edit `tailwind.config.ts` color palette
2. Update gradient classes throughout components

**Updating Contact Info:**
1. Edit `components/Footer.tsx`
2. Edit `app/contact/page.tsx`

**Changing Navigation:**
1. Edit `components/Navbar.tsx`
2. Add new page in `app/[page-name]/page.tsx`

---

## 📈 Performance Metrics

**Target Scores:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

**Optimization Techniques Used:**
- Next.js static generation
- Image lazy loading
- Code splitting (automatic with Next.js)
- Tailwind CSS purging (production builds)
- Framer Motion performance mode

---

## 🎓 Learning Resources

**Technologies Used:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Deployment:**
- [Vercel Documentation](https://vercel.com/docs)
- [Cloudflare DNS](https://developers.cloudflare.com/dns/)

---

## 👥 Credits

**Built with Claude Code**
- AI-assisted development
- Full-stack implementation
- Responsive design
- Deployment setup

**Brand Assets:**
- Product photography provided by client
- ACCENDO branding and logo concept

---

## 📝 License & Copyright

© 2025 ACCENDO. All rights reserved.

**Website Code:** Proprietary
**Product Images:** © ACCENDO

---

## 🚀 Quick Start Guide

### For Developers
```bash
# Clone repository
git clone https://github.com/369-shar-block/accendorworld.git

# Navigate to directory
cd accendorworld

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### For Content Editors
1. **Update Products:** Edit `app/collections/page.tsx`
2. **Update Text:** Edit respective page files in `app/`
3. **Update Images:** Replace files in `public/products/`
4. **Deploy:** Push to GitHub, Vercel auto-deploys

---

## 📞 Contact & Support

**Website:** https://accendoworld.com
**Email:** info@accendoworld.com
**GitHub:** https://github.com/369-shar-block/accendorworld

---

**Last Updated:** December 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
