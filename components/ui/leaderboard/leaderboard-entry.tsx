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
  // Since top 3 are handled by podium, this component only handles rank 4+
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md bg-card hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="min-w-8 h-8 text-sm font-bold">
          #{rank}
        </Badge>

        <Avatar className="size-10">
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-base">{fullName}</h3>
          <p className="text-sm text-muted-foreground">Rank #{rank}</p>
        </div>
      </div>

      <div className="text-right">
        <div className="text-xl font-bold text-primary">
          {points.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">points</div>
      </div>
    </div>
  );
}
