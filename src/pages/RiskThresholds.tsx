import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RiskThresholds = () => {
  const thresholdCategories = [
    {
      name: "Bot Detection",
      thresholds: [
        {
          name: "Rapid Betting",
          currentValue: "5 seconds",
          proposedValue: "3 seconds",
          impact: "High",
          status: "Review"
        },
        {
          name: "Pattern Recognition",
          currentValue: "85%",
          proposedValue: "90%",
          impact: "High",
          status: "Active"
        },
        {
          name: "Session Duration",
          currentValue: "12 hours",
          proposedValue: "8 hours",
          impact: "Medium",
          status: "Review"
        }
      ]
    },
    {
      name: "Dumping",
      thresholds: [
        {
          name: "Loss Rate",
          currentValue: "75%",
          proposedValue: "80%",
          impact: "High",
          status: "Active"
        },
        {
          name: "Bet Size Variance",
          currentValue: "200%",
          proposedValue: "150%",
          impact: "Medium",
          status: "Review"
        }
      ]
    },
    {
      name: "Collusion",
      thresholds: [
        {
          name: "Table Occupancy",
          currentValue: "4 players",
          proposedValue: "3 players",
          impact: "High",
          status: "Active"
        },
        {
          name: "Win Distribution",
          currentValue: "70%",
          proposedValue: "75%",
          impact: "High",
          status: "Review"
        }
      ]
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Risk Thresholds</h1>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bot">Bot Detection</SelectItem>
              <SelectItem value="dumping">Dumping</SelectItem>
              <SelectItem value="collusion">Collusion</SelectItem>
            </SelectContent>
          </Select>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Thresholds</CardTitle>
            <CardDescription>Currently enforced</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Proposed changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">8</div>
            <p className="text-sm text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Updated</CardTitle>
            <CardDescription>Recent changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2 days ago</div>
            <p className="text-sm text-muted-foreground">Bot Detection thresholds</p>
          </CardContent>
        </Card>
      </div>

      {thresholdCategories.map((category) => (
        <Card key={category.name}>
          <CardHeader>
            <CardTitle>{category.name} Thresholds</CardTitle>
            <CardDescription>Configure risk detection parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Proposed Value</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.thresholds.map((threshold) => (
                  <TableRow key={threshold.name}>
                    <TableCell className="font-medium">{threshold.name}</TableCell>
                    <TableCell>{threshold.currentValue}</TableCell>
                    <TableCell>
                      <Input
                        defaultValue={threshold.proposedValue}
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <span className={
                        threshold.impact === "High" ? "text-red-500" :
                        threshold.impact === "Medium" ? "text-yellow-500" :
                        "text-green-500"
                      }>
                        {threshold.impact}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={
                        threshold.status === "Active" ? "text-green-500" :
                        "text-yellow-500"
                      }>
                        {threshold.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                        <Button variant="outline" size="sm">
                          Reset
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Add New Threshold</CardTitle>
          <CardDescription>Create a new risk detection parameter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bot">Bot Detection</SelectItem>
                  <SelectItem value="dumping">Dumping</SelectItem>
                  <SelectItem value="collusion">Collusion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input placeholder="Parameter Name" />
            </div>
            <div>
              <Input placeholder="Initial Value" />
            </div>
            <div>
              <Button className="w-full">Add Parameter</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskThresholds; 