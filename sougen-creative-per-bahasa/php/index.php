<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

$pdo = getPDO();
$method = $_SERVER['REQUEST_METHOD'];

// Pastikan kolom owner_email tersedia bagi database yang sudah terimpor sebelumnya
try {
    $colCheck = $pdo->query("SHOW COLUMNS FROM tickets LIKE 'owner_email'")->fetch();
    if (!$colCheck) {
        $pdo->exec("ALTER TABLE tickets ADD COLUMN owner_email VARCHAR(160) DEFAULT NULL AFTER user_id");
        $pdo->exec("UPDATE tickets SET owner_email = 'user@gmail.com' WHERE code = 'SG-2026-8841' AND owner_email IS NULL");
        $pdo->exec("UPDATE tickets SET owner_email = 'takoyaki.tenant@gmail.com' WHERE code = 'TNT-2026-502' AND owner_email IS NULL");
        $pdo->exec("UPDATE tickets SET owner_email = 'alya.nabila@gmail.com' WHERE code = 'SG-2026-7719' AND owner_email IS NULL");
        $pdo->exec("UPDATE tickets SET owner_email = 'rizky.pratama@gmail.com' WHERE code = 'FREE-2026-309' AND owner_email IS NULL");
    }
    $glImgCheck = $pdo->query("SHOW COLUMNS FROM gallery_items LIKE 'image'")->fetch();
    if (!$glImgCheck) {
        $pdo->exec("ALTER TABLE gallery_items ADD COLUMN image MEDIUMTEXT DEFAULT NULL AFTER tone");
    }
} catch (Throwable $e) {
    // Abaikan jika tabel belum siap
}

$route = $_GET['route'] ?? '';
if ($route === '') {
    $uriPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
    $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/');
    $route = ltrim(substr($uriPath, strlen($scriptDir)), '/');
    $route = preg_replace('#^index\.php/?#', '', $route);
}
$route = trim($route, '/');
$parts = $route === '' ? [] : explode('/', $route);
$resource = $parts[0] ?? '';
$idParam  = $parts[1] ?? null;

function mapEventRow(array $r): array {
    return [
        'id'          => (int)$r['id'],
        'slug'        => $r['slug'],
        'title'       => $r['title'],
        'status'      => $r['status'],
        'isPaid'      => (bool)$r['is_paid'],
        'price'       => (int)$r['price'],
        'priceLabel'  => $r['price_label'],
        'badgeText'   => $r['badge_text'],
        'date'        => $r['event_date'],
        'dayNum'      => $r['day_num'],
        'monthYear'   => $r['month_year'],
        'shortDate'   => $r['short_date'],
        'time'        => $r['event_time'],
        'location'    => $r['location'],
        'city'        => $r['city'],
        'posterNum'   => $r['poster_num'],
        'kanji'       => $r['kanji'],
        'posterTitle' => $r['poster_title'],
        'posterBg'    => $r['poster_bg'],
        'quota'       => $r['quota'],
        'themeGrad'   => $r['theme_grad'],
        'desc'        => $r['description'],
    ];
}

function mapTicketRow(array $r): array {
    return [
        'id'          => (int)$r['id'],
        'code'        => $r['code'],
        'userId'      => isset($r['user_id']) && $r['user_id'] !== null ? (int)$r['user_id'] : null,
        'ownerEmail'  => $r['owner_email'] ?? '',
        'eventTitle'  => $r['event_title'],
        'date'        => $r['event_date'],
        'location'    => $r['location'],
        'holder'      => $r['holder'],
        'contact'     => $r['contact'],
        'category'    => $r['category'],
        'type'        => $r['ticket_type'],
        'boothSlot'   => $r['booth_slot'],
        'amount'      => (int)$r['amount'],
        'method'      => $r['method'],
        'status'      => $r['status'],
        'time'        => $r['order_time'],
        'checkedIn'   => (bool)$r['checked_in'],
        'checkInTime' => $r['check_in_time'],
    ];
}

function cleanImageData($val): ?string {
    $s = trim((string)($val ?? ''));
    if ($s === '') return null;
    if (strlen($s) > 2500000) return null; // Batas ~2.5MB
    if (preg_match('#^data:image/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$#i', $s)) {
        return $s;
    }
    if (preg_match('#^https?://#i', $s)) {
        return $s;
    }
    return null;
}

function fetchScopedTickets(PDO $pdo, ?array $me): array {
    if (!$me) {
        return [];
    }
    if ($me['role'] === 'admin') {
        $rows = $pdo->query("SELECT * FROM tickets ORDER BY id DESC")->fetchAll();
        return array_map('mapTicketRow', $rows);
    }
    $stmt = $pdo->prepare(
        "SELECT * FROM tickets
         WHERE user_id = ? OR LOWER(COALESCE(owner_email, '')) = ?
         ORDER BY id DESC"
    );
    $stmt->execute([(int)$me['id'], strtolower((string)$me['email'])]);
    return array_map('mapTicketRow', $stmt->fetchAll());
}

try {
    // ========================================================
    // HEALTH CHECK & BOOTSTRAP
    // ========================================================
    if ($resource === '' || $resource === 'health') {
        jsonResponse(['ok' => true, 'service' => 'Sougen Creative PHP + MySQL REST API', 'db' => DB_NAME]);
    }

    if ($resource === 'bootstrap' && $method === 'GET') {
        $events = array_map('mapEventRow', $pdo->query("SELECT * FROM events ORDER BY id ASC")->fetchAll());
        $slots = array_map(fn($s) => [
            'code' => $s['code'],
            'area' => $s['area'],
            'available' => (bool)$s['available']
        ], $pdo->query("SELECT * FROM booth_slots ORDER BY code ASC")->fetchAll());
        $gallery = array_map(fn($g) => [
            'id' => (int)$g['id'],
            'cat' => $g['cat'],
            'title' => $g['title'],
            'meta' => $g['meta'],
            'glyph' => $g['glyph'],
            'tone' => $g['tone'],
            'image' => $g['image'] ?? ''
        ], $pdo->query("SELECT * FROM gallery_items ORDER BY id DESC")->fetchAll());
        $partners = $pdo->query("SELECT id, name, type, ini FROM partners ORDER BY id ASC")->fetchAll();
        $me = getAuthUser($pdo);
        $tickets = fetchScopedTickets($pdo, $me);

        jsonResponse([
            'ok' => true,
            'user' => $me,
            'events' => $events,
            'boothSlots' => $slots,
            'gallery' => $gallery,
            'partners' => $partners,
            'tickets' => $tickets
        ]);
    }

    // ========================================================
    // AUTHENTICATION: LOGIN / REGISTER / LOGOUT
    // ========================================================
    if ($resource === 'auth') {
        $action = $idParam ?? '';
        $body = getJsonBody();

        if ($action === 'login' && $method === 'POST') {
            $email = strtolower(cleanStr($body['email'] ?? '', 160));
            $password = (string)($body['password'] ?? '');
            if ($email === '' || $password === '') {
                jsonResponse(['ok' => false, 'error' => 'Email dan password wajib diisi.'], 422);
            }
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            if (!$user || !password_verify($password, $user['password_hash'])) {
                jsonResponse(['ok' => false, 'error' => 'Email atau password salah.'], 401);
            }
            $token = issueToken($pdo, (int)$user['id']);
            $authUser = [
                'id' => (int)$user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone'],
                'role' => $user['role']
            ];
            jsonResponse([
                'ok' => true,
                'token' => $token,
                'user' => $authUser,
                'tickets' => fetchScopedTickets($pdo, $authUser)
            ]);
        }

        if ($action === 'register' && $method === 'POST') {
            $name = cleanStr($body['name'] ?? '', 120);
            $email = strtolower(cleanStr($body['email'] ?? '', 160));
            $phone = cleanStr($body['phone'] ?? '', 30);
            $password = (string)($body['password'] ?? '');

            if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
                jsonResponse(['ok' => false, 'error' => 'Nama, email valid, dan password minimal 6 karakter wajib diisi.'], 422);
            }
            $check = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
            $check->execute([$email]);
            if ($check->fetch()) {
                jsonResponse(['ok' => false, 'error' => 'Email sudah terdaftar. Silakan masuk.'], 409);
            }
            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'visitor')");
            $stmt->execute([$name, $email, $phone, password_hash($password, PASSWORD_BCRYPT)]);
            $uid = (int)$pdo->lastInsertId();
            $token = issueToken($pdo, $uid);
            $authUser = ['id' => $uid, 'name' => $name, 'email' => $email, 'phone' => $phone, 'role' => 'visitor'];

            jsonResponse([
                'ok' => true,
                'token' => $token,
                'user' => $authUser,
                'tickets' => []
            ], 201);
        }

        if ($action === 'logout' && $method === 'POST') {
            $token = getBearerToken();
            if ($token) {
                $stmt = $pdo->prepare("DELETE FROM auth_tokens WHERE token = ?");
                $stmt->execute([$token]);
            }
            jsonResponse(['ok' => true]);
        }

        jsonResponse(['ok' => false, 'error' => 'Endpoint auth tidak ditemukan.'], 404);
    }

    // ========================================================
    // CRUD 1: EVENTS
    // ========================================================
    if ($resource === 'events') {
        if ($method === 'GET') {
            $rows = array_map('mapEventRow', $pdo->query("SELECT * FROM events ORDER BY id ASC")->fetchAll());
            jsonResponse(['ok' => true, 'data' => $rows]);
        }

        requireAdmin($pdo);
        $body = getJsonBody();

        if ($method === 'POST') {
            $title = cleanStr($body['title'] ?? '', 180);
            $date = cleanStr($body['date'] ?? '', 80);
            $location = cleanStr($body['location'] ?? '', 180);
            $desc = cleanStr($body['desc'] ?? '', 1000);
            if ($title === '' || $date === '' || $location === '') {
                jsonResponse(['ok' => false, 'error' => 'Judul, tanggal, dan lokasi event wajib diisi.'], 422);
            }
            $status = ($body['status'] ?? 'upcoming') === 'past' ? 'past' : 'upcoming';
            $isPaid = !empty($body['isPaid']) ? 1 : 0;
            $price = $isPaid ? max(0, (int)($body['price'] ?? 0)) : 0;
            $slugBase = preg_replace('/[^a-z0-9]+/', '-', strtolower($title));
            $slug = trim($slugBase, '-') . '-' . substr((string)time(), -4);
            $priceLabel = $isPaid ? ('Rp ' . number_format($price, 0, ',', '.')) : 'Gratis';
            $badgeText = $status === 'past'
                ? ('SUDAH LEWAT · ' . ($isPaid ? 'BERBAYAR' : 'GRATIS'))
                : ($isPaid ? ('BERBAYAR · ' . $priceLabel) : 'GRATIS');
            $city = cleanStr($body['city'] ?? 'Makassar', 80);
            $quota = cleanStr($body['quota'] ?? ($status === 'past' ? 'Selesai Terlaksana' : 'PENDAFTARAN DIBUKA'), 80);
            $themeGrad = $status === 'past'
                ? 'linear-gradient(135deg, #E2E8F0 0%, #BAE6FD 100%)'
                : ($isPaid ? 'linear-gradient(135deg, #93C5FD 0%, #38BDF8 100%)' : 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)');

            $stmt = $pdo->prepare(
                "INSERT INTO events (slug, title, status, is_paid, price, price_label, badge_text, event_date, location, city, quota, theme_grad, description, poster_title)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $stmt->execute([$slug, $title, $status, $isPaid, $price, $priceLabel, $badgeText, $date, $location, $city, $quota, $themeGrad, $desc ?: 'Acara komunitas Sougen Creative Management.', strtoupper(substr($title, 0, 24))]);
            $newId = (int)$pdo->lastInsertId();
            $row = $pdo->query("SELECT * FROM events WHERE id = $newId")->fetch();
            jsonResponse(['ok' => true, 'data' => mapEventRow($row)], 201);
        }

        if ($method === 'PUT' && $idParam !== null) {
            $id = (int)$idParam;
            $title = cleanStr($body['title'] ?? '', 180);
            $date = cleanStr($body['date'] ?? '', 80);
            $location = cleanStr($body['location'] ?? '', 180);
            $desc = cleanStr($body['desc'] ?? '', 1000);
            if ($title === '' || $date === '' || $location === '') {
                jsonResponse(['ok' => false, 'error' => 'Judul, tanggal, dan lokasi event wajib diisi.'], 422);
            }
            $status = ($body['status'] ?? 'upcoming') === 'past' ? 'past' : 'upcoming';
            $isPaid = !empty($body['isPaid']) ? 1 : 0;
            $price = $isPaid ? max(0, (int)($body['price'] ?? 0)) : 0;
            $priceLabel = $isPaid ? ('Rp ' . number_format($price, 0, ',', '.')) : 'Gratis';
            $badgeText = $status === 'past'
                ? ('SUDAH LEWAT · ' . ($isPaid ? 'BERBAYAR' : 'GRATIS'))
                : ($isPaid ? ('BERBAYAR · ' . $priceLabel) : 'GRATIS');
            $city = cleanStr($body['city'] ?? 'Makassar', 80);
            $quota = cleanStr($body['quota'] ?? 'PENDAFTARAN DIBUKA', 80);

            $stmt = $pdo->prepare(
                "UPDATE events SET title=?, status=?, is_paid=?, price=?, price_label=?, badge_text=?, event_date=?, location=?, city=?, quota=?, description=? WHERE id=?"
            );
            $stmt->execute([$title, $status, $isPaid, $price, $priceLabel, $badgeText, $date, $location, $city, $quota, $desc, $id]);
            $row = $pdo->query("SELECT * FROM events WHERE id = $id")->fetch();
            if (!$row) jsonResponse(['ok' => false, 'error' => 'Event tidak ditemukan.'], 404);
            jsonResponse(['ok' => true, 'data' => mapEventRow($row)]);
        }

        if ($method === 'DELETE' && $idParam !== null) {
            $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
            $stmt->execute([(int)$idParam]);
            jsonResponse(['ok' => true, 'deleted' => (int)$idParam]);
        }
    }

    // ========================================================
    // CRUD 2 & 3: TICKETS & TENANT ORDERS + GATE QR CHECK-IN
    // ========================================================
    if ($resource === 'tickets') {
        if ($method === 'GET') {
            $me = getAuthUser($pdo);
            jsonResponse(['ok' => true, 'data' => fetchScopedTickets($pdo, $me)]);
        }

        $body = getJsonBody();

        // Gate QR Check-in (Anti-Duplicate) — khusus Admin
        if ($idParam === 'verify' && $method === 'POST') {
            requireAdmin($pdo);
            $code = strtoupper(ltrim(cleanStr($body['code'] ?? '', 40), '#'));
            $stmt = $pdo->prepare("SELECT * FROM tickets WHERE UPPER(code) = ? LIMIT 1");
            $stmt->execute([$code]);
            $ticket = $stmt->fetch();

            if (!$ticket) {
                jsonResponse(['ok' => true, 'result' => 'not_found', 'code' => $code]);
            }
            if ((int)$ticket['checked_in'] === 1) {
                jsonResponse(['ok' => true, 'result' => 'duplicate', 'data' => mapTicketRow($ticket)]);
            }

            $nowStr = date('H:i') . ' WITA';
            $upd = $pdo->prepare("UPDATE tickets SET checked_in = 1, check_in_time = ? WHERE id = ?");
            $upd->execute([$nowStr, $ticket['id']]);
            $ticket['checked_in'] = 1;
            $ticket['check_in_time'] = $nowStr;
            jsonResponse(['ok' => true, 'result' => 'success', 'data' => mapTicketRow($ticket)]);
        }

        // Reset Check-in — khusus Admin
        if ($idParam === 'reset-checkin' && $method === 'POST') {
            requireAdmin($pdo);
            $code = strtoupper(ltrim(cleanStr($body['code'] ?? '', 40), '#'));
            $upd = $pdo->prepare("UPDATE tickets SET checked_in = 0, check_in_time = NULL WHERE UPPER(code) = ?");
            $upd->execute([$code]);
            jsonResponse(['ok' => true, 'code' => $code]);
        }

        // CREATE Ticket / Sewa Tenant (terikat ke akun user yang login)
        if ($method === 'POST') {
            $me = getAuthUser($pdo);
            $holder = cleanStr($body['holder'] ?? ($me ? $me['name'] : ''), 140);
            $contact = cleanStr($body['contact'] ?? ($me ? ($me['phone'] ?: $me['email']) : ''), 120);
            $eventTitle = cleanStr($body['eventTitle'] ?? 'Matsuri Sougen Vol. 4', 180);
            if ($holder === '') {
                jsonResponse(['ok' => false, 'error' => 'Nama pemegang tiket / brand tenant wajib diisi.'], 422);
            }
            $category = in_array($body['category'] ?? '', ['Tiket Presale', 'Tiket Gratis', 'Sewa Tenant'], true)
                ? $body['category'] : 'Tiket Presale';
            $prefix = $category === 'Sewa Tenant' ? 'TNT-2026-' : ($category === 'Tiket Gratis' ? 'FREE-2026-' : 'SG-2026-');
            $code = cleanStr($body['code'] ?? '', 40) ?: ($prefix . random_int(1000, 9999));
            $boothSlot = $category === 'Sewa Tenant' ? cleanStr($body['boothSlot'] ?? '', 16) : null;
            if ($boothSlot === '') $boothSlot = null;

            $pdo->beginTransaction();
            try {
                if ($boothSlot !== null) {
                    $slotStmt = $pdo->prepare("SELECT available FROM booth_slots WHERE code = ? FOR UPDATE");
                    $slotStmt->execute([$boothSlot]);
                    $slotRow = $slotStmt->fetch();
                    if (!$slotRow || (int)$slotRow['available'] === 0) {
                        $pdo->rollBack();
                        jsonResponse(['ok' => false, 'error' => "Slot booth $boothSlot sudah terisi. Pilih slot lain."], 409);
                    }
                    $pdo->prepare("UPDATE booth_slots SET available = 0 WHERE code = ?")->execute([$boothSlot]);
                }

                $uid = $me ? (int)$me['id'] : null;
                $ownerEmail = $me ? strtolower((string)$me['email']) : strtolower(cleanStr($body['ownerEmail'] ?? '', 160));
                $orderTime = date('d M Y · H:i') . ' WITA';
                $amount = max(0, (int)($body['amount'] ?? 0));
                $methodPay = cleanStr($body['method'] ?? ($amount > 0 ? 'QRIS' : 'Gratis (Rp 0)'), 40);
                $status = cleanStr($body['status'] ?? ($amount > 0 ? "LUNAS · $methodPay" : 'FREE PASS · GRATIS'), 80);

                $stmt = $pdo->prepare(
                    "INSERT INTO tickets (code, user_id, owner_email, event_title, event_date, location, holder, contact, category, ticket_type, booth_slot, amount, method, status, order_time)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                );
                $stmt->execute([
                    $code,
                    $uid,
                    $ownerEmail ?: null,
                    $eventTitle,
                    cleanStr($body['date'] ?? '15 November 2026', 80),
                    cleanStr($body['location'] ?? 'Phinisi Point Mall, Makassar', 180),
                    $holder,
                    $contact ?: '081234567890',
                    $category,
                    cleanStr($body['type'] ?? $category, 140),
                    $boothSlot,
                    $amount,
                    $methodPay,
                    $status,
                    $orderTime
                ]);
                $newId = (int)$pdo->lastInsertId();
                $pdo->commit();
                $row = $pdo->query("SELECT * FROM tickets WHERE id = $newId")->fetch();
                jsonResponse(['ok' => true, 'data' => mapTicketRow($row)], 201);
            } catch (Throwable $txErr) {
                if ($pdo->inTransaction()) $pdo->rollBack();
                throw $txErr;
            }
        }

        // UPDATE Ticket / Tenant — khusus Admin
        if ($method === 'PUT' && $idParam !== null) {
            requireAdmin($pdo);
            $id = (int)$idParam;
            $curStmt = $pdo->prepare("SELECT * FROM tickets WHERE id = ?");
            $curStmt->execute([$id]);
            $cur = $curStmt->fetch();
            if (!$cur) jsonResponse(['ok' => false, 'error' => 'Transaksi tidak ditemukan.'], 404);

            $holder = cleanStr($body['holder'] ?? $cur['holder'], 140);
            $contact = cleanStr($body['contact'] ?? $cur['contact'], 120);
            $type = cleanStr($body['type'] ?? $cur['ticket_type'], 140);
            $status = cleanStr($body['status'] ?? $cur['status'], 80);
            $amount = isset($body['amount']) ? max(0, (int)$body['amount']) : (int)$cur['amount'];
            $newSlot = array_key_exists('boothSlot', $body) ? (cleanStr($body['boothSlot'], 16) ?: null) : $cur['booth_slot'];

            $pdo->beginTransaction();
            try {
                if ($cur['booth_slot'] !== $newSlot) {
                    if ($cur['booth_slot']) {
                        $pdo->prepare("UPDATE booth_slots SET available = 1 WHERE code = ?")->execute([$cur['booth_slot']]);
                    }
                    if ($newSlot) {
                        $pdo->prepare("UPDATE booth_slots SET available = 0 WHERE code = ?")->execute([$newSlot]);
                    }
                }
                $upd = $pdo->prepare("UPDATE tickets SET holder=?, contact=?, ticket_type=?, booth_slot=?, amount=?, status=? WHERE id=?");
                $upd->execute([$holder, $contact, $type, $newSlot, $amount, $status, $id]);
                $pdo->commit();
                $row = $pdo->query("SELECT * FROM tickets WHERE id = $id")->fetch();
                jsonResponse(['ok' => true, 'data' => mapTicketRow($row)]);
            } catch (Throwable $txErr) {
                if ($pdo->inTransaction()) $pdo->rollBack();
                throw $txErr;
            }
        }

        // DELETE Ticket / Tenant (otomatis membebaskan slot booth di MySQL) — khusus Admin
        if ($method === 'DELETE' && $idParam !== null) {
            requireAdmin($pdo);
            $id = (int)$idParam;
            $pdo->beginTransaction();
            try {
                $cur = $pdo->prepare("SELECT booth_slot FROM tickets WHERE id = ?");
                $cur->execute([$id]);
                $row = $cur->fetch();
                if ($row && !empty($row['booth_slot'])) {
                    $pdo->prepare("UPDATE booth_slots SET available = 1 WHERE code = ?")->execute([$row['booth_slot']]);
                }
                $pdo->prepare("DELETE FROM tickets WHERE id = ?")->execute([$id]);
                $pdo->commit();
                jsonResponse(['ok' => true, 'deleted' => $id]);
            } catch (Throwable $txErr) {
                if ($pdo->inTransaction()) $pdo->rollBack();
                throw $txErr;
            }
        }
    }

    // ========================================================
    // CRUD 4: GALLERY ITEMS (Mendukung Upload Foto)
    // ========================================================
    if ($resource === 'gallery') {
        if ($method === 'GET') {
            $rows = array_map(fn($g) => [
                'id' => (int)$g['id'],
                'cat' => $g['cat'],
                'title' => $g['title'],
                'meta' => $g['meta'],
                'glyph' => $g['glyph'],
                'tone' => $g['tone'],
                'image' => $g['image'] ?? ''
            ], $pdo->query("SELECT id, cat, title, meta, glyph, tone, image FROM gallery_items ORDER BY id DESC")->fetchAll());
            jsonResponse(['ok' => true, 'data' => $rows]);
        }

        requireAdmin($pdo);
        $body = getJsonBody();

        if ($method === 'POST') {
            $title = cleanStr($body['title'] ?? '', 160);
            $meta = cleanStr($body['meta'] ?? '', 180);
            if ($title === '' || $meta === '') {
                jsonResponse(['ok' => false, 'error' => 'Judul dan keterangan gallery wajib diisi.'], 422);
            }
            $cat = ($body['cat'] ?? 'event') === 'tenant' ? 'tenant' : 'event';
            $glyph = cleanStr($body['glyph'] ?? '祭', 8);
            $tone = in_array($body['tone'] ?? '', ['', 'v2', 'v3'], true) ? $body['tone'] : 'v2';
            $image = cleanImageData($body['image'] ?? '');

            $stmt = $pdo->prepare("INSERT INTO gallery_items (cat, title, meta, glyph, tone, image) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$cat, $title, $meta, $glyph, $tone, $image]);
            $newId = (int)$pdo->lastInsertId();
            jsonResponse(['ok' => true, 'data' => ['id' => $newId, 'cat' => $cat, 'title' => $title, 'meta' => $meta, 'glyph' => $glyph, 'tone' => $tone, 'image' => $image ?? '']], 201);
        }

        if ($method === 'PUT' && $idParam !== null) {
            $id = (int)$idParam;
            $title = cleanStr($body['title'] ?? '', 160);
            $meta = cleanStr($body['meta'] ?? '', 180);
            if ($title === '' || $meta === '') {
                jsonResponse(['ok' => false, 'error' => 'Judul dan keterangan gallery wajib diisi.'], 422);
            }
            $cat = ($body['cat'] ?? 'event') === 'tenant' ? 'tenant' : 'event';
            $glyph = cleanStr($body['glyph'] ?? '祭', 8);
            $tone = in_array($body['tone'] ?? '', ['', 'v2', 'v3'], true) ? $body['tone'] : 'v2';
            $image = cleanImageData($body['image'] ?? '');

            $stmt = $pdo->prepare("UPDATE gallery_items SET cat=?, title=?, meta=?, glyph=?, tone=?, image=? WHERE id=?");
            $stmt->execute([$cat, $title, $meta, $glyph, $tone, $image, $id]);
            jsonResponse(['ok' => true, 'data' => ['id' => $id, 'cat' => $cat, 'title' => $title, 'meta' => $meta, 'glyph' => $glyph, 'tone' => $tone, 'image' => $image ?? '']]);
        }

        if ($method === 'DELETE' && $idParam !== null) {
            $stmt = $pdo->prepare("DELETE FROM gallery_items WHERE id = ?");
            $stmt->execute([(int)$idParam]);
            jsonResponse(['ok' => true, 'deleted' => (int)$idParam]);
        }
    }

    if ($resource === 'booth-slots' && $method === 'GET') {
        $slots = array_map(fn($s) => [
            'code' => $s['code'],
            'area' => $s['area'],
            'available' => (bool)$s['available']
        ], $pdo->query("SELECT * FROM booth_slots ORDER BY code ASC")->fetchAll());
        jsonResponse(['ok' => true, 'data' => $slots]);
    }

    jsonResponse(['ok' => false, 'error' => "Endpoint '$route' tidak ditemukan."], 404);
} catch (Throwable $e) {
    jsonResponse(['ok' => false, 'error' => 'Terjadi kesalahan server.', 'detail' => $e->getMessage()], 500);
}
