import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="font-questrial bg-[#070504] min-h-screen text-white">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <UseCases />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
