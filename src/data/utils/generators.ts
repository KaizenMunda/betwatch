
// Utility functions for generating mock data

export const generateId = (): string => Math.random().toString(36).substring(2, 12);

// Helper to add random dates for previous scores
export const generatePreviousScores = (count: number = 10) => {
  const previousScores = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    previousScores.push({
      date,
      value: Math.random() * 100
    });
  }
  return previousScores;
};
