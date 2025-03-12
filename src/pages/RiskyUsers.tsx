import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RiskyUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  const mockUsers = {
    underReview: [
      {
        id: 1,
        username: "rajesh123",
        riskScore: 8.5,
        riskCategory: "Bot Detection",
        lastActive: "2 hours ago",
        location: "Mumbai, IN",
        since: 3,
      },
      {
        id: 2,
        username: "priya456",
        riskScore: 7.8,
        riskCategory: "RTA",
        lastActive: "5 hours ago",
        location: "Delhi, IN",
        since: 5,
      },
      {
        id: 7,
        username: "vikram789",
        riskScore: 8.2,
        riskCategory: "Bot Detection",
        lastActive: "1 hour ago",
        location: "Kolkata, IN",
        since: 2,
      },
      {
        id: 8,
        username: "anita234",
        riskScore: 7.9,
        riskCategory: "Dumping",
        lastActive: "3 hours ago",
        location: "Pune, IN",
        since: 4,
      },
      {
        id: 9,
        username: "rohit567",
        riskScore: 8.7,
        riskCategory: "RTA",
        lastActive: "4 hours ago",
        location: "Chennai, IN",
        since: 1,
      },
      {
        id: 10,
        username: "meera890",
        riskScore: 8.1,
        riskCategory: "Ghosting",
        lastActive: "6 hours ago",
        location: "Bangalore, IN",
        since: 6,
      },
      {
        id: 11,
        username: "arjun123",
        riskScore: 8.4,
        riskCategory: "Bot Detection",
        lastActive: "1 hour ago",
        location: "Hyderabad, IN",
        since: 3,
      },
      {
        id: 12,
        username: "kavita456",
        riskScore: 7.7,
        riskCategory: "Dumping",
        lastActive: "2 hours ago",
        location: "Ahmedabad, IN",
        since: 4,
      },
      {
        id: 13,
        username: "rahul789",
        riskScore: 8.3,
        riskCategory: "RTA",
        lastActive: "3 hours ago",
        location: "Jaipur, IN",
        since: 2,
      },
      {
        id: 14,
        username: "pooja234",
        riskScore: 8.0,
        riskCategory: "Ghosting",
        lastActive: "5 hours ago",
        location: "Lucknow, IN",
        since: 5,
      }
    ],
    flagged: [
      {
        id: 3,
        username: "amit789",
        riskScore: 9.2,
        riskCategory: "Dumping",
        lastActive: "1 hour ago",
        location: "Bangalore, IN",
        since: 7,
      },
      {
        id: 4,
        username: "neha234",
        riskScore: 8.9,
        riskCategory: "Ghosting",
        lastActive: "3 hours ago",
        location: "Chennai, IN",
        since: 2,
      },
      {
        id: 15,
        username: "suresh567",
        riskScore: 9.1,
        riskCategory: "Bot Detection",
        lastActive: "2 hours ago",
        location: "Mumbai, IN",
        since: 5,
      },
      {
        id: 16,
        username: "divya890",
        riskScore: 8.8,
        riskCategory: "RTA",
        lastActive: "4 hours ago",
        location: "Delhi, IN",
        since: 3,
      },
      {
        id: 17,
        username: "karan123",
        riskScore: 9.3,
        riskCategory: "Dumping",
        lastActive: "1 hour ago",
        location: "Kolkata, IN",
        since: 6,
      },
      {
        id: 18,
        username: "anjali456",
        riskScore: 8.7,
        riskCategory: "Ghosting",
        lastActive: "3 hours ago",
        location: "Pune, IN",
        since: 4,
      },
      {
        id: 19,
        username: "raj789",
        riskScore: 9.0,
        riskCategory: "Bot Detection",
        lastActive: "2 hours ago",
        location: "Hyderabad, IN",
        since: 8,
      },
      {
        id: 20,
        username: "sonia234",
        riskScore: 8.6,
        riskCategory: "RTA",
        lastActive: "5 hours ago",
        location: "Bangalore, IN",
        since: 3,
      },
      {
        id: 21,
        username: "arun567",
        riskScore: 9.4,
        riskCategory: "Dumping",
        lastActive: "1 hour ago",
        location: "Chennai, IN",
        since: 7,
      },
      {
        id: 22,
        username: "maya890",
        riskScore: 8.5,
        riskCategory: "Ghosting",
        lastActive: "4 hours ago",
        location: "Mumbai, IN",
        since: 5,
      }
    ],
    blocked: [
      {
        id: 5,
        username: "rahul567",
        riskScore: 9.8,
        riskCategory: "Bot Detection",
        lastActive: "1 day ago",
        location: "Hyderabad, IN",
        since: 15,
      },
      {
        id: 6,
        username: "sneha890",
        riskScore: 9.5,
        riskCategory: "RTA",
        lastActive: "2 days ago",
        location: "Pune, IN",
        since: 10,
      },
      {
        id: 23,
        username: "varun123",
        riskScore: 9.7,
        riskCategory: "Dumping",
        lastActive: "3 days ago",
        location: "Delhi, IN",
        since: 12,
      },
      {
        id: 24,
        username: "ritu456",
        riskScore: 9.6,
        riskCategory: "Ghosting",
        lastActive: "1 day ago",
        location: "Bangalore, IN",
        since: 8,
      },
      {
        id: 25,
        username: "nikhil789",
        riskScore: 9.9,
        riskCategory: "Bot Detection",
        lastActive: "2 days ago",
        location: "Mumbai, IN",
        since: 20,
      },
      {
        id: 26,
        username: "preeti234",
        riskScore: 9.4,
        riskCategory: "RTA",
        lastActive: "4 days ago",
        location: "Chennai, IN",
        since: 14,
      },
      {
        id: 27,
        username: "mohit567",
        riskScore: 9.8,
        riskCategory: "Dumping",
        lastActive: "1 day ago",
        location: "Kolkata, IN",
        since: 18,
      },
      {
        id: 28,
        username: "swati890",
        riskScore: 9.3,
        riskCategory: "Ghosting",
        lastActive: "3 days ago",
        location: "Hyderabad, IN",
        since: 11,
      },
      {
        id: 29,
        username: "deepak123",
        riskScore: 9.7,
        riskCategory: "Bot Detection",
        lastActive: "2 days ago",
        location: "Pune, IN",
        since: 16,
      },
      {
        id: 30,
        username: "tanvi456",
        riskScore: 9.5,
        riskCategory: "RTA",
        lastActive: "5 days ago",
        location: "Delhi, IN",
        since: 13,
      }
    ],
  };

  const UserTable = ({ users, tabType }: { users: typeof mockUsers.underReview, tabType: 'under-review' | 'flagged' | 'blocked' }) => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const renderActions = (tabType: string) => {
      switch (tabType) {
        case 'under-review':
          return (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 text-green-600">Clear</Button>
              <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100 text-red-600">Flag</Button>
              <Button variant="outline" size="sm" className="bg-gray-50 hover:bg-gray-100 text-gray-600">Block</Button>
            </div>
          );
        case 'flagged':
          return (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 text-green-600">Clear</Button>
              <Button variant="outline" size="sm" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-600">Review</Button>
              <Button variant="outline" size="sm" className="bg-gray-50 hover:bg-gray-100 text-gray-600">Block</Button>
            </div>
          );
        case 'blocked':
          return (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 text-green-600">Unblock</Button>
              <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-600">View Comments</Button>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by username or ID..."
            className="max-w-sm"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Risk Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bot">Bot Detection</SelectItem>
              <SelectItem value="ghosting">Ghosting</SelectItem>
              <SelectItem value="rta">RTA</SelectItem>
              <SelectItem value="dumping">Dumping</SelectItem>
            </SelectContent>
          </Select>
          <Button>Filter</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Risk Category</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Since (days)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <a 
                    href={`/users/${user.id}`} 
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {user.username}
                  </a>
                </TableCell>
                <TableCell>
                  <span className={`font-bold ${getScoreColor(user.riskScore)}`}>
                    {user.riskScore.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell>{user.riskCategory}</TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.since}</TableCell>
                <TableCell>{renderActions(tabType)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Risky Users</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Flagged Users</CardTitle>
            <CardDescription>High risk users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">127</div>
            <p className="text-sm text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Under Review</CardTitle>
            <CardDescription>Cases being investigated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">45</div>
            <p className="text-sm text-muted-foreground">8 new cases today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Of flagged users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">8.1</div>
            <p className="text-sm text-muted-foreground">+0.3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Required</CardTitle>
            <CardDescription>Pending reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <p className="text-sm text-muted-foreground">High priority cases</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>High Risk Users</CardTitle>
          <CardDescription>Users with risk score {">"} 7.5</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="under-review" className="space-y-4">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Users</TabsTrigger>
                <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="under-review">
              <UserTable users={mockUsers.underReview} tabType="under-review" />
            </TabsContent>
            <TabsContent value="flagged">
              <UserTable users={mockUsers.flagged} tabType="flagged" />
            </TabsContent>
            <TabsContent value="blocked">
              <UserTable users={mockUsers.blocked} tabType="blocked" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskyUsers; 