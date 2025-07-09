import ProductCards from "@/components/ProductCards";
import Base from "@/layouts/Baseof";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { useEffect, useState } from "react";
import Faq from "./partials/Faq";

const ProductsLists = ({ singlePage, products, categories }) => {
  const {
    frontmatter: {
      title,
      image,
      description,
      meta_title,
      meta_description,
      service_popup,
      faq,
    },
  } = singlePage;

  const [productsByType, setProductsByType] = useState(products);
  const [activeType, setActiveType] = useState("all");
  const [productsByCategory, setProductsByCategory] = useState(productsByType);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  // mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // set products by type
  useEffect(() => {
    setProductsByCategory(productsByType);
  }, [productsByType]);

  // pricing filter
  const freeProducts = products.filter(
    (product) => product.frontmatter.price === 0,
  );
  const premiumProducts = products.filter(
    (product) => product.frontmatter.price > 0,
  );

  const filterByType = (theme) => {
    if (theme === "free") {
      setProductsByType(freeProducts);
      setActiveType("free");
      setActiveCategory("all");
    } else if (theme === "premium") {
      setProductsByType(premiumProducts);
      setActiveType("premium");
      setActiveCategory("all");
    } else {
      setProductsByType(products);
      setActiveType("all");
      setActiveCategory("all");
    }
  };

  const filterByCategory = (e) => {
    if (e === "all") {
      setProductsByCategory(productsByType);
      setActiveCategory("all");
    } else {
      setProductsByCategory(
        productsByType.filter((item) =>
          item.frontmatter.categories.includes(e),
        ),
      );
      setActiveCategory(e);
    }
  };

  return (
    <Base
      title={meta_title}
      image={image}
      description={meta_description}
      service_popup={service_popup}
    >
      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="xl:col-8 mx-auto text-center mb-6 lg:mb-12">
              {markdownify(title, "h1", "mb-3")}
              {markdownify(
                description,
                "p",
                `mb-4 text-xl text-[#888] category-description`,
              )}
            </div>
            <div className="lg:col-12 mx-auto text-center mb-6 lg:mb-12">
              <div className="block lg:inline-grid grid-cols-[auto_1fr] items-center justify-center shadow-lg p-4 rounded-lg">
                {freeProducts.length > 0 && premiumProducts.length > 0 && (
                  <div className="lg:pr-8 lg:border-r lg:border-[#eee] text-center xl:text-end lg:mr-6 inline-flex flex-nowrap">
                    <button
                      onClick={() => filterByType("all")}
                      className={`type-filter ${
                        activeType === "all" ? "type-filter-active" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                        style={{ verticalAlign: "-3px" }}
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M4 4h6v8h-6z"></path>
                        <path d="M4 16h6v4h-6z"></path>
                        <path d="M14 12h6v8h-6z"></path>
                        <path d="M14 4h6v4h-6z"></path>
                      </svg>
                      All
                    </button>
                    <button
                      onClick={() => filterByType("free")}
                      className={`type-filter ${
                        activeType === "free" ? "type-filter-active" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                        style={{ verticalAlign: "-4px" }}
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M13.867 9.75c-.246 -.48 -.708 -.769 -1.2 -.75h-1.334c-.736 0 -1.333 .67 -1.333 1.5c0 .827 .597 1.499 1.333 1.499h1.334c.736 0 1.333 .671 1.333 1.5c0 .828 -.597 1.499 -1.333 1.499h-1.334c-.492 .019 -.954 -.27 -1.2 -.75"></path>
                        <path d="M12 7v2"></path>
                        <path d="M12 15v2"></path>
                        <path d="M6 6l1.5 1.5"></path>
                        <path d="M16.5 16.5l1.5 1.5"></path>
                      </svg>
                      Free
                    </button>
                    <button
                      onClick={() => filterByType("premium")}
                      className={`type-filter ${
                        activeType === "premium" ? "type-filter-active" : ""
                      }`}
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                        style={{ verticalAlign: "-4px" }}
                      >
                        <path
                          d="M21.2501 3C21.4925 3 21.7176 3.11688 21.8574 3.30983L21.9119 3.39706L25.9186 10.9098L25.9615 11.0122L25.9731 11.05L25.9901 11.1273L25.9994 11.2153L25.9973 11.3147L26.0001 11.25C26.0001 11.3551 25.9785 11.4552 25.9394 11.5461L25.9106 11.6057L25.87 11.6723L25.8173 11.7408L14.6 24.7047C14.4999 24.8391 14.3628 24.9277 14.2139 24.9703L14.1559 24.9844L14.0585 24.9979L13.9999 25L13.8993 24.9932L13.8142 24.9771L13.7109 24.9432L13.6852 24.931C13.5949 24.8911 13.5119 24.8316 13.4425 24.7535L2.17081 11.7263L2.1087 11.6387L2.06079 11.5456L2.02611 11.4463L2.00297 11.3152L2.00269 11.1878L2.01755 11.0891L2.02714 11.0499L2.06104 10.9538L2.08838 10.8971L6.08838 3.39706C6.20243 3.18321 6.41149 3.0396 6.64753 3.00704L6.75014 3H21.2501ZM17.9061 12H10.0911L14.0011 22.16L17.9061 12ZM8.48514 12H4.38914L11.7621 20.518L8.48514 12ZM23.6081 12H19.5151L16.2421 20.511L23.6081 12ZM10.0241 4.499H7.19914L3.99814 10.5H8.42314L10.0241 4.499ZM16.4231 4.499H11.5761L9.97514 10.5H18.0231L16.4231 4.499ZM20.8001 4.499H17.9751L19.5761 10.5H23.9991L20.8001 4.499Z"
                          fill="currentColor"
                        />
                      </svg>
                      Premium
                    </button>
                  </div>
                )}
                <div
                  className={`${
                    freeProducts.length > 0 && premiumProducts.length > 0
                      ? "mx-auto xl:mx-0 text-center xl:text-start flex flex-nowrap overflow-auto lg:block"
                      : "text-center"
                  }`}
                >
                  <button
                    className={`filter-btn ${
                      activeCategory === "all" ? "filter-btn-active" : ""
                    }`}
                    onClick={() => filterByCategory("all")}
                  >
                    All<span>{productsByType.length}</span>
                  </button>

                  {categories.map(
                    (category) =>
                      productsByType.filter((item) =>
                        item.frontmatter.categories.includes(category),
                      ).length > 0 && (
                        <button
                          key={category}
                          className={`filter-btn ${
                            slugify(activeCategory) === slugify(category)
                              ? "filter-btn-active"
                              : ""
                          }`}
                          onClick={() => filterByCategory(category)}
                        >
                          {category}
                          <span>
                            {
                              productsByType.filter((d) =>
                                d.frontmatter.categories.includes(category),
                              ).length
                            }
                          </span>
                        </button>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {mounted && <ProductCards products={productsByCategory} />}
        </div>
      </section>
      {faq && <Faq faq={faq} className={"pt-0"} />}
    </Base>
  );
};

export default ProductsLists;
