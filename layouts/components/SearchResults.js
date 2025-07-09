import Image from "next/image";
import Link from "next/link";

const SearchResults = ({ products, setModalIsOpen, defaultData }) => {
  return (
    <div className="row">
      {products.length > 0
        ? products.map((product, i) => (
            // search result card
            <div className="mb-6 sm:col-6" key={`product-${i}`}>
              <div className="search-item">
                <div className="mr-3">
                  <Link href={`/products/${product.slug}`}>
                    <span
                      className="block rounded overflow-hidden shadow-lg"
                      onClick={() => setModalIsOpen(false)}
                    >
                      <Image
                        width="130"
                        height="98"
                        className="w-[130px] max-w-full rounded"
                        src={product.frontmatter.image}
                        alt={`${product.frontmatter.title} - ${product.frontmatter.subtitle}`}
                        blurDataURL={product.frontmatter.image}
                      />
                    </span>
                  </Link>
                </div>

                <div className="self-center mt-2 sm:mt-0">
                  <h3 className="h5 mb-1" onClick={() => setModalIsOpen(false)}>
                    <Link href={`/products/${product.slug}`}>
                      <span className="lh-1 stretched-link">
                        {product.frontmatter.title}
                      </span>
                    </Link>
                  </h3>
                  <p className="mb-0">{product.frontmatter.subtitle}</p>
                  <p className="mb-0 font-medium">
                    {product.frontmatter.categories.map((category, i) => (
                      <span key={i} className="me-2 mt-1 d-inline-block">
                        <Link href={`/categories/${category}`}>
                          <span
                            className="small text-capitalize d-inline-block"
                            onClick={() => setModalIsOpen(false)}
                          >
                            {category}
                          </span>
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))
        : defaultData.map((product, i) => (
            // recommended product card
            <div className="col-6 mb-6 sm:col-4 md:col-3" key={`product-${i}`}>
              <Link href={`/products/${product.slug}`}>
                <span
                  className="block overflow-hidden shadow-lg"
                  onClick={() => setModalIsOpen(false)}
                  style={{ lineHeight: 0 }}
                >
                  <Image
                    width="210"
                    height="158"
                    className="w-[210px] max-w-full rounded"
                    src={product.frontmatter.image}
                    alt={`${product.frontmatter.title} - ${product.frontmatter.title}`}
                    blurDataURL={product.frontmatter.image}
                  />
                </span>
              </Link>

              <div className="mt-3">
                <h3
                  className="h5 mb-1 leading-none"
                  onClick={() => setModalIsOpen(false)}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-dark leading-none"
                  >
                    {product.frontmatter.title}
                  </Link>
                </h3>
                <p className="mb-0 text-xs md:text-sm">
                  {product.frontmatter.subtitle}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SearchResults;
