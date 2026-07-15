import CTASection from "../../components/shared/CTASection.jsx";
import OffersGrid from "../../components/shared/OffersGrid.jsx";
import Hero from "./components/Hero";

function Offers() {
  return (
    <section>
        <Hero />
      <OffersGrid />
    <CTASection
      h3={"Want to check live availability first?"}
      p={"Send us your destination and travel dates, and we will confirm availability with updated pricing."}
      btn={"Check Availability"}
      />
          </section>
  );
}

export default Offers;
