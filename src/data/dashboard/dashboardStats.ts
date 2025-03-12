export const generateDashboardStats = () => {
  const averageScore = 40 + Math.floor(Math.random() * 20);
  
  return {
    totalUsers: 10000 + Math.floor(Math.random() * 1000),
    underReviewUsers: 150 + Math.floor(Math.random() * 30),
    flaggedUsers: 200 + Math.floor(Math.random() * 50),
    blockedUsers: 50 + Math.floor(Math.random() * 20),
    averageScore,
    highRiskUsers: 120 + Math.floor(Math.random() * 30),
    recentFlagged: 12 + Math.floor(Math.random() * 8),
    recentBlocked: 3 + Math.floor(Math.random() * 5),
    // Add platform sub-scores with parameters for expandable view
    platformSubScores: [
      { 
        id: "1", 
        name: "Transaction Risk", 
        value: 45, 
        weight: 0.4, 
        description: "Risk based on transaction patterns", 
        parameters: [
          { id: "t1", name: "Transaction Volume", value: 87, type: "number", impact: "high", description: "Number of transactions in the last 24 hours" },
          { id: "t2", name: "Average Amount", value: 350.75, type: "number", impact: "medium", description: "Average transaction amount" },
          { id: "t3", name: "Suspicious Patterns", value: true, type: "boolean", impact: "high", description: "Unusual transaction patterns detected" }
        ] 
      },
      { 
        id: "2", 
        name: "User Behavior", 
        value: 32, 
        weight: 0.3, 
        description: "Risk based on user behavior patterns", 
        parameters: [
          { id: "b1", name: "Login Attempts", value: 5, type: "number", impact: "medium", description: "Failed login attempts in last hour" },
          { id: "b2", name: "Session Duration", value: 12.4, type: "number", impact: "low", description: "Average session duration in minutes" },
          { id: "b3", name: "Multiple Accounts", value: false, type: "boolean", impact: "high", description: "User has multiple accounts" }
        ] 
      },
      { 
        id: "3", 
        name: "Location Risk", 
        value: 65, 
        weight: 0.2, 
        description: "Risk based on geographic locations", 
        parameters: [
          { id: "l1", name: "High Risk Region", value: true, type: "boolean", impact: "high", description: "Access from known high risk region" },
          { id: "l2", name: "Location Changes", value: 3, type: "number", impact: "medium", description: "Number of location changes in 24 hours" },
          { id: "l3", name: "VPN Usage", value: true, type: "boolean", impact: "medium", description: "VPN or proxy detected" }
        ] 
      },
      { 
        id: "4", 
        name: "Device Trust", 
        value: 28, 
        weight: 0.1, 
        description: "Risk based on device information", 
        parameters: [
          { id: "d1", name: "New Device", value: true, type: "boolean", impact: "medium", description: "First time using this device" },
          { id: "d2", name: "Device Age", value: 0.5, type: "number", impact: "low", description: "Days since first seen" },
          { id: "d3", name: "Browser Fingerprint", value: "Suspicious", type: "string", impact: "high", description: "Browser fingerprint analysis" }
        ] 
      }
    ]
  };
};

export default generateDashboardStats;
