import { Link } from "react-router-dom";
import Container from "../../../components/layout/Container";
import heroImage from "../../../assets/images/home.png";
import styles from "./hero.module.css";

function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImage})` }}>
      <div className={styles.overlay}></div>

      <Container>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Trusted by 12,000+ happy travelers</p>

          <h1 className={styles.title}>
            Turn every vacation into a story worth sharing.
          </h1>

          <p className={styles.description}>
            From city escapes to tropical retreats, SkyWay plans complete trips
            that are smooth, memorable, and built around what you love.
          </p>

          <div className={styles.actions}>
            <Link
              to="/trips"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Explore Trips
            </Link>

            <Link
              to="/offers"
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              See Offers
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
