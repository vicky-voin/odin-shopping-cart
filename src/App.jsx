import { Outlet } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <h1>My awesome shop</h1>
      <Navigation></Navigation>
      <Outlet></Outlet>
    </>
  );
}

export default App;
