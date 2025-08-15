"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LeaderboardEntryProps {
  rank: number;
  fullName: string;
  points: number;
  className?: string;
}

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
}

function getRankBadgeVariant(rank: number) {
  if (rank === 1) return "default";
  if (rank === 2) return "secondary";
  if (rank === 3) return "outline";
  return "outline";
}

function getRankIcon(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
}

export function LeaderboardEntry({
  rank,
  fullName,
  points,
  className,
}: LeaderboardEntryProps) {
  const isTopThree = rank <= 3;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md",
        isTopThree &&
          "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800/30",
        !isTopThree && "bg-card hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge
            variant={getRankBadgeVariant(rank)}
            className={cn(
              "min-w-8 h-8 text-sm font-bold",
              (rank === 1 || rank === 2 || rank === 3) &&
                "bg-transparent border-transparent text-2xl p-0 hover:bg-transparent"
            )}
          >
            {getRankIcon(rank) || `#${rank}`}
          </Badge>
        </div>

        <Avatar className="size-10">
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base">{fullName}</h3>
            {rank === 1 && <span className="text-lg animate-bounce">👏</span>}
          </div>
          <p className="text-sm text-muted-foreground">Rank #{rank}</p>
        </div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-bold text-primary">
          {points.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">points</div>
      </div>
    </div>
  );
}
