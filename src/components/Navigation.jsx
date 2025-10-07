import { ShoppingCart } from "lucide-react";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router";

export default function Navigation({ cartData }) {
  const totalCount =
    cartData == null
      ? 0
      : cartData.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={styles.root}>
      <NavLink data-testid="homeNavLink" to="/">
        Home
      </NavLink>
      <NavLink data-testid="shopNavLink" to="/shop">
        Shop
      </NavLink>
      <NavLink data-testid="cartNavLink" to="/cart">
        <ShoppingCart></ShoppingCart>
        <span data-testid="cartTotalCount">{totalCount}</span>
      </NavLink>
    </nav>
  );
}
