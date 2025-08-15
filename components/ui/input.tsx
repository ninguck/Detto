"use client";
import * as React from "react";

type Props = {
  /** Sun..Sat, e.g. [true,true,true,true,true,false,false] */
  completed: boolean[];
  /** Optional day labels (defaults to Sun..Sat) */
  labels?: string[];
  /** Brand/badge color for completed nodes + connectors */
  color?: string; // default = Duolingo-like gold
  /** Extra className for outer wrapper */
  className?: string;
};

export default function StreakBar({
  completed,
  labels = ["S", "M", "T", "W", "T", "F", "S"],
  color = "#F5B800",
  className = "",
}: Props) {
  // Normalize to 7 booleans
  const items = Array.from({ length: 7 }, (_, i) => Boolean(completed[i]));

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-7 gap-2 text-center">
        {labels.map((label, i) => {
          const isDone = items[i];
          const prevDone = i > 0 ? items[i - 1] : false;

          return (
            <div key={`${label}-${i}`} className="flex flex-col items-center gap-1">
              {/* Day label */}
              <div className="text-gray-600 text-xs">{label}</div>

              {/* Node + connector */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* connector from previous node */}
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 h-2 w-3 rounded-full"
                    style={{ backgroundColor: prevDone ? color : "#E5E7EB" }}
                  />
                )}

                {/* node */}
                <div
                  aria-label={`${label} ${isDone ? "completed" : "not completed"}`}
                  className={`grid h-10 w-10 place-items-center rounded-full border font-semibold select-none ${
                    isDone ? "text-white shadow-sm" : "text-transparent"
                  }`}
                  style={{
                    backgroundColor: isDone ? color : "#F3F4F6",
                    borderColor: isDone ? color : "#D1D5DB",
                  }}
                >
                  ✓
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
