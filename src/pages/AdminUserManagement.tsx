import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock admin users data
const mockAdminUsers = [
  {
    id: "ADM001",
    name: "Amit Patel",
    email: "amit.patel@betwatch.in",
    role: "admin",
    lastActive: "2 hours ago",
    status: "active",
    access: {
      dashboard: true,
      riskScores: true,
      riskyUsers: true,
      indicators: true,
      riskThresholds: true,
      userManagement: true,
    },
  },
  {
    id: "ADM002",
    name: "Sneha Reddy",
    email: "sneha.reddy@betwatch.in",
    role: "analyst",
    lastActive: "1 day ago",
    status: "active",
    access: {
      dashboard: true,
      riskScores: true,
      riskyUsers: true,
      indicators: true,
      riskThresholds: false,
      userManagement: false,
    },
  },
  {
    id: "ADM003",
    name: "Rahul Verma",
    email: "rahul.verma@betwatch.in",
    role: "viewer",
    lastActive: "5 hours ago",
    status: "active",
    access: {
      dashboard: true,
      riskScores: true,
      riskyUsers: false,
      indicators: false,
      riskThresholds: false,
      userManagement: false,
    },
  },
];

const AdminUserManagement = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("viewer");

  const handleAddUser = () => {
    // In a real application, this would make an API call to add the user
    console.log("Adding new user:", { email: newUserEmail, role: newUserRole });
    setNewUserEmail("");
    setNewUserRole("viewer");
  };

  const handleAccessChange = (userId: string, page: string, checked: boolean) => {
    // In a real application, this would make an API call to update user access
    console.log("Updating access:", { userId, page, checked });
  };

  const handleRemoveUser = (userId: string) => {
    // In a real application, this would make an API call to remove the user
    console.log("Removing user:", userId);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Dashboard users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Now</CardTitle>
            <CardDescription>Currently online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Last 1 hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invites</CardTitle>
            <CardDescription>Awaiting acceptance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Sent this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Existing Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Users</CardTitle>
          <CardDescription>Manage user access and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search users..."
              className="max-w-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Dashboard</TableHead>
                <TableHead>Risk Scores</TableHead>
                <TableHead>Risky Users</TableHead>
                <TableHead>Indicators</TableHead>
                <TableHead>Risk Thresholds</TableHead>
                <TableHead>User Management</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select defaultValue={user.role}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  {Object.entries(user.access).map(([page, hasAccess]) => (
                    <TableCell key={page}>
                      <Checkbox
                        checked={hasAccess}
                        onCheckedChange={(checked) =>
                          handleAccessChange(user.id, page, checked as boolean)
                        }
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add New User Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Invite new users to the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter email address"
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={newUserRole}
              onValueChange={setNewUserRole}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement; 