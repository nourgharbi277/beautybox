/* BeautyBox Tunisie : script unique (navigation, boutique, panier, quiz) */
const WHATSAPP = "21620000000"; // remplace par ton numéro, format international sans +
const SHIP = 7, FREE_FROM = 100;
window.dataLayer = window.dataLayer || [];
const track = (event, data = {}) => window.dataLayer.push({ event, ...data });
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Images : photos Unsplash + illustration de secours ---------- */
const U = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`;
const PHOTOS = {
  serum: U("photo-1556228720-195a672e8a03"),
  cream: U("photo-1571781926291-c477ebfd024b"),
  flatlay: U("photo-1522335789203-aabd1fc54bc9"),
  makeup: U("photo-1596462502278-27bfdc403348"),
  brushes: U("photo-1512496015851-a90fb38ba796"),
  skincare: U("photo-1608248543803-ba4f8c70ae0b"),
  gift: U("photo-1620916566398-39f1143ab7be")
};
const HUES = { skincare: ["#CBD9DC", "#2E5A5E"], maquillage: ["#E7E1D5", "#7A6A5A"], cheveux: ["#D5E0D6", "#4C6B58"], accessoires: ["#DDE3E6", "#4A5F66"], box: ["#CBD9DC", "#1E2B29"] };
function art(shape, cat) {
  const [bg, fg] = HUES[cat] || HUES.skincare;
  const shapes = {
    bottle: `<rect x="82" y="40" width="36" height="24" rx="4" fill="${fg}"/><rect x="62" y="64" width="76" height="150" rx="18" fill="#fff" opacity=".85"/><rect x="74" y="110" width="52" height="64" rx="6" fill="${bg}"/>`,
    jar: `<rect x="50" y="110" width="100" height="26" rx="6" fill="${fg}"/><rect x="56" y="136" width="88" height="62" rx="16" fill="#fff" opacity=".88"/>`,
    tube: `<path d="M70 60h60l-8 140H78z" fill="#fff" opacity=".88"/><rect x="74" y="44" width="52" height="20" rx="4" fill="${fg}"/>`,
    lip: `<rect x="76" y="130" width="48" height="76" rx="6" fill="${fg}"/><rect x="82" y="70" width="36" height="62" rx="4" fill="#fff" opacity=".9"/><path d="M82 70l36-14v14z" fill="#fff" opacity=".9"/>`,
    palette: `<rect x="40" y="90" width="120" height="90" rx="14" fill="#fff" opacity=".88"/><circle cx="72" cy="122" r="14" fill="${bg}"/><circle cx="108" cy="122" r="14" fill="${fg}" opacity=".7"/><circle cx="144" cy="122" r="0"/><rect x="58" y="148" width="84" height="16" rx="6" fill="${bg}"/>`,
    brush: `<rect x="92" y="90" width="16" height="116" rx="8" fill="${fg}"/><path d="M82 90c0-34 36-34 36 0z" fill="#fff" opacity=".9"/>`,
    roller: `<rect x="96" y="120" width="8" height="84" rx="4" fill="${fg}"/><ellipse cx="100" cy="100" rx="38" ry="26" fill="#fff" opacity=".9"/>`,
    box: `<rect x="40" y="100" width="120" height="90" rx="8" fill="#fff" opacity=".9"/><rect x="34" y="82" width="132" height="26" rx="6" fill="${fg}"/><rect x="92" y="82" width="16" height="108" fill="${bg}"/>`
  };
  return `<svg viewBox="0 0 200 250" role="img" aria-hidden="true"><defs><linearGradient id="g${shape}${cat}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="#fff" stop-opacity=".6"/></linearGradient></defs><rect width="200" height="250" fill="url(#g${shape}${cat})"/><circle cx="100" cy="125" r="84" fill="#fff" opacity=".35"/>${shapes[shape] || shapes.bottle}</svg>`;
}
function pic(key, alt, shape, cat) {
  const url = PHOTOS[key];
  const fb = art(shape, cat).replace(/"/g, "&quot;");
  if (!url) return art(shape, cat);
  return `<img src="${url}" alt="${alt}" loading="lazy" onerror="this.outerHTML='${fb}'">`;
}

/* ---------- Données ---------- */
const PRODUCTS = [
  { id: "p1", name: "Gel nettoyant douceur", cat: "skincare", price: 28, key: "skincare", shape: "tube", d: "Mousse légère, sans tiraillement." },
  { id: "p2", name: "Sérum hydratant", cat: "skincare", price: 45, key: "serum", shape: "bottle", d: "Acide hyaluronique, 30 ml." },
  { id: "p3", name: "Crème apaisante", cat: "skincare", price: 39, key: "cream", shape: "jar", d: "Pour les peaux qui rougissent." },
  { id: "p4", name: "Brume tonifiante", cat: "skincare", price: 24, key: "gift", shape: "bottle", d: "Eau de rose et aloé vera." },
  { id: "p5", name: "Baume lèvres teinté", cat: "maquillage", price: 18, key: "makeup", shape: "lip", d: "Un voile de couleur, très nourrissant." },
  { id: "p6", name: "Fond de teint léger", cat: "maquillage", price: 42, key: "flatlay", shape: "bottle", d: "Effet peau nue, 8 teintes." },
  { id: "p7", name: "Palette nude", cat: "maquillage", price: 55, key: "makeup", shape: "palette", d: "Neuf nuances neutres, mates et satinées." },
  { id: "p8", name: "Huile cheveux", cat: "cheveux", price: 34, key: null, shape: "bottle", d: "Argan et ricin, pointes nourries." },
  { id: "p9", name: "Masque capillaire", cat: "cheveux", price: 38, key: null, shape: "jar", d: "Pose de 10 minutes, brillance durable." },
  { id: "p10", name: "Set de pinceaux", cat: "accessoires", price: 48, key: "brushes", shape: "brush", d: "Cinq pinceaux, poils doux." },
  { id: "p11", name: "Rouleau de jade", cat: "accessoires", price: 29, key: null, shape: "roller", d: "Massage frais pour un visage détendu." },
  { id: "p12", name: "Bandeau spa", cat: "accessoires", price: 14, key: null, shape: "box", d: "Éponge douce, tient bien en place." }
];
const BOXES = [
  { id: "b1", name: "Box Apaise", cat: "box", price: 59, key: "cream", shape: "box", who: "Pour les peaux sensibles ou fatiguées", img: "cream",
    items: [["Gel nettoyant douceur", "format voyage"], ["Brume tonifiante", "50 ml"], ["Crème apaisante", "30 ml"], ["Rouleau de jade", "taille réelle"]] },
  { id: "b2", name: "Box Éclat", cat: "box", price: 79, key: "serum", shape: "box", who: "Pour une peau terne, mixte ou en manque de lumière", img: "serum",
    items: [["Gel nettoyant douceur", "format voyage"], ["Sérum hydratant", "15 ml"], ["Baume lèvres teinté", "taille réelle"], ["Fond de teint léger", "mini"], ["Bandeau spa", "taille réelle"]] },
  { id: "b3", name: "Box Rituel complet", cat: "box", price: 99, key: "flatlay", shape: "box", who: "Peau, cheveux et maquillage : tout le rituel", img: "flatlay",
    items: [["Sérum hydratant", "15 ml"], ["Crème apaisante", "30 ml"], ["Huile cheveux", "30 ml"], ["Masque capillaire", "mini"], ["Palette nude", "mini"], ["Set de pinceaux", "2 pinceaux"]] }
];
const ALL = [...PRODUCTS, ...BOXES];
const byId = id => ALL.find(p => p.id === id);
const dt = n => `${n} DT`;

/* ---------- Rendu des cartes ---------- */
const card = p => `<article class="card">
  <div class="ph">${pic(p.key, p.name, p.shape, p.cat)}<button class="btn" data-add="${p.id}">Ajouter au panier</button></div>
  <h3>${p.name}</h3>
  <div class="meta"><span>${p.cat[0].toUpperCase() + p.cat.slice(1)}</span><b>${dt(p.price)}</b></div>
  <p>${p.d}</p></article>`;

$("#featured").innerHTML = ["p2", "p3", "p5", "p8"].map(id => card(byId(id))).join("");
$$("[data-img]").forEach(el => {
  const k = el.dataset.img;
  el.innerHTML = pic(k, "Produits de soin BeautyBox", k === "cream" ? "jar" : "bottle", "skincare");
});

/* Boutique + filtres */
const CATS = ["Tous", "skincare", "maquillage", "cheveux", "accessoires"];
$("#filters").innerHTML = CATS.map((c, i) => `<button data-cat="${c}" class="${i ? "" : "on"}">${c[0].toUpperCase() + c.slice(1)}</button>`).join("");
function renderShop(cat = "Tous") {
  $("#shopGrid").innerHTML = PRODUCTS.filter(p => cat === "Tous" || p.cat === cat).map(card).join("");
}
renderShop();
$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("#filters button").forEach(x => x.classList.toggle("on", x === b));
  renderShop(b.dataset.cat);
});

/* Box */
$("#boxList").innerHTML = BOXES.map(b => `<div class="box">
  <div class="box-img">${pic(b.img, b.name, "box", "box")}</div>
  <div><h2>${b.name}</h2><p class="for">${b.who}</p>
  <ul>${b.items.map(i => `<li>${i[0]}<span>${i[1]}</span></li>`).join("")}</ul>
  <div class="price"><b>${dt(b.price)}</b><button class="btn" data-add="${b.id}">Ajouter la box</button></div></div></div>`).join("");

/* ---------- Panier ---------- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem("bb_cart") || "{}"); } catch (e) {}
const save = () => { try { localStorage.setItem("bb_cart", JSON.stringify(cart)); } catch (e) {} };
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200); }
function renderCart() {
  const ids = Object.keys(cart).filter(id => byId(id));
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const sub = ids.reduce((s, id) => s + cart[id] * byId(id).price, 0);
  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = dt(sub);
  $("#shipNote").textContent = !count ? "" : sub >= FREE_FROM ? "Livraison offerte." : `Livraison ${dt(SHIP)}, offerte dès ${dt(FREE_FROM)} (encore ${dt(FREE_FROM - sub)}).`;
  $("#checkout").disabled = !count;
  $("#cartItems").innerHTML = count ? ids.map(id => { const p = byId(id); return `<div class="line">
    <div class="th">${pic(p.key, p.name, p.shape, p.cat)}</div>
    <div><b>${p.name}</b><div class="qty"><button data-q="${id}" data-d="-1" aria-label="Moins">−</button>${cart[id]}<button data-q="${id}" data-d="1" aria-label="Plus">+</button></div></div>
    <span>${dt(p.price * cart[id])}</span></div>`; }).join("")
    : `<p class="empty">Ton panier est vide. Commence par une box ou un soin de la boutique.</p>`;
  save();
}
function add(id) {
  cart[id] = (cart[id] || 0) + 1; renderCart();
  const p = byId(id); track("add_to_cart", { item_id: id, item_name: p.name, value: p.price, currency: "TND" });
  toast(`${p.name} ajouté au panier`);
}
function drawer(open) {
  $("#drawer").classList.toggle("on", open); $("#scrim").classList.toggle("on", open);
  $("#drawer").setAttribute("aria-hidden", !open);
  if (open) track("view_cart");
}
document.addEventListener("click", e => {
  const a = e.target.closest("[data-add]"); if (a) return add(a.dataset.add);
  const q = e.target.closest("[data-q]");
  if (q) { const id = q.dataset.q; cart[id] += +q.dataset.d; if (cart[id] <= 0) delete cart[id]; renderCart(); }
});
$("#openCart").onclick = () => drawer(true);
$("#closeCart").onclick = $("#scrim").onclick = () => drawer(false);
document.addEventListener("keydown", e => { if (e.key === "Escape") drawer(false); });
$("#checkout").onclick = () => {
  const ids = Object.keys(cart);
  const sub = ids.reduce((s, id) => s + cart[id] * byId(id).price, 0);
  const ship = sub >= FREE_FROM ? 0 : SHIP;
  track("begin_checkout", { value: sub + ship, currency: "TND" });
  const lines = ids.map(id => `- ${cart[id]} x ${byId(id).name} (${dt(byId(id).price * cart[id])})`).join("\n");
  const msg = `Bonjour BeautyBox, je souhaite commander :\n${lines}\nLivraison : ${dt(ship)}\nTotal : ${dt(sub + ship)}\nPaiement à la livraison.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
};
renderCart();

/* ---------- Quiz peau ---------- */
const QUIZ = [
  { q: "Comment est ta peau après le nettoyage ?", a: [["Elle tiraille", "seche"], ["Elle brille vite", "grasse"], ["Brillante au centre, sèche sur les joues", "mixte"], ["Elle rougit facilement", "sensible"]] },
  { q: "Qu'attends-tu de ta routine ?", a: [["Plus de confort", "seche"], ["Moins de brillance", "grasse"], ["Un teint uniforme", "mixte"], ["Du calme", "sensible"]] },
  { q: "Quelle texture préfères-tu ?", a: [["Crème riche", "seche"], ["Gel frais", "grasse"], ["Lotion légère", "mixte"], ["Lait doux", "sensible"]] }
];
const RESULTS = {
  seche: ["Peau sèche", "Elle a besoin de confort et de barrière. Mise sur l'hydratation en couches et une crème nourrissante.", ["p1", "p2", "p3"], "b1"],
  grasse: ["Peau grasse", "Pas besoin de décaper : nettoie en douceur, hydrate avec des textures gel et protège.", ["p1", "p4", "p2"], "b2"],
  mixte: ["Peau mixte", "Deux zones, deux besoins. Une routine légère et un sérum équilibrant suffisent souvent.", ["p1", "p2", "p6"], "b2"],
  sensible: ["Peau sensible", "Moins de produits, des formules douces et des gestes lents. L'apaisement avant tout.", ["p1", "p3", "p4"], "b1"]
};
let step = 0, score = [];
function renderQuiz() {
  const el = $("#quiz");
  if (step < QUIZ.length) {
    const s = QUIZ[step];
    el.innerHTML = `<div class="prog"><i style="width:${(step / QUIZ.length) * 100}%"></i></div><h3>${s.q}</h3>
      <div class="opts">${s.a.map(o => `<button data-v="${o[1]}">${o[0]}</button>`).join("")}</div>`;
    return;
  }
  const count = {}; score.forEach(v => count[v] = (count[v] || 0) + 1);
  const top = Object.keys(count).sort((a, b) => count[b] - count[a])[0];
  const r = RESULTS[top], box = byId(r[3]);
  track("generate_lead", { quiz_result: top });
  el.innerHTML = `<div class="result"><div class="prog"><i style="width:100%"></i></div><h3>${r[0]}</h3><p>${r[1]}</p>
    <p><b>Ta box idéale : ${box.name}</b> (${dt(box.price)}). <a href="#" data-add="${box.id}">Ajouter au panier</a></p>
    <div class="grid">${r[2].map(id => card(byId(id))).join("")}</div>
    <p><button class="btn ghost" id="redo">Refaire le quiz</button></p></div>`;
}
$("#quiz").addEventListener("click", e => {
  const b = e.target.closest("[data-v]");
  if (b) { score.push(b.dataset.v); step++; renderQuiz(); }
  if (e.target.id === "redo") { step = 0; score = []; renderQuiz(); }
  if (e.target.matches("a[data-add]")) e.preventDefault();
});
renderQuiz();

/* ---------- Formulaires ---------- */
$("#newsForm").addEventListener("submit", e => {
  e.preventDefault(); track("sign_up", { method: "newsletter" });
  toast("Merci, tu es inscrit(e). À dimanche !"); e.target.reset();
});
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault(); track("generate_lead", { method: "contact" });
  const msg = `Bonjour, c'est ${$("#cName").value}. ${$("#cMsg").value}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ---------- Navigation par pages ---------- */
const TITLES = { home: "Accueil", shop: "Boutique", boxes: "Les box", advice: "Conseils", contact: "Contact" };
function route() {
  let id = location.hash.slice(1); if (!TITLES[id]) id = "home";
  $$(".page").forEach(p => p.classList.toggle("active", p.id === id));
  $$("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + id));
  document.title = `${TITLES[id]} | BeautyBox Tunisie`;
  window.scrollTo(0, 0); closeMenu();
  track("page_view", { page_title: TITLES[id] });
}
function closeMenu() { $("#nav").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); }
$("#burger").onclick = () => { const o = $("#nav").classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); };
window.addEventListener("hashchange", route);
route();
