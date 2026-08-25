import { ArrowUpRight } from "lucide-react";
import { GOOGLE_DRIVE_DOWNLOAD_LINK } from "../config/links";

export default function Footer() {
  return (
    <footer className="shrink-0 border-t border-line bg-paper-deep px-4 sm:px-6">
      <div className="mx-auto flex min-h-12 max-w-[980px] items-center justify-between gap-4 text-[11px] text-muted">
        <p>© 2026 Mori</p>
        <p className="hidden sm:block">Chrome extension · Early access</p>

        <nav aria-label="Footer navigation" className="flex items-center gap-4 font-semibold">
            <a
              href="https://github.com/PrimeSalad/Mori-Smart-Action-Engine"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-muted transition-colors hover:text-ink"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href={GOOGLE_DRIVE_DOWNLOAD_LINK} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
              Download
            </a>
        </nav>
      </div>
    </footer>
  );
}
