import { site } from "@/data/site";
import { highlights } from "@/data/promo";
import Container from "./Container";

export default function About() {
  return (
    <section id="tentang" className="bg-ink py-20 text-paper">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              Tentang {site.brand}
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Esensial yang dibuat untuk dipakai, bukan dipajang.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/70">
              {site.description}
            </p>
          </div>

          <div className="grid gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-bold text-brand">{item.title}</h3>
                <p className="mt-2 text-paper/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
