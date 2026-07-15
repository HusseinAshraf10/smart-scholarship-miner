import React from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

function CTASection(props) {
  return (
    <section>
      <Container>
        <div>
          <div>
            <h3>{props.h3}</h3>
            <p>{props.p}</p>
          </div>
          <Link
            to="/contact"
          >
            {props.btn}
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
