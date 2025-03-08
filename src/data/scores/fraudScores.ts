
import { FraudScore } from "@/types/fraudModels";
import { generateId } from "../utils/generators";
import { generateSubScores } from "./subScores";
import { generatePreviousScores } from "../utils/generators";

export const generateFraudScore = (userId: string): FraudScore => {
  const subScores = generateSubScores();
  const value = subScores.reduce((total, subScore) => total + subScore.value * subScore.weight, 0);
  
  return {
    id: generateId(),
    userId,
    value,
    subScores,
    timestamp: new Date(),
    previousScores: generatePreviousScores(),
    threshold: 70 // Example threshold
  };
};
