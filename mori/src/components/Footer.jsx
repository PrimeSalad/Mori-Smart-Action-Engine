import { Shield } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  const linkGroups = [
    {
      title: "PRODUCT",
      links: [
        "FixFinder AI",
        "Web Platform",
        "Agency Directory",
        "Report Builder",
      ],
    },
    {
      title: "COMPANY",
      links: ["About", "Careers", "Blog", "Press"],
    },
    {
      title: "RESOURCES",
      links: ["Documentation", "Agency Index", "FAQ", "Community"],
    },
    {
      title: "LEGAL",
      links: ["Privacy", "Terms", "Data Policy", "Compliance"],
    },
    {
      title: "CONNECT",
      links: ["Twitter", "LinkedIn", "GitHub", "Contact"],
    },
  ];

  return (
    <footer id="contact" className="bg-canvas border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-xs sm:px-md py-[64px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[32px] mb-[64px]">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted mb-[16px]">
                {group.title}
              </p>
              <ul className="space-y-[8px]">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] font-400 leading-[1.5] text-body hover:text-ink transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-[32px] flex flex-col sm:flex-row items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <div
              className="w-[24px] h-[24px] bg-primary flex items-center justify-center"
              style={{ borderRadius: "0px" }}
            >
              <Shield
                className="w-[12px] h-[12px] text-white"
                strokeWidth={2.5}
              />
              <img src={logo} alt="logo.png" />
            </div>
            <span className="text-[13px] font-600 uppercase tracking-[0.65px] text-muted">
              ActionPoint Orbit
            </span>
          </div>
          <p className="text-[13px] font-400 text-muted">
            © 2025 ActionPoint Orbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
