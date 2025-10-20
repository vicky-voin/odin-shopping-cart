import { useState, useRef } from "react";
import styles from "./Counter.module.css";

export default function Counter({ onValueChanged, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const prevValidCount = useRef(initialCount);

  function incrementCount() {
    const newCount = count + 1;
    setCount(newCount);
    onValueChanged(newCount);
  }

  function decrementCount() {
    if (count === 0) return;
    const newCount = count - 1;
    setCount(newCount);
    onValueChanged(newCount);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const newCount = value === "" ? "" : Number(value);
      setCount(newCount);
    }
  }

  function handleKeyDown(event) {
    if (
      event.key === "e" ||
      event.key === "E" ||
      event.key === "+" ||
      event.key === "-" ||
      event.key === "."
    ) {
      event.preventDefault();
    }
  }

  function handleBlur() {
    if (count === "" || isNaN(count)) {
      setCount(prevValidCount.current);
    } else {
      if (prevValidCount.current !== count) {
        onValueChanged(count);
        prevValidCount.current = count;
      }
    }
  }

  return (
    <div className={styles.counterRoot}>
      <button onClick={decrementCount}>-</button>
      <input
        aria-label="quantity"
        className={styles.inputValue}
        type="number"
        value={count}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <button onClick={incrementCount}>+</button>
    </div>
  );
}
