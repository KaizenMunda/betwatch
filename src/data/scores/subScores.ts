
import { SubScore } from "@/types/fraudModels";
import { generateId } from "../utils/generators";
import { generateIPParameters } from "../parameters/ipParameters";
import { generateBehaviorParameters } from "../parameters/behaviorParameters";
import { generateTransactionParameters } from "../parameters/transactionParameters";
import { generateDeviceParameters } from "../parameters/deviceParameters";

export const generateSubScores = (): SubScore[] => {
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
