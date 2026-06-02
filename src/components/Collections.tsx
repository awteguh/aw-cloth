import { collections } from "@/data/collections";
import { products } from "@/data/products";
import Container from "./Container";
import ProductCard from "./ProductCard";

export default function Collections() {
  return (
    <section id="koleksi" className="py-20">
      <Container>
        <div className="mb-12 max-w-xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Koleksi Kami
          </h2>
          <p className="mt-4 text-lg text-muted">
            Pilihan kaos dan celana pendek untuk melengkapi gaya harianmu.
          </p>
        </div>

        {collections.map((collection) => {
          const items = products.filter((p) => p.category === collection.id);
          if (items.length === 0) return null;

          return (
            <div key={collection.id} className="mb-16 last:mb-0">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {collection.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
