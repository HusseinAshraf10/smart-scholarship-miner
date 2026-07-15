import React from "react";
import Container from "../../../components/layout/Container.jsx";
function Hero() {
  return (
    <section className="py-20">
      <Container>
        <p className="mb-3 font-semibold text-sky-500">
          Real people, quick responses
        </p>
        <h1 className="text-5xl font-bold">Contact SkyWay</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Ask about booking, current offers, or a custom travel plan. We usually
          respond within 24 hours.
        </p>
      </Container>
    </section>
  );
}

export default Hero;
