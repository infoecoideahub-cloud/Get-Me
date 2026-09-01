/* =========================================================
   GET ME TODAY — Stripe Checkout (client-only, no backend)
   -----------------------------------------------------------
   HOW THIS WORKS
   This site is static (GitHub Pages), so there is no server to
   create a Checkout Session. Instead we use Stripe.js's
   `redirectToCheckout` with an array of existing Price IDs.
   Stripe hosts the whole payment page — card fields never touch
   this site, so this is fully PCI-safe.

   SETUP — do this before checkout will work:
   1. Go to the Stripe Dashboard → Products, create one Product
      per item you sell, and copy its Price ID (price_xxx).
   2. Paste each Price ID into js/products.js on the matching
      product's `stripePriceId` field.
   3. Replace STRIPE_PUBLISHABLE_KEY below with your real
      publishable key (starts with pk_live_ or pk_test_).
      This key is public by design — it's safe to ship in
      client-side code.

   WHAT HAPPENS AFTER PAYMENT
   Stripe redirects the buyer to success.html. Since there's no
   backend, we pass the purchased item ids in the URL so
   success.html can show download / access info. This is the
   "simple, no strict protection" delivery method — good for an
   MVP, but anyone who guesses/shares that URL pattern could see
   the same generic instructions. If you later sell protected
   digital downloads, add a small serverless function (Cloudflare
   Worker / Netlify Function) that verifies the Stripe session
   server-side before releasing a real file link.
========================================================= */

const STRIPE_PUBLISHABLE_KEY = "pk_test_REPLACE_ME";

async function goToCheckout(){
  const cart = readCart();
  if (cart.length === 0){
    showToast("Your cart is empty");
    return;
  }

  // Guard: make sure every line item has a real Stripe Price ID configured.
  const missing = cart
    .map(l => getProductById(l.id))
    .filter(p => !p || !p.stripePriceId || p.stripePriceId.startsWith("price_REPLACE"));

  if (missing.length > 0){
    alert(
      "Checkout isn't configured yet.\n\n" +
      "Add real Stripe Price IDs in js/products.js for:\n" +
      missing.map(p => "• " + (p ? p.title : "unknown item")).join("\n")
    );
    return;
  }

  if (typeof Stripe === "undefined"){
    alert("Stripe.js failed to load. Check your internet connection / script tag.");
    return;
  }

  const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

  const lineItems = cart.map(l => ({
    price: getProductById(l.id).stripePriceId,
    quantity: l.qty
  }));

  const purchasedIds = cart.map(l => l.id).join(",");
  const origin = window.location.origin + window.location.pathname.replace(/[^/]+$/, "");

  const { error } = await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: `${origin}success.html?items=${encodeURIComponent(purchasedIds)}&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}cancel.html`,
    // Collects the buyer's full shipping address on Stripe's hosted page —
    // add/remove country codes as you actually ship to them.
    shippingAddressCollection: {
      allowedCountries: ["US", "CA", "GB", "AU"]
    }
    // Email is always collected by Stripe Checkout automatically.
    // Phone number collection is NOT a code setting for client-only
    // checkout — turn it on in the Stripe Dashboard instead:
    // Settings -> Checkout and Payment Links -> "Collect customer's
    // phone number". Once enabled there, it applies to every Checkout
    // session on your account, including this one.
  });

  if (error){
    alert("Checkout error: " + error.message);
  }
}
