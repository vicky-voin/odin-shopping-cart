import useProductData from "../hooks/useProductData";
import styles from "./ItemCard.module.css";

export default function ItemCard({ itemId }) {
  const { data, isError } = useProductData(itemId);

  return (
    <div className={styles.cardRoot}>
      {data !== null && (
        <div className={styles.contentRoot}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
          <img className={styles.productImage} src={data.image}></img>
        </div>
      )}
      {isError && (
        <div className={styles.errorContent}>Error: could not load item</div>
      )}
    </div>
  );
}
