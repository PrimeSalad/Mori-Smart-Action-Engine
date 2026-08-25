import logo from "../assets/logo.png";

const footerLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-to-use" },
  { label: "Install", href: "#install" },
  { label: "Support", href: "#support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/20 bg-night px-5 py-9 text-paper sm:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:grid-cols-[1fr_auto_1fr]">
        <a href="#home" className="flex min-h-11 items-center gap-3" aria-label="Back to Mori home">
          <span className="grid h-10 w-10 place-items-center bg-signal">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
          </span>
          <span>
            <span className="block text-sm font-extrabold uppercase tracking-[0.16em]">Mori</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/55">Smart Action Engine</span>
          </span>
        </a>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end lg:justify-center">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="flex min-h-11 items-center text-sm font-semibold text-paper/60 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-paper/45 sm:col-span-2 lg:col-span-1 lg:text-right">
          © 2026 Mori · Built for civic action
        </p>
      </div>
    </footer>
  );
}
