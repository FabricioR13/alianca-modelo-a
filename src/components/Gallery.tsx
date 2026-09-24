import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { GALLERY } from "../data";
import { SectionTag } from "./Decor";

const SHAPES = [
  "rounded-t-full rounded-b-[2rem]", // arch
  "rounded-full", // circle
  "rounded-[3rem] rounded-tr-[8rem]", // leaf
  "rounded-[2rem]", // card
  "rounded-b-full rounded-t-[2rem]", // inverted arch
  "rounded-[45%_55%_60%_40%/50%_40%_60%_50%]", // blob
  "rounded-[2.5rem] rounded-bl-[7rem]",
];
const SIZES = ["h-[380px] w-[280px]", "h-[300px] w-[300px] mt-10", "h-[360px] w-[300px]", "h-[300px] w-[400px] mt-16", "h-[380px] w-[280px]", "h-[320px] w-[320px] mt-8", "h-[340px] w-[420px]"];

export default function Gallery() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const onDown = (e: PointerEvent) => {
    const el = scroller.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => (drag.current.down = false);

  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => ((l ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLightbox((l) => ((l ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="espaco" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-end md:px-8">
        <div className="reveal max-w-2xl">
          <SectionTag color="bg-sun-dark">Nosso espaço</SectionTag>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Um lugar pensado para <span className="text-coral-dark">brincar, sentir</span> e crescer.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Salas sensoriais, ambientes acolhedores e materiais lúdicos escolhidos com cuidado para cada fase do desenvolvimento.</p>
        </div>
        <div className="reveal flex gap-3">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => nudge(d)}
              className="grid h-14 w-14 place-items-center rounded-full bg-white text-xl font-bold shadow-md ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:bg-ink hover:text-white"
              aria-label={d < 0 ? "Anterior" : "Próximo"}
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="no-scrollbar mt-14 flex cursor-grab items-start gap-6 overflow-x-auto px-5 pb-10 active:cursor-grabbing md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {GALLERY.map((g, i) => (
          <figure
            key={i}
            onClick={() => !drag.current.moved && setLightbox(i)}
            className={`group relative shrink-0 cursor-pointer ${SIZES[i % SIZES.length]}`}
          >
            <div
              className={`absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5 ${SHAPES[i % SHAPES.length]}`}
              style={{ background: g.color }}
            />
            <div className={`relative h-full w-full overflow-hidden ${SHAPES[i % SHAPES.length]}`}>
              <img src={g.src} alt={g.label} draggable={false} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <figcaption className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {g.label} ⤢
            </figcaption>
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-5 backdrop-blur-md" onClick={() => setLightbox(null)}>
          <div className="animate-pop relative max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[lightbox].src.replace(/w=\d+&h=\d+/, "w=1400&h=1000")} alt={GALLERY[lightbox].label} className="max-h-[80vh] rounded-[2rem] object-contain shadow-2xl" />
            <p className="mt-4 text-center font-display text-2xl text-cream">{GALLERY[lightbox].label}</p>
            <button onClick={() => setLightbox(null)} className="absolute -right-3 -top-3 grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-bold shadow-lg" aria-label="Fechar">
              ✕
            </button>
            <button
              onClick={() => setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-bold"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => setLightbox((lightbox + 1) % GALLERY.length)}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-bold"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
