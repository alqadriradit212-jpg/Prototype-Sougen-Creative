// =========================================================================
// SOUGEN CREATIVE - Template Render Functions
// =========================================================================

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
                  1. Satu E-Ticket ber-QR Code berlaku untuk satu kali scan di pintu masuk (Anti-Duplicate Check-in).<br>
                  2. Tiket yang sudah diterbitkan akan langsung tersimpan di database dan halaman E-Ticket.
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
              <input class="form-input" id="tenant-name" required value="Takoyaki Matsuri Makassar" placeholder="Contoh: Takoyaki Senpai">
            </div>
            <div class="form-group">
              <label class="form-label" for="tenant-contact">Nomor WhatsApp Aktif</label>
              <input class="form-input" id="tenant-contact" required value="081355667788" placeholder="0813...">
            </div>
            <input type="hidden" id="tenant-pkg" value="${escapeHTML(activePkg.shortName)}">
            <div class="form-group">
              <label class="form-label">Metode Pembayaran (Payment Gateway)</label>
              <div class="pay-methods">
                <div class="pay-option ${state.payMethod === 'QRIS' ? 'active' : ''}" onclick="selectPayMethod('QRIS')">QRIS</div>
                <div class="pay-option ${state.payMethod === 'Transfer VA' ? 'active' : ''}" onclick="selectPayMethod('Transfer VA')">Transfer VA</div>
                <div class="pay-option ${state.payMethod === 'E-wallet' ? 'active' : ''}" onclick="selectPayMethod('E-wallet')">E-wallet</div>
              </div>
            </div>
            <button type="button" onclick="submitTenantOrder({ preventDefault() {} })" class="btn btn-gold" style="width:100%;height:48px;border-radius:10px;font-size:0.95rem;">
              Bayar sewa booth (${formatRupiah(activePkg.price)}) via ${escapeHTML(state.payMethod)}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTickets() {
  return `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">04 · E-Ticket Digital Pengunjung</span>
          <h1 class="section-title">E-Ticket Saya</h1>
          <p class="section-sub">Tunjukkan QR Code di bawah ini kepada panitia di pintu masuk lokasi acara.</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" class="btn btn-tosca btn-sm" onclick="window.print()">🖨️ Unduh / Cetak PDF</button>
        </div>
      </div>

      ${state.tickets.map((t) => `
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
              <div><span style="color:var(--muted);display:block;">Nominal</span><strong>${formatRupiah(t.amount)}</strong></div>
              <div><span style="color:var(--muted);display:block;">Status Gate</span><strong style="color:${t.checkedIn ? '#15803D' : 'var(--gold)'};">${t.checkedIn ? `SUDAH CHECK-IN ✓ (${escapeHTML(t.checkInTime || 'Valid')})` : 'MENUNGGU SCAN PANITIA'}</strong></div>
            </div>
            <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:0.78rem;color:var(--muted);">
              📍 Lokasi: ${escapeHTML(t.location)} · ${escapeHTML(t.date)}
            </div>
          </div>
          <div class="ticket-stub">
            <div style="background:#FFFFFF;padding:10px;border-radius:12px;width:118px;height:118px;margin-bottom:8px;">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect width="100" height="100" fill="#FFFFFF"/>
                <rect x="8" y="8" width="24" height="24" fill="none" stroke="#140E2A" stroke-width="5"/>
                <rect x="14" y="14" width="12" height="12" fill="#0284C7"/>
                <rect x="68" y="8" width="24" height="24" fill="none" stroke="#140E2A" stroke-width="5"/>
                <rect x="74" y="14" width="12" height="12" fill="#0284C7"/>
                <rect x="8" y="68" width="24" height="24" fill="none" stroke="#140E2A" stroke-width="5"/>
                <rect x="14" y="74" width="12" height="12" fill="#0284C7"/>
                <rect x="40" y="40" width="20" height="20" fill="#E11D48"/>
              </svg>
            </div>
            <span style="font-size:0.75rem;color:var(--muted);">${escapeHTML(t.code)}</span>
          </div>
        </article>
      `).join('')}
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
      ${showTiles ? `<h2 class="gl-title">Dokumentasi &amp; Tenant</h2><div class="gl-grid">${tiles.map(i => `<article class="gl-tile"><div class="gl-photo ${escapeHTML(i.tone)}" aria-hidden="true">${escapeHTML(i.glyph)}</div><div class="gl-cap"><strong>${escapeHTML(i.title)}</strong><span>${escapeHTML(i.meta)}</span></div></article>`).join('')}</div>` : ''}
      ${showPartners ? `<h2 class="gl-title">Mitra &amp; Sponsor</h2>${partnerGridHTML()}` : ''}
      <div class="video-booth-callout" style="margin-top:22px;">
        <div><h3>Jadi mitra kami</h3><p>Ingin berkolaborasi sebagai sponsor, komunitas, atau tenant UMKM? Hubungi admin Sougen.</p></div>
        <a class="video-booth-btn" href="https://wa.me/6281234567890?text=Halo%20Admin%20Sougen%20Creative" target="_blank" rel="noopener">WhatsApp Admin</a>
      </div>
    </section>
  `;
}

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
                  <td><strong>${escapeHTML(t.holder)}</strong><div style="font-size:0.74rem;color:var(--muted);">${escapeHTML(t.contact)}</div></td>
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
            <thead><tr><th>Judul</th><th>Kategori</th><th>Keterangan</th><th>Aksi CRUD</th></tr></thead>
            <tbody>
              ${list.map(g => `
                <tr>
                  <td><strong>${escapeHTML(g.title)}</strong></td>
                  <td><span class="badge ${g.cat === 'tenant' ? 'badge-free' : 'badge-paid'}">${g.cat === 'tenant' ? 'Tenant UMKM' : 'Event'}</span></td>
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
    <section class="section wrap" style="padding-top:16px;">
      ${tabBody}
    </section>
  `;
}

// =========================================================================
// CRUD MODAL FUNCTIONS
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

window.openGalleryCrudModal = function(editId) {
  const g = editId ? state.galleryItems.find(x => x.id === editId) : null;
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-box" style="max-width:440px;">
        <h3 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:12px;">${g ? 'Edit Gallery' : 'Tambah Item Gallery'}</h3>
        <div class="form-group"><label class="form-label">Judul Dokumentasi</label><input class="form-input" id="gl-title" value="${escapeHTML(g ? g.title : '')}"></div>
        <div class="form-group"><label class="form-label">Keterangan / Tanggal</label><input class="form-input" id="gl-meta" value="${escapeHTML(g ? g.meta : '')}"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group"><label class="form-label">Kategori</label>
            <select class="form-input" id="gl-cat">
              <option value="event" ${!g || g.cat === 'event' ? 'selected' : ''}>Dokumentasi Event</option>
              <option value="tenant" ${g && g.cat === 'tenant' ? 'selected' : ''}>Tenant UMKM</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Simbol Kanji</label><input class="form-input" id="gl-glyph" value="${escapeHTML(g ? g.glyph : '祭')}"></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Batal</button>
          <button type="button" class="btn btn-gold btn-sm" onclick="saveGalleryCrud(${g ? g.id : 'null'})">Simpan</button>
        </div>
      </div>
    </div>
  `;
};

window.saveGalleryCrud = async function(editId) {
  const payload = {
    title: document.getElementById('gl-title').value.trim(),
    meta: document.getElementById('gl-meta').value.trim(),
    cat: document.getElementById('gl-cat').value,
    glyph: document.getElementById('gl-glyph').value.trim() || '祭',
    tone: 'v2'
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
