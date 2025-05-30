import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable, { Column } from "@/components/ui-custom/UserListTable";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface ConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
  action: "block" | "flag" | "review" | null;
}

interface SessionProfitData {
  hands: number;
  profit: number;
}

interface User {
  id: string;
  username: string;
  sessionId: string;
  tableType: string;
  handsPlayed: number;
  bbsDumped: number;
  winRate: number;
  beneficiaryUser: string;
  beneficiaryId: string;
  numPlayers: number;
  avgClosingAction: number;
  bonusConversion: number;
  chipDumpingScore: number;
  status: "review" | "active" | "flagged";
  location: string;
  date: string;
  riskType: "Dumping" | "Bot Detection" | "RTA" | "Ghosting";
  riskScore: number;
}

const RiskyUserSessions = () => {
  const [searchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null,
    action: null,
  });

  const [selectedSession, setSelectedSession] = useState<{
    isOpen: boolean;
    sessionId: string | null;
    profitData: SessionProfitData[];
  }>({
    isOpen: false,
    sessionId: null,
    profitData: [],
  });

  // Get userId from URL parameters
  const userId = searchParams.get('userId');

  const mockUsers: User[] = [
    {
      id: "1",
      username: "user123",
      sessionId: "1234567890",
      tableType: "50/100 NL Hold'em",
      handsPlayed: 1500,
      bbsDumped: 150,
      winRate: -12.5,
      beneficiaryUser: "beneficiary456",
      beneficiaryId: "456",
      numPlayers: 4.2,
      avgClosingAction: 2.8,
      bonusConversion: 120,
      chipDumpingScore: 8.5,
      status: "active",
      location: "Mumbai, IN",
      date: new Date().toISOString().split('T')[0],
      riskType: "Dumping",
      riskScore: 8.5
    },
    {
      id: "2",
      username: "player456",
      sessionId: "2345678901",
      tableType: "25/50 PLO",
      handsPlayed: 800,
      bbsDumped: 0,
      winRate: 5.2,
      beneficiaryUser: "",
      beneficiaryId: "",
      numPlayers: 3.8,
      avgClosingAction: 2.1,
      bonusConversion: 85,
      chipDumpingScore: 7.2,
      status: "active",
      location: "Delhi, IN",
      date: new Date().toISOString().split('T')[0],
      riskType: "Bot Detection",
      riskScore: 8.2
    },
    {
      id: "3",
      username: "user789",
      sessionId: "3456789012",
      tableType: "100/200 NL Hold'em",
      handsPlayed: 2100,
      bbsDumped: 200,
      winRate: -15.3,
      beneficiaryUser: "beneficiary123",
      beneficiaryId: "123",
      numPlayers: 3.5,
      avgClosingAction: 3.2,
      bonusConversion: 180,
      chipDumpingScore: 9.2,
      status: "active",
      location: "Bangalore, IN",
      date: new Date().toISOString().split('T')[0],
      riskType: "Dumping",
      riskScore: 9.2
    },
    {
      id: "4",
      username: "pro123",
      sessionId: "4567890123",
      tableType: "200/400 NL Hold'em",
      handsPlayed: 950,
      bbsDumped: 0,
      winRate: 8.2,
      beneficiaryUser: "",
      beneficiaryId: "",
      numPlayers: 4.2,
      avgClosingAction: 2.1,
      bonusConversion: 95,
      chipDumpingScore: 7.8,
      status: "active",
      location: "Chennai, IN",
      date: new Date().toISOString().split('T')[0],
      riskType: "RTA",
      riskScore: 7.8
    },
    {
      id: "5",
      username: "master789",
      sessionId: "5678901234",
      tableType: "50/100 PLO",
      handsPlayed: 1500,
      bbsDumped: 0,
      winRate: 3.5,
      beneficiaryUser: "",
      beneficiaryId: "",
      numPlayers: 5.8,
      avgClosingAction: 2.5,
      bonusConversion: 150,
      chipDumpingScore: 8.1,
      status: "active",
      location: "Kolkata, IN",
      date: new Date().toISOString().split('T')[0],
      riskType: "Ghosting",
      riskScore: 8.1
    },
  ];

  // Filter users based on selected date and userId
  const filteredUsers = mockUsers.filter(user => {
    const userDate = new Date(user.date);
    const dateMatch = userDate.toDateString() === selectedDate.toDateString();
    const userMatch = !userId || user.id === userId;
    return dateMatch && userMatch;
  });

  const handleAction = (action: "block" | "flag" | "review", userId: string, userName: string) => {
    setConfirmation({
      isOpen: true,
      userId,
      userName,
      action,
    });
  };

  const executeAction = (comment?: string) => {
    if (!confirmation.action || !confirmation.userId) return;

    // In a real application, this would make an API call with the comment
    console.log(`${confirmation.action} user:`, confirmation.userId, "with comment:", comment);
    
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

  const handleViewSessionProfit = (sessionId: string) => {
    // In a real application, this would fetch the profit data from an API
    const mockProfitData = Array.from({ length: 20 }, (_, i) => ({
      hands: (i + 1) * 100,
      profit: Math.random() * 1000 - 500,
    }));

    setSelectedSession({
      isOpen: true,
      sessionId,
      profitData: mockProfitData,
    });
  };

  const closeSessionProfit = () => {
    setSelectedSession({
      isOpen: false,
      sessionId: null,
      profitData: [],
    });
  };

  const columns: Column[] = [
    { 
      header: "User", 
      accessor: "username",
      className: "sticky left-0 bg-white z-20 w-[200px]",
      headerClassName: "sticky left-0 bg-white z-20 w-[200px]",
      render: (value: string, user: { id: string }) => (
        <div className="space-y-1">
          <a 
            href={`/users/${user.id}`}
            className="text-blue-600 hover:underline block"
          >
            {value}
          </a>
          <a 
            href={`/users/${user.id}`}
            className="text-sm text-gray-500 hover:underline block"
          >
            ID: {user.id}
          </a>
        </div>
      )
    },
    { 
      header: "Session ID", 
      accessor: "sessionId",
      className: "w-[180px]",
      headerClassName: "w-[180px]", 
      render: (value: any, user: { id: string }) => (
        <div className="space-y-1">
          <span className="font-mono">{value}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewSessionProfit(value)}
            className="mt-1"
          >
            View Profit
          </Button>
        </div>
      )
    },
    { 
      header: "Risk Type", 
      accessor: "riskType",
      className: "w-[150px]",
      headerClassName: "w-[150px]"
    },
    { 
      header: "Risk Score", 
      accessor: "riskScore",
      className: "w-[120px]",
      headerClassName: "w-[120px]",
      render: (value: number) => (
        <span className={value >= 7.5 ? "text-red-500" : value >= 5 ? "text-yellow-500" : "text-green-500"}>
          {value.toFixed(1)}
        </span>
      )
    },
    { 
      header: "Table Type", 
      accessor: "tableType",
      className: isExpanded ? "w-[150px]" : "hidden",
      headerClassName: isExpanded ? "w-[150px]" : "hidden"
    },
    { 
      header: "Hands Played", 
      accessor: "handsPlayed",
      className: isExpanded ? "w-[120px]" : "hidden",
      headerClassName: isExpanded ? "w-[120px]" : "hidden"
    },
    { 
      header: "BBs Dumped", 
      accessor: "bbsDumped",
      className: isExpanded ? "w-[120px]" : "hidden",
      headerClassName: isExpanded ? "w-[120px]" : "hidden",
      render: (value: number, user: any) => (
        <span>{user.riskType === "Dumping" ? value : "NA"}</span>
      )
    },
    { 
      header: "Win Rate", 
      accessor: "winRate",
      className: isExpanded ? "w-[120px]" : "hidden",
      headerClassName: isExpanded ? "w-[120px]" : "hidden",
      render: (value: number) => (
        <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
          {value.toFixed(1)}
        </span>
      )
    },
    { 
      header: "Avg. No. of Players", 
      accessor: "numPlayers",
      className: isExpanded ? "w-[150px]" : "hidden",
      headerClassName: isExpanded ? "w-[150px]" : "hidden"
    },
    { 
      header: "Avg. Closing Action", 
      accessor: "avgClosingAction",
      className: isExpanded ? "w-[150px]" : "hidden",
      headerClassName: isExpanded ? "w-[150px]" : "hidden",
      render: (value: number) => (
        <div className="group relative">
          <span>{value.toFixed(1)}</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            1 - Pre flop<br/>
            2 - Flop<br/>
            3 - Turn<br/>
            4 - River
          </div>
        </div>
      )
    },
    { 
      header: "Bonus Conversion (BBs)", 
      accessor: "bonusConversion",
      className: isExpanded ? "w-[150px]" : "hidden",
      headerClassName: isExpanded ? "w-[150px]" : "hidden"
    },
    { 
      header: "Beneficiary", 
      accessor: "beneficiaryUser",
      className: "border-r-2 border-gray-200 w-[200px]",
      headerClassName: "border-r-2 border-gray-200 w-[200px]",
      render: (value: string, user: any) => (
        <div className="space-y-1">
          {user.riskType === "Dumping" ? (
            <>
              <a
                href={`/users/${user.beneficiaryId}`}
                className="text-blue-600 hover:underline block"
              >
                {value}
              </a>
              <a 
                href={`/users/${user.beneficiaryId}`}
                className="text-sm text-gray-500 hover:underline block"
              >
                ID: {user.beneficiaryId}
              </a>
            </>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      )
    },
    { 
      header: "Risk Status", 
      accessor: "status",
      className: isExpanded ? "w-[120px]" : "sticky right-[240px] bg-white z-20 w-[120px]",
      headerClassName: isExpanded ? "w-[120px]" : "sticky right-[240px] bg-white z-20 w-[120px]",
      render: (value: string) => (
        <span className={value === "flagged" ? "text-red-500" : value === "review" ? "text-yellow-500" : "text-green-500"}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      header: "Actions", 
      accessor: "id",
      className: "sticky right-0 bg-white z-20 w-[240px]",
      headerClassName: "sticky right-0 bg-white z-20 w-[240px]",
      render: (value: string, user: any) => (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("review", user.id, user.username)}
            className="bg-green-50 hover:bg-green-100 text-green-600"
          >
            Review
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("flag", user.id, user.username)}
            className="bg-orange-50 hover:bg-orange-100 text-orange-600"
          >
            Flag
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("block", user.id, user.username)}
            className="bg-red-50 hover:bg-red-100 text-red-600"
          >
            Block
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total User Sessions</CardTitle>
            <CardDescription>Played on selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspicious Patterns</CardTitle>
            <CardDescription>Potential dumping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">28</div>
            <p className="text-sm text-muted-foreground">+3 from previous day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total BBs Dumped</CardTitle>
            <CardDescription>On selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <p className="text-sm text-muted-foreground">Across all sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Win Rate</CardTitle>
            <CardDescription>Across suspicious sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">-8.5</div>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Risky User Sessions</CardTitle>
              <CardDescription>Monitor suspicious betting patterns and potential chip dumping</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Collapse Details
                  </>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    Expand Details
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="w-[1000px]">
                <div className="relative">
                  <UserListTable
                    users={filteredUsers}
                    columns={columns}
                    onAction={handleAction}
                    isExpanded={isExpanded}
                  />
                </div>
              </div>
            </div>
          </div>
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
        showComment={true}
      />

      {/* Session Profit Dialog */}
      <Dialog open={selectedSession.isOpen} onOpenChange={closeSessionProfit}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Session Profit - Session ID: {selectedSession.sessionId}</DialogTitle>
            <DialogDescription>
              Cumulative profit across hands played in this session
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedSession.profitData}>
                <XAxis 
                  dataKey="hands" 
                  label={{ value: 'Hands Played', position: 'bottom' }}
                />
                <YAxis 
                  label={{ value: 'Profit (₹)', angle: -90, position: 'left' }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RiskyUserSessions;