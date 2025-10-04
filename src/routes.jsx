import App from "./App";

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
        element: <h2>Shop</h2>,
      },
      {
        path: "/cart",
        element: <h2>Cart</h2>,
      },
    ],
  },
];

export default routes;
