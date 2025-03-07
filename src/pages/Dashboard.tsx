
import React from "react";
import { dashboardStats, mockUsers } from "@/data/mockData";
import StatCard from "@/components/ui-custom/StatCard";
import ScoreCard from "@/components/ui-custom/ScoreCard";
import UserSearch from "@/components/ui-custom/UserSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  BarChart4, 
  Lock, 
  ShieldAlert, 
  User as UserIcon,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Generate sample data for charts
const generateChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    flagged: Math.floor(Math.random() * 10) + 2,
    blocked: Math.floor(Math.random() * 5) + 1,
    avgScore: 40 + Math.floor(Math.random() * 30),
  }));
};

const chartData = generateChartData();

// Get recent high risk users
const getHighRiskUsers = () => {
  return mockUsers
    .filter(user => user.fraudScore.value > 70)
    .sort((a, b) => b.fraudScore.value - a.fraudScore.value)
    .slice(0, 5);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const highRiskUsers = getHighRiskUsers();
  
  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Header with search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Fraud Dashboard</h1>
              <p className="text-muted-foreground mt-1">Real-time fraud monitoring and analytics</p>
            </div>
            <UserSearch compact />
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Users" 
              value={dashboardStats.totalUsers.toLocaleString()}
              icon={Users}
              iconColor="text-blue-600"
              iconBackground="bg-blue-100 dark:bg-blue-950/30"
              change={{ value: 12, timeframe: "vs last month" }}
              description="vs last month"
            />
            <StatCard 
              title="Flagged Users" 
              value={dashboardStats.flaggedUsers.toLocaleString()} 
              icon={AlertTriangle}
              iconColor="text-orange-600"
              iconBackground="bg-orange-100 dark:bg-orange-950/30"
              change={{ value: 8, timeframe: "vs last month" }}
              description="vs last month"
            />
            <StatCard 
              title="Blocked Users" 
              value={dashboardStats.blockedUsers.toLocaleString()} 
              icon={Lock}
              iconColor="text-red-600"
              iconBackground="bg-red-100 dark:bg-red-950/30"
              change={{ value: 5, timeframe: "vs last month" }}
              description="vs last month"
            />
            <StatCard 
              title="Average Fraud Score" 
              value={dashboardStats.averageScore.toFixed(1)} 
              icon={ShieldAlert}
              iconColor="text-purple-600"
              iconBackground="bg-purple-100 dark:bg-purple-950/30"
              change={{ value: -2, timeframe: "vs last month" }}
              description="vs last month"
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Trends</CardTitle>
                <CardDescription>Weekly scoring patterns and anomalies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                      <YAxis style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="avgScore"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions Taken</CardTitle>
                <CardDescription>Flagged and blocked users per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                      <YAxis style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Bar dataKey="flagged" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="blocked" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* High Risk Users and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>High Risk Users</CardTitle>
                <CardDescription>Users with scores above the risk threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highRiskUsers.map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon size={18} />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Last active: {user.lastActive.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <div 
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            user.status === 'flagged' 
                              ? 'bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400' 
                              : user.status === 'blocked'
                              ? 'bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                              : 'bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400'
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </div>
                        <div className="ml-4 font-semibold text-red-500">
                          {user.fraudScore.value.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Low Risk</div>
                      <div className="flex gap-2 items-center">
                        <span className="text-green-500"><TrendingDown size={14} /></span>
                        <span className="font-medium">58%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Medium Risk</div>
                      <div className="flex gap-2 items-center">
                        <span className="text-yellow-500"><TrendingDown size={14} /></span>
                        <span className="font-medium">24%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">High Risk</div>
                      <div className="flex gap-2 items-center">
                        <span className="text-red-500"><TrendingUp size={14} /></span>
                        <span className="font-medium">18%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <ScoreCard 
                title="Platform Risk Score"
                score={dashboardStats.averageScore}
                description="Aggregate risk score for the platform"
                threshold={70}
                showDetails
                subScores={[
                  { id: "1", name: "Transaction Risk", value: 45, weight: 0.4, description: "", parameters: [] },
                  { id: "2", name: "User Behavior", value: 32, weight: 0.3, description: "", parameters: [] },
                  { id: "3", name: "Location Risk", value: 65, weight: 0.2, description: "", parameters: [] },
                  { id: "4", name: "Device Trust", value: 28, weight: 0.1, description: "", parameters: [] },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
