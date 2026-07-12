export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 px-6 no-print">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Rahuman Ali. Designed &amp; built as a cloud-native portfolio.</p>
        <p>Powered by AI assistant · React · Tailwind</p>
      </div>
    </footer>
  );
}
