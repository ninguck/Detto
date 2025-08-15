"use client";

import Image from "next/image";
import { Flame, Star, Sparkles } from "lucide-react";

interface NavigationHeaderProps {
  userName: string;
  currentStreak: number;
  totalPoints: number;
}

export function NavigationHeader({ userName, currentStreak, totalPoints }: NavigationHeaderProps) {
  return (
    <div className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 overflow-hidden">
              <Image
                src="/wemo-mascot.png"
                alt="WeMoney Mascot"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-card-foreground font-sans">
                Hey, {userName}!
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full shadow-sm">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700 font-sans">{currentStreak}</span>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-br from-green-100 to-emerald-100 px-3 py-2 rounded-full shadow-sm">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700 font-sans">{totalPoints.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
