
import { RawParameter } from "@/types/fraudModels";
import { generateId } from "../utils/generators";

export const generateDeviceParameters = (): RawParameter[] => {
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
