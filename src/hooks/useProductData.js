import { useEffect, useState } from "react";

const useProductData = (itemId) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + itemId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => setData(responseData))
      .catch((error) => {
        console.error("Fetch error:", error);
        setData(null);
        setIsError(true);
      });
  }, [itemId]);

  return { data, isError };
};

export default useProductData;
