
import React from "react";
import { dashboardStats, mockUsers } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import useChartData from "@/hooks/useChartData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsOverview from "@/components/dashboard/StatsOverview";
import ChartCard from "@/components/dashboard/ChartCard";
import HighRiskUsersList from "@/components/dashboard/HighRiskUsersList";
import RiskDistributionCard from "@/components/dashboard/RiskDistributionCard";
import PlatformScoreCard from "@/components/dashboard/PlatformScoreCard";

const getHighRiskUsers = () => {
  return mockUsers
    .filter(user => user.fraudScore.value > 70)
    .sort((a, b) => b.fraudScore.value - a.fraudScore.value)
    .slice(0, 5);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const highRiskUsers = getHighRiskUsers();
  const chartData = useChartData();
  
  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  
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
            description="Flagged and blocked users per day"
            chartType="bar"
            data={chartData}
            dataKeys={{ x: "name", y: ["flagged", "blocked"] }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <HighRiskUsersList 
            users={highRiskUsers} 
            onUserClick={handleUserClick} 
          />
          
          <div className="space-y-6">
            <RiskDistributionCard />
            <PlatformScoreCard score={dashboardStats.averageScore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
