
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SubScore } from "@/types/fraudModels";
import ScoreGauge from "./ScoreGauge";

interface ScoreCardProps {
  title: string;
  score: number;
  description?: string;
  subScores?: SubScore[];
  className?: string;
  threshold?: number;
  showDetails?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  description,
  subScores = [],
  className,
  threshold = 70,
  showDetails = false
}) => {
  const [expanded, setExpanded] = useState(showDetails);
  
  // Color mapping based on score
  const getColor = (val: number) => {
    if (val < threshold - 30) return "text-green-500 bg-green-50 dark:bg-green-950/20";
    if (val < threshold - 10) return "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
    if (val < threshold) return "text-orange-500 bg-orange-50 dark:bg-orange-950/20";
    return "text-red-500 bg-red-50 dark:bg-red-950/20";
  };
  
  const scoreColor = getColor(score);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className={cn("overflow-hidden hover:shadow-subtle transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={16} className="text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", scoreColor)}>
              {score.toFixed(1)}
            </div>
            {subScores.length > 0 && (
              <button
                onClick={toggleExpanded}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>
        </div>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-center mb-4">
          <ScoreGauge value={score} size="md" threshold={threshold} />
        </div>
        
        {expanded && subScores.length > 0 && (
          <div className="mt-4 space-y-3 animate-slide-up">
            <div className="text-sm font-medium text-muted-foreground mb-2">Score Breakdown</div>
            {subScores.map((subScore) => (
              <div key={subScore.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{subScore.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Weight: {(subScore.weight * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "absolute h-full left-0 top-0 rounded-full",
                        getColor(subScore.value)
                      )}
                      style={{ width: `${subScore.value}%` }}
                    />
                  </div>
                  <div className={cn("ml-3 text-xs font-medium", getColor(subScore.value))}>
                    {subScore.value.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
