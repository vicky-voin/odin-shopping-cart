import { useState, useRef } from "react";
import styles from "./Counter.module.css";

export default function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const prevValidCount = useRef(initialCount);

  function incrementCount() {
    setCount((prev) => {
      prevValidCount.current = prev + 1;
      return prev + 1;
    });
  }

  function decrementCount() {
    setCount((prev) => {
      const newCount = Math.max(prev - 1, 0);
      prevValidCount.current = newCount;
      return newCount;
    });
  }

  function handleInputChange(event) {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value === "" ? "" : Number(value));
      if (value !== "") {
        prevValidCount.current = Number(value);
      }
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
    // If count is empty or not a valid number, reset to previous valid count
    if (count === "" || isNaN(count)) {
      setCount(prevValidCount.current);
    }
  }

  return (
    <>
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
    </>
  );
}
