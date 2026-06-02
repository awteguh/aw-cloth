import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/data/products";
import { collections } from "@/data/collections";
import { formatRupiah } from "@/lib/links";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ProductActions from "@/components/ProductActions";

// Generate halaman statis untuk setiap produk
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: `${product.name} — AW Cloth`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = collections.find((c) => c.id === product.category);

  return (
    <>
      <Navbar />
      <main className="py-10">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#koleksi" className="hover:text-ink">
              {collection?.name ?? "Koleksi"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Galeri gambar */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-soft">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-soft"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 2}`}
                        fill
                        sizes="33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info produk */}
            <div>
              {collection && (
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  {collection.name}
                </span>
              )}
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-bold">
                  {formatRupiah(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-muted line-through">
                    {formatRupiah(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-muted">
                {product.description}
              </p>

              <ProductActions product={product} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
