import TripsGrid from "../../components/shared/TripsGrid.jsx";
import Hero from "./components/Hero.jsx";
import CTASection from "../../components/shared/CTASection.jsx";
function Trips() {
  return (
    <section>
      <Hero />
      <TripsGrid />
      <CTASection
      h3={"Need a custom itinerary?"}
      p={"Share your dates and budget and we will build a custom trip plan for you."}
      btn={"Request Custom Plan"}
      />
    </section>
  );
}

export default Trips;
