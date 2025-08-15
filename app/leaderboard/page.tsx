import { Leaderboard, type LeaderboardUser } from "@/components/ui/leaderboard";
import leaderboardData from "@/lib/mock-leaderboard-data.json";

export default function LeaderboardPage() {
  // Cast the imported JSON data to the proper type
  const users = leaderboardData as LeaderboardUser[];

  return (
    <div className="container mx-auto px-4 py-8">
      <Leaderboard
        users={users}
        title="WeMoney Champions"
        className="min-h-screen"
      />
    </div>
  );
}
