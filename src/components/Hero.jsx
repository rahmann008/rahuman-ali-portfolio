import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const LINES = [
  { type: "cmd", text: "kubectl get nodes -o wide" },
  { type: "out", text: "NAME        STATUS   ROLES    VERSION" },
  { type: "ok", text: "aks-prod-01 Ready    <none>   v1.29.2" },
  { type: "ok", text: "aks-prod-02 Ready    <none>   v1.29.2" },
  { type: "dim", text: "... 150+ nodes · 38+ microservices" },
  { type: "cmd", text: "terraform apply -auto-approve" },
  { type: "ok", text: "Apply complete! 42 added, 0 changed, 0 destroyed." },
  { type: "cmd", text: "az aks upgrade --kubernetes-version 1.29.0" },
  { type: "ok", text: "Cluster upgraded ✓ — zero downtime" },
];

export default function Hero() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 420);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section id="home" className="max-w-6xl mx-auto px-6 pt-14 pb-20 relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Open to roles · {profile.openTo.join(" · ")}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mt-8 items-center">
        <div>
          <h1 className="font-serif text-6xl md:text-7xl leading-[0.95] font-bold text-white">
            {profile.name.split(" ")[0]}
            <br />
            <span className="text-gray-400">{profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 font-medium">Cloud &amp; DevOps Engineering</p>
          <p className="mt-4 text-gray-400 max-w-lg leading-relaxed">{profile.tagline}</p>
          <p className="mt-4 text-sm text-gray-500">📍 {profile.location} · Open to relocation</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="px-5 py-3 bg-white text-base font-semibold rounded-lg hover:bg-gray-200 transition">
              View My Work ↓
            </a>
            <a href="#contact" className="px-5 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition">
              ✉ Let's Connect
            </a>
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="px-5 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition">
              ⬇ Resume
            </a>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0D1626] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0B1220]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-500 font-mono">rahuman@cloud-platform:~$</span>
          </div>
          <div className="p-5 font-mono text-[13px] min-h-[260px] space-y-1.5">
            {LINES.slice(0, visible).map((l, i) => (
              <div
                key={i}
                className={
                  l.type === "cmd"
                    ? "text-emerald-400"
                    : l.type === "ok"
                    ? "text-emerald-300"
                    : l.type === "dim"
                    ? "text-gray-500"
                    : "text-gray-300"
                }
              >
                {l.type === "cmd" ? "$ " : ""}
                {l.text}
              </div>
            ))}
            <div className="text-emerald-400">
              $ <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse align-middle" />
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-white/10">
            <div className="p-4 text-center border-r border-white/10">
              <p className="font-serif text-3xl font-bold">95%</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Faster Deploys</p>
            </div>
            <div className="p-4 text-center">
              <p className="font-serif text-3xl font-bold">99.99%</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
