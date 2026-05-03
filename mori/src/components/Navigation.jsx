import { Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation({ onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "FEATURES", href: "#features" },
    { label: "USE CASES", href: "#use-cases" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-canvas/95 backdrop-blur-sm" : "bg-transparent"
      }`}
      style={{ height: "64px" }}
    >
      <div className="max-w-[1280px] mx-auto px-xs sm:px-md h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-[8px] group">
          <div
            className="w-[28px] h-[28px] bg-primary flex items-center justify-center"
            style={{ borderRadius: "0px" }}
          >
            <Shield
              className="w-[16px] h-[16px] text-white"
              strokeWidth={2.5}
            />
          </div>
          <span className="text-ink font-inter text-[15px] font-600 tracking-[0.65px] uppercase">
            ActionPoint
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-[32px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-600 uppercase tracking-[0.65px] text-body hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenModal}
            className="bg-primary text-white text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[14px] h-[48px] flex items-center hover:bg-primary-active transition-colors duration-200"
            style={{ borderRadius: "0px" }}
          >
            GET STARTED
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-ink w-[48px] h-[48px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-[24px] h-[24px]" />
          ) : (
            <Menu className="w-[24px] h-[24px]" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-canvas border-t border-hairline px-xs py-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-[12px] text-[13px] font-600 uppercase tracking-[0.65px] text-body hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenModal();
            }}
            onClick={() => setMenuOpen(false)}
            className="block mt-[16px] bg-primary text-white text-[13px] font-700 uppercase tracking-[1.4px] px-[32px] py-[14px] text-center hover:bg-primary-active transition-colors"
            style={{ borderRadius: "0px" }}
          >
            GET STARTED
          </button>
        </div>
      )}
    </nav>
  );
}
