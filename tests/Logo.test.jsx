import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Logo from "../src/components/Logo";

describe("Logo component tests", () => {
  it("renders a medium sized logo when no size is specified", () => {
    const { container } = render(<Logo></Logo>);
    expect(container).toMatchSnapshot();
  });

  it("renders a medium logo when a large size is requested", () => {
    const { container } = render(<Logo size={"medium"}></Logo>);

    //I haven't found a reliable way to test non-inline styling,
    // so the test doesn't cover font size change.
    const img = container.querySelector("svg");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "42");
    expect(img).toHaveAttribute("height", "42");
  });

  it("renders a large logo when a medium size is requested", () => {
    const { container } = render(<Logo size={"large"}></Logo>);

    //I haven't found a reliable way to test non-inline styling,
    // so the test doesn't cover font size change.
    const img = container.querySelector("svg");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "128");
    expect(img).toHaveAttribute("height", "128");
  });
});
