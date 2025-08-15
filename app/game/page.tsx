import GameHeader from "@/components/game-header"
import SkillTree from "@/components/skill-tree"
import BottomNavigation from "@/components/bottom-navigation"

export default function GamePage() {
  return (
    <div className="min-h-screen">
      <GameHeader guildPosition={1} currentStreak={12} livesLeft={3} />

      <SkillTree />

      <BottomNavigation />
    </div>
  )
}
