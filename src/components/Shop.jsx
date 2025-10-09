import { useOutletContext } from "react-router";
import ItemCard from "./ItemCard";

export default function Shop() {
  const { shopData, handleCartUpdated } = useOutletContext();

  const items = shopData.productIds.map((code) => (
    <ItemCard
      itemId={code}
      key={code}
      onCountUpdated={(id, count) => {
        handleCartUpdated(id, count);
      }}
    ></ItemCard>
  ));

  return <>{items}</>;
}
