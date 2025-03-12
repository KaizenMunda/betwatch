import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui-custom/TablePagination";

const ProductInteraction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const interactionStats = {
    totalInteractions: 156789,
    averageSessionDuration: "28 minutes",
    riskScore: 5.2,
    flaggedPatterns: 234,
    patterns: [
      {
        name: "Rapid Betting",
        occurrences: 567,
        riskScore: 7.8,
        impact: "High",
        trend: "increasing"
      },
      {
        name: "Multiple Accounts",
        occurrences: 234,
        riskScore: 8.2,
        impact: "High",
        trend: "stable"
      },
      {
        name: "Unusual Hours",
        occurrences: 789,
        riskScore: 4.5,
        impact: "Medium",
        trend: "decreasing"
      },
      {
        name: "Pattern Betting",
        occurrences: 456,
        riskScore: 6.7,
        impact: "Medium",
        trend: "increasing"
      },
      {
        name: "Quick Withdrawals",
        occurrences: 345,
        riskScore: 5.9,
        impact: "Medium",
        trend: "stable"
      }
    ],
    timeDistribution: [
      { time: "Morning", percentage: 20 },
      { time: "Afternoon", percentage: 35 },
      { time: "Evening", percentage: 30 },
      { time: "Night", percentage: 15 }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 7.5) return "bg-red-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-red-500";
    if (trend === "decreasing") return "text-green-500";
    return "text-yellow-500";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Interaction Indicators</h1>
        <div className="flex gap-4">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Interactions</CardTitle>
            <CardDescription>User actions tracked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interactionStats.totalInteractions.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Session</CardTitle>
            <CardDescription>Time per user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interactionStats.averageSessionDuration}</div>
            <p className="text-sm text-muted-foreground">+3 minutes from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Score</CardTitle>
            <CardDescription>Overall interaction risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(interactionStats.riskScore)}`}>
              {interactionStats.riskScore.toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">+0.3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Patterns</CardTitle>
            <CardDescription>Suspicious behaviors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{interactionStats.flaggedPatterns}</div>
            <p className="text-sm text-muted-foreground">Needs review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interaction Analysis</CardTitle>
          <CardDescription>Detailed behavior patterns and risk assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Interaction Patterns</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-green-50 hover:bg-green-100 text-green-600"
                >
                  Review
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-orange-50 hover:bg-orange-100 text-orange-600"
                >
                  Flag
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-red-50 hover:bg-red-100 text-red-600"
                >
                  Block
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Occurrences</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interactionStats.patterns.map((pattern) => (
                  <TableRow key={pattern.name}>
                    <TableCell className="font-medium">{pattern.name}</TableCell>
                    <TableCell>{pattern.occurrences.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getScoreColor(pattern.riskScore)}`}>
                        {pattern.riskScore.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Progress
                        value={pattern.riskScore * 10}
                        className={getProgressColor(pattern.riskScore)}
                      />
                    </TableCell>
                    <TableCell>{pattern.impact}</TableCell>
                    <TableCell>
                      <span className={getTrendColor(pattern.trend)}>
                        {pattern.trend}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-center space-x-1 py-4">
              {[...Array(Math.ceil(interactionStats.patterns.length / itemsPerPage))].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "" : "hover:bg-secondary"}
                >
                  {i + 1}
                </Button>
              ))}
              {Math.ceil(interactionStats.patterns.length / itemsPerPage) > 5 && (
                <span className="px-2">...</span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
              <div className="space-y-4">
                {interactionStats.timeDistribution.map((period) => (
                  <div key={period.time} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{period.time}</span>
                      <span className="text-muted-foreground">{period.percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${period.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
              <div className="space-y-4">
                {interactionStats.patterns.map((pattern) => (
                  <div key={pattern.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{pattern.name}</span>
                      <span className={`font-bold ${getScoreColor(pattern.riskScore)}`}>
                        {pattern.riskScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(pattern.riskScore)}`}
                        style={{ width: `${(pattern.riskScore / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInteraction; 