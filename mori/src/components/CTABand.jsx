export default function CTABand({ onOpenModal }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #3c3c3c, #030303 64%)",
      }}
    >
      <div className="absolute inset-0">
        <img
          src="http://static.photos/cityscape/1200x630/42"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-xs sm:px-md py-[96px] text-center">
        <h2 className="text-[32px] sm:text-[56px] lg:text-[80px] font-500 leading-[1.05] tracking-[-1.6px] text-ink mb-[32px]">
          WHEN A PROBLEM
          <br />
          HAS <span className="text-primary">DIRECTION</span>—
          <br />
          IT GETS SOLVED.
        </h2>
        <p className="text-[14px] font-400 leading-[1.5] text-body max-w-[480px] mx-auto mb-[40px]">
          A complaint without direction goes nowhere. ActionPoint Orbit gives
          every problem a path to the right office.
        </p>
        <button
          onClick={onOpenModal}
          className="bg-primary text-white text-[14px] font-700 uppercase tracking-[1.4px] px-[48px] py-[14px] h-[48px] flex items-center justify-center mx-auto hover:bg-primary-active transition-colors duration-200"
          style={{ borderRadius: "0px" }}
        >
          GET STARTED
        </button>
      </div>
    </section>
  );
}
