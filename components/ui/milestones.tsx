'use client';

import React from "react";
import clsx from "clsx";

export interface Milestone {
  id: number;
  label: string;
  description: string;
  achieved: boolean;
}

interface MilestoneBoardProps {
  milestones: Milestone[];
  title?: string;
  className?: string;
}

export function MilestoneBoard({ milestones, title, className }: MilestoneBoardProps) {
  return (
    <div className={clsx("w-full", className)}>
      {title && (
        <h1 className="text-xl font-bold mb-3 text-foreground">{title}</h1>
      )}

      <div className="space-y-2">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={clsx(
              "flex items-center justify-between border rounded-md px-3 py-2 transition-colors",
              m.achieved
                ? "bg-popover border-green-400"
                : "bg-card border-border"
            )}
          >
            {/* Left text */}
            <div>
              <div className="font-medium text-sm text-card-foreground">
                {m.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {m.description}
              </div>
              {m.achieved && (
                <div className="text-green-500 text-xs font-medium mt-0.5">
                  Milestone unlocked!
                </div>
              )}
            </div>

            {/* Right icon */}
            <div className="text-lg min-w-[24px] text-right">
              {m.achieved ? (
                "✅"
              ) : (
                <span className="text-[#0E27F5]">🔒</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
