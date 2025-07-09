import Axios from "@/lib/axios";
import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

const ProductCards = ({
  products,
  search,
  setModalIsOpen,
  weight,
  className,
}) => {
  const filterByWeight = products.filter(
    (product) => product.frontmatter.weight > 0,
  );

  const productsByWeight = sortByWeight(sortByDate(filterByWeight));

  const productsByDate = sortByDate(products);

  const filterWeightProducts = productsByDate.filter(
    (product) => !productsByWeight.includes(product),
  );

  const allProducts = !weight
    ? [...productsByWeight, ...filterWeightProducts]
    : products;

  const [downloadData, setDownloadData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("free-theme");
      const { result } = response.data;
      setDownloadData(result);
    };
    fetchData();
  }, []);

  return (
    <div className={`row justify-center gap-y-8 ${className}`}>
      {allProducts.map((product, i) => (
        <div
          className={`lg:col-4 md:col-6 ${i == 2 && "md:hidden lg:block"}`}
          key={`product-${i}`}
        >
          <div className="product-card h-full">
            <Link href={`/products/${product.slug}`}>
              <span onClick={() => search && setModalIsOpen(false)}>
                <div className="product-card-thumb">
                  <Image
                    width="426"
                    height="320"
                    quality={80}
                    src={product.frontmatter.image}
                    alt={`${product.frontmatter.title} - ${product.frontmatter.subtitle}`}
                    blurDataURL={product.frontmatter.image}
                  />
                </div>

                <div className="product-card-content">
                  <div className="flex items-baseline justify-between">
                    <div className="mr-4">
                      <div className="flex items-baseline	">
                        <h3 className="mb-0">{product.frontmatter.title}</h3>
                        {product.frontmatter.archive && (
                          <span
                            className="text-sm px-2 text-error bg-error/10 rounded font-semibold scale-[0.8] leading-[2] h-auto"
                            data-tooltip-id="archived"
                            data-tooltip-content="No longer development support"
                          >
                            Archived
                          </span>
                        )}
                      </div>
                      {product.frontmatter.subtitle && (
                        <p className="mb-0 mt-1 text-dark">
                          {!search && product.frontmatter.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="text-end">
                      <strong className="font-semibold block text-dark">
                        {product.frontmatter.price === 0
                          ? `Free`
                          : `$${product.frontmatter.price}`}
                      </strong>

                      {downloadData &&
                        downloadData.map(
                          (data, i) =>
                            data.name == product.slug &&
                            data.download > 0 && (
                              <div
                                key={`key-${i}`}
                                className="mt-1 no-wrap text-dark whitespace-nowrap"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 49.8 49.8"
                                  height="15"
                                  width="15"
                                  className="opacity-75"
                                >
                                  <path
                                    d="M45 41.3c0 4.7-3.9 8.5-8.6 8.5h-23a8.5 8.5 0 0 1-8.5-8.5 3.5 3.5 0 1 1 7 0c0 .9.7 1.5 1.5 1.5h23c.9 0 1.5-.6 1.5-1.5a3.5 3.5 0 1 1 7 0zm-22.6-7a3.5 3.5 0 0 0 5 0L37.7 24a3.5 3.5 0 0 0-5-5l-4.3 4.4V3.5a3.5 3.5 0 1 0-7 0v19.9L17.1 19a3.5 3.5 0 0 0-5 5l10.3 10.3z"
                                    fill="#010002"
                                  />
                                </svg>
                                <span
                                  key={`download-${i}`}
                                  className="mt-2 mb-0 ms-1"
                                >
                                  {data.download}
                                </span>
                              </div>
                            ),
                        )}
                    </div>
                  </div>
                </div>
              </span>
            </Link>
          </div>
        </div>
      ))}
      <Tooltip id="archived" place="top" />
    </div>
  );
};

export default ProductCards;
