import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Overview = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,345</div>
            <p className="text-sm text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Alerts</CardTitle>
            <CardDescription>High-risk activities detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">47</div>
            <p className="text-sm text-muted-foreground">15 require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">98.5%</div>
            <p className="text-sm text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "New user registration", time: "5 minutes ago" },
                { event: "High-risk alert triggered", time: "15 minutes ago" },
                { event: "System update completed", time: "1 hour ago" },
                { event: "Database backup", time: "2 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{activity.event}</span>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Run Risk Analysis",
                "View Reports",
                "Update Thresholds",
                "System Settings"
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-4 text-left border rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview; 