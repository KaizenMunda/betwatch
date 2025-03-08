
import { RawParameter } from "@/types/fraudModels";
import { generateId } from "../utils/generators";

export const generateTransactionParameters = (): RawParameter[] => {
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
