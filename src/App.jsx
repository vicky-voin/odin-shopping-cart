import { Outlet } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const productIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const [cartData, setCartData] = useState([]);
  const shopContext = { shopData: { productIds, cartData }, setCartData };

  return (
    <>
      <h1>My awesome shop</h1>
      <Navigation cartData={cartData}></Navigation>
      <Outlet context={shopContext}></Outlet>
    </>
  );
}

export default App;
