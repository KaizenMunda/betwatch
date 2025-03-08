
import { useMemo } from "react";

interface ChartDataPoint {
  name: string;
  flagged: number;
  blocked: number;
  avgScore: number;
}

const useChartData = () => {
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      flagged: Math.floor(Math.random() * 10) + 2,
      blocked: Math.floor(Math.random() * 5) + 1,
      avgScore: 40 + Math.floor(Math.random() * 30),
    }));
  }, []);

  return chartData;
};

export default useChartData;
