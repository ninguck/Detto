import type React from "react"
import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "WeMoney - Financial Education",
  description: "Learn about debt management and financial wellness",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  )
}
