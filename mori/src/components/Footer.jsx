import logo from "../assets/logo.png";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "How to Use", href: "#how-to-use" },
  { label: "About", href: "#about" },
  { label: "Support", href: "#support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070504] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <a href="#home" className="flex items-center justify-center gap-3 sm:justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d]">
            <img src={logo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">
              MORI
            </span>
            <span className="block text-xs font-semibold text-stone-400">
              Smart Action Engine
            </span>
          </span>
        </a>

        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-5">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-stone-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-stone-500">
          © 2026 Mori. Scan. Verify. Report.
        </p>
      </div>
    </footer>
  );
}
