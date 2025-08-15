"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Brain,
  Trophy,
  RotateCcw,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  type: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

interface QuizData {
  id: number;
  day: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  completion_message: string;
}

interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetch("/quiz-data.json");
        const data = await response.json();

        // For now, we only have monday_quiz
        if (quizId === "1") {
          setQuizData(data.monday_quiz);
        }
      } catch (error) {
        console.error("Failed to load quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const correctAnswers = userAnswers.filter(
        (answer) => answer.isCorrect
      ).length;
      const finalScore = Math.round(
        (correctAnswers / userAnswers.length) * 100
      );
      setScore(finalScore);
      setIsQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setScore(0);
  };

  const handleBackToDashboard = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Quiz not found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested quiz could not be loaded.
          </p>
          <Link href="/game">
            <Button>← Back to Content</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card/95 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground font-sans">
                  Quiz Complete!
                </h1>
                <p className="text-muted-foreground font-sans">
                  {quizData.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-green-700 mb-2 font-sans">
                {score}% Score!
              </h2>

              <p className="text-lg text-green-600 mb-6 font-sans">
                You answered {userAnswers.filter((a) => a.isCorrect).length} out
                of {userAnswers.length} questions correctly
              </p>

              <div className="bg-white/50 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-medium font-sans">
                  {quizData.completion_message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleRetakeQuiz}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link href="/game" passHref>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground font-sans">
                {quizData.title}
              </h1>
              <p className="text-muted-foreground font-sans">
                {quizData.description}
              </p>
            </div>
            <Link href="/content">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground font-sans">
              Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm font-medium text-primary font-sans">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-3">
                  {currentQuestion?.type.replace("_", " ").toUpperCase()}
                </Badge>
                <CardTitle className="text-xl font-bold text-card-foreground font-sans leading-relaxed">
                  {currentQuestion?.question}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3 mb-6">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`
                    w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-sans
                    ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === currentQuestion.correct_answer
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-red-500 bg-red-50 text-red-700"
                          : "border-primary bg-primary/10 text-primary"
                        : showExplanation &&
                          index === currentQuestion.correct_answer
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }
                    ${showExplanation ? "cursor-default" : "cursor-pointer"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === currentQuestion.correct_answer
                                ? "border-green-500 bg-green-500"
                                : "border-red-500 bg-red-500"
                              : "border-primary bg-primary"
                            : showExplanation &&
                              index === currentQuestion.correct_answer
                            ? "border-green-500 bg-green-500"
                            : "border-muted-foreground"
                        }
                      `}
                    >
                      {(selectedAnswer === index ||
                        (showExplanation &&
                          index === currentQuestion.correct_answer)) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-card/50 rounded-lg p-4 mb-6 border border-border/50">
                <h4 className="font-semibold text-card-foreground mb-2 font-sans">
                  Explanation:
                </h4>
                <p className="text-muted-foreground font-sans">
                  {currentQuestion?.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Circle className="w-4 h-4" />
                <span className="font-sans">
                  {currentQuestion?.type === "true_false"
                    ? "True/False"
                    : "Multiple Choice"}
                </span>
              </div>

              {!showExplanation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  {currentQuestionIndex < quizData.questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Finish Quiz"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
