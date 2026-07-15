import React from "react";
import Container from "../../../components/layout/Container.jsx";

function Hero() {
  return (
    <section className="py-20">
      <Container>
        <p className="mb-3 font-semibold text-sky-500">
          Limited-time value packages
        </p>

        <h1 className="text-5xl font-bold">Special Offers</h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Save more with our limited-time travel deals.
        </p>
      </Container>
    </section>
  );
}

export default Hero;
