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
      <ItemCard
        key={product.id}
        itemId={product.id}
        onCountUpdated={(id, count) => {
          handleCartUpdated(id, count);
        }}
        initialCount={product.quantity}
      ></ItemCard>
    );
  });

  return (
    <>
      <div>{items}</div>
      <PriceSummary subtotal={subtotal}></PriceSummary>
    </>
  );
}
