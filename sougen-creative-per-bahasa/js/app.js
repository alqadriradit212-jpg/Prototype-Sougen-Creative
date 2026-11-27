// =========================================================================
// KONFIGURASI BACKEND PHP + MYSQL REST API (Auto-detect ./api/ atau root)
// =========================================================================
let API_BASE = './php/index.php?route=';
const LOCAL_DB_KEY = 'sougen_mysql_fallback_v2';
const TOKEN_KEY = 'sougen_auth_token_v1';

const DEFAULT_EVENTS = [
  {
    id: 1,
    slug: 'sakura-night-market',
    title: 'Sakura Night Market',
    status: 'upcoming',
    isPaid: false,
    price: 0,
    priceLabel: 'Gratis',
    badgeText: 'GRATIS',
    date: 'Min, 6 Des 2026',
    dayNum: '06',
    monthYear: 'DES\n2026',
    shortDate: '06. 12. 2026',
    time: '15.00–22.00 WIB',
    location: 'Lapangan Sabuga, Bandung',
    city: 'Bandung',
    posterNum: '02',
    kanji: 'さくら',
    posterTitle: 'SAKURA\nNIGHT',
    posterBg: '#BAE6FD',
    quota: 'PENDAFTARAN DIBUKA',
    themeGrad: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)',
    desc: 'Pasar malam bertema sakura dengan lampu gantung, stan jajanan Jepang, dan area foto. Masuk gratis, tetapi pengunjung tetap mengambil e-ticket agar antrean check-in lebih cepat.'
  },
  {
    id: 2,
    slug: 'matsuri-sougen-vol-4',
    title: 'Matsuri Sougen Vol. 4 · 1st Anniversary',
    status: 'upcoming',
    isPaid: true,
    price: 35000,
    priceLabel: 'Rp 35.000',
    badgeText: 'BERBAYAR · Rp 35.000',
    date: 'Min, 15 Nov 2026',
    dayNum: '15',
    monthYear: 'NOV\n2026',
    shortDate: '15. 11. 2026',
    time: '10.00–21.30 WITA',
    location: 'Phinisi Point Mall, Makassar',
    city: 'Makassar',
    posterNum: '01',
    kanji: '祭り',
    posterTitle: 'MATSURI\nSOUGEN',
    posterBg: '#93C5FD',
    quota: '375 / 500 Tiket Presale',
    themeGrad: 'linear-gradient(135deg, #93C5FD 0%, #38BDF8 100%)',
    desc: 'Festival ulang tahun pertama Sougen Creative dengan panggung musik Jepang, dekorasi lentera matsuri, dan 45+ booth tenant kuliner serta merchandise.'
  },
  {
    id: 3,
    slug: 'sougen-anisong-night-2026',
    title: 'Sougen Year-End Anisong Party',
    status: 'upcoming',
    isPaid: true,
    price: 45000,
    priceLabel: 'Rp 45.000',
    badgeText: 'BERBAYAR · Rp 45.000',
    date: 'Min, 20 Des 2026',
    dayNum: '20',
    monthYear: 'DES\n2026',
    shortDate: '20. 12. 2026',
    time: '16.00–22.30 WITA',
    location: 'UpperHills Convention Hall',
    city: 'Makassar',
    posterNum: '03',
    kanji: '音楽',
    posterTitle: 'ANISONG\nPARTY',
    posterBg: '#A5F3FC',
    quota: '210 / 400 Tiket Presale',
    themeGrad: 'linear-gradient(135deg, #A5F3FC 0%, #38BDF8 100%)',
    desc: 'Konser penutup tahun bersama band komunitas Jepang, DJ Anisong, dan bazar kuliner malam.'
  },
  {
    id: 4,
    slug: 'matsuri-sougen-vol-3',
    title: 'Matsuri Sougen Vol. 3 · Summer Fest',
    status: 'past',
    isPaid: true,
    price: 30000,
    priceLabel: 'Rp 30.000 (Selesai)',
    badgeText: 'SUDAH LEWAT · BERBAYAR',
    date: '16 Agustus 2026',
    dayNum: '16',
    monthYear: 'AGU\n2026',
    shortDate: '16. 08. 2026',
    time: '10.00–21.00 WITA',
    location: 'Trans Studio Mall (1.250 Pengunjung)',
    city: 'Makassar',
    posterNum: '00',
    kanji: '夏祭',
    posterTitle: 'SUMMER\nFEST',
    posterBg: '#BFDBFE',
    quota: 'Selesai Terlaksana',
    themeGrad: 'linear-gradient(135deg, #E2E8F0 0%, #BAE6FD 100%)',
    desc: 'Event sudah lewat (Berbayar): Festival musim panas yang dihadiri 1.250+ pengunjung dan 38 booth UMKM.'
  },
  {
    id: 5,
    slug: 'sougen-ramadhan-fest-2026',
    title: 'Sougen Ramadhan Charity Matsuri',
    status: 'past',
    isPaid: false,
    price: 0,
    priceLabel: 'Gratis (Selesai)',
    badgeText: 'SUDAH LEWAT · GRATIS',
    date: '15 Maret 2026',
    dayNum: '15',
    monthYear: 'MAR\n2026',
    shortDate: '15. 03. 2026',
    time: '15.30–21.00 WITA',
    location: 'Public Space Courtyard (640 Pengunjung)',
    city: 'Makassar',
    posterNum: '00',
    kanji: '春祭',
    posterTitle: 'CHARITY\nMATSURI',
    posterBg: '#E0F2FE',
    quota: 'Selesai Terlaksana',
    themeGrad: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
    desc: 'Event sudah lewat (Tidak Berbayar / Gratis): Buka puasa bersama komunitas dan bazar amal kreatif.'
  }
];

const DEFAULT_SLOTS = [
  { code: 'A-01', area: 'Zona Kuliner', available: true },
  { code: 'A-02', area: 'Zona Kuliner', available: false },
  { code: 'A-03', area: 'Zona Kuliner', available: true },
  { code: 'A-04', area: 'Zona Kuliner', available: true },
  { code: 'B-01', area: 'Hall Merch', available: true },
  { code: 'B-02', area: 'Hall Merch', available: true },
  { code: 'B-03', area: 'Hall Merch', available: false },
  { code: 'B-04', area: 'Hall Merch', available: true },
  { code: 'VIP-1', area: 'Depan Stage', available: true },
  { code: 'VIP-2', area: 'Depan Stage', available: true }
];

const DEFAULT_TICKETS = [
  {
    id: 1, code: 'SG-2026-8841', ownerEmail: 'user@gmail.com', eventTitle: 'Matsuri Sougen Vol. 4 · 1st Anniversary', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Pengunjung Sougen', contact: '081234567890',
    category: 'Tiket Presale', type: 'Tiket Presale (x1)', boothSlot: null, amount: 35000,
    method: 'QRIS', status: 'LUNAS · QRIS', time: '04 Nov 2026 · 19:20 WITA', checkedIn: false, checkInTime: null
  },
  {
    id: 2, code: 'TNT-2026-502', ownerEmail: 'takoyaki.tenant@gmail.com', eventTitle: 'Matsuri Sougen Vol. 4 · Booth Tenant', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Takoyaki Matsuri Makassar', contact: '081355667788',
    category: 'Sewa Tenant', type: 'Stand Kuliner F&B (Rp 350.000) [Slot A-02]', boothSlot: 'A-02', amount: 350000,
    method: 'Transfer VA', status: 'LUNAS · Transfer VA', time: '04 Nov 2026 · 18:45 WITA', checkedIn: true, checkInTime: '18:55 WITA'
  },
  {
    id: 3, code: 'SG-2026-7719', ownerEmail: 'alya.nabila@gmail.com', eventTitle: 'Matsuri Sougen Vol. 4 · 1st Anniversary', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Alya Nabila', contact: '082199887766',
    category: 'Tiket Presale', type: 'Tiket Presale (x2)', boothSlot: null, amount: 70000,
    method: 'E-wallet', status: 'LUNAS · E-wallet', time: '04 Nov 2026 · 17:10 WITA', checkedIn: false, checkInTime: null
  },
  {
    id: 4, code: 'FREE-2026-309', ownerEmail: 'rizky.pratama@gmail.com', eventTitle: 'Sakura Night Market', date: 'Min, 6 Des 2026',
    location: 'Lapangan Sabuga, Bandung', holder: 'Rizky Pratama', contact: '085244332211',
    category: 'Tiket Gratis', type: 'Free Entry Pass (x1)', boothSlot: null, amount: 0,
    method: 'Gratis (Rp 0)', status: 'FREE PASS · GRATIS', time: '04 Nov 2026 · 16:05 WITA', checkedIn: false, checkInTime: null
  }
];

const DEFAULT_GALLERY = [
  { id: 1, cat: 'event',  title: 'Matsuri Sougen Vol. 3 · Summer Fest', meta: 'Trans Studio Mall · 16 Agustus 2026', glyph: '祭', tone: '' },
  { id: 2, cat: 'event',  title: 'Sougen Ramadhan Charity Matsuri', meta: 'Public Space Courtyard · 15 Maret 2026', glyph: '桜', tone: 'v2' },
  { id: 3, cat: 'event',  title: 'Panggung Band & DJ Anisong', meta: 'Dokumentasi pertunjukan musik', glyph: '音', tone: 'v3' },
  { id: 4, cat: 'event',  title: 'Kompetisi Cosplay', meta: 'Dokumentasi lomba komunitas', glyph: '衣', tone: 'v2' },
  { id: 5, cat: 'tenant', title: 'Stand Kuliner Jepang', meta: 'Tenant UMKM kuliner', glyph: '食', tone: 'v3' },
  { id: 6, cat: 'tenant', title: 'Booth Merchandise & Ilustrator', meta: 'Tenant komunitas kreatif', glyph: '絵', tone: '' }
];

const DEFAULT_PARTNERS = [
  { name: 'Komunitas Cosplay', type: 'Komunitas', ini: 'KC' },
  { name: 'Anisong Community', type: 'Komunitas', ini: 'AC' },
  { name: 'UMKM Kuliner', type: 'Tenant', ini: 'UK' },
  { name: 'Studio Ilustrator', type: 'Tenant', ini: 'SI' },
  { name: 'Sponsor Utama', type: 'Sponsor', ini: 'SU' },
  { name: 'Media Partner', type: 'Media', ini: 'MP' },
  { name: 'Kampus Mitra', type: 'Pendidikan', ini: 'KM' },
  { name: 'Hobby Store', type: 'Sponsor', ini: 'HS' }
];

const BOOTH_PACKAGES = [
  {
    id: 'pkg-kuliner',
    name: 'Stand Kuliner F&B (Ukuran Besar 3x3m)',
    shortName: 'Stand Kuliner F&B (Rp 350.000)',
    price: 350000,
    size: '3m x 3m (Area Food Court Utama)',
    remaining: 'Sisa 6 Slot',
    badge: 'PALING LARIS · F&B',
    features: [
      'Tenda Sarnafil / Partisi 3x3 Meter + Meja Lebar & 2 Kursi',
      'Instalasi Listrik hingga 4 Ampere (Aman untuk kompor listrik/chiller)',
      '3 ID Card Akses Panitia Tenant + QR E-Ticket Gate Khusus',
      'Promosi Brand UMKM di Instagram @sougen.creative'
    ]
  },
  {
    id: 'pkg-merch',
    name: 'Booth Merchandise, Komunitas & Ilustrator (2x2m)',
    shortName: 'Merchandise & Hobi (Rp 250.000)',
    price: 250000,
    size: '2m x 2m (Hall Dalam Mall)',
    remaining: 'Sisa 9 Slot',
    badge: 'FAVORIT KREATOR',
    features: [
      'Meja Display 2x2 Meter + Taplak Hitam & 2 Kursi Lipat',
      'Instalasi Listrik 2 Ampere + Lampu Penerangan Booth',
      '2 ID Card Akses Tenant + Bukti Sewa Digital Resmi',
      'Lokasi strategis di jalur utama pengunjung cosplay & panggung'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Booth Island / Sponsor Corner (4x3m)',
    shortName: 'Booth Island Premium (Rp 500.000)',
    price: 500000,
    size: '4m x 3m (Depan Panggung Utama)',
    remaining: 'Sisa 2 Slot',
    badge: 'POSISI VIP DEPAN STAGE',
    features: [
      'Area Terbuka 2 Sisi (4x3 Meter) tepat di depan Main Stage',
      'Listrik 6 Ampere + 4 ID Card Akses VIP Tenant',
      'Ad-libs MC di panggung & penempatan logo pada denah acara',
      'Prioritas loading barang H-1 sebelum acara dimulai'
    ]
  }
];

const VA_BANKS = [
  { id: 'BCA', label: 'BCA Virtual Account', prefix: '3901' },
  { id: 'BRI', label: 'BRI BRIVA', prefix: '8881' },
  { id: 'Mandiri', label: 'Mandiri Virtual Account', prefix: '8950' },
  { id: 'BNI', label: 'BNI Virtual Account', prefix: '8808' }
];

const EWALLET_PROVIDERS = ['GoPay', 'OVO', 'DANA', 'ShopeePay'];

const DEMO_ADMIN = { email: 'admin@sougen.com', password: 'admin123' };
const DEMO_USER = { email: 'user@gmail.com', password: 'user123' };

const state = {
  apiConnected: false,
  authToken: localStorage.getItem(TOKEN_KEY) || '',
  currentRoute: window.location.hash || '#/',
  isLoggedIn: false,
  userId: null,
  userEmail: '',
  userName: '',
  userPhone: '',
  userRole: 'visitor',
  adminSubTab: 'scanner',
  ticketSubTab: 'qr', // 'qr' | 'history'
  adminSearch: '',
  filter: 'all',
  galleryFilter: 'semua',
  payMethod: 'QRIS',
  vaBank: 'BCA',
  ewalletProvider: 'GoPay',
  pendingOrder: null,
  scanResult: null,
  superSelectOpen: false,
  authMode: 'login',
  selectedBoothPkg: BOOTH_PACKAGES[0].shortName,
  selectedBoothSlot: 'A-01',
  ticketQty: 1,
  openAcc: { terms: false, checkin: false },
  events: JSON.parse(JSON.stringify(DEFAULT_EVENTS)),
  boothSlots: JSON.parse(JSON.stringify(DEFAULT_SLOTS)),
  tickets: JSON.parse(JSON.stringify(DEFAULT_TICKETS)),
  galleryItems: JSON.parse(JSON.stringify(DEFAULT_GALLERY)),
  partners: JSON.parse(JSON.stringify(DEFAULT_PARTNERS)),
  registeredUsers: [
    { name: 'Pengunjung Sougen', email: 'user@gmail.com', phone: '081234567890', password: 'user123', role: 'visitor' }
  ]
};

function escapeHTML(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// =========================================================================
// GENERATOR QR CODE UNIK PER TIKET / USER (High-Contrast #000000 on #FFFFFF)
// =========================================================================
function renderUniqueQR(seedText) {
  const str = String(seedText || 'SOUGEN-QR');
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const size = 21;
  const isFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
  let cells = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFinder(r, c)) continue;
      if ((r === 7 && c < 8) || (c === 7 && r < 8) || (r === 7 && c >= size - 8) || (c === size - 8 && r < 8) || (r === size - 8 && c < 8) || (c === 7 && r >= size - 8)) continue;
      h ^= (r * 37 + c * 91 + 13);
      h = Math.imul(h, 16777619);
      if ((h >>> 0) % 2 === 0) {
        cells += `<rect x="${4 + c * 4}" y="${4 + r * 4}" width="4" height="4" fill="#000000"/>`;
      }
    }
  }
  const finder = (x, y) => `
    <rect x="${x}" y="${y}" width="28" height="28" fill="#000000"/>
    <rect x="${x + 4}" y="${y + 4}" width="20" height="20" fill="#FFFFFF"/>
    <rect x="${x + 8}" y="${y + 8}" width="12" height="12" fill="#000000"/>
  `;
  return `
    <svg viewBox="0 0 92 92" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR Code ${escapeHTML(str)}">
      <rect width="92" height="92" fill="#FFFFFF"/>
      ${finder(4, 4)}
      ${finder(60, 4)}
      ${finder(4, 60)}
      ${cells}
    </svg>
  `;
}

// Ambil hanya tiket & riwayat milik user yang sedang login (tidak tercampur dengan user lain)
function getMyTickets() {
  if (!state.isLoggedIn) return [];
  const email = (state.userEmail || '').trim().toLowerCase();
  return state.tickets.filter(t => {
    const tOwner = (t.ownerEmail || '').trim().toLowerCase();
    if (state.userId && t.userId && Number(t.userId) === Number(state.userId)) return true;
    if (email && tOwner && tOwner === email) return true;
    return false;
  });
}

function saveLocalFallback() {
  try {
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify({
      events: state.events,
      boothSlots: state.boothSlots,
      tickets: state.tickets,
      galleryItems: state.galleryItems,
      registeredUsers: state.registeredUsers
    }));
  } catch (e) {}
}

function loadLocalFallback() {
  try {
    const raw = localStorage.getItem(LOCAL_DB_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (Array.isArray(d.events)) state.events = d.events;
    if (Array.isArray(d.boothSlots)) state.boothSlots = d.boothSlots;
    if (Array.isArray(d.tickets)) state.tickets = d.tickets;
    if (Array.isArray(d.galleryItems)) state.galleryItems = d.galleryItems;
    if (Array.isArray(d.registeredUsers)) state.registeredUsers = d.registeredUsers;
  } catch (e) {}
}

async function apiRequest(route, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.authToken) headers['Authorization'] = 'Bearer ' + state.authToken;
  const opts = { method, headers };
  if (body !== null) opts.body = JSON.stringify(body);
  const res = await fetch(API_BASE + encodeURIComponent(route), opts);
  const data = await res.json().catch(() => ({ ok: false, error: 'Respons API bukan JSON valid.' }));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || ('HTTP ' + res.status));
  }
  return data;
}

async function bootstrapFromServer() {
  const candidates = ['./php/index.php?route=', './api/index.php?route=', './index.php?route='];
  let loaded = false;
  for (const base of candidates) {
    try {
      API_BASE = base;
      const data = await apiRequest('bootstrap', 'GET');
      state.apiConnected = true;
      if (Array.isArray(data.events)) state.events = data.events;
      if (Array.isArray(data.boothSlots)) state.boothSlots = data.boothSlots;
      if (Array.isArray(data.gallery)) state.galleryItems = data.gallery;
      if (Array.isArray(data.partners) && data.partners.length) state.partners = data.partners;
      if (Array.isArray(data.tickets)) state.tickets = data.tickets;
      if (data.user) {
        state.isLoggedIn = true;
        state.userId = data.user.id || null;
        state.userEmail = data.user.email;
        state.userName = data.user.name;
        state.userPhone = data.user.phone || '';
        state.userRole = data.user.role;
      }
      const firstAvail = state.boothSlots.find(s => s.available);
      if (firstAvail && !state.boothSlots.find(s => s.code === state.selectedBoothSlot && s.available)) {
        state.selectedBoothSlot = firstAvail.code;
      }
      loaded = true;
      break;
    } catch (err) {
      // Coba kandidat berikutnya
    }
  }
  if (!loaded) {
    state.apiConnected = false;
    loadLocalFallback();
  }
  router();
}

// =========================================================================
// SEO DYNAMIC UPDATER (Title, Meta Description, Open Graph, Schema.org JSON-LD)
// =========================================================================
function updateSEO(route, evObj) {
  let title = 'Sougen Creative · Event Jepang di Indonesia';
  let desc = 'Katalog event Sougen Creative, tiket presale, sewa booth tenant UMKM, dan e-ticket QR otomatis dalam satu alur.';
  if (route.startsWith('#/event/') && evObj) {
    title = `${evObj.title} · Tiket & Info | Sougen Creative`;
    desc = `${evObj.title} (${evObj.date} di ${evObj.location}). ${evObj.desc}`;
  } else if (route.startsWith('#/pembayaran')) {
    title = 'Metode Pembayaran · Payment Gateway Sougen Creative';
    desc = 'Pilih metode pembayaran QRIS, Transfer Virtual Account, atau E-Wallet untuk menerbitkan E-Ticket QR otomatis.';
  } else if (route.startsWith('#/tenant')) {
    title = 'Sewa Booth Tenant UMKM · Sougen Creative Management';
    desc = 'Daftar sewa booth kuliner, merchandise, dan VIP Island di event Sougen Creative lengkap dengan denah slot dan Payment Gateway.';
  } else if (route.startsWith('#/gallery')) {
    title = 'Gallery & Portofolio Event · Sougen Creative Management';
    desc = 'Dokumentasi event Matsuri, tenant UMKM, komunitas cosplay, dan sponsor Sougen Creative Management.';
  } else if (route.startsWith('#/tentang')) {
    title = 'Tentang Kami · Sougen Creative Management';
    desc = 'Profil resmi Sougen Creative Management, Event Organizer festival budaya Jepang dan bazar ekonomi kreatif UMKM.';
  } else if (route.startsWith('#/tiket')) {
    title = 'E-Ticket & Riwayat Pembayaran Saya · Sougen Creative';
  } else if (route.startsWith('#/admin')) {
    title = 'Dashboard Admin EO · Sougen Creative Management';
  }
  document.title = title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', desc);
  const ogt = document.querySelector('meta[property="og:title"]');
  if (ogt) ogt.setAttribute('content', title);
  const ogd = document.querySelector('meta[property="og:description"]');
  if (ogd) ogd.setAttribute('content', desc);

  const ldEl = document.getElementById('seo-jsonld');
  if (ldEl) {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          'name': 'Sougen Creative Management',
          'url': 'https://sougencreative.com/',
          'sameAs': ['https://instagram.com/sougen.creative'],
          'description': 'Event Organizer festival budaya Jepang, bazar UMKM, dan E-Ticketing terpadu.'
        },
        ...state.events.filter(e => e.status === 'upcoming').map(e => ({
          '@type': 'Event',
          'name': e.title,
          'description': e.desc,
          'location': { '@type': 'Place', 'name': e.location, 'address': e.city || 'Indonesia' },
          'offers': {
            '@type': 'Offer',
            'price': e.isPaid ? e.price : 0,
            'priceCurrency': 'IDR',
            'availability': 'https://schema.org/InStock'
          }
        }))
      ]
    };
    ldEl.textContent = JSON.stringify(schema);
  }
}

function navigateTo(hash) {
  state.currentRoute = hash || '#/';
  state.superSelectOpen = false;
  renderSuperSelectPopover();
  try {
    if (window.location.hash !== state.currentRoute) {
      window.history.replaceState(null, '', state.currentRoute);
    }
  } catch (err) {}
  router();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function renderHeaderAndDock() {
  const navEl = document.getElementById('main-head-nav');
  const authEl = document.getElementById('head-auth-area');
  const footerEl = document.getElementById('public-footer');
  const stripEl = document.getElementById('top-preview-strip');
  const subEl = document.getElementById('brand-subtitle');
  const brandLink = document.getElementById('brand-home-link');
  const isAdmin = state.isLoggedIn && state.userRole === 'admin';

  document.body.classList.toggle('admin-mode', isAdmin);
  const payCol = document.getElementById('foot-pay');
  if (payCol) payCol.style.display = state.isLoggedIn ? '' : 'none';

  if (isAdmin) {
    if (subEl) subEl.textContent = 'Creative management';
    if (brandLink) brandLink.setAttribute('href', '#/admin');
    if (footerEl) footerEl.style.display = 'block';
    if (stripEl) stripEl.style.display = 'none';

    if (navEl) {
      navEl.innerHTML = `
        <button type="button" class="nav-btn ${state.adminSubTab === 'scanner' ? 'active' : ''}" onclick="setAdminSubTab('scanner')">Scan QR Gate</button>
        <button type="button" class="nav-btn ${state.adminSubTab === 'events' ? 'active' : ''}" onclick="setAdminSubTab('events')">Kelola Event</button>
        <button type="button" class="nav-btn ${state.adminSubTab === 'transactions' ? 'active' : ''}" onclick="setAdminSubTab('transactions')">Rekap Tiket</button>
        <button type="button" class="nav-btn ${state.adminSubTab === 'tenants' ? 'active' : ''}" onclick="setAdminSubTab('tenants')">Data Tenant</button>
        <button type="button" class="nav-btn ${state.adminSubTab === 'gallery' ? 'active' : ''}" onclick="setAdminSubTab('gallery')">Gallery</button>
      `;
    }

    if (authEl) {
      authEl.innerHTML = `
        <span class="badge ${state.apiConnected ? 'badge-free' : 'badge-past'}" title="Status koneksi backend PHP + MySQL">
          ${state.apiConnected ? '● MySQL Terhubung' : '○ Mode Lokal'}
        </span>
        <button type="button" class="btn btn-gold btn-sm" onclick="exportAdminCSV()">Ekspor CSV</button>
        <button type="button" class="role-chip" onclick="logoutUser()" title="Keluar dari Panel Admin">Admin - Out</button>
      `;
    }
    return;
  }

  if (subEl) subEl.textContent = 'Creative Management';
  if (brandLink) brandLink.setAttribute('href', '#/');
  if (footerEl) footerEl.style.display = 'block';
  if (stripEl) {
    stripEl.style.display = 'block';
    stripEl.textContent = state.apiConnected
      ? 'Terhubung ke Backend PHP + MySQL · Data event, tiket, dan booth tersimpan real-time di database'
      : 'Pratinjau lokal · jalankan lewat XAMPP / Laragon / Hosting PHP+MySQL untuk sinkronisasi database';
  }

  if (navEl) {
    navEl.innerHTML = `
      <a href="#/" data-nav="beranda">Beranda</a>
      <a href="#/tentang" data-nav="tentang">Tentang</a>
      <a href="#/gallery" data-nav="gallery">Gallery</a>
      <a href="#/" data-scroll="sponsor">Sponsor</a>
      ${state.isLoggedIn ? '<a href="#/tiket" data-nav="tiket">E-Ticket Saya</a>' : ''}
    `;
  }

  const firstPaid = state.events.find(e => e.status === 'upcoming' && e.isPaid) || state.events[0];
  if (authEl) {
    authEl.innerHTML = `
      ${state.isLoggedIn && firstPaid ? `<a class="btn btn-gold btn-sm" href="#/event/${escapeHTML(firstPaid.slug)}">Beli tiket</a>` : ''}
      <button type="button" class="super-select-icon-btn ${state.superSelectOpen ? 'open' : ''}" onclick="toggleSuperSelect(event)" aria-label="Buka Menu Pilihan" title="Menu Pilihan">
        <span class="icon-bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span class="underline-bar"></span>
        </span>
      </button>
      ${!state.isLoggedIn ? `
        <button type="button" class="btn btn-ghost btn-sm" onclick="openAuthModal('login')">Masuk</button>
      ` : `
        <button type="button" class="role-chip" onclick="logoutUser()" title="Keluar dari Akun">${escapeHTML(state.userName)} · Keluar</button>
      `}
    `;
  }

  renderSuperSelectPopover();
}

window.toggleSuperSelect = function(e) {
  if (e) e.stopPropagation();
  state.superSelectOpen = !state.superSelectOpen;
  renderHeaderAndDock();
};

window.selectSuperOption = function(route) {
  state.superSelectOpen = false;
  renderSuperSelectPopover();
  navigateTo(route);
};

function renderSuperSelectPopover() {
  const root = document.getElementById('super-select-root');
  if (!root) return;
  const firstPaid = state.events.find(e => e.status === 'upcoming' && e.isPaid) || state.events[0];
  const superItems = [['Gallery', '#/gallery'], ['Tentang', '#/tentang']]
    .concat(state.isLoggedIn && firstPaid ? [['Beli tiket', '#/event/' + firstPaid.slug]] : [])
    .concat(state.isLoggedIn ? [['Sewa booth', '#/tenant'], ['E-Ticket & Riwayat', '#/tiket']] : []);
  root.innerHTML = `
    <div class="super-select-panel ${state.superSelectOpen ? 'show' : ''}" onclick="event.stopPropagation()">
      <div class="super-select-grid">
        ${superItems.map((it, i) => `<button type="button" class="super-item" onclick="selectSuperOption('${it[1]}')"><span class="super-item-idx">${String(i + 1).padStart(2, '0')}</span><span>${it[0]}</span></button>`).join('')}
      </div>
    </div>
  `;
}

function renderHomeCard(ev) {
  const badgeClass = ev.isPaid ? 'badge-paid' : 'badge-free';
  return `
    <article class="event-card">
      <div class="event-thumb" style="background:${ev.themeGrad};">
        <div class="badge-row">
          <span class="badge ${badgeClass}">${escapeHTML(ev.badgeText)}</span>
          <span class="badge badge-date">${escapeHTML(ev.date)}</span>
        </div>
        <div style="position:absolute;bottom:10px;left:12px;right:12px;font-size:0.74rem;color:#0C4A6E;font-weight:700;"><span>📍 ${escapeHTML(ev.location)}</span></div>
      </div>
      <div class="event-body">
        <div>
          <h3 class="event-title">${escapeHTML(ev.title)}</h3>
          <p class="event-desc">${escapeHTML(ev.desc)}</p>
        </div>
        ${ev.isPaid && state.isLoggedIn ? `<a class="btn btn-gold btn-sm" style="width:100%;margin-top:10px;" href="#/event/${escapeHTML(ev.slug)}">Beli Tiket Sekarang</a>` : ''}
      </div>
    </article>
  `;
}

function renderHome() {
  const upcoming = state.events.filter(e => e.status === 'upcoming' && (state.isLoggedIn ? e.isPaid : !e.isPaid));
  const firstPaid = state.events.find(e => e.status === 'upcoming' && e.isPaid) || state.events[0];

  return `
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">✦ Sougen Creative Management</span>
          <h1>Festival Budaya Jepang &amp; <span class="accent">E-Ticket Terpadu</span></h1>
          <p class="hero-lead">
            Katalog event mendatang (berbayar &amp; gratis), sewa booth UMKM, serta e-ticket QR otomatis dalam satu halaman ringkas.
          </p>
          <div class="hero-actions">
            ${state.isLoggedIn && firstPaid ? `<a class="btn btn-gold" href="#/event/${escapeHTML(firstPaid.slug)}">Beli / Ambil Tiket →</a>` : '<button type="button" class="btn btn-gold" onclick="openAuthModal(\'login\')">Beli / Ambil Tiket →</button>'}
            <a class="btn btn-ghost" href="#/" data-scroll="jadwal">Semua Katalog &amp; Arsip</a>
          </div>
          ${state.isLoggedIn ? `
          <div class="hero-stats">
            <div class="stat-box"><strong>12+ Event</strong><span>Telah Terlaksana</span></div>
            <div class="stat-box"><strong>15.000+</strong><span>Total Pengunjung</span></div>
            <div class="stat-box"><strong>QRIS &amp; VA</strong><span>E-Ticket Instan</span></div>
          </div>
          ` : ''}
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <div>
          <h2 id="jadwal" class="section-title">${state.isLoggedIn ? 'Jadwal Event Berbayar Terdekat' : 'Jadwal Event Terdekat'}</h2>
          <p class="section-sub">${state.isLoggedIn ? 'Pilih event berbayar' : 'Pilih event gratis'}, atau lihat arsip event yang sudah lewat di menu Katalog.</p>
        </div>
      </div>
      <div class="cards-grid">
        ${upcoming.length ? upcoming.map(renderHomeCard).join('') : '<p style="color:var(--muted);">Belum ada event pada kategori ini.</p>'}
      </div>
    </section>

    ${state.isLoggedIn ? '' : homeGallerySection()}

    <section id="tentang" class="section wrap">
      <div class="panel" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;padding:16px 20px;">
        <div style="max-width:560px;">
          <strong style="font-family:var(--font-serif);font-size:1.1rem;display:block;margin-bottom:2px;">Tentang &amp; Sponsorship Sougen Creative</strong>
          <p style="color:var(--muted);font-size:0.82rem;">
            EO festival Jepang &amp; bazar UMKM (rata-rata 1.200+ pengunjung/acara). Hubungi kami untuk kerja sama sponsor atau informasi acara.
          </p>
        </div>
        <div id="sponsor" style="display:flex;flex-wrap:wrap;gap:8px;">
          <a class="btn btn-tosca btn-sm" href="https://wa.me/6281234567890?text=Halo%20Admin%20Sougen%20Creative" target="_blank" rel="noopener">WhatsApp Admin</a>
          <a class="btn btn-ghost btn-sm" href="https://instagram.com/sougen.creative" target="_blank" rel="noopener">@sougen.creative</a>
        </div>
      </div>
    </section>
    ${state.isLoggedIn ? homeGallerySection() : ''}
  `;
}

function renderEventCheckout(slug) {
  const ev = state.events.find(e => e.slug === slug) || state.events[0];
  const totalNominal = (ev.price || 0) * state.ticketQty;

  return `
    <section class="section wrap" style="padding-top:28px;">
      <div style="margin-bottom:24px;">
        <a href="#/" style="font-size:0.9rem;color:var(--muted);font-weight:600;display:inline-flex;align-items:center;gap:8px;">
          <span>←</span> Kembali ke Beranda
        </a>
      </div>

      <div class="video-detail-grid">
        <div>
          <div class="video-poster-card" style="background:${ev.posterBg || '#BAE6FD'};">
            <div>
              <div class="video-poster-top">
                <div>
                  <div style="font-size:0.74rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.85;">SOUGEN CREATIVE</div>
                  <div class="video-poster-date">
                    <span class="day">${escapeHTML(ev.dayNum || '15')}</span>
                    <span class="month-year">${escapeHTML(ev.monthYear || 'NOV\n2026').replace(/\n/g, '<br>')}</span>
                  </div>
                  <div style="font-size:0.76rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;line-height:1.45;">
                    ${escapeHTML(ev.city || 'MAKASSAR')}<br>${escapeHTML(ev.location)}
                  </div>
                </div>
                <div class="video-poster-kanji">${escapeHTML(ev.kanji || '祭り')}</div>
              </div>
            </div>
            <div class="video-poster-bottom">
              <div class="video-poster-title">${escapeHTML(ev.posterTitle || ev.title).replace(/\n/g, '<br>')}</div>
              <div class="video-poster-num">${escapeHTML(ev.posterNum || '01')}</div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.78rem;color:var(--muted);margin-top:10px;padding:0 4px;">
            <span>Poster acara</span>
            <span style="font-family:monospace;">${escapeHTML(ev.shortDate || ev.date)}</span>
          </div>
        </div>

        <div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
            <span class="badge ${ev.isPaid ? 'badge-paid' : 'badge-free'}" style="font-size:0.72rem;padding:5px 12px;">
              ${ev.isPaid ? 'BERBAYAR' : 'GRATIS'}
            </span>
            <span class="badge badge-date" style="font-size:0.72rem;padding:5px 12px;">PENDAFTARAN DIBUKA</span>
          </div>

          <h1 style="font-family:var(--font-serif);font-size:clamp(1.75rem, 3.2vw, 2.35rem);line-height:1.15;color:var(--text);margin-bottom:10px;">
            ${escapeHTML(ev.title)}
          </h1>
          <p style="color:var(--muted);font-size:0.9rem;line-height:1.55;margin-bottom:6px;">
            ${escapeHTML(ev.desc)}
          </p>

          <div class="video-meta-grid">
            <div class="video-meta-item"><span>TANGGAL</span><strong>${escapeHTML(ev.date)}</strong></div>
            <div class="video-meta-item"><span>WAKTU</span><strong>${escapeHTML(ev.time || '10.00–21.00 WITA')}</strong></div>
            <div class="video-meta-item"><span>LOKASI</span><strong>${escapeHTML(ev.location)}</strong></div>
            <div class="video-meta-item"><span>KOTA</span><strong>${escapeHTML(ev.city || 'Makassar')}</strong></div>
          </div>

          <div style="margin-top:8px;">
            <div style="font-size:0.72rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">PILIH TIPE TIKET</div>
            <div class="ticket-tier-box">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="tier-radio"></span>
                <div>
                  <strong style="display:block;font-size:0.94rem;color:var(--text);">${ev.isPaid ? 'Tiket presale reguler' : 'Tiket masuk'}</strong>
                  <span style="font-size:0.8rem;color:var(--muted);">
                    ${ev.isPaid ? 'Akses masuk festival + QR E-Ticket instan' : 'Gratis, tetap perlu e-ticket untuk check-in'}
                  </span>
                </div>
              </div>
              <strong style="font-size:1rem;color:var(--gold);white-space:nowrap;">
                ${ev.isPaid ? formatRupiah(ev.price) : 'Gratis'}
              </strong>
            </div>

            <div class="qty-action-row">
              <div class="qty-stepper" aria-label="Jumlah tiket">
                <button type="button" onclick="changeTicketQty(-1)" aria-label="Kurangi jumlah">−</button>
                <span>${state.ticketQty}</span>
                <button type="button" onclick="changeTicketQty(1)" aria-label="Tambah jumlah">+</button>
              </div>
              <button type="button" class="btn btn-gold" style="height:42px;padding:0 22px;border-radius:9px;font-size:0.88rem;" onclick="openQuickTicketCheckout('${escapeHTML(ev.slug)}')">
                ${ev.isPaid ? `Beli tiket (${formatRupiah(totalNominal)})` : 'Ambil tiket gratis'}
              </button>
            </div>
            <p style="font-size:0.76rem;color:var(--muted);margin-bottom:12px;">Maksimal 4 tiket per transaksi. E-ticket terbit setelah pembayaran.</p>
          </div>

          <div class="video-accordion">
            <div class="video-acc-item">
              <button type="button" class="video-acc-trigger" onclick="toggleVideoAcc('terms')">
                <span>Ketentuan tiket</span><span class="plus">${state.openAcc.terms ? '−' : '+'}</span>
              </button>
              ${state.openAcc.terms ? `
                <div class="video-acc-body">
                  1. Satu E-Ticket ber-QR Code unik berlaku untuk satu kali scan di pintu masuk (Anti-Duplicate Check-in).<br>
                  2. Tiket &amp; riwayat pembayaran tersimpan terpisah khusus untuk akun Anda sendiri.
                </div>` : ''}
            </div>
            <div class="video-acc-item">
              <button type="button" class="video-acc-trigger" onclick="toggleVideoAcc('checkin')">
                <span>Check-in dan lokasi</span><span class="plus">${state.openAcc.checkin ? '−' : '+'}</span>
              </button>
              ${state.openAcc.checkin ? `
                <div class="video-acc-body">
                  Lokasi: <strong>${escapeHTML(ev.location)}</strong> (${escapeHTML(ev.city || 'Indonesia')}).<br>
                  Siapkan kode QR pada ponsel Anda saat tiba di gate agar proses pemindaian panitia selesai kurang dari 10 detik.
                </div>` : ''}
            </div>
          </div>

          <div class="video-booth-callout">
            <div>
              <h3>Mau buka booth di acara ini?</h3>
              <p>Booth UMKM, merchandise, dan kuliner dibuka lewat halaman tenant.</p>
            </div>
            <a class="video-booth-btn" href="#/tenant">Sewa booth</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// =========================================================================
// HALAMAN METODE PEMBAYARAN (TUJUAN LANGSUNG DARI "LAKUKAN SIMULASI PEMBAYARAN")
// =========================================================================
function renderPaymentPage() {
  const order = state.pendingOrder;
  if (!order) {
    return `
      <section class="section wrap" style="padding-top:28px;">
        <div class="panel" style="max-width:520px;margin:0 auto;text-align:center;padding:28px;">
          <h1 style="font-family:var(--font-serif);font-size:1.5rem;margin-bottom:8px;">Belum Ada Tagihan Aktif</h1>
          <p style="color:var(--muted);font-size:0.86rem;margin-bottom:18px;">
            Silakan pilih tiket acara atau paket sewa booth terlebih dahulu untuk melanjutkan ke metode pembayaran.
          </p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            <a class="btn btn-gold btn-sm" href="#/">Lihat Event</a>
            <a class="btn btn-tosca btn-sm" href="#/tenant">Sewa Booth</a>
          </div>
        </div>
      </section>
    `;
  }

  const activeBank = VA_BANKS.find(b => b.id === state.vaBank) || VA_BANKS[0];
  const cleanPhone = (order.contact || '081234567890').replace(/\D/g, '') || '081234567890';
  const vaNumber = activeBank.prefix + cleanPhone.slice(-10).padStart(10, '0');
  const isQRIS = state.payMethod === 'QRIS';
  const isVA = state.payMethod === 'Transfer VA';
  const isEW = state.payMethod === 'E-wallet';

  return `
    <section class="section wrap" style="padding-top:24px;">
      <div style="margin-bottom:18px;">
        <a href="#/" style="font-size:0.88rem;color:var(--muted);font-weight:700;display:inline-flex;align-items:center;gap:8px;">
          <span>←</span> Batalkan &amp; Kembali
        </a>
      </div>

      <div class="checkout-grid">
        <!-- Kolom Kiri: Pilih Metode Pembayaran & Instruksi -->
        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <span class="us-pill">PAYMENT GATEWAY · PILIH METODE</span>
            <span style="font-family:monospace;font-size:0.78rem;color:var(--muted);">${escapeHTML(order.invoiceId)}</span>
          </div>
          <h1 style="font-family:var(--font-serif);font-size:1.55rem;color:var(--text);margin-bottom:4px;">Metode Pembayaran</h1>
          <p style="font-size:0.84rem;color:var(--muted);margin-bottom:16px;">
            Pilih salah satu metode pembayaran di bawah ini, lalu tekan tombol konfirmasi untuk menerbitkan E-Ticket QR khusus akun Anda.
          </p>

          <div class="form-label" style="margin-bottom:8px;">1. PILIH KANAL PEMBAYARAN</div>
          <div class="pay-methods" style="margin-bottom:16px;">
            <button type="button" class="pay-option ${isQRIS ? 'active' : ''}" onclick="selectPayMethod('QRIS')">QRIS (Instan)</button>
            <button type="button" class="pay-option ${isVA ? 'active' : ''}" onclick="selectPayMethod('Transfer VA')">Transfer VA</button>
            <button type="button" class="pay-option ${isEW ? 'active' : ''}" onclick="selectPayMethod('E-wallet')">E-Wallet</button>
          </div>

          ${isQRIS ? `
            <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:12px;padding:18px;text-align:center;">
              <div style="font-size:0.78rem;font-weight:800;color:#0369A1;letter-spacing:0.06em;margin-bottom:10px;">QRIS · SOUGEN CREATIVE MANAGEMENT</div>
              <div style="background:#FFFFFF;padding:12px;border-radius:12px;width:168px;height:168px;margin:0 auto 10px;border:1px solid var(--line);">
                ${renderUniqueQR('QRIS|' + order.invoiceId + '|' + order.amount)}
              </div>
              <div style="font-size:0.82rem;color:var(--text);font-weight:700;">Scan kode QRIS di atas melalui GoPay, OVO, DANA, ShopeePay, atau Mobile Banking</div>
              <div style="font-size:0.75rem;color:var(--muted);margin-top:4px;">Verifikasi otomatis · Tanpa perlu kirim bukti transfer ke WhatsApp</div>
            </div>
          ` : isVA ? `
            <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:12px;padding:16px;">
              <div class="form-label" style="margin-bottom:8px;">2. PILIH BANK VIRTUAL ACCOUNT</div>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px;">
                ${VA_BANKS.map(b => `
                  <button type="button" class="pay-option ${state.vaBank === b.id ? 'active' : ''}" onclick="selectVaBank('${b.id}')">${b.label}</button>
                `).join('')}
              </div>
              <div style="background:#FFFFFF;border:1px solid var(--line-strong);border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
                <div>
                  <div style="font-size:0.72rem;color:var(--muted);font-weight:700;">NOMOR VIRTUAL ACCOUNT (${escapeHTML(activeBank.id)})</div>
                  <div style="font-family:monospace;font-size:1.18rem;font-weight:800;color:#0284C7;letter-spacing:0.06em;">${escapeHTML(vaNumber)}</div>
                </div>
                <button type="button" class="btn btn-tosca btn-sm" onclick="copyTextToClipboard('${escapeHTML(vaNumber)}', 'Nomor VA disalin!')">Salin VA</button>
              </div>
              <p style="font-size:0.76rem;color:var(--muted);margin-top:8px;">Transfer sesuai total tagihan ke nomor Virtual Account di atas (penerima: Sougen Creative Management).</p>
            </div>
          ` : `
            <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:12px;padding:16px;">
              <div class="form-label" style="margin-bottom:8px;">2. PILIH APLIKASI E-WALLET</div>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px;">
                ${EWALLET_PROVIDERS.map(ew => `
                  <button type="button" class="pay-option ${state.ewalletProvider === ew ? 'active' : ''}" onclick="selectEwalletProvider('${ew}')">${ew}</button>
                `).join('')}
              </div>
              <div style="background:#FFFFFF;border:1px solid var(--line-strong);border-radius:10px;padding:12px 14px;">
                <div style="font-size:0.72rem;color:var(--muted);font-weight:700;">AKUN ${escapeHTML(state.ewalletProvider.toUpperCase())} TERHUBUNG</div>
                <div style="font-family:monospace;font-size:1.05rem;font-weight:800;color:#0C4A6E;margin-top:2px;">${escapeHTML(order.contact)}</div>
                <div style="font-size:0.75rem;color:var(--muted);margin-top:4px;">Notifikasi konfirmasi akan dikirim ke aplikasi ${escapeHTML(state.ewalletProvider)} Anda.</div>
              </div>
            </div>
          `}
        </div>

        <!-- Kolom Kanan: Ringkasan Tagihan & Tombol Konfirmasi Bayar -->
        <div class="panel">
          <h2 style="font-family:var(--font-serif);font-size:1.25rem;color:var(--text);margin-bottom:12px;">Ringkasan Tagihan</h2>
          <div style="display:grid;gap:10px;font-size:0.85rem;margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);">
              <span style="color:var(--muted);">Akun Pemesan</span>
              <strong>${escapeHTML(state.userName)} (${escapeHTML(state.userEmail)})</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);">
              <span style="color:var(--muted);">Nama Pemegang / Brand</span>
              <strong>${escapeHTML(order.holder)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);">
              <span style="color:var(--muted);">Acara / Layanan</span>
              <strong style="text-align:right;">${escapeHTML(order.eventTitle)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);">
              <span style="color:var(--muted);">Rincian</span>
              <strong style="text-align:right;">${escapeHTML(order.type)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);">
              <span style="color:var(--muted);">Metode Dipilih</span>
              <strong style="color:#0284C7;">${escapeHTML(isVA ? `Transfer VA (${state.vaBank})` : (isEW ? `E-Wallet (${state.ewalletProvider})` : 'QRIS'))}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:4px;">
              <span style="font-weight:700;color:var(--text);">Total Pembayaran</span>
              <strong style="font-family:var(--font-serif);font-size:1.35rem;color:#0284C7;">${formatRupiah(order.amount)}</strong>
            </div>
          </div>

          <div style="display:grid;gap:8px;">
            <button type="button" class="btn btn-gold" style="width:100%;height:46px;font-size:0.94rem;" onclick="completeSimulatedPayment()">
              ✓ Konfirmasi &amp; Bayar Sekarang (${formatRupiah(order.amount)})
            </button>
            <button type="button" class="btn btn-ghost btn-sm" style="width:100%;" onclick="cancelPendingOrder()">
              Batalkan Transaksi
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTenant() {
  const activePkg = BOOTH_PACKAGES.find(p => p.shortName === state.selectedBoothPkg) || BOOTH_PACKAGES[0];
  return `
    <section class="section wrap" style="padding-top:20px;">
      <div style="margin-bottom:18px;">
        <a href="#/" style="font-size:0.88rem;color:var(--muted);font-weight:700;display:inline-flex;align-items:center;gap:8px;">
          <span>←</span> Kembali ke Beranda
        </a>
      </div>

      <div class="video-detail-grid">
        <div>
          <div class="panel" style="padding:22px;">
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <span class="badge badge-paid">REGISTRASI TENANT DIBUKA</span>
              <span class="badge badge-date">OTOMATIS VIA PAYMENT GATEWAY</span>
            </div>
            <h1 style="font-family:var(--font-serif);font-size:clamp(1.55rem, 2.6vw, 2.05rem);color:var(--text);margin-bottom:8px;line-height:1.2;">
              Sewa Booth UMKM, Merchandise &amp; Kuliner
            </h1>
            <p style="color:var(--muted);font-size:0.88rem;margin-bottom:16px;">
              Pilih paket ukuran stand di sebelah kanan dan klik nomor ketersediaan slot booth di bawah ini. Slot terpilih otomatis terkunci di database MySQL setelah pembayaran.
            </p>

            <div style="font-size:0.74rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#0369A1;margin-bottom:8px;">
              PILIH NOMOR SLOT BOOTH (TERPILIH: ${escapeHTML(state.selectedBoothSlot)})
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;margin-bottom:18px;">
              ${state.boothSlots.map(s => {
                const isSel = state.selectedBoothSlot === s.code;
                const borderCol = isSel ? '#0284C7' : (s.available ? 'rgba(2,132,199,0.35)' : 'rgba(225,29,72,0.3)');
                const bgCol = isSel ? '#0284C7' : (s.available ? '#F0F9FF' : '#FFE4E6');
                const txtCol = isSel ? '#FFFFFF' : (s.available ? '#0C4A6E' : '#BE123C');
                return `
                <button type="button"
                  style="padding:10px 8px;border-radius:10px;border:1.5px solid ${borderCol};background:${bgCol};color:${txtCol};font-weight:800;cursor:${s.available ? 'pointer' : 'not-allowed'};opacity:${s.available ? '1' : '0.6'};transition:all 0.15s ease;"
                  ${!s.available ? 'disabled' : ''} onclick="selectBoothSlot('${escapeHTML(s.code)}')">
                  <div style="font-size:0.92rem;">${escapeHTML(s.code)}</div>
                  <div style="font-size:0.68rem;opacity:0.9;">${s.available ? escapeHTML(s.area) : 'TERISI'}</div>
                </button>`;
              }).join('')}
            </div>

            <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:12px;padding:16px;font-size:0.85rem;display:grid;gap:7px;">
              <strong style="color:#0369A1;font-size:0.92rem;">Fasilitas Termasuk:</strong>
              ${activePkg.features.map(f => `<div style="color:#0C4A6E;font-weight:600;">✓ ${escapeHTML(f)}</div>`).join('')}
            </div>
          </div>
        </div>

        <div>
          <div style="font-size:0.75rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#0369A1;margin-bottom:10px;">
            PILIH TIPE BOOTH TENANT
          </div>

          ${BOOTH_PACKAGES.map(pkg => {
            const isSelected = pkg.shortName === activePkg.shortName;
            return `
              <div class="ticket-tier-box ${isSelected ? '' : 'unselected'}" onclick="selectBoothPkgCard('${escapeHTML(pkg.shortName)}')">
                <div style="display:flex;align-items:center;gap:14px;">
                  <span class="tier-radio"></span>
                  <div>
                    <strong style="display:block;font-size:0.96rem;color:#0C4A6E;font-weight:800;margin-bottom:2px;">${escapeHTML(pkg.name)}</strong>
                    <span style="font-size:0.8rem;color:#334155;font-weight:600;">${escapeHTML(pkg.size)} · <span style="color:#0284C7;font-weight:700;">${escapeHTML(pkg.remaining)}</span></span>
                  </div>
                </div>
                <strong style="font-size:1.02rem;color:#0284C7;font-weight:800;white-space:nowrap;">${formatRupiah(pkg.price)}</strong>
              </div>`;
          }).join('')}

          <div class="panel" style="margin-top:16px;" data-form-handler="submitTenantOrder">
            <h2 style="font-family:var(--font-serif);font-size:1.25rem;color:var(--text);margin-bottom:12px;">Data Pendaftaran Tenant (Slot ${escapeHTML(state.selectedBoothSlot)})</h2>
            <div class="form-group">
              <label class="form-label" for="tenant-name">Nama Brand / UMKM</label>
              <input class="form-input" id="tenant-name" required value="${escapeHTML(state.userName || 'Takoyaki Matsuri Makassar')}" placeholder="Contoh: Takoyaki Senpai">
            </div>
            <div class="form-group">
              <label class="form-label" for="tenant-contact">Nomor WhatsApp Aktif</label>
              <input class="form-input" id="tenant-contact" required value="${escapeHTML(state.userPhone || '081355667788')}" placeholder="0813...">
            </div>
            <input type="hidden" id="tenant-pkg" value="${escapeHTML(activePkg.shortName)}">
            <button type="button" onclick="submitTenantOrder({ preventDefault() {} })" class="btn btn-gold" style="width:100%;height:48px;border-radius:10px;font-size:0.95rem;">
              Lanjut ke Pembayaran Sewa Booth (${formatRupiah(activePkg.price)})
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// =========================================================================
// HALAMAN E-TICKET & RIWAYAT PEMBAYARAN (TERPISAH PER USER & TAB TERPISAH)
// =========================================================================
function renderTickets() {
  const myTickets = getMyTickets();
  const activeTab = state.ticketSubTab || 'qr';

  return `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">04 · AKUN: ${escapeHTML(state.userName)} (${escapeHTML(state.userEmail)})</span>
          <h1 class="section-title">E-Ticket &amp; Riwayat Saya</h1>
          <p class="section-sub">Setiap akun memiliki QR E-Ticket dan riwayat pembayaran masing-masing secara terpisah.</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${myTickets.length && activeTab === 'qr' ? '<button type="button" class="btn btn-tosca btn-sm" onclick="window.print()">🖨️ Unduh / Cetak PDF</button>' : ''}
        </div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
        <button type="button" class="btn ${activeTab === 'qr' ? 'btn-gold' : 'btn-ghost'} btn-sm" onclick="setTicketSubTab('qr')">
          🎟️ E-Ticket &amp; QR Saya (${myTickets.length})
        </button>
        <button type="button" class="btn ${activeTab === 'history' ? 'btn-gold' : 'btn-ghost'} btn-sm" onclick="setTicketSubTab('history')">
          🧾 Riwayat Pembayaran Saya (${myTickets.length})
        </button>
      </div>

      ${myTickets.length === 0 ? `
        <div class="panel" style="text-align:center;padding:32px 20px;">
          <h2 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:6px;">Belum Ada E-Ticket atau Riwayat Pembayaran</h2>
          <p style="font-size:0.86rem;color:var(--muted);margin-bottom:16px;">
            Akun <strong>${escapeHTML(state.userEmail)}</strong> belum melakukan pembelian tiket maupun sewa booth.
          </p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            <a class="btn btn-gold btn-sm" href="#/">Lihat Jadwal Event</a>
            <a class="btn btn-tosca btn-sm" href="#/tenant">Sewa Booth UMKM</a>
          </div>
        </div>
      ` : activeTab === 'qr' ? `
        ${myTickets.map((t) => `
          <article class="ticket-card">
            <div class="ticket-main">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                <span class="badge ${t.amount > 0 ? 'badge-paid' : 'badge-free'}">${escapeHTML(t.status)}</span>
                <span style="font-family:monospace;color:var(--gold);font-weight:700;">#${escapeHTML(t.code)}</span>
              </div>
              <h2 style="font-family:var(--font-serif);font-size:1.45rem;margin-bottom:12px;">${escapeHTML(t.eventTitle)}</h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;font-size:0.85rem;">
                <div><span style="color:var(--muted);display:block;">Nama Pemegang</span><strong>${escapeHTML(t.holder)}</strong></div>
                <div><span style="color:var(--muted);display:block;">Kategori</span><strong style="color:var(--tosca);">${escapeHTML(t.type)}</strong></div>
                <div><span style="color:var(--muted);display:block;">Status Gate</span><strong style="color:${t.checkedIn ? '#15803D' : 'var(--gold)'};">${t.checkedIn ? `SUDAH CHECK-IN ✓ (${escapeHTML(t.checkInTime || 'Valid')})` : 'SIAP DIPINDAI DI GATE'}</strong></div>
              </div>
              <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:0.78rem;color:var(--muted);">
                📍 Lokasi: ${escapeHTML(t.location)} · ${escapeHTML(t.date)}
              </div>
            </div>
            <div class="ticket-stub">
              <div style="background:#FFFFFF;padding:8px;border-radius:12px;width:126px;height:126px;margin-bottom:8px;border:1px solid var(--line);">
                ${renderUniqueQR(t.code + '|' + (t.ownerEmail || state.userEmail))}
              </div>
              <span style="font-family:monospace;font-size:0.76rem;font-weight:700;color:var(--text);">${escapeHTML(t.code)}</span>
              <span style="font-size:0.68rem;color:var(--muted);margin-top:2px;">QR Unik Akun Anda</span>
            </div>
          </article>
        `).join('')}
      ` : `
        <div class="panel" style="padding:18px;">
          <div style="margin-bottom:12px;">
            <h2 style="font-family:var(--font-serif);font-size:1.25rem;">Riwayat Pembayaran (${escapeHTML(state.userName)})</h2>
            <p style="font-size:0.8rem;color:var(--muted);">Daftar transaksi yang terverifikasi khusus untuk akun <strong>${escapeHTML(state.userEmail)}</strong>.</p>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Kode Transaksi</th>
                  <th>Waktu</th>
                  <th>Acara / Booth</th>
                  <th>Metode</th>
                  <th>Nominal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${myTickets.map(t => `
                  <tr>
                    <td style="font-family:monospace;font-weight:700;color:var(--gold);">#${escapeHTML(t.code)}</td>
                    <td>${escapeHTML(t.time)}</td>
                    <td><strong>${escapeHTML(t.eventTitle)}</strong><div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(t.type)}</div></td>
                    <td>${escapeHTML(t.method)}</td>
                    <td><strong>${formatRupiah(t.amount)}</strong></td>
                    <td><span class="badge ${t.amount > 0 ? 'badge-paid' : 'badge-free'}">${escapeHTML(t.status)}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `}
    </section>
  `;
}

// =========================================================================
// DASHBOARD ADMIN (CRUD LENGKAP TERHUBUNG PHP + MYSQL)
// =========================================================================
function renderAdminDashboard() {
  if (!state.isLoggedIn || state.userRole !== 'admin') {
    return `
      <section class="section wrap">
        <div class="admin-card" style="max-width:440px;margin:40px auto;padding:32px;text-align:center;">
          <h1 style="font-family:var(--font-serif);font-size:1.5rem;margin-bottom:8px;">Akses Khusus Admin Sougen</h1>
          <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px;">
            Silakan masuk menggunakan akun Admin Sougen untuk membuka pemindai QR &amp; manajemen CRUD database.
          </p>
          <button type="button" class="btn btn-gold" style="width:100%;" onclick="openAuthModal('login')">Masuk</button>
        </div>
      </section>
    `;
  }

  const totalRevenue = state.tickets.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const visitorTickets = state.tickets.filter(t => t.category !== 'Sewa Tenant');
  const tenantBookings = state.tickets.filter(t => t.category === 'Sewa Tenant');
  const checkedInCount = state.tickets.filter(t => t.checkedIn).length;
  const res = state.scanResult;
  const q = (state.adminSearch || '').trim().toLowerCase();

  let tabBody = '';

  if (state.adminSubTab === 'scanner') {
    tabBody = `
      <div class="checkout-grid">
        <div class="admin-card">
          <span class="us-pill" style="margin-bottom:8px;">MODUL PANITIA · GATE CHECK-IN</span>
          <h2 style="font-family:var(--font-serif);font-size:1.4rem;margin-bottom:6px;">Scan QR E-Ticket</h2>
          <p style="font-size:0.82rem;color:var(--muted);margin-bottom:16px;">
            Masukkan atau pindai kode QR tiket pengunjung/tenant untuk validasi pintu masuk. Sistem otomatis menolak tiket duplikat.
          </p>
          <div class="scan-box">
            <div style="font-size:2rem;margin-bottom:8px;">📷</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;" data-form-handler="handleManualScan">
              <input class="form-input" id="scan-code-input" style="flex:1;font-family:monospace;font-weight:700;font-size:1rem;background:#FFFFFF;text-align:center;" placeholder="Ketik Kode QR (misal: SG-2026-8841)" value="${escapeHTML(state.tickets[0]?.code || 'SG-2026-8841')}" required>
              <button type="button" onclick="handleManualScan({ preventDefault() {} })" class="btn btn-gold" style="width:100%;">Validasi &amp; Check-In Sekarang</button>
            </div>
          </div>
          ${res ? `
            <div style="margin-top:16px;padding:16px;border-radius:12px;border:2px solid ${res.type === 'success' ? '#15803D' : 'var(--crimson)'};background:${res.type === 'success' ? '#DCFCE7' : '#FFE4E6'};">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span class="badge ${res.type === 'success' ? 'badge-free' : 'badge-paid'}" style="${res.type !== 'success' ? 'background:var(--crimson);color:#fff;' : ''}">${escapeHTML(res.badge)}</span>
                <span style="font-size:0.74rem;color:var(--muted);">Respon &lt; 1 dtk</span>
              </div>
              <h3 style="font-family:var(--font-serif);font-size:1.15rem;color:var(--text);margin-bottom:4px;">${escapeHTML(res.title)}</h3>
              <p style="font-size:0.84rem;color:var(--text);">${escapeHTML(res.message)}</p>
            </div>` : ''}
        </div>

        <div class="admin-card">
          <h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:4px;">Daftar Antrean Gate (${checkedInCount}/${state.tickets.length} Hadir)</h3>
          <p style="font-size:0.78rem;color:var(--muted);margin-bottom:12px;">Klik tombol di samping nama untuk simulasi scan langsung.</p>
          <div style="display:grid;gap:10px;">
            ${state.tickets.map(t => `
              <div style="padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:#F0F9FF;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
                <div>
                  <div style="font-family:monospace;font-weight:800;color:var(--gold);font-size:0.86rem;">#${escapeHTML(t.code)} · ${escapeHTML(t.holder)}</div>
                  <div style="font-size:0.76rem;color:var(--muted);">
                    ${escapeHTML(t.type)} —
                    <strong style="color:${t.checkedIn ? '#15803D' : 'var(--text)'};">
                      ${t.checkedIn ? `SUDAH MASUK ✓ (${escapeHTML(t.checkInTime || 'Valid')})` : 'BELUM CHECK-IN'}
                    </strong>
                  </div>
                </div>
                <div style="display:flex;gap:6px;">
                  <button type="button" class="btn ${t.checkedIn ? 'btn-crimson' : 'btn-gold'} btn-sm" onclick="verifyTicketCode('${escapeHTML(t.code)}')">
                    ${t.checkedIn ? 'Uji Scan Ulang' : '📷 Scan Masuk'}
                  </button>
                  ${t.checkedIn ? `<button type="button" class="btn btn-ghost btn-sm" onclick="resetTicketCheckIn('${escapeHTML(t.code)}')">Reset</button>` : ''}
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (state.adminSubTab === 'events') {
    const list = state.events.filter(e => !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    tabBody = `
      <div class="admin-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
          <div>
            <h2 style="font-family:var(--font-serif);font-size:1.35rem;">CRUD Kelola Event (${list.length})</h2>
            <p style="font-size:0.8rem;color:var(--muted);">Tambah, ubah, dan hapus katalog event langsung ke tabel <code>events</code> MySQL.</p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input id="admin-search-input" class="form-input" style="width:210px;padding:7px 10px;" placeholder="Cari judul/lokasi..." value="${escapeHTML(state.adminSearch)}" oninput="setAdminSearch(this.value)">
            <button type="button" class="btn btn-gold btn-sm" onclick="openEventCrudModal()">+ Tambah Event</button>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Judul Event</th><th>Tanggal &amp; Lokasi</th><th>Status</th><th>Harga</th><th>Aksi CRUD</th></tr></thead>
            <tbody>
              ${list.map(ev => `
                <tr>
                  <td><strong>${escapeHTML(ev.title)}</strong><div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(ev.quota)}</div></td>
                  <td>${escapeHTML(ev.date)}<div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(ev.location)}</div></td>
                  <td><span class="badge ${ev.status === 'past' ? 'badge-past' : (ev.isPaid ? 'badge-paid' : 'badge-free')}">${ev.status === 'past' ? 'Arsip' : (ev.isPaid ? 'Berbayar' : 'Gratis')}</span></td>
                  <td><strong>${ev.isPaid ? formatRupiah(ev.price) : 'Gratis'}</strong></td>
                  <td style="white-space:nowrap;">
                    <button type="button" class="btn btn-tosca btn-sm" onclick="openEventCrudModal(${ev.id})">Edit</button>
                    <button type="button" class="btn btn-crimson btn-sm" onclick="deleteEventItem(${ev.id})">Hapus</button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (state.adminSubTab === 'transactions' || state.adminSubTab === 'tenants') {
    const isTenantTab = state.adminSubTab === 'tenants';
    const baseList = isTenantTab ? tenantBookings : visitorTickets;
    const list = baseList.filter(t => !q || t.code.toLowerCase().includes(q) || t.holder.toLowerCase().includes(q));
    tabBody = `
      <div class="admin-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
          <div>
            <h2 style="font-family:var(--font-serif);font-size:1.35rem;">${isTenantTab ? `CRUD Data Booth Tenant (${list.length})` : `CRUD Rekap Tiket Pengunjung (${list.length})`}</h2>
            <p style="font-size:0.8rem;color:var(--muted);">Kelola transaksi di tabel <code>tickets</code> MySQL. Menghapus tenant otomatis membuka kembali slot booth.</p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input id="admin-search-input" class="form-input" style="width:210px;padding:7px 10px;" placeholder="Cari kode/nama..." value="${escapeHTML(state.adminSearch)}" oninput="setAdminSearch(this.value)">
            <button type="button" class="btn btn-gold btn-sm" onclick="exportAdminCSV('${isTenantTab ? 'tenants' : 'transactions'}')">📥 Unduh CSV</button>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Kode</th><th>Nama / Brand</th><th>Detail</th><th>Nominal</th><th>Status</th><th>Aksi CRUD</th></tr></thead>
            <tbody>
              ${list.map(t => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--gold);">#${escapeHTML(t.code)}</td>
                  <td><strong>${escapeHTML(t.holder)}</strong><div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(t.ownerEmail || t.contact)}</div></td>
                  <td>${escapeHTML(t.type)}<div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(t.eventTitle)}</div></td>
                  <td><strong>${formatRupiah(t.amount)}</strong></td>
                  <td><span class="badge ${t.checkedIn ? 'badge-free' : 'badge-paid'}">${escapeHTML(t.status)}</span></td>
                  <td style="white-space:nowrap;">
                    <button type="button" class="btn btn-tosca btn-sm" onclick="openTicketCrudModal(${t.id})">Edit</button>
                    <button type="button" class="btn btn-crimson btn-sm" onclick="deleteTicketItem(${t.id})">Hapus</button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    const list = state.galleryItems.filter(g => !q || g.title.toLowerCase().includes(q) || g.meta.toLowerCase().includes(q));
    tabBody = `
      <div class="admin-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
          <div>
            <h2 style="font-family:var(--font-serif);font-size:1.35rem;">CRUD Kelola Gallery (${list.length})</h2>
            <p style="font-size:0.8rem;color:var(--muted);">Tambah, ubah, dan hapus item dokumentasi di tabel <code>gallery_items</code> MySQL.</p>
          </div>
          <button type="button" class="btn btn-gold btn-sm" onclick="openGalleryCrudModal()">+ Tambah Gallery</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Foto</th><th>Judul</th><th>Keterangan</th><th>Aksi CRUD</th></tr></thead>
            <tbody>
              ${list.map(g => `
                <tr>
                  <td style="width:74px;">
                    ${g.image
                      ? `<img src="${g.image}" alt="${escapeHTML(g.title)}" style="width:56px;height:42px;object-fit:cover;border-radius:8px;border:1px solid var(--line);display:block;">`
                      : `<div style="width:56px;height:42px;border-radius:8px;background:#E0F2FE;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:0.72rem;color:#0369A1;font-weight:700;">Foto</div>`
                    }
                  </td>
                  <td><strong>${escapeHTML(g.title)}</strong></td>
                  <td>${escapeHTML(g.meta)}</td>
                  <td style="white-space:nowrap;">
                    <button type="button" class="btn btn-tosca btn-sm" onclick="openGalleryCrudModal(${g.id})">Edit</button>
                    <button type="button" class="btn btn-crimson btn-sm" onclick="deleteGalleryItem(${g.id})">Hapus</button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  return `
    <section class="section wrap" style="padding-top:24px;">
      ${tabBody}
    </section>
  `;
}

// =========================================================================
// MODAL CRUD HANDLERS (EVENTS, TICKETS/TENANTS, GALLERY)
// =========================================================================
window.openEventCrudModal = function(editId) {
  const ev = editId ? state.events.find(e => e.id === editId) : null;
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop" id="crud-backdrop">
      <div class="modal-box" style="max-width:480px;">
        <h3 style="font-family:var(--font-serif);font-size:1.35rem;margin-bottom:12px;">${ev ? 'Edit Event' : 'Tambah Event Baru'}</h3>
        <div class="form-group"><label class="form-label">Judul Event</label><input class="form-input" id="ev-title" value="${escapeHTML(ev ? ev.title : '')}" placeholder="Contoh: Matsuri Sougen Vol. 5"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group"><label class="form-label">Tanggal</label><input class="form-input" id="ev-date" value="${escapeHTML(ev ? ev.date : 'Min, 24 Jan 2027')}"></div>
          <div class="form-group"><label class="form-label">Kota</label><input class="form-input" id="ev-city" value="${escapeHTML(ev ? ev.city : 'Makassar')}"></div>
        </div>
        <div class="form-group"><label class="form-label">Lokasi Venue</label><input class="form-input" id="ev-loc" value="${escapeHTML(ev ? ev.location : 'Phinisi Point Mall, Makassar')}"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div class="form-group"><label class="form-label">Status</label>
            <select class="form-input" id="ev-status">
              <option value="upcoming" ${!ev || ev.status === 'upcoming' ? 'selected' : ''}>Akan Datang</option>
              <option value="past" ${ev && ev.status === 'past' ? 'selected' : ''}>Sudah Lewat</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Biaya</label>
            <select class="form-input" id="ev-paid">
              <option value="1" ${!ev || ev.isPaid ? 'selected' : ''}>Berbayar</option>
              <option value="0" ${ev && !ev.isPaid ? 'selected' : ''}>Gratis (Rp 0)</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Harga (Rp)</label><input type="number" class="form-input" id="ev-price" value="${ev ? ev.price : 35000}"></div>
        </div>
        <div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-input" id="ev-desc" rows="2">${escapeHTML(ev ? ev.desc : '')}</textarea></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Batal</button>
          <button type="button" class="btn btn-gold btn-sm" onclick="saveEventCrud(${ev ? ev.id : 'null'})">Simpan ke Database</button>
        </div>
      </div>
    </div>
  `;
};

window.saveEventCrud = async function(editId) {
  const payload = {
    title: document.getElementById('ev-title').value.trim(),
    date: document.getElementById('ev-date').value.trim(),
    city: document.getElementById('ev-city').value.trim(),
    location: document.getElementById('ev-loc').value.trim(),
    status: document.getElementById('ev-status').value,
    isPaid: document.getElementById('ev-paid').value === '1',
    price: Number(document.getElementById('ev-price').value || 0),
    desc: document.getElementById('ev-desc').value.trim()
  };
  if (!payload.title || !payload.date || !payload.location) {
    showToast('Judul, tanggal, dan lokasi wajib diisi.');
    return;
  }
  try {
    if (state.apiConnected) {
      if (editId) {
        const res = await apiRequest('events/' + editId, 'PUT', payload);
        state.events = state.events.map(e => e.id === editId ? res.data : e);
      } else {
        const res = await apiRequest('events', 'POST', payload);
        state.events.push(res.data);
      }
    } else {
      const priceLabel = payload.isPaid ? formatRupiah(payload.price) : 'Gratis';
      const badgeText = payload.status === 'past' ? ('SUDAH LEWAT · ' + (payload.isPaid ? 'BERBAYAR' : 'GRATIS')) : (payload.isPaid ? ('BERBAYAR · ' + priceLabel) : 'GRATIS');
      if (editId) {
        state.events = state.events.map(e => e.id === editId ? { ...e, ...payload, priceLabel, badgeText } : e);
      } else {
        state.events.push({
          id: Date.now(), slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + (Date.now() % 1000),
          ...payload, priceLabel, badgeText, dayNum: '15', monthYear: 'NOV\n2026', shortDate: payload.date,
          time: '10.00–21.00 WITA', posterNum: '04', kanji: '祭り', posterTitle: payload.title.toUpperCase(),
          posterBg: '#93C5FD', quota: 'PENDAFTARAN DIBUKA', themeGrad: 'linear-gradient(135deg, #93C5FD 0%, #38BDF8 100%)'
        });
      }
      saveLocalFallback();
    }
    closeModal();
    showToast(editId ? 'Event berhasil diperbarui!' : 'Event baru berhasil disimpan!');
    router();
  } catch (err) {
    showToast('Gagal menyimpan: ' + err.message);
  }
};

window.deleteEventItem = async function(id) {
  if (!confirm('Hapus event ini dari database?')) return;
  try {
    if (state.apiConnected) await apiRequest('events/' + id, 'DELETE');
    state.events = state.events.filter(e => e.id !== id);
    if (!state.apiConnected) saveLocalFallback();
    showToast('Event berhasil dihapus.');
    router();
  } catch (err) {
    showToast('Gagal menghapus: ' + err.message);
  }
};

window.openTicketCrudModal = function(id) {
  const t = state.tickets.find(x => x.id === id);
  if (!t) return;
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-box" style="max-width:440px;">
        <h3 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:12px;">Edit Transaksi #${escapeHTML(t.code)}</h3>
        <div class="form-group"><label class="form-label">Nama Pemegang / Brand</label><input class="form-input" id="tk-holder" value="${escapeHTML(t.holder)}"></div>
        <div class="form-group"><label class="form-label">Kontak</label><input class="form-input" id="tk-contact" value="${escapeHTML(t.contact)}"></div>
        <div class="form-group"><label class="form-label">Jenis Tiket / Booth</label><input class="form-input" id="tk-type" value="${escapeHTML(t.type)}"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group"><label class="form-label">Nominal (Rp)</label><input type="number" class="form-input" id="tk-amount" value="${t.amount}"></div>
          <div class="form-group"><label class="form-label">Status</label><input class="form-input" id="tk-status" value="${escapeHTML(t.status)}"></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Batal</button>
          <button type="button" class="btn btn-gold btn-sm" onclick="saveTicketCrud(${t.id})">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  `;
};

window.saveTicketCrud = async function(id) {
  const payload = {
    holder: document.getElementById('tk-holder').value.trim(),
    contact: document.getElementById('tk-contact').value.trim(),
    type: document.getElementById('tk-type').value.trim(),
    amount: Number(document.getElementById('tk-amount').value || 0),
    status: document.getElementById('tk-status').value.trim()
  };
  try {
    if (state.apiConnected) {
      const res = await apiRequest('tickets/' + id, 'PUT', payload);
      state.tickets = state.tickets.map(t => t.id === id ? res.data : t);
    } else {
      state.tickets = state.tickets.map(t => t.id === id ? { ...t, ...payload } : t);
      saveLocalFallback();
    }
    closeModal();
    showToast('Data transaksi diperbarui!');
    router();
  } catch (err) {
    showToast('Gagal memperbarui: ' + err.message);
  }
};

window.deleteTicketItem = async function(id) {
  if (!confirm('Hapus transaksi ini dari database?')) return;
  try {
    const target = state.tickets.find(t => t.id === id);
    if (state.apiConnected) {
      await apiRequest('tickets/' + id, 'DELETE');
      const sl = await apiRequest('booth-slots', 'GET');
      state.boothSlots = sl.data;
    } else if (target && target.boothSlot) {
      state.boothSlots = state.boothSlots.map(s => s.code === target.boothSlot ? { ...s, available: true } : s);
    }
    state.tickets = state.tickets.filter(t => t.id !== id);
    if (!state.apiConnected) saveLocalFallback();
    showToast('Transaksi berhasil dihapus.');
    router();
  } catch (err) {
    showToast('Gagal menghapus: ' + err.message);
  }
};

window.__galleryDraftImage = '';

window.updateGalleryPhotoPreview = function() {
  const box = document.getElementById('gl-photo-preview');
  if (!box) return;
  if (window.__galleryDraftImage) {
    box.innerHTML = `
      <div style="position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--line-strong);background:#F0F9FF;">
        <img src="${window.__galleryDraftImage}" alt="Pratinjau Foto" style="width:100%;height:160px;object-fit:cover;display:block;">
        <button type="button" class="btn btn-crimson btn-sm" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.92);" onclick="clearGalleryDraftPhoto()">Hapus Foto</button>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div style="padding:14px;border:1.5px dashed var(--line-strong);border-radius:10px;background:#F8FAFC;text-align:center;font-size:0.78rem;color:var(--muted);">
        Belum ada foto dipilih · Format JPG, PNG, atau WEBP
      </div>
    `;
  }
};

window.clearGalleryDraftPhoto = function() {
  window.__galleryDraftImage = '';
  const fileInput = document.getElementById('gl-photo-file');
  if (fileInput) fileInput.value = '';
  window.updateGalleryPhotoPreview();
};

window.handleGalleryPhotoUpload = function(input) {
  const file = input && input.files && input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('File harus berupa gambar (JPG, PNG, atau WEBP).');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = new Image();
    img.onload = function() {
      const maxW = 900;
      const scale = img.width > maxW ? (maxW / img.width) : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      window.__galleryDraftImage = canvas.toDataURL('image/jpeg', 0.82);
      window.updateGalleryPhotoPreview();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
};

window.openGalleryCrudModal = function(editId) {
  const g = editId ? state.galleryItems.find(x => x.id === editId) : null;
  window.__galleryDraftImage = g && g.image ? g.image : '';
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" id="gl-crud-backdrop">
      <div class="modal-box" style="max-width:460px;">
        <h3 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:12px;">${g ? 'Edit Gallery' : 'Tambah Item Gallery'}</h3>
        <div class="form-group">
          <label class="form-label" for="gl-title">Judul Dokumentasi</label>
          <input class="form-input" id="gl-title" placeholder="Contoh: Matsuri Sougen Vol. 4" value="${escapeHTML(g ? g.title : '')}">
        </div>
        <div class="form-group">
          <label class="form-label" for="gl-meta">Keterangan / Tanggal</label>
          <input class="form-input" id="gl-meta" placeholder="Contoh: Phinisi Point Mall · 15 Nov 2026" value="${escapeHTML(g ? g.meta : '')}">
        </div>
        <div class="form-group">
          <label class="form-label" for="gl-photo-file">Tambah / Upload Foto</label>
          <input type="file" class="form-input" id="gl-photo-file" accept="image/*" onchange="handleGalleryPhotoUpload(this)" style="padding:7px 10px;background:#FFFFFF;">
          <div id="gl-photo-preview" style="margin-top:8px;"></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;">
          <button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Batal</button>
          <button type="button" class="btn btn-gold btn-sm" onclick="saveGalleryCrud(${g ? g.id : 'null'})">Simpan</button>
        </div>
      </div>
    </div>
  `;
  window.updateGalleryPhotoPreview();
  document.getElementById('gl-crud-backdrop')?.addEventListener('click', (ev) => {
    if (ev.target.id === 'gl-crud-backdrop') closeModal();
  });
};

window.saveGalleryCrud = async function(editId) {
  const existing = editId ? state.galleryItems.find(x => x.id === editId) : null;
  const payload = {
    title: document.getElementById('gl-title').value.trim(),
    meta: document.getElementById('gl-meta').value.trim(),
    cat: existing ? existing.cat : 'event',
    glyph: existing ? (existing.glyph || '祭') : '祭',
    tone: existing ? (existing.tone || 'v2') : 'v2',
    image: window.__galleryDraftImage || ''
  };
  if (!payload.title || !payload.meta) { showToast('Judul dan keterangan wajib diisi.'); return; }
  try {
    if (state.apiConnected) {
      if (editId) {
        const res = await apiRequest('gallery/' + editId, 'PUT', payload);
        state.galleryItems = state.galleryItems.map(g => g.id === editId ? res.data : g);
      } else {
        const res = await apiRequest('gallery', 'POST', payload);
        state.galleryItems.unshift(res.data);
      }
    } else {
      if (editId) {
        state.galleryItems = state.galleryItems.map(g => g.id === editId ? { ...g, ...payload } : g);
      } else {
        state.galleryItems.unshift({ id: Date.now(), ...payload });
      }
      saveLocalFallback();
    }
    window.__galleryDraftImage = '';
    closeModal();
    showToast('Gallery berhasil diperbarui!');
    router();
  } catch (err) {
    showToast('Gagal menyimpan gallery: ' + err.message);
  }
};

window.deleteGalleryItem = async function(id) {
  if (!confirm('Hapus item gallery ini?')) return;
  try {
    if (state.apiConnected) await apiRequest('gallery/' + id, 'DELETE');
    state.galleryItems = state.galleryItems.filter(g => g.id !== id);
    if (!state.apiConnected) saveLocalFallback();
    showToast('Item gallery dihapus.');
    router();
  } catch (err) {
    showToast('Gagal menghapus: ' + err.message);
  }
};

// =========================================================================
// CHECKOUT, METODE PEMBAYARAN, AUTH & GATE SCANNER
// =========================================================================
window.selectPayMethod = function(m) { state.payMethod = m; router(); };
window.selectVaBank = function(b) { state.vaBank = b; router(); };
window.selectEwalletProvider = function(ew) { state.ewalletProvider = ew; router(); };
window.setTicketSubTab = function(tab) { state.ticketSubTab = tab; router(); };

window.copyTextToClipboard = function(txt, toastMsg) {
  try {
    navigator.clipboard.writeText(txt);
  } catch (e) {}
  showToast(toastMsg || 'Berhasil disalin!');
};

window.changeTicketQty = function(delta) {
  const next = (state.ticketQty || 1) + delta;
  if (next < 1 || next > 4) return;
  state.ticketQty = next;
  router();
};
window.toggleVideoAcc = function(key) { state.openAcc[key] = !state.openAcc[key]; router(); };

window.openQuickTicketCheckout = async function(slug) {
  const ev = state.events.find(x => x.slug === slug) || state.events[0];
  const qty = state.ticketQty || 1;
  const holderName = state.isLoggedIn && state.userName ? state.userName : 'Pengunjung Sougen';
  const totalAmount = (ev.price || 0) * qty;

  const newOrder = {
    invoiceId: 'INV-SOUGEN-' + Math.floor(100000 + Math.random() * 900000),
    ownerEmail: state.userEmail,
    eventTitle: ev.title,
    date: ev.date,
    location: ev.location,
    holder: holderName,
    contact: state.userPhone || state.userEmail || '081234567890',
    category: ev.isPaid ? 'Tiket Presale' : 'Tiket Gratis',
    type: `${ev.isPaid ? 'Tiket Presale' : 'Tiket Masuk Gratis'} (x${qty})`,
    boothSlot: null,
    amount: totalAmount,
    method: ev.isPaid ? state.payMethod : 'Gratis (Rp 0)',
    status: ev.isPaid ? `LUNAS · ${state.payMethod}` : 'FREE PASS · GRATIS'
  };

  if (ev.isPaid) {
    openPaymentGatewayModal(newOrder);
  } else {
    await persistNewOrder(newOrder);
    state.ticketSubTab = 'qr';
    navigateTo('#/tiket');
  }
};

async function persistNewOrder(order) {
  const payload = {
    ...order,
    ownerEmail: (state.userEmail || order.ownerEmail || '').toLowerCase()
  };
  if (state.apiConnected) {
    const res = await apiRequest('tickets', 'POST', payload);
    state.tickets.unshift(res.data);
    if (payload.boothSlot) {
      const sl = await apiRequest('booth-slots', 'GET');
      state.boothSlots = sl.data;
    }
    showToast(`Pembayaran Lunas! E-Ticket #${res.data.code} tersimpan ke akun Anda.`);
    return res.data;
  } else {
    const prefix = payload.category === 'Sewa Tenant' ? 'TNT-2026-' : (payload.amount > 0 ? 'SG-2026-' : 'FREE-2026-');
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
    const created = {
      id: Date.now(),
      code: prefix + Math.floor(1000 + Math.random() * 9000),
      userId: state.userId,
      ...payload,
      time: 'Hari ini · ' + nowTime,
      checkedIn: false,
      checkInTime: null
    };
    state.tickets.unshift(created);
    if (payload.boothSlot) {
      state.boothSlots = state.boothSlots.map(s => s.code === payload.boothSlot ? { ...s, available: false } : s);
    }
    saveLocalFallback();
    showToast(`Pembayaran Lunas! E-Ticket #${created.code} diterbitkan.`);
    return created;
  }
}

// Modal ringkasan awal -> menekan "Lakukan Simulasi Pembayaran" langsung mengarahkan ke halaman Metode Pembayaran (#/pembayaran)
window.openPaymentGatewayModal = function(orderData) {
  state.pendingOrder = orderData;
  const root = document.getElementById('modal-root');
  if (!root) return;

  root.innerHTML = `
    <div class="modal-backdrop" id="pg-backdrop">
      <div class="modal-box" style="max-width:440px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span class="us-pill">PAYMENT GATEWAY</span>
          <span style="font-family:monospace;font-size:0.75rem;color:var(--muted);">${escapeHTML(orderData.invoiceId)}</span>
        </div>
        <h3 style="font-family:var(--font-serif);font-size:1.35rem;color:var(--text);margin-bottom:4px;">Selesaikan Pembayaran</h3>
        <p style="font-size:0.82rem;color:var(--muted);margin-bottom:14px;">${escapeHTML(orderData.eventTitle)} · ${escapeHTML(orderData.type)}</p>
        <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;">
          <div style="font-size:0.8rem;color:#0369A1;font-weight:700;text-align:center;margin-bottom:10px;">
            Pilih metode pembayaran (QRIS, Transfer VA, atau E-Wallet) pada tahap berikutnya.
          </div>
          <div style="padding-top:10px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:0.82rem;color:var(--muted);">Total Bayar:</span>
            <strong style="font-size:1.25rem;color:var(--gold);">${formatRupiah(orderData.amount)}</strong>
          </div>
        </div>
        <div style="display:grid;gap:8px;">
          <button type="button" class="btn btn-gold" style="width:100%;" onclick="goToPaymentMethodPage()">Lakukan Simulasi Pembayaran</button>
          <button type="button" class="btn btn-ghost btn-sm" style="width:100%;" onclick="closeModal()">Batal</button>
        </div>
      </div>
    </div>
  `;
};

window.goToPaymentMethodPage = function() {
  closeModal();
  navigateTo('#/pembayaran');
};

window.cancelPendingOrder = function() {
  state.pendingOrder = null;
  showToast('Transaksi dibatalkan.');
  navigateTo('#/');
};

window.completeSimulatedPayment = async function() {
  const order = state.pendingOrder;
  if (!order) return;
  const methodDetail = state.payMethod === 'Transfer VA'
    ? `Transfer VA (${state.vaBank})`
    : (state.payMethod === 'E-wallet' ? `E-Wallet (${state.ewalletProvider})` : 'QRIS');
  const finalizedOrder = {
    ...order,
    method: methodDetail,
    status: `LUNAS · ${methodDetail}`
  };
  state.pendingOrder = null;
  try {
    await persistNewOrder(finalizedOrder);
    state.ticketSubTab = 'qr';
    navigateTo('#/tiket');
  } catch (err) {
    showToast('Gagal memproses pesanan: ' + err.message);
  }
};

window.submitTenantOrder = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const brand = (document.getElementById('tenant-name')?.value || '').trim() || 'Tenant Sougen';
  const contact = (document.getElementById('tenant-contact')?.value || '').trim() || '081355667788';
  const pkg = document.getElementById('tenant-pkg')?.value;
  const foundPkg = BOOTH_PACKAGES.find(p => p.shortName === pkg) || BOOTH_PACKAGES[0];

  openPaymentGatewayModal({
    invoiceId: 'INV-BOOTH-' + Math.floor(100000 + Math.random() * 900000),
    ownerEmail: state.userEmail,
    eventTitle: 'Matsuri Sougen Vol. 4 · Booth Tenant',
    date: '15 November 2026',
    location: `Phinisi Point Mall · Slot ${state.selectedBoothSlot}`,
    holder: brand,
    contact,
    category: 'Sewa Tenant',
    type: `${foundPkg.shortName} [Slot ${state.selectedBoothSlot}]`,
    boothSlot: state.selectedBoothSlot,
    amount: foundPkg.price,
    method: state.payMethod,
    status: `LUNAS · ${state.payMethod}`
  });
};

window.selectBoothPkgCard = function(shortName) { state.selectedBoothPkg = shortName; router(); };
window.selectBoothSlot = function(slotCode) { state.selectedBoothSlot = slotCode; router(); };

window.setAdminSearch = function(val) {
  state.adminSearch = val;
  router();
  const input = document.getElementById('admin-search-input');
  if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
};

function afterAuthRedirect() {
  if (state.pendingRoute) {
    const r = state.pendingRoute;
    state.pendingRoute = null;
    navigateTo(r);
  } else {
    router();
  }
}

window.fillDemoAccount = function(role) {
  const acc = role === 'admin' ? DEMO_ADMIN : DEMO_USER;
  const e = document.getElementById('login-email');
  const p = document.getElementById('login-password');
  if (e) e.value = acc.email;
  if (p) p.value = acc.password;
};

window.handleLoginSubmit = async function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const email = (document.getElementById('login-email')?.value || '').trim().toLowerCase();
  const password = (document.getElementById('login-password')?.value || '').trim();
  const err = document.getElementById('login-error');
  const fail = (msg) => { if (err) { err.textContent = msg; err.style.display = 'block'; } };

  if (!email || !password) { fail('Isi email dan password terlebih dahulu.'); return; }

  if (state.apiConnected) {
    try {
      const res = await apiRequest('auth/login', 'POST', { email, password });
      state.authToken = res.token;
      localStorage.setItem(TOKEN_KEY, res.token);
      state.isLoggedIn = true;
      state.userId = res.user.id || null;
      state.userEmail = res.user.email;
      state.userName = res.user.name;
      state.userPhone = res.user.phone || '';
      state.userRole = res.user.role;
      if (Array.isArray(res.tickets)) state.tickets = res.tickets;
      closeModal();
      showToast(`Selamat datang, ${res.user.name}!`);
      if (res.user.role === 'admin') { state.adminSubTab = 'scanner'; navigateTo('#/admin'); }
      else afterAuthRedirect();
      return;
    } catch (apiErr) {
      fail(apiErr.message);
      return;
    }
  }

  if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    state.isLoggedIn = true; state.userId = 1; state.userEmail = email; state.userRole = 'admin'; state.userName = 'Admin Sougen'; state.adminSubTab = 'scanner';
    closeModal(); showToast('Selamat datang di Panel Admin Sougen!'); navigateTo('#/admin'); return;
  }
  const reg = state.registeredUsers.find(u => u.email.toLowerCase() === email && u.password === password);
  if (!reg) { fail('Email atau password salah. Gunakan akun demo di bawah.'); return; }
  state.isLoggedIn = true; state.userId = null; state.userEmail = email; state.userRole = 'visitor'; state.userName = reg.name; state.userPhone = reg.phone || '';
  closeModal(); showToast(`Berhasil masuk sebagai ${state.userName}!`); afterAuthRedirect();
};

window.handleRegisterSubmit = async function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const name = (document.getElementById('reg-name')?.value || '').trim();
  const email = (document.getElementById('reg-email')?.value || '').trim().toLowerCase();
  const phone = (document.getElementById('reg-phone')?.value || '').trim();
  const password = (document.getElementById('reg-password')?.value || '').trim();
  if (!name || !email || password.length < 6) { showToast('Lengkapi nama, email valid, dan password min. 6 karakter.'); return; }

  if (state.apiConnected) {
    try {
      const res = await apiRequest('auth/register', 'POST', { name, email, phone, password });
      state.authToken = res.token;
      localStorage.setItem(TOKEN_KEY, res.token);
      state.isLoggedIn = true; state.userId = res.user.id || null; state.userEmail = res.user.email; state.userName = res.user.name; state.userPhone = res.user.phone || ''; state.userRole = 'visitor';
      state.tickets = [];
      closeModal(); showToast(`Registrasi MySQL Berhasil! Selamat datang, ${name}.`); afterAuthRedirect();
      return;
    } catch (apiErr) {
      showToast(apiErr.message);
      return;
    }
  }

  if (state.registeredUsers.some(u => u.email.toLowerCase() === email)) {
    showToast('Email sudah terdaftar. Silakan masuk.');
    return;
  }
  state.registeredUsers.push({ name, email, phone, password, role: 'visitor' });
  saveLocalFallback();
  state.isLoggedIn = true; state.userId = null; state.userEmail = email; state.userName = name; state.userPhone = phone; state.userRole = 'visitor';
  closeModal(); showToast(`Registrasi Berhasil! Selamat datang, ${name}.`); afterAuthRedirect();
};

window.switchAuthTab = function(mode) { state.authMode = mode; openAuthModal(mode); };

window.logoutUser = async function() {
  if (state.apiConnected && state.authToken) {
    try { await apiRequest('auth/logout', 'POST'); } catch (e) {}
  }
  state.authToken = '';
  localStorage.removeItem(TOKEN_KEY);
  state.isLoggedIn = false; state.userId = null; state.userEmail = ''; state.userName = ''; state.userPhone = ''; state.userRole = 'visitor'; state.scanResult = null; state.pendingOrder = null;
  if (state.apiConnected) state.tickets = [];
  showToast('Anda telah keluar dari akun.');
  navigateTo('#/');
};

window.openAuthModal = function(defaultMode) {
  if (defaultMode) state.authMode = defaultMode;
  const isReg = state.authMode === 'register';
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop" id="auth-backdrop">
      <div class="modal-box" style="max-width:440px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="font-family:var(--font-serif);font-size:1.45rem;color:var(--text);">Masuk ke Akun</h3>
          <button type="button" class="btn btn-ghost btn-sm" style="padding:4px 10px;" onclick="closeModal()">✕</button>
        </div>
        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn ${!isReg ? 'active' : ''}" onclick="switchAuthTab('login')">Masuk atau login</button>
          <button type="button" class="auth-tab-btn ${isReg ? 'active' : ''}" onclick="switchAuthTab('register')">Daftar/Registrasi</button>
        </div>
        ${!isReg ? `
          <div data-form-handler="handleLoginSubmit">
            <div class="form-group"><label class="form-label" for="login-email">Email</label><input type="text" class="form-input" id="login-email" placeholder="nama@email.com" required></div>
            <div class="form-group" style="margin-bottom:18px;"><label class="form-label" for="login-password">Password</label><input type="password" class="form-input" id="login-password" placeholder="••••••••" required></div>
            <p id="login-error" role="alert" style="display:none;color:#E11D48;font-size:0.8rem;font-weight:600;margin:-6px 0 12px;"></p>
            <button type="button" onclick="handleLoginSubmit({ preventDefault() {} })" class="btn btn-gold" style="width:100%;">Masuk</button>
            <div style="margin-top:14px;padding:10px 12px;border:1px dashed var(--line-strong);border-radius:12px;font-size:0.78rem;color:var(--muted);">
              <strong style="color:var(--text);">Akun demo</strong>
              <div style="margin-top:4px;">Admin: admin@sougen.com / admin123</div>
              <div>User: user@gmail.com / user123</div>
              <div style="display:flex;gap:8px;margin-top:8px;">
                <button type="button" class="btn btn-ghost btn-sm" onclick="fillDemoAccount('user')">Isi akun User</button>
                <button type="button" class="btn btn-ghost btn-sm" onclick="fillDemoAccount('admin')">Isi akun Admin</button>
              </div>
            </div>
          </div>
        ` : `
          <div data-form-handler="handleRegisterSubmit">
            <div class="form-group"><label class="form-label" for="reg-name">Nama Lengkap</label><input type="text" class="form-input" id="reg-name" placeholder="Masukkan nama lengkap" required></div>
            <div class="form-group"><label class="form-label" for="reg-email">Alamat Email</label><input type="email" class="form-input" id="reg-email" placeholder="nama@email.com" required></div>
            <div class="form-group"><label class="form-label" for="reg-phone">Nomor WhatsApp</label><input type="tel" class="form-input" id="reg-phone" placeholder="0812xxxxxxxx" required></div>
            <div class="form-group" style="margin-bottom:18px;"><label class="form-label" for="reg-password">Buat Password</label><input type="password" class="form-input" id="reg-password" placeholder="Minimal 6 karakter" required></div>
            <button type="button" onclick="handleRegisterSubmit({ preventDefault() {} })" class="btn btn-tosca" style="width:100%;">Daftar Dan Buat Akun Baru</button>
          </div>
        `}
      </div>
    </div>
  `;
  document.getElementById('auth-backdrop')?.addEventListener('click', (ev) => { if (ev.target.id === 'auth-backdrop') closeModal(); });
};

window.setAdminSubTab = function(tab) { state.adminSubTab = tab; state.adminSearch = ''; router(); };

window.handleManualScan = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('scan-code-input');
  if (input) verifyTicketCode(input.value.trim().replace(/^#/, ''));
};

window.verifyTicketCode = async function(code) {
  const cleanCode = (code || '').trim().replace(/^#/, '').toUpperCase();
  if (state.apiConnected) {
    try {
      const res = await apiRequest('tickets/verify', 'POST', { code: cleanCode });
      if (res.result === 'not_found') {
        state.scanResult = { type: 'error', badge: 'TIDAK VALID', title: `Kode #${cleanCode} Tidak Terdaftar`, message: 'Tiket tidak ditemukan di database MySQL.' };
      } else if (res.result === 'duplicate') {
        state.scanResult = { type: 'duplicate', badge: 'ANTI-DUPLICATE ALERT · DITOLAK', title: `Tiket #${res.data.code} Sudah Digunakan!`, message: `${res.data.holder} sudah check-in pada ${res.data.checkInTime || 'sesi sebelumnya'}.` };
      } else {
        state.tickets = state.tickets.map(t => t.code === res.data.code ? res.data : t);
        state.scanResult = { type: 'success', badge: 'VALID · CHECK-IN BERHASIL ✓', title: `Selamat Datang, ${res.data.holder}!`, message: `Tiket #${res.data.code} terverifikasi pada ${res.data.checkInTime}.` };
      }
      router();
      return;
    } catch (err) {
      showToast('Gagal verifikasi: ' + err.message);
      return;
    }
  }

  const target = state.tickets.find(t => t.code.toUpperCase() === cleanCode);
  if (!target) {
    state.scanResult = { type: 'error', badge: 'TIDAK VALID', title: `Kode #${cleanCode} Tidak Terdaftar`, message: 'Tiket tidak ditemukan.' };
  } else if (target.checkedIn) {
    state.scanResult = { type: 'duplicate', badge: 'ANTI-DUPLICATE ALERT · DITOLAK', title: `Tiket #${target.code} Sudah Digunakan!`, message: `${target.holder} sudah check-in pada ${target.checkInTime || 'sesi sebelumnya'}.` };
  } else {
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
    target.checkedIn = true; target.checkInTime = nowStr;
    saveLocalFallback();
    state.scanResult = { type: 'success', badge: 'VALID · CHECK-IN BERHASIL ✓', title: `Selamat Datang, ${target.holder}!`, message: `Tiket #${target.code} terverifikasi pada ${nowStr}.` };
  }
  router();
};

window.resetTicketCheckIn = async function(code) {
  if (state.apiConnected) {
    try { await apiRequest('tickets/reset-checkin', 'POST', { code }); } catch (err) { showToast(err.message); return; }
  }
  const target = state.tickets.find(t => t.code === code);
  if (target) { target.checkedIn = false; target.checkInTime = null; state.scanResult = null; if (!state.apiConnected) saveLocalFallback(); router(); }
};

window.exportAdminCSV = function(kind) {
  const tab = kind || (state.adminSubTab === 'tenants' ? 'tenants' : 'transactions');
  const cell = (v) => '"' + String(v === undefined || v === null ? '' : v).replace(/"/g, '""') + '"';
  const gate = (t) => (t.checkedIn ? 'SUDAH CHECK-IN' + (t.checkInTime ? ' (' + t.checkInTime + ')' : '') : 'BELUM CHECK-IN');
  const list = tab === 'tenants' ? state.tickets.filter(t => t.category === 'Sewa Tenant') : state.tickets.filter(t => t.category !== 'Sewa Tenant');
  const header = ['Kode', 'Waktu', 'Akun Email', 'Nama / Brand', 'Kontak', 'Event', 'Kategori', 'Jenis', 'Metode', 'Nominal', 'Status', 'Gate'];
  const rows = list.map(t => [t.code, t.time, t.ownerEmail || '', t.holder, t.contact, t.eventTitle, t.category, t.type, t.method, t.amount, t.status, gate(t)]);
  const csv = '\ufeff' + [header].concat(rows).map(r => r.map(cell).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = tab === 'tenants' ? 'Data_Tenant_Sougen_2026.csv' : 'Rekap_Tiket_Sougen_2026.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('File CSV berhasil diunduh!');
};

window.closeModal = function() { const r = document.getElementById('modal-root'); if (r) r.innerHTML = ''; };

const GALLERY_FILTERS = [['semua', 'Semua'], ['event', 'Dokumentasi Event'], ['mitra', 'Mitra & Sponsor'], ['tenant', 'Tenant UMKM']];
window.setGalleryFilter = function(f) { state.galleryFilter = f; router(); };

function partnerGridHTML(limit) {
  return `<div class="gl-partners">${state.partners.slice(0, limit || state.partners.length).map(p => `
    <div class="gl-partner">
      <div class="gl-logo">${escapeHTML(p.ini)}</div>
      <strong>${escapeHTML(p.name)}</strong>
      <span>${escapeHTML(p.type)}</span>
    </div>`).join('')}</div>`;
}

function homeGallerySection() {
  return `
    <section id="gallery-mitra" class="section wrap">
      <div class="section-head">
        <div>
          <h2 class="section-title">Gallery Sougen Creative</h2>
          <p class="section-sub">Komunitas, sponsor, dan UMKM yang pernah berkolaborasi di event kami.</p>
        </div>
      </div>
      ${partnerGridHTML(4)}
      <div class="gl-more"><a class="btn btn-ghost btn-sm" href="#/gallery">Lihat semua gallery →</a></div>
    </section>
  `;
}

function renderTentang() {
  const pillars = [
    ['Festival Budaya &amp; Hiburan', 'Menyelenggarakan acara bertema Jepang (<em>Matsuri</em>, <em>Night Market</em>, dan <em>Anisong Party</em>) dengan panggung hiburan komunitas dan dekorasi tematik.'],
    ['Wadah Kreator &amp; Cosplay', 'Memfasilitasi kompetisi <em>Coswalk</em>, <em>Cosplay Competition</em>, serta ruang pamer bagi ilustrator dan kreator independen lokal.'],
    ['Bazar Tenant Kuliner &amp; Merch', 'Menyediakan area <em>booth</em> terkurasi bagi pelaku UMKM kuliner F&amp;B maupun <em>merchandise</em> dengan sistem pemesanan slot online yang transparan.']
  ];
  return `
    <section class="section wrap">
      <div class="panel tn-about">
        <h1>About Us</h1>
        <p><strong>Sougen Creative Management</strong> adalah penyelenggara acara (<em>Event Organizer</em>) yang berfokus pada penyelenggaraan festival budaya Jepang (<em>Matsuri</em>), kompetisi <em>Cosplay &amp; Coswalk</em>, pertunjukan musik <em>Anisong</em>, serta bazar ekonomi kreatif bagi pelaku UMKM lokal.</p>
        <p>Berangkat dari semangat membangun ruang interaksi yang inklusif bagi komunitas maupun keluarga, Sougen Creative terus berinovasi menghadirkan tata kelola acara modern—mulai dari katalog acara transparan, kemudahan penyewaan <em>booth</em> tenant, hingga sistem <em>E-Ticket</em>.</p>
        <div class="gl-stats tn-stats"><div><b>12+ Event</b><span>Telah Terlaksana</span></div><div><b>15.000+</b><span>Total Pengunjung</span></div><div><b>1+</b><span>Tahun Pengalaman</span></div></div>
      </div>
      <div class="tn-vision">
        <div>
          <h2 class="gl-title" style="margin-top:0;">Visi dan Fokus Ekosistem</h2>
          <p style="color:var(--muted);">Menjadi mitra utama komunitas kreatif dan pelaku usaha lokal dalam menciptakan perhelatan pop-culture yang tertib, interaktif, dan berdampak ekonomi nyata.</p>
        </div>
        <div class="tn-img" aria-hidden="true">創</div>
      </div>
      <h2 class="gl-title" style="text-align:center;">Pilar Layanan Sougen Creative</h2>
      <div class="gl-grid">${pillars.map(p => `<article class="tn-card"><strong>${p[0]}</strong><p>${p[1]}</p></article>`).join('')}</div>
    </section>
  `;
}

function renderGallery() {
  const f = state.galleryFilter || 'semua';
  const tiles = state.galleryItems.filter(i => f === 'semua' || f === i.cat);
  const showTiles = f !== 'mitra' && tiles.length > 0;
  const showPartners = f === 'semua' || f === 'mitra';
  return `
    <section class="section wrap">
      <div class="panel gl-hero">
        <div>
          <span class="gl-chip">Tentang Sougen</span>
          <h1>Gallery &amp; Portofolio Sougen Creative</h1>
          <p>EO festival Jepang &amp; bazar UMKM (rata-rata 1.200+ pengunjung/acara). Lihat dokumentasi event, tenant UMKM, serta komunitas dan sponsor yang pernah berkolaborasi bersama kami.</p>
          <div class="gl-stats"><div><b>12+</b><span>Event Telah Terlaksana</span></div><div><b>15.000+</b><span>Total Pengunjung</span></div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <a class="btn btn-tosca btn-sm" href="https://wa.me/6281234567890?text=Halo%20Admin%20Sougen%20Creative" target="_blank" rel="noopener">WhatsApp Admin</a>
          <a class="btn btn-ghost btn-sm" href="https://instagram.com/sougen.creative" target="_blank" rel="noopener">@sougen.creative</a>
        </div>
      </div>
      <div class="gl-filters" role="tablist" aria-label="Filter gallery">
        ${GALLERY_FILTERS.map(([k, label]) => `<button type="button" class="gl-filter ${f === k ? 'active' : ''}" onclick="setGalleryFilter('${k}')">${label}</button>`).join('')}
      </div>
      ${showTiles ? `<h2 class="gl-title">Dokumentasi &amp; Tenant</h2><div class="gl-grid">${tiles.map(i => `<article class="gl-tile"><div class="gl-photo ${escapeHTML(i.tone)}" style="${i.image ? 'padding:0;' : ''}">${i.image ? `<img src="${i.image}" alt="${escapeHTML(i.title)}" style="width:100%;height:100%;object-fit:cover;display:block;">` : escapeHTML(i.glyph || '📷')}</div><div class="gl-cap"><strong>${escapeHTML(i.title)}</strong><span>${escapeHTML(i.meta)}</span></div></article>`).join('')}</div>` : ''}
      ${showPartners ? `<h2 class="gl-title">Mitra &amp; Sponsor</h2>${partnerGridHTML()}` : ''}
      <div class="video-booth-callout" style="margin-top:22px;">
        <div><h3>Jadi mitra kami</h3><p>Ingin berkolaborasi sebagai sponsor, komunitas, atau tenant UMKM? Hubungi admin Sougen.</p></div>
        <a class="video-booth-btn" href="https://wa.me/6281234567890?text=Halo%20Admin%20Sougen%20Creative" target="_blank" rel="noopener">WhatsApp Admin</a>
      </div>
    </section>
  `;
}

function router() {
  const isAdmin = state.isLoggedIn && state.userRole === 'admin';
  renderHeaderAndDock();
  const main = document.getElementById('main');
  if (!main) return;

  if (isAdmin) {
    updateSEO('#/admin');
    main.innerHTML = renderAdminDashboard();
    return;
  }

  const hash = state.currentRoute || window.location.hash || '#/';
  if (!state.isLoggedIn && (hash.startsWith('#/tenant') || hash.startsWith('#/event/') || hash.startsWith('#/tiket') || hash.startsWith('#/pembayaran'))) {
    state.pendingRoute = hash;
    state.currentRoute = '#/';
    try { window.history.replaceState(null, '', '#/'); } catch (err) {}
    updateSEO('#/');
    main.innerHTML = renderHome();
    setTimeout(() => openAuthModal('login'), 0);
    return;
  }

  if (hash.startsWith('#/event/')) {
    const slug = hash.replace('#/event/', '');
    const ev = state.events.find(e => e.slug === slug) || state.events[0];
    updateSEO(hash, ev);
    main.innerHTML = renderEventCheckout(slug);
  } else if (hash.startsWith('#/pembayaran')) {
    updateSEO(hash);
    main.innerHTML = renderPaymentPage();
  } else if (hash.startsWith('#/tentang')) {
    updateSEO(hash);
    main.innerHTML = renderTentang();
  } else if (hash.startsWith('#/gallery')) {
    updateSEO(hash);
    main.innerHTML = renderGallery();
  } else if (hash.startsWith('#/tenant')) {
    updateSEO(hash);
    main.innerHTML = renderTenant();
  } else if (hash.startsWith('#/tiket')) {
    updateSEO(hash);
    main.innerHTML = renderTickets();
  } else if (hash.startsWith('#/admin')) {
    updateSEO(hash);
    main.innerHTML = renderAdminDashboard();
  } else {
    updateSEO('#/');
    main.innerHTML = renderHome();
  }
}

document.addEventListener('keydown', function(ev) {
  if (ev.key !== 'Enter') return;
  const t = ev.target;
  if (!t || t.tagName !== 'INPUT') return;
  const box = t.closest('[data-form-handler]');
  if (!box) return;
  ev.preventDefault();
  const fn = window[box.getAttribute('data-form-handler')];
  if (typeof fn === 'function') fn({ preventDefault() {} });
});

document.addEventListener('click', (e) => {
  if (state.superSelectOpen && !e.target.closest('.super-select-panel') && !e.target.closest('.super-select-icon-btn')) {
    state.superSelectOpen = false;
    renderHeaderAndDock();
  }
  const scrollTarget = e.target.closest('[data-scroll]');
  if (scrollTarget) {
    e.preventDefault();
    const id = scrollTarget.getAttribute('data-scroll');
    if (state.currentRoute !== '#/') navigateTo('#/');
    setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 60);
    return;
  }
  const link = e.target.closest('a[href^="#/"]');
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute('href') || '#/');
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash && window.location.hash !== state.currentRoute) {
    state.currentRoute = window.location.hash;
    router();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapFromServer);
} else {
  bootstrapFromServer();
}
