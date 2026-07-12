import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-mono uppercase tracking-widest text-accent">04 — Selected Work</p>
      <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-10">
        Enterprise platforms &amp; product builds.
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.name} className="glass-card rounded-2xl p-6 hover:border-accent/40 transition">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500">{p.tag}</p>
              {p.featured && <span className="text-[11px] text-yellow-400">★ Featured</span>}
            </div>
            <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{p.description}</p>
            <p className="text-sm text-accent mt-3 flex gap-1">↗ {p.impact}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map((t) => (
                <span key={t} className="text-[11px] font-mono border border-white/10 rounded px-2 py-1 text-gray-400">
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
