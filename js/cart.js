/* =========================================================
   GET ME TODAY — cart
   Stored in localStorage as: [{ id, qty }, ...]
========================================================= */

const CART_KEY = "gmt_cart_v1";

function readCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

function writeCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
  renderCartDrawer();
}

function addToCart(id, qty = 1){
  const cart = readCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty += qty;
  else cart.push({ id, qty });
  writeCart(cart);
  showToast("Added to cart");
  openCart();
}

function updateQty(id, qty){
  let cart = readCart();
  if (qty <= 0){
    cart = cart.filter(l => l.id !== id);
  }else{
    const line = cart.find(l => l.id === id);
    if (line) line.qty = qty;
  }
  writeCart(cart);
}

function removeFromCart(id){
  const cart = readCart().filter(l => l.id !== id);
  writeCart(cart);
}

function cartCount(){
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal(){
  return readCart().reduce((sum, l) => {
    const p = getProductById(l.id);
    return p ? sum + p.price * l.qty : sum;
  }, 0);
}

function money(n){
  return "$" + n.toFixed(2);
}

function renderCartBadge(){
  const el = document.getElementById("cartCount");
  if (!el) return;
  const count = cartCount();
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
}

function renderCartDrawer(){
  const list = document.getElementById("cartItems");
  const foot = document.getElementById("cartFoot");
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (!list) return;

  const cart = readCart();

  if (cart.length === 0){
    list.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Go find something good 👀</div>`;
    if (checkoutBtn){ checkoutBtn.disabled = true; checkoutBtn.classList.add("btn-disabled"); }
    const subEl = document.getElementById("cartSubtotal");
    if (subEl) subEl.textContent = money(0);
    return;
  }

  if (checkoutBtn){ checkoutBtn.disabled = false; checkoutBtn.classList.remove("btn-disabled"); }

  list.innerHTML = cart.map(line => {
    const p = getProductById(line.id);
    if (!p) return "";
    const media = p.image
      ? `<img src="${p.image}" alt="${p.title}">`
      : `<div style="width:72px;height:72px;border-radius:12px;border:2px solid var(--ink);background:var(--grad-soft);display:flex;align-items:center;justify-content:center;font-size:28px;">${p.icon}</div>`;
    return `
      <div class="cart-line" data-id="${p.id}">
        ${media}
        <div class="cart-line-info">
          <div class="cart-line-title">${p.title}</div>
          <div class="cart-line-price">${money(p.price)}</div>
          <div class="cart-line-qty">
            <button class="qty-btn" onclick="updateQty('${p.id}', ${line.qty - 1})">−</button>
            <span>${line.qty}</span>
            <button class="qty-btn" onclick="updateQty('${p.id}', ${line.qty + 1})">+</button>
          </div>
          <a class="cart-line-remove" onclick="removeFromCart('${p.id}')">Remove</a>
        </div>
      </div>
    `;
  }).join("");

  const subEl = document.getElementById("cartSubtotal");
  if (subEl) subEl.textContent = money(cartSubtotal());
}

/* ---------- drawer open/close ---------- */
function openCart(){
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}
function closeCart(){
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

/* ---------- toast ---------- */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartBadge();
  renderCartDrawer();
});
