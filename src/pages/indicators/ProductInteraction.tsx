import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductInteractionData {
  eventName: string;
  gameType: "cash" | "tournament";
  platform: "mobile" | "desktop";
  eventCount: number;
  handsPlayed: number;
  interactionScore: number;
}

// Mock data for product interactions
const mockInteractionData: ProductInteractionData[] = [
  {
    eventName: "Top Up",
    gameType: "cash",
    platform: "mobile",
    eventCount: 45,
    handsPlayed: 1200,
    interactionScore: 7.5
  },
  {
    eventName: "Emoji",
    gameType: "cash",
    platform: "desktop",
    eventCount: 320,
    handsPlayed: 1200,
    interactionScore: 4.2
  },
  {
    eventName: "Throwables",
    gameType: "cash",
    platform: "mobile",
    eventCount: 78,
    handsPlayed: 1200,
    interactionScore: 3.8
  },
  {
    eventName: "Colour Tagging",
    gameType: "cash",
    platform: "desktop",
    eventCount: 156,
    handsPlayed: 1200,
    interactionScore: 5.1
  },
  {
    eventName: "Notes",
    gameType: "cash",
    platform: "mobile",
    eventCount: 89,
    handsPlayed: 1200,
    interactionScore: 6.2
  },
  {
    eventName: "Straddle",
    gameType: "cash",
    platform: "desktop",
    eventCount: 34,
    handsPlayed: 1200,
    interactionScore: 4.8
  },
  {
    eventName: "Rabbit",
    gameType: "cash",
    platform: "mobile",
    eventCount: 67,
    handsPlayed: 1200,
    interactionScore: 3.9
  },
  {
    eventName: "Leaderboard",
    gameType: "cash",
    platform: "desktop",
    eventCount: 234,
    handsPlayed: 1200,
    interactionScore: 5.6
  },
  {
    eventName: "Table Menu",
    gameType: "cash",
    platform: "mobile",
    eventCount: 178,
    handsPlayed: 1200,
    interactionScore: 4.3
  },
  {
    eventName: "Custom Bet Size Event Name",
    gameType: "cash",
    platform: "desktop",
    eventCount: 45,
    handsPlayed: 1200,
    interactionScore: 6.7
  },
  {
    eventName: "Stats Panel",
    gameType: "cash",
    platform: "mobile",
    eventCount: 289,
    handsPlayed: 1200,
    interactionScore: 7.2
  },
  {
    eventName: "Auto Top Up",
    gameType: "cash",
    platform: "desktop",
    eventCount: 23,
    handsPlayed: 1200,
    interactionScore: 5.4
  },
  {
    eventName: "Buy In Preference",
    gameType: "cash",
    platform: "mobile",
    eventCount: 56,
    handsPlayed: 1200,
    interactionScore: 4.9
  },
  {
    eventName: "Table Theme Changes",
    gameType: "cash",
    platform: "desktop",
    eventCount: 12,
    handsPlayed: 1200,
    interactionScore: 3.5
  },
  {
    eventName: "Avatar",
    gameType: "cash",
    platform: "mobile",
    eventCount: 8,
    handsPlayed: 1200,
    interactionScore: 2.8
  }
];

const ProductInteraction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [playerId, setPlayerId] = useState("12345"); // Current user's ID
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedGameType, setSelectedGameType] = useState<"cash" | "tournament">("cash");
  const [selectedPlatform, setSelectedPlatform] = useState<"mobile" | "desktop">("mobile");
  const itemsPerPage = 10;

  // Calculate max event count per 1000 hands for each event
  const maxEventCountsPerThousand = mockInteractionData.reduce((acc, item) => {
    const countPerThousand = (item.eventCount / item.handsPlayed) * 1000;
    if (!acc[item.eventName] || countPerThousand > acc[item.eventName]) {
      acc[item.eventName] = countPerThousand;
    }
    return acc;
  }, {} as Record<string, number>);

  // Filter data based on selected game type and platform
  const filteredData = mockInteractionData.filter(
    item => item.gameType === selectedGameType && item.platform === selectedPlatform
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePlayerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would fetch data for the new player ID
    console.log("Searching for player:", playerId);
  };

  const columns = [
    {
      header: "Event Name",
      accessor: "eventName",
      render: (value: string) => value
    },
    {
      header: "Event Count",
      accessor: "eventCount",
      render: (value: number) => value.toLocaleString()
    },
    {
      header: "Event Count / 1000 hands",
      accessor: "handsPlayed",
      render: (value: number, item: ProductInteractionData) => 
        ((item.eventCount / value) * 1000).toFixed(2)
    },
    {
      header: "High Usage Percentile",
      accessor: "interactionScore",
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium",
            value >= 7 ? "text-red-500" :
            value >= 5 ? "text-yellow-500" :
            "text-green-500"
          )}>
            {(value * 10).toFixed(2)}%
          </span>
        </div>
      )
    },
    {
      header: "Max Event Count / 1000 hands (across system)",
      accessor: "eventName",
      render: (value: string) => maxEventCountsPerThousand[value].toFixed(2)
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Interaction Analysis</h1>
          <p className="text-muted-foreground">
            Analyze user's interaction with product features
          </p>
        </div>
      </div>

      <form onSubmit={handlePlayerSearch} className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter player ID..."
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit">Search Player</Button>
      </form>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Product Interaction Details</CardTitle>
              <CardDescription>
                View and analyze feature usage patterns
              </CardDescription>
            </div>
            <div className="flex items-start gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Product Interaction Score</div>
                <div className={cn(
                  "text-2xl font-bold text-right",
                  8.2 >= 7 ? "text-red-500" :
                  8.2 >= 5 ? "text-yellow-500" :
                  "text-green-500"
                )}>
                  8.2
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">player123</div>
                <div className="text-sm text-muted-foreground">ID: 12345</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex gap-4">
              <Select
                value={selectedGameType}
                onValueChange={(value: "cash" | "tournament") => {
                  setSelectedGameType(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select game type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Games</SelectItem>
                  <SelectItem value="tournament">Tournaments</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedPlatform}
                onValueChange={(value: "mobile" | "desktop") => {
                  setSelectedPlatform(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

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
                        {column.render(item[column.accessor], item)}
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
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
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

export default ProductInteraction; 