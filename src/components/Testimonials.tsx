import { useEffect, useState } from "react";
import { PHOTOS, TESTIMONIALS } from "../data";
import { SectionTag, Star } from "./Decor";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((x) => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearTimeout(t);
  }, [i]);
  const t = TESTIMONIALS[i];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* photo collage */}
        <div className="reveal relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-sun-light" />
          <div className="absolute inset-[8%] rounded-full dashed-ring animate-spin-slow" />
          <div className="absolute inset-[14%] overflow-hidden rounded-full border-8 border-white shadow-2xl">
            <img src={PHOTOS.about} alt="Criança sorrindo recebendo carinho" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-0 top-[8%] animate-float rounded-2xl bg-white px-4 py-3 shadow-xl">
            <p className="text-2xl">💬</p>
          </div>
          <div className="absolute bottom-[6%] left-0 rounded-2xl bg-white px-5 py-3 shadow-xl">
            <p className="font-display text-3xl font-bold text-coral-dark">4,9 ★</p>
            <p className="text-xs font-bold text-ink-soft">avaliação no Google</p>
          </div>
          <Star color="#d4467c" size={30} className="absolute left-[10%] top-[6%] animate-float-slow" />
          <Star color="#9fe0e6" size={38} className="absolute bottom-[12%] right-[4%] animate-float" />
        </div>

        <div className="reveal">
          <SectionTag color="bg-berry">Histórias reais</SectionTag>
          <div className="relative mt-8 min-h-[320px] rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-ink/5 md:p-12">
            <svg className="absolute -top-7 left-10 h-14 w-14 transition-colors duration-500" viewBox="0 0 48 48" style={{ color: t.color }}>
              <rect width="48" height="48" rx="16" fill="currentColor" />
              <path d="M14 30c0-6 3-10 8-12l1 2c-3 1.5-4.5 4-4.5 6H22v8h-8v-4zm13 0c0-6 3-10 8-12l1 2c-3 1.5-4.5 4-4.5 6H35v8h-8v-4z" fill="#fff" />
            </svg>
            <blockquote key={i} className="animate-pop">
              <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">“{t.quote}”</p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full font-display text-lg font-bold text-white" style={{ background: t.color }}>
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-ink-soft">{t.detail}</p>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="mt-6 flex items-center gap-3">
            {TESTIMONIALS.map((tt, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className="h-3 rounded-full transition-all duration-500"
                style={{ width: k === i ? 48 : 12, background: k === i ? tt.color : "#2b244533" }}
                aria-label={`Depoimento ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
