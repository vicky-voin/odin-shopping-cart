import { useOutletContext } from "react-router";
import ItemCard from "./ItemCard";

export default function Shop() {
  const { shopData, setCartData } = useOutletContext();

  const items = shopData.productIds.map((code) => (
    <ItemCard
      itemId={code}
      key={code}
      onCountUpdated={(count) => {
        setCartData((prevCartData) => {
          const item = prevCartData.find((x) => x.id === code);
          if (item != null) {
            if (count === 0) {
              return prevCartData.filter((x) => x.id !== code);
            } else {
              return prevCartData.map((x) =>
                x.id === code ? { ...x, quantity: count } : x
              );
            }
          } else {
            return [...prevCartData, { id: code, quantity: count }];
          }
        });
      }}
    ></ItemCard>
  ));

  return <>{items}</>;
}
