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

interface CardThemeData {
  date: Date;
  username: string;
  userId: string;
  deviceType: string;
  botScore: number;
  selectedTheme: string;
}

// Mock data for card theme selections
const mockThemeData = [
  {
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    username: "player123",
    userId: "1",
    deviceType: "Mobile",
    botScore: 2.5,
    selectedTheme: "classic"
  },
  {
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    username: "gamer456",
    userId: "1",
    deviceType: "Desktop",
    botScore: 1.8,
    selectedTheme: "minimal"
  },
  {
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    username: "user789",
    userId: "1",
    deviceType: "Mobile",
    botScore: 3.2,
    selectedTheme: "4 color"
  },
  {
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    username: "pro123",
    userId: "1",
    deviceType: "Desktop",
    botScore: 4.5,
    selectedTheme: "full colour"
  }
];

const CardTheme = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const itemsPerPage = 10;

  // Filter data based on search query and selected date
  const filteredData = mockThemeData.filter(item => {
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

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "classic":
        return "text-blue-600";
      case "minimal":
        return "text-gray-600";
      case "4 color":
        return "text-purple-600";
      case "full colour":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Card Theme Analysis</h1>
          <p className="text-muted-foreground">
            Track user theme selections and associated bot scores
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme Selection History</CardTitle>
          <CardDescription>
            View and analyze user theme preferences
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
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Device Type</TableHead>
                  <TableHead>Theme</TableHead>
                  <TableHead>Risk Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(item.date, 'MMM d, yyyy HH:mm')}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link 
                          to="/users/1"
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {item.username}
                        </Link>
                        <span className="text-sm text-gray-500">ID: {item.userId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={item.deviceType === "Mobile" ? "text-blue-600" : "text-purple-600"}>
                        {item.deviceType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getThemeColor(item.selectedTheme)}>
                        {item.selectedTheme}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={
                          item.botScore >= 7.5 ? "text-red-500" :
                          item.botScore >= 5 ? "text-yellow-500" :
                          "text-green-500"
                        }>
                          {item.botScore.toFixed(1)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardTheme; 