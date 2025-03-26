import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBackground?: string;
  change?: {
    value: number;
    timeframe: string;
  };
  className?: string;
  isNegativeChange?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBackground = "bg-primary/10",
  change,
  className,
  isNegativeChange = true,
}) => {
  const isPositiveChange = change ? (isNegativeChange ? change.value >= 0 : change.value <= 0) : undefined;
  
  return (
    <Card className={cn("overflow-hidden scale-on-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {Icon && (
            <div className={cn("p-2 rounded-full", iconBackground)}>
              <Icon size={16} className={iconColor} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        
        {(description || change) && (
          <div className="flex items-center mt-1 gap-2">
            {change && (
              <span
                className={cn(
                  "text-xs font-medium rounded-md px-1.5 py-0.5",
                  isPositiveChange
                    ? "text-green-600 bg-green-100 dark:bg-green-950/30"
                    : "text-red-600 bg-red-100 dark:bg-red-950/30"
                )}
              >
                {isPositiveChange ? "+" : ""}
                {change.value}%
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
