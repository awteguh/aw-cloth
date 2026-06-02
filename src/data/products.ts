// =============================================================
//  DAFTAR PRODUK — EDIT DI SINI
//  Tambah / hapus / ubah produk di array di bawah ini.
//
//  - slug      : URL produk, mis. "kaos-basic-hitam" -> /produk/kaos-basic-hitam
//  - category  : harus cocok dengan "id" di collections.ts
//  - price     : angka rupiah tanpa titik (mis. 99000)
//  - images    : URL gambar (boleh link Unsplash, atau "/images/nama.jpg" lokal)
//  - featured  : true = tampil di bagian unggulan beranda
//  - shopeeUrl / tokopediaUrl : link beli (kosongkan "" jika tidak ada)
// =============================================================

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  shopeeUrl: string;
  tokopediaUrl: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "kaos-basic-hitam",
    name: "Kaos Basic Hitam",
    category: "kaos",
    price: 99000,
    oldPrice: 129000,
    description:
      "Kaos basic warna hitam dari katun combed 30s. Adem, lembut, dan tidak mudah melar. Cocok untuk dipakai sehari-hari maupun dilayer.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam"],
    featured: true,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
  {
    id: "2",
    slug: "kaos-oversize-putih",
    name: "Kaos Oversize Putih",
    category: "kaos",
    price: 119000,
    description:
      "Kaos oversize warna putih dengan potongan boxy yang sedang tren. Bahan tebal 24s, jatuh sempurna di badan.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=900&q=80",
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Putih"],
    featured: true,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
  {
    id: "3",
    slug: "kaos-graphic-oren",
    name: "Kaos Graphic Oren",
    category: "kaos",
    price: 139000,
    description:
      "Kaos dengan aksen sablon grafis berwarna oranye khas AW Cloth. Statement piece untuk tampilan yang lebih berani.",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Putih"],
    featured: true,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
  {
    id: "4",
    slug: "celana-pendek-chino",
    name: "Celana Pendek Chino",
    category: "celana-pendek",
    price: 149000,
    oldPrice: 179000,
    description:
      "Celana pendek chino bahan twill stretch yang nyaman. Potongan rapi, cocok untuk tampilan kasual yang tetap rapi.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=900&q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=900&q=80",
    ],
    sizes: ["28", "30", "32", "34"],
    colors: ["Krem", "Hitam"],
    featured: true,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
  {
    id: "5",
    slug: "celana-pendek-cargo",
    name: "Celana Pendek Cargo",
    category: "celana-pendek",
    price: 169000,
    description:
      "Celana pendek cargo dengan kantong fungsional di sisi kiri-kanan. Tampilan utilitarian yang sedang digemari.",
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=900&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Army", "Hitam"],
    featured: false,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
  {
    id: "6",
    slug: "celana-pendek-jersey",
    name: "Celana Pendek Jersey",
    category: "celana-pendek",
    price: 109000,
    description:
      "Celana pendek bahan jersey super ringan dan adem. Pas untuk santai di rumah maupun olahraga ringan.",
    images: [
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=900&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=900&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Abu", "Hitam"],
    featured: false,
    shopeeUrl: "https://shopee.co.id/awcloth",
    tokopediaUrl: "https://tokopedia.com/awcloth",
  },
];

// Helper pencarian produk
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
