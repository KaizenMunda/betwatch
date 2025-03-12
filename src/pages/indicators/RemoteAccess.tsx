import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable from "@/components/ui-custom/UserListTable";

const RemoteAccess = () => {
  const mockUsers = [
    {
      id: "1",
      username: "player123",
      accessType: "VPN",
      ipAddress: "45.123.45.67",
      location: "Mumbai, IN",
      lastActive: "2 hours ago",
      riskScore: 8.2,
      connectionDuration: "1h 45m",
      status: "flagged",
    },
    {
      id: "2",
      username: "gamer456",
      accessType: "Proxy",
      ipAddress: "89.234.56.78",
      location: "Delhi, IN",
      lastActive: "1 hour ago",
      riskScore: 7.5,
      connectionDuration: "45m",
      status: "review",
    },
    {
      id: "3",
      username: "user789",
      accessType: "VPN",
      ipAddress: "123.45.67.89",
      location: "Bangalore, IN",
      lastActive: "30 minutes ago",
      riskScore: 4.8,
      connectionDuration: "2h 15m",
      status: "active",
    },
  ];

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Access Type", accessor: "accessType" },
    { header: "IP Address", accessor: "ipAddress" },
    { header: "Location", accessor: "location" },
    { header: "Last Active", accessor: "lastActive" },
    { header: "Connection Duration", accessor: "connectionDuration" },
    { header: "Risk Score", accessor: "riskScore" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Remote Sessions</CardTitle>
            <CardDescription>Current connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Live sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspicious Access</CardTitle>
            <CardDescription>Flagged connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">23</div>
            <p className="text-sm text-muted-foreground">+3 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>VPN Usage</CardTitle>
            <CardDescription>Active VPN connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89</div>
            <p className="text-sm text-muted-foreground">57% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Remote connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">6.8</div>
            <p className="text-sm text-muted-foreground">+0.5 this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Remote Access Activity</CardTitle>
          <CardDescription>Monitor remote access patterns and suspicious behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <UserListTable
            users={mockUsers}
            columns={columns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoteAccess; 