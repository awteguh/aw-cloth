import { site } from "@/data/site";
import type { Product } from "@/data/products";

// Format angka ke Rupiah, mis. 99000 -> "Rp99.000"
export function formatRupiah(value: number): string {
  return "Rp" + value.toLocaleString("id-ID");
}

// Bangun link WhatsApp dengan pesan otomatis menyebut nama produk.
export function waLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

// Link "Pesan via WhatsApp" untuk produk tertentu.
export function waProductLink(product: Product): string {
  return waLink(
    `Halo ${site.brand}, saya tertarik dengan produk *${product.name}* (${formatRupiah(
      product.price
    )}). Apakah masih tersedia?`
  );
}

// Link WhatsApp umum (kontak).
export function waContactLink(): string {
  return waLink(`Halo ${site.brand}, saya ingin bertanya tentang produk Anda.`);
}
