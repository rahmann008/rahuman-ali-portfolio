import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-mono uppercase tracking-widest text-accent">01 — Who I Am</p>
      <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-10 max-w-2xl">
        Bridging cloud engineering and operational reliability.
      </h2>

      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
          <img
            src="/images/profile.jpg"
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-accent/30"
          />
          <p className="mt-4 font-semibold">{profile.name}</p>
          <p className="text-xs text-gray-500 font-mono mt-1">13+ YEARS · CLOUD PLATFORMS</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Banking", "Insurance", "Telecom", "Product"].map((t) => (
              <span key={t} className="text-[11px] border border-white/10 rounded-full px-3 py-1 text-gray-400">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-300 leading-relaxed">{profile.summary}</p>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-6">
            {profile.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-accent mt-0.5">✓</span>
                {h}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3 mt-8 pt-6 border-t border-white/10 text-sm">
            <div>
              <p className="font-semibold">Master of Computer Applications (MCA)</p>
              <p className="text-gray-500">B.S. Abdur Rahman University · 2013</p>
            </div>
            <div>
              <p className="font-semibold">{profile.title}</p>
              <p className="text-gray-500">FWD Technology &amp; Innovation</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            📍 {profile.location} ·{" "}
            <span className="text-accent">Open to relocation · {profile.openTo.join(" · ")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
