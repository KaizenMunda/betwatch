import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable from "@/components/ui-custom/UserListTable";

const MouseMovement = () => {
  const mockUsers = [
    {
      id: "1",
      username: "player123",
      pattern: "Linear",
      avgSpeed: "450ms",
      clickAccuracy: "98%",
      location: "Mumbai, IN",
      lastActive: "2 hours ago",
      riskScore: 8.7,
      status: "flagged",
    },
    {
      id: "2",
      username: "gamer456",
      pattern: "Random",
      avgSpeed: "320ms",
      clickAccuracy: "92%",
      location: "Delhi, IN",
      lastActive: "1 hour ago",
      riskScore: 6.4,
      status: "review",
    },
    {
      id: "3",
      username: "user789",
      pattern: "Natural",
      avgSpeed: "580ms",
      clickAccuracy: "95%",
      location: "Bangalore, IN",
      lastActive: "30 minutes ago",
      riskScore: 3.2,
      status: "active",
    },
  ];

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Movement Pattern", accessor: "pattern" },
    { header: "Average Speed", accessor: "avgSpeed" },
    { header: "Click Accuracy", accessor: "clickAccuracy" },
    { header: "Location", accessor: "location" },
    { header: "Last Active", accessor: "lastActive" },
    { header: "Risk Score", accessor: "riskScore" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Monitored Sessions</CardTitle>
            <CardDescription>Active tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">892</div>
            <p className="text-sm text-muted-foreground">Live sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bot-like Patterns</CardTitle>
            <CardDescription>Suspicious movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">34</div>
            <p className="text-sm text-muted-foreground">+5 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Speed</CardTitle>
            <CardDescription>Movement response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">425ms</div>
            <p className="text-sm text-muted-foreground">Across all users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Based on patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">5.8</div>
            <p className="text-sm text-muted-foreground">-0.2 this week</p>
          </CardContent>
        </Card>
      </div>

      <UserListTable
        users={mockUsers}
        columns={columns}
        title="Mouse Movement Analysis"
        description="Monitor user mouse patterns and bot-like behavior"
      />
    </div>
  );
};

export default MouseMovement; 