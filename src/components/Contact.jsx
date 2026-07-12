import { useEffect, useState } from "react";
import { profile } from "../data/profile";

export default function Contact() {
  const [londonTime, setLondonTime] = useState("");

  useEffect(() => {
    const update = () =>
      setLondonTime(
        new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/London" }).format(new Date())
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" className="relative py-24 px-6 mt-10 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-accent">05 — Let's Connect</p>
        <h2 className="font-serif text-5xl md:text-6xl font-bold mt-4">Let's talk.</h2>
        <p className="mt-6 text-gray-400 text-lg">
          Recruiting for a Senior DevOps, Platform, or Cloud Engineer role? I'm open to opportunities
          across the {profile.openTo.join(", ")}.
        </p>
        <p className="mt-3 text-sm text-gray-500 font-mono">
          It is currently {londonTime} in London — I'll reply within a day.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-amber-500 text-base font-semibold rounded-lg hover:bg-amber-400 transition">
            ✉ {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="px-6 py-3 border border-white/15 rounded-lg font-semibold hover:bg-white/5 transition">
            📞 {profile.phone}
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-400">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub ↗</a>
          <span>📍 {profile.location}</span>
        </div>
      </div>
    </section>
  );
}
