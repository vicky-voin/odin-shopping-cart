import { screen, render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "../src/components/Counter";
import userEvent from "@testing-library/user-event";

describe("Counter component tests", () => {
  it("renders a counter with the default value 0", () => {
    const { container } = render(<Counter></Counter>);
    expect(container).toMatchSnapshot();

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(0);
  });

  it("pressing plus button increments the count", async () => {
    const user = userEvent.setup();

    render(<Counter></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[1]);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("pressing minus button decrements the count", async () => {
    const user = userEvent.setup();

    render(<Counter initialCount={5}></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(screen.getByRole("spinbutton")).toHaveValue(4);
  });

  it("pressing minus button does not decrement below 0", async () => {
    const user = userEvent.setup();

    render(<Counter initialCount={0}></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(screen.getByRole("spinbutton")).toHaveValue(0);
  });

  it("typing into the input field changes the count", async () => {
    const user = userEvent.setup();

    render(<Counter initialCount={0}></Counter>);
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "12");

    await waitFor(() => expect(input).toHaveValue(12));
  });

  it("typing non-numeric values into the input field does not update the value", async () => {
    const user = userEvent.setup();

    render(<Counter initialCount={3}></Counter>);
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "+e");
    input.blur();

    await waitFor(() => expect(input).toHaveValue(3));

    await user.clear(input);
    await user.type(input, "404 error");
    input.blur();

    await waitFor(() => expect(input).toHaveValue(404));
  });
});
