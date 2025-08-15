"use client"

import { Home, TrendingUp, Gamepad2, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "track", label: "Track", icon: TrendingUp },
  { id: "game", label: "Game", icon: Gamepad2, active: true },
  { id: "community", label: "Community", icon: Users },
  { id: "learn", label: "Learn", icon: BookOpen },
]

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-border shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`
                flex flex-col items-center gap-1 p-2 h-auto min-w-0 flex-1
                ${item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <div className={`p-2 border-2 border-border rounded-md shadow-xs ${item.active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-bold font-sans ${item.active ? "text-primary" : "text-muted-foreground"}`}>{item.label}</span>
            </Button>
          )
        })}
      </div>

      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-foreground/20 rounded-full" />
      </div>
    </nav>
  )
}
