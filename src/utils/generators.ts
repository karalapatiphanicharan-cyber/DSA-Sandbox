export const generateRandomArray = (size: number, min = 1, max = 99): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const generateSortedArray = (size: number): number[] => {
  return generateRandomArray(size).sort((a, b) => a - b);
};

export const generateReverseSortedArray = (size: number): number[] => {
  return generateRandomArray(size).sort((a, b) => b - a);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
