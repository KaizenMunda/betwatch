import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserManagement = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            User management functionality will be implemented here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement; 