import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const mockSearchResults = [
    {
      id: 1,
      username: "rajesh123",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      status: "Active",
      lastActive: "2 hours ago",
      location: "Mumbai, IN",
    },
    {
      id: 2,
      username: "priya456",
      name: "Priya Singh",
      email: "priya@example.com",
      status: "Active",
      lastActive: "5 hours ago",
      location: "Delhi, IN",
    },
    {
      id: 3,
      username: "amit789",
      name: "Amit Patel",
      email: "amit@example.com",
      status: "Flagged",
      lastActive: "1 day ago",
      location: "Bangalore, IN",
    },
    {
      id: 4,
      username: "neha321",
      name: "Neha Sharma",
      email: "neha@example.com",
      status: "Blocked",
      lastActive: "3 days ago",
      location: "Chennai, IN",
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // In a real application, this would make an API call
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'flagged':
        return 'text-orange-600';
      case 'blocked':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">User Search</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search by username, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="max-w-xl"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <SearchIcon className="h-4 w-4 mr-2" />
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSearchResults.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <a 
                        onClick={() => navigate(`/users/${user.id}`)}
                        className="text-blue-600 hover:underline block"
                      >
                        {user.username}
                      </a>
                      <a 
                        onClick={() => navigate(`/users/${user.id}`)}
                        className="text-sm text-gray-500 hover:underline block"
                      >
                        ID: {user.id}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className={getStatusColor(user.status)}>{user.status}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
