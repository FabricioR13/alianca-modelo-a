import { TEAM } from "../data";
import { SectionTag, Star } from "./Decor";

export default function Team() {
  return (
    <section id="equipe" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionTag color="bg-lilac">Nossa equipe</SectionTag>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Gente que <span className="text-lilac-dark">cuida com ciência</span> e coração
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Especialistas com formação contínua, supervisão clínica e um olhar atento para cada detalhe.</p>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <article key={m.name} className="reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative h-80">
                {/* colored arch */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[82%] rounded-t-full rounded-b-[2rem] transition-all duration-500 group-hover:h-[88%]"
                  style={{ background: m.color }}
                />
                <Star color="#fff" size={28} className="absolute left-5 top-[26%] z-20 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                <Star color="#f0613e" size={22} className="absolute right-6 top-[35%] z-20 opacity-0 transition-all delay-100 duration-500 group-hover:opacity-100" />
                {/* photo pops out */}
                <div className="absolute inset-x-4 bottom-0 top-[18%] overflow-hidden rounded-t-full rounded-b-[1.6rem] transition-all duration-500 group-hover:top-0 group-hover:rounded-t-[10rem]">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-ink-soft">{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
