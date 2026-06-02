import Link from "next/link";
import { site } from "@/data/site";
import { waContactLink } from "@/lib/links";
import Container from "./Container";

export default function Footer() {
  const socials = [
    { label: "Instagram", href: site.social.instagram },
    { label: "TikTok", href: site.social.tiktok },
    { label: "Shopee", href: site.social.shopee },
    { label: "Tokopedia", href: site.social.tokopedia },
  ].filter((s) => s.href);

  return (
    <footer id="kontak" className="border-t border-line bg-paper">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-logo text-3xl">{site.brand}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Kontak
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>{site.address}</li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
              <li>
                <a
                  href={waContactLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand hover:underline"
                >
                  Chat WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Ikuti Kami
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand}. Semua hak dilindungi.
          </p>
          <nav className="flex gap-6">
            {site.nav.map((item) => (
              <Link key={item.href} href={`/${item.href}`} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
