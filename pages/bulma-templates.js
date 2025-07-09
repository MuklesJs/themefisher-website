import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const BulmaTemplatesPage = ({
  bulmaTemplates: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default BulmaTemplatesPage;

export const getStaticProps = async () => {
  const bulmaTemplates = await getThemesPages(
    "content/product-pages/bulma-templates.md",
  );

  return {
    props: {
      bulmaTemplates: bulmaTemplates,
    },
  };
};
