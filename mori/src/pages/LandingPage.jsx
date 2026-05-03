import React, { useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

export default function LandingPage() {
  const ref = useRef(null);

  return (
    <div ref={ref} className="font-inter bg-canvas min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <CTABand />
      <Footer />
    </div>
  );
}
