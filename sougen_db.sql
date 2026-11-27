-- ============================================================
-- DATABASE SCHEMA: SOUGEN CREATIVE MANAGEMENT (MySQL 8 / MariaDB)
-- Project-Based Learning (PBL) Praktikum Desain & Pemrograman Web
-- ============================================================

CREATE DATABASE IF NOT EXISTS `sougen_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `sougen_db`;

-- ------------------------------------------------------------
-- 1. Tabel users (Autentikasi Admin EO & Pengunjung)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(160) NOT NULL,
  `phone` VARCHAR(30) DEFAULT '',
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'visitor') NOT NULL DEFAULT 'visitor',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Tabel auth_tokens (Bearer Token Session untuk REST API)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `auth_tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(128) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_auth_token` (`token`),
  KEY `idx_auth_user` (`user_id`),
  CONSTRAINT `fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Tabel events (Katalog Event Akan Datang & Arsip)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(140) NOT NULL,
  `title` VARCHAR(180) NOT NULL,
  `status` ENUM('upcoming', 'past') NOT NULL DEFAULT 'upcoming',
  `is_paid` TINYINT(1) NOT NULL DEFAULT 1,
  `price` INT UNSIGNED NOT NULL DEFAULT 0,
  `price_label` VARCHAR(80) NOT NULL DEFAULT 'Gratis',
  `badge_text` VARCHAR(80) NOT NULL DEFAULT 'GRATIS',
  `event_date` VARCHAR(80) NOT NULL,
  `day_num` VARCHAR(8) NOT NULL DEFAULT '15',
  `month_year` VARCHAR(24) NOT NULL DEFAULT 'NOV 2026',
  `short_date` VARCHAR(32) NOT NULL DEFAULT '15. 11. 2026',
  `event_time` VARCHAR(60) NOT NULL DEFAULT '10.00-21.00 WITA',
  `location` VARCHAR(180) NOT NULL,
  `city` VARCHAR(80) NOT NULL DEFAULT 'Makassar',
  `poster_num` VARCHAR(8) NOT NULL DEFAULT '01',
  `kanji` VARCHAR(24) NOT NULL DEFAULT '祭り',
  `poster_title` VARCHAR(100) NOT NULL DEFAULT 'SOUGEN EVENT',
  `poster_bg` VARCHAR(40) NOT NULL DEFAULT '#93C5FD',
  `quota` VARCHAR(80) NOT NULL DEFAULT 'PENDAFTARAN DIBUKA',
  `theme_grad` VARCHAR(160) NOT NULL DEFAULT 'linear-gradient(135deg, #93C5FD 0%, #38BDF8 100%)',
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_events_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. Tabel booth_slots (Denah Ketersediaan Slot Booth Tenant)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `booth_slots` (
  `code` VARCHAR(16) NOT NULL,
  `area` VARCHAR(60) NOT NULL,
  `available` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. Tabel tickets (Transaksi Tiket Presale, Gratis & Sewa Tenant)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(40) NOT NULL,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `event_id` INT UNSIGNED DEFAULT NULL,
  `event_title` VARCHAR(180) NOT NULL,
  `event_date` VARCHAR(80) NOT NULL,
  `location` VARCHAR(180) NOT NULL,
  `holder` VARCHAR(140) NOT NULL,
  `contact` VARCHAR(120) NOT NULL,
  `category` ENUM('Tiket Presale', 'Tiket Gratis', 'Sewa Tenant') NOT NULL DEFAULT 'Tiket Presale',
  `ticket_type` VARCHAR(140) NOT NULL,
  `booth_slot` VARCHAR(16) DEFAULT NULL,
  `amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `method` VARCHAR(40) NOT NULL DEFAULT 'QRIS',
  `status` VARCHAR(80) NOT NULL DEFAULT 'LUNAS · QRIS',
  `order_time` VARCHAR(80) NOT NULL,
  `checked_in` TINYINT(1) NOT NULL DEFAULT 0,
  `check_in_time` VARCHAR(40) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tickets_code` (`code`),
  KEY `idx_tickets_category` (`category`),
  KEY `idx_tickets_slot` (`booth_slot`),
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tickets_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tickets_slot` FOREIGN KEY (`booth_slot`) REFERENCES `booth_slots` (`code`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. Tabel gallery_items (Dokumentasi Event & Tenant UMKM)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cat` ENUM('event', 'tenant') NOT NULL DEFAULT 'event',
  `title` VARCHAR(160) NOT NULL,
  `meta` VARCHAR(180) NOT NULL,
  `glyph` VARCHAR(8) NOT NULL DEFAULT '祭',
  `tone` VARCHAR(16) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. Tabel partners (Mitra, Komunitas & Sponsor)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `partners` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `type` VARCHAR(60) NOT NULL,
  `ini` VARCHAR(8) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA AWAL (Otomatis di-hash bcrypt oleh api/config.php)
-- ============================================================
INSERT IGNORE INTO `users` (`name`, `email`, `phone`, `password_hash`, `role`) VALUES
  ('Admin Sougen', 'admin@sougen.com', '081234567890', 'SEED:admin123', 'admin'),
  ('Pengunjung Sougen', 'user@gmail.com', '081234567890', 'SEED:user123', 'visitor');

INSERT IGNORE INTO `events`
  (`slug`, `title`, `status`, `is_paid`, `price`, `price_label`, `badge_text`, `event_date`, `day_num`, `month_year`, `short_date`, `event_time`, `location`, `city`, `poster_num`, `kanji`, `poster_title`, `poster_bg`, `quota`, `theme_grad`, `description`)
VALUES
  ('sakura-night-market', 'Sakura Night Market', 'upcoming', 0, 0, 'Gratis', 'GRATIS', 'Min, 6 Des 2026', '06', 'DES\n2026', '06. 12. 2026', '15.00–22.00 WIB', 'Lapangan Sabuga, Bandung', 'Bandung', '02', 'さくら', 'SAKURA\nNIGHT', '#BAE6FD', 'PENDAFTARAN DIBUKA', 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)', 'Pasar malam bertema sakura dengan lampu gantung, stan jajanan Jepang, dan area foto. Masuk gratis, tetapi pengunjung tetap mengambil e-ticket agar antrean check-in lebih cepat.'),
  ('matsuri-sougen-vol-4', 'Matsuri Sougen Vol. 4 · 1st Anniversary', 'upcoming', 1, 35000, 'Rp 35.000', 'BERBAYAR · Rp 35.000', 'Min, 15 Nov 2026', '15', 'NOV\n2026', '15. 11. 2026', '10.00–21.30 WITA', 'Phinisi Point Mall, Makassar', 'Makassar', '01', '祭り', 'MATSURI\nSOUGEN', '#93C5FD', '375 / 500 Tiket Presale', 'linear-gradient(135deg, #93C5FD 0%, #38BDF8 100%)', 'Festival ulang tahun pertama Sougen Creative dengan panggung musik Jepang, dekorasi lentera matsuri, dan 45+ booth tenant kuliner serta merchandise.'),
  ('sougen-anisong-night-2026', 'Sougen Year-End Anisong Party', 'upcoming', 1, 45000, 'Rp 45.000', 'BERBAYAR · Rp 45.000', 'Min, 20 Des 2026', '20', 'DES\n2026', '20. 12. 2026', '16.00–22.30 WITA', 'UpperHills Convention Hall', 'Makassar', '03', '音楽', 'ANISONG\nPARTY', '#A5F3FC', '210 / 400 Tiket Presale', 'linear-gradient(135deg, #A5F3FC 0%, #38BDF8 100%)', 'Konser penutup tahun bersama band komunitas Jepang, DJ Anisong, dan bazar kuliner malam.'),
  ('matsuri-sougen-vol-3', 'Matsuri Sougen Vol. 3 · Summer Fest', 'past', 1, 30000, 'Rp 30.000 (Selesai)', 'SUDAH LEWAT · BERBAYAR', '16 Agustus 2026', '16', 'AGU\n2026', '16. 08. 2026', '10.00–21.00 WITA', 'Trans Studio Mall (1.250 Pengunjung)', 'Makassar', '00', '夏祭', 'SUMMER\nFEST', '#BFDBFE', 'Selesai Terlaksana', 'linear-gradient(135deg, #E2E8F0 0%, #BAE6FD 100%)', 'Event sudah lewat (Berbayar): Festival musim panas yang dihadiri 1.250+ pengunjung dan 38 booth UMKM.'),
  ('sougen-ramadhan-fest-2026', 'Sougen Ramadhan Charity Matsuri', 'past', 0, 0, 'Gratis (Selesai)', 'SUDAH LEWAT · GRATIS', '15 Maret 2026', '15', 'MAR\n2026', '15. 03. 2026', '15.30–21.00 WITA', 'Public Space Courtyard (640 Pengunjung)', 'Makassar', '00', '春祭', 'CHARITY\nMATSURI', '#E0F2FE', 'Selesai Terlaksana', 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)', 'Event sudah lewat (Tidak Berbayar / Gratis): Buka puasa bersama komunitas dan bazar amal kreatif.');

INSERT IGNORE INTO `booth_slots` (`code`, `area`, `available`) VALUES
  ('A-01', 'Zona Kuliner', 1),
  ('A-02', 'Zona Kuliner', 0),
  ('A-03', 'Zona Kuliner', 1),
  ('A-04', 'Zona Kuliner', 1),
  ('B-01', 'Hall Merch', 1),
  ('B-02', 'Hall Merch', 1),
  ('B-03', 'Hall Merch', 0),
  ('B-04', 'Hall Merch', 1),
  ('VIP-1', 'Depan Stage', 1),
  ('VIP-2', 'Depan Stage', 1);

INSERT IGNORE INTO `tickets`
  (`code`, `event_title`, `event_date`, `location`, `holder`, `contact`, `category`, `ticket_type`, `booth_slot`, `amount`, `method`, `status`, `order_time`, `checked_in`, `check_in_time`)
VALUES
  ('SG-2026-8841', 'Matsuri Sougen Vol. 4 · 1st Anniversary', '15 November 2026', 'Phinisi Point Mall, Makassar', 'Pengunjung Sougen', '081234567890', 'Tiket Presale', 'Tiket Presale (x1)', NULL, 35000, 'QRIS', 'LUNAS · QRIS', '04 Nov 2026 · 19:20 WITA', 0, NULL),
  ('TNT-2026-502', 'Matsuri Sougen Vol. 4 · Booth Tenant', '15 November 2026', 'Phinisi Point Mall, Makassar', 'Takoyaki Matsuri Makassar', '081355667788', 'Sewa Tenant', 'Stand Kuliner F&B (Rp 350.000) [Slot A-02]', 'A-02', 350000, 'Transfer VA', 'LUNAS · Transfer VA', '04 Nov 2026 · 18:45 WITA', 1, '18:55 WITA'),
  ('SG-2026-7719', 'Matsuri Sougen Vol. 4 · 1st Anniversary', '15 November 2026', 'Phinisi Point Mall, Makassar', 'Alya Nabila', '082199887766', 'Tiket Presale', 'Tiket Presale (x2)', NULL, 70000, 'E-wallet', 'LUNAS · E-wallet', '04 Nov 2026 · 17:10 WITA', 0, NULL),
  ('FREE-2026-309', 'Sakura Night Market', 'Min, 6 Des 2026', 'Lapangan Sabuga, Bandung', 'Rizky Pratama', '085244332211', 'Tiket Gratis', 'Free Entry Pass (x1)', NULL, 0, 'Gratis (Rp 0)', 'FREE PASS · GRATIS', '04 Nov 2026 · 16:05 WITA', 0, NULL);

INSERT INTO `gallery_items` (`cat`, `title`, `meta`, `glyph`, `tone`)
SELECT * FROM (
  SELECT 'event' AS cat, 'Matsuri Sougen Vol. 3 · Summer Fest' AS title, 'Trans Studio Mall · 16 Agustus 2026' AS meta, '祭' AS glyph, '' AS tone
  UNION ALL SELECT 'event', 'Sougen Ramadhan Charity Matsuri', 'Public Space Courtyard · 15 Maret 2026', '桜', 'v2'
  UNION ALL SELECT 'event', 'Panggung Band & DJ Anisong', 'Dokumentasi pertunjukan musik', '音', 'v3'
  UNION ALL SELECT 'event', 'Kompetisi Cosplay', 'Dokumentasi lomba komunitas', '衣', 'v2'
  UNION ALL SELECT 'tenant', 'Stand Kuliner Jepang', 'Tenant UMKM kuliner', '食', 'v3'
  UNION ALL SELECT 'tenant', 'Booth Merchandise & Ilustrator', 'Tenant komunitas kreatif', '絵', ''
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `gallery_items` LIMIT 1);

INSERT INTO `partners` (`name`, `type`, `ini`)
SELECT * FROM (
  SELECT 'Komunitas Cosplay' AS name, 'Komunitas' AS type, 'KC' AS ini
  UNION ALL SELECT 'Anisong Community', 'Komunitas', 'AC'
  UNION ALL SELECT 'UMKM Kuliner', 'Tenant', 'UK'
  UNION ALL SELECT 'Studio Ilustrator', 'Tenant', 'SI'
  UNION ALL SELECT 'Sponsor Utama', 'Sponsor', 'SU'
  UNION ALL SELECT 'Media Partner', 'Media', 'MP'
  UNION ALL SELECT 'Kampus Mitra', 'Pendidikan', 'KM'
  UNION ALL SELECT 'Hobby Store', 'Sponsor', 'HS'
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `partners` LIMIT 1);
