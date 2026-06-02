"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";
import Container from "./Container";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-soft py-20">
      <Container className="max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Pertanyaan Umum
          </h2>
          <p className="mt-4 text-lg text-muted">
            Hal-hal yang sering ditanyakan pelanggan.
          </p>
        </div>

        <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span
                    className={`text-2xl text-brand transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
