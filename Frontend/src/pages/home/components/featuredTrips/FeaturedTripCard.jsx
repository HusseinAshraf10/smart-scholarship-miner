import { Link } from "react-router-dom";
import styles from "./FeaturedTripCard.module.css";

function FeaturedTripCard({ trip }) {
  return (
    <article className={styles.card}>
      <img
        src={trip.image}
        alt={trip.alt}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{trip.title}</h3>

          <span className={styles.price}>
            {trip.price}
          </span>
        </div>

        <div className={styles.meta}>
          <span>⭐ {trip.rating}</span>
          <span>{trip.duration}</span>
        </div>

        <p className={styles.description}>
          {trip.description}
        </p>

        <Link
          to="/trips"
          className={styles.button}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default FeaturedTripCard;