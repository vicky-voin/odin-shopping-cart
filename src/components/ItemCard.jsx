import { useFetchProduct } from "../hooks/fetchProductData";
import formatInUSD from "../utils/priceConverter";
import Counter from "./Counter";
import styles from "./ItemCard.module.css";

export default function ItemCard({
  itemId,
  onCountUpdated,
  initialCount = 0,
  isCompact = false,
}) {
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

  const rootClass = `${styles.cardRoot}${
    isCompact ? ` ${styles.compact}` : ""
  }`;

  return (
    <div className={rootClass}>
      {data !== null && (
        <div className={styles.contentRoot}>
          <div className={styles.itemInfo}>
            <h2 className={styles.title}>{data.title}</h2>
            <h3 className={styles.price}>{formattedPrice}</h3>
            {!isCompact && (
              <p className={styles.description}>{data.description}</p>
            )}
          </div>
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
