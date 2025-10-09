import { Outlet } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const productIds = Array.from({ length: 20 }, (_, i) => i + 1);

  const [cartData, setCartData] = useState([]);
  const shopContext = {
    shopData: { productIds, cartData },
    handleCartUpdated,
  };

  function handleCartUpdated(itemId, newCount) {
    const item = cartData.find((x) => x.id === itemId);
    if (item != null) {
      if (newCount === 0) {
        setCartData(cartData.filter((x) => x.id !== itemId));
      } else {
        setCartData(
          cartData.map((x) =>
            x.id === itemId ? { ...x, quantity: newCount } : x
          )
        );
      }
    } else {
      setCartData([...cartData, { id: itemId, quantity: newCount }]);
    }
  }

  return (
    <>
      <h1>My awesome shop</h1>
      <Navigation cartData={cartData}></Navigation>
      <Outlet context={shopContext}></Outlet>
    </>
  );
}

export default App;
