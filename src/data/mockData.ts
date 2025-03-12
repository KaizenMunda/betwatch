import { User, ActionType } from "@/types/fraudModels";
import { generateUsers } from "./users/userGenerator";
import { generateDashboardStats } from "./dashboard/dashboardStats";

// Generate data
export const mockUsers = generateUsers(100);
export const dashboardStats = generateDashboardStats();

// Mock user data
export const users: User[] = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    lastActive: new Date(2024, 2, 1),
    joinDate: new Date(2023, 1, 15),
    fraudScore: {
      id: "FS001",
      userId: "USR001",
      value: 25,
      subScores: [
        {
          id: "SS001",
          name: "Transaction Pattern",
          value: 20,
          weight: 0.4,
          description: "Based on normal transaction patterns",
          parameters: [
            {
              id: "P001",
              name: "transaction_frequency",
              value: 5,
              type: "number",
              description: "Number of transactions per day",
              impact: "low"
            }
          ]
        }
      ],
      timestamp: new Date(),
      threshold: 70,
      lastUpdated: new Date()
    },
    profile: {
      joinDate: new Date(2023, 1, 15),
      location: "New York, USA",
      phoneNumber: "+1 (555) 123-4567",
      verificationStatus: "verified",
      totalTransactions: 145,
      accountBalance: 2500.00
    },
    activities: [
      { type: "login", date: new Date(2024, 2, 1), location: "New York, USA", device: "iPhone 13", status: "completed" },
      { type: "transaction", date: new Date(2024, 2, 1), amount: 500, status: "completed" },
      { type: "password_change", date: new Date(2024, 1, 15), status: "completed" }
    ],
    riskMetrics: {
      loginAttempts: 2,
      failedTransactions: 1,
      suspiciousActivities: 0,
      riskLevel: "low",
      lastAssessment: new Date(2024, 2, 1)
    },
    transactionHistory: [
      { id: "TRX001", date: new Date(2024, 2, 1), amount: 500, type: "deposit", status: "completed" },
      { id: "TRX002", date: new Date(2024, 2, 1), amount: 200, type: "withdrawal", status: "completed" },
      { id: "TRX003", date: new Date(2024, 1, 28), amount: 1000, type: "deposit", status: "completed" }
    ],
    actions: []
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "flagged",
    lastActive: new Date(2024, 2, 2),
    joinDate: new Date(2023, 5, 20),
    fraudScore: {
      id: "FS002",
      userId: "USR002",
      value: 75,
      subScores: [
        {
          id: "SS002",
          name: "Login Pattern",
          value: 80,
          weight: 0.6,
          description: "Suspicious login patterns detected",
          parameters: [
            {
              id: "P002",
              name: "login_location_changes",
              value: "high",
              type: "string",
              description: "Frequent location changes",
              impact: "high"
            }
          ]
        }
      ],
      timestamp: new Date(),
      threshold: 70,
      lastUpdated: new Date()
    },
    profile: {
      joinDate: new Date(2023, 5, 20),
      location: "Los Angeles, USA",
      phoneNumber: "+1 (555) 987-6543",
      verificationStatus: "pending",
      totalTransactions: 89,
      accountBalance: 1200.00
    },
    activities: [
      { type: "login", date: new Date(2024, 2, 2), location: "Unknown", device: "Android Device", status: "flagged" },
      { type: "failed_transaction", date: new Date(2024, 2, 2), amount: 2000, status: "failed" },
      { type: "suspicious_login", date: new Date(2024, 2, 1), location: "Different Country", status: "flagged" }
    ],
    riskMetrics: {
      loginAttempts: 5,
      failedTransactions: 3,
      suspiciousActivities: 2,
      riskLevel: "high",
      lastAssessment: new Date(2024, 2, 2)
    },
    transactionHistory: [
      { id: "TRX004", date: new Date(2024, 2, 2), amount: 2000, type: "withdrawal", status: "failed" },
      { id: "TRX005", date: new Date(2024, 2, 1), amount: 300, type: "withdrawal", status: "completed" },
      { id: "TRX006", date: new Date(2024, 1, 30), amount: 500, type: "deposit", status: "completed" }
    ],
    actions: []
  }
];

// Search function
export const searchUsers = (query: string): User[] => {
  const lowercaseQuery = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.id.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 10); // Limit to 10 results
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper function to update user status
export const updateUserStatus = (userId: string, status: 'active' | 'flagged' | 'blocked', reason: string): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return undefined;
  
  // Create a copy of the user
  const updatedUser = { ...mockUsers[userIndex] };
  
  // Update the status
  updatedUser.status = status;
  
  // Add a new action
  // Convert the status to an ActionType
  let actionType: ActionType;
  switch (status) {
    case 'flagged':
      actionType = 'flag';
      break;
    case 'blocked':
      actionType = 'block';
      break;
    default:
      actionType = 'clear';
  }
  
  const newAction = {
    id: Math.random().toString(36).substring(2, 12),
    userId,
    type: actionType, // Now correctly typed as ActionType
    timestamp: new Date(),
    reason,
    performedBy: "Current User" // In a real app, this would be the logged-in user
  };
  
  updatedUser.actions = [newAction, ...updatedUser.actions];
  
  // Update the user in the mockUsers array
  mockUsers[userIndex] = updatedUser;
  
  return updatedUser;
};
