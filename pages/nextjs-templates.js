import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const NextjsTemplatesPage = ({
  nextjsTemplates: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default NextjsTemplatesPage;

export const getStaticProps = async () => {
  const nextjsTemplates = await getThemesPages(
    "content/product-pages/nextjs-templates.md",
  );

  return {
    props: {
      nextjsTemplates: nextjsTemplates,
    },
  };
};
