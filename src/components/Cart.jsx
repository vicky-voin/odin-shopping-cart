import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";
import PriceSummary from "./PriceSummary";
import { useFetchAllProducts } from "../hooks/fetchProductData";
import ItemCard from "./ItemCard";

export default function Cart() {
  const { shopData, handleCartUpdated } = useOutletContext();

  const products = useFetchAllProducts(shopData.productIds);

  const productsInCart = shopData.cartData
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        return { ...product, quantity: item.quantity };
      }
      return null;
    })
    .filter((item) => item !== null);

  const subtotal = productsInCart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0.0);

  const items = productsInCart.map((product) => {
    return (
      <div key={product.id}>
        <ItemCard
          itemId={product.id}
          onCountUpdated={(id, count) => {
            handleCartUpdated(id, count);
          }}
          initialCount={product.quantity}
          isCompact={true}
        ></ItemCard>
        <hr></hr>
      </div>
    );
  });

  const isEmpty = items.length == 0;

  return (
    <>
      <h2>Your cart</h2>
      {isEmpty ? (
        <h3 className={styles.emptyCart}>No items in your cart</h3>
      ) : (
        <div className={styles.contentRoot}>
          <div className={styles.itemsContainer}>{items}</div>
          <div className={styles.summaryContainer}>
            <h3>Summary</h3>
            <hr></hr>
            <PriceSummary subtotal={subtotal}></PriceSummary>
          </div>
        </div>
      )}
    </>
  );
}
