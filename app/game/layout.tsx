import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WeMoney - Financial Education",
  description: "Learn about debt management and financial wellness",
  generator: 'v0.app'
}

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="game-layout">
      {children}
    </div>
  )
}
