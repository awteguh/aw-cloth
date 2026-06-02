import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/links";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-soft">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.oldPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-paper">
            Diskon
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-brand">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold">{formatRupiah(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
