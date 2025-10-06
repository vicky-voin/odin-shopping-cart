import { useState } from "react";
import styles from "./Counter.module.css";

export default function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      <div>
        <button>-</button>
        <input
          className={styles.inputValue}
          type="number"
          defaultValue={count}
        ></input>
        <button>+</button>
      </div>
    </>
  );
}
