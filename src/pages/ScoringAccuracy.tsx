import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for threshold changes
const thresholdChanges = [
  { 
    date: "2025-03-15", 
    category: "bot", 
    change: "Bot Score threshold changed from 7.0 to 7.5",
    type: "threshold"
  },
  { 
    date: "2025-03-20", 
    category: "bot", 
    change: "Bot Score weight updated from 0.3 to 0.35",
    type: "weight"
  }
];

// Generate mock data for the charts
const generateMockData = (days: number) => {
  // Get the current date and calculate the start date
  const endDate = new Date();
  const startDate = subDays(endDate, days - 1);

  // Create an array of dates
  const dates = Array.from({ length: days }).map((_, index) => {
    const date = subDays(endDate, days - 1 - index);
    return format(date, 'yyyy-MM-dd');
  });

  // Ensure March 15th and March 20th 2025 are included if they fall within the range
  const march15_2025 = "2025-03-15";
  const march20_2025 = "2025-03-20";
  
  if (!dates.includes(march15_2025) && march15_2025 >= format(startDate, 'yyyy-MM-dd') && march15_2025 <= format(endDate, 'yyyy-MM-dd')) {
    dates.push(march15_2025);
  }
  if (!dates.includes(march20_2025) && march20_2025 >= format(startDate, 'yyyy-MM-dd') && march20_2025 <= format(endDate, 'yyyy-MM-dd')) {
    dates.push(march20_2025);
  }

  // Sort dates to maintain chronological order
  dates.sort();

  // Generate data for each date
  return dates.map(formattedDate => {
    // Explicitly check for threshold and weight changes
    const thresholdChange = thresholdChanges.find(
      change => change.date === formattedDate && change.type === "threshold"
    );
    const weightChange = thresholdChanges.find(
      change => change.date === formattedDate && change.type === "weight"
    );

    return {
      date: formattedDate,
      falsePositives: Math.round((Math.random() * 20 + 10) * 100) / 100,
      falseNegatives: Math.round((Math.random() * 15 + 5) * 100) / 100,
      isThresholdChange: !!thresholdChange,
      isWeightChange: !!weightChange,
      changeDetails: thresholdChange?.change || weightChange?.change
    };
  });
};

const ScoringAccuracy = () => {
  const [selectedCategory, setSelectedCategory] = useState("bot");
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [chartData, setChartData] = useState(() => generateMockData(30));

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // In a real app, we would fetch new data here
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    const daysDiff = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
    setChartData(generateMockData(daysDiff));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = chartData.find(item => item.date === label);
      const thresholdChange = thresholdChanges.find(
        change => change.date === label && change.category === selectedCategory
      );

      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">{format(new Date(label), 'MMM d, yyyy')}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={entry.name === "False Positivity Rate" ? "text-blue-600" : "text-red-600"}>
              {entry.name}: {entry.value.toFixed(2)}%
            </p>
          ))}
          {data?.changeDetails && (
            <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded">
              <p className="text-sm text-purple-700">
                {data.isThresholdChange ? "🎯 Threshold Change:" : "⚖️ Weight Change:"}
              </p>
              <p className="text-sm text-purple-600">
                {data.changeDetails}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Scoring Accuracy</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Monitor and analyze the accuracy of risk scoring over time
            </p>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <Card className="shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <CardTitle className="text-xl">Scoring Accuracy Rates</CardTitle>
              <CardDescription className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <p className="text-sm">
                    <span className="font-medium text-blue-600">False Positivity Rate:</span>{" "}
                    Percentage of users cleared by risk analyst out of those that were auto flagged
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <p className="text-sm">
                    <span className="font-medium text-red-600">False Negativity Rate:</span>{" "}
                    Percentage of users blocked by risk analyst out of non-reviewed users
                  </p>
                </div>
              </CardDescription>
            </div>

            {/* Change Indicators Legend */}
            <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border self-start">
              <p className="text-sm font-medium text-gray-700 mb-1">Change Indicators</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-600"></div>
                <span className="text-sm text-gray-600">Threshold Change</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-800 border-t-2 border-dotted border-purple-800"></div>
                <span className="text-sm text-gray-600">Weight Change</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bot">Bot Score</SelectItem>
                <SelectItem value="dumping">Dumping Score</SelectItem>
                <SelectItem value="collusion">Collusion Score</SelectItem>
                <SelectItem value="ghosting">Ghosting Score</SelectItem>
                <SelectItem value="splash">Splash Score</SelectItem>
                <SelectItem value="rta">RTA Score</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[300px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
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
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range: any) => range && handleDateRangeChange(range)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={() => navigate("/risk-threshold-history")}
              variant="outline"
              className="flex items-center gap-2 h-9"
            >
              <History className="h-4 w-4" />
              View History
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[500px] lg:h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{
                    paddingTop: "20px",
                    borderTop: "1px solid #e5e7eb"
                  }}
                />
                {chartData.map((entry, index) => (
                  (entry.isThresholdChange || entry.isWeightChange) && (
                    <ReferenceLine
                      key={index}
                      x={entry.date}
                      stroke={entry.isThresholdChange ? "#7c3aed" : "#6b21a8"}
                      strokeWidth={4}
                      strokeDasharray={entry.isThresholdChange ? "0" : "4 4"}
                      label={{
                        value: entry.isThresholdChange ? "Threshold Change" : "Weight Change",
                        angle: -90,
                        position: "insideTopRight",
                        fill: entry.isThresholdChange ? "#7c3aed" : "#6b21a8",
                        fontSize: 16,
                        fontWeight: "bold",
                        offset: 15
                      }}
                    />
                  )
                ))}
                <Line
                  type="monotone"
                  dataKey="falsePositives"
                  name="False Positivity Rate"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.isThresholdChange || payload.isWeightChange) {
                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={10}
                            fill={payload.isThresholdChange ? "#7c3aed" : "#6b21a8"}
                            stroke="white"
                            strokeWidth={3}
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill="white"
                          />
                          <text
                            x={cx}
                            y={cy - 20}
                            textAnchor="middle"
                            fill={payload.isThresholdChange ? "#7c3aed" : "#6b21a8"}
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {payload.isThresholdChange ? "T" : "W"}
                          </text>
                        </g>
                      );
                    }
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#2563eb"
                      />
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="falseNegatives"
                  name="False Negativity Rate"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.isThresholdChange || payload.isWeightChange) {
                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={10}
                            fill={payload.isThresholdChange ? "#7c3aed" : "#6b21a8"}
                            stroke="white"
                            strokeWidth={3}
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill="white"
                          />
                          <text
                            x={cx}
                            y={cy - 20}
                            textAnchor="middle"
                            fill={payload.isThresholdChange ? "#7c3aed" : "#6b21a8"}
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {payload.isThresholdChange ? "T" : "W"}
                          </text>
                        </g>
                      );
                    }
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#dc2626"
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoringAccuracy; 