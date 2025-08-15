"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useState } from "react"

const lessonContent = {
  "lesson-1": {
    title: "Understanding Interest Rates",
    content:
      "When managing debt, interest rates determine how much extra you'll pay for borrowing money. Different types of debt have vastly different rates. For example, a mortgage might be 3%, while credit cards can be 11.9% or higher. Even a 1% difference can cost thousands over time. Always prioritize paying off high-interest debt first to minimize the total amount you'll pay.",
    quiz: [
      { id: 1, question: "Which interest rate costs you more?", answer: "11.9%" },
      { id: 2, question: "What's a typical mortgage rate?", answer: "Around 3-7%" },
      { id: 3, question: "Credit card rates are usually:", answer: "Above 10%" },
      { id: 4, question: "Which debt should you pay first?", answer: "Highest interest rate" },
    ],
  },
  "lesson-2": {
    title: "Comparing Interest Rates",
    content:
      "Let's practice identifying the best interest rates for debt management. When you see rates like 3%, 11.9%, 18.5%, and 24.9%, the lowest rate (3%) will cost you the least money over time. However, for debt payoff strategy, you want to eliminate the highest rates first. A $1,000 balance at 24.9% costs much more than the same balance at 3%.",
    quiz: [
      { id: 1, question: "Which rate is best for borrowing?", answer: "3%" },
      { id: 2, question: "Which debt to pay off first?", answer: "24.9%" },
      { id: 3, question: "11.9% vs 18.5% - pay off first:", answer: "18.5%" },
      { id: 4, question: "Lower interest rates mean:", answer: "Less money paid over time" },
    ],
  },
  "challenge-1": {
    title: "Interest Rate Challenge",
    content:
      "You have four debts with different interest rates: Credit Card A (24.9%), Personal Loan (11.9%), Car Loan (6.5%), and Student Loan (3.2%). Your strategy should be to pay minimums on all debts, then put any extra money toward the highest rate first. This 'avalanche method' saves the most money in interest payments over time.",
    quiz: [
      { id: 1, question: "Which debt to tackle first?", answer: "Credit Card A (24.9%)" },
      { id: 2, question: "After Credit Card A, pay off:", answer: "Personal Loan (11.9%)" },
      { id: 3, question: "The avalanche method targets:", answer: "Highest interest rates first" },
      { id: 4, question: "This strategy saves you:", answer: "The most money in interest" },
    ],
  },
  "lesson-3": {
    title: "Financial Awareness Check-in",
    content:
      "Building financial awareness is the foundation of debt management. This weekly check-in helps you track your progress and identify spending patterns. Regular monitoring allows you to catch problems early and celebrate wins. Set aside 15 minutes each week to review your accounts, track your debt balances, and note any changes in your financial situation.",
    quiz: [
      { id: 1, question: "How often should you check your finances?", answer: "Weekly" },
      { id: 2, question: "What should you track regularly?", answer: "Debt balances and spending" },
      { id: 3, question: "Why is financial awareness important?", answer: "Catch problems early" },
      { id: 4, question: "How long should a financial check-in take?", answer: "About 15 minutes" },
    ],
  },
  "lesson-4": {
    title: "Emergency Fund Basics",
    content:
      "An emergency fund is your financial safety net. Start with a goal of $500-$1000, then work toward 3-6 months of expenses. This fund prevents you from going into debt when unexpected costs arise - car repairs, medical bills, or job loss. Keep this money in a separate, easily accessible savings account. Even $25 per month adds up over time.",
    quiz: [
      { id: 1, question: "What's a good starter emergency fund goal?", answer: "$500-$1000" },
      { id: 2, question: "Ultimate emergency fund goal?", answer: "3-6 months expenses" },
      { id: 3, question: "Where should you keep emergency funds?", answer: "Separate savings account" },
      { id: 4, question: "What does an emergency fund prevent?", answer: "Going into debt for unexpected costs" },
    ],
  },
  "lesson-5": {
    title: "Budget Optimization",
    content:
      "A good budget isn't about restriction - it's about intentional spending. Use the 50/30/20 rule as a starting point: 50% needs, 30% wants, 20% savings and debt payments. Look for small wins: cancel unused subscriptions, negotiate bills, or find cheaper alternatives. Even saving $50/month creates $600 annually for debt payoff or emergency fund.",
    quiz: [
      { id: 1, question: "What's the 50/30/20 rule?", answer: "50% needs, 30% wants, 20% savings/debt" },
      { id: 2, question: "What's budget optimization about?", answer: "Intentional spending" },
      { id: 3, question: "Name a budget optimization strategy:", answer: "Cancel unused subscriptions" },
      { id: 4, question: "How much does saving $50/month create annually?", answer: "$600" },
    ],
  },
  "challenge-2": {
    title: "Savings Challenge Complete",
    content:
      "Congratulations! You've completed your first savings milestone. This challenge tested your ability to consistently set aside money and resist the urge to spend it. You've proven you can build wealth systematically. Use this momentum to tackle your next financial goal - whether that's growing your emergency fund, paying off debt faster, or starting to invest for the future.",
    quiz: [
      { id: 1, question: "What did this challenge prove?", answer: "You can build wealth systematically" },
      { id: 2, question: "What skill did you develop?", answer: "Consistent saving" },
      { id: 3, question: "What should you do with this momentum?", answer: "Tackle your next financial goal" },
      { id: 4, question: "What are potential next goals?", answer: "Emergency fund, debt payoff, or investing" },
    ],
  },
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const [completedQuiz, setCompletedQuiz] = useState<number[]>([])

  const lesson = lessonContent[lessonId as keyof typeof lessonContent]

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  const handleQuizComplete = (quizId: number) => {
    if (!completedQuiz.includes(quizId)) {
      setCompletedQuiz([...completedQuiz, quizId])
    }
  }

  const allQuizCompleted = completedQuiz.length === lesson.quiz.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-primary/5">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-border shadow-md">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-foreground hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            {completedQuiz.length}/{lesson.quiz.length} completed
          </div>
        </div>
      </div>

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Lesson Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground font-serif mb-2">{lesson.title}</h1>
          </div>

          {/* Content Block */}
          <div className="bg-card border-4 border-border rounded-lg p-6 shadow-md">
            <p className="text-card-foreground leading-relaxed font-sans font-medium">{lesson.content}</p>
          </div>

          {/* Quiz Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground font-serif text-center">Complete the Quiz</h2>

            <div className="grid grid-cols-1 gap-3">
              {lesson.quiz.map((quiz) => (
                <Button
                  key={quiz.id}
                  variant="outline"
                  className={`
                    p-4 h-auto text-left justify-start border-2 transition-all
                    ${
                      completedQuiz.includes(quiz.id)
                        ? "bg-primary/10 border-primary text-primary hover:bg-primary/20"
                        : "border-accent/30 hover:border-accent hover:bg-accent/5"
                    }
                  `}
                  onClick={() => handleQuizComplete(quiz.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${completedQuiz.includes(quiz.id) ? "bg-primary border-primary" : "border-muted-foreground"}
                    `}
                    >
                      {completedQuiz.includes(quiz.id) && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{quiz.question}</div>
                      <div className="text-sm text-muted-foreground mt-1">{quiz.answer}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Completion Button */}
          {allQuizCompleted && (
            <div className="text-center pt-4">
              <Button
                onClick={() => router.back()}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Complete Lesson
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
