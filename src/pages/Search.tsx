import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { searchUsers } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/types/fraudModels";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim().length < 2) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate network delay
    setTimeout(() => {
      const searchResults = searchUsers(query);
      setResults(searchResults);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  // Helper to get status color
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

  // Helper to get score color
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-500";
    if (score >= 50) return "text-orange-500";
    if (score >= 30) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">User Search</h1>
            <p className="text-muted-foreground mt-1">Search for users to view fraud scores and take action</p>
          </div>
          
          {/* Search Bar */}
          <Card className="glassmorphism">
            <CardHeader className="pb-3">
              <CardTitle>Search Users</CardTitle>
              <CardDescription>
                Search by user name, email, or ID to view detailed fraud scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter user name, email, or ID..."
                    className="pl-10"
                    onKeyDown={handleKeyDown}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                </div>
                <Button onClick={handleSearch} disabled={isSearching || query.trim().length < 2}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Results */}
          {hasSearched && (
            <Card>
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  {isSearching
                    ? "Searching..."
                    : results.length > 0
                    ? `Found ${results.length} users matching "${query}"`
                    : `No users found matching "${query}"`}
                </CardDescription>
              </CardHeader>
              {results.length > 0 && (
                <CardContent>
                  <div className="space-y-4 animate-fade-in">
                    {results.map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <User size={18} />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground sm:ml-auto">
                          ID: {user.id}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <div className="text-xs text-muted-foreground">Last Active</div>
                            <div>{user.lastActive.toLocaleDateString()}</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </div>
                            
                            <div className={`font-semibold text-sm ${getScoreColor(user.fraudScore.value)}`}>
                              Score: {user.fraudScore.value.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
              
              {!isSearching && results.length === 0 && hasSearched && (
                <CardContent>
                  <div className="py-8 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <User size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No users found matching your search criteria</p>
                  </div>
                </CardContent>
              )}
              
              {!isSearching && results.length > 0 && (
                <CardFooter className="border-t bg-muted/20 flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Click on a user to view detailed fraud information
                  </p>
                  {results.length >= 10 && (
                    <p className="text-sm text-muted-foreground">
                      Showing first 10 results. Try a more specific search for better results.
                    </p>
                  )}
                </CardFooter>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
