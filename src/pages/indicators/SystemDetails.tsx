import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable from "@/components/ui-custom/UserListTable";

const SystemDetails = () => {
  const mockUsers = [
    {
      id: "1",
      username: "user123",
      systemInfo: "Windows 11 Pro",
      browser: "Chrome 122.0",
      ipAddress: "192.168.1.100",
      lastActive: "2 hours ago",
      riskScore: 8.5,
      location: "Mumbai, IN",
      status: "flagged",
    },
    {
      id: "2",
      username: "gamer456",
      systemInfo: "macOS 14.3",
      browser: "Safari 17.3",
      ipAddress: "192.168.1.101",
      lastActive: "1 hour ago",
      riskScore: 6.7,
      location: "Delhi, IN",
      status: "review",
    },
    {
      id: "3",
      username: "player789",
      systemInfo: "Ubuntu 22.04",
      browser: "Firefox 123.0",
      ipAddress: "192.168.1.102",
      lastActive: "30 minutes ago",
      riskScore: 4.2,
      location: "Bangalore, IN",
      status: "active",
    },
  ];

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "System Info", accessor: "systemInfo" },
    { header: "Browser", accessor: "browser" },
    { header: "IP Address", accessor: "ipAddress" },
    { header: "Last Active", accessor: "lastActive" },
    { header: "Risk Score", accessor: "riskScore" },
    { header: "Location", accessor: "location" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Systems</CardTitle>
            <CardDescription>Unique devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspicious Systems</CardTitle>
            <CardDescription>Flagged devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">45</div>
            <p className="text-sm text-muted-foreground">+5 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Across all systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">6.2</div>
            <p className="text-sm text-muted-foreground">+0.3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Now</CardTitle>
            <CardDescription>Current sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">328</div>
            <p className="text-sm text-muted-foreground">Live sessions</p>
          </CardContent>
        </Card>
      </div>

      <UserListTable
        users={mockUsers}
        columns={columns}
        title="System Activity"
        description="Monitor user system details and behavior"
      />
    </div>
  );
};

export default SystemDetails; 