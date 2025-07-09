import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const BootstrapThemesPage = ({
  bootstrapTemplate: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default BootstrapThemesPage;

export const getStaticProps = async () => {
  const bootstrapTemplate = await getThemesPages(
    "content/product-pages/bootstrap-templates.md",
  );

  return {
    props: {
      bootstrapTemplate: bootstrapTemplate,
    },
  };
};
