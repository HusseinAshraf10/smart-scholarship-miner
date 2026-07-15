import Container from "../layout/Container";
import { trips } from "../../data/trips";

function TripsGrid({ limit }) {
  return (
    <section className="py-20">
      <Container>
        <div>
          {(limit ? trips.slice(0, limit) : trips).map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.alt} />

              <div>
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.price}</span>
                </div>

                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TripsGrid;
