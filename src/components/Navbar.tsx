"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import Container from "./Container";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-logo text-2xl tracking-tight">
          {site.brand}
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#koleksi"
          className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand md:inline-block"
        >
          Belanja
        </Link>

        {/* Tombol menu mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Buka menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </Container>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={`/${item.href}`}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
