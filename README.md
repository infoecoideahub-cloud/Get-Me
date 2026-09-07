# Get Me Today — store

Static site: HTML/CSS/vanilla JS, cart via localStorage, checkout via Stripe.js (client-only, no backend).

## Before going live

1. **Stripe products** — in the Stripe Dashboard, create one Product + Price per item.
   Paste each Price ID into `js/products.js` → `stripePriceId`.
2. **Publishable key** — in `js/stripe-checkout.js`, replace `STRIPE_PUBLISHABLE_KEY`
   with your real key (`pk_live_...` for production, `pk_test_...` while testing).
3. **Product photos** — swap the emoji placeholders for real photos: add an `image`
   field (path under `assets/`) to any product in `js/products.js`.
4. **Cat hero video** — `assets/cat.mp4` drives the hero scrub interaction
   (`js/cat-scrub.js`). The current clip is a laugh loop with the eyes mostly
   closed, so it doesn't show clear left/right/up/down head turns. If you get
   a version with real directional poses, drop it in as `assets/cat.mp4` and
   recalibrate the `KEY` timestamps at the top of `js/cat-scrub.js` (scrub
   through the new video in devtools to find the right seconds for each
   direction).

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Get Me Today store"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Deploy from branch → main / (root)**.

## Notes on the checkout flow

- No backend = Stripe hosts the entire payment page (card fields never touch
  this site). Fully static, works on GitHub Pages as-is.
- After payment, buyers land on `success.html`. There's no server-side
  verification of the payment on that page — it's a friendly confirmation,
  not a secure order record. Fine for physical goods shipped manually from
  your Stripe Dashboard order list. If you add protected digital downloads
  later, put a small serverless function (Cloudflare Worker / Netlify
  Function) in front of the real download links to verify the Stripe
  session server-side first.
- Cart data lives in the browser's `localStorage`, per-device — there's no
  shared/account cart across devices.

## File map

```
index.html        home page (hero + featured)
shop.html          full catalog, filters, sort
product.html        single product page
success.html         post-payment confirmation
cancel.html          checkout cancelled
css/style.css        all styles
js/products.js       product data — EDIT THIS for real inventory
js/cart.js            cart logic + drawer rendering
js/stripe-checkout.js  Stripe redirect checkout
js/cat-scrub.js        hero video scrub interaction
assets/               logo, hero video, poster image
```
