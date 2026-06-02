// =============================================================
//  PERTANYAAN UMUM (FAQ) — EDIT DI SINI
// =============================================================

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "1",
    question: "Bagaimana cara memesan?",
    answer:
      "Pilih produk yang diinginkan, klik tombol 'Pesan via WhatsApp', lalu konfirmasi ukuran dan jumlah ke admin kami. Bisa juga membeli langsung melalui Shopee atau Tokopedia.",
  },
  {
    id: "2",
    question: "Berapa lama waktu pengiriman?",
    answer:
      "Pesanan diproses 1x24 jam pada hari kerja. Estimasi pengiriman 2–5 hari tergantung lokasi dan ekspedisi yang dipilih.",
  },
  {
    id: "3",
    question: "Apakah ukurannya akurat?",
    answer:
      "Ya. Setiap produk memiliki panduan ukuran. Jika ragu, tanyakan ke admin via WhatsApp dan kami bantu memilih ukuran yang pas.",
  },
  {
    id: "4",
    question: "Apakah bisa tukar atau retur?",
    answer:
      "Bisa, dalam 3 hari setelah barang diterima untuk kesalahan ukuran atau cacat produksi. Barang harus belum dipakai dan tag masih utuh.",
  },
];
