# Event Ticketing Management API

REST API untuk mengelola event dan pemesanan tiket yang dibangun menggunakan Node.js, Express.js, MySQL, dan Prisma ORM. Project ini dibuat untuk mempelajari pengembangan backend, autentikasi, otorisasi, pengelolaan transaksi, serta keamanan API.

## Fitur Utama

- **Autentikasi pengguna:** Registrasi, login, dan autentikasi menggunakan JSON Web Token (JWT).
- **Role-Based Access Control (RBAC):** Pembatasan akses berdasarkan peran `ADMIN`, `ORGANIZER`, dan `CUSTOMER`.
- **Manajemen event:** Membuat, melihat, memperbarui, dan menghapus event.
- **Manajemen tiket:** Mengelola tiket, harga, dan stok tiket untuk setiap event.
- **Pemesanan tiket:** Membuat pesanan dengan validasi ketersediaan stok.
- **Simulasi pembayaran:** Mengubah status pesanan menjadi `PAID`.
- **Pembatalan pesanan:** Membatalkan pesanan dan mengembalikan stok tiket.
- **Otomatisasi kedaluwarsa pesanan:** Mengubah pesanan yang belum dibayar setelah batas waktu tertentu menjadi `EXPIRED`.
- **Validasi request:** Menggunakan Zod untuk memvalidasi data yang masuk.
- **Keamanan API:** Menggunakan Helmet, CORS, dan rate limiting.
- **Dokumentasi API:** Menggunakan Swagger UI untuk melihat dan mencoba endpoint secara interaktif.

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Node.js | Runtime JavaScript |
| Express.js | Framework untuk membangun REST API |
| MySQL | Database relasional |
| Prisma ORM | Mengelola akses database |
| JWT | Autentikasi berbasis token |
| bcrypt | Melakukan hashing password |
| Zod | Validasi data request |
| Swagger | Dokumentasi dan pengujian endpoint API |
| Helmet | Menambahkan HTTP security headers |
| CORS | Mengatur akses lintas origin |
| express-rate-limit | Membatasi jumlah request API |

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js dan npm
- MySQL, misalnya melalui XAMPP
- Git

Project ini dijalankan secara lokal dan tidak memerlukan Docker.

## Instalasi dan Konfigurasi

### 1. Clone repository

```bash
git clone https://github.com/mhmdiqb/event-ticketing-api.git
cd event-ticketing-api
```

### 2. Instal dependency

```bash
npm install
```

### 3. Buat database

Jalankan MySQL melalui XAMPP, kemudian buat database bernama:

```sql
CREATE DATABASE event_ticketing;
```

Pastikan port MySQL sesuai dengan konfigurasi lokal.

### 4. Konfigurasi environment

Buat file `.env` di direktori utama project:

```env
DATABASE_URL="mysql://root:@localhost:3307/event_ticketing"
JWT_SECRET="ganti-dengan-secret-yang-aman"
```

Sesuaikan username, password, dan port MySQL dengan konfigurasi perangkat masing-masing.

**Catatan:** Jangan mengunggah file `.env` atau secret asli ke repository publik.

### 5. Jalankan migrasi database

```bash
npx prisma migrate dev
```

Kemudian generate Prisma Client jika diperlukan:

```bash
npx prisma generate
```

### 6. Jalankan server

Gunakan perintah development yang tersedia pada `package.json`:

```bash
npm run dev
```

Jika berhasil, API dapat diakses melalui:

```text
http://localhost:3000
```

## Dokumentasi API

Dokumentasi interaktif menggunakan Swagger UI tersedia di:

```text
http://localhost:3000/api-docs
```

Swagger dapat digunakan untuk melihat endpoint, memahami parameter dan request body, serta mencoba request API.

Untuk endpoint yang memerlukan autentikasi, lakukan login terlebih dahulu dan gunakan JWT melalui fitur **Authorize** di Swagger UI.

## Daftar Endpoint

Semua endpoint berikut menggunakan prefix `/api`.

### Auth

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/auth/register` | Registrasi pengguna |
| POST | `/auth/login` | Login pengguna |
| GET | `/auth/me` | Mendapatkan informasi pengguna yang sedang login |
| GET | `/auth/admin-test` | Menguji akses khusus admin |

### Events

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/events` | Mendapatkan daftar event |
| GET | `/events/:id` | Mendapatkan detail event |
| POST | `/events` | Membuat event |
| PUT | `/events/:id` | Memperbarui event |
| DELETE | `/events/:id` | Menghapus event |

### Tickets

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/events/:eventId/tickets` | Membuat tiket untuk event |
| GET | `/events/:eventId/tickets` | Mendapatkan tiket berdasarkan event |
| GET | `/tickets/:id` | Mendapatkan detail tiket |
| PUT | `/tickets/:id` | Memperbarui tiket |
| DELETE | `/tickets/:id` | Menghapus tiket |

### Orders

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/orders` | Membuat pesanan |
| GET | `/orders` | Mendapatkan daftar pesanan pengguna |
| GET | `/orders/:id` | Mendapatkan detail pesanan |
| POST | `/orders/:id/pay` | Melakukan simulasi pembayaran |
| POST | `/orders/:id/cancel` | Membatalkan pesanan |
| POST | `/orders/:id/expire` | Mengubah pesanan menjadi kedaluwarsa |

**Catatan autentikasi:** Endpoint yang memerlukan login harus menyertakan JWT pada header `Authorization`. Akses endpoint manajemen event dan tiket juga dibatasi berdasarkan role sesuai middleware yang diterapkan.

## Status Pesanan

Pesanan menggunakan status berikut:

| Status | Keterangan |
|---|---|
| `PENDING` | Pesanan menunggu pembayaran |
| `PAID` | Pesanan telah dibayar melalui simulasi pembayaran |
| `CANCELLED` | Pesanan dibatalkan |
| `EXPIRED` | Pesanan melewati batas waktu pembayaran |

Pesanan yang kedaluwarsa secara otomatis diproses oleh service yang berjalan berkala. Ketika pesanan dibatalkan atau kedaluwarsa, stok tiket dikembalikan melalui transaksi database.

## Struktur Project

```text
event-ticketing-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   ├── lib/
│   │   └── prisma.js
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

Folder `controllers` berisi logika pemrosesan request, `routes` mengatur endpoint, `middlewares` menangani autentikasi dan validasi, `services` menangani proses pendukung seperti kedaluwarsa pesanan, sedangkan `validations` berisi skema validasi menggunakan Zod.

## Tujuan Project

Project ini dikembangkan sebagai sarana pembelajaran backend development dengan fokus pada:

- Perancangan REST API.
- Relasi dan transaksi database menggunakan MySQL dan Prisma ORM.
- Autentikasi JWT dan otorisasi berdasarkan role.
- Validasi input dan penanganan error.
- Pengelolaan stok tiket dan status pesanan.
- Penerapan middleware keamanan.
- Dokumentasi API menggunakan Swagger.

## Pengembangan Selanjutnya

Beberapa pengembangan yang dapat ditambahkan:

- Automated testing menggunakan Jest dan Supertest.
- Integrasi payment gateway.
- Logging dan monitoring API.
- Penyempurnaan dokumentasi serta penanganan error.
- Deployment ke server atau platform cloud.

## Author

**Muhammad Raga Rahman**

GitHub: [@mhmdiqb](https://github.com/mhmdiqb)
