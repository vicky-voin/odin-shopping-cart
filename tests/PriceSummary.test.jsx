import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import PriceSummary from "../src/components/PriceSummary";
import formatInUSD from "../src/utils/priceConverter";

describe("Price summary tests", () => {
  it("renders 0 for prices if no items passed in", () => {
    const { container } = render(<PriceSummary subtotal={0}></PriceSummary>);
    expect(container).toMatchSnapshot();

    const defaultPrice = formatInUSD(0.0);

    expect(screen.getByTestId("subtotalValue")).toHaveTextContent(defaultPrice);
    expect(screen.getByTestId("shippingValue")).toHaveTextContent(defaultPrice);
    expect(screen.getByTestId("taxValue")).toHaveTextContent(defaultPrice);
    expect(screen.getByTestId("totalValue")).toHaveTextContent(defaultPrice);
  });

  it("renders correct total if subtotal is > 0", () => {
    const testSubtotal = 20;

    const { container } = render(
      <PriceSummary subtotal={testSubtotal}></PriceSummary>
    );

    const expectedShipping = 15;
    const expectedTax = 0.13 * testSubtotal;
    const expectedTotal = testSubtotal + expectedShipping + expectedTax;

    expect(screen.getByTestId("subtotalValue")).toHaveTextContent(
      formatInUSD(testSubtotal)
    );
    expect(screen.getByTestId("shippingValue")).toHaveTextContent(
      formatInUSD(expectedShipping)
    );
    expect(screen.getByTestId("taxValue")).toHaveTextContent(
      formatInUSD(expectedTax)
    );
    expect(screen.getByTestId("totalValue")).toHaveTextContent(
      formatInUSD(expectedTotal)
    );
  });
});
