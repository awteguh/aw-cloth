// =============================================================
//  KONFIGURASI UTAMA SITUS — EDIT DI SINI
//  Ubah nama brand, kontak, link sosial media & marketplace.
// =============================================================

export const site = {
  // Identitas brand
  brand: "AW Cloth",
  tagline: "Kaos & celana pendek esensial untuk gaya sehari-hari.",
  description:
    "AW Cloth menghadirkan kaos dan celana pendek dengan bahan nyaman, potongan modern, dan harga yang masuk akal.",

  // Kontak
  email: "halo@awcloth.id",
  phone: "+62 812-3456-7890",
  address: "Jakarta, Indonesia",

  // Nomor WhatsApp untuk tombol "Beli" — format internasional TANPA tanda + atau spasi
  // Contoh: 62 untuk Indonesia, lalu nomor tanpa angka 0 di depan.
  whatsappNumber: "6281234567890",

  // Link sosial media & marketplace (kosongkan "" jika tidak dipakai)
  social: {
    instagram: "https://instagram.com/awcloth.id",
    tiktok: "https://tiktok.com/@awcloth.id",
    shopee: "https://shopee.co.id/awcloth",
    tokopedia: "https://tokopedia.com/awcloth",
  },

  // Menu navigasi (href mengarah ke id section di halaman utama)
  nav: [
    { label: "Koleksi", href: "#koleksi" },
    { label: "Tentang", href: "#tentang" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ],
} as const;

export type Site = typeof site;
