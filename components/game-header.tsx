import { ArrowLeft, Crown, Flame, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameHeaderProps {
  guildPosition: number
  currentStreak: number
  livesLeft: number
}

export default function GameHeader({ guildPosition, currentStreak, livesLeft }: GameHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-border shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Back button */}
        <Button variant="ghost" size="sm" className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Button>

        {/* Status indicators */}
        <div className="flex items-center gap-4">
          <div className="bg-secondary border-2 border-border rounded-md shadow-xs flex items-center gap-2 px-3 py-2">
            <Crown className="h-4 w-4 text-secondary-foreground" />
            <span className="font-black text-secondary-foreground text-lg font-sans">{guildPosition}</span>
          </div>

          {/* Current streak */}
          <div className="bg-primary border-2 border-border rounded-md shadow-xs flex items-center gap-2 px-3 py-2">
            <Flame className="h-4 w-4 text-primary-foreground" />
            <span className="font-black text-primary-foreground text-lg font-sans">{currentStreak}</span>
          </div>

          <div className="bg-destructive border-2 border-border rounded-md shadow-xs flex items-center gap-2 px-3 py-2">
            <Heart className="h-4 w-4 text-destructive-foreground fill-destructive-foreground" />
            <span className="font-black text-destructive-foreground text-lg font-sans">{livesLeft}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
