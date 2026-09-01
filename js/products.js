/* =========================================================
   GET ME TODAY — product catalog
   -----------------------------------------------------------
   This is SAMPLE data so the store has something to show.
   Replace with real inventory:
     - id           unique slug, used in the URL (product.html?id=...)
     - title        product name
     - category     used for filters / category pills
     - price        current price in USD (number)
     - compareAt    optional "was" price (number or null)
     - icon         emoji shown on the placeholder tile
                     (swap for a real photo — see `image` below)
     - image        optional real image path. If set, it's used
                     instead of the emoji tile.
     - badge        optional small ribbon text ("NEW", "-20%"...)
     - description  shown on the product page
     - stripePriceId  <-- IMPORTANT: create a Product+Price in your
                     Stripe Dashboard for each item and paste the
                     Price ID here (looks like "price_1Nx...").
                     Checkout will not work until these are real.
========================================================= */

const PRODUCTS = [
  {
    id: "cloud-hoodie",
    title: "Cloud Purr Hoodie",
    category: "Apparel",
    price: 54,
    compareAt: 68,
    icon: "🟣",
    badge: "BESTSELLER",
    trending: true,
    description: "Oversized fleece hoodie with an embroidered mascot patch. Soft-brushed interior, kangaroo pocket, ribbed cuffs.",
    stripePriceId: "price_REPLACE_cloud_hoodie"
  },
  {
    id: "led-desk-lamp",
    title: "Orbit LED Desk Lamp",
    category: "Home",
    price: 32,
    compareAt: null,
    icon: "💡",
    badge: "NEW",
    description: "Touch-dimmable desk lamp with 3 color temperatures and a USB-C charging port built into the base.",
    stripePriceId: "price_REPLACE_led_desk_lamp"
  },
  {
    id: "wireless-earbuds",
    title: "Pulse Wireless Earbuds",
    category: "Electronics",
    price: 45,
    compareAt: 59,
    icon: "🎧",
    badge: "-24%",
    trending: true,
    description: "True wireless earbuds with active noise cancellation, 28-hour case battery, and IPX5 sweat resistance.",
    stripePriceId: "price_REPLACE_wireless_earbuds"
  },
  {
    id: "ceramic-mug-set",
    title: "Speckle Ceramic Mug Set",
    category: "Home",
    price: 26,
    compareAt: null,
    icon: "☕",
    badge: null,
    description: "Set of 2 hand-glazed ceramic mugs, 12oz each. Dishwasher and microwave safe.",
    stripePriceId: "price_REPLACE_ceramic_mug_set"
  },
  {
    id: "mini-tripod",
    title: "GripGo Mini Tripod",
    category: "Electronics",
    price: 19,
    compareAt: null,
    icon: "📱",
    badge: null,
    description: "Flexible tabletop tripod with a universal phone clamp and cold-shoe mount for a light or mic.",
    stripePriceId: "price_REPLACE_mini_tripod"
  },
  {
    id: "weighted-blanket",
    title: "Drift Weighted Blanket",
    category: "Home",
    price: 62,
    compareAt: 79,
    icon: "🛏️",
    badge: "-21%",
    trending: true,
    description: "15lb weighted blanket with a breathable cotton cover, glass-bead fill, quilted grid stitching.",
    stripePriceId: "price_REPLACE_weighted_blanket"
  },
  {
    id: "enamel-pin-pack",
    title: "Mascot Enamel Pin Pack",
    category: "Accessories",
    price: 14,
    compareAt: null,
    icon: "🎀",
    badge: "NEW",
    description: "Set of 3 hard-enamel pins featuring the Get Me Today mascot in different moods.",
    stripePriceId: "price_REPLACE_enamel_pin_pack"
  },
  {
    id: "canvas-tote",
    title: "Everyday Canvas Tote",
    category: "Accessories",
    price: 22,
    compareAt: null,
    icon: "👜",
    badge: null,
    description: "Heavyweight 12oz canvas tote with reinforced stitched handles and an interior pocket.",
    stripePriceId: "price_REPLACE_canvas_tote"
  },
  {
    id: "phone-stand",
    title: "Beam Adjustable Phone Stand",
    category: "Electronics",
    price: 16,
    compareAt: null,
    icon: "📲",
    badge: null,
    description: "Aluminum folding stand, adjustable viewing angle, fits phones and small tablets.",
    stripePriceId: "price_REPLACE_phone_stand"
  },
  {
    id: "yoga-mat",
    title: "Balance Yoga Mat",
    category: "Game Zone",
    price: 34,
    compareAt: 42,
    icon: "🧘",
    badge: "-19%",
    description: "6mm non-slip yoga mat with dual-texture surface and a carrying strap included.",
    stripePriceId: "price_REPLACE_yoga_mat"
  },
  {
    id: "candle-trio",
    title: "Hearth Candle Trio",
    category: "Home",
    price: 29,
    compareAt: null,
    icon: "🕯️",
    badge: null,
    description: "Three soy-wax candles — vanilla oak, sea salt fig, and cedar bloom. 40hr burn time each.",
    stripePriceId: "price_REPLACE_candle_trio"
  },
  {
    id: "bucket-hat",
    title: "Sunset Bucket Hat",
    category: "Apparel",
    price: 21,
    compareAt: null,
    icon: "👒",
    badge: "NEW",
    description: "Reversible cotton bucket hat with an embroidered logo tab and adjustable inner band.",
    stripePriceId: "price_REPLACE_bucket_hat"
  },
  {
    id: "phone-case",
    title: "ShockGuard Phone Case",
    category: "Electronics",
    price: 18,
    compareAt: 24,
    icon: "📱",
    badge: "-25%",
    description: "Drop-tested case with raised bezel protection and a soft-touch matte finish.",
    stripePriceId: "price_REPLACE_phone_case"
  },
  {
    id: "water-bottle",
    title: "Chill Insulated Bottle",
    category: "Game Zone",
    price: 27,
    compareAt: null,
    icon: "🍶",
    badge: null,
    description: "Double-wall stainless steel bottle, keeps drinks cold 24h / hot 12h. 24oz.",
    stripePriceId: "price_REPLACE_water_bottle"
  },
  {
    id: "wallpaper-pack",
    title: "Mascot Wallpaper Pack",
    category: "Digital",
    price: 6,
    compareAt: null,
    icon: "🖼️",
    badge: "NEW",
    description: "12 phone + desktop wallpapers featuring the Get Me Today mascot. Instant download after checkout.",
    stripePriceId: "price_REPLACE_wallpaper_pack"
  },
  {
    id: "planner-template",
    title: "Digital Planner Template",
    category: "Digital",
    price: 9,
    compareAt: 14,
    icon: "🗂️",
    badge: "-36%",
    description: "Undated digital planner (PDF, GoodNotes-ready) with daily, weekly and habit-tracker pages.",
    stripePriceId: "price_REPLACE_planner_template"
  },
  {
    id: "pet-bandana",
    title: "Cloud Pet Bandana",
    category: "Animals",
    price: 12,
    compareAt: null,
    icon: "🐾",
    badge: "NEW",
    description: "Reversible cotton bandana for cats and small dogs, snap closure, two sizes.",
    stripePriceId: "price_REPLACE_pet_bandana"
  },
  {
    id: "cat-toy-set",
    title: "Feather Wand Toy Set",
    category: "Animals",
    price: 15,
    compareAt: 19,
    icon: "🪶",
    badge: "-21%",
    trending: true,
    description: "Set of 2 interactive wand toys with replaceable feather and crinkle attachments.",
    stripePriceId: "price_REPLACE_cat_toy_set"
  }
];

// Helper: unique category list, derived from the data above
function getCategories(){
  return Array.from(new Set(PRODUCTS.map(p => p.category)));
}

function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}

// Returns the product currently marked `trending: true` — used by the
// hero's floating trend card. Change which product has that flag to
// change what shows up there; falls back to the first product if none
// is flagged.
function getTrendingProduct(){
  return PRODUCTS.find(p => p.trending) || PRODUCTS[0];
}

// All products flagged trending, in catalog order — the hero card
// rotates through these. Falls back to the first product if none are
// flagged, so the card never ends up empty.
function getTrendingProducts(){
  const flagged = PRODUCTS.filter(p => p.trending);
  return flagged.length ? flagged : [PRODUCTS[0]];
}
