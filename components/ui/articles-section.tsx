"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  Target,
  Brain,
  Zap,
  Trophy,
  ArrowRight,
  Star,
} from "lucide-react";

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

interface ArticlesSectionProps {
  articles: ContentItem[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
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
    <section>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-card-foreground font-sans">
          Learning Articles
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4 scrollbar-hide">
          {articles.map((article) => (
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
  );
}
