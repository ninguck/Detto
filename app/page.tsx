"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Trophy,
  Users,
  Target,
  Flame,
  Star,
  TrendingUp,
  DollarSign,
  Sparkles,
  SunIcon,
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

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/user.json");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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

  if (!userData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Unable to load user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src="/wemo-mascot.png"
                  alt="WeMoney Mascot"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-card-foreground font-sans">
                  Hey, {userData.user.name}!
                </h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full shadow-sm animate-pulse">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-700 font-sans">{userData.stats.currentStreak}</span>
              </div>
              <div className="flex items-center gap-1 bg-gradient-to-br from-green-100 to-emerald-100 px-3 py-2 rounded-full shadow-sm">
                <Star className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700 font-sans">{userData.stats.totalPoints.toLocaleString()}</span>
                <Sparkles className="w-3 h-3 text-yellow-500 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <Link href="/content">
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

        {/* Current Lesson */}
        <Card className="border-teal-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center shadow-md">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground font-sans">
                  {userData.progress.currentLesson.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans">
                  {userData.progress.currentLesson.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Progress
                  value={userData.progress.currentLesson.progress}
                  className="w-20 h-2"
                />
                <span className="text-sm text-muted-foreground font-medium font-sans">
                  {userData.progress.currentLesson.progress}%
                </span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Preview */}
        <Card className="border-yellow-200 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-foreground font-sans">
                Recent Achievements
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-yellow-600 hover:bg-yellow-50"
              >
                View All
              </Button>
            </div>
            <div className="flex gap-3">
              {userData.achievements.slice(0, 3).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-100 to-amber-100"
                        : "bg-muted border-2 border-dashed border-border"
                    }`}
                  >
                    {achievement.unlocked ? (
                      <Trophy className="w-6 h-6 text-yellow-600 group-hover:animate-bounce" />
                    ) : (
                      <span className="text-muted-foreground group-hover:text-yellow-500 transition-colors">
                        ?
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-sans ${
                      achievement.unlocked
                        ? "text-muted-foreground"
                        : "text-muted-foreground group-hover:text-yellow-600"
                    }`}
                  >
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
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
            <p className="text-sm text-muted-foreground font-sans">Keep up the amazing progress, {userData.user.name}!</p>
          </CardContent>
        </Card>
      </div>

      {/* WeMoney Mascot - Fixed Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link
          href="/ai-chat"
          className="inline-block transition-transform hover:scale-105 cursor-pointer group"
        >
          <Image
            src="/wemo-mascot.png"
            alt="WeMoney Mascot - Click to start chat"
            width={120}
            height={120}
            className="drop-shadow-lg group-hover:drop-shadow-xl transition-all cursor-pointer"
          />
        </Link>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="grid grid-cols-5 gap-4 items-center">
            {/* Home Tab */}
            <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
              Home
            </Button>

            {/* Courses Tab */}
            <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
              Courses
            </Button>

            {/* Centered Learn Button */}
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-6 py-2 shadow-lg font-sans">
              Learn
            </Button>

            {/* Leaderboard Tab */}
            <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
              Leaderboard
            </Button>

            {/* Progress Tab */}
            <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
              Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
