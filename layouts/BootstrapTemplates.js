import ProductCards from "@/components/ProductCards";
import Base from "@/layouts/Baseof";
import { markdownify } from "@/lib/utils/textConverter";

const BootstrapTemplates = ({ dataContents, products }) => {
  const { frontmatter, content } = dataContents[0];
  const bulmaTemplates = products.posts.filter(
    (product) => product.frontmatter.type == "bootstrap",
  );
  return (
    <Base title={frontmatter.meta_title} chat={frontmatter.chat}>
      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="xl:col-8 lg:col-10 mx-auto text-center mb-12">
              {markdownify(frontmatter.title, "h1", "mb-3")}

              {markdownify(
                frontmatter.description,
                "p",
                `text-muted text-xl mb-4`,
              )}
            </div>
          </div>
          <ProductCards products={bulmaTemplates} />
        </div>
      </section>
    </Base>
  );
};

export default BootstrapTemplates;
