"use client";

import * as React from "react";

type Props = {
  /** Sun..Sat, e.g. [true, true, true, true, true, false, false] */
  completed: boolean[];
  /** Optional day labels */
  labels?: string[];
  /** Brand color for completed dots + connectors */
  color?: string;
  /** Size of each dot (px) */
  size?: number;
  /** Show current streak count on the right */
  showStreakCount?: boolean;
};

const DEFAULT_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function StreakBar({
  completed,
  labels = DEFAULT_LABELS,
  color = "#F4C430", // Duolingo‑ish gold
  size = 16,
  showStreakCount = true,
}: Props) {
  // current streak = consecutive 'true' from the end
  let current = 0;
  for (let i = completed.length - 1; i >= 0 && completed[i]; i--) current++;

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-3">
        {/* Bar */}
        <div className="flex-1 flex items-center">
          {completed.map((done, i) => {
            const isLast = i === completed.length - 1;
            return (
              <div key={i} className="flex items-center">
                {/* Dot */}
                <div className="flex flex-col items-center">
                  <div
                    aria-label={`${labels[i]} ${done ? "completed" : "missed"}`}
                    role="img"
                    className="rounded-full border"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: done ? color : "transparent",
                      borderColor: done ? color : "rgba(0,0,0,0.2)",
                    }}
                  />
                  <span className="mt-1 text-xs text-gray-500">{labels[i]}</span>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div
                    aria-hidden
                    className="mx-2"
                    style={{
                      width: 28,
                      height: 2,
                      backgroundColor: done && completed[i + 1] ? color : "rgba(0,0,0,0.15)",
                      borderRadius: 999,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Streak count */}
        {showStreakCount && (
          <div
            className="text-sm font-semibold px-2 py-1 rounded"
            style={{ color: "#111", backgroundColor: `${color}26` }} // subtle tint
            aria-label={`Current streak ${current} day${current === 1 ? "" : "s"}`}
          >
            🔥 {current}
          </div>
        )}
      </div>
    </div>
  );
}
