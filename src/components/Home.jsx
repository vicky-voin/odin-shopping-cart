import Logo from "./Logo";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <div className={styles.logoRoot}>
        <Logo size={"large"}></Logo>
      </div>
      <div className={styles.legendRoot}>
        <h2 className={styles.card}>Free shipping for orders over 100$</h2>
        <h2 className={styles.card}>
          A large selection of clothes, jewelry, tech products
        </h2>
      </div>
      <h3>Everything you need and more!</h3>
    </div>
  );
}
