import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-mono uppercase tracking-widest text-accent">02 — Capabilities</p>
      <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-10">
        The technology stack I operate.
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skillGroups.map((group) => (
          <div key={group.category} className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-sm mb-3">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-mono bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
