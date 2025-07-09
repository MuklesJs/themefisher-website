export const getAllCategory = (array) => {
  const allCategories = array.map((p) => p.category);
  let categories = [];
  for (let i = 0; i < allCategories.length; i++) {
    const categoryArray = allCategories[i];
    for (let j = 0; j < categoryArray.length; j++) {
      categories.push(categoryArray[j]);
    }
  }
  const category = [...new Set(categories)];
  return category;
};
