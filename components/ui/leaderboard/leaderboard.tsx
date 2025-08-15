"use client";

import * as React from "react";
import { LeaderboardEntry } from "./leaderboard-entry";
import { cn } from "@/lib/utils";

export interface LeaderboardUser {
  id: number;
  fullName: string;
  points: number;
  rank: number;
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  title?: string;
  className?: string;
}

export function Leaderboard({
  users,
  title = "Leaderboard",
  className,
}: LeaderboardProps) {
  // Sort users by rank to ensure proper ordering
  const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">Top performers this period</p>
      </div>

      <div className="space-y-3">
        {sortedUsers.map((user) => (
          <LeaderboardEntry
            key={user.id}
            rank={user.rank}
            fullName={user.fullName}
            points={user.points}
          />
        ))}
      </div>

      {sortedUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No users found in the leaderboard
          </p>
        </div>
      )}
    </div>
  );
}
