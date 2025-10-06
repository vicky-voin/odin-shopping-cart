import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "../src/components/Counter";

describe("Counter component tests", () => {
  it("renders a counter with the default value 0", () => {
    const { container } = render(<Counter></Counter>);
    expect(container).toMatchSnapshot();

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("value", "0");
  });
});
