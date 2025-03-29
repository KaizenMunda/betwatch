import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable, { User } from "@/components/ui-custom/UserListTable";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";

interface ConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
  action: "block" | "flag" | "review" | null;
}

const MouseMovement = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null,
    action: null,
  });

  const mockUsers = [
    {
      id: "1",
      username: "player123",
      mouseClicks: "1,234",
      mouseDistance: "2.5km",
      lastActive: "2 hours ago",
      modelPrediction: "Bot",
      riskScore: 8.7,
      status: "flagged",
      location: "Mumbai, IN",
    },
    {
      id: "2",
      username: "gamer456",
      mouseClicks: "856",
      mouseDistance: "1.8km",
      lastActive: "1 hour ago",
      modelPrediction: "Human",
      riskScore: 6.4,
      status: "review",
      location: "Delhi, IN",
    },
    {
      id: "3",
      username: "user789",
      mouseClicks: "2,145",
      mouseDistance: "3.2km",
      lastActive: "30 minutes ago",
      modelPrediction: "Human",
      riskScore: 3.2,
      status: "active",
      location: "Bangalore, IN",
    },
  ];

  const handleAction = (action: "block" | "flag" | "review", userId: string, userName: string) => {
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

  const columns = [
    { 
      header: "User", 
      accessor: "username",
      className: "border-r-2 border-gray-200",
      render: (value: string, user: User) => (
        <div className="space-y-1">
          <a 
            href="/users/1"
            className="text-blue-600 hover:underline block"
          >
            {value}
          </a>
          <a 
            href="/users/1"
            className="text-sm text-gray-500 hover:underline block"
          >
            ID: {user.id}
          </a>
        </div>
      )
    },
    { header: "Mouse Clicks", accessor: "mouseClicks" },
    { header: "Mouse Distance", accessor: "mouseDistance" },
    { header: "Last Active", accessor: "lastActive" },
    { header: "Model Prediction", accessor: "modelPrediction", className: "border-r-2 border-gray-200" },
    { header: "Bot Risk Score", accessor: "riskScore" },
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

      <Card>
        <CardHeader>
          <CardTitle>Mouse Movement Analysis</CardTitle>
          <CardDescription>Monitor user mouse patterns and bot-like behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <UserListTable
            users={mockUsers}
            columns={columns}
            onAction={handleAction}
          />
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
            : confirmation.action === "flag"
            ? "Flag User"
            : "Review User"
        }
        description={
          confirmation.action === "block"
            ? `Are you sure you want to block ${confirmation.userName}? This will prevent them from accessing the platform.`
            : confirmation.action === "flag"
            ? `Are you sure you want to flag ${confirmation.userName} for suspicious activity?`
            : `Are you sure you want to mark ${confirmation.userName} for review?`
        }
        actionLabel={
          confirmation.action === "block"
            ? "Block"
            : confirmation.action === "flag"
            ? "Flag"
            : "Review"
        }
        variant="destructive"
      />
    </div>
  );
};

export default MouseMovement; 