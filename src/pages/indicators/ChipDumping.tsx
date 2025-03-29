import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserListTable, { User, Column } from "@/components/ui-custom/UserListTable";
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

const ChipDumping = () => {
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
      username: "player123",
      sessionId: "1234567890",
      tableType: "50/100 NL Hold'em",
      handsPlayed: 1250,
      bbsDumped: 150,
      winRate: -12.5,
      beneficiaryUser: "beneficiary456",
      beneficiaryId: "456",
      numPlayers: 5.2,
      avgClosingAction: 2.8,
      bonusConversion: 120,
      chipDumpingScore: 8.7,
      status: "flagged",
      location: "Mumbai, IN",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: "2",
      username: "gamer456",
      sessionId: "2345678901",
      tableType: "25/50 PLO",
      handsPlayed: 850,
      bbsDumped: 75,
      winRate: 5.8,
      beneficiaryUser: "beneficiary789",
      beneficiaryId: "789",
      numPlayers: 4.8,
      avgClosingAction: 1.5,
      bonusConversion: 60,
      chipDumpingScore: 6.4,
      status: "review",
      location: "Delhi, IN",
      date: new Date().toISOString().split('T')[0],
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
    },
    {
      id: "4",
      username: "pro123",
      sessionId: "4567890123",
      tableType: "200/400 NL Hold'em",
      handsPlayed: 950,
      bbsDumped: 120,
      winRate: 8.2,
      beneficiaryUser: "beneficiary456",
      beneficiaryId: "456",
      numPlayers: 4.2,
      avgClosingAction: 2.1,
      bonusConversion: 95,
      chipDumpingScore: 7.8,
      status: "flagged",
      location: "Chennai, IN",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: "5",
      username: "master789",
      sessionId: "5678901234",
      tableType: "50/100 PLO",
      handsPlayed: 1500,
      bbsDumped: 180,
      winRate: 3.5,
      beneficiaryUser: "beneficiary789",
      beneficiaryId: "789",
      numPlayers: 5.8,
      avgClosingAction: 2.5,
      bonusConversion: 150,
      chipDumpingScore: 8.1,
      status: "review",
      location: "Kolkata, IN",
      date: new Date().toISOString().split('T')[0],
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
      header: "Username", 
      accessor: "username",
      className: "w-[200px]",
      headerClassName: "w-[200px]",
      render: (value: string, user: User) => (
        <a 
          href="/users/1"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {value}
        </a>
      )
    },
    { 
      header: "Session ID", 
      accessor: "sessionId",
      className: "w-[150px]",
      headerClassName: "w-[150px]",
      render: (value: string) => (
        <div className="space-y-1">
          <span>{value}</span>
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
      headerClassName: isExpanded ? "w-[120px]" : "hidden"
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
            ID: {user.beneficiaryId}
          </a>
        </div>
      )
    },
    { 
      header: "Chip Dumping Score", 
      accessor: "chipDumpingScore",
      className: isExpanded ? "w-[150px]" : "sticky right-[360px] bg-white z-20 w-[150px]",
      headerClassName: isExpanded ? "w-[150px]" : "sticky right-[360px] bg-white z-20 w-[150px]",
      render: (value: number) => (
        <span className={value >= 7.5 ? "text-red-500" : value >= 5 ? "text-yellow-500" : "text-green-500"}>
          {value.toFixed(1)}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: "status",
      className: isExpanded ? "w-[120px]" : "sticky right-[240px] bg-white z-20 w-[120px]",
      headerClassName: isExpanded ? "w-[120px]" : "sticky right-[240px] bg-white z-20 w-[120px]"
    },
    { 
      header: "Actions", 
      accessor: "id",
      className: "sticky right-0 bg-white z-20 w-[240px]",
      headerClassName: "sticky right-0 bg-white z-20 w-[240px]",
      render: (value: string, user: User) => (
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
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Currently monitored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Live sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspicious Patterns</CardTitle>
            <CardDescription>Potential dumping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">28</div>
            <p className="text-sm text-muted-foreground">+3 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total BBs Dumped</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
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
              <CardTitle>Chip Dumping Analysis</CardTitle>
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
};

export default ChipDumping; 