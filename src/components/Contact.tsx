import { useState } from "react";
import type { FormEvent } from "react";
import { SERVICES, WHATSAPP } from "../data";
import { Cross, Ring, Star } from "./Decor";
import { LogoMark } from "./Navbar";

export default function Contact() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-lilac p-6 shadow-2xl md:p-12 lg:p-16">
          {/* decor */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-coral/60 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-aqua/60 blur-2xl" />
          <Star color="#fbd684" size={36} className="absolute left-[45%] top-10 animate-float" />
          <Star color="#f0613e" size={26} className="absolute bottom-10 left-[40%] animate-float-slow" />
          <Ring color="#fff" className="absolute right-[42%] top-1/2" />
          <Cross color="#fbd684" className="absolute left-8 top-8" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div className="text-white">
              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Vamos encaixar a próxima peça <span className="text-sun">juntos?</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/85">Agende uma conversa de acolhimento. Nossa equipe retorna em até 24 horas úteis.</p>

              <ul className="mt-10 space-y-4">
                {[
                  { i: "📍", t: "Rua das Flores, 123 — Jardim Aliança, São Paulo/SP" },
                  { i: "🕘", t: "Seg a Sex, 7h às 20h · Sáb, 8h às 12h" },
                  { i: "📞", t: "(11) 99999-9999 · contato@aliancaclinica.com.br" },
                ].map((c) => (
                  <li key={c.t} className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 text-xl backdrop-blur">{c.i}</span>
                    <span className="font-semibold">{c.t}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 font-bold text-ink shadow-xl transition-all hover:-translate-y-1"
              >
                <WhatsIcon className="h-6 w-6 text-[#25D366]" />
                Prefiro falar pelo WhatsApp
              </a>
            </div>

            <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
              {sent ? (
                <div className="animate-pop flex min-h-[460px] flex-col items-center justify-center text-center">
                  <div className="animate-float">
                    <LogoMark size={110} />
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold">Obrigado{name ? `, ${name.split(" ")[0]}` : ""}! 💛</h3>
                  <p className="mt-3 max-w-sm text-ink-soft">Recebemos sua mensagem. Em breve nossa equipe de acolhimento entrará em contato.</p>
                  <button onClick={() => setSent(false)} className="mt-6 rounded-full bg-cream px-5 py-3 font-bold text-ink hover:bg-cream-200">
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-display text-2xl font-semibold">Agende uma avaliação</h3>
                  <Field label="Seu nome" placeholder="Como podemos te chamar?" value={name} onChange={setName} required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="WhatsApp" placeholder="(11) 90000-0000" type="tel" required />
                    <Field label="Idade da criança" placeholder="Ex.: 4 anos" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold text-ink-soft">Tem interesse em quais terapias?</p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => {
                        const on = picked.includes(s.id);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => toggle(s.id)}
                            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${on ? "scale-105 text-white shadow-md" : "bg-cream text-ink hover:bg-cream-200"}`}
                            style={on ? { background: s.color } : undefined}
                          >
                            <span>{s.icon}</span>
                            {s.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-ink-soft">Conte um pouquinho (opcional)</span>
                    <textarea
                      rows={3}
                      placeholder="O que te trouxe até aqui?"
                      className="w-full resize-none rounded-2xl border-2 border-transparent bg-cream px-4 py-3 outline-none transition-colors placeholder:text-ink-soft/50 focus:border-lilac focus:bg-white"
                    />
                  </label>
                  <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-lg font-bold text-white transition-all hover:bg-lilac-dark">
                    Quero agendar
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <p className="text-center text-xs text-ink-soft">🔒 Seus dados estão protegidos conforme a LGPD.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-ink-soft">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-2xl border-2 border-transparent bg-cream px-4 py-3 outline-none transition-colors placeholder:text-ink-soft/50 focus:border-lilac focus:bg-white"
      />
    </label>
  );
}

export function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 01-4.8-1.32l-.35-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 01-1.44-5.02c0-5.2 4.23-9.42 9.44-9.42 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 012.76 6.66c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.3 11.3 0 0012.04.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.95 1.52 5.67L.58 23.7l6.1-1.6a11.33 11.33 0 005.36 1.36h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03z" />
    </svg>
  );
}
