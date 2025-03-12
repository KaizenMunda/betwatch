import React from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Receipt, AlertTriangle, Flag, Ban, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const UserProfile = () => {
  const { userId } = useParams();
  const user = getUserById(userId || "");
  const [currentStatus, setCurrentStatus] = React.useState(user?.status || "active");

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged":
        return "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400";
      case "blocked":
        return "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400";
      default:
        return "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "bg-red-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(currentStatus)}`}>
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
            </div>
            
            {/* Action Buttons */}
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
                        Are you sure you want to flag this user? This will mark their account for review and may trigger additional monitoring.
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
                        Are you sure you want to remove the flag from this user? This will mark their account as normal.
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
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Basic user details and verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                    <dd>{user.profile.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd>{user.profile.phoneNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Join Date</dt>
                    <dd>{user.profile.joinDate.toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Verification Status</dt>
                    <dd className="capitalize">{user.profile.verificationStatus}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>Transaction summary and balance</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Total Transactions</dt>
                    <dd>{user.profile.totalTransactions}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Account Balance</dt>
                    <dd>${user.profile.accountBalance.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Last Active</dt>
                    <dd>{user.lastActive.toLocaleDateString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Score</CardTitle>
                <CardDescription>Current risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold mb-2 ${getScoreTextColor(user.fraudScore.value)}`}>
                  {user.fraudScore.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated: {user.fraudScore.lastUpdated.toLocaleDateString()}
                </p>
                {user.fraudScore.subScores.map((subScore) => (
                  <div key={subScore.id} className="mt-4">
                    <div className="text-sm font-medium">{subScore.name}</div>
                    <div className="text-sm text-muted-foreground">{subScore.description}</div>
                    <div className={`text-sm font-medium ${getScoreTextColor(subScore.value)}`}>
                      Score: {subScore.value}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>User's recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium capitalize">{activity.type.replace('_', ' ')}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.date.toLocaleDateString()} {activity.location && `• ${activity.location}`}
                        {activity.device && ` • ${activity.device}`}
                      </div>
                    </div>
                    <div className={`ml-auto rounded-full px-2 py-1 text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                      activity.status === 'failed' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk">
          <div className="grid gap-4">
            {/* Risk Scores Card */}
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
                    <TabsTrigger value="splash">Splash Collusion Score</TabsTrigger>
                    <TabsTrigger value="rta">RTA Score</TabsTrigger>
                  </TabsList>

                  {['bot', 'dumping', 'collusion', 'ghosting', 'splash', 'rta'].map((type) => (
                    <TabsContent key={type} value={type}>
                      <div className="space-y-4">
                        {/* Platform Risk Score Component */}
                        <div className="p-6 border rounded-lg space-y-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-2xl font-bold capitalize mb-2">{type} Score</h3>
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Last login: {format(new Date(Date.now() - 2 * 60 * 60 * 1000), 'MMM d, yyyy HH:mm')}</p>
                                <p className="text-sm text-muted-foreground">Last hand played: {format(new Date(Date.now() - 5 * 60 * 60 * 1000), 'MMM d, yyyy HH:mm')}</p>
                                <p className="text-sm text-muted-foreground">Last withdrawal: {format(new Date(Date.now() - 48 * 60 * 60 * 1000), 'MMM d, yyyy HH:mm')}</p>
                              </div>
                            </div>
                            <div className="flex gap-6">
                              {/* Active Days Ring */}
                              <div className="relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                  <circle
                                    className="text-gray-200"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                  <circle
                                    className="stroke-blue-500"
                                    strokeWidth="10"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 * (1 - 24/30)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                  <span className="text-2xl font-bold text-blue-500">24</span>
                                  <span className="text-xs text-muted-foreground">days</span>
                                </div>
                                <div className="absolute -bottom-6 w-full text-center">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">Active Days</span>
                                </div>
                              </div>

                              {/* High Score Frequency Ring */}
                              <div className="relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                  <circle
                                    className="text-gray-200"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                  <circle
                                    className="stroke-purple-500"
                                    strokeWidth="10"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 * (1 - 15/30)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                  <span className="text-2xl font-bold text-purple-500">15</span>
                                  <span className="text-xs text-muted-foreground">days</span>
                                </div>
                                <div className="absolute -bottom-6 w-full text-center">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">High Score</span>
                                </div>
                              </div>

                              {/* Current Score Ring */}
                              <div className="relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                  <circle
                                    className="text-gray-200"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                  <circle
                                    className={cn(getScoreTextColor(7).replace('text', 'stroke'))}
                                    strokeWidth="10"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 * (1 - 7/10)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                  <span className={`text-2xl font-bold ${getScoreTextColor(7)}`}>7.0</span>
                                </div>
                                <div className="absolute -bottom-6 w-full text-center">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    Score for {format(new Date(), 'MMM d')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              {
                                name: 'Betting Pattern',
                                score: 8,
                                weight: 0.3,
                                description: 'Analysis of user betting behavior and patterns',
                                parameters: [
                                  {
                                    name: 'Bet Frequency',
                                    score: 7,
                                    weight: 0.4,
                                    definition: 'Number of bets placed per hour',
                                    impact: 'High frequency may indicate automated betting',
                                    value: '15 bets/hour',
                                    children: [
                                      {
                                        name: 'Peak Hours Analysis',
                                        definition: 'Distribution of bets during peak hours',
                                        value: '70% during off-peak hours'
                                      },
                                      {
                                        name: 'Consistency Pattern',
                                        definition: 'Variance in betting intervals',
                                        value: '±2 minutes between bets'
                                      }
                                    ]
                                  },
                                  {
                                    name: 'Bet Size Variance',
                                    score: 8,
                                    weight: 0.3,
                                    definition: 'Variation in bet amounts',
                                    impact: 'Consistent sizes may indicate systematic betting',
                                    value: '±$50 variance',
                                    children: [
                                      {
                                        name: 'Size Distribution',
                                        definition: 'Range of bet sizes',
                                        value: '$25-$75 (90% of bets)'
                                      },
                                      {
                                        name: 'Pattern Analysis',
                                        definition: 'Sequential betting patterns',
                                        value: 'Repeating sequence detected'
                                      }
                                    ]
                                  },
                                  {
                                    name: 'Win/Loss Pattern',
                                    score: 9,
                                    weight: 0.3,
                                    definition: 'Pattern analysis of wins and losses',
                                    impact: 'Unusual patterns may indicate manipulation',
                                    value: '65% win rate'
                                  }
                                ]
                              },
                              {
                                name: 'Account Activity',
                                score: 6,
                                weight: 0.2,
                                description: 'Frequency and timing of account actions',
                                parameters: [
                                  {
                                    name: 'Login Frequency',
                                    score: 5,
                                    weight: 0.5,
                                    definition: 'Number of login attempts per day',
                                    impact: 'Multiple logins may indicate shared accounts',
                                    value: '8 logins/day'
                                  },
                                  {
                                    name: 'Session Duration',
                                    score: 7,
                                    weight: 0.5,
                                    definition: 'Average length of betting sessions',
                                    impact: 'Extended sessions may indicate automated play',
                                    value: '4.5 hours avg'
                                  }
                                ]
                              },
                              {
                                name: 'Transaction Risk',
                                score: 7,
                                weight: 0.2,
                                description: 'Risk assessment of financial transactions',
                                parameters: [
                                  {
                                    name: 'Deposit Pattern',
                                    score: 6,
                                    weight: 0.5,
                                    definition: 'Analysis of deposit timing and amounts',
                                    impact: 'Irregular patterns may indicate money laundering',
                                    value: '$500 avg/deposit'
                                  },
                                  {
                                    name: 'Withdrawal Frequency',
                                    score: 8,
                                    weight: 0.5,
                                    definition: 'Frequency of withdrawal requests',
                                    impact: 'Rapid withdrawals may indicate bonus abuse',
                                    value: '3 requests/week'
                                  }
                                ]
                              },
                              {
                                name: 'Location & Device',
                                score: 8,
                                weight: 0.3,
                                description: 'Analysis of access locations and devices used',
                                parameters: [
                                  {
                                    name: 'Location Changes',
                                    score: 8,
                                    weight: 0.5,
                                    definition: 'Frequency of location changes while betting',
                                    impact: 'Multiple locations may indicate VPN usage',
                                    value: '2 locations/day'
                                  },
                                  {
                                    name: 'Device Switching',
                                    score: 7,
                                    weight: 0.5,
                                    definition: 'Frequency of device changes',
                                    impact: 'Multiple devices may indicate shared accounts',
                                    value: '3 devices active'
                                  }
                                ]
                              }
                            ].map((category, index) => (
                              <Collapsible key={index}>
                                <div className="border rounded-lg">
                                  <div className="p-4 flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{category.name}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-medium ${getScoreTextColor(category.score)}`}>
                                        {category.score}/10
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        ({(category.weight * 100)}%)
                                      </span>
                                      <CollapsibleTrigger className="ml-2">
                                        <ChevronDown className="h-4 w-4" />
                                      </CollapsibleTrigger>
                                    </div>
                                  </div>
                                  <div className="px-4 pb-2">
                                    <Progress 
                                      value={category.score * 10} 
                                      className={getScoreColor(category.score)}
                                    />
                                  </div>
                                  <CollapsibleContent>
                                    <div className="px-4 pb-4">
                                      <div className="mt-4 border rounded-lg p-4 bg-gray-50/50">
                                        <div className="space-y-4">
                                          {category.parameters.map((param, pIndex) => (
                                            <Collapsible key={pIndex}>
                                              <div className="border rounded-lg p-4 space-y-2">
                                                <div className="flex justify-between items-start">
                                                  <div>
                                                    <span className="text-sm font-medium">{param.name} ({(param.weight || 0.1) * 100}%)</span>
                                                    <p className="text-xs text-muted-foreground">{param.definition}</p>
                                                    <p className="text-xs text-muted-foreground">{param.impact}</p>
                                                    <p className="text-xs font-medium mt-1">{param.value}</p>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-medium ${getScoreTextColor(param.score)}`}>
                                                      {param.score}/10
                                                    </span>
                                                    <CollapsibleTrigger className="ml-2">
                                                      <ChevronDown className="h-4 w-4" />
                                                    </CollapsibleTrigger>
                                                  </div>
                                                </div>
                                                <Progress 
                                                  value={param.score * 10} 
                                                  className={getScoreColor(param.score)}
                                                />
                                                <CollapsibleContent>
                                                  <div className="pt-2 space-y-2">
                                                    {param.children?.map((child, childIndex) => (
                                                      <div key={childIndex} className="border-l-2 border-white pl-4 flex justify-between items-start">
                                                        <div>
                                                          <div className="text-sm font-medium">{child.name}</div>
                                                          <p className="text-xs text-muted-foreground">{child.definition}</p>
                                                        </div>
                                                        <div className="text-xs font-medium mt-1">{child.value}</div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </CollapsibleContent>
                                              </div>
                                            </Collapsible>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            ))}
                          </div>
                        </div>

                        {/* Score Heatmap Card */}
                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Score Heatmap</CardTitle>
                            <CardDescription>Daily risk scores for the last 4 weeks from the selected date</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="relative pl-20">
                              {/* Week numbers */}
                              <div className="grid grid-cols-4 gap-2 mb-2">
                                {Array.from({ length: 4 }, (_, i) => (
                                  <div key={i} className="text-xs text-muted-foreground text-center">
                                    Week {4 - i}
                                  </div>
                                ))}
                              </div>

                              <div className="flex">
                                {/* Day labels */}
                                <div className="absolute left-0 flex flex-col justify-between h-full pr-4">
                                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="text-xs text-muted-foreground h-8 flex items-center">
                                      {day}
                                    </div>
                                  ))}
                                </div>

                                {/* Heatmap grid */}
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

                              {/* Legend */}
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
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.transactionHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} - ${transaction.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`ml-auto rounded-full px-2 py-1 text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                      transaction.status === 'failed' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile; 