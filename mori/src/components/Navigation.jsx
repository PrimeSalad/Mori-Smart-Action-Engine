import { Download, Play } from "lucide-react";
import logo from "../assets/logo.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <nav aria-label="Primary navigation" className="mx-auto flex h-16 max-w-[980px] items-center justify-between px-4 sm:px-6">
        <a href="#profile-content" className="flex min-h-11 items-center gap-3" aria-label="Mori profile">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-signal">
            <img src={logo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="text-xl font-extrabold tracking-[-0.04em]">mori</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href={WATCH_DEMO_LINK}
            className="hidden min-h-10 items-center gap-2 rounded-lg bg-[#efefef] px-4 text-sm font-bold transition-colors hover:bg-line sm:inline-flex"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Demo
          </a>
          <a
            href={GOOGLE_DRIVE_DOWNLOAD_LINK}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-signal px-4 text-sm font-bold text-white transition-colors hover:bg-signal-dark"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}
