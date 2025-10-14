import { Handbag } from "lucide-react";
import styles from "./Logo.module.css";

export default function Logo({ size }) {
  const logoSize = size === "large" ? 128 : 42;
  const textClass = size === "large" ? styles.large : styles.medium;

  return (
    <div className={styles.logoRoot}>
      <div className={`${styles.logoText} ${textClass}`}>every</div>
      <div className={`${styles.logoText} ${textClass}`}>thing</div>
      <div className={`${styles.logoText} ${textClass}`}>shop.</div>
      <div className={styles.logoImage}>
        <Handbag size={logoSize}></Handbag>
      </div>
    </div>
  );
}
