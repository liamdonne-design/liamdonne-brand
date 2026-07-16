# 🚀 Deploying to Vercel

The site is built, the production build passes, and everything is committed to git
on the `main` branch. You just need to connect your own accounts. ~10 minutes.

## What you need (both free)
- A **GitHub** account — https://github.com
- A **Vercel** account — https://vercel.com/signup (sign up *with* GitHub, easiest)

---

## Step 1 — Push the code to GitHub

1. On GitHub, click **New repository**. Name it e.g. `liamdonne-portfolio`.
   Leave it **empty** (no README/gitignore/license). Set Private or Public — your call.
2. Copy the repo URL it shows you, then run these from the project folder
   (`Desktop/Liam Brand Website`), replacing the URL with yours:

```bash
git remote add origin https://github.com/YOUR-USERNAME/liamdonne-portfolio.git
git push -u origin main
```

If git asks you to authenticate, follow the browser prompt (or use a
[Personal Access Token](https://github.com/settings/tokens) as the password).

---

## Step 2 — Import into Vercel

1. Go to https://vercel.com/new
2. **Import** the GitHub repo you just pushed (authorize Vercel to see it if asked).
3. Vercel auto-detects **Next.js** — you don't need to change any settings:
   - Framework preset: **Next.js**
   - Build command: `next build` (default)
   - Output: handled automatically
   - Environment variables: **none needed**
4. Click **Deploy**. First build takes ~1–2 min.
5. You'll get a live URL like `liamdonne-portfolio.vercel.app`. That's it — it's live.

From now on, **every `git push` auto-deploys**.

---

## Step 3 — Custom domain (liamdonne.com)

1. **Register the domain** (Namecheap, OVH, Gandi, or Vercel itself under
   *Domains*). If `.com` is taken, `liamdonne.design` is the fallback.
2. In your Vercel project → **Settings → Domains → Add** → type `liamdonne.com`.
3. Vercel shows the DNS records to set. Two options:
   - Easiest: change your domain's **nameservers** to Vercel's (they tell you which).
   - Or add the **A / CNAME** records they list at your registrar.
4. SSL (https) is issued automatically once DNS propagates (a few minutes to a few hours).

---

## Notes / optional polish
- **Video weights**: `public/work/synapse-motion-identity/cover.mp4` and
  `.../medgpt/cover.mp4` are ~12 MB each. They stream fine, but compressing them
  (e.g. to ~2–4 MB, H.264, 1080p) will make the site snappier. Export lighter from
  Premiere, or ask me for ffmpeg settings.
- **`middleware` deprecation**: Next 16 prints a warning suggesting `proxy.ts`
  instead of `middleware.ts`. It's only a warning — the build and deploy work as-is.
  Can be renamed later for cleanliness.
- **Fonts & audio** load from external hosts (Adobe Fonts kit, local `/sounds`)
  and work on any domain, including the Vercel URL and your custom domain.
