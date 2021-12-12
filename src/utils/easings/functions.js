export const easeInSine = (x) => {
  return 1 - Math.cos((x * Math.PI) / 2);
}

export const easeInElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}