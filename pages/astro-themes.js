import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const AstroThemesPage = ({
  astroThemes: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default AstroThemesPage;

export const getStaticProps = async () => {
  const astroThemes = await getThemesPages(
    "content/product-pages/astro-themes.md",
  );

  return {
    props: {
      astroThemes: astroThemes,
    },
  };
};
