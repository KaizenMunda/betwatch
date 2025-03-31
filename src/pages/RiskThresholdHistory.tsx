import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

// Mock data for threshold history
const thresholdHistory = [
  {
    id: 1,
    updatedBy: "John Smith",
    timestamp: new Date(2024, 2, 15, 14, 30),
    category: "Bot Score",
    changes: {
      autoReview: { from: 5.0, to: 5.5 },
      autoFlag: { from: 8.0, to: 8.5 },
      autoBlock: { from: 9.0, to: 9.5 }
    }
  },
  {
    id: 2,
    updatedBy: "Sarah Johnson",
    timestamp: new Date(2024, 2, 1, 9, 15),
    category: "Splash Score",
    changes: {
      autoReview: { from: 4.5, to: 5.0 },
      autoFlag: { from: 7.5, to: 8.0 },
      autoBlock: { from: 8.5, to: 9.0 }
    }
  }
];

// Mock data for weight history
const weightHistory = [
  {
    id: 1,
    updatedBy: "John Smith",
    timestamp: new Date(2024, 2, 15, 14, 30),
    category: "Bot Score",
    changes: {
      rapidBetting: { from: 25, to: 30 },
      patternRecognition: { from: 25, to: 25 },
      sessionDuration: { from: 25, to: 20 },
      timeConsistency: { from: 25, to: 25 }
    }
  },
  {
    id: 2,
    updatedBy: "Sarah Johnson",
    timestamp: new Date(2024, 2, 1, 9, 15),
    category: "Collusion Score",
    changes: {
      tableOccupancy: { from: 20, to: 25 },
      winDistribution: { from: 30, to: 30 },
      playerInteraction: { from: 20, to: 25 },
      chipTransfer: { from: 30, to: 20 }
    }
  }
];

const RiskThresholdHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/configuration")}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Risk Configuration History</h1>
            <p className="text-muted-foreground">
              Track changes in risk thresholds and weights over time
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="thresholds" className="space-y-6">
        <TabsList>
          <TabsTrigger value="thresholds">Threshold Configuration</TabsTrigger>
          <TabsTrigger value="weights">Weight Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="thresholds">
          <Card>
            <CardHeader>
              <CardTitle>Threshold Configuration History</CardTitle>
              <CardDescription>
                Historical changes to auto-review, auto-flag, and auto-block thresholds by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Auto Review</TableHead>
                    <TableHead>Auto Flag</TableHead>
                    <TableHead>Auto Block</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thresholdHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{format(entry.timestamp, 'MMM d, yyyy HH:mm')}</TableCell>
                      <TableCell>{entry.updatedBy}</TableCell>
                      <TableCell>{entry.category}</TableCell>
                      <TableCell>
                        {entry.changes.autoReview.from} → <span className="font-medium">{entry.changes.autoReview.to}</span>
                      </TableCell>
                      <TableCell>
                        {entry.changes.autoFlag.from} → <span className="font-medium">{entry.changes.autoFlag.to}</span>
                      </TableCell>
                      <TableCell>
                        {entry.changes.autoBlock.from} → <span className="font-medium">{entry.changes.autoBlock.to}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weights">
          <Card>
            <CardHeader>
              <CardTitle>Weight Configuration History</CardTitle>
              <CardDescription>
                Historical changes to sub-category weights within each category score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sub-Category Changes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weightHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{format(entry.timestamp, 'MMM d, yyyy HH:mm')}</TableCell>
                      <TableCell>{entry.updatedBy}</TableCell>
                      <TableCell>{entry.category}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {Object.entries(entry.changes).map(([subCategory, values]) => (
                            <div key={subCategory} className="text-sm">
                              <span className="capitalize">{subCategory.replace(/([A-Z])/g, ' $1').trim()}</span>:{' '}
                              {values.from}% → <span className="font-medium">{values.to}%</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskThresholdHistory; 