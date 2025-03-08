
import React from "react";
import ScoreCard from "@/components/ui-custom/ScoreCard";
import { SubScore } from "@/types/fraudModels";
import { dashboardStats } from "@/data/mockData";

interface PlatformScoreCardProps {
  score: number;
  threshold?: number;
}

const PlatformScoreCard: React.FC<PlatformScoreCardProps> = ({ score, threshold = 70 }) => {
  // Use the sub-scores from dashboardStats
  const subScores: SubScore[] = dashboardStats.platformSubScores;

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
