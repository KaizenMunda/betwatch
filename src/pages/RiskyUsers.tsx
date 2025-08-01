import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmationDialog from "@/components/ui-custom/ConfirmationDialog";
import { ArrowUpDown, MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import WhitelistDialog from "@/components/ui-custom/WhitelistDialog";
import { TablePagination } from "@/components/ui-custom/TablePagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
  action: "block" | "flag" | "unblock" | "review" | null;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface WhitelistState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
}

const timeRanges = [
  { value: "week", label: "Current Week" },
  { value: "month", label: "Current Month" },
  { value: "quarter", label: "Current Quarter" },
  { value: "custom", label: "Custom Range" },
];

const RiskyUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("under-review");
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null,
    action: null,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const [timeRange, setTimeRange] = useState("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [whitelistDialog, setWhitelistDialog] = useState<WhitelistState>({
    isOpen: false,
    userId: null,
    userName: null,
  });
  const [commentsDialog, setCommentsDialog] = useState({
    isOpen: false,
    userId: null,
    userName: null,
    comments: ""
  });
  const [reviewDialog, setReviewDialog] = useState({
    isOpen: false,
    userId: null,
    userName: null,
  });

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

  const handleAction = (action: "block" | "flag", userId: string, userName: string) => {
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

  const handleClear = (userId: string, userName: string) => {
    setWhitelistDialog({
      isOpen: true,
      userId,
      userName,
    });
  };

  const handleWhitelistConfirm = (whitelist: boolean, notes: string) => {
    if (!whitelistDialog.userId) return;

    // In a real application, this would make an API call
    console.log(`Clear user:`, whitelistDialog.userId, {
      whitelist,
      notes,
    });
    
    setWhitelistDialog({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const closeWhitelistDialog = () => {
    setWhitelistDialog({
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

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleUnblock = (userId: string, userName: string) => {
    setConfirmation({
      isOpen: true,
      userId,
      userName,
      action: "unblock",
    });
  };

  const handleViewComments = (userId: string, userName: string) => {
    // Mock comments - in real app, fetch from API
    const mockComments = `User blocked on ${format(new Date(), 'MMM d, yyyy')} for suspicious activity.\n\nDetected pattern of coordinated play with user ID 456.\n\nMultiple accounts sharing same IP address and device fingerprint.\n\nRecommended for permanent suspension after manual review.`;
    
    setCommentsDialog({
      isOpen: true,
      userId,
      userName,
      comments: mockComments
    });
  };

  const handleReview = (userId: string, userName: string) => {
    setReviewDialog({
      isOpen: true,
      userId,
      userName,
    });
  };

  const executeUnblock = () => {
    console.log("Unblocking user:", confirmation.userId);
    // Add your unblock logic here
    closeConfirmation();
  };

  const executeReview = () => {
    console.log("Reviewing user:", reviewDialog.userId);
    // Add your review logic here
    setReviewDialog({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const closeCommentsDialog = () => {
    setCommentsDialog({
      isOpen: false,
      userId: null,
      userName: null,
      comments: ""
    });
  };

  const closeReviewDialog = () => {
    setReviewDialog({
      isOpen: false,
      userId: null,
      userName: null,
    });
  };

  const UserTable = ({ users, tabType }: { users: typeof mockUsers.underReview, tabType: 'under-review' | 'flagged' | 'blocked' }) => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const sortedUsers = sortConfig.key 
      ? sortData(users, sortConfig.key, sortConfig.direction)
      : users;
    
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

    const renderActions = (tabType: string, user: any) => {
      switch (tabType) {
        case 'under-review':
          return (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-green-50 hover:bg-green-100 text-green-600"
                onClick={() => handleClear(user.id, user.username)}
              >
                Clear
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-orange-50 hover:bg-orange-100 text-orange-600"
                onClick={() => handleAction("flag", user.id, user.username)}
              >
                Flag
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-red-50 hover:bg-red-100 text-red-600"
                onClick={() => handleAction("block", user.id, user.username)}
              >
                Block
              </Button>
            </div>
          );
        case 'flagged':
          return (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-green-50 hover:bg-green-100 text-green-600"
                onClick={() => handleClear(user.id, user.username)}
              >
                Clear
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                onClick={() => handleReview(user.id, user.username)}
              >
                Review
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-red-50 hover:bg-red-100 text-red-600"
                onClick={() => handleAction("block", user.id, user.username)}
              >
                Block
              </Button>
            </div>
          );
        case 'blocked':
          return (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-green-50 hover:bg-green-100 text-green-600"
                onClick={() => handleUnblock(user.id, user.username)}
              >
                Unblock
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                onClick={() => handleViewComments(user.id, user.username)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                View Comments
              </Button>
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
              <SortableHeader column="username" label="User" />
              <SortableHeader column="riskScore" label="Risk Score" />
              <SortableHeader column="riskCategory" label="Risk Category" />
              <SortableHeader column="lastActive" label="Last Activity" />
              <SortableHeader column="location" label="Location" />
              <SortableHeader column="since" label="Active Since (days)" />
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="space-y-1">
                    <a 
                      href={`/users/${user.id}`} 
                      className="text-blue-600 hover:underline block"
                    >
                      {user.username}
                    </a>
                    <a 
                      href={`/users/${user.id}`} 
                      className="text-sm text-gray-500 hover:underline block"
                    >
                      ID: {user.id}
                    </a>
                  </div>
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
                <TableCell>{renderActions(tabType, user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          currentPage={currentPage}
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">High Risk Users</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Under Review</CardTitle>
            <CardDescription>Cases being investigated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{mockUsers.underReview.length}</div>
            <p className="text-sm text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Users</CardTitle>
            <CardDescription>High risk users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{mockUsers.flagged.length}</div>
            <p className="text-sm text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blocked Users</CardTitle>
            <CardDescription>Access denied</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{mockUsers.blocked.length}</div>
            <p className="text-sm text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>All flagged & blocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {((mockUsers.flagged.reduce((acc, user) => acc + user.riskScore, 0) + 
                 mockUsers.blocked.reduce((acc, user) => acc + user.riskScore, 0)) / 
                (mockUsers.flagged.length + mockUsers.blocked.length)).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">+0.4 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>List of High Risk Users</CardTitle>
            <CardDescription>Users with risk score {">"} category defined thresholds</CardDescription>
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
          <Tabs defaultValue="under-review" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Users</TabsTrigger>
                <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="under-review">
              <div className="border rounded-lg p-4">
                <UserTable users={mockUsers.underReview} tabType="under-review" />
              </div>
            </TabsContent>
            <TabsContent value="flagged">
              <div className="border rounded-lg p-4">
                <UserTable users={mockUsers.flagged} tabType="flagged" />
              </div>
            </TabsContent>
            <TabsContent value="blocked">
              <div className="border rounded-lg p-4">
                <UserTable users={mockUsers.blocked} tabType="blocked" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Unblock Confirmation Dialog */}
      {confirmation.action === "unblock" && (
        <ConfirmationDialog
          isOpen={confirmation.isOpen}
          onClose={closeConfirmation}
          onConfirm={executeUnblock}
          title="Unblock User"
          description={`Are you sure you want to unblock ${confirmation.userName}? This will restore their access to the platform.`}
          actionLabel="Unblock"
          variant="default"
          showComment={true}
        />
      )}

      {/* Other Confirmation Dialog */}
      {confirmation.action !== "unblock" && (
        <ConfirmationDialog
          isOpen={confirmation.isOpen}
          onClose={closeConfirmation}
          onConfirm={executeAction}
          title={
            confirmation.action === "block"
              ? "Block User"
              : "Flag User"
          }
          description={
            confirmation.action === "block"
              ? `Are you sure you want to block ${confirmation.userName}? This will prevent them from accessing the platform.`
              : `Are you sure you want to flag ${confirmation.userName} for suspicious activity?`
          }
          actionLabel={
            confirmation.action === "block"
              ? "Block"
              : "Flag"
          }
          variant="destructive"
          showComment={true}
        />
      )}

      {/* Comments Dialog */}
      <Dialog open={commentsDialog.isOpen} onOpenChange={closeCommentsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Comments - {commentsDialog.userName}</DialogTitle>
            <DialogDescription>
              Comments and notes related to this user's actions and blocking history
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="p-4 bg-muted rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{commentsDialog.comments}</pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.isOpen} onOpenChange={closeReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review User - {reviewDialog.userName}</DialogTitle>
            <DialogDescription>
              Mark this user for detailed manual review
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              This action will move the user to the review queue for detailed analysis by the risk team.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeReviewDialog}>
                Cancel
              </Button>
              <Button onClick={executeReview} className="bg-blue-600 hover:bg-blue-700">
                Mark for Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Whitelist Dialog */}
      <WhitelistDialog
        isOpen={whitelistDialog.isOpen}
        onClose={closeWhitelistDialog}
        onConfirm={handleWhitelistConfirm}
        userName={whitelistDialog.userName || ""}
      />
    </div>
  );
};

export default RiskyUsers; 