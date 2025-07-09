// sort by date
export const sortByDate = (array) => {
  const sortedArray = array.sort(
    (a, b) =>
      new Date(b.frontmatter.date && b.frontmatter.date) -
      new Date(a.frontmatter.date && a.frontmatter.date),
  );
  return sortedArray;
};

// sort by weight
export const sortByWeight = (array) => {
  const withWeight = array.filter((item) => item.frontmatter.weight);
  const withoutWeight = array.filter(
    (item) => Number(item.frontmatter.weight) < 1,
  );
  const sortedWeightedArray = withWeight.sort(
    (a, b) => Number(a.frontmatter.weight) - Number(b.frontmatter.weight),
  );
  const sortedArray = [...sortedWeightedArray, ...withoutWeight];

  return sortedArray;
};
