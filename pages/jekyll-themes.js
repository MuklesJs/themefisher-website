import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const JekyllThemesPage = ({
  jekyllThemes: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default JekyllThemesPage;

export const getStaticProps = async () => {
  const jekyllThemes = await getThemesPages(
    "content/product-pages/jekyll-themes.md",
  );

  return {
    props: {
      jekyllThemes: jekyllThemes,
    },
  };
};
