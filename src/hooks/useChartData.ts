import { useMemo } from "react";

interface ChartDataPoint {
  name: string;
  autoUnderReview: number;
  manualUnderReview: number;
  autoFlagged: number;
  manualFlagged: number;
  autoBlocked: number;
  manualBlocked: number;
  avgScore: number;
}

const useChartData = () => {
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      autoUnderReview: Math.floor(Math.random() * 5) + 1,
      manualUnderReview: Math.floor(Math.random() * 3) + 2,
      autoFlagged: Math.floor(Math.random() * 6) + 1,
      manualFlagged: Math.floor(Math.random() * 4) + 1,
      autoBlocked: Math.floor(Math.random() * 3) + 1,
      manualBlocked: Math.floor(Math.random() * 2) + 1,
      avgScore: 40 + Math.floor(Math.random() * 30),
    }));
  }, []);

  return chartData;
};

export default useChartData;
