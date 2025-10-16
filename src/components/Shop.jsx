import { useOutletContext } from "react-router";
import ItemCard from "./ItemCard";

export default function Shop() {
  const { shopData, handleCartUpdated } = useOutletContext();

  const items = shopData.productIds.map((code) => {
    const cartItem = shopData.cartData.find((item) => item.id === code);
    const initialCount = cartItem ? cartItem.quantity : 0;
    return (
      <ItemCard
        itemId={code}
        key={code}
        onCountUpdated={(id, count) => {
          handleCartUpdated(id, count);
        }}
        initialCount={initialCount}
      />
    );
  });

  return <>{items}</>;
}
