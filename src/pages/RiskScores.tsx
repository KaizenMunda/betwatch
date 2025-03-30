import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { History, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { TablePagination } from "@/components/ui-custom/TablePagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";
import WhitelistDialog from "@/components/ui-custom/WhitelistDialog";

interface ConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
  action: "block" | "flag" | null;
}

interface WhitelistState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
}

const timeRanges = [
  { value: "week", label: "Current Week" },
  { value: "month", label: "Current Month" },
  { value: "quarter", label: "Current Quarter" },
  { value: "custom", label: "Custom Range" },
];

const RiskScores = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState("month");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null,
    action: null,
  });
  const [whitelistDialog, setWhitelistDialog] = useState<WhitelistState>({
    isOpen: false,
    userId: null,
    userName: null,
  });
  const itemsPerPage = 5;

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

  const handleAction = (action: "block" | "flag", userId: string, userName: string) => {
    setConfirmation({
      isOpen: true,
      userId,
      userName,
      action,
    });
  };

  const executeAction = () => {
    if (!confirmation.action || !confirmation.userId) return;

    // In a real application, this would make an API call
    console.log(`${confirmation.action} user:`, confirmation.userId);
    
    setConfirmation({
      isOpen: false,
      userId: null,
      userName: null,
      action: null,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      isOpen: false,
      userId: null,
      userName: null,
      action: null,
    });
  };

  const handleClear = (userId: string, userName: string) => {
    setWhitelistDialog({
      isOpen: true,
      userId,
      userName,
    });
  };

  const handleWhitelistConfirm = (whitelist: boolean, notes: string) => {
    if (!whitelistDialog.userId) return;

    // In a real application, this would make an API call
    console.log(`Clear user:`, whitelistDialog.userId, {
      whitelist,
      notes,
    });
    
    setWhitelistDialog({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const closeWhitelistDialog = () => {
    setWhitelistDialog({
      isOpen: false,
      userId: null,
      userName: null,
    });
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
      highRiskUsers: generateHighRiskUsers('bot'),
      last7Days: [8.2, 7.8, 8.5, 8.1, 7.9, 8.3, 8.2]
    },
    {
      name: "Dumping",
      score: 6.5,
      trend: "stable",
      alerts: 5,
      lastUpdated: "1 hour ago",
      trendData: generateTrendData(6.5),
      highRiskUsers: generateHighRiskUsers('dumping'),
      last7Days: [6.5, 6.3, 6.7, 6.4, 6.6, 6.5, 6.5]
    },
    {
      name: "Collusion",
      score: 4.8,
      trend: "decreasing",
      alerts: 3,
      lastUpdated: "30 minutes ago",
      trendData: generateTrendData(4.8),
      highRiskUsers: generateHighRiskUsers('collusion'),
      last7Days: [4.8, 5.1, 4.9, 5.0, 4.7, 4.8, 4.8]
    },
    {
      name: "Ghosting",
      score: 7.9,
      trend: "increasing",
      alerts: 8,
      lastUpdated: "45 minutes ago",
      trendData: generateTrendData(7.9),
      highRiskUsers: generateHighRiskUsers('ghosting'),
      last7Days: [7.9, 7.5, 7.8, 7.6, 7.7, 7.8, 7.9]
    },
    {
      name: "Splash Collusion",
      score: 5.5,
      trend: "stable",
      alerts: 4,
      lastUpdated: "1.5 hours ago",
      trendData: generateTrendData(5.5),
      highRiskUsers: generateHighRiskUsers('splash'),
      last7Days: [5.5, 5.4, 5.6, 5.5, 5.3, 5.4, 5.5]
    },
    {
      name: "RTA",
      score: 7.2,
      trend: "increasing",
      alerts: 9,
      lastUpdated: "1 hour ago",
      trendData: generateTrendData(7.2),
      highRiskUsers: generateHighRiskUsers('rta'),
      last7Days: [7.2, 6.8, 7.0, 7.1, 6.9, 7.0, 7.2]
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
                <TableHead>Last 7 Days</TableHead>
                <TableHead>Weekly Trend</TableHead>
                <TableHead>Weekly Alerts</TableHead>
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
                  <TableCell>
                    <div className="flex gap-1">
                      {category.last7Days.map((score, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                            getScoreColor(score)
                          } bg-opacity-10`}
                        >
                          {score.toFixed(1)}
                        </div>
                      ))}
                    </div>
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
          <CardDescription>Category-wise risk analysis and high-risk users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            {timeRange === "custom" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
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
                        {category.highRiskUsers
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((user) => (
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
                                  className="bg-green-50 hover:bg-green-100 text-green-600"
                                  onClick={() => handleClear(user.id, user.username)}
                                >
                                  Clear
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-orange-50 hover:bg-orange-100 text-orange-600"
                                  onClick={() => handleAction("flag", user.id, user.username)}
                                >
                                  Flag
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-red-50 hover:bg-red-100 text-red-600"
                                  onClick={() => handleAction("block", user.id, user.username)}
                                >
                                  Block
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4">
                      <TablePagination
                        currentPage={currentPage}
                        totalItems={category.highRiskUsers.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        onClose={closeConfirmation}
        onConfirm={executeAction}
        title={
          confirmation.action === "block"
            ? "Block User"
            : "Flag User"
        }
        description={
          confirmation.action === "block"
            ? `Are you sure you want to block ${confirmation.userName}? This will prevent them from accessing the platform.`
            : `Are you sure you want to flag ${confirmation.userName} for suspicious activity?`
        }
        actionLabel={confirmation.action === "block" ? "Block" : "Flag"}
        variant="destructive"
      />

      {/* Whitelist Dialog */}
      <WhitelistDialog
        isOpen={whitelistDialog.isOpen}
        onClose={closeWhitelistDialog}
        onConfirm={handleWhitelistConfirm}
        userName={whitelistDialog.userName || ""}
      />
    </div>
  );
};

export default RiskScores; 