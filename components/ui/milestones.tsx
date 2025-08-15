'use client';

import React from "react";
import { cn } from "@/lib/utils";

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

export function MilestoneBoard({
  milestones,
  title = "Milestones",
  className,
}: MilestoneBoardProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          Track your major progress achievements
        </p>
      </div>

      {/* List */}
      {milestones.length > 0 ? (
        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-center justify-between rounded-lg border bg-card text-card-foreground px-4 py-3 shadow-sm transition-colors",
                m.achieved
                  ? "border-green-400 bg-popover"
                  : "border-border bg-card"
              )}
            >
              {/* Left text */}
              <div>
                <div className="font-medium">{m.label}</div>
                <div className="text-sm text-muted-foreground">
                  {m.description}
                </div>
                {m.achieved && (
                  <div className="text-green-500 text-xs font-medium mt-1">
                    Milestone unlocked!
                  </div>
                )}
              </div>

              {/* Icon on right side */}
              <div className="text-xl min-w-[28px] text-right">
                {m.achieved ? (
                  "✅"
                ) : (
                  <span className="text-[#0E27F5]">🔒</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No milestones found
          </p>
        </div>
      )}
    </div>
  );
}
