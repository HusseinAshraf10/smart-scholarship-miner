import TripsGrid from "../../components/shared/TripsGrid.jsx";
import CTASection from "../../components/shared/CTASection.jsx";
import Hero from "./components/Hero.jsx";
import WhyUs from "./components/WhyUs.jsx";
import OffersGrid from "../../components/shared/OffersGrid.jsx";
import FeaturedTripCard from "./components/featuredTrips/FeaturedTripCard.jsx";

function Home() {
  return (
    <section>
      <Hero />
      <WhyUs />
      <FeaturedTripCard />
      <OffersGrid />
      <CTASection
      h3={"Need help choosing the right package?"}
      p={"Tell us your budget, dates, and travel style. We will recommendthe best options in one message."}
      btn={"Talk to an Expert"}
      />
    </section>
  );
}

export default Home;
