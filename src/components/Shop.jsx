import { useOutletContext } from "react-router";
import ItemCard from "./ItemCard";

export default function Shop() {
  const shopData = useOutletContext();

  const items = shopData.productIds.map((code) => (
    <ItemCard itemId={code} key={code}></ItemCard>
  ));

  return <>{items}</>;
}
