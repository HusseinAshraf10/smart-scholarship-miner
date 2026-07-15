import React from "react";
import { offers } from "../../data/offers.js";
import Container from "../layout/Container.jsx";
function OffersGrid() {
  return (
    <section>
      <Container>
        {offers.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.image} alt={item.alt} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

export default OffersGrid;
