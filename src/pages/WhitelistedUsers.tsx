import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";

interface ConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const WhitelistedUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const itemsPerPage = 10;

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  // Mock data for whitelisted users
  const mockWhitelistedUsers = [
    {
      id: 1,
      username: "john_doe",
      riskScore: 2.5,
      riskCategory: "Bot Detection",
      lastActive: "2 hours ago",
      location: "New York, US",
      since: 30,
      whitelistedOn: "Jan 15, 2024",
      whitelistedBy: "admin@example.com",
      notes: "Verified legitimate user"
    },
    {
      id: 2,
      username: "jane_smith",
      riskScore: 1.8,
      riskCategory: "RTA",
      lastActive: "5 hours ago",
      location: "London, UK",
      since: 45,
      whitelistedOn: "Jan 10, 2024",
      whitelistedBy: "admin@example.com",
      notes: "VIP customer"
    },
    // Add more mock users as needed
  ];

  const handleRemoveFromWhitelist = (userId: string, userName: string) => {
    setConfirmation({
      isOpen: true,
      userId,
      userName,
    });
  };

  const executeAction = () => {
    if (!confirmation.userId) return;

    // In a real application, this would make an API call
    console.log(`Remove from whitelist:`, confirmation.userId);
    
    setConfirmation({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const sortData = (data: any[], key: string, direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const totalPages = Math.ceil(mockWhitelistedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const sortedUsers = sortConfig.key 
    ? sortData(mockWhitelistedUsers, sortConfig.key, sortConfig.direction)
    : mockWhitelistedUsers;
  
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  const SortableHeader = ({ column, label }: { column: string, label: string }) => (
    <TableHead>
      <button
        className="flex items-center gap-1 hover:text-gray-700"
        onClick={() => handleSort(column)}
      >
        {label}
        <ArrowUpDown className="h-4 w-4" />
      </button>
    </TableHead>
  );

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Whitelisted Users</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Whitelisted</CardTitle>
            <CardDescription>All whitelisted users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{mockWhitelistedUsers.length}</div>
            <p className="text-sm text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>Current risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {(mockWhitelistedUsers.reduce((acc, user) => acc + user.riskScore, 0) / 
                mockWhitelistedUsers.length).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">-0.3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">8</div>
            <p className="text-sm text-muted-foreground">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Days Active</CardTitle>
            <CardDescription>Since whitelisting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">
              {(mockWhitelistedUsers.reduce((acc, user) => acc + user.since, 0) / 
                mockWhitelistedUsers.length).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Whitelisted Users List</CardTitle>
            <CardDescription>Users currently whitelisted from risk checks</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "LLL dd, y")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={selectedDate}
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
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
                  <SortableHeader column="id" label="User ID" />
                  <SortableHeader column="username" label="Username" />
                  <SortableHeader column="riskScore" label="Risk Score" />
                  <SortableHeader column="riskCategory" label="Risk Category" />
                  <SortableHeader column="lastActive" label="Last Activity" />
                  <SortableHeader column="location" label="Location" />
                  <SortableHeader column="since" label="Active Since (days)" />
                  <SortableHeader column="whitelistedOn" label="Whitelisted On" />
                  <SortableHeader column="whitelistedBy" label="Whitelisted By" />
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
                    <TableCell>{user.whitelistedOn}</TableCell>
                    <TableCell>{user.whitelistedBy}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-red-50 hover:bg-red-100 text-red-600"
                        onClick={() => handleRemoveFromWhitelist(user.id, user.username)}
                      >
                        Remove from Whitelist
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, mockWhitelistedUsers.length)} of {mockWhitelistedUsers.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-2">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </Button>
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
        title="Remove from Whitelist"
        description={`Are you sure you want to remove ${confirmation.userName} from the whitelist? This will subject them to regular risk checks again.`}
        actionLabel="Remove"
        variant="destructive"
      />
    </div>
  );
};

export default WhitelistedUsers; 