import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { format } from "date-fns";

// Mock data for game theme selections
const mockThemeData = [
  {
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    username: "john_doe",
    userId: "12345",
    deviceType: "Mobile",
    botScore: 2.5,
    selectedTheme: "classic"
  },
  {
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    username: "jane_smith",
    userId: "12346",
    deviceType: "Desktop",
    botScore: 1.8,
    selectedTheme: "minimal"
  },
  {
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    username: "mike_wilson",
    userId: "12347",
    deviceType: "Mobile",
    botScore: 3.2,
    selectedTheme: "4 color"
  },
  {
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    username: "sarah_jones",
    userId: "12348",
    deviceType: "Desktop",
    botScore: 4.5,
    selectedTheme: "full colour"
  },
  // Add more mock data as needed
];

const GameTheme = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search query
  const filteredData = mockThemeData.filter(item => 
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.userId.includes(searchQuery)
  );

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
          <h1 className="text-3xl font-bold">Game Theme Analysis</h1>
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
              <Button type="submit">Search</Button>
            </div>
          </form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Device Type</TableHead>
                  <TableHead>Bot Score</TableHead>
                  <TableHead>Selected Theme</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(item.date, 'MMM d, yyyy HH:mm')}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>
                      <span className={item.deviceType === "Mobile" ? "text-blue-600" : "text-purple-600"}>
                        {item.deviceType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={item.botScore >= 7.5 ? "text-red-500" : 
                        item.botScore >= 5 ? "text-yellow-500" : "text-green-500"}>
                        {item.botScore.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getThemeColor(item.selectedTheme)}>
                        {item.selectedTheme}
                      </span>
                    </TableCell>
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

export default GameTheme; 