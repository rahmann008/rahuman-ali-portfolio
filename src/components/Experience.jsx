import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-mono uppercase tracking-widest text-accent">03 — The Ledger</p>
      <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-12">
        A decade-plus of platform ownership.
      </h2>

      <div className="relative pl-8 border-l-2 border-white/10 space-y-12">
        {experiences.map((e) => (
          <div key={e.company} className="relative">
            <span className="absolute -left-[41px] top-1 w-3.5 h-3.5 rounded-full bg-base border-2 border-accent" />

            <p className="text-xs font-mono text-gray-500">{e.duration}</p>
            <h3 className="text-xl font-semibold mt-1">{e.role}</h3>
            <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
              🏢 {e.company}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">📍 {e.location}</p>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {e.tags.map((t) => (
                <span key={t} className="text-[11px] font-mono border border-white/10 rounded px-2 py-1 text-cyan-300/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
