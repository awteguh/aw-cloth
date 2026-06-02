# AW Cloth — Landing Page

Landing page brand fashion **AW Cloth** (kaos & celana pendek) dibuat dengan **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS v4**.

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:3000
```

Build produksi:

```bash
npm run build
npm start
```

## ✏️ Cara Mengganti Konten (untuk non-programmer)

Semua data yang sering diubah ada di folder **`src/data/`**. Cukup edit file di sana, **tidak perlu menyentuh kode tampilan**.

| File | Untuk mengubah |
|------|----------------|
| `src/data/site.ts` | Nama brand, tagline, **nomor WhatsApp**, link Shopee/Tokopedia/Instagram, kontak, menu |
| `src/data/products.ts` | Daftar produk (nama, harga, gambar, ukuran, warna, link beli) |
| `src/data/collections.ts` | Kategori koleksi (Kaos, Celana Pendek, dll) |
| `src/data/testimonials.ts` | Ulasan pelanggan |
| `src/data/faq.ts` | Pertanyaan & jawaban |
| `src/data/promo.ts` | Teks hero (bagian atas) & banner promo |

### Menambah produk baru
Buka `src/data/products.ts`, salin satu blok produk, lalu ubah isinya. Pastikan:
- `slug` unik (jadi alamat halaman: `/produk/<slug>`)
- `category` cocok dengan salah satu `id` di `collections.ts`
- `featured: true` jika ingin tampil menonjol

### Mengganti nomor WhatsApp
Di `src/data/site.ts`, ubah `whatsappNumber`. Format: kode negara + nomor **tanpa `+`, spasi, atau angka 0 di depan**. Contoh: `6281234567890`.

### Mengganti gambar
Isi `images` di `products.ts` bisa berupa link (mis. Unsplash) atau file lokal.
Untuk file lokal: taruh gambar di `public/images/` lalu tulis `"/images/nama.jpg"`.

> Jika memakai domain gambar selain `images.unsplash.com`, tambahkan domainnya di `next.config.ts` (bagian `remotePatterns`).

## 🎨 Tampilan
- **Warna:** Hitam `#0A0A0A`, Putih `#FFFFFF`, Oranye `#FF5C00` — diatur di `src/app/globals.css` (bagian `@theme`).
- **Font logo:** Elnath (`public/fonts/Elnath/ELNATH.otf` & `.ttf`), dipakai khusus untuk logo "AW Cloth". Diatur di `src/app/globals.css`.

## Struktur
```
src/
  app/
    page.tsx                # halaman utama (landing)
    produk/[slug]/page.tsx  # halaman detail produk
    layout.tsx, globals.css
  components/                # komponen tampilan
  data/                      # << EDIT KONTEN DI SINI
  lib/links.ts               # helper WhatsApp & format harga
```
