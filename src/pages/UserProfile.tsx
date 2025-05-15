import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Flag, Ban, Calendar as CalendarIcon, Search, Users, Shield, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { User } from "@/types/fraudModels";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TablePagination } from "@/components/ui-custom/TablePagination";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";

interface UserProfile {
  id: string;
  username: string;
  userId: string;
  name: string;
  partnerId: string;
  registrationDate: Date;
  firstGameplayDate: Date;
  lastActive: Date;
  profile: {
    location: string;
    status: string;
    lastActive: Date;
    totalTransactions: number;
    accountBalance: number;
  };
  fraudScore: {
    value: number;
  };
  riskMetrics: {
    riskLevel: string;
    kycStatus: string;
  };
  preferences: {
    cardTheme: string;
  };
}

const UserProfile = () => {
  const { userId } = useParams();
  const [currentStatus, setCurrentStatus] = React.useState<'active' | 'flagged' | 'blocked' | 'whitelisted'>('active');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeTab, setActiveTab] = useState("overview");
  const [handRange, setHandRange] = useState("1000");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedDevice, setSelectedDevice] = useState<{
    type: string;
    model: string;
    systemName: string;
    sharedUsers: Array<{
      id: string;
      username: string;
      firstSeen: Date;
      lastSeen: Date;
      riskScore: number;
      collusionRiskScore: number;
    }>;
  } | null>(null);
  const [sessionPage, setSessionPage] = useState(1);
  const sessionsPerPage = 3;
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    action: '',
    userName: '',
  });
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [actionHistoryPage, setActionHistoryPage] = useState(1);
  const actionHistoryPerPage = 5;

  // Mock transaction data
  const mockTransactions = [
    {
      date: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: "Deposit",
      amount: 50000,
      status: "completed"
    },
    {
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "Buy-In",
      amount: 25000,
      status: "completed"
    },
    {
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: "Buy-Out",
      amount: 35000,
      status: "completed"
    },
    {
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: "Withdrawal",
      amount: 40000,
      status: "pending"
    },
    {
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: "Rewards Conversion",
      amount: 5000,
      status: "completed"
    },
    {
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: "Buy-In",
      amount: 20000,
      status: "completed"
    },
    {
      date: new Date(Date.now() - 7 * 60 * 60 * 1000),
      type: "Buy-Out",
      amount: 30000,
      status: "completed"
    }
  ];

  // Mock user data
  const mockUser: UserProfile = {
    id: "1",
    username: "player123",
    userId: "12345",
    name: "Rajesh Kumar",
    partnerId: "PART789",
    registrationDate: new Date("2024-01-15T10:30:00"),
    firstGameplayDate: new Date("2024-01-15T11:45:00"),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    profile: {
      location: "Mumbai, IN",
      status: "active",
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      totalTransactions: 156,
      accountBalance: 25000
    },
    fraudScore: {
      value: 8.5
    },
    riskMetrics: {
      riskLevel: "high",
      kycStatus: "verified"
    },
    preferences: {
      cardTheme: "minimal"
    }
  };

  // Mock shared users data
  const mockSharedUsers = {
    "Dell XPS 15": [
      {
        id: "2",
        username: "priya456",
        firstSeen: new Date("2024-03-15"),
        lastSeen: new Date("2024-03-20"),
        riskScore: 7.8,
        collusionRiskScore: 8.5
      },
      {
        id: "3",
        username: "vikram789",
        firstSeen: new Date("2024-03-16"),
        lastSeen: new Date("2024-03-19"),
        riskScore: 8.2,
        collusionRiskScore: 7.9
      }
    ]
  };

  // Mock session data
  const mockSessions = [
    {
      date: new Date(),
      duration: "2h 15m",
      gameType: "NLHE",
      stakes: "₹500/₹1000",
      handsPlayed: 245,
      winLoss: 12500,
      bb100: 5.2
    },
    {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      duration: "3h 45m",
      gameType: "PLO",
      stakes: "₹200/₹400",
      handsPlayed: 412,
      winLoss: -8200,
      bb100: -2.8
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: "1h 30m",
      gameType: "NLHE",
      stakes: "₹500/₹1000",
      handsPlayed: 168,
      winLoss: 15800,
      bb100: 7.5
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: "4h 20m",
      gameType: "NLHE",
      stakes: "₹500/₹1000",
      handsPlayed: 520,
      winLoss: -5600,
      bb100: -1.8
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      duration: "2h 45m",
      gameType: "PLO",
      stakes: "₹200/₹400",
      handsPlayed: 310,
      winLoss: 9200,
      bb100: 4.2
    }
  ];

  // Add mock flag history data
  const flagHistory = [
    {
      id: 1,
      date: new Date('2024-03-01'),
      previousState: 'active',
      newState: 'review',
      changedBy: 'System',
      duration: 2,
      comment: 'Automatically flagged for review due to high risk score',
      category: 'Risk Score',
      score: 8.5
    },
    {
      id: 2,
      date: new Date('2024-03-03'),
      previousState: 'review',
      newState: 'flagged',
      changedBy: 'admin@betwatch.in',
      duration: 5,
      comment: 'Manual review confirmed suspicious activity',
      category: 'Manual Review',
      score: 9.2
    },
    {
      id: 3,
      date: new Date('2024-03-08'),
      previousState: 'flagged',
      newState: 'whitelisted',
      changedBy: 'admin@betwatch.in',
      duration: 3,
      comment: 'User provided valid documentation',
      category: 'Documentation',
      score: 2.1
    },
    {
      id: 4,
      date: new Date('2024-03-11'),
      previousState: 'whitelisted',
      newState: 'active',
      changedBy: 'System',
      duration: 0,
      comment: 'Whitelist period expired',
      category: 'System',
      score: 1.0
    }
  ];

  // Sort flag history by date (latest to oldest)
  const sortedFlagHistory = [...flagHistory].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Get paginated data
  const paginatedFlagHistory = sortedFlagHistory.slice(
    (actionHistoryPage - 1) * actionHistoryPerPage,
    actionHistoryPage * actionHistoryPerPage
  );

  const handleActionHistoryPageChange = (pageNumber) => {
    setActionHistoryPage(pageNumber);
  };

  const handleAction = (action: 'flag' | 'unflag' | 'block' | 'unblock' | 'whitelist' | 'unwhitelist', comment?: string) => {
    // In a real application, this would make an API call with the comment
    console.log(`${action} user:`, userId, "with comment:", comment);
    
    if (action === 'flag') {
      setCurrentStatus('flagged');
    } else if (action === 'unflag') {
      setCurrentStatus('active');
    } else if (action === 'block') {
      setCurrentStatus('blocked');
    } else if (action === 'unblock') {
      setCurrentStatus('active');
    } else if (action === 'whitelist') {
      setCurrentStatus('whitelisted');
    } else if (action === 'unwhitelist') {
      setCurrentStatus('active');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedTransactions = mockTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update the win rate data to include negative values and intersections
  const winRateData = [
    { hands: 0, rate: 0, evRate: 0 },
    { hands: 100, rate: -1.5, evRate: -0.8 },
    { hands: 200, rate: 1.2, evRate: 0.5 },
    { hands: 300, rate: 0.8, evRate: 1.2 },
    { hands: 400, rate: 2.5, evRate: 1.8 },
    { hands: 500, rate: 1.6, evRate: 2.1 },
    { hands: 600, rate: -0.5, evRate: 0.3 },
    { hands: 700, rate: 1.8, evRate: 1.8 },
    { hands: 800, rate: 2.4, evRate: 1.5 },
    { hands: 900, rate: 1.2, evRate: 2.0 },
    { hands: 1000, rate: 2.8, evRate: 2.2 }
  ];

  // Filter data based on selected hand range
  const getFilteredData = () => {
    const maxHands = parseInt(handRange);
    return winRateData.filter(item => item.hands <= maxHands);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleViewSharedUsers = (device: { type: string; model: string; systemName: string }) => {
    setSelectedDevice({
      ...device,
      sharedUsers: mockSharedUsers[device.model] || []
    });
  };

  const handleSessionPageChange = (pageNumber) => {
    setSessionPage(pageNumber);
  };

  const closeConfirmation = () => {
    setConfirmation({
      isOpen: false,
      action: '',
      userName: '',
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            User ID: {mockUser.id} | Current Status = Clear
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              onClick={() => setConfirmation({ isOpen: true, action: 'review', userName: mockUser.username })}
            >
              <Search className="h-4 w-4 mr-1" />
              Review User
            </Button>

            {currentStatus !== 'flagged' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'flag', userName: mockUser.username })}
              >
                <Flag className="h-4 w-4 mr-1" />
                Flag User
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'unflag', userName: mockUser.username })}
              >
                <Flag className="h-4 w-4 mr-1" />
                Unflag User
              </Button>
            )}

            {currentStatus !== 'blocked' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'block', userName: mockUser.username })}
              >
                <Ban className="h-4 w-4 mr-1" />
                Block User
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'unblock', userName: mockUser.username })}
              >
                <Ban className="h-4 w-4 mr-1" />
                Unblock User
              </Button>
            )}

            {currentStatus !== 'whitelisted' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'whitelist', userName: mockUser.username })}
              >
                <Shield className="h-4 w-4 mr-1" />
                Whitelist User
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => setConfirmation({ isOpen: true, action: 'unwhitelist', userName: mockUser.username })}
              >
                <Shield className="h-4 w-4 mr-1" />
                Remove from Whitelist
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="gameplay">Gameplay Stats</TabsTrigger>
          <TabsTrigger value="winnability">Winnability</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="device">Device</TabsTrigger>
          <TabsTrigger value="action-history">Action History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>User details and account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Name</div>
                        <div className="font-medium">{mockUser.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Username</div>
                        <div className="font-medium">{mockUser.username}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">User ID</div>
                        <div className="font-medium">{mockUser.userId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Partner ID</div>
                        <div className="font-medium">{mockUser.partnerId}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Registration</div>
                        <div className="font-medium">{format(mockUser.registrationDate, 'MMM d, yyyy HH:mm')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">First Gameplay</div>
                        <div className="font-medium">{format(mockUser.firstGameplayDate, 'MMM d, yyyy HH:mm')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Time to First Gameplay</div>
                        <div className="font-medium">
                          {Math.round((mockUser.firstGameplayDate.getTime() - mockUser.registrationDate.getTime()) / (1000 * 60 * 60))} hours
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium">{mockUser.profile.location}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">VIP Tag</div>
                        <div className="font-medium">Gold</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Cash / Tournament Preference</div>
                        <div className="font-medium">Cash</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Primary Game Format</div>
                        <div className="font-medium">No-Limit Hold'em</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Preferred Stake</div>
                        <div className="font-medium">₹500/₹1000</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flag History</CardTitle>
                  <CardDescription>Track of user state changes and durations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flagHistory.map((change) => (
                      <div key={change.id} className="border-l-4 pl-4 space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {change.previousState.charAt(0).toUpperCase() + change.previousState.slice(1)} →{' '}
                              {change.newState.charAt(0).toUpperCase() + change.newState.slice(1)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(change.date, 'MMM d, yyyy HH:mm')}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={change.changedBy === 'System' ? 'text-blue-600' : 'text-purple-600'}>
                              {change.changedBy}
                            </span>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => setSelectedComment(change.comment)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>State Change Comment</DialogTitle>
                                  <DialogDescription>
                                    Comment added when changing state from {change.previousState} to {change.newState}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                  {change.comment}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {change.duration} {change.duration === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                      <div className="font-medium text-red-500">{mockUser.fraudScore.value}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                      <div className="font-medium">{mockUser.riskMetrics.riskLevel}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">KYC Status</div>
                      <div className="font-medium text-green-500">{mockUser.riskMetrics.kycStatus}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-medium">{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Transactions</div>
                      <div className="font-medium">{mockUser.profile.totalTransactions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Last Active</div>
                      <div className="font-medium">{mockUser.lastActive.toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Interaction</CardTitle>
                  <CardDescription>User's product preferences and interaction patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Product Interaction Score</div>
                      <div className={cn(
                        "font-medium",
                        8.2 >= 7 ? "text-red-500" :
                        8.2 >= 5 ? "text-yellow-500" :
                        "text-green-500"
                      )}>
                        8.2
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Device</div>
                      <div className="font-medium">Mobile</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Card Theme</div>
                      <div className="font-medium">{mockUser.preferences.cardTheme}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link to="/indicators/product-interaction">
                        Product Interaction Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Lifetime and monthly averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Cash Hands Played</div>
                  <div className="text-2xl font-bold">1,200</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Tournaments Played</div>
                  <div className="text-2xl font-bold">150</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Cash Hands per Month</div>
                  <div className="text-2xl font-bold">100</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Tournaments per Month</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Current account balance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Unused Balance</div>
                  <div className="text-2xl font-bold">₹{Math.round(15000).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Withdrawable</div>
                  <div className="text-2xl font-bold">₹{Math.round(8000).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Rewards</div>
                  <div className="text-2xl font-bold">₹{Math.round(2000).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">TDS this FY</div>
                  <div className="text-2xl font-bold">₹{Math.round(500).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>Monthly averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Deposits</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Deposit').reduce((acc, t) => acc + t.amount, 0)).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Withdrawals</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Withdrawal').reduce((acc, t) => acc + t.amount, 0)).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Rake</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Buy-In').reduce((acc, t) => acc + t.amount * 0.05, 0)).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Lifetime Rewards</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Rewards Conversion').reduce((acc, t) => acc + t.amount, 0)).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">First Time Deposit</div>
                  <div className="text-2xl font-bold">₹{Math.round(50000).toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">{format(new Date("2024-01-15"), 'MMM d, yyyy')}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">First Time Withdrawal</div>
                  <div className="text-2xl font-bold">₹{Math.round(35000).toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">{format(new Date("2024-01-20"), 'MMM d, yyyy')}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Deposit per Month</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Deposit').reduce((acc, t) => acc + t.amount, 0) / 3).toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Withdrawal per Month</div>
                  <div className="text-2xl font-bold">₹{Math.round(mockTransactions.filter(t => t.type === 'Withdrawal').reduce((acc, t) => acc + t.amount, 0) / 3).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent financial activities</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range: any) => setDateRange(range)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <label htmlFor="typeFilter" className="text-sm text-muted-foreground">Filter by Type:</label>
                  <select id="typeFilter" className="ml-2 border rounded p-1">
                    <option value="">All</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Buy-In">Buy-In</option>
                    <option value="Buy-Out">Buy-Out</option>
                    <option value="Rewards Conversion">Rewards Conversion</option>
                  </select>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions
                    .filter(transaction => {
                      if (!dateRange.from && !dateRange.to) return true;
                      const transactionDate = transaction.date;
                      if (dateRange.from && !dateRange.to) {
                        return transactionDate >= dateRange.from;
                      }
                      if (!dateRange.from && dateRange.to) {
                        return transactionDate <= dateRange.to;
                      }
                      if (dateRange.from && dateRange.to) {
                        return transactionDate >= dateRange.from && transactionDate <= dateRange.to;
                      }
                      return true;
                    })
                    .map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(transaction.date, 'MMM d, yyyy HH:mm')}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                currentPage={currentPage}
                totalItems={mockTransactions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gameplay" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Gameplay Statistics</CardTitle>
                <CardDescription>Overall gameplay performance and patterns</CardDescription>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Hands Played</div>
                  <div className="text-2xl font-bold">12,450</div>
                  <p className="text-sm text-muted-foreground">Lifetime</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Session Length</div>
                  <div className="text-2xl font-bold">2.5 hrs</div>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Preferred Stakes</div>
                  <div className="text-2xl font-bold">₹500/₹1000</div>
                  <p className="text-sm text-muted-foreground">Most played</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Preferred Game Type</div>
                  <div className="text-2xl font-bold">NLHE</div>
                  <p className="text-sm text-muted-foreground">No-Limit Hold'em</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">VPIP</div>
                  <div className="text-2xl font-bold">24.5%</div>
                  <p className="text-sm text-muted-foreground">Voluntarily Put Money in Pot</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">PFR</div>
                  <div className="text-2xl font-bold">18.2%</div>
                  <p className="text-sm text-muted-foreground">Pre-Flop Raise</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">3-Bet</div>
                  <div className="text-2xl font-bold">7.8%</div>
                  <p className="text-sm text-muted-foreground">Three-bet percentage</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">C-Bet</div>
                  <div className="text-2xl font-bold">68.5%</div>
                  <p className="text-sm text-muted-foreground">Continuation bet frequency</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Showdown Win</div>
                  <div className="text-2xl font-bold">52.3%</div>
                  <p className="text-sm text-muted-foreground">Wins at showdown</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Non-Showdown Win</div>
                  <div className="text-2xl font-bold">34.8%</div>
                  <p className="text-sm text-muted-foreground">Wins without showdown</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Fold to 3-Bet</div>
                  <div className="text-2xl font-bold">62.5%</div>
                  <p className="text-sm text-muted-foreground">Folding to three-bets</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Went to Showdown</div>
                  <div className="text-2xl font-bold">28.6%</div>
                  <p className="text-sm text-muted-foreground">Hands that reached showdown</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Recent gameplay sessions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range: any) => setDateRange(range)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Game Type</TableHead>
                    <TableHead>Stakes</TableHead>
                    <TableHead>Hands Played</TableHead>
                    <TableHead>Win/Loss</TableHead>
                    <TableHead>BB/100</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSessions
                    .filter(session => {
                      if (!dateRange.from && !dateRange.to) return true;
                      if (dateRange.from && !dateRange.to) {
                        return session.date >= dateRange.from;
                      }
                      if (!dateRange.from && dateRange.to) {
                        return session.date <= dateRange.to;
                      }
                      if (dateRange.from && dateRange.to) {
                        return session.date >= dateRange.from && session.date <= dateRange.to;
                      }
                      return true;
                    })
                    .slice((sessionPage - 1) * sessionsPerPage, sessionPage * sessionsPerPage)
                    .map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(session.date, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.gameType}</TableCell>
                        <TableCell>{session.stakes}</TableCell>
                        <TableCell>{session.handsPlayed}</TableCell>
                        <TableCell className={session.winLoss >= 0 ? "text-green-500" : "text-red-500"}>
                          {session.winLoss >= 0 ? '+' : ''}{session.winLoss.toLocaleString()}
                        </TableCell>
                        <TableCell>{session.bb100}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                currentPage={sessionPage}
                totalItems={mockSessions.length}
                itemsPerPage={sessionsPerPage}
                onPageChange={handleSessionPageChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winnability" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-2xl">Winnability Analysis</CardTitle>
                <CardDescription>
                  Track win rates and expected value over time
                </CardDescription>
              </div>
              <Select value={handRange} onValueChange={setHandRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select hand range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10000">Last 10k Hands</SelectItem>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Cash Game Win Rate</div>
                  <div className="text-3xl font-bold text-green-500">5.2 BB/100</div>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">NLH Win Rate</div>
                  <div className="text-3xl font-bold text-green-500">6.8 BB/100</div>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">PLO Win Rate</div>
                  <div className="text-3xl font-bold text-red-500">-2.4 BB/100</div>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Tournament Cashes</div>
                  <div className="text-3xl font-bold text-blue-500">24</div>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Tournament Net Winnings</div>
                  <div className="text-3xl font-bold text-green-500">₹45,000</div>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Tournament ROI</div>
                  <div className="text-3xl font-bold text-green-500">42%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Win Rate Trend</CardTitle>
                <CardDescription>Track win rate and EV win rate over time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
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
                <Select value={handRange} onValueChange={setHandRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Hands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">1k Hands</SelectItem>
                    <SelectItem value="10000">10k Hands</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setHandRange(handRange)}>Submit</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={getFilteredData()}
                    margin={{ top: 20, right: 30, left: 80, bottom: 50 }}
                  >
                    <XAxis 
                      dataKey="hands" 
                      label={{ 
                        value: "Number of Hands", 
                        position: "insideBottom",
                        offset: -10
                      }}
                    />
                    <YAxis 
                      label={{ 
                        value: "Win Rate (BB/100 hands)", 
                        angle: -90, 
                        position: "outside",
                        offset: -60
                      }}
                      domain={['auto', 'auto']}
                      padding={{ top: 20, bottom: 20 }}
                    />
                    <Tooltip />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      wrapperStyle={{
                        paddingTop: "10px",
                        paddingBottom: "20px"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#22c55e"
                      name="Win Rate"
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="evRate"
                      stroke="#3b82f6"
                      name="EV Win Rate"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">Risk Analysis</CardTitle>
                <CardDescription>Detailed breakdown of risk categories</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, 'MMM d, yyyy')}
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
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bot" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  <TabsTrigger value="bot">Bot Score</TabsTrigger>
                  <TabsTrigger value="dumping">Dumping Score</TabsTrigger>
                  <TabsTrigger value="collusion">Collusion Score</TabsTrigger>
                  <TabsTrigger value="ghosting">Ghosting Score</TabsTrigger>
                  <TabsTrigger value="splash">Splash Collusion</TabsTrigger>
                  <TabsTrigger value="rta">RTA Score</TabsTrigger>
                </TabsList>

                {['bot', 'dumping', 'collusion', 'ghosting', 'splash', 'rta'].map((type) => (
                  <TabsContent key={type} value={type}>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-4 border rounded-lg space-y-2">
                          <div className="text-sm text-muted-foreground">Day's Score</div>
                          <div className="text-3xl font-bold text-red-500">8.5</div>
                          <p className="text-sm text-muted-foreground">Last updated 2 hours ago</p>
                        </div>

                        <div className="p-4 border rounded-lg space-y-2">
                          <div className="text-sm text-muted-foreground">Active Days</div>
                          <div className="text-3xl font-bold text-blue-500">21/28</div>
                          <p className="text-sm text-muted-foreground">Days with activity in last 28 days</p>
                        </div>

                        <div className="p-4 border rounded-lg space-y-2">
                          <div className="text-sm text-muted-foreground">High Score Days</div>
                          <div className="text-3xl font-bold text-yellow-500">8/28</div>
                          <p className="text-sm text-muted-foreground">Days with score ≥ 7.5 in last 28 days</p>
                        </div>
                      </div>

                      {type === 'dumping' && (
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.location.href = `/indicators/chip-dumping?userId=${userId}`}
                          >
                            <Search className="h-4 w-4" />
                            View Sessions
                          </Button>
                        </div>
                      )}

                      <Card>
                        <CardHeader>
                          <CardTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Score Heatmap</CardTitle>
                          <CardDescription>Daily Risk Scores for the previous 4 weeks from {format(selectedDate, 'MMM d, yyyy')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="relative pl-20">
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              {Array.from({ length: 4 }, (_, i) => (
                                <div key={i} className="text-xs text-muted-foreground text-center">
                                  Week {4 - i}
                                </div>
                              ))}
                            </div>

                            <div className="flex">
                              <div className="absolute left-0 flex flex-col justify-between h-full pr-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                  <div key={day} className="text-xs text-muted-foreground h-8 flex items-center">
                                    {day}
                                  </div>
                                ))}
                              </div>

                              <div className="grid grid-cols-4 gap-2 flex-1">
                                {Array.from({ length: 4 }, (_, weekIndex) => (
                                  <div key={weekIndex} className="grid grid-rows-7 gap-2">
                                    {Array.from({ length: 7 }, (_, dayIndex) => {
                                      const hasActivity = Math.random() > 0.3;
                                      const score = hasActivity ? (Math.random() * 10).toFixed(1) : null;
                                      const date = new Date(Date.now() - ((3 - weekIndex) * 7 + dayIndex) * 24 * 60 * 60 * 1000);
                                      
                                      return (
                                        <div
                                          key={dayIndex}
                                          className={`h-8 rounded-sm flex items-center justify-center text-xs
                                            ${score ? 'text-white' : 'text-muted-foreground'}
                                            border border-black/10 transition-colors duration-200`}
                                          style={{
                                            backgroundColor: score ? 
                                              (parseFloat(score) >= 7.5 ? 'rgb(239, 68, 68)' :
                                               parseFloat(score) >= 5 ? 'rgb(234, 179, 8)' :
                                               'rgb(34, 197, 94)') : 'white'
                                          }}
                                          title={`${format(date, 'MMM d, yyyy')}${score ? ` - Score: ${score}/10` : ' - No activity'}`}
                                        >
                                          {score || '-'}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 bg-white border border-black/10 rounded-sm"></div>
                                <span>No activity</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 bg-green-500 border border-black/10 rounded-sm"></div>
                                  <span>Score &lt; 5.0</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 bg-yellow-500 border border-black/10 rounded-sm"></div>
                                  <span>Score 5.0-7.4</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 bg-red-500 border border-black/10 rounded-sm"></div>
                                  <span>Score ≥ 7.5</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="device" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Analysis</CardTitle>
              <CardDescription>
                User's device usage patterns and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Total Devices</div>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">Unique devices in last 30 days</p>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Primary Device</div>
                  <div className="text-3xl font-bold">Mobile</div>
                  <p className="text-sm text-muted-foreground">Most frequently used</p>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="text-sm text-muted-foreground">Device Switches</div>
                  <div className="text-3xl font-bold text-yellow-500">8</div>
                  <p className="text-sm text-muted-foreground">In last 30 days</p>
                </div>
              </div>

              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device Type</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>System Name</TableHead>
                      <TableHead>Memory (GB)</TableHead>
                      <TableHead>Operating System</TableHead>
                      <TableHead>First Login</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Shared By</TableHead>
                      <TableHead>Usage %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Mobile</TableCell>
                      <TableCell>iPhone 15 Pro</TableCell>
                      <TableCell>Rajesh's iPhone</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>iOS 17.2</TableCell>
                      <TableCell>Mar 1, 2024</TableCell>
                      <TableCell>Mar 20, 2024</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">0</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>65%</span>
                          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Desktop</TableCell>
                      <TableCell>Dell XPS 15</TableCell>
                      <TableCell>Rajesh-PC</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>Windows 11</TableCell>
                      <TableCell>Mar 5, 2024</TableCell>
                      <TableCell>Mar 19, 2024</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500">2</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2"
                                onClick={() => handleViewSharedUsers({
                                  type: "Desktop",
                                  model: "Dell XPS 15",
                                  systemName: "Rajesh-PC"
                                })}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Shared Users - {selectedDevice?.model}</DialogTitle>
                                <DialogDescription>
                                  Users who have accessed this device in the last 30 days
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>User ID</TableHead>
                                      <TableHead>Username</TableHead>
                                      <TableHead>First Seen</TableHead>
                                      <TableHead>Last Seen</TableHead>
                                      <TableHead>Ghosting Risk Score</TableHead>
                                      <TableHead>Collusion Risk Score</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedDevice?.sharedUsers.map((user) => (
                                      <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>
                                          <a 
                                            href={`/users/${user.id}`} 
                                            className="text-blue-600 hover:underline cursor-pointer"
                                          >
                                            {user.username}
                                          </a>
                                        </TableCell>
                                        <TableCell>{format(user.firstSeen, 'MMM d, yyyy')}</TableCell>
                                        <TableCell>{format(user.lastSeen, 'MMM d, yyyy')}</TableCell>
                                        <TableCell>
                                          <span className={
                                            user.riskScore >= 7.5 ? 'text-red-500' :
                                            user.riskScore >= 5 ? 'text-yellow-500' :
                                            'text-green-500'
                                          }>
                                            {user.riskScore.toFixed(1)}
                                          </span>
                                        </TableCell>
                                        <TableCell>
                                          <span className={
                                            user.collusionRiskScore >= 7.5 ? 'text-red-500' :
                                            user.collusionRiskScore >= 5 ? 'text-yellow-500' :
                                            'text-green-500'
                                          }>
                                            {user.collusionRiskScore.toFixed(1)}
                                          </span>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>25%</span>
                          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: '25%' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tablet</TableCell>
                      <TableCell>iPad Pro 12.9</TableCell>
                      <TableCell>Rajesh's iPad</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>iPadOS 17.2</TableCell>
                      <TableCell>Mar 10, 2024</TableCell>
                      <TableCell>Mar 18, 2024</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">0</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>10%</span>
                          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '10%' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action-history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action History</CardTitle>
              <CardDescription>Track of user state changes and durations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Previous State</TableHead>
                    <TableHead>New State</TableHead>
                    <TableHead>Changed By</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedFlagHistory.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell>{format(change.date, 'MMM d, yyyy HH:mm')}</TableCell>
                      <TableCell>{change.previousState.charAt(0).toUpperCase() + change.previousState.slice(1)}</TableCell>
                      <TableCell>{change.newState.charAt(0).toUpperCase() + change.newState.slice(1)}</TableCell>
                      <TableCell>
                        <span className={change.changedBy === 'System' ? 'text-blue-600' : 'text-purple-600'}>
                          {change.changedBy}
                        </span>
                      </TableCell>
                      <TableCell>{change.category}</TableCell>
                      <TableCell>
                        <span className={
                          change.score >= 7.5 ? 'text-red-500' :
                          change.score >= 5 ? 'text-yellow-500' :
                          'text-green-500'
                        }>
                          {change.score.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>{change.duration} {change.duration === 1 ? 'day' : 'days'}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setSelectedComment(change.comment)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>State Change Comment</DialogTitle>
                              <DialogDescription>
                                Comment added when changing state from {change.previousState} to {change.newState}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                              {change.comment}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                currentPage={actionHistoryPage}
                totalItems={sortedFlagHistory.length}
                itemsPerPage={actionHistoryPerPage}
                onPageChange={handleActionHistoryPageChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        onClose={closeConfirmation}
        onConfirm={handleAction}
        title={
          confirmation.action === "block"
            ? "Block User"
            : confirmation.action === "unblock"
            ? "Unblock User"
            : confirmation.action === "flag"
            ? "Flag User"
            : confirmation.action === "unflag"
            ? "Unflag User"
            : confirmation.action === "whitelist"
            ? "Whitelist User"
            : confirmation.action === "unwhitelist"
            ? "Remove from Whitelist"
            : "Review User"
        }
        description={
          confirmation.action === "block"
            ? `Are you sure you want to block ${confirmation.userName}? This will prevent them from accessing the platform.`
            : confirmation.action === "unblock"
            ? `Are you sure you want to unblock ${confirmation.userName}? This will restore their access to the platform.`
            : confirmation.action === "flag"
            ? `Are you sure you want to flag ${confirmation.userName} for suspicious activity?`
            : confirmation.action === "unflag"
            ? `Are you sure you want to remove the flag from ${confirmation.userName}'s account?`
            : confirmation.action === "whitelist"
            ? `Are you sure you want to whitelist ${confirmation.userName}? This will exempt them from risk monitoring.`
            : confirmation.action === "unwhitelist"
            ? `Are you sure you want to remove ${confirmation.userName} from the whitelist? This will resume risk monitoring.`
            : `Are you sure you want to mark ${confirmation.userName} for review?`
        }
        actionLabel={
          confirmation.action === "block"
            ? "Block"
            : confirmation.action === "unblock"
            ? "Unblock"
            : confirmation.action === "flag"
            ? "Flag"
            : confirmation.action === "unflag"
            ? "Unflag"
            : confirmation.action === "whitelist"
            ? "Whitelist"
            : confirmation.action === "unwhitelist"
            ? "Remove from Whitelist"
            : "Review"
        }
        variant={confirmation.action === "block" || confirmation.action === "flag" ? "destructive" : "default"}
        showComment={true}
      />
    </div>
  );
};

export default UserProfile; 