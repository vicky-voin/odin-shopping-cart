import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Navigation from "../src/components/Navigation";
import { MemoryRouter } from "react-router";

describe("Navigation component tests", () => {
  it("renders navigation links", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation cartData={[]}></Navigation>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
