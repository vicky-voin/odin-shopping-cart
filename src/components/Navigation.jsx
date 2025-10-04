import styles from "./Navigation.module.css";
import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <nav className={styles.root}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart">Your cart</NavLink>
    </nav>
  );
}
