import Base from "@/layouts/Baseof";
import { getSinglePages } from "@/lib/contentParser";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import { getListPage } from "lib/contentParser";
import Image from "next/image";
import Link from "next/link";

const Bundle = ({
  products,
  bundles,
  bundleData: { frontmatter, content },
}) => {
  const { title, meta_title, description, noindex, chat, image } = frontmatter;

  // count products
  const countProducts = (type) => {
    return products.filter(
      (product) =>
        product.frontmatter.type === type && product.frontmatter.price !== 0,
    ).length;
  };

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description ? description : plainify(content.slice(0, 120))}
      image={image}
      noindex={noindex}
      chat={chat}
    >
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="md:col-12 text-center mb-12">
              {markdownify(title, "h1", "mb-3")}
              {markdownify(description, "p", `text-muted text-xl mb-4`)}
            </div>
          </div>
          <div className="row gy-4 justify-center">
            {bundles.map((item, i) => (
              <div key={`item-${i}`} className="lg:col-6 xl:col-5">
                <div className="card border-0 overflow-hidden rounded-3 h-100">
                  <div className="card-img-top img-cover">
                    <Image
                      src={item.frontmatter.image}
                      alt={item.frontmatter.title}
                      height={325}
                      width={540}
                      objectfit="cover"
                      priority
                    />
                  </div>
                  <div className="card-body block sm:flex items-center justify-between p-6">
                    <div className="mr-4">
                      <h4 className="capitalize">
                        {item.frontmatter.type} Bundle
                      </h4>
                      <p className="bundle-description mb-0">
                        {item.frontmatter.subtitle.replace(
                          "<number>",
                          countProducts(item.frontmatter.type),
                        )}
                      </p>
                    </div>
                    <div className="text-start text-sm-end mt-3 mt-sm-0">
                      <Link
                        href={`/bundles/${item.slug}`}
                        className="btn btn-sm btn-primary"
                      >
                        Grab The Deal
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Bundle;

export const getStaticProps = async () => {
  const bundleData = await getListPage("content/bundles/_index.md");
  const allBundles = await getSinglePages("content/bundles");
  const allProducts = await getSinglePages("content/products");

  return {
    props: {
      bundleData: bundleData,
      products: allProducts,
      bundles: allBundles,
    },
  };
};
