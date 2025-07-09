export const similarProducts = (currentItem, allItems, slug) => {
  let categories = [];
  let keywords = [];

  // set categories
  if (currentItem.frontmatter.categories?.length > 0) {
    categories = currentItem.frontmatter.categories;
  }

  // set keywords
  if (currentItem.frontmatter.keywords?.length > 0) {
    keywords = currentItem.frontmatter.keywords;
  }

  const filterBySlug = allItems.filter((product) => product.slug !== slug);

  const filterByCategories = filterBySlug.filter((item) =>
    categories.find((category) =>
      item.frontmatter.categories.includes(category),
    ),
  );

  const filterByKeywords = filterBySlug.filter((item) =>
    keywords.find((keywords) => item.frontmatter.keywords.includes(keywords)),
  );

  const mergedItems = [
    ...new Set([...filterByCategories, ...filterByKeywords]),
  ];

  const filterByType = mergedItems.filter(
    (item) => item.frontmatter.type === currentItem.frontmatter.type,
  );

  return filterByType;
};

// similar posts
export const similarPosts = (currentItem, allItems, slug) => {
  let categories = [];

  // set categories
  if (currentItem.frontmatter.categories?.length > 0) {
    categories = currentItem.frontmatter.categories;
  }

  // filter by categories
  const filterByCategory = allItems?.filter((item) =>
    categories.find((category) =>
      item.frontmatter.categories?.includes(category),
    ),
  );

  // filter by slug
  const filterBySlug = filterByCategory.filter((post) => post.slug !== slug);

  return filterBySlug;
};
