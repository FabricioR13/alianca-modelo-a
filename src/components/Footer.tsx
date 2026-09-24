import { LogoMark } from "./Navbar";
import { WaveDivider } from "./Decor";

export default function Footer() {
  return (
    <footer className="relative bg-cream">
      <WaveDivider fill="#2b2445" />
      <div className="bg-ink pb-10 pt-10 text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={52} />
              <div className="leading-none">
                <p className="font-display text-3xl font-bold">Aliança</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-aqua">Clínica Comportamental</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-cream/70">Ciência, afeto e família: as peças que transformam o desenvolvimento infantil.</p>
          </div>
          {[
            { t: "Terapias", l: ["Terapia ABA", "Psicologia", "Fonoaudiologia", "Terapia Ocupacional", "Psicopedagogia"] },
            { t: "Clínica", l: ["Sobre nós", "Equipe", "Nosso espaço", "Trabalhe conosco"] },
            { t: "Contato", l: ["(11) 99999-9999", "contato@aliancaclinica.com.br", "Instagram", "Facebook"] },
          ].map((col) => (
            <div key={col.t}>
              <p className="font-display text-lg font-semibold text-sun">{col.t}</p>
              <ul className="mt-4 space-y-2.5">
                {col.l.map((x) => (
                  <li key={x}>
                    <a href="#top" className="text-cream/70 transition-colors hover:text-white">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-5 pt-6 text-sm text-cream/50 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Aliança Clínica Comportamental. Todos os direitos reservados.</p>
          <p>Feito com 💛 para cada pecinha especial.</p>
        </div>
      </div>
    </footer>
  );
}
