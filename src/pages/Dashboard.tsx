import React from "react";
import { dashboardStats } from "@/data/mockData";
import useChartData from "@/hooks/useChartData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsOverview from "@/components/dashboard/StatsOverview";
import ChartCard from "@/components/dashboard/ChartCard";

const Dashboard = () => {
  const chartData = useChartData();
  
  return (
    <div className="p-8">
      <div className="flex flex-col gap-8">
        <DashboardHeader />
        
        <StatsOverview stats={dashboardStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Fraud Trends" 
            description="Weekly scoring patterns and anomalies"
            chartType="area"
            data={chartData}
            dataKeys={{ x: "name", y: "avgScore" }}
          />
          
          <ChartCard 
            title="Actions Taken" 
            description="Auto vs Manual actions per day"
            chartType="bar"
            data={chartData}
            dataKeys={{ 
              x: "name", 
              y: [
                "autoUnderReview",
                "manualUnderReview",
                "autoFlagged",
                "manualFlagged",
                "autoBlocked",
                "manualBlocked"
              ] 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
