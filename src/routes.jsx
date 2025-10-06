import App from "./App";
import Shop from "./components/Shop";

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
        element: <h2>Cart</h2>,
      },
    ],
  },
];

export default routes;
