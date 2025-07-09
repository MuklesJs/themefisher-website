import ProductsLists from "@/layouts/ProductsLists";
import { getThemesPages } from "@/lib/contentParser";

const TailwindTemplatesPage = ({
  tailwindTemplates: { themes, singlePage, categories },
}) => {
  return (
    <ProductsLists
      singlePage={singlePage}
      products={themes}
      categories={categories}
    />
  );
};

export default TailwindTemplatesPage;

export const getStaticProps = async () => {
  const tailwindTemplates = await getThemesPages(
    "content/product-pages/tailwind-templates.md",
  );

  return {
    props: {
      tailwindTemplates: tailwindTemplates,
    },
  };
};
