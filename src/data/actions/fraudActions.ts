
import { ActionType, FraudAction } from "@/types/fraudModels";
import { generateId } from "../utils/generators";

export const generateActions = (userId: string): FraudAction[] => {
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
