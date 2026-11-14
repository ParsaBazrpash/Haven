import { expect, test } from "vitest";
import { formatDuration, formatLocalTimestamp, formatTimestamp } from "@/lib/time";

test("formats durations and local timestamps", () => {
  expect(formatDuration(0)).toBe("00:00:00");
  expect(formatDuration(90_000)).toBe("00:01:30");
  expect(formatDuration(-1000)).toBe("-00:00:01");
  expect(formatDuration(72 * 60 * 60 * 1000)).toBe("72:00:00");
  const created = new Date("2026-11-07T23:19:00.000Z");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const local = [
    String(created.getDate()).padStart(2, "0"),
    months[created.getMonth()],
    `${String(created.getHours()).padStart(2, "0")}:${String(created.getMinutes()).padStart(2, "0")}`,
  ].join(" ");
  expect(formatTimestamp(created)).toBe(local);
  expect(formatTimestamp(created.toISOString())).toBe(local);
  expect(formatLocalTimestamp(created)).toBe(local);
  expect(formatLocalTimestamp(created.toISOString())).toBe(local);
  expect(formatTimestamp("2026-11-07T14:12:00.000Z")).toBe(formatLocalTimestamp("2026-11-07T14:12:00.000Z"));
});
