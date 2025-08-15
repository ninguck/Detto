import GameHeader from "@/components/game-header"
import SkillTree from "@/components/skill-tree"
import { BottomNavigation } from "@/components/bottom-navigation"
import { NavigationHeader } from "@/components/navigation-header"

export default function GamePage() {
  return (
    <div className="min-h-screen">
      <NavigationHeader userName="John Doe" currentStreak={12} totalPoints={100} />

      <SkillTree />

      <BottomNavigation />
    </div>
  )
}
