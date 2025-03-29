import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Mock data for screen sharing sessions
const mockScreenShareData = [
  {
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    username: "player123",
    userId: "1",
    softwareName: "TeamViewer"
  },
  {
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    username: "gamer456",
    userId: "1",
    softwareName: "AnyDesk"
  },
  {
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    username: "user789",
    userId: "1",
    softwareName: "Chrome Remote Desktop"
  },
  {
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    username: "pro123",
    userId: "1",
    softwareName: "VNC Viewer"
  },
];

const ScreenShare = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const itemsPerPage = 10;

  // Filter data based on search query and selected date
  const filteredData = mockScreenShareData.filter(item => {
    const matchesSearch = item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userId.includes(searchQuery);
    const matchesDate = item.date.toDateString() === selectedDate.toDateString();
    return matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Interrupted":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const columns = [
    {
      header: "Date",
      accessor: "date",
      render: (value: Date) => format(value, 'MMM d, yyyy HH:mm')
    },
    {
      header: "User",
      accessor: "username",
      className: "border-r-2 border-gray-200",
      render: (value: string, user: any) => (
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
            ID: {user.userId}
          </a>
        </div>
      )
    },
    {
      header: "Software Name",
      accessor: "softwareName",
      render: (value: string) => value
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Screen Share Analysis</h1>
          <p className="text-muted-foreground">
            Monitor screen sharing sessions and associated risk scores
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screen Share History</CardTitle>
          <CardDescription>
            View and analyze screen sharing sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username or user ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button type="submit">Search</Button>
            </div>
          </form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex}>
                        {column.render ? column.render(item[column.accessor], item) : item[column.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenShare; 