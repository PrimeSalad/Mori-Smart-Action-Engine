import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK } from "../config/links";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How to Use", href: "#how-to-use" },
  { label: "About", href: "#about" },
  { label: "Support", href: "#support" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const downloadHref = GOOGLE_DRIVE_DOWNLOAD_LINK || "#install";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 transition-all duration-300 sm:px-6 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 rounded-full border px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-white/10 bg-[#0b0706]/90 shadow-[0_18px_70px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-white/10 bg-white/[0.04] backdrop-blur-md"
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
          aria-label="Mori home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-200/25 bg-gradient-to-br from-[#ff3126] to-[#ff8a3d] shadow-[0_0_28px_-6px_rgba(255,90,42,0.55)]">
            <img src={logo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-white">
              Mori
            </span>
            <span className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-orange-100/60 sm:inline">
              Smart Action Engine
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-200/80 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Civic AI
          </span>
          <a
            href={downloadHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#180705] shadow-[0_10px_30px_-12px_rgba(255,90,42,0.45)] transition duration-200 hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
          >
            Download
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-3 max-w-[1200px] space-y-1 rounded-3xl border border-white/10 bg-[#0b0706]/95 p-3 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-100/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={downloadHref}
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-2xl bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_36px_-12px_rgba(255,74,38,0.5)]"
          >
            Download
          </a>
        </div>
      )}
    </header>
  );
}
