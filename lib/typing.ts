export const calculateWPM = (input: string, timeSeconds: number) => {
  const words = input.length / 5;
  return (words / Math.max(timeSeconds, 1)) * 60;
};

export const getElapsed = (startTime: number | null): number =>
  startTime ? (Date.now() - startTime) / 1000 : 0;

export const getAccuracy = (correct: number, total: number): number =>
  total > 0 ? correct / total : 1;
