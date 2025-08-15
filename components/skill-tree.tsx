"use client"

import { useState } from "react"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Lock, Play, Target, BookOpen, Calculator, PiggyBank, CreditCard } from "lucide-react"

interface LessonNode {
  id: string
  title: string
  type: "lesson" | "challenge"
  status: "completed" | "current" | "locked"
  icon: React.ReactNode
  description: string
}

const lessons: LessonNode[] = [
  {
    id: "lesson-1",
    title: "Understanding Debt",
    type: "lesson",
    status: "completed",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Learn the basics of debt and interest",
  },
  {
    id: "lesson-2",
    title: "Account Review",
    type: "lesson",
    status: "completed",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Review your current accounts",
  },
  {
    id: "challenge-1",
    title: "Interest Rate Hunt",
    type: "challenge",
    status: "current",
    icon: <Target className="h-5 w-5" />,
    description: "Identify your highest interest accounts",
  },
  {
    id: "lesson-3",
    title: "Awareness",
    type: "lesson",
    status: "locked",
    icon: <Calculator className="h-5 w-5" />,
    description: "First Weekly Checkin",
  },
  {
    id: "lesson-4",
    title: "Emergency Fund Basics",
    type: "lesson",
    status: "locked",
    icon: <PiggyBank className="h-5 w-5" />,
    description: "Build your financial safety net",
  },
  {
    id: "lesson-5",
    title: "Budget Optimization",
    type: "lesson",
    status: "locked",
    icon: <Calculator className="h-5 w-5" />,
    description: "Optimize your monthly budget",
  },
  {
    id: "challenge-2",
    title: "Savings Challenge",
    type: "challenge",
    status: "locked",
    icon: <Target className="h-5 w-5" />,
    description: "Complete your first savings goal",
  },
]

const generateOrganicPositions = (count: number) => {
  const positions = []

  for (let i = 0; i < count; i++) {
    // Create a smooth S-curve path
    const progress = i / (count - 1) // 0 to 1
    const centerX = 50
    const amplitude = 15 // How far left/right from center

    // Create smooth sine wave for natural S-curve
    const offset = Math.sin(progress * Math.PI * 2) * amplitude
    const x = centerX + offset

    positions.push({
      x: Math.round(x),
      spacing: 2,
      side: offset < 0 ? 'left' : offset > 0 ? 'right' : 'center'
    })
  }

  return positions
}

const organicPositions = generateOrganicPositions(lessons.length)

export default function SkillTree() {
  const router = useRouter()
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status !== "locked") {
      router.push(`/lesson/${lesson.id}`)
    }
  }



  return (
    <div className="pt-20 px-4 pb-24 min-h-screen">
      <div className="max-w-sm mx-auto relative">
        {/* Milestone */}
        <div className="bg-secondary border-2 border-border rounded-lg p-4 mb-8 shadow-md">
          <div className="text-secondary-foreground font-bold text-xs tracking-wider uppercase font-sans mb-1">DEBT MANAGEMENT</div>
          <div className="text-secondary-foreground font-bold text-xl font-sans leading-tight">Financial Wellness Journey</div>
        </div>

        <div className="relative w-full">
          <div className="relative">
            {lessons.map((lesson, index) => {
              const position = organicPositions[index] || organicPositions[organicPositions.length - 1]
              return (
                <div
                  key={lesson.id}
                  className="relative flex items-center mb-2"
                  style={{
                    marginBottom: `${position.spacing * 8}px`,
                    justifyContent: 'center',
                    transform: `translateX(${position.x - 50}%)`,
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`
                      relative p-0 w-16 h-16 border-4 border-border shadow-lg
                      ${lesson.type === "challenge" ? "rounded-lg" : "rounded-full"}
                      ${
                        lesson.status === "completed"
                          ? "bg-secondary hover:bg-secondary/90 shadow-secondary/20"
                          : lesson.status === "current"
                            ? "bg-secondary hover:bg-secondary/90 shadow-secondary/20 ring-1"
                            : "bg-secondary/40 hover:bg-secondary/60 shadow-secondary/20"
                      }
                      ${lesson.status === "locked" ? "cursor-not-allowed opacity-30 grayscale" : "cursor-pointer"}
                      transition-colors duration-150
                    `}
                    onClick={() => handleLessonClick(lesson)}
                    disabled={lesson.status === "locked"}
                  >
                    <div className="flex items-center justify-center text-secondary-foreground">
                      {lesson.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : lesson.status === "locked" ? (
                        <Lock className="h-6 w-6 opacity-60" />
                      ) : lesson.status === "current" ? (
                        <Play className="h-6 w-6" />
                      ) : (
                        lesson.icon
                      )}
                    </div>
                  </Button>

                  {/* Add connecting line to next lesson */}
                  {index < lessons.length - 1 && (
                    <div className="absolute top-full left-1/2 w-1 h-6 bg-secondary/40 transform -translate-x-1/2 hover:bg-secondary/60 transition-colors duration-200"></div>
                  )}

                  {/* Add diagonal placeholder images */}
                  {index % 3 === 1 && (
                    <div className="absolute -top-2 -right-8 transform rotate-12">
                      <div className="w-6 h-6 bg-secondary/20 border-2 border-secondary/40 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-secondary/60 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  {index % 3 === 2 && (
                    <div className="absolute -top-2 -left-8 transform -rotate-12">
                      <div className="w-6 h-6 bg-secondary/20 border-2 border-secondary/40 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-secondary/60 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
