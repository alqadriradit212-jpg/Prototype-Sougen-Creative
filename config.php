<?php
declare(strict_types=1);

/**
 * Konfigurasi Database MySQL & Helper Keamanan REST API
 * Sougen Creative Management — PBL Pemrograman Web
 *
 * Ubah DB_HOST, DB_NAME, DB_USER, DB_PASS sesuai XAMPP / Laragon / Hosting / VPS Anda.
 */

define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'sougen_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

date_default_timezone_set('Asia/Makassar');

// Header REST API JSON & CORS
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonResponse(array $payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getJsonBody(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function cleanStr($val, int $maxLen = 255): string {
    $s = trim((string)($val ?? ''));
    if (mb_strlen($s, 'UTF-8') > $maxLen) {
        $s = mb_substr($s, 0, $maxLen, 'UTF-8');
    }
    return $s;
}

function getPDO(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_PORT, DB_NAME);
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        upgradeSeedPasswords($pdo);
        return $pdo;
    } catch (PDOException $e) {
        jsonResponse([
            'ok' => false,
            'error' => 'Koneksi database MySQL gagal. Pastikan MySQL aktif dan sougen_db.sql sudah diimpor.',
            'detail' => $e->getMessage()
        ], 500);
    }
}

/**
 * Mengonversi password seed ('SEED:admin123') menjadi hash bcrypt sungguhan saat pertama dijalankan.
 */
function upgradeSeedPasswords(PDO $pdo): void {
    try {
        $stmt = $pdo->query("SELECT id, password_hash FROM users WHERE password_hash LIKE 'SEED:%'");
        $rows = $stmt->fetchAll();
        if (!$rows) return;
        $upd = $pdo->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
        foreach ($rows as $row) {
            $plain = substr($row['password_hash'], 5);
            $upd->execute([password_hash($plain, PASSWORD_BCRYPT), $row['id']]);
        }
    } catch (Throwable $e) {
        // Abaikan jika tabel belum siap
    }
}

function getBearerToken(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$header && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $header = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    if (preg_match('/Bearer\s+([A-Za-z0-9._-]+)/i', $header, $m)) {
        return $m[1];
    }
    return null;
}

function getAuthUser(PDO $pdo): ?array {
    $token = getBearerToken();
    if (!$token) return null;

    $stmt = $pdo->prepare(
        "SELECT u.id, u.name, u.email, u.phone, u.role
         FROM auth_tokens t
         JOIN users u ON u.id = t.user_id
         WHERE t.token = ? AND t.expires_at > NOW()
         LIMIT 1"
    );
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    return $user ?: null;
}

function requireAdmin(PDO $pdo): array {
    $user = getAuthUser($pdo);
    if (!$user || $user['role'] !== 'admin') {
        jsonResponse(['ok' => false, 'error' => 'Akses ditolak. Fitur ini khusus Admin Sougen Creative.'], 403);
    }
    return $user;
}

function issueToken(PDO $pdo, int $userId): string {
    $token = bin2hex(random_bytes(32));
    $stmt = $pdo->prepare("INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))");
    $stmt->execute([$userId, $token]);
    return $token;
}
