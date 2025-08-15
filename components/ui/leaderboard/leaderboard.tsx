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

  // Split into top 3 and rest
  const topThree = sortedUsers.slice(0, 3);
  const restOfUsers = sortedUsers.slice(3);

  // Arrange podium in 2nd, 1st, 3rd order for display
  const podiumOrder =
    topThree.length >= 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          Top performers in the past 30 days
        </p>
      </div>

      {/* Podium Section */}
      {topThree.length > 0 && (
        <div className="mb-12">
          <div className="flex items-end justify-center gap-4 mb-8">
            {podiumOrder.map((user, index) => {
              const actualRank = user.rank;
              let height = "h-32";
              let podiumHeight = "h-12";

              if (actualRank === 1) {
                height = "h-40";
                podiumHeight = "h-16";
              } else if (actualRank === 2) {
                height = "h-36";
                podiumHeight = "h-14";
              } else if (actualRank === 3) {
                height = "h-32";
                podiumHeight = "h-12";
              }

              return (
                <div key={user.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-end p-4",
                      height
                    )}
                  >
                    <div className="text-4xl mb-2">
                      {actualRank === 1 ? "🥇" : actualRank === 2 ? "🥈" : "🥉"}
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{user.fullName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.points.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-24 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg border border-amber-300",
                      podiumHeight
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rest of the leaderboard */}
      {restOfUsers.length > 0 && (
        <div className="space-y-3">
          {restOfUsers.map((user) => (
            <LeaderboardEntry
              key={user.id}
              rank={user.rank}
              fullName={user.fullName}
              points={user.points}
            />
          ))}
        </div>
      )}

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
