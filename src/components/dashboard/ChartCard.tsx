import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description: string;
  chartType: "area" | "bar";
  data: any[];
  dataKeys?: {
    x: string;
    y: string | string[];
  };
  height?: string;
  className?: string;
  showBenchmarks?: boolean;
  benchmarks?: {
    newUsers: number;
    activeUsersAverage: number;
    activeUsers: number;
  };
}

const timeRanges = [
  { value: "week", label: "Current Week" },
  { value: "month", label: "Current Month" },
  { value: "quarter", label: "Current Quarter" },
  { value: "custom", label: "Custom Range" },
];

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chartType,
  data,
  dataKeys = { x: "name", y: [] },
  height = "300px",
  className,
  showBenchmarks = false,
  benchmarks,
}) => {
  const [timeRange, setTimeRange] = useState("week");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (range.from && range.to) {
      const daysDiff = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 7 && daysDiff <= 90) {
        setDateRange(range);
      }
    }
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    if (value !== "custom") {
      setDateRange({ from: undefined, to: undefined });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === "avgScore" ? "Average of all Users" : entry.name}: {entry.value.toFixed(1)}
            </p>
          ))}
          {showBenchmarks && benchmarks && (
            <>
              <p className="text-sm text-rose-500 mt-2">New Users: {benchmarks.newUsers.toFixed(1)}</p>
              <p className="text-sm text-emerald-500">Active Users: {benchmarks.activeUsers.toFixed(1)}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {timeRange === "custom" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range (7-90 days)</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey={dataKeys.x} 
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => value}
                />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={Array.isArray(dataKeys.y) ? dataKeys.y[0] : dataKeys.y}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  activeDot={{ r: 6 }}
                />
                {showBenchmarks && benchmarks && (
                  <>
                    <ReferenceLine
                      y={benchmarks.newUsers}
                      stroke="hsl(346 77% 49%)"
                      strokeDasharray="3 3"
                    />
                    <ReferenceLine
                      y={benchmarks.activeUsers}
                      stroke="hsl(142 76% 36%)"
                      strokeDasharray="3 3"
                    />
                  </>
                )}
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey={dataKeys.x} 
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => value}
                />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                {Array.isArray(dataKeys.y) ? (
                  dataKeys.y.map((key) => (
                    <Bar 
                      key={key}
                      dataKey={key} 
                      stackId={
                        key.includes("Under") ? "review" :
                        key.includes("Flagged") ? "flagged" : "blocked"
                      }
                      fill={
                        key.includes("Under") 
                          ? key.startsWith("auto") 
                            ? "hsl(48 96% 70%)"   // Light Yellow
                            : "hsl(48 96% 53%)"    // Dark Yellow
                          : key.includes("Flagged")
                          ? key.startsWith("auto")
                            ? "hsl(25 95% 70%)"    // Light Orange
                            : "hsl(25 95% 53%)"     // Dark Orange
                          : key.startsWith("auto")
                            ? "hsl(0 84% 77%)"     // Light Red
                            : "hsl(0 84% 60%)"      // Dark Red
                      }
                      radius={[4, 4, 0, 0]} 
                    />
                  ))
                ) : (
                  <Bar dataKey={dataKeys.y} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
