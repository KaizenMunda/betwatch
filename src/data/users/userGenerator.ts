
import { User } from "@/types/fraudModels";
import { generateId } from "../utils/generators";
import { generateFraudScore } from "../scores/fraudScores";
import { generateActions } from "../actions/fraudActions";

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
