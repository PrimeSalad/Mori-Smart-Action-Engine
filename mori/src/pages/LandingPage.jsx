import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <main id="profile-content" className="flex flex-1 items-center bg-white text-ink">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
