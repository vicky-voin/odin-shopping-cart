import { useState, useRef } from "react";
import styles from "./Counter.module.css";

export default function Counter({ onValueChanged, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const prevValidCount = useRef(initialCount);

  function incrementCount() {
    setCount((prev) => {
      const newCount = prev + 1;

      if (prevValidCount.prev !== prevValidCount.current) {
        onValueChanged(newCount);
      }

      prevValidCount.current = newCount;
      return newCount;
    });
  }

  function decrementCount() {
    setCount((prev) => {
      const newCount = Math.max(prev - 1, 0);

      if (prevValidCount.current !== newCount) {
        onValueChanged(newCount);
      }

      prevValidCount.current = newCount;
      return newCount;
    });
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
    <div>
      <button onClick={decrementCount}>-</button>
      <input
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
