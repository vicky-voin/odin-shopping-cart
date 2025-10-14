import App from "./App";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
    ],
  },
];

export default routes;
