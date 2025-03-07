
import { FraudAction, FraudScore, RawParameter, SubScore, User } from "@/types/fraudModels";

const generateId = (): string => Math.random().toString(36).substring(2, 12);

// Generate raw parameters for different subscore types
const generateIPParameters = (): RawParameter[] => {
  return [
    {
      id: generateId(),
      name: "IP Address",
      value: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      type: "string",
      description: "User's IP address",
      impact: "medium"
    },
    {
      id: generateId(),
      name: "IP Location",
      value: ["United States", "Canada", "United Kingdom", "Australia", "Germany"][Math.floor(Math.random() * 5)],
      type: "string",
      description: "IP geolocation",
      impact: "medium"
    },
    {
      id: generateId(),
      name: "IP Reputation",
      value: Math.random() * 100,
      type: "number",
      description: "IP reputation score (higher is better)",
      impact: "high"
    },
    {
      id: generateId(),
      name: "VPN/Proxy Detected",
      value: Math.random() > 0.7,
      type: "boolean",
      description: "Whether VPN or proxy is detected",
      impact: "high"
    }
  ];
};

const generateBehaviorParameters = (): RawParameter[] => {
  return [
    {
      id: generateId(),
      name: "Session Duration",
      value: Math.floor(Math.random() * 120) + 1,
      type: "number",
      description: "Average session duration in minutes",
      impact: "medium"
    },
    {
      id: generateId(),
      name: "Mouse Movement",
      value: Math.random() * 100,
      type: "number",
      description: "Mouse movement entropy score",
      impact: "medium"
    },
    {
      id: generateId(),
      name: "Typing Speed",
      value: Math.floor(Math.random() * 100) + 20,
      type: "number",
      description: "Average typing speed in WPM",
      impact: "low"
    },
    {
      id: generateId(),
      name: "Input Consistency",
      value: Math.random() * 100,
      type: "number",
      description: "Consistency of user input patterns",
      impact: "medium"
    }
  ];
};

const generateTransactionParameters = (): RawParameter[] => {
  return [
    {
      id: generateId(),
      name: "Transaction Amount",
      value: Math.floor(Math.random() * 10000) / 100,
      type: "number",
      description: "Transaction amount in USD",
      impact: "high"
    },
    {
      id: generateId(),
      name: "Transaction Frequency",
      value: Math.floor(Math.random() * 20) + 1,
      type: "number",
      description: "Number of transactions in the last 30 days",
      impact: "medium"
    },
    {
      id: generateId(),
      name: "New Payment Method",
      value: Math.random() > 0.7,
      type: "boolean",
      description: "Whether a new payment method was recently added",
      impact: "high"
    },
    {
      id: generateId(),
      name: "Purchase Category",
      value: ["Electronics", "Clothing", "Food", "Travel", "Other"][Math.floor(Math.random() * 5)],
      type: "string",
      description: "Category of the purchase",
      impact: "low"
    }
  ];
};

const generateDeviceParameters = (): RawParameter[] => {
  return [
    {
      id: generateId(),
      name: "Device Type",
      value: ["Desktop", "Mobile", "Tablet"][Math.floor(Math.random() * 3)],
      type: "string",
      description: "Type of device used",
      impact: "low"
    },
    {
      id: generateId(),
      name: "Browser",
      value: ["Chrome", "Firefox", "Safari", "Edge"][Math.floor(Math.random() * 4)],
      type: "string",
      description: "Browser used",
      impact: "low"
    },
    {
      id: generateId(),
      name: "OS",
      value: ["Windows", "macOS", "iOS", "Android", "Linux"][Math.floor(Math.random() * 5)],
      type: "string",
      description: "Operating system",
      impact: "low"
    },
    {
      id: generateId(),
      name: "Screen Resolution",
      value: ["1920x1080", "1366x768", "2560x1440", "3840x2160"][Math.floor(Math.random() * 4)],
      type: "string",
      description: "Screen resolution",
      impact: "low"
    }
  ];
};

// Generate sub-scores
const generateSubScores = (): SubScore[] => {
  return [
    {
      id: generateId(),
      name: "IP Risk",
      value: Math.random() * 100,
      weight: 0.3,
      description: "Risk based on IP address and location",
      parameters: generateIPParameters()
    },
    {
      id: generateId(),
      name: "Behavior Analysis",
      value: Math.random() * 100,
      weight: 0.25,
      description: "Risk based on user behavior patterns",
      parameters: generateBehaviorParameters()
    },
    {
      id: generateId(),
      name: "Transaction Risk",
      value: Math.random() * 100,
      weight: 0.35,
      description: "Risk based on transaction patterns",
      parameters: generateTransactionParameters()
    },
    {
      id: generateId(),
      name: "Device Trust",
      value: Math.random() * 100,
      weight: 0.1,
      description: "Risk based on device information",
      parameters: generateDeviceParameters()
    }
  ];
};

// Generate fraud score
const generateFraudScore = (userId: string): FraudScore => {
  const subScores = generateSubScores();
  const value = subScores.reduce((total, subScore) => total + subScore.value * subScore.weight, 0);
  
  const previousScores = [];
  const now = new Date();
  for (let i = 1; i <= 10; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    previousScores.push({
      date,
      value: Math.random() * 100
    });
  }
  
  return {
    id: generateId(),
    userId,
    value,
    subScores,
    timestamp: new Date(),
    previousScores,
    threshold: 70 // Example threshold
  };
};

// Generate actions
const generateActions = (userId: string): FraudAction[] => {
  const actions = [];
  const actionTypes: ActionType[] = ['flag', 'block', 'clear'];
  const admins = ['John Doe', 'Jane Smith', 'Michael Johnson'];
  
  const count = Math.floor(Math.random() * 3);
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    actions.push({
      id: generateId(),
      userId,
      type: actionTypes[Math.floor(Math.random() * actionTypes.length)],
      timestamp: date,
      reason: "Suspicious activity detected",
      performedBy: admins[Math.floor(Math.random() * admins.length)]
    });
  }
  
  return actions;
};

// Generate users
export const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    const userId = generateId();
    const status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'flagged' : 'blocked') : 'active';
    
    users.push({
      id: userId,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
      status,
      fraudScore: generateFraudScore(userId),
      actions: generateActions(userId)
    });
  }
  
  return users;
};

// Generate random stats for dashboard
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

// Mock data 
export const mockUsers = generateUsers(100);
export const dashboardStats = generateDashboardStats();

// Helper function to search users
export const searchUsers = (query: string): User[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(lowercaseQuery) || 
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.id.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
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
  const newAction: FraudAction = {
    id: generateId(),
    userId,
    type: status === 'flagged' ? 'flag' : (status === 'blocked' ? 'block' : 'clear'),
    timestamp: new Date(),
    reason,
    performedBy: "Current User" // In a real app, this would be the logged-in user
  };
  
  updatedUser.actions = [newAction, ...updatedUser.actions];
  
  // Update the user in the mockUsers array
  mockUsers[userIndex] = updatedUser;
  
  return updatedUser;
};
