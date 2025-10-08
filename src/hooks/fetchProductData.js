import { useEffect, useState } from "react";

const useFetchProduct = (itemId) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchProduct(
      itemId,
      (result) => {
        setData(result);
      },
      () => {
        setData(null);
        setIsError(true);
      }
    );
  }, [itemId]);

  return { data, isError };
};

const useFetchAllProducts = (ids) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const promises = [];

    ids.forEach((id) =>
      promises.push(
        new Promise((resolve, reject) => {
          fetchProduct(id, resolve, reject);
        }).then((result) => {
          setProducts((prev) => [...prev, result]);
        })
      )
    );

    Promise.all(promises);
  }, [ids, setProducts]);

  return products;
};

function fetchProduct(id, onSuccess, onError) {
  fetch("https://fakestoreapi.com/products/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => onSuccess(responseData))
    .catch((error) => {
      console.error("Fetch error:", error);
      onError();
    });
}

export { useFetchProduct, useFetchAllProducts };
