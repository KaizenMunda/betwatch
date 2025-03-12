import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const RiskScores = () => {
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

  const riskCategories = [
    {
      name: "Bot Detection",
      score: 8.2,
      trend: "increasing",
      alerts: 12,
      lastUpdated: "2 hours ago"
    },
    {
      name: "Dumping",
      score: 6.5,
      trend: "stable",
      alerts: 5,
      lastUpdated: "1 hour ago"
    },
    {
      name: "Collusion",
      score: 4.8,
      trend: "decreasing",
      alerts: 3,
      lastUpdated: "30 minutes ago"
    },
    {
      name: "Ghosting",
      score: 7.9,
      trend: "increasing",
      alerts: 8,
      lastUpdated: "45 minutes ago"
    },
    {
      name: "Splash Collusion",
      score: 5.5,
      trend: "stable",
      alerts: 4,
      lastUpdated: "1.5 hours ago"
    },
    {
      name: "RTA",
      score: 7.2,
      trend: "increasing",
      alerts: 9,
      lastUpdated: "1 hour ago"
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Risk Scores</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">6.7</div>
            <p className="text-sm text-muted-foreground">+0.3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Risk Categories</CardTitle>
            <CardDescription>Categories scoring > 7.5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">2</div>
            <p className="text-sm text-muted-foreground">Bot Detection, Ghosting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">41</div>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Categories</CardTitle>
          <CardDescription>Detailed breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskCategories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${getScoreColor(category.score)}`}>
                      {category.score.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <Progress
                      value={category.score * 10}
                      className={getProgressColor(category.score)}
                    />
                  </TableCell>
                  <TableCell>
                    <span className={
                      category.trend === "increasing" ? "text-red-500" :
                      category.trend === "decreasing" ? "text-green-500" :
                      "text-yellow-500"
                    }>
                      {category.trend}
                    </span>
                  </TableCell>
                  <TableCell>{category.alerts}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskScores; 