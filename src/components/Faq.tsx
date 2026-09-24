import { useState } from "react";
import { FAQ } from "../data";
import { SectionTag } from "./Decor";

const COLORS = ["#b377a8", "#3fb0bd", "#de6e3e", "#e9b040", "#d4467c"];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <SectionTag color="bg-aqua-dark">Dúvidas frequentes</SectionTag>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Tudo bem ter <span className="text-aqua-dark">perguntas</span>.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Separamos as dúvidas mais comuns das famílias. Não encontrou a sua? Fale com a gente, será um prazer ajudar.</p>
        </div>
        <div className="reveal space-y-3">
          {FAQ.map((f, i) => {
            const on = open === i;
            const c = COLORS[i % COLORS.length];
            return (
              <div key={f.q} className="overflow-hidden rounded-3xl transition-all duration-500" style={{ background: on ? `${c}1a` : "#fdf3e1" }}>
                <button onClick={() => setOpen(on ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={on}>
                  <span className="font-display text-lg font-semibold md:text-xl">{f.q}</span>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl font-bold text-white transition-transform duration-500"
                    style={{ background: c, transform: on ? "rotate(135deg)" : "rotate(0)" }}
                  >
                    +
                  </span>
                </button>
                <div className="grid transition-all duration-500" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
