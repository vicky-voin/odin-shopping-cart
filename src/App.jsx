import { Outlet } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
  const productIds = [1, 2];
  const cartData = {
    products: [],
  };

  const shopContext = { productIds, cartData };

  return (
    <>
      <h1>My awesome shop</h1>
      <Navigation></Navigation>
      <Outlet context={shopContext}></Outlet>
    </>
  );
}

export default App;
