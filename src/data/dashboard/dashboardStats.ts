
export const generateDashboardStats = () => {
  const averageScore = 40 + Math.floor(Math.random() * 20);
  
  return {
    totalUsers: 10000 + Math.floor(Math.random() * 1000),
    flaggedUsers: 200 + Math.floor(Math.random() * 50),
    blockedUsers: 50 + Math.floor(Math.random() * 20),
    averageScore,
    highRiskUsers: 120 + Math.floor(Math.random() * 30),
    recentFlagged: 12 + Math.floor(Math.random() * 8),
    recentBlocked: 3 + Math.floor(Math.random() * 5),
    // Add platform sub-scores
    platformSubScores: [
      { id: "1", name: "Transaction Risk", value: 45, weight: 0.4, description: "Risk based on transaction patterns", parameters: [] },
      { id: "2", name: "User Behavior", value: 32, weight: 0.3, description: "Risk based on user behavior patterns", parameters: [] },
      { id: "3", name: "Location Risk", value: 65, weight: 0.2, description: "Risk based on geographic locations", parameters: [] },
      { id: "4", name: "Device Trust", value: 28, weight: 0.1, description: "Risk based on device information", parameters: [] },
    ]
  };
};
