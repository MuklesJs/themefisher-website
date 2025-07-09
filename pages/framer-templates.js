import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const FramerTemplatesPage = ({
  framerTemplate: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default FramerTemplatesPage;

export const getStaticProps = async () => {
  const framerTemplate = await getThemesPages(
    "content/product-pages/framer-templates.md",
  );

  return {
    props: {
      framerTemplate: framerTemplate,
    },
  };
};
