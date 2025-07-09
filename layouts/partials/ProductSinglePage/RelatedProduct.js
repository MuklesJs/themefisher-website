import ProductCards from "@/components/ProductCards";

const RelatedProduct = ({ relatedProducts, type, className }) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className={`section ${className || ""}`} id="related-products">
      <div className="container">
        <div className="row">
          <div className="md:col-12 mb-5">
            <h2 className="h2 text-center">
              {type === "hugo" || type === "astro" || type === "jekyll"
                ? "Related Themes"
                : "Related Templates"}
            </h2>
          </div>
        </div>
        <ProductCards products={relatedProducts.slice(0, 3)} weight="true" />
      </div>
    </section>
  );
};

export default RelatedProduct;
