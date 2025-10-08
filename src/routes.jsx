import App from "./App";
import Shop from "./components/Shop";
import Cart from "./components/Cart";

const routes = [
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <h2>Home</h2>,
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
