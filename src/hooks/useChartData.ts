import { useMemo } from "react";
import { subDays, format } from "date-fns";

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
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        name: format(date, 'MMM dd'),
        autoUnderReview: Math.floor(Math.random() * 5) + 1,
        manualUnderReview: Math.floor(Math.random() * 3) + 2,
        autoFlagged: Math.floor(Math.random() * 6) + 1,
        manualFlagged: Math.floor(Math.random() * 4) + 1,
        autoBlocked: Math.floor(Math.random() * 3) + 1,
        manualBlocked: Math.floor(Math.random() * 2) + 1,
        avgScore: 40 + Math.floor(Math.random() * 30),
      };
    });
  }, []);

  return chartData;
};

export default useChartData;
