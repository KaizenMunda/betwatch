import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";

// Mock data for risky sessions
const mockSessions = [
  {
    id: "1",
    username: "john_doe",
    userId: "12345",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    duration: "1 hour",
    handsPlayed: 150,
    winRate: -2.5,
    evWinRate: -1.8,
    riskScore: 8.5,
    riskCategory: "Bot",
    suspiciousPatterns: ["Rapid Betting", "Pattern Recognition"],
    location: "New York, US",
    deviceType: "Desktop"
  },
  {
    id: "2",
    username: "jane_smith",
    userId: "12346",
    startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    duration: "1 hour",
    handsPlayed: 120,
    winRate: -1.8,
    evWinRate: -0.5,
    riskScore: 7.8,
    riskCategory: "Collusion",
    suspiciousPatterns: ["Table Occupancy", "Win Distribution"],
    location: "London, UK",
    deviceType: "Mobile"
  },
  {
    id: "3",
    username: "mike_wilson",
    userId: "12347",
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    duration: "1 hour",
    handsPlayed: 180,
    winRate: -3.2,
    evWinRate: -2.5,
    riskScore: 9.0,
    riskCategory: "RTA",
    suspiciousPatterns: ["Timing Analysis", "Pattern Recognition"],
    location: "Toronto, CA",
    deviceType: "Desktop"
  }
];

const RiskyUserSessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskCategory, setRiskCategory] = useState("all");
  const [deviceType, setDeviceType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date()
  });

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = 
      session.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.userId.includes(searchQuery);
    const matchesRiskCategory = riskCategory === "all" || session.riskCategory === riskCategory;
    const matchesDeviceType = deviceType === "all" || session.deviceType === deviceType;
    const matchesDateRange = 
      session.startTime >= dateRange.from &&
      session.startTime <= dateRange.to;

    return matchesSearch && matchesRiskCategory && matchesDeviceType && matchesDateRange;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Risky User Sessions</h1>
          <p className="text-muted-foreground">
            Monitor and analyze suspicious user sessions
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Analysis</CardTitle>
          <CardDescription>
            Overview of risky sessions and patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Total Risky Sessions</div>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Average Risk Score</div>
              <div className="text-3xl font-bold text-red-500">8.2</div>
              <p className="text-sm text-muted-foreground">+0.5 from last week</p>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Most Common Risk</div>
              <div className="text-3xl font-bold">Bot</div>
              <p className="text-sm text-muted-foreground">45% of sessions</p>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Average Session Length</div>
              <div className="text-3xl font-bold">1.2h</div>
              <p className="text-sm text-muted-foreground">-0.3h from last week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>
            Detailed view of suspicious user sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search by username or user ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={riskCategory} onValueChange={setRiskCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Risk Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Bot">Bot</SelectItem>
                  <SelectItem value="Collusion">Collusion</SelectItem>
                  <SelectItem value="RTA">RTA</SelectItem>
                  <SelectItem value="Ghosting">Ghosting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={deviceType} onValueChange={setDeviceType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Device Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="range"
                    defaultMonth={new Date()}
                    numberOfMonths={2}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Hands</TableHead>
                <TableHead>Win Rate</TableHead>
                <TableHead>EV Win Rate</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Risk Category</TableHead>
                <TableHead>Patterns</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.username}</TableCell>
                  <TableCell>{session.userId}</TableCell>
                  <TableCell>{format(session.startTime, 'MMM d, yyyy HH:mm')}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.handsPlayed}</TableCell>
                  <TableCell>
                    <span className={session.winRate >= 0 ? "text-green-500" : "text-red-500"}>
                      {session.winRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={session.evWinRate >= 0 ? "text-green-500" : "text-red-500"}>
                      {session.evWinRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={session.riskScore >= 8.5 ? "destructive" : "secondary"}>
                      {session.riskScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{session.riskCategory}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {session.suspiciousPatterns.map((pattern, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {pattern}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.deviceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskyUserSessions; 