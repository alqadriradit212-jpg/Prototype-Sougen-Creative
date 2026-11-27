# Sougen Creative Management — Struktur Per Bahasa Pemrograman

Seluruh kode dipisahkan berdasarkan masing-masing bahasa pemrograman:

```text
sougen-creative-per-bahasa/
├── index.html          # HTML (wajib di root agar otomatis terbuka di XAMPP/Hosting)
├── css/
│   └── style.css       # CSS
├── js/
│   └── app.js          # JavaScript
├── php/
│   ├── config.php      # PHP (Koneksi PDO MySQL & Auth)
│   └── index.php       # PHP (REST API CRUD)
├── sql/
│   └── sougen_db.sql   # SQL (Database MySQL 7 Tabel)
└── README.md
```

## Cara Menjalankan di XAMPP
1. Ekstrak folder `sougen-creative-per-bahasa` ke `C:\xampp\htdocs\sougen-creative`.
2. Impor `sql/sougen_db.sql` di phpMyAdmin (`http://localhost/phpmyadmin`).
3. Buka `http://localhost/sougen-creative/` di browser.
