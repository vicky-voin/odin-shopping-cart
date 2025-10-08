import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";
import PriceSummary from "./PriceSummary";
import { useFetchAllProducts } from "../hooks/fetchProductData";

export default function Cart() {
  const { shopData } = useOutletContext();

  const products = useFetchAllProducts(shopData.productIds);

  const subtotal = shopData.cartData.reduce((acc, item) => {
    const productData = products.find((x) => x.id === item.id);
    const price = productData != null ? productData.price : 0;
    return acc + item.quantity * price;
  }, 0.0);

  return (
    <>
      <PriceSummary subtotal={subtotal}></PriceSummary>
    </>
  );
}
