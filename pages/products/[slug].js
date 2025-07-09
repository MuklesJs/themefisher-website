import AstroWelcome from "@/components/AstroWelcome";
import products from "@/json/products.json";
import Base from "@/layouts/Baseof";
import Axios from "@/lib/axios";
import { similarProducts } from "@/lib/utils/similarItems";
import { plainify } from "@/lib/utils/textConverter";
import ProductDescription from "@/partials/ProductSinglePage/ProductDescription";
import ProductInfo from "@/partials/ProductSinglePage/ProductInfo";
import ProductMeta from "@/partials/ProductSinglePage/ProductMeta";
import ProductPreview from "@/partials/ProductSinglePage/ProductPreview";
import ProductPricing from "@/partials/ProductSinglePage/ProductPricing";
import ProductSchema from "@/partials/ProductSinglePage/ProductSchema";
import RelatedProduct from "@/partials/ProductSinglePage/RelatedProduct";
import { getSinglePageServer } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";
import { useEffect, useState } from "react";

const SinglePage = ({ slug, singleProduct, changelog, mdxContent }) => {
  const [downloadData, setDownloadData] = useState();

  const { frontmatter, content } = singleProduct;

  const {
    title,
    meta_title,
    description,
    image,
    noindex,
    type,
    price,
    service_popup,
    date,
  } = frontmatter;

  // related products
  const relatedProducts = similarProducts(singleProduct, products, slug);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(`free-theme/${slug}`);
      const { result } = response.data;
      if (price === 0) {
        setDownloadData(result && result.download);
      } else {
        setDownloadData(null);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description ? description : plainify(content.slice(0, 120))}
      image={image}
      service_popup={service_popup}
      noindex={noindex}
      chat={true}
    >
      <section className="section overflow-hidden pt-12">
        <div className="container">
          <div className="row">
            <div className="xl:col-8">
              <ProductPreview singleProduct={singleProduct} slug={slug} />
              {/* product description */}
              {content && (
                <div className="mt-8 py-5 pr-8 hidden xl:block">
                  <h3 className="h4 mb-4 border-b border-border pb-3">
                    Theme Description
                  </h3>
                  <ProductDescription
                    singleProduct={singleProduct}
                    mdxSource={mdxContent}
                  />
                </div>
              )}
            </div>
            <div className="xl:col-4 xl:mt-0 mt-8">
              <ProductMeta
                relatedProducts={relatedProducts.slice(0, 3)}
                singleProduct={singleProduct}
                allProducts={products}
                downloadData={downloadData}
                slug={slug}
              />

              <ProductInfo
                singleProduct={singleProduct}
                changelogData={changelog}
                downloadData={downloadData}
              />

              <div className="mt-8 py-5 pr-8 block xl:hidden">
                <h3 className="h4 mb-4 border-b border-border pb-3">
                  Theme Description
                </h3>
                <ProductDescription
                  singleProduct={singleProduct}
                  mdxSource={mdxContent}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* welcome popup */}
      <AstroWelcome bundle={type} />

      {/* pricing table */}
      {price !== 0 && (
        <ProductPricing singleProduct={singleProduct} slug={slug} type={type} />
      )}

      {/* related products */}
      <RelatedProduct
        relatedProducts={relatedProducts}
        type={type}
        className={price === 0 ? "bg-theme-light" : ""}
      />

      {/* schema */}
      <ProductSchema
        title={title}
        image={image}
        slug={slug}
        description={description}
        date={date}
        price={price}
        type={type}
      />
    </Base>
  );
};

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const singleProduct = await getSinglePageServer("content/products", slug);
  const changelog = await getSinglePageServer("changelog", slug);

  // handle 404
  if (!singleProduct) {
    return {
      notFound: true,
    };
  }

  const mdxContent = await parseMDX(singleProduct.content);

  return {
    props: {
      slug: slug,
      singleProduct: singleProduct,
      mdxContent: mdxContent,
      changelog: changelog,
    },
  };
};

export default SinglePage;
