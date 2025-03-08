
export const generateDashboardStats = () => {
  return {
    totalUsers: 10000 + Math.floor(Math.random() * 1000),
    flaggedUsers: 200 + Math.floor(Math.random() * 50),
    blockedUsers: 50 + Math.floor(Math.random() * 20),
    averageScore: 40 + Math.floor(Math.random() * 20),
    highRiskUsers: 120 + Math.floor(Math.random() * 30),
    recentFlagged: 12 + Math.floor(Math.random() * 8),
    recentBlocked: 3 + Math.floor(Math.random() * 5)
  };
};
