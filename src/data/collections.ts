// =============================================================
//  KATEGORI KOLEKSI — EDIT DI SINI
//  "id" dipakai untuk menghubungkan produk ke kategori (lihat products.ts).
// =============================================================

export type Collection = {
  id: string;
  name: string;
  description: string;
};

export const collections: Collection[] = [
  {
    id: "kaos",
    name: "Kaos",
    description: "Kaos katun premium dengan potongan rapi dan warna netral.",
  },
  {
    id: "celana-pendek",
    name: "Celana Pendek",
    description: "Celana pendek ringan dan nyaman untuk aktivitas harian.",
  },
];
