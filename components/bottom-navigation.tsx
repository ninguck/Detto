"use client"

import { Button } from "@/components/ui/button";

export function BottomNavigation() {
  return (
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

          {/* Ranks Tab */}
          <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
            Ranks
          </Button>

          {/* Progress Tab */}
          <Button variant="ghost" className="text-card-foreground hover:text-primary hover:bg-primary/10 font-medium font-sans">
            Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
