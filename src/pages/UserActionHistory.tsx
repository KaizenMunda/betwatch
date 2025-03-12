import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UserActionHistory = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock data for action history
  const actionHistory = [
    {
      id: 1,
      timestamp: "2024-03-13 14:30:00",
      adminUser: "admin@betwatch.in",
      targetUser: "ADM001",
      action: "Permission Update",
      previousStatus: "No Risk Thresholds Access",
      newStatus: "Risk Thresholds Access Granted",
      reason: "Role upgraded to Analyst",
    },
    {
      id: 2,
      timestamp: "2024-03-13 14:45:00",
      adminUser: "admin@betwatch.in",
      targetUser: "ADM002",
      action: "Role Change",
      previousStatus: "Viewer",
      newStatus: "Analyst",
      reason: "Promotion to Risk Analysis team",
    },
    {
      id: 3,
      timestamp: "2024-03-13 15:20:00",
      adminUser: "admin@betwatch.in",
      targetUser: "ADM003",
      action: "Permission Update",
      previousStatus: "Basic Access",
      newStatus: "Risky Users Access Granted",
      reason: "Additional responsibilities assigned",
    },
    {
      id: 4,
      timestamp: "2024-03-13 16:00:00",
      adminUser: "admin@betwatch.in",
      targetUser: "ADM001",
      action: "Role Change",
      previousStatus: "Analyst",
      newStatus: "Admin",
      reason: "Promotion to Team Lead",
    },
    {
      id: 5,
      timestamp: "2024-03-13 16:15:00",
      adminUser: "admin@betwatch.in",
      targetUser: "ADM002",
      action: "Permission Update",
      previousStatus: "Limited Access",
      newStatus: "Full Dashboard Access",
      reason: "Project requirements",
    }
  ];

  const filteredHistory = userId 
    ? actionHistory.filter(record => record.targetUser === userId)
    : actionHistory;

  const getActionColor = (action: string) => {
    switch (action) {
      case "Permission Update":
        return "text-blue-600";
      case "Role Change":
        return "text-purple-600";
      default:
        return "";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {userId ? `Action History for User ${userId}` : "User Action History"}
        </h1>
      </div>

      <div className="flex justify-end">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="permission">Permission Updates</SelectItem>
            <SelectItem value="role">Role Changes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Action Log</CardTitle>
          <CardDescription>History of changes to user permissions and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Admin User</TableHead>
                <TableHead>Target User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Previous Status</TableHead>
                <TableHead>New Status</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.timestamp}</TableCell>
                  <TableCell>{record.adminUser}</TableCell>
                  <TableCell>
                    <a 
                      href={`/user-management`}
                      className="text-blue-600 hover:underline"
                    >
                      {record.targetUser}
                    </a>
                  </TableCell>
                  <TableCell className={getActionColor(record.action)}>
                    {record.action}
                  </TableCell>
                  <TableCell>{record.previousStatus}</TableCell>
                  <TableCell>{record.newStatus}</TableCell>
                  <TableCell>{record.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActionHistory; 