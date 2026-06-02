import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/promo";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            {hero.badge}
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.title}
            <br />
            <span className="text-brand">{hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={`/${hero.primaryCta.href}`}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brand"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={`/${hero.secondaryCta.href}`}
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-soft">
          <Image
            src={hero.image}
            alt="Koleksi AW Cloth"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
