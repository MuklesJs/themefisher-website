import ProductCards from "@/components/ProductCards";
import Base from "@/layouts/Baseof";
import { getAllCategory } from "@/lib/categoryParser";
import { getSinglePages } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import { getListPage } from "lib/contentParser";

const Category = ({
  products,
  categoriesIndex: {
    title,
    description,
    image,
    meta_title,
    noindex,
    service_popup,
  },
}) => {
  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
      service_popup={service_popup}
    >
      <section className="py-[70px] mb-4 bg-[#f1f1f1]">
        <div className="container">
          <div className="row">
            <div className="md:col-12">
              <h1 className="capitalize h1 mb-0">{title}</h1>
              {description && (
                <div className="mt-3">
                  <p className="mb-0">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProductCards products={products} />
        </div>
      </section>
    </Base>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const allProducts = await getSinglePages("content/products");
  const category = getAllCategory(allProducts);
  const paths = category.map((category) => ({
    params: {
      category: slugify(category),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { category } = params;
  const allProducts = await getSinglePages("content/products");
  const filterByCategory = allProducts.filter((product) =>
    product.frontmatter.categories.includes(category),
  );

  const categoriesIndex = await getListPage(
    `content/categories/${params.category}.md`,
  );
  const { frontmatter: cteagoryIndex } = categoriesIndex;

  return {
    props: {
      products: filterByCategory,
      categoriesIndex: cteagoryIndex,
    },
  };
};
