import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";

const RiskScores = () => {
  const navigate = useNavigate();

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

  // Mock data for trend graphs
  const generateTrendData = (baseScore: number) => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      score: Math.max(0, Math.min(10, baseScore + (Math.random() - 0.5) * 2))
    }));
  };

  // Mock data for high-risk users
  const generateHighRiskUsers = (category: string) => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `${category}-${i + 1}`,
      username: `user${i + 1}`,
      score: 7.5 + Math.random() * 2,
      status: ['Under Review', 'Flagged', 'Blocked'][Math.floor(Math.random() * 3)]
    }));
  };

  const riskCategories = [
    {
      name: "Bot Detection",
      score: 8.2,
      trend: "increasing",
      alerts: 12,
      lastUpdated: "2 hours ago",
      trendData: generateTrendData(8.2),
      highRiskUsers: generateHighRiskUsers('bot')
    },
    {
      name: "Dumping",
      score: 6.5,
      trend: "stable",
      alerts: 5,
      lastUpdated: "1 hour ago",
      trendData: generateTrendData(6.5),
      highRiskUsers: generateHighRiskUsers('dumping')
    },
    {
      name: "Collusion",
      score: 4.8,
      trend: "decreasing",
      alerts: 3,
      lastUpdated: "30 minutes ago",
      trendData: generateTrendData(4.8),
      highRiskUsers: generateHighRiskUsers('collusion')
    },
    {
      name: "Ghosting",
      score: 7.9,
      trend: "increasing",
      alerts: 8,
      lastUpdated: "45 minutes ago",
      trendData: generateTrendData(7.9),
      highRiskUsers: generateHighRiskUsers('ghosting')
    },
    {
      name: "Splash Collusion",
      score: 5.5,
      trend: "stable",
      alerts: 4,
      lastUpdated: "1.5 hours ago",
      trendData: generateTrendData(5.5),
      highRiskUsers: generateHighRiskUsers('splash')
    },
    {
      name: "RTA",
      score: 7.2,
      trend: "increasing",
      alerts: 9,
      lastUpdated: "1 hour ago",
      trendData: generateTrendData(7.2),
      highRiskUsers: generateHighRiskUsers('rta')
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Risk Thresholds</h1>
          <p className="text-muted-foreground">
            Configure and monitor risk score thresholds
          </p>
        </div>
        <Button
          onClick={() => navigate("/risk-threshold-history")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          View History
        </Button>
      </div>

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
            <CardDescription>Categories scoring 7.5</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
          <CardDescription>Category-wise risk analysis and high-risk users for last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Bot Detection">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {riskCategories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="data-[state=active]:bg-primary"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {riskCategories.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={category.trendData}>
                          <XAxis 
                            dataKey="day" 
                            label={{ value: 'Days', position: 'bottom' }} 
                          />
                          <YAxis 
                            domain={[0, 10]}
                            label={{ value: 'Risk Score', angle: -90, position: 'left' }} 
                          />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke={
                              category.score >= 7.5 ? '#ef4444' : 
                              category.score >= 5 ? '#eab308' : 
                              '#22c55e'
                            } 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">High Risk Users</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User ID</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Risk Score</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.highRiskUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                              <span className={`font-bold ${getScoreColor(user.score)}`}>
                                {user.score.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={
                                user.status === 'Blocked' ? 'text-red-500' :
                                user.status === 'Flagged' ? 'text-yellow-500' :
                                'text-blue-500'
                              }>
                                {user.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                >
                                  Clear
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  Review
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-yellow-600 hover:text-yellow-700"
                                >
                                  Flag
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Block
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskScores; 