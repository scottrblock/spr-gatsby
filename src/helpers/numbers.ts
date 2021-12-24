export const prettyNumber = (n: number): string => (n < 10 ? n.toFixed(1) : n.toFixed(0));

export const minMaxPercentage = (potSize: number, stackSize: number, round: boolean): { min: number; max: number } => {
  const spr = stackSize / potSize;

  const maxPercentage = Math.min(500, spr * 100);
  const roundFactor = round ? 5 : 1;
  const roundedMaxPercentage = Math.round(maxPercentage / roundFactor) * roundFactor;

  const minFloor = Math.min(5, roundedMaxPercentage);
  const minCeiling = (1 / potSize) * 100 - 5;

  const minPercentage = stackSize === 0 ? 0 : Math.max(minFloor, minCeiling);
  const roundedMinPercentage = Math.round(minPercentage / 5) * 5;

  return { min: roundedMinPercentage, max: roundedMaxPercentage + (round ? 0 : 1) };
};
