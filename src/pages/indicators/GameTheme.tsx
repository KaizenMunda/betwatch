import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui-custom/TablePagination";

const GameTheme = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const gameStats = {
    totalGames: 48,
    activeGames: 35,
    totalPlayers: 12567,
    averageRiskScore: 4.2,
    gameCategories: [
      {
        name: "Poker",
        players: 5234,
        riskScore: 6.8,
        activeUsers: 1245,
        suspiciousActivities: 89
      },
      {
        name: "Slots",
        players: 3456,
        riskScore: 3.5,
        activeUsers: 890,
        suspiciousActivities: 23
      },
      {
        name: "Blackjack",
        players: 2145,
        riskScore: 5.9,
        activeUsers: 567,
        suspiciousActivities: 45
      },
      {
        name: "Roulette",
        players: 1732,
        riskScore: 4.2,
        activeUsers: 432,
        suspiciousActivities: 28
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 7.5) return "bg-red-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Game Theme Indicators</h1>
        <div className="flex gap-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Games</CardTitle>
            <CardDescription>Active game types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gameStats.totalGames}</div>
            <p className="text-sm text-muted-foreground">
              {gameStats.activeGames} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Players</CardTitle>
            <CardDescription>Across all games</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gameStats.totalPlayers}</div>
            <p className="text-sm text-muted-foreground">+234 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Risk Score</CardTitle>
            <CardDescription>All game types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(gameStats.averageRiskScore)}`}>
              {gameStats.averageRiskScore.toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">-0.3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Risk Games</CardTitle>
            <CardDescription>Score {">"} 7.5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">2</div>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Game Analysis</CardTitle>
          <CardDescription>Detailed game statistics and risk assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Game Categories</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-green-50 hover:bg-green-100 text-green-600"
                >
                  Review
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-orange-50 hover:bg-orange-100 text-orange-600"
                >
                  Flag
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-red-50 hover:bg-red-100 text-red-600"
                >
                  Block
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game Type</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Active Users</TableHead>
                  <TableHead>Suspicious Activities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameStats.gameCategories.map((game) => (
                  <TableRow key={game.name}>
                    <TableCell className="font-medium">{game.name}</TableCell>
                    <TableCell>{game.players.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getScoreColor(game.riskScore)}`}>
                        {game.riskScore.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Progress
                        value={game.riskScore * 10}
                        className={getProgressColor(game.riskScore)}
                      />
                    </TableCell>
                    <TableCell>{game.activeUsers.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={game.suspiciousActivities > 50 ? "text-red-500" : "text-yellow-500"}>
                        {game.suspiciousActivities}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-center space-x-1 py-4">
              {[...Array(Math.ceil(gameStats.gameCategories.length / itemsPerPage))].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "" : "hover:bg-secondary"}
                >
                  {i + 1}
                </Button>
              ))}
              {Math.ceil(gameStats.gameCategories.length / itemsPerPage) > 5 && (
                <span className="px-2">...</span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
              <div className="space-y-4">
                {gameStats.gameCategories.map((game) => (
                  <div key={game.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{game.name}</span>
                      <span className={`font-bold ${getScoreColor(game.riskScore)}`}>
                        {game.riskScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(game.riskScore)}`}
                        style={{ width: `${(game.riskScore / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Player Distribution</h3>
              <div className="space-y-4">
                {gameStats.gameCategories.map((game) => (
                  <div key={game.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{game.name}</span>
                      <span className="text-muted-foreground">
                        {((game.players / gameStats.totalPlayers) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(game.players / gameStats.totalPlayers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameTheme; 