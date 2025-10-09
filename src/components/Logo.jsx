import { Handbag } from "lucide-react";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoRoot}>
      <div className={styles.logoText}>every</div>
      <div className={styles.logoText}>thing</div>
      <div className={styles.logoText}>shop.</div>
      <div className={styles.logoImage}>
        <Handbag size={52}></Handbag>
      </div>
    </div>
  );
}
