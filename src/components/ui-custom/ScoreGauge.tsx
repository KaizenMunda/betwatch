
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ScoreGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  colorByValue?: boolean;
  className?: string;
  threshold?: number;
  label?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  value,
  size = "md",
  showValue = true,
  colorByValue = true,
  className,
  threshold = 70,
  label
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Size mappings
  const sizeMap = {
    sm: {
      width: "w-20 h-20",
      stroke: "stroke-[5px]",
      text: "text-sm",
      textValue: "text-xl"
    },
    md: {
      width: "w-28 h-28",
      stroke: "stroke-[6px]",
      text: "text-base",
      textValue: "text-2xl"
    },
    lg: {
      width: "w-36 h-36",
      stroke: "stroke-[8px]",
      text: "text-lg",
      textValue: "text-3xl"
    }
  };
  
  // Color mapping based on value
  const getColor = (val: number) => {
    if (!colorByValue) return "text-primary";
    
    if (val < threshold - 30) return "text-green-500";
    if (val < threshold - 10) return "text-yellow-500";
    if (val < threshold) return "text-orange-500";
    return "text-red-500";
  };
  
  const color = getColor(value);
  
  // Calculate the stroke dash array for the progress ring
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (animatedValue / 100) * circumference;
  
  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue(prev => {
        const diff = value - prev;
        const step = diff * 0.1;
        
        if (Math.abs(diff) < 0.5) {
          clearInterval(interval);
          return value;
        }
        
        return prev + step;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [value]);
  
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <div className={cn("relative", sizeMap[size].width)}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className={cn("stroke-muted", sizeMap[size].stroke)}
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className={cn(color, sizeMap[size].stroke, "transition-all duration-300 ease-in-out")}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
          />
        </svg>
        
        {/* Value display */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn(color, sizeMap[size].textValue, "font-semibold")}>
              {Math.round(animatedValue)}
            </span>
            {label && <span className={cn("text-muted-foreground mt-1", sizeMap[size].text)}>{label}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreGauge;
