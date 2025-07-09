import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const HugoThemesPage = ({ hugoThemes: { themes, singlePage, categories } }) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default HugoThemesPage;

export const getStaticProps = async () => {
  const hugoThemes = await getThemesPages(
    "content/product-pages/hugo-themes.md",
  );

  return {
    props: {
      hugoThemes: hugoThemes,
    },
  };
};
