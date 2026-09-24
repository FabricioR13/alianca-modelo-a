import HeartMascot from "./HeartMascot";
import { Cross, Ring, Star, Triangle } from "./Decor";
import { PHOTOS, WHATSAPP } from "../data";

type Mouse = { x: number; y: number; cx: number; cy: number };

export default function Hero({ mouse }: { mouse: Mouse }) {
  const par = (depth: number) => ({
    transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)`,
    transition: "transform .4s ease-out",
  });

  return (
    <section id="top" className="grain relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
      {/* background blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-aqua/40 blur-3xl" style={par(-20)} />
      <div className="pointer-events-none absolute -right-32 top-20 h-[460px] w-[460px] rounded-full bg-lilac/30 blur-3xl" style={par(25)} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-sun/50 blur-3xl" style={par(-15)} />

      {/* confetti decor */}
      <Star color="#fbd684" size={30} className="absolute left-[6%] top-[22%] animate-float" />
      <Star color="#f0613e" size={36} className="absolute bottom-[14%] left-[3%] animate-float-slow" />
      <Ring className="absolute left-[14%] top-[12%]" />
      <Cross className="absolute left-[46%] top-[16%]" />
      <Triangle className="absolute right-[4%] top-[48%] animate-wiggle" />
      <Ring className="absolute bottom-[10%] right-[30%]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* copy */}
        <div className="relative z-10">
          <div className="animate-pop inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-ink-soft shadow-sm ring-1 ring-ink/5 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-dark opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-aqua-dark" />
            </span>
            Agenda aberta para novas avaliações
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]">
            Cada peça{" "}
            <span className="relative inline-block">
              <span className="relative z-10">importa</span>
              <svg viewBox="0 0 200 20" className="absolute -bottom-1 left-0 z-0 h-4 w-full" preserveAspectRatio="none" aria-hidden>
                <path d="M3 14 Q 50 2 100 11 T 197 8" stroke="#fbd684" strokeWidth="10" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .<br />
            Juntos, formamos uma{" "}
            <span className="bg-linear-to-r from-lilac-dark via-coral-dark to-aqua-dark bg-clip-text text-transparent">aliança</span>
            <span className="inline-block animate-wiggle">💛</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Clínica comportamental especializada em <strong className="text-ink">autismo (TEA), TDAH</strong> e desenvolvimento infantil. Unimos ciência, afeto e a família para que cada criança
            encontre o seu jeito de brilhar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-bold text-white shadow-xl shadow-lilac-dark/25 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              Agendar avaliação
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-300 group-hover:rotate-45">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </span>
            </a>
            <a
              href="#terapias"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-base font-bold text-ink shadow-md ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:ring-lilac"
            >
              Conhecer terapias
            </a>
          </div>

          {/* trust */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              {[PHOTOS.heroFamily, PHOTOS.heroMom, PHOTOS.heroBlocks].map((src, i) => (
                <img key={i} src={src} alt="" className="h-12 w-12 rounded-full border-[3px] border-cream object-cover" />
              ))}
              <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-cream bg-lilac text-sm font-bold text-white">+500</span>
            </div>
            <div>
              <div className="flex text-sun-dark">{"★★★★★"}</div>
              <p className="text-sm font-semibold text-ink-soft">famílias acolhidas com nota 4,9</p>
            </div>
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-auto aspect-square w-full max-w-[600px]">
          {/* cream disc like the logo */}
          <div className="absolute inset-[6%] rounded-full bg-[#fdecc9] shadow-[inset_0_-20px_60px_rgba(233,176,64,0.18)]" />
          <div className="absolute inset-[2%] rounded-full dashed-ring animate-spin-slow" />

          {/* photo bubbles */}
          <div className="absolute -left-2 top-[4%] z-20 w-[30%] md:-left-6" style={par(-18)}>
            <div className="animate-float-slow">
              <div className="animate-blob overflow-hidden border-[5px] border-white shadow-xl" style={{ aspectRatio: "1" }}>
                <img src={PHOTOS.heroFamily} alt="Família abraçada sorrindo" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <div className="absolute -right-2 bottom-[8%] z-20 w-[28%] md:-right-4" style={par(22)}>
            <div className="overflow-hidden rounded-[2rem] border-[5px] border-white shadow-xl rotate-6 transition-transform hover:rotate-0" style={{ aspectRatio: "0.85" }}>
              <img src={PHOTOS.heroBlocks} alt="Criança brincando com blocos coloridos" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* floating note */}
          <div className="absolute bottom-[3%] left-[2%] z-30 max-w-[230px] rounded-2xl bg-white p-3.5 shadow-xl ring-1 ring-ink/5" style={par(12)}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-aqua-light text-xl">🎉</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-aqua-dark">Conquista de hoje</p>
                <p className="text-sm font-semibold leading-snug text-ink">Theo disse “mamãe” pela primeira vez!</p>
              </div>
            </div>
          </div>
          <div className="absolute right-[4%] top-[6%] z-30 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-ink/5" style={par(-10)}>
            <p className="font-display text-2xl font-bold text-lilac-dark">98%</p>
            <p className="text-xs font-semibold text-ink-soft">das famílias indicam</p>
          </div>

          <HeartMascot mouse={mouse} className="absolute inset-[10%] z-10" />
          <p className="absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-ink-soft/70">
            passe o mouse nas peças · clique para um abraço
          </p>
        </div>
      </div>
    </section>
  );
}
