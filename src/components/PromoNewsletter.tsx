"use client";

import { useState } from "react";
import { promo } from "@/data/promo";
import Container from "./Container";

export default function PromoNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Catatan: hubungkan ke layanan email (Mailchimp, dll) sesuai kebutuhan.
    if (email) setSubmitted(true);
  }

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl bg-brand px-6 py-14 text-center text-paper sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {promo.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/90">
            {promo.subtitle}
          </p>

          {submitted ? (
            <p className="mt-8 text-lg font-semibold">
              Terima kasih! Email kamu sudah terdaftar. 🎉
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={promo.placeholder}
                className="w-full rounded-full bg-paper px-5 py-3.5 text-ink outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-opacity hover:opacity-90"
              >
                {promo.buttonLabel}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
