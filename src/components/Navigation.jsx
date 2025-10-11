import { ShoppingCart } from "lucide-react";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router";

export default function Navigation({ cartData }) {
  const totalCount =
    cartData == null
      ? 0
      : cartData.reduce((acc, item) => acc + item.quantity, 0);

  function getNavLinkClass({ isActive }) {
    return isActive ? `${styles.navButton} ${styles.active}` : styles.navButton;
  }

  return (
    <nav className={styles.root}>
      <NavLink className={getNavLinkClass} data-testid="homeNavLink" to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClass} data-testid="shopNavLink" to="/shop">
        Shop
      </NavLink>
      <NavLink className={getNavLinkClass} data-testid="cartNavLink" to="/cart">
        <ShoppingCart></ShoppingCart>
        <span data-testid="cartTotalCount">{totalCount}</span>
      </NavLink>
    </nav>
  );
}
