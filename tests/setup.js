import { cleanup } from "@testing-library/react";
import { afterAll, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterAll(() => {
  cleanup();
});
