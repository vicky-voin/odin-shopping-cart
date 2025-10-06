import useProductData from "../hooks/useProductData";

export default function ItemCard({ itemId }) {
  const { data, isError } = useProductData(itemId);

  return (
    <div>
      {data !== null && (
        <div>
          <div>{data.title}</div>
          <div>{data.description}</div>
          <img src={data.imageUrl}></img>
        </div>
      )}
      {isError && <div>Error: could not load item</div>}
    </div>
  );
}
