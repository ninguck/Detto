"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArticlesSection from "@/components/ui/articles-section";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/bottom-navigation";
import { NavigationHeader } from "@/components/navigation-header";
import {
  BookOpen,
  Trophy,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  Sparkles,
  SunIcon,
  CheckCircle2,
  Circle,
  Brain,
  Car,
  CreditCard,
  Building,
  PiggyBank,
  Calculator,
  Flag,
  Banknote,
  PartyPopper,
} from "lucide-react";

interface UserData {
  user: {
    name: string;
  };
  stats: {
    currentStreak: number;
    totalPoints: number;
  };
  progress: {
    dailyGoals: {
      total: number;
      completed: number;
      percentage: number;
      tasks: Array<{
        id: string;
        name: string;
        completed: boolean;
        xpReward: number;
      }>;
    };
    currentLesson: {
      title: string;
      description: string;
      progress: number;
    };
  };
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
  }>;
  friends: Array<{
    id: string;
    name: string;
    avatar: string;
    lastActivity: string;
    activity: string;
    xpGained: number;
  }>;
  affirmations: string[];
}

interface Milestone {
  id: number;
  label: string;
  description: string;
  achieved: boolean;
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
  category: string;
  difficulty: string;
  completed: boolean;
  day?: number | null;
}

interface ContentData {
  articles: ContentItem[];
  weeklyProgress: WeekDay[];
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState<UserData | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, milestonesResponse, contentResponse] =
          await Promise.all([
            fetch("/user.json"),
            fetch("/mock-milestones-data.json"),
            fetch("/content-data.json"),
          ]);

        const userData = await userResponse.json();
        const milestonesData = await milestonesResponse.json();
        const contentData = await contentResponse.json();

        setUserData(userData);
        setMilestones(milestonesData);
        setContentData(contentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getTimeString = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDateString = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentAffirmation = () => {
    if (!userData) return "";
    const today = new Date().getDate();
    return userData.affirmations[today % userData.affirmations.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading your financial journey...
          </p>
        </div>
      </div>
    );
  }

  if (!userData || !milestones || !contentData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Unable to load data</p>
        </div>
      </div>
    );
  }

  const getMilestoneIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Car className="w-6 h-6" />;
      case 2:
        return <Calculator className="w-6 h-6" />;
      case 3:
        return <CreditCard className="w-6 h-6" />;
      case 4:
        return <Banknote className="w-6 h-6" />;
      case 5:
        return <Building className="w-6 h-6" />;
      case 6:
        return <CreditCard className="w-6 h-6" />;
      case 7:
        return <Trophy className="w-6 h-6" />;
      case 8:
        return <Target className="w-6 h-6" />;
      case 9:
        return <Flag className="w-6 h-6" />;
      case 10:
        return <PartyPopper className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <NavigationHeader
        userName={userData.user.name}
        currentStreak={userData.stats.currentStreak}
        totalPoints={userData.stats.totalPoints}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-6 pb-32 space-y-6">
        {/* Daily Progress Card */}
        <Card className="border-green-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-card-foreground font-sans">
                Today's Progress
              </h2>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 animate-pulse"
              >
                {userData.progress.dailyGoals.completed}/
                {userData.progress.dailyGoals.total} Complete
              </Badge>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-sans">
                  Daily Goals
                </span>
                <span className="text-sm font-semibold text-green-600 font-sans">
                  {userData.progress.dailyGoals.percentage}%
                </span>
              </div>
              <Progress
                value={userData.progress.dailyGoals.percentage}
                className="h-3"
              />
            </div>
            <div className="space-y-2">
              {userData.progress.dailyGoals.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-2 text-sm p-2 rounded-lg border transition-colors ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-muted border-border hover:bg-yellow-50 hover:border-yellow-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.completed
                        ? "bg-green-500 animate-pulse"
                        : "bg-muted-foreground"
                    }`}
                  ></div>
                  <span
                    className={
                      task.completed
                        ? "text-card-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {task.name}
                  </span>
                  {task.completed ? (
                    <span className="text-green-600 ml-auto font-bold font-sans">
                      ✓
                    </span>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-700 text-xs ml-auto">
                      +{task.xpReward} XP
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/content" className="w-full">
            <Button className="w-full h-20 bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <BookOpen className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-sm font-medium font-sans">Learn</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-20 border-teal-200 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 flex-col gap-2 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <Target className="w-6 h-6 text-teal-600 group-hover:animate-pulse" />
            <span className="text-sm font-medium text-teal-700 font-sans">
              Track Debt
            </span>
          </Button>
        </div>

        {/* Weekly Progress */}
        <Card className="border-blue-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-card-foreground font-sans">
                Weekly Progress
              </h3>
            </div>

            <div className="space-y-2">
              {contentData.weeklyProgress.map((day, index) => (
                <Link
                  key={day.day}
                  href={day.hasQuiz && day.quizCompleted ? "/quiz/1" : "#"}
                  className={`block ${
                    day.hasQuiz && day.quizCompleted
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                      day.completed
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : day.current
                        ? "bg-primary/10 border-primary/30 hover:bg-primary/20"
                        : "bg-muted/50 border-border hover:bg-muted"
                    } ${
                      day.hasQuiz && day.quizCompleted
                        ? "hover:shadow-md hover:scale-[1.02]"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                        day.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : day.current
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {day.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold font-sans">
                          {day.dayName}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium font-sans ${
                            day.current
                              ? "text-primary"
                              : day.completed
                              ? "text-green-700"
                              : "text-card-foreground"
                          }`}
                        >
                          {day.title}
                        </span>
                        {day.hasQuiz && day.quizCompleted && (
                          <Brain className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-sans">
                        {day.dayName} • Day {day.day}
                      </p>
                    </div>

                    {day.completed && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones Section */}
        <Card className="border-yellow-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-foreground font-sans">
                Debt Freedom Milestones
              </h3>
              <Link href="/milestones">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-yellow-600 hover:bg-yellow-50"
                >
                  View All
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-3 pb-2">
                {milestones.slice(0, 6).map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex-shrink-0 w-48 p-4 rounded-lg border hover:shadow-md transition-all duration-300 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                          milestone.achieved
                            ? "bg-gradient-to-br from-yellow-100 to-amber-100 text-yellow-600"
                            : "bg-muted border-2 border-dashed border-border text-muted-foreground"
                        }`}
                      >
                        {milestone.achieved ? (
                          getMilestoneIcon(milestone.id)
                        ) : (
                          <span className="text-lg">?</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground font-sans line-clamp-2 mb-1">
                          {milestone.label}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans line-clamp-3">
                          {milestone.description}
                        </p>
                      </div>
                      {milestone.achieved && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* AI Chat Card */}
        <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-secondary/10 shadow-lg">
          <CardContent className="p-8">
            {/* Title at Top */}
            <h3 className="text-xl font-bold text-card-foreground font-sans mb-6 text-center">
              Need Financial Guidance?
            </h3>

            {/* Description and Mascot Row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1 mr-8">
                <p className="text-muted-foreground font-sans text-base leading-relaxed">
                  Get personalized AI assistance for your financial questions
                  and debt management. Our friendly mascot is here to help guide
                  you.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/ai-chat"
                  className="inline-block transition-transform hover:scale-105 cursor-pointer group"
                >
                  <Image
                    src="/wemo-mascot.png"
                    alt="WeMoney Mascot - Click to start chat"
                    width={140}
                    height={140}
                    className="drop-shadow-lg group-hover:drop-shadow-xl transition-all cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            {/* Chat Now Button - Full Width */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base py-3">
              Start Chatting Now
            </Button>
          </CardContent>
        </Card>

        {/* Articles Section */}
        <Card className="border-accent/20 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <ArticlesSection articles={contentData.articles} />
          </CardContent>
        </Card>

        {/* Friends Activity */}
        <Card className="border-blue-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-foreground font-sans">
                Friends Activity
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Users className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {userData.friends.map((friend, index) => (
                <div
                  key={friend.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-all duration-300 ${
                    index === 0
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
                      : "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md ${
                      index === 0
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}
                  >
                    {friend.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground font-medium font-sans">
                      {friend.activity}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">
                      {friend.lastActivity}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`shadow-sm ${
                      index === 0
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                        : "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700"
                    }`}
                  >
                    +{friend.xpGained} XP
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Affirmation */}
        <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-secondary/10 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <blockquote className="text-lg font-semibold text-card-foreground mb-2 font-serif italic">
              "{getCurrentAffirmation()}"
            </blockquote>
            <p className="text-sm text-muted-foreground font-sans">
              Keep up the amazing progress, {userData.user.name}!
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
