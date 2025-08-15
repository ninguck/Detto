"use client"

import { Leaderboard, type LeaderboardUser } from "@/components/ui/leaderboard";
import { BottomNavigation } from "@/components/bottom-navigation";
import leaderboardData from "@/lib/mock-leaderboard-data.json";

export default function LeaderboardPage() {
  // Cast the imported JSON data to the proper type
  const users = leaderboardData as LeaderboardUser[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pb-32">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-sm text-gray-600">See how you rank among friends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Leaderboard
          users={users}
          title="WeMoney Champions"
          className="min-h-screen"
        />
      </div>

      <BottomNavigation />
    </div>
  );
}