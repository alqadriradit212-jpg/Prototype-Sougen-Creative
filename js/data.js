// =========================================================================
// SOUGEN CREATIVE - Data Configuration
// =========================================================================

const API_BASE = './api/index.php?route=';
const LOCAL_DB_KEY = 'sougen_mysql_fallback_v1';
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
    id: 1, code: 'SG-2026-8841', eventTitle: 'Matsuri Sougen Vol. 4 · 1st Anniversary', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Pengunjung Sougen', contact: '081234567890',
    category: 'Tiket Presale', type: 'Tiket Presale (x1)', boothSlot: null, amount: 35000,
    method: 'QRIS', status: 'LUNAS · QRIS', time: '04 Nov 2026 · 19:20 WITA', checkedIn: false, checkInTime: null
  },
  {
    id: 2, code: 'TNT-2026-502', eventTitle: 'Matsuri Sougen Vol. 4 · Booth Tenant', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Takoyaki Matsuri Makassar', contact: '081355667788',
    category: 'Sewa Tenant', type: 'Stand Kuliner F&B (Rp 350.000) [Slot A-02]', boothSlot: 'A-02', amount: 350000,
    method: 'Transfer VA', status: 'LUNAS · Transfer VA', time: '04 Nov 2026 · 18:45 WITA', checkedIn: true, checkInTime: '18:55 WITA'
  },
  {
    id: 3, code: 'SG-2026-7719', eventTitle: 'Matsuri Sougen Vol. 4 · 1st Anniversary', date: '15 November 2026',
    location: 'Phinisi Point Mall, Makassar', holder: 'Alya Nabila', contact: '082199887766',
    category: 'Tiket Presale', type: 'Tiket Presale (x2)', boothSlot: null, amount: 70000,
    method: 'E-wallet', status: 'LUNAS · E-wallet', time: '04 Nov 2026 · 17:10 WITA', checkedIn: false, checkInTime: null
  },
  {
    id: 4, code: 'FREE-2026-309', eventTitle: 'Sakura Night Market', date: 'Min, 6 Des 2026',
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

const DEMO_ADMIN = { email: 'admin@sougen.com', password: 'admin123' };
const DEMO_USER = { email: 'user@gmail.com', password: 'user123' };

const GALLERY_FILTERS = [['semua', 'Semua'], ['event', 'Dokumentasi Event'], ['mitra', 'Mitra & Sponsor'], ['tenant', 'Tenant UMKM']];
