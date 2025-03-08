
import React from "react";
import UserSearch from "@/components/ui-custom/UserSearch";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Fraud Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time fraud monitoring and analytics</p>
      </div>
      <UserSearch compact />
    </div>
  );
};

export default DashboardHeader;
