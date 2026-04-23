import { describe, expect, it } from "vitest";

import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  resolveInitialWindowSize,
} from "./windowBounds.ts";

describe("resolveInitialWindowSize", () => {
  it("returns the defaults when no saved size is provided", () => {
    expect(resolveInitialWindowSize(undefined)).toEqual({
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
  });

  it("passes through a valid saved size that exceeds the minima", () => {
    expect(resolveInitialWindowSize({ width: 1440, height: 900 })).toEqual({
      width: 1440,
      height: 900,
    });
  });

  it("clamps a width below the minimum to the minimum", () => {
    expect(resolveInitialWindowSize({ width: 400, height: 900 })).toEqual({
      width: MIN_WINDOW_WIDTH,
      height: 900,
    });
  });

  it("clamps a height below the minimum to the minimum", () => {
    expect(resolveInitialWindowSize({ width: 1200, height: 100 })).toEqual({
      width: 1200,
      height: MIN_WINDOW_HEIGHT,
    });
  });

  it("clamps both dimensions when both fall below the minima", () => {
    expect(resolveInitialWindowSize({ width: 10, height: 10 })).toEqual({
      width: MIN_WINDOW_WIDTH,
      height: MIN_WINDOW_HEIGHT,
    });
  });

  it("rounds non-integer dimensions to whole pixels", () => {
    expect(resolveInitialWindowSize({ width: 1200.7, height: 900.4 })).toEqual({
      width: 1201,
      height: 900,
    });
  });
});
