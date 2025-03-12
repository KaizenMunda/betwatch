import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chartType,
  data,
  dataKeys = { x: "name", y: [] },
  height = "300px",
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey={dataKeys.x} style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={Array.isArray(dataKeys.y) ? dataKeys.y[0] : dataKeys.y}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey={dataKeys.x} style={{ fontSize: '12px' }} />
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
