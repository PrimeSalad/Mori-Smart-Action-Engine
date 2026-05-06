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
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex h-16 max-w-[1180px] items-center justify-between rounded-[28px] border px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-white/10 bg-[#0b0706]/90 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-white/10 bg-white/[0.035] backdrop-blur-md"
        }`}
      >
        <a href="#home" className="flex items-center gap-3" aria-label="Mori home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/25 bg-gradient-to-br from-[#ff3b30] to-[#ff8a3d] shadow-[0_0_28px_rgba(255,70,38,0.35)]">
            <img src={logo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="flex flex-col gap-0.5 leading-none">
            <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">
              Mori
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-100/60 sm:block">
              Smart Action Engine
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-stone-200/80 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-bold text-emerald-100">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Civic AI
          </span>
          <a
            href={downloadHref}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#180705] shadow-[0_12px_34px_rgba(255,90,42,0.22)] transition duration-200 hover:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
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
          className="mx-auto mt-3 max-w-[1180px] rounded-[24px] border border-white/10 bg-[#0b0706]/95 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-stone-100/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={downloadHref}
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-2xl bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-4 py-3 text-center text-sm font-black text-white shadow-[0_16px_36px_rgba(255,74,38,0.3)]"
          >
            Download
          </a>
        </div>
      )}
    </header>
  );
}
