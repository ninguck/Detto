"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/bottom-navigation";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Star,
  Target,
  Trophy,
  ArrowRight,
  Brain,
  Zap,
} from "lucide-react";

interface DailyGoal {
  day: number;
  title: string;
  description: string;
  type: string;
  readingTime: string;
  completed: boolean;
  content: {
    title: string;
    summary: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
}

interface WeekDay {
  day: number;
  dayName: string;
  title: string;
  completed: boolean;
  current: boolean;
  hasQuiz: boolean;
  quizCompleted: boolean;
}

interface ContentItem {
  id: number;
  title: string;
  description: string;
  readingTime?: string;
  questions?: number;
  category: string;
  difficulty: string;
  completed: boolean;
  score?: number | null;
  image: string;
}

interface ContentData {
  dailyGoal: DailyGoal;
  weeklyProgress: WeekDay[];
  articles: ContentItem[];
  quizzes: ContentItem[];
}

export default function ContentHub() {
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/content-data.json");
        const data = await response.json();
        setContentData(data);
      } catch (error) {
        console.error("Failed to load content data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Content not available
          </h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "debt strategy":
        return <Target className="w-4 h-4" />;
      case "expense tracking":
        return <BookOpen className="w-4 h-4" />;
      case "financial education":
        return <Brain className="w-4 h-4" />;
      case "budgeting":
        return <Zap className="w-4 h-4" />;
      case "savings":
        return <Trophy className="w-4 h-4" />;
      case "credit education":
        return <CheckCircle2 className="w-4 h-4" />;
      case "income boost":
        return <ArrowRight className="w-4 h-4" />;
      case "debt management":
        return <Circle className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground font-sans">
                Content Hub
              </h1>
              <p className="text-muted-foreground font-sans">
                Your journey to financial freedom
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Today's Goal - Top Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground font-sans">
              Today's Goal
            </h2>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      Day {contentData.dailyGoal.day}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getDifficultyColor("beginner")}
                    >
                      {contentData.dailyGoal.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground font-sans">
                    {contentData.dailyGoal.title}
                  </CardTitle>
                  <p className="text-muted-foreground font-sans">
                    {contentData.dailyGoal.description}
                  </p>
                </div>
                {contentData.dailyGoal.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-card/50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-card-foreground mb-2 font-sans">
                  {contentData.dailyGoal.content.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans line-clamp-3">
                  {contentData.dailyGoal.content.summary}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-sans">
                      {contentData.dailyGoal.readingTime}
                    </span>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 shadow-md">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {contentData.dailyGoal.completed
                    ? "Review"
                    : "Start Learning"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Weekly Progress - Middle Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-secondary" />
            <h2 className="text-xl font-semibold text-foreground font-sans">
              Weekly Progress
            </h2>
          </div>

          <div className="flex items-center justify-center px-4">
            <div className="flex items-center gap-2 sm:gap-3 p-4 bg-card/50 rounded-2xl border border-border/50 overflow-x-auto">
              {contentData.weeklyProgress.map((day, index) => (
                <Link
                  key={day.day}
                  href={day.hasQuiz && day.quizCompleted ? "/quiz/1" : "#"}
                  className={`flex flex-col items-center group ${
                    day.hasQuiz && day.quizCompleted
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div
                    className={`
                      relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                      ${
                        day.completed
                          ? "bg-green-500 border-green-500 text-white shadow-lg"
                          : day.current
                          ? "bg-primary border-primary text-primary-foreground shadow-lg animate-pulse"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                      }
                      ${
                        day.hasQuiz && day.quizCompleted
                          ? "group-hover:scale-110 group-hover:shadow-xl"
                          : ""
                      }
                    `}
                  >
                    {day.completed ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <span className="text-xs sm:text-sm font-bold font-sans">
                        {day.dayName}
                      </span>
                    )}
                    {day.hasQuiz && day.quizCompleted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <Brain className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-1 min-w-0">
                    <p
                      className={`text-xs font-sans leading-tight truncate max-w-16 ${
                        day.current ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {day.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section - Edge to Edge */}
        <section>
          <div className="max-w-6xl mx-auto px-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold text-foreground font-sans">
                  Learning Articles
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-4 px-6 pb-4 scrollbar-hide">
              {contentData.articles.map((article) => (
                <Card
                  key={article.id}
                  className="flex-shrink-0 w-80 border-border/50 hover:border-accent/50 bg-card/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getCategoryIcon(article.category)}
                            <span className="ml-1 font-sans">
                              {article.category}
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getDifficultyColor(
                              article.difficulty
                            )}`}
                          >
                            {article.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-card-foreground font-sans line-clamp-2">
                          {article.title}
                        </CardTitle>
                      </div>
                      {article.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 font-sans line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="font-sans">{article.readingTime}</span>
                      </div>
                      <Button
                        size="sm"
                        variant={article.completed ? "outline" : "default"}
                        disabled={!article.completed}
                      >
                        {article.completed ? "Review" : "Coming Soon"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quizzes Section - Edge to Edge */}
        <section>
          <div className="max-w-6xl mx-auto px-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-semibold text-foreground font-sans">
                  Interactive Quizzes
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-4 px-6 pb-4 scrollbar-hide">
              {contentData.quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={quiz.id === 1 ? "/quiz/1" : "#"}
                  className={quiz.id === 1 ? "" : "pointer-events-none"}
                >
                  <Card
                    className={`flex-shrink-0 w-80 border-border/50 bg-card/90 backdrop-blur-sm shadow-md transition-all duration-300 cursor-pointer ${
                      quiz.id === 1
                        ? "hover:border-secondary/50 hover:shadow-lg hover:scale-[1.02]"
                        : "opacity-75"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs bg-secondary/10 text-secondary border-secondary/30"
                            >
                              Quiz
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getDifficultyColor(
                                quiz.difficulty
                              )}`}
                            >
                              {quiz.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-bold text-card-foreground font-sans line-clamp-2">
                            {quiz.title}
                          </CardTitle>
                        </div>
                        {quiz.completed ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            {quiz.score && (
                              <span className="text-xs text-green-600 font-bold mt-1">
                                {quiz.score}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 font-sans line-clamp-2">
                        {quiz.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="font-sans">
                            {quiz.questions} questions
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant={quiz.completed ? "outline" : "default"}
                          className={
                            quiz.completed
                              ? ""
                              : quiz.id === 1
                              ? "bg-secondary hover:bg-secondary/90"
                              : ""
                          }
                          disabled={quiz.id !== 1 && !quiz.completed}
                        >
                          {quiz.completed
                            ? "Retake"
                            : quiz.id === 1
                            ? "Start Quiz"
                            : "Coming Soon"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </div>
  );
}
