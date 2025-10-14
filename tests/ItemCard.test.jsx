import { vi, describe, it, expect, afterEach } from "vitest";
import { screen, render } from "@testing-library/react";
import ItemCard from "../src/components/ItemCard";
import formatInUSD from "../src/utils/priceConverter";

describe("Item Card component tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders a skekelton card when no data provided", () => {
    const { container } = render(<ItemCard></ItemCard>);
    expect(container).toMatchSnapshot();
  });

  it("fills out the item fields correctly", async () => {
    const data = getFakeData();
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
      })
    );

    render(<ItemCard></ItemCard>);

    const formattedPrice = formatInUSD(data.price);

    await screen.findByText(data.title);
    await screen.findByText(data.description);
    await screen.findByText(formattedPrice);
    const img = await screen.findByRole("img");
    expect(img).toHaveAttribute("src", data.imageUrl);
  });

  it("renders error message in card on error", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => "Server error: could not fetch item",
      })
    );

    render(<ItemCard></ItemCard>);

    await screen.findByText("Error: could not load item");
  });

  function getFakeData() {
    return {
      title: "Fake Item",
      description: "Fake Item description",
      image: "www.google.com",
      price: "120.5",
    };
  }
});
