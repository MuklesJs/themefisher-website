import ProductCards from "@/layouts/components/ProductCards";
import { sortByWeight } from "@/lib/utils/sortFunctions";
import Link from "next/link";

const Products = ({ products, type, show }) => {
  const filterProducts = products.filter(
    (product) =>
      !product.frontmatter.archive && product.frontmatter.type === type,
  );

  const themesList = ["astro", "hugo", "jekyll"];

  return (
    <section id="products" className="section-sm bg-theme-light">
      <div className="container">
        <h2 className="capitalize text-center mb-12">
          {type} {themesList.indexOf(type) > -1 ? "Themes" : "Templates"}
        </h2>
        <ProductCards products={sortByWeight(filterProducts).slice(0, show)} />
        <div className="text-center mt-14">
          <Link
            href={`${type}-${
              themesList.indexOf(type) > -1 ? "themes" : "templates"
            }`}
            className="btn btn-primary"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
