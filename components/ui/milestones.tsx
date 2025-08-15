// components/ui/milestones.tsx
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
        <h1 className="text-2xl font-bold mb-6 text-foreground">{title}</h1>
      )}

      <div className="space-y-4">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={clsx(
              "flex items-center justify-between border rounded-lg p-4 transition-colors",
              m.achieved
                ? "bg-popover border-green-400"
                : "bg-card border-border"
            )}
          >
            {/* Left side text */}
            <div>
              <div className="font-semibold text-card-foreground">{m.label}</div>
              <div className="text-sm text-muted-foreground">{m.description}</div>
              {m.achieved && (
                <div className="text-green-500 text-sm font-medium mt-1">
                  Milestone unlocked!
                </div>
              )}
            </div>

            {/* Right side icon */}
            <div className="text-2xl">
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
