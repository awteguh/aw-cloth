"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { site } from "@/data/site";
import { waLink, formatRupiah } from "@/lib/links";

export default function ProductActions({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");

  const message = `Halo ${site.brand}, saya mau pesan *${product.name}*\nUkuran: ${size}\nWarna: ${color}\nHarga: ${formatRupiah(
    product.price
  )}\nApakah masih tersedia?`;

  return (
    <div>
      {/* Pilih ukuran */}
      {product.sizes.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-semibold">Ukuran</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  size === s
                    ? "border-ink bg-ink text-paper"
                    : "border-line hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pilih warna */}
      {product.colors.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold">Warna</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  color === c
                    ? "border-ink bg-ink text-paper"
                    : "border-line hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tombol beli */}
      <div className="mt-8 flex flex-col gap-3">
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-7 py-4 text-center font-semibold text-paper transition-colors hover:bg-brand"
        >
          Pesan via WhatsApp
        </a>

        <div className="flex gap-3">
          {product.shopeeUrl && (
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-line px-5 py-3.5 text-center text-sm font-semibold transition-colors hover:border-ink"
            >
              Beli di Shopee
            </a>
          )}
          {product.tokopediaUrl && (
            <a
              href={product.tokopediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-line px-5 py-3.5 text-center text-sm font-semibold transition-colors hover:border-ink"
            >
              Beli di Tokopedia
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
