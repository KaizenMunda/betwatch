import React from "react";
import StatCard from "@/components/ui-custom/StatCard";
import { AlertTriangle, Lock, Users, Flag } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    totalUsers: number;
    flaggedUsers: number;
    blockedUsers: number;
    underReviewUsers: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers.toLocaleString()}
        icon={Users}
        iconColor="text-blue-600"
        iconBackground="bg-blue-100 dark:bg-blue-950/30"
        change={{ value: 12, timeframe: "vs last month" }}
        description="vs last month"
      />
      <StatCard 
        title="Under Review" 
        value={stats.underReviewUsers.toLocaleString()} 
        icon={AlertTriangle}
        iconColor="text-yellow-600"
        iconBackground="bg-yellow-100 dark:bg-yellow-950/30"
        change={{ value: 8, timeframe: "vs last month" }}
        description="vs last month"
      />
      <StatCard 
        title="Flagged Users" 
        value={stats.flaggedUsers.toLocaleString()} 
        icon={Flag}
        iconColor="text-orange-600"
        iconBackground="bg-orange-100 dark:bg-orange-950/30"
        change={{ value: 8, timeframe: "vs last month" }}
        description="vs last month"
      />
      <StatCard 
        title="Blocked Users" 
        value={stats.blockedUsers.toLocaleString()} 
        icon={Lock}
        iconColor="text-red-600"
        iconBackground="bg-red-100 dark:bg-red-950/30"
        change={{ value: 5, timeframe: "vs last month" }}
        description="vs last month"
      />
    </div>
  );
};

export default StatsOverview;
