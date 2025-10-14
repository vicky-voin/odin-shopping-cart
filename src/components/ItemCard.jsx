import { useFetchProduct } from "../hooks/fetchProductData";
import formatInUSD from "../utils/priceConverter";
import Counter from "./Counter";
import styles from "./ItemCard.module.css";

export default function ItemCard({ itemId, onCountUpdated, initialCount = 0 }) {
  const { data, isError } = useFetchProduct(itemId);
  const formattedPrice = formatInUSD(data == null ? "0.0" : data.price);

  function handleCounterChange(value) {
    onCountUpdated(itemId, value);
  }

  const skeletonCard = (
    <div className={`${styles.contentRoot} ${styles.loading}`}>
      <h2 className={styles.title}></h2>
      <div className={styles.productImage}></div>
    </div>
  );

  return (
    <div className={styles.cardRoot}>
      {data !== null && (
        <div className={styles.contentRoot}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
          <h3 className={styles.price}>{formattedPrice}</h3>
          <div className={styles.counter}>
            <Counter
              onValueChanged={(value) => handleCounterChange(value)}
              initialCount={initialCount}
            ></Counter>
          </div>
          <img className={styles.productImage} src={data.image}></img>
        </div>
      )}
      {!isError && data === null && skeletonCard}
      {isError && (
        <div className={styles.errorContent}>Error: could not load item</div>
      )}
    </div>
  );
}
