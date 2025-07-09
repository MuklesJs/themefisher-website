import FreeTemplates from "@/layouts/FreeTemplates";
import { getSinglePages } from "@/lib/contentParser";
import { getListPage } from "lib/contentParser";
import { Suspense } from "react";

const FreeTemplatesPage = ({ freeTemplates, products }) => {
  return (
    <Suspense>
      <FreeTemplates freeTemplates={freeTemplates} products={products} />
    </Suspense>
  );
};

export default FreeTemplatesPage;

export const getStaticProps = async () => {
  const allProducts = await getSinglePages("content/products");
  const freeTemplates = await getListPage(
    "content/landing-pages/free-bootstrap-templates.md",
  );

  return {
    props: {
      freeTemplates: freeTemplates,
      products: allProducts,
    },
  };
};
