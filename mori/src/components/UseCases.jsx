export default function UseCases() {
  const cases = [
    {
      image: "http://static.photos/automotive/640x360/7",
      tag: "TRANSPORT",
      title: "Overcharged Fare",
      description:
        '"Siningil ako ng driver ng sobra." FixFinder classifies it as a fare violation and routes it to LTFRB — with a formal report ready to send.',
    },
    {
      image: "http://static.photos/nature/640x360/55",
      tag: "EMERGENCY",
      title: "Fire Emergency",
      description:
        '"May sunog sa kabilang barangay, walang tulong." FixFinder detects an emergency and immediately shows Bureau of Fire contacts and hotlines.',
    },
    {
      image: "http://static.photos/cityscape/640x360/22",
      tag: "INFRASTRUCTURE",
      title: "Dark Streets",
      description:
        '"Ang dilim ng street namin." FixFinder identifies it as an infrastructure concern and directs it to the local government unit responsible.',
    },
    {
      image: "http://static.photos/industry/640x360/33",
      tag: "ENVIRONMENT",
      title: "Illegal Dumping",
      description:
        "Waste and hazardous materials spotted in public areas — FixFinder structures the report and sends it to environmental services.",
    },
  ];

  return (
    <section id="use-cases" className="bg-canvas py-[96px]">
      <div className="max-w-[1280px] mx-auto px-xs sm:px-md">
        <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary mb-[16px]">
          Scenarios
        </p>
        <h2 className="text-[26px] sm:text-[36px] font-500 leading-[1.2] tracking-[-0.36px] text-ink mb-[64px]">
          Real Complaints. Real Action.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
          {cases.map((c) => (
            <div
              key={c.title}
              className="bg-canvas flex flex-col"
              style={{ borderRadius: "0px" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent"></div>
                <span
                  className="absolute top-[16px] left-[16px] bg-canvas-elevated text-[11px] font-600 uppercase tracking-[1.1px] text-ink px-[12px] py-[4px]"
                  style={{ borderRadius: "9999px" }}
                >
                  {c.tag}
                </span>
              </div>
              <div className="p-[24px]">
                <h3 className="text-[16px] font-500 leading-[1.4] tracking-[0.08px] text-ink mb-[8px]">
                  {c.title}
                </h3>
                <p className="text-[14px] font-400 leading-[1.5] text-body">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
