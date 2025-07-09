import ProductCards from "@/components/ProductCards";
import Base from "@/layouts/Baseof";
import Axios from "@/lib/axios";
import { getAllCategory } from "@/lib/categoryParser";
import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import { useEffect, useState } from "react";

const FreeTemplates = ({ freeTemplates, products }) => {
  const [data, setData] = useState([]);
  const {
    frontmatter: {
      title,
      description,
      meta_title,
      chat,
      service_popup,
      premium_section,
      features,
    },
  } = freeTemplates;
  const freeProducts = products.filter(
    (product) =>
      product.frontmatter.type === "bootstrap" &&
      product.frontmatter.price == 0,
  );
  const premiumProducts = products.filter(
    (product) =>
      product.frontmatter.type === "bootstrap" &&
      product.frontmatter.price != 0,
  );
  const category = getAllCategory(products);

  // state
  const [productData, setProductData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const filterData = (e, index) => {
    setEditIndex((editIndex) => (editIndex === index ? index : index));

    setIsActive(!isActive);
    const categoryProduct = freeProducts.filter((product) =>
      product.category.includes(e),
    );

    if (e == "All") {
      setIsActive(false);
      setProductData(freeProducts);
    } else if (e != "All") {
      setIsActive(true);
      setProductData(categoryProduct);
    } else {
      setProductData(freeProducts);
    }
  };

  useEffect(() => {
    const fetchDownload = async () => {
      const res = await Axios.get("free-theme");
      const { result } = res.data;
      setData(result);
    };
    fetchDownload();
  }, []);

  const allDownloadData = data.filter((data) => data.download > 0);
  const totalDownload =
    allDownloadData &&
    allDownloadData.reduce(
      (acc, currentValue) => acc + currentValue.download,
      0,
    );

  useEffect(() => {
    setProductData(freeProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base title={meta_title} chat={chat} service_popup={service_popup}>
      <section className="section">
        <div className="container">
          <div className="row mb-12">
            <div className="md:col-12 text-center mb-12">
              {markdownify(
                title.replace(
                  "<number>",
                  totalDownload ? totalDownload : "990000",
                ),
                "h1",
                "mb-4",
              )}

              {markdownify(description, "p", `text-muted text-xl mb-4`)}
            </div>
            <div className="col-12">
              <div className="inline-block text-center shadow-lg p-4 rounded-lg flex-wrap">
                <button
                  data-filter="all"
                  className={`filter-btn ${
                    !isActive ? "filter-btn-active" : ""
                  }`}
                  value="All"
                  onClick={(e) => filterData(e.target.value)}
                >
                  All<span>{freeProducts.length}</span>
                </button>
                {category.map(
                  (cat, i) =>
                    freeProducts.filter((category) =>
                      category.frontmatter.categories.includes(cat),
                    ).length > 0 && (
                      <button
                        data-filter="all"
                        className={`filter-btn ${
                          editIndex == i ? "filter-btn-active" : ""
                        } `}
                        key={i}
                        value={cat}
                        onClick={(e) => filterData(e.target.value, i)}
                      >
                        {cat}
                        <span>
                          {
                            freeProducts.filter((category) =>
                              category.frontmatter.categories.includes(cat),
                            ).length
                          }
                        </span>
                      </button>
                    ),
                )}
              </div>
            </div>
          </div>
          <ProductCards products={productData} />
        </div>
      </section>
      <section className="section bg-theme-light">
        <div className="container">
          <div className="row mt-6">
            <div className="md:col-12 text-center mb-8">
              {markdownify(premium_section.title, "h1", "mb-3")}
              {markdownify(
                premium_section.description,
                "p",
                `text-muted text-xl mb-4`,
              )}
            </div>
          </div>
          <ProductCards products={premiumProducts} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="xl:col-8 lg:col-10 ">
              <div className="text-center mb-5">
                <h2>{features.title}</h2>
              </div>
              {features.items.map((feature, i) => (
                <div
                  key={`feature-${i}`}
                  className={`${
                    i % 2 != 0 &&
                    "bg-theme-light shadow-[0_15px_55px_0_rgba(0,0,0,.04)]"
                  } p-8 rounded-lg`}
                >
                  <div className="row justify-between items-center" key={i}>
                    <div
                      className={`md:col-5 ${
                        i % 2 != 0 ? "order-0 md:order-1" : "order-0"
                      }`}
                    >
                      <Image
                        className="max-w-full"
                        src={feature.thumbnail}
                        alt={feature.name}
                        width="505"
                        height="429"
                        blurDataURL={feature.thumbnail}
                      />
                    </div>
                    <div className="md:col-7 order-1 md:order-0 px-8 mt-11">
                      <div className="text-center xl:text-start">
                        {markdownify(feature.name, "h3", `mb-3 pt-0`)}
                        {markdownify(feature.content, "p", `mb-4`)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default FreeTemplates;
