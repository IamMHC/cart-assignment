export const uniqueByValue = (arr: { value: string; label: string }[]) => {
  return arr.reduce((acc, curr) => {
    if (!acc.find((item) => item.value === curr.value)) {
      acc.push(curr);
    }
    return acc;
  }, [] as { value: string; label: string }[]);
};
