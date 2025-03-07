
import { cn } from "@/lib/utils";
import { RawParameter } from "@/types/fraudModels";
import React from "react";

interface ParameterListProps {
  parameters: RawParameter[];
  className?: string;
}

const ParameterList: React.FC<ParameterListProps> = ({ parameters, className }) => {
  // Helper to format parameter values
  const formatValue = (param: RawParameter) => {
    switch (param.type) {
      case "boolean":
        return param.value ? "Yes" : "No";
      case "date":
        return new Date(param.value).toLocaleDateString();
      case "number":
        // Format as currency if it looks like a currency value
        if (param.name.toLowerCase().includes("amount") || param.name.toLowerCase().includes("price")) {
          return `$${param.value.toFixed(2)}`;
        }
        // Format as percentage if it looks like a percentage
        if (param.name.toLowerCase().includes("percent") || param.name.toLowerCase().includes("rate")) {
          return `${param.value.toFixed(2)}%`;
        }
        // Regular number formatting
        return Number.isInteger(param.value) ? param.value.toString() : param.value.toFixed(2);
      default:
        return String(param.value);
    }
  };
  
  // Helper to get impact badge color
  const getImpactColor = (impact?: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      {parameters.map((param) => (
        <div
          key={param.id}
          className="p-3 rounded-lg border border-border bg-background/50 hover:bg-muted/20 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div className="font-medium text-sm">{param.name}</div>
            {param.impact && (
              <div className={cn("text-xs px-2 py-0.5 rounded-full", getImpactColor(param.impact))}>
                {param.impact.charAt(0).toUpperCase() + param.impact.slice(1)} Impact
              </div>
            )}
          </div>
          <div className="mt-1 text-base">{formatValue(param)}</div>
          {param.description && (
            <div className="mt-1 text-xs text-muted-foreground">{param.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterList;
