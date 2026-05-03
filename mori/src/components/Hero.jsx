export default function Hero({ onOpenModal }) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-end overflow-hidden"
      style={{ background: "#181818" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="http://static.photos/cityscape/1200x630/77"
          alt="Urban cityscape at night"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(24,24,24,0.55) 0%, rgba(24,24,24,0.3) 40%, rgba(24,24,24,0.85) 75%, #181818 100%)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-xs sm:px-md pb-[96px] pt-[160px]">
        <div className="max-w-[820px]">
          <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary mb-[16px]">
            From Complaint to Action
          </p>
          <h1 className="font-inter text-[32px] sm:text-[56px] lg:text-[80px] font-500 leading-[1.05] tracking-[-1.6px] lg:tracking-[-1.6px] sm:tracking-[-1.12px] text-ink mb-[24px]">
            SEE A PROBLEM.
            <br />
            TAKE ACTION.
          </h1>
          <p className="text-[14px] sm:text-[16px] font-400 leading-[1.5] text-body max-w-[560px] mb-[40px]">
            We see problems every day online. We react. We share. But nothing
            happens. ActionPoint Orbit is a website that turns online complaints
            into clear, structured reports — and sends them to the right agency.
          </p>

          <div className="flex flex-col sm:flex-row gap-[16px]">
            <button
              onClick={onOpenModal}
              className="bg-primary text-white text-[14px] font-700 uppercase tracking-[1.4px] px-[32px] py-[14px] h-[48px] flex items-center justify-center hover:bg-primary-active transition-colors duration-200"
              style={{ borderRadius: "0px" }}
            >
              GET STARTED
            </button>
            <a
              href="#features"
              className="bg-transparent text-ink text-[14px] font-700 uppercase tracking-[1.4px] px-[32px] py-[14px] h-[48px] flex items-center justify-center border border-white/30 hover:border-white transition-colors duration-200"
              style={{ borderRadius: "0px" }}
            >
              LEARN MORE
            </a>
          </div>
        </div>

        {/* Stats band */}
        <div className="mt-[64px] flex flex-wrap gap-[48px]">
          <div>
            <p className="text-[40px] sm:text-[80px] font-700 leading-[1.0] tracking-[-1.6px] text-primary">
              1
            </p>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted mt-[8px]">
              Click to Report
            </p>
          </div>
          <div>
            <p className="text-[40px] sm:text-[80px] font-700 leading-[1.0] tracking-[-1.6px] text-ink">
              50+
            </p>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted mt-[8px]">
              Agencies Connected
            </p>
          </div>
          <div>
            <p className="text-[40px] sm:text-[80px] font-700 leading-[1.0] tracking-[-1.6px] text-ink">
              &lt;5s
            </p>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted mt-[8px]">
              Report Generated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
