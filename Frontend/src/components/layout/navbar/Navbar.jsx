import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import Container from "../Container";
import styles from "./navbar.module.css";

function Navbar() {
  const links = [["/", "Home"], ["/trips", "Trips"], ["/offers", "Offers"], ["/contact", "Contact"]];

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.wrapper}>
          <NavLink to="/" aria-label="SkyWay home">
            <img src={logo} alt="SkyWay Travel logo" className={styles.logo} />
          </NavLink>

          <ul className={styles.links}>
            {links.map(([to, label]) => (
              <li key={to}>
                <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`} to={to} end={to === "/"}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
