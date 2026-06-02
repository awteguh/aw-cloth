# AW Cloth — Landing Page Design Spec

**Tanggal:** 2026-06-02
**Status:** Disetujui untuk implementasi

## Ringkasan
Landing page + halaman detail produk untuk brand fashion **AW Cloth** (remaja–dewasa, fokus kaos & celana pendek). Konten Bahasa Indonesia, gaya modern minimalis. Semua data yang sering diubah dipisah ke folder `src/data/` agar mudah diedit user tanpa menyentuh kode.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config)
- Static Site Generation (tanpa database/backend)

## Desain Visual
- **Font:** Elnath (via `@font-face` lokal, file di `public/fonts/Elnath.woff2`, fallback `system-ui`)
- **Palet:** Hitam `#0A0A0A`, Putih `#FFFFFF`, Oranye aksen `#FF5C00`
- Banyak white space, tipografi besar, layout bersih.

## Pemisahan Data (`src/data/`)
| File | Isi |
|------|-----|
| `site.ts` | nama brand, tagline, kontak, WhatsApp, link Shopee/Tokopedia/IG, nav links |
| `products.ts` | array produk: id, slug, nama, harga, kategori, gambar[], deskripsi, ukuran[], warna[], link marketplace |
| `collections.ts` | kategori koleksi (Kaos, Celana Pendek) |
| `testimonials.ts` | ulasan pelanggan |
| `faq.ts` | tanya-jawab |
| `promo.ts` | konten hero + banner promo |

## Halaman
- `/` — Navbar, Hero, Koleksi (grid produk), Tentang, Testimoni, Promo/Newsletter, FAQ, Footer
- `/produk/[slug]` — detail produk, di-`generateStaticParams` dari `products.ts`, tombol Beli (WhatsApp + Shopee/Tokopedia)

## Komponen (`src/components/`)
Navbar, Hero, Collections, ProductCard, About, Testimonials, PromoNewsletter, Faq (accordion, client), Footer, BuyButtons, Container.

## Helper (`src/lib/`)
- `links.ts`: `waLink(product)` → `wa.me/<nomor>?text=...`, `formatRupiah(n)`, akses link marketplace.

## Gambar
Placeholder via `images.unsplash.com` (dikonfigurasi di `next.config`). Path ada di `products.ts`, mudah diganti ke file lokal.

## Catatan
- Tombol "Beli" mengarah ke WhatsApp & Shopee/Tokopedia (sesuai pilihan user).
- README berisi panduan edit data & menambahkan file font.
