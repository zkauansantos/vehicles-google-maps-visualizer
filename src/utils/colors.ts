export function generateRandomPinColor() {
  const possibleColors = [
    "fill-primary",
    "fill-warning",
    "fill-caution",
    "fill-success",
  ];

  const randomIndex = Math.floor(Math.random() * possibleColors.length);

  return possibleColors[randomIndex];
}
