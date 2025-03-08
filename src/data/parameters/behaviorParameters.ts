
import { RawParameter } from "@/types/fraudModels";
import { generateId } from "../utils/generators";

export const generateBehaviorParameters = (): RawParameter[] => {
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
