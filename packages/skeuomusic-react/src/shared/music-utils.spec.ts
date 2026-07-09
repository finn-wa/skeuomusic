import { describe, expect, it } from "vitest";
import { HOURS_MS, MINS_MS, SECS_MS } from "./constants";
import { formatTrackTimeMs } from "./music-utils";

describe(formatTrackTimeMs.name, () => {
  function formatDuration(h = 0, m = 0, s = 0, ms = 0) {
    const durationMs = h * HOURS_MS + m * MINS_MS + s * SECS_MS + ms;
    return formatTrackTimeMs(durationMs);
  }

  it("should format milliseconds into mm:ss", () => {
    expect(formatDuration(0, 2, 14)).toBe("2:14");
    expect(formatDuration(0, 20, 40)).toBe("20:40");
    expect(formatDuration(0, 9, 9)).toBe("9:09");
    expect(formatDuration(0, 7)).toBe("7:00");
    expect(formatDuration(0, 1, 59)).toBe("1:59");
    expect(formatDuration(0, 0, 30)).toBe("0:30");
    expect(formatDuration(0)).toBe("0:00");
  });

  it("should round to the nearest second", () => {
    expect(formatDuration(0, 0, 0, 499)).toBe("0:00");
    expect(formatDuration(0, 0, 0, 500)).toBe("0:01");
    expect(formatDuration(0, 0, 0, 999)).toBe("0:01");
    expect(formatDuration(0, 0, 0, 1499)).toBe("0:01");

    expect(formatDuration(0, 0, 8, 500)).toBe("0:09");
    expect(formatDuration(0, 0, 9, 499)).toBe("0:09");
    expect(formatDuration(0, 0, 9, 500)).toBe("0:10");

    expect(formatDuration(0, 0, 59, 499)).toBe("0:59");
    expect(formatDuration(0, 0, 59, 500)).toBe("1:00");
    expect(formatDuration(0, 1, 0, 499)).toBe("1:00");
    expect(formatDuration(0, 1, 0, 500)).toBe("1:01");

    expect(formatDuration(0, 1, 9, 499)).toBe("1:09");
    expect(formatDuration(0, 1, 9, 500)).toBe("1:10");
    expect(formatDuration(0, 1, 9, 999)).toBe("1:10");

    expect(formatDuration(0, 59, 59, 499)).toBe("59:59");
    expect(formatDuration(1, 0, 0, 499)).toBe("1:00:00");
    expect(formatDuration(1, 0, 0, 500)).toBe("1:00:01");
    expect(formatDuration(1, 0, 0, 999)).toBe("1:00:01");
    expect(formatDuration(1, 0, 1, 499)).toBe("1:00:01");

    expect(formatDuration(1, 0, 8, 500)).toBe("1:00:09");
    expect(formatDuration(10, 0, 9, 499)).toBe("10:00:09");
    expect(formatDuration(1, 0, 9, 500)).toBe("1:00:10");

    expect(formatDuration(1, 0, 59, 499)).toBe("1:00:59");
    expect(formatDuration(1, 0, 59, 500)).toBe("1:01:00");
    expect(formatDuration(1, 1, 0, 499)).toBe("1:01:00");
    expect(formatDuration(1, 1, 0, 500)).toBe("1:01:01");

    expect(formatDuration(1, 1, 9, 499)).toBe("1:01:09");
    expect(formatDuration(1, 1, 9, 500)).toBe("1:01:10");
    expect(formatDuration(2, 1, 9, 999)).toBe("2:01:10");
  });
});
