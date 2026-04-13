# Admin panel setup — ACCENDO World

This adds a login-gated `/admin` area where an editor can upload product
photos and edit contact info. It is backed by Supabase (Auth, Postgres,
Storage).

Follow these steps **in order**.

---

## 1. Create the Supabase project

1. Go to <https://supabase.com/dashboard> and create a **new project**.
   - Name: `accendorworld` (or whatever you like)
   - Region: pick the one closest to you / your users
   - Database password: generate a strong one and **save it somewhere safe**
2. Wait ~2 minutes for the project to provision.

## 2. Grab your keys

In your new project's dashboard, go to **Project Settings → API** and copy:

| Key | Where to paste it |
|---|---|
| `Project URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` / `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key (click "Reveal") | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ The service role key bypasses all security rules. **Never** commit it,
> never expose it to the browser, never share a screenshot of it. It is only
> used once, by the migration script in step 4.

## 3. Create `.env.local`

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and paste the three values from step 2.

## 4. Run the schema

In the Supabase dashboard, open **SQL Editor → New query** and paste the
entire contents of `supabase/schema.sql`. Click **Run**.

You should see `Success. No rows returned`.

This creates:
- `profiles` table (mirrors auth.users, stores roles)
- `products` table (catalogue)
- `contact_info` table (key/value content)
- Row-level security policies (public read, authed write)
- `products` storage bucket (public read)
- A trigger that auto-creates a profile whenever a new user signs up

## 5. Run the data migration

This uploads all 112 product images in `public/products/` to Supabase
Storage, then inserts the 101 product rows + 12 contact_info rows.

```bash
node scripts/migrate-to-supabase.mjs
```

Expected output:
```
[1/3] Uploading 112 images to Supabase Storage...
  ... 20/112
  ... 40/112
  ...
  Done. Uploaded: 112, failed: 0

[2/3] Inserting 101 products...
  Done. Inserted 101 rows.

[3/3] Upserting 12 contact_info rows...
  Done.

✓ Migration complete.
```

The script is **idempotent** — safe to re-run. It deletes all existing
product rows first, then re-inserts from the source-of-truth list in the
script itself. It uses `upsert` for storage so it won't duplicate files.

## 6. Create your first editor account

In the Supabase dashboard:

1. Go to **Authentication → Users**
2. Click **Add user → Create new user**
3. Enter your email and a password
4. **Uncheck** "Auto-confirm user?" if you want an email verification link,
   or leave it checked to skip email and log in immediately
5. Click **Create user**

The profile row with role `editor` will be created automatically by the
trigger.

## 7. Run it locally

```bash
npm run dev
```

- <http://localhost:3000> — should look identical, but is now pulling all
  products and contact info from Supabase
- <http://localhost:3000/login> — sign in with the account from step 6
- <http://localhost:3000/admin> — the dashboard

Try uploading a new product under **Products → Add product**. It should
appear on the public `/collections` page within ~60 seconds (or
immediately after a hard refresh — we use ISR with a 60s revalidate).

## 8. Deploy

On Vercel (or wherever you deploy):

1. Go to **Project Settings → Environment Variables**
2. Add both public vars for Production, Preview, and Development:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Do NOT add `SUPABASE_SERVICE_ROLE_KEY` to Vercel.** The app never uses
   it at runtime — only the one-off migration script does.
4. Push to `main` and Vercel will redeploy.

---

## Adding more editors later

Same as step 6 — create a user in Supabase dashboard. Anyone with a valid
auth account can reach `/admin` (the only role is `editor`).

To revoke access: **Authentication → Users → Delete user**.

## What changed in the code

- `/lib/supabase/` — client helpers, query functions, types
- `/middleware.ts` — session refresh + `/admin` route protection
- `/app/login/` — sign-in page
- `/app/admin/` — dashboard, products CRUD, contact editor
- `/app/page.tsx`, `/app/collections/page.tsx`, `/app/contact/page.tsx`,
  `/app/about/page.tsx` — converted to server components that fetch from
  Supabase, with the interactive bits moved into `*Client.tsx` siblings
- `/components/Footer.tsx` — now an async server component fetching
  contact info
- `/scripts/migrate-to-supabase.mjs` — one-time data migration
- `/supabase/schema.sql` — database schema
