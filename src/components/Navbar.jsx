import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";

const ZONES = [
  { label: "Kuala Lumpur", tz: "Asia/Kuala_Lumpur" },
  { label: "Dubai", tz: "Asia/Dubai" },
  { label: "London", tz: "Europe/London" },
  { label: "Singapore", tz: "Asia/Singapore" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

function formatTime(tz) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(new Date());
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-base/90 backdrop-blur border-b border-white/10 no-print">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center font-serif text-lg">
              R
            </div>
            <span className="font-semibold">{profile.name}</span>
          </div>

          <div className="hidden md:flex gap-7 text-sm text-gray-400">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/resume"
              className="hidden sm:flex items-center gap-2 text-sm font-medium border border-white/15 rounded-lg px-4 py-2 hover:border-accent hover:text-accent transition"
            >
              📄 Resume
            </Link>
            <button className="md:hidden text-xl" onClick={() => setOpen(!open)} aria-label="Menu">
              ☰
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5 pb-2 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
          <span className="text-gray-600">🌐 Global</span>
          {ZONES.map((z) => (
            <span key={z.tz}>
              {z.label} <span className="text-gray-300">{formatTime(z.tz)}</span>
            </span>
          ))}
        </div>

        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-4 text-gray-300">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <Link to="/resume" onClick={() => setOpen(false)} className="text-accent">
              📄 Resume
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
