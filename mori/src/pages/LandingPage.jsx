import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";
import ReportModal from "../components/ReportModal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="font-inter bg-canvas min-h-screen">
      <Navigation onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <ReportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <HowItWorks />
      <Features />
      <UseCases />
      <CTABand onOpenModal={() => setModalOpen(true)} />
      <Footer />
    </div>
  );
}
