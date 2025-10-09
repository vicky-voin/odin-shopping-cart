import { describe, it, expect } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import userEvent from "@testing-library/user-event";

describe("Navigation integration", () => {
  it("routes to /shop when Shop is pressed", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    const shopButton = screen.getByTestId("shopNavLink");

    const user = userEvent.setup();
    await user.click(shopButton);

    expect(router.state.location.pathname).toBe("/shop");
  });

  it("routes to /cart when Cart is pressed", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    const cartButton = screen.getByTestId("cartNavLink");

    const user = userEvent.setup();
    await user.click(cartButton);

    expect(router.state.location.pathname).toBe("/cart");
  });

  it("routes to / when Home is pressed", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    //Navigate to Cart first
    const cartButton = screen.getByTestId("cartNavLink");
    const user = userEvent.setup();
    await user.click(cartButton);
    expect(router.state.location.pathname).toBe("/cart");

    const homeButton = screen.getByTestId("homeNavLink");
    await user.click(homeButton);
    expect(router.state.location.pathname).toBe("/");
  });
});

describe("Cart integration", () => {
  it("Cart count in the header updates when an item count is incremented", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    const shopButton = screen.getByTestId("shopNavLink");

    const user = userEvent.setup();
    await user.click(shopButton);

    const incrementButtons = await screen.findAllByRole("button", {
      name: "+",
    });

    await user.click(incrementButtons[0]);

    const cartCount = screen.getByTestId("cartTotalCount");

    expect(cartCount).toHaveTextContent("1");
  });

  it("Cart displays correct items and quantities", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    //Navigating to the store and added two items to the cart
    const shopButton = screen.getByTestId("shopNavLink");
    const user = userEvent.setup();
    await user.click(shopButton);
    let incrementButtons = [];

    await waitFor(async () => {
      incrementButtons = await screen.findAllByRole("button", {
        name: "+",
      });
      expect(incrementButtons.length).toBeGreaterThan(2);
    });

    await user.click(incrementButtons[0]);
    await user.click(incrementButtons[1]);

    //Navigating to the Cart and checking the counts
    const cartButton = screen.getByTestId("cartNavLink");
    await user.click(cartButton);

    await waitFor(async () => {
      const counters = await screen.findAllByRole("spinbutton");
      expect(counters.length).toBe(2);
      counters.forEach((counter) => expect(counter).toHaveValue(1));
    });
  });
});
