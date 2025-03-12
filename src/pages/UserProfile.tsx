import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Flag, Ban, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import type { User } from "@/types/fraudModels";

const UserProfile = () => {
  const { userId } = useParams();
  const [currentStatus, setCurrentStatus] = React.useState<'active' | 'flagged' | 'blocked'>('active');

  // Mock user data
  const mockUser: User = {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    status: "active",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    joinDate: new Date("2024-01-15"),
    fraudScore: {
      id: "fs1",
      userId: "1",
      value: 8.5,
      subScores: [],
      timestamp: new Date(),
      threshold: 7.0,
      lastUpdated: new Date()
    },
    profile: {
      joinDate: new Date("2024-01-15"),
      location: "Mumbai, IN",
      phoneNumber: "+91 9876543210",
      verificationStatus: "verified",
      totalTransactions: 156,
      accountBalance: 25000
    },
    activities: [
      {
        type: "Login",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        location: "Mumbai, IN",
        status: "completed"
      },
      {
        type: "Transaction",
        date: new Date(Date.now() - 3 * 60 * 60 * 1000),
        amount: 5000,
        status: "completed"
      },
      {
        type: "Risk Alert",
        date: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: "flagged"
      }
    ],
    riskMetrics: {
      loginAttempts: 5,
      failedTransactions: 1,
      suspiciousActivities: 2,
      riskLevel: "medium",
      lastAssessment: new Date()
    },
    transactionHistory: [],
    actions: []
  };

  const handleAction = (action: 'flag' | 'unflag' | 'block' | 'unblock') => {
    switch (action) {
      case 'flag':
        setCurrentStatus('flagged');
        break;
      case 'unflag':
        setCurrentStatus('active');
        break;
      case 'block':
        setCurrentStatus('blocked');
        break;
      case 'unblock':
        setCurrentStatus('active');
        break;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            User ID: {mockUser.id}
          </div>
          <div className="flex gap-2">
            {currentStatus !== 'flagged' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                    <Flag className="h-4 w-4 mr-1" />
                    Flag User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Flag User Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to flag this user? This will mark their account for review.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAction('flag')} className="bg-orange-600">
                      Flag User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    <Flag className="h-4 w-4 mr-1" />
                    Unflag User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Flag from User</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove the flag from this user?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAction('unflag')} className="bg-green-600">
                      Unflag User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {currentStatus !== 'blocked' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                    <Ban className="h-4 w-4 mr-1" />
                    Block User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Block User Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to block this user? This will prevent them from accessing their account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAction('block')} className="bg-red-600">
                      Block User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    <Ban className="h-4 w-4 mr-1" />
                    Unblock User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Unblock User Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to unblock this user? This will restore their account access.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAction('unblock')} className="bg-green-600">
                      Unblock User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{mockUser.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{mockUser.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">{mockUser.profile.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{mockUser.profile.phoneNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Joined Date</div>
                    <div className="font-medium">{mockUser.joinDate.toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>User's recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUser.activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.date.toLocaleDateString()}</TableCell>
                      <TableCell>{activity.location || '-'}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(new Date(), 'MMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="range"
                    defaultMonth={new Date()}
                    numberOfMonths={2}
                    selected={{
                      from: new Date(),
                      to: new Date()
                    }}
                  />
                </PopoverContent>
              </Popover>
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
                    <div className="space-y-4">
                      <div className="p-6 border rounded-lg space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold capitalize mb-2">{type} Score</h3>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Last login: {format(new Date(Date.now() - 2 * 60 * 60 * 1000), 'MMM d, yyyy HH:mm')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Last hand played: {format(new Date(Date.now() - 5 * 60 * 60 * 1000), 'MMM d, yyyy HH:mm')}
                              </p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-red-500">7.5</div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="p-4 border rounded-lg">
                            <div className="text-sm text-muted-foreground">Active Days</div>
                            <div className="text-2xl font-bold">24/30</div>
                            <Progress value={80} className="mt-2" />
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-sm text-muted-foreground">High Score Days</div>
                            <div className="text-2xl font-bold">15/30</div>
                            <Progress value={50} className="mt-2" />
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-sm text-muted-foreground">Average Score</div>
                            <div className="text-2xl font-bold">6.8</div>
                            <Progress value={68} className="mt-2" />
                          </div>
                        </div>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Score Heatmap</CardTitle>
                          <CardDescription>Daily risk scores for the last 4 weeks</CardDescription>
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

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent financial activities</CardDescription>
            </CardHeader>
            <CardContent>
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
                  {mockUser.transactionHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockUser.transactionHistory.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>₹{transaction.amount}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile; 