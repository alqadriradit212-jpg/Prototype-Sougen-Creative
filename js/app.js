// =========================================================================
// SOUGEN CREATIVE - Main Application
// =========================================================================

const state = {
  apiConnected: false,
  authToken: localStorage.getItem(TOKEN_KEY) || '',
  currentRoute: window.location.hash || '#/',
  isLoggedIn: false,
  userEmail: '',
  userName: '',
  userRole: 'visitor',
  adminSubTab: 'scanner',
  adminSearch: '',
  filter: 'all',
  galleryFilter: 'semua',
  payMethod: 'QRIS',
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

// =========================================================================
// UTILITY FUNCTIONS
// =========================================================================

function escapeHTML(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

// =========================================================================
// INITIALIZATION
// =========================================================================

async function bootstrapFromServer() {
  try {
    const data = await apiRequest('bootstrap', 'GET');
    state.apiConnected = true;
    if (Array.isArray(data.events)) state.events = data.events;
    if (Array.isArray(data.boothSlots)) state.boothSlots = data.boothSlots;
    if (Array.isArray(data.gallery)) state.galleryItems = data.gallery;
    if (Array.isArray(data.partners) && data.partners.length) state.partners = data.partners;
    if (Array.isArray(data.tickets)) state.tickets = data.tickets;
    if (data.user) {
      state.isLoggedIn = true;
      state.userEmail = data.user.email;
      state.userName = data.user.name;
      state.userRole = data.user.role;
    }
    const firstAvail = state.boothSlots.find(s => s.available);
    if (firstAvail && !state.boothSlots.find(s => s.code === state.selectedBoothSlot && s.available)) {
      state.selectedBoothSlot = firstAvail.code;
    }
  } catch (err) {
    state.apiConnected = false;
    loadLocalFallback();
  }
  router();
}

// =========================================================================
// SEO DYNAMIC UPDATER
// =========================================================================

function updateSEO(route, evObj) {
  let title = 'Sougen Creative · Event Jepang di Indonesia';
  let desc = 'Katalog event Sougen Creative, tiket presale, sewa booth tenant UMKM, dan e-ticket QR otomatis dalam satu alur.';
  if (route.startsWith('#/event/') && evObj) {
    title = `${evObj.title} · Tiket & Info | Sougen Creative`;
    desc = `${evObj.title} (${evObj.date} di ${evObj.location}). ${evObj.desc}`;
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
    title = 'E-Ticket QR Saya · Sougen Creative';
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

// =========================================================================
// NAVIGATION
// =========================================================================

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

// =========================================================================
// HEADER RENDERING
// =========================================================================

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
    .concat(state.isLoggedIn ? [['Sewa booth', '#/tenant']] : []);
  root.innerHTML = `
    <div class="super-select-panel ${state.superSelectOpen ? 'show' : ''}" onclick="event.stopPropagation()">
      <div class="super-select-grid">
        ${superItems.map((it, i) => `<button type="button" class="super-item" onclick="selectSuperOption('${it[1]}')"><span class="super-item-idx">${String(i + 1).padStart(2, '0')}</span><span>${it[0]}</span></button>`).join('')}
      </div>
    </div>
  `;
}

// =========================================================================
// ROUTING
// =========================================================================

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
  if (!state.isLoggedIn && (hash.startsWith('#/tenant') || hash.startsWith('#/event/') || hash.startsWith('#/tiket'))) {
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

// =========================================================================
// EVENT HANDLERS
// =========================================================================

window.setAdminSubTab = function(tab) { 
  state.adminSubTab = tab; 
  state.adminSearch = ''; 
  router(); 
};

window.setAdminSearch = function(val) {
  state.adminSearch = val;
  router();
  const input = document.getElementById('admin-search-input');
  if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
};

window.changeTicketQty = function(delta) {
  const next = (state.ticketQty || 1) + delta;
  if (next < 1 || next > 4) return;
  state.ticketQty = next;
  router();
};

window.toggleVideoAcc = function(key) { 
  state.openAcc[key] = !state.openAcc[key]; 
  router(); 
};

window.selectPayMethod = function(m) { 
  state.payMethod = m; 
  router(); 
};

window.selectBoothPkgCard = function(shortName) { 
  state.selectedBoothPkg = shortName; 
  router(); 
};

window.selectBoothSlot = function(slotCode) { 
  state.selectedBoothSlot = slotCode; 
  router(); 
};

window.setGalleryFilter = function(f) { 
  state.galleryFilter = f; 
  router(); 
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

// =========================================================================
// MODAL HANDLERS
// =========================================================================

window.closeModal = function() { 
  const r = document.getElementById('modal-root'); 
  if (r) r.innerHTML = ''; 
};

window.fillDemoAccount = function(role) {
  const acc = role === 'admin' ? DEMO_ADMIN : DEMO_USER;
  const e = document.getElementById('login-email');
  const p = document.getElementById('login-password');
  if (e) e.value = acc.email;
  if (p) p.value = acc.password;
};

window.switchAuthTab = function(mode) { 
  state.authMode = mode; 
  openAuthModal(mode); 
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

// =========================================================================
// AUTHENTICATION
// =========================================================================

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
      state.userEmail = res.user.email;
      state.userName = res.user.name;
      state.userRole = res.user.role;
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
    state.isLoggedIn = true; state.userEmail = email; state.userRole = 'admin'; state.userName = 'Admin Sougen'; state.adminSubTab = 'scanner';
    closeModal(); showToast('Selamat datang di Panel Admin Sougen!'); navigateTo('#/admin'); return;
  }
  const reg = state.registeredUsers.find(u => u.email.toLowerCase() === email && u.password === password);
  if (!reg) { fail('Email atau password salah. Gunakan akun demo di bawah.'); return; }
  state.isLoggedIn = true; state.userEmail = email; state.userRole = 'visitor'; state.userName = reg.name;
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
      state.isLoggedIn = true; state.userEmail = res.user.email; state.userName = res.user.name; state.userRole = 'visitor';
      closeModal(); showToast(`Registrasi MySQL Berhasil! Selamat datang, ${name}.`); afterAuthRedirect();
      return;
    } catch (apiErr) {
      showToast(apiErr.message);
      return;
    }
  }

  state.registeredUsers.push({ name, email, phone, password, role: 'visitor' });
  saveLocalFallback();
  state.isLoggedIn = true; state.userEmail = email; state.userName = name; state.userRole = 'visitor';
  closeModal(); showToast(`Registrasi Berhasil! Selamat datang, ${name}.`); afterAuthRedirect();
};

window.logoutUser = async function() {
  if (state.apiConnected && state.authToken) {
    try { await apiRequest('auth/logout', 'POST'); } catch (e) {}
  }
  state.authToken = '';
  localStorage.removeItem(TOKEN_KEY);
  state.isLoggedIn = false; state.userEmail = ''; state.userName = ''; state.userRole = 'visitor'; state.scanResult = null;
  showToast('Anda telah keluar dari akun.');
  navigateTo('#/');
};

// =========================================================================
// CHECKOUT & PAYMENT
// =========================================================================

window.openQuickTicketCheckout = async function(slug) {
  const ev = state.events.find(x => x.slug === slug) || state.events[0];
  const qty = state.ticketQty || 1;
  const holderName = state.isLoggedIn && state.userName ? state.userName : 'Pengunjung Sougen';
  const totalAmount = (ev.price || 0) * qty;

  const newOrder = {
    eventTitle: ev.title,
    date: ev.date,
    location: ev.location,
    holder: holderName,
    contact: state.userEmail || '081234567890',
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
    navigateTo('#/tiket');
  }
};

async function persistNewOrder(order) {
  if (state.apiConnected) {
    const res = await apiRequest('tickets', 'POST', order);
    state.tickets.unshift(res.data);
    if (order.boothSlot) {
      const sl = await apiRequest('booth-slots', 'GET');
      state.boothSlots = sl.data;
    }
    showToast(`Transaksi #${res.data.code} tersimpan ke MySQL!`);
    return res.data;
  } else {
    const prefix = order.category === 'Sewa Tenant' ? 'TNT-2026-' : (order.amount > 0 ? 'SG-2026-' : 'FREE-2026-');
    const created = {
      id: Date.now(),
      code: prefix + Math.floor(1000 + Math.random() * 9000),
      ...order,
      time: 'Baru saja · Otomatis',
      checkedIn: false,
      checkInTime: null
    };
    state.tickets.unshift(created);
    if (order.boothSlot) {
      state.boothSlots = state.boothSlots.map(s => s.code === order.boothSlot ? { ...s, available: false } : s);
    }
    saveLocalFallback();
    showToast(`Transaksi #${created.code} berhasil diterbitkan!`);
    return created;
  }
}

window.openPaymentGatewayModal = function(orderData) {
  window.__pendingOrder = orderData;
  const root = document.getElementById('modal-root');
  if (!root) return;
  const isQRIS = orderData.method === 'QRIS';
  const isVA = orderData.method === 'Transfer VA';
  const invoiceId = 'INV-SOUGEN-' + Math.floor(100000 + Math.random() * 900000);

  root.innerHTML = `
    <div class="modal-backdrop" id="pg-backdrop">
      <div class="modal-box" style="max-width:440px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span class="us-pill">PAYMENT GATEWAY · ${escapeHTML(orderData.method)}</span>
          <span style="font-family:monospace;font-size:0.75rem;color:var(--muted);">${invoiceId}</span>
        </div>
        <h3 style="font-family:var(--font-serif);font-size:1.35rem;color:var(--text);margin-bottom:4px;">Selesaikan Pembayaran</h3>
        <p style="font-size:0.82rem;color:var(--muted);margin-bottom:14px;">${escapeHTML(orderData.eventTitle)} · ${escapeHTML(orderData.type)}</p>
        <div style="background:#F0F9FF;border:1.5px solid var(--line-strong);border-radius:var(--radius-md);padding:16px;text-align:center;margin-bottom:16px;">
          ${isQRIS ? `<div style="font-size:0.85rem;color:var(--tosca);font-weight:700;margin-bottom:8px;">Scan QRIS Sougen Creative Management</div>` : isVA ? `<div style="font-family:monospace;font-size:1.15rem;font-weight:800;color:var(--gold);margin-bottom:6px;">VA 8801081234567890</div>` : `<div style="font-weight:700;color:var(--tosca);margin-bottom:6px;">E-Wallet · ${escapeHTML(orderData.contact)}</div>`}
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:0.8rem;color:var(--muted);">Total Bayar:</span>
            <strong style="font-size:1.2rem;color:var(--gold);">${formatRupiah(orderData.amount)}</strong>
          </div>
        </div>
        <div style="display:grid;gap:8px;">
          <button type="button" class="btn btn-gold" style="width:100%;" onclick="confirmGatewayPayment()">Lakukan Simulasi Pembayaran</button>
          <button type="button" class="btn btn-ghost btn-sm" style="width:100%;" onclick="closeModal()">Batal</button>
        </div>
      </div>
    </div>
  `;
};

window.confirmGatewayPayment = async function() {
  const order = window.__pendingOrder;
  if (!order) return;
  window.__pendingOrder = null;
  closeModal();
  try {
    await persistNewOrder(order);
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

// =========================================================================
// SCANNER
// =========================================================================

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

// =========================================================================
// CSV EXPORT
// =========================================================================

window.exportAdminCSV = function(kind) {
  const tab = kind || (state.adminSubTab === 'tenants' ? 'tenants' : 'transactions');
  const cell = (v) => '"' + String(v === undefined || v === null ? '' : v).replace(/"/g, '""') + '"';
  const gate = (t) => (t.checkedIn ? 'SUDAH CHECK-IN' + (t.checkInTime ? ' (' + t.checkInTime + ')' : '') : 'BELUM CHECK-IN');
  const list = tab === 'tenants' ? state.tickets.filter(t => t.category === 'Sewa Tenant') : state.tickets.filter(t => t.category !== 'Sewa Tenant');
  const header = ['Kode', 'Waktu', 'Nama / Brand', 'Kontak', 'Event', 'Kategori', 'Jenis', 'Metode', 'Nominal', 'Status', 'Gate'];
  const rows = list.map(t => [t.code, t.time, t.holder, t.contact, t.eventTitle, t.category, t.type, t.method, t.amount, t.status, gate(t)]);
  const csv = '\ufeff' + [header].concat(rows).map(r => r.map(cell).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = tab === 'tenants' ? 'Data_Tenant_Sougen_2026.csv' : 'Rekap_Tiket_Sougen_2026.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('File CSV berhasil diunduh!');
};

// =========================================================================
// RENDER FUNCTIONS
// =========================================================================

function renderHomeCard(ev) {
  const badgeClass = ev.isPaid ? 'badge-paid' : 'badge-free';
  return `
    <article class="event-card">
      <div class="event-thumb" style="background:${ev.themeGrad}.">
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

function partnerGridHTML(limit) {
  return `<div class="gl-partners">${state.partners.slice(0, limit || state.partners.length).map(p => `
    <div class="gl-partner">
      <div class="gl-logo">${escapeHTML(p.ini)}</div>
      <strong>${escapeHTML(p.name)}</strong>
      <span>${escapeHTML(p.type)}</span>
    </div>`).join('')}</div>`;
}
