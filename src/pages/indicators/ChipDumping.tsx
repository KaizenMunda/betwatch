import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable from "@/components/ui-custom/UserListTable";

const ChipDumping = () => {
  const mockUsers = [
    {
      id: "1",
      username: "user123",
      dumpingFrequency: "High",
      totalChipsDumped: "5000",
      lastDumpingActivity: "2 hours ago",
      riskScore: 8.5,
      location: "Mumbai, IN",
      status: "flagged",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      username: "gamer456",
      dumpingFrequency: "Medium",
      totalChipsDumped: "3000",
      lastDumpingActivity: "1 hour ago",
      riskScore: 6.7,
      location: "Delhi, IN",
      status: "review",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      username: "player789",
      dumpingFrequency: "Low",
      totalChipsDumped: "1000",
      lastDumpingActivity: "30 minutes ago",
      riskScore: 4.2,
      location: "Bangalore, IN",
      status: "active",
      lastActive: "30 minutes ago",
    },
  ];

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Dumping Frequency", accessor: "dumpingFrequency" },
    { header: "Total Chips Dumped", accessor: "totalChipsDumped" },
    { header: "Last Dumping Activity", accessor: "lastDumpingActivity" },
    { header: "Risk Score", accessor: "riskScore" },
    { header: "Location", accessor: "location" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Chip Dumping Cases</CardTitle>
            <CardDescription>Recorded incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Risk Dumping</CardTitle>
            <CardDescription>Flagged activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">45</div>
            <p className="text-sm text-muted-foreground">+5 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Across all dumping cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">6.2</div>
            <p className="text-sm text-muted-foreground">+0.3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Dumping Cases</CardTitle>
            <CardDescription>Current investigations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">328</div>
            <p className="text-sm text-muted-foreground">Ongoing cases</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dumping Activity</CardTitle>
          <CardDescription>Monitor user dumping behavior</CardDescription>
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

export default ChipDumping; 