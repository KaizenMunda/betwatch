
import { RawParameter } from "@/types/fraudModels";
import { generateId } from "../utils/generators";

export const generateIPParameters = (): RawParameter[] => {
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
