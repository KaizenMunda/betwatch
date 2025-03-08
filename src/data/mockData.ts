
import { User, ActionType } from "@/types/fraudModels";
import { generateUsers } from "./users/userGenerator";
import { generateDashboardStats } from "./dashboard/dashboardStats";

// Generate data
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
