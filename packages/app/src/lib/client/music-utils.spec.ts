import { describe, expect, it } from "vitest";
import { HOURS_MS, MINS_MS, SECS_MS } from "../constants";
import { formatTrackTimeMs } from "./music-utils";

describe(formatTrackTimeMs.name, () => {
  function expectFormattedDuration(h = 0, m = 0, s = 0, ms = 0) {
    const durationMs = h * HOURS_MS + m * MINS_MS + s * SECS_MS + ms;
    return expect(formatTrackTimeMs(durationMs));
  }

  it("should format milliseconds into mm:ss", () => {
    expectFormattedDuration(0, 2, 14).toBe("2:14");
    expectFormattedDuration(0, 20, 40).toBe("20:40");
    expectFormattedDuration(0, 9, 9).toBe("9:09");
    expectFormattedDuration(0, 7).toBe("7:00");
    expectFormattedDuration(0, 1, 59).toBe("1:59");
    expectFormattedDuration(0, 0, 30).toBe("0:30");
    expectFormattedDuration(0).toBe("0:00");
  });

  it("should round to the nearest second", () => {
    expectFormattedDuration(0, 0, 0, 499).toBe("0:00");
    expectFormattedDuration(0, 0, 0, 500).toBe("0:01");
    expectFormattedDuration(0, 0, 0, 999).toBe("0:01");
    expectFormattedDuration(0, 0, 0, 1499).toBe("0:01");

    expectFormattedDuration(0, 0, 8, 500).toBe("0:09");
    expectFormattedDuration(0, 0, 9, 499).toBe("0:09");
    expectFormattedDuration(0, 0, 9, 500).toBe("0:10");

    expectFormattedDuration(0, 0, 59, 499).toBe("0:59");
    expectFormattedDuration(0, 0, 59, 500).toBe("1:00");
    expectFormattedDuration(0, 1, 0, 499).toBe("1:00");
    expectFormattedDuration(0, 1, 0, 500).toBe("1:01");

    expectFormattedDuration(0, 1, 9, 499).toBe("1:09");
    expectFormattedDuration(0, 1, 9, 500).toBe("1:10");
    expectFormattedDuration(0, 1, 9, 999).toBe("1:10");

    expectFormattedDuration(0, 59, 59, 499).toBe("59:59");
    expectFormattedDuration(1, 0, 0, 499).toBe("1:00:00");
    expectFormattedDuration(1, 0, 0, 500).toBe("1:00:01");
    expectFormattedDuration(1, 0, 0, 999).toBe("1:00:01");
    expectFormattedDuration(1, 0, 1, 499).toBe("1:00:01");

    expectFormattedDuration(1, 0, 8, 500).toBe("1:00:09");
    expectFormattedDuration(10, 0, 9, 499).toBe("10:00:09");
    expectFormattedDuration(1, 0, 9, 500).toBe("1:00:10");

    expectFormattedDuration(1, 0, 59, 499).toBe("1:00:59");
    expectFormattedDuration(1, 0, 59, 500).toBe("1:01:00");
    expectFormattedDuration(1, 1, 0, 499).toBe("1:01:00");
    expectFormattedDuration(1, 1, 0, 500).toBe("1:01:01");

    expectFormattedDuration(1, 1, 9, 499).toBe("1:01:09");
    expectFormattedDuration(1, 1, 9, 500).toBe("1:01:10");
    expectFormattedDuration(2, 1, 9, 999).toBe("2:01:10");
  });
});
