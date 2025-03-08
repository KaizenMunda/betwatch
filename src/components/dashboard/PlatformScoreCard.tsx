
import React from "react";
import ScoreCard from "@/components/ui-custom/ScoreCard";
import { SubScore } from "@/types/fraudModels";

interface PlatformScoreCardProps {
  score: number;
  threshold?: number;
}

const PlatformScoreCard: React.FC<PlatformScoreCardProps> = ({ score, threshold = 70 }) => {
  const subScores: SubScore[] = [
    { id: "1", name: "Transaction Risk", value: 45, weight: 0.4, description: "", parameters: [] },
    { id: "2", name: "User Behavior", value: 32, weight: 0.3, description: "", parameters: [] },
    { id: "3", name: "Location Risk", value: 65, weight: 0.2, description: "", parameters: [] },
    { id: "4", name: "Device Trust", value: 28, weight: 0.1, description: "", parameters: [] },
  ];

  return (
    <ScoreCard 
      title="Platform Risk Score"
      score={score}
      description="Aggregate risk score for the platform"
      threshold={threshold}
      showDetails
      subScores={subScores}
    />
  );
};

export default PlatformScoreCard;
