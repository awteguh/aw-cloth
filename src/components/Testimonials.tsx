import { testimonials } from "@/data/testimonials";
import Container from "./Container";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand" aria-label={`${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-20"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-20">
      <Container>
        <div className="mb-12 max-w-xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Kata Mereka
          </h2>
          <p className="mt-4 text-lg text-muted">
            Ulasan jujur dari pelanggan AW Cloth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border border-line p-7"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted"> · {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
