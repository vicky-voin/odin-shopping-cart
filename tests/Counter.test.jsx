import { screen, render, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Counter from "../src/components/Counter";
import userEvent from "@testing-library/user-event";

describe("Counter component tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders a counter with the default value 0", () => {
    const { container } = render(<Counter onValueChanged={{}}></Counter>);
    expect(container).toMatchSnapshot();

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(0);
  });

  it("pressing plus button increments the count", async () => {
    const callback = vi.fn();
    const user = userEvent.setup();

    render(<Counter onValueChanged={callback}></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[1]);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it("pressing minus button decrements the count", async () => {
    const callback = vi.fn();
    const user = userEvent.setup();

    render(<Counter initialCount={5} onValueChanged={callback}></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(screen.getByRole("spinbutton")).toHaveValue(4);
    expect(callback).toHaveBeenCalledWith(4);
  });

  it("pressing minus button does not decrement below 0", async () => {
    const callback = vi.fn();
    const user = userEvent.setup();

    render(<Counter initialCount={0} onValueChanged={callback}></Counter>);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(screen.getByRole("spinbutton")).toHaveValue(0);
    expect(callback).not.toHaveBeenCalled();
  });

  it("typing into the input field changes the count", async () => {
    const callback = vi.fn();
    const user = userEvent.setup();

    render(<Counter initialCount={0} onValueChanged={callback}></Counter>);
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "12");
    input.blur();

    await waitFor(() => expect(input).toHaveValue(12));
    expect(callback).toHaveBeenCalledWith(12);
  });

  it("typing non-numeric values into the input field does not update the value", async () => {
    const callback = vi.fn();
    const user = userEvent.setup();

    render(<Counter initialCount={3} onValueChanged={callback}></Counter>);
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "+e");
    input.blur();

    await waitFor(() => expect(input).toHaveValue(3));
    expect(callback).not.toHaveBeenCalled();

    await user.clear(input);
    await user.type(input, "404 error");
    input.blur();

    await waitFor(() => expect(input).toHaveValue(404));
    expect(callback).toHaveBeenCalledWith(404);
  });
});
