// =============================================================
//  TESTIMONI PELANGGAN — EDIT DI SINI
// =============================================================

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number; // 1 - 5
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rizky A.",
    location: "Bandung",
    rating: 5,
    text: "Bahan kaosnya tebal dan adem, jahitan rapi. Worth it banget buat harganya. Bakal repeat order!",
  },
  {
    id: "2",
    name: "Dinda P.",
    location: "Jakarta",
    rating: 5,
    text: "Celana pendek chino-nya nyaman dipakai seharian. Ukurannya pas sesuai size chart. Recommended.",
  },
  {
    id: "3",
    name: "Bagus W.",
    location: "Surabaya",
    rating: 4,
    text: "Pengiriman cepat, packaging rapi. Warna oren-nya keren, beda dari brand lokal lain.",
  },
];
