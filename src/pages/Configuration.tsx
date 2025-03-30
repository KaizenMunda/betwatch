import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { History } from "lucide-react";

// Mock data for dashboard users
const dashboardUsers = [
  { id: "1", name: "John Smith", email: "john@example.com" },
  { id: "2", name: "Sarah Wilson", email: "sarah@example.com" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com" },
];

// Mock data for alert history
const alertHistory = [
  { 
    id: 1,
    userId: "1",
    userName: "John Smith",
    category: "bot",
    threshold: 6.0,
    mediums: ["email", "teams"],
    setAt: "2024-03-15T10:30:00Z"
  },
  { 
    id: 2,
    userId: "2",
    userName: "Sarah Wilson",
    category: "dumping",
    threshold: 5.5,
    mediums: ["email", "sms"],
    setAt: "2024-03-14T15:45:00Z"
  }
];

// Default weights configuration
const defaultWeights = {
  bot: {
    rapidBetting: 30,
    patternRecognition: 25,
    sessionDuration: 20,
    timeConsistency: 25
  },
  dumping: {
    lossRate: 35,
    betSizeVariance: 35,
    timeOfPlay: 30
  },
  collusion: {
    tableOccupancy: 25,
    winDistribution: 30,
    playerInteraction: 25,
    chipTransfer: 20
  },
  ghosting: {
    accountSwitching: 40,
    ipOverlap: 30,
    deviceSharing: 30
  },
  splash: {
    unusualBets: 35,
    winningPattern: 35,
    playerNetwork: 30
  },
  rta: {
    decisionSpeed: 35,
    optimalPlay: 35,
    consistencyScore: 30
  }
};

const Configuration = () => {
  // State for risk thresholds
  const [thresholds, setThresholds] = useState({
    bot: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 },
    dumping: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 },
    collusion: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 },
    ghosting: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 },
    splash: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 },
    rta: { autoReview: 5.0, autoFlag: 7.0, autoBlock: 8.5 }
  });

  // State for weights
  const [weights, setWeights] = useState(defaultWeights);

  // State for alert settings
  const [selectedUser, setSelectedUser] = useState("");
  const [alertScores, setAlertScores] = useState({
    bot: "6.0",
    dumping: "5.5",
    collusion: "6.5",
    ghosting: "5.0",
    splash: "6.0",
    rta: "7.0"
  });
  const [alertMediums, setAlertMediums] = useState({
    email: true,
    sms: false,
    teams: true
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleThresholdChange = (category: string, type: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
      setThresholds(prev => ({
        ...prev,
        [category]: { ...prev[category], [type]: numValue }
      }));
    }
  };

  const handleWeightChange = (category: string, subScore: string, value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subScore]: value[0]
      }
    }));
  };

  const handleAlertScoreChange = (category: string, value: string) => {
    setAlertScores(prev => ({ ...prev, [category]: value }));
  };

  const handleAlertMediumChange = (medium: keyof typeof alertMediums) => {
    setAlertMediums(prev => ({ ...prev, [medium]: !prev[medium] }));
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Configuration</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Manage risk thresholds, weights, and alert settings for the system
        </p>
      </div>

      <Tabs defaultValue="thresholds" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
          <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
          <TabsTrigger value="weights">Weights Configuration</TabsTrigger>
          <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="thresholds">
          <Card>
            <CardHeader>
              <CardTitle>Risk Score Thresholds</CardTitle>
              <CardDescription>
                Set the threshold values for automatic actions based on risk scores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bot" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  <TabsTrigger value="bot">Bot</TabsTrigger>
                  <TabsTrigger value="dumping">Dumping</TabsTrigger>
                  <TabsTrigger value="collusion">Collusion</TabsTrigger>
                  <TabsTrigger value="ghosting">Ghosting</TabsTrigger>
                  <TabsTrigger value="splash">Splash</TabsTrigger>
                  <TabsTrigger value="rta">RTA</TabsTrigger>
                </TabsList>

                {Object.entries(thresholds).map(([category, values]) => (
                  <TabsContent key={category} value={category} className="space-y-6">
                    <div className="grid gap-4">
                      {Object.entries(values).map(([type, value]) => (
                        <div key={type} className="space-y-2">
                          <Label className="capitalize">
                            {type.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              value={[value]}
                              onValueChange={(newValue) => handleThresholdChange(category, type, newValue[0].toString())}
                              min={0}
                              max={10}
                              step={0.1}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              value={value}
                              onChange={(e) => handleThresholdChange(category, type, e.target.value)}
                              className="w-20"
                              step={0.1}
                              min={0}
                              max={10}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button>Save Changes</Button>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weights">
          <Card>
            <CardHeader>
              <CardTitle>Category Score Weights</CardTitle>
              <CardDescription>
                Configure how much each sub-category contributes to the final category score.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bot" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  <TabsTrigger value="bot">Bot</TabsTrigger>
                  <TabsTrigger value="dumping">Dumping</TabsTrigger>
                  <TabsTrigger value="collusion">Collusion</TabsTrigger>
                  <TabsTrigger value="ghosting">Ghosting</TabsTrigger>
                  <TabsTrigger value="splash">Splash</TabsTrigger>
                  <TabsTrigger value="rta">RTA</TabsTrigger>
                </TabsList>

                {Object.entries(weights).map(([category, subScores]) => (
                  <TabsContent key={category} value={category}>
                    <div className="space-y-6">
                      {Object.entries(subScores).map(([subScore, weight]) => (
                        <div key={subScore} className="space-y-2">
                          <Label className="capitalize">
                            {subScore.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              value={[weight]}
                              onValueChange={(value) => handleWeightChange(category, subScore, value)}
                              min={0}
                              max={100}
                              step={5}
                              className="flex-1"
                            />
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={weight}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value) && value >= 0 && value <= 100) {
                                    handleWeightChange(category, subScore, [value]);
                                  }
                                }}
                                className="w-20"
                                step={5}
                                min={0}
                                max={100}
                              />
                              <span>%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Total weight: {Object.values(subScores).reduce((a, b) => a + b, 0)}%
                        </p>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>
                  Configure alert settings for dashboard users when average user scores exceed specified thresholds.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="grid gap-6">
                    <div>
                      <Label className="text-base font-medium">Dashboard User</Label>
                      <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger className="w-full max-w-md mt-2">
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {dashboardUsers.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Alert Thresholds</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Set the average score thresholds for each category that will trigger alerts.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(alertScores).map(([category, value]) => (
                          <div key={category} className="space-y-2">
                            <Label htmlFor={`alert-${category}`} className="capitalize">
                              {category} Score Average
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`alert-${category}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleAlertScoreChange(category, e.target.value)}
                                step="0.1"
                                min="0"
                                max="10"
                                className="w-32"
                              />
                              <span className="text-sm text-muted-foreground">/ 10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Alert Mediums</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Choose how you want to receive alerts when thresholds are exceeded.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 p-3 rounded-lg border">
                          <Switch
                            id="email"
                            checked={alertMediums.email}
                            onCheckedChange={() => handleAlertMediumChange('email')}
                          />
                          <Label htmlFor="email" className="flex-1">Email Notifications</Label>
                        </div>
                        <div className="flex flex-col space-y-2 p-3 rounded-lg border">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="sms"
                              checked={alertMediums.sms}
                              onCheckedChange={() => handleAlertMediumChange('sms')}
                            />
                            <Label htmlFor="sms" className="flex-1">SMS Notifications</Label>
                          </div>
                          {alertMediums.sms && (
                            <div className="mt-2">
                              <Input
                                type="tel"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Format: +1234567890
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border">
                          <Switch
                            id="teams"
                            checked={alertMediums.teams}
                            onCheckedChange={() => handleAlertMediumChange('teams')}
                          />
                          <Label htmlFor="teams" className="flex-1">Teams Channel</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button size="lg">Save Alert Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>
                  View the history of alert settings configured for dashboard users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Alert Mediums</TableHead>
                      <TableHead>Set At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertHistory.map((history) => (
                      <TableRow key={history.id}>
                        <TableCell>{history.userName}</TableCell>
                        <TableCell className="capitalize">{history.category}</TableCell>
                        <TableCell>{history.threshold}</TableCell>
                        <TableCell>{history.mediums.join(", ")}</TableCell>
                        <TableCell>{format(new Date(history.setAt), "MMM d, yyyy HH:mm")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuration; 