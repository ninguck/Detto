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

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(1250);

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

  const dailyAffirmations = [
    "Every step forward is progress, no matter how small. You're building a brighter financial future.",
    "Your debt-free journey is a marathon, not a sprint. Stay consistent and trust the process.",
    "You have the power to change your financial story. Today is another opportunity to make smart choices.",
    "Small daily improvements compound into massive long-term results. Keep going!",
    "Financial freedom is within your reach. Every payment brings you closer to your goals.",
    "You're not alone on this journey. Every successful person started exactly where you are now.",
    "Your future self will thank you for the decisions you make today. Choose wisely.",
    "Debt is temporary, but the lessons you learn about money will last a lifetime.",
  ];

  const [currentAffirmation] = useState(() => {
    const today = new Date().getDate();
    return dailyAffirmations[today % dailyAffirmations.length];
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <SunIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-card-foreground font-sans">
                  {getGreeting()}, Alex!
                </h2>
                <p className="text-xs text-muted-foreground font-sans">
                  {getDateString()} • {getTimeString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full shadow-sm animate-pulse">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-700 font-sans">
                  {streak}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-gradient-to-br from-green-100 to-emerald-100 px-3 py-2 rounded-full shadow-sm">
                <Star className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700 font-sans">
                  {points.toLocaleString()}
                </span>
                <Sparkles className="w-3 h-3 text-yellow-500 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
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
                2/3 Complete
              </Badge>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-sans">
                  Daily Goals
                </span>
                <span className="text-sm font-semibold text-green-600 font-sans">
                  67%
                </span>
              </div>
              <Progress value={67} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-card-foreground font-sans">
                  Complete daily lesson
                </span>
                <span className="text-green-600 ml-auto font-bold font-sans">
                  ✓
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-card-foreground font-sans">
                  Update debt progress
                </span>
                <span className="text-green-600 ml-auto font-bold font-sans">
                  ✓
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted border border-border hover:bg-yellow-50 hover:border-yellow-200 transition-colors">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-muted-foreground font-sans">
                  Take quiz
                </span>
                <Badge className="bg-yellow-100 text-yellow-700 text-xs ml-auto">
                  +50 XP
                </Badge>
              </div>
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
                  Interest Rates 101
                </h3>
                <p className="text-sm text-muted-foreground font-sans">
                  Learn how interest affects your debt
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Progress value={30} className="w-20 h-2" />
                <span className="text-sm text-muted-foreground font-medium font-sans">
                  30%
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
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Trophy className="w-6 h-6 text-yellow-600 group-hover:animate-bounce" />
                </div>
                <span className="text-xs text-muted-foreground font-sans">
                  First Lesson
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-6 h-6 text-green-600 group-hover:animate-pulse" />
                </div>
                <span className="text-xs text-muted-foreground font-sans">
                  Debt Tracker
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-300 group-hover:bg-yellow-50">
                  <span className="text-muted-foreground group-hover:text-yellow-500 transition-colors">
                    ?
                  </span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-yellow-600 transition-colors font-sans">
                  Next Goal
                </span>
              </div>
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
              "{currentAffirmation}"
            </blockquote>
            <p className="text-sm text-muted-foreground font-sans">
              Keep up the amazing progress, Alex!
            </p>
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
    </div>
  );
}
