export function randomizeOptions(optionA, optionB) {
  const isAOnLeft = Math.random() < 0.5;

  return {
    left: isAOnLeft ? optionA : optionB,
    right: isAOnLeft ? optionB : optionA,
    mapping: {
      left: isAOnLeft ? 'A' : 'B',
      right: isAOnLeft ? 'B' : 'A'
    }
  };
}
