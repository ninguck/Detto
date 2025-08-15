"use client"

import { useState } from "react"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Play, Target, BookOpen, Calculator, PiggyBank, CreditCard, Flag } from "lucide-react"

interface LessonNode {
  id: string
  title: string
  type: "lesson" | "challenge"
  status: "completed" | "current" | "available"
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
    status: "available",
    icon: <Calculator className="h-5 w-5" />,
    description: "First Weekly Checkin",
  },
  {
    id: "lesson-4",
    title: "Emergency Fund Basics",
    type: "lesson",
    status: "available",
    icon: <PiggyBank className="h-5 w-5" />,
    description: "Build your financial safety net",
  },
  {
    id: "lesson-5",
    title: "Budget Optimization",
    type: "lesson",
    status: "available",
    icon: <Calculator className="h-5 w-5" />,
    description: "Optimize your monthly budget",
  },

  {
    id: "challenge-2",
    title: "Savings Challenge",
    type: "challenge",
    status: "available",
    icon: <Target className="h-5 w-5" />,
    description: "Complete your first savings goal",
  },

  {
    id: "lesson-6",
    title: "Investment Basics",
    type: "lesson",
    status: "available",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Learn about investment fundamentals",
  },
  {
    id: "lesson-7",
    title: "Risk Assessment",
    type: "lesson",
    status: "available",
    icon: <Calculator className="h-5 w-5" />,
    description: "Understand your risk tolerance",
  },
  {
    id: "challenge-3",
    title: "Portfolio Builder",
    type: "challenge",
    status: "available",
    icon: <Target className="h-5 w-5" />,
    description: "Create your first investment portfolio",
  },
  {
    id: "lesson-8",
    title: "Credit Score Mastery",
    type: "lesson",
    status: "available",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Improve and maintain your credit score",
  },
  {
    id: "lesson-9",
    title: "Tax Planning",
    type: "lesson",
    status: "available",
    icon: <Calculator className="h-5 w-5" />,
    description: "Optimize your tax strategy",
  },
  {
    id: "challenge-4",
    title: "Debt Payoff Plan",
    type: "challenge",
    status: "available",
    icon: <Target className="h-5 w-5" />,
    description: "Create and execute your debt elimination plan",
  },
  {
    id: "lesson-10",
    title: "Retirement Planning",
    type: "lesson",
    status: "available",
    icon: <PiggyBank className="h-5 w-5" />,
    description: "Plan for your financial future",
  },

  {
    id: "lesson-11",
    title: "Insurance Essentials",
    type: "lesson",
    status: "available",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Protect your financial assets",
  },
  {
    id: "challenge-5",
    title: "Financial Freedom Plan",
    type: "challenge",
    status: "available",
    icon: <Target className="h-5 w-5" />,
    description: "Design your path to financial independence",
  },
]

const generateOrganicPositions = (count: number) => {
  const positions = []

  for (let i = 0; i < count; i++) {
    // Create a more complex winding path for longer journey
    const progress = i / (count - 1) // 0 to 1
    const centerX = 50
    const amplitude = 18 // How far left/right from center

    // Create more interesting path with multiple curves
    const primaryWave = Math.sin(progress * Math.PI * 3) * amplitude
    const secondaryWave = Math.sin(progress * Math.PI * 5) * (amplitude * 0.3)
    const offset = primaryWave + secondaryWave

    const x = centerX + offset

    // Add extra spacing for milestones - check if current lesson is a milestone
    let spacing = 3
    // Note: We'll check the actual lesson type in the component since we don't have access to lessons array here

    positions.push({
      x: Math.round(x),
      spacing: spacing,
      side: offset < -5 ? 'left' : offset > 5 ? 'right' : 'center'
    })
  }

  return positions
}

const organicPositions = generateOrganicPositions(lessons.length)

export default function SkillTree() {
  const router = useRouter()
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const handleLessonClick = (lesson: LessonNode) => {
    // Make all lessons clickable - even locked ones can show preview or coming soon
    router.push(`/lesson/${lesson.id}`)
  }



  return (
    <div className="pt-20 px-4 pb-24 min-h-screen w-full">
      <div className="max-w-sm mx-auto relative">
        {/* Milestone */}
        <div className="bg-secondary border-2 border-border rounded-lg p-4 mb-8 shadow-md mt-8 mx-auto">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Flag className="h-4 w-4 text-secondary-foreground" />
            <div className="text-secondary-foreground font-bold text-xs tracking-wider uppercase font-sans">Start of your journey</div>
          </div>
          {/* <div className="text-secondary-foreground font-bold text-xl font-sans leading-tight">Financial Wellness Journey</div> */}
        </div>

        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full">
            {lessons.map((lesson, index) => {
              const position = organicPositions[index] || organicPositions[organicPositions.length - 1]
              return (
                <div
                  key={lesson.id}
                  className="relative flex items-center justify-center mb-2 w-full"
                  style={{
                    marginBottom: `${position.spacing * 8}px`,
                    transform: `translateX(${position.x - 50}%)`,
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`
                      relative p-0 w-16 h-16 border-2 border-border
                      rounded-full
                      bg-secondary/40 hover:bg-secondary/60
                      shadow-md
                      ${lesson.status === "current" ? "-2 " : ""}
                      cursor-pointer transition-all duration-200 ease-out
                      active:translate-x-[1px] active:translate-y-[1px]
                      active:shadow-sm
                      active:bg-secondary/70
                    `}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <div className="flex items-center justify-center text-secondary-foreground">
                      {lesson.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : lesson.status === "current" ? (
                        <Play className="h-6 w-6" />
                      ) : (
                        lesson.icon
                      )}
                    </div>
                  </Button>


                  {/* Add huge background WeMo mascot images in curve negative space */}
                  {index === 1 && (
                    <div className="absolute -top-12 -left-20 transform rotate-12 -z-10 pointer-events-none">
                      <img
                        src="/adventurous_wemo.png"
                        alt=""
                        className="w-40 h-40 object-contain opacity-15 saturate-150"
                      />
                    </div>
                  )}
                  {index === 8 && (
                    <div className="absolute -bottom-12 -right-20 transform -rotate-12 -z-10 pointer-events-none">
                      <img
                        src="/studious_wemo.png"
                        alt=""
                        className="w-40 h-40 object-contain opacity-15 saturate-150"
                      />
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

